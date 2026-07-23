import { describe, expect, it } from 'vitest';
import { buildPathimonFromNote } from './pathimonNoteParser';

describe('pathimon note parser countermeasures', () => {
  it('parses direct countermeasures and unions symptom/tag terms with move symptoms', () => {
    const note = `이름: 테스트몬
학명: 테스트균(Testus pathogen)
타입: 세균
방어특성: 협막

능력치:
- HP: 80
- 공격: 50
- 방어: 50

태그:
- structure: 그람양성
- location: 세포외
- pathway: 소화기

메모:
- 테스트용 병원체다.
- 대처법 파서를 확인한다.
- 증상과 태그가 합쳐진다.
- 직접 대처법을 우선한다.

대처법:
직접: 알벤다졸, 수술
증상/태그: 탈수, 장관기생

기술:
- 이름: 장 정착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  효과: 공격력 +1랭크
  description: {name}이 장에 정착한다.
  learnText: 장관 정착을 배운다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상: 탈수
      증상: 설사·복통
      description: {name}이 설사를 유발한다.
      learnText: 설사와 복통을 확인한다.
`;

    const built = buildPathimonFromNote(note, {
      id: 'test_countermeasure',
      glyph: 'TST',
      captureRate: 0.4,
      defaultStats: { maxHp: 80, attack: 50, defense: 50 },
    });

    expect(built.monster.countermeasures).toEqual({
      direct: ['알벤다졸', '수술'],
      symptomTags: ['탈수', '장관기생', '설사·복통', '설사', '복통'],
    });
  });

  it('maps 빈혈 and its aliases to the anemia status condition', () => {
    const note = `이름: 구충몬
학명: 두비니구충(Ancylostoma duodenale)
타입: 기생충
방어특성: 흡혈

능력치:
- HP: 70
- 공격: 55
- 방어: 45

태그:
- structure: 선충
- location: 장관
- pathway: 피부침투

메모:
- 흡혈로 철을 잃게 만든다.

대처법:
직접: 알벤다졸
증상/태그: 빈혈

기술:
- 이름: 장벽 흡혈
  종류: 공격기
  타입: 실혈
  위력: 55
  명중: 100%
  description: {name}이 장벽에 붙어 흡혈한다.
  learnText: 구충 성충은 장벽에 붙어 지속적으로 흡혈한다.
  결과:
    - 확률: 100%
      효과: —
      상태이상: 빈혈(2), 철결핍성 빈혈
      증상: 철결핍성 빈혈
      description: {name}이 만성 실혈을 일으켰다.
      learnText: 만성 실혈은 철결핍성 빈혈로 이어진다.
`;

    const built = buildPathimonFromNote(note, {
      id: 'test_anemia',
      glyph: 'ANE',
      captureRate: 0.4,
      defaultStats: { maxHp: 70, attack: 55, defense: 45 },
    });

    expect(built.moves.test_anemia_move_1?.effects).toEqual([
      { kind: 'condition', condition: 'anemia', chance: 1, target: 'enemy', stacks: 2 },
      { kind: 'condition', condition: 'anemia', chance: 1, target: 'enemy' },
    ]);
  });

  it('recovers 2턴 무적 written without parentheses', () => {
    const built = buildPathimonFromNote(v2Note({
      signatureEffect: '2턴 무적',
    }), baseOptions('legacy_invuln'));

    expect(built.moves.legacy_invuln_move_2?.effects).toContainEqual({ kind: 'invuln', turns: 2, target: 'self' });
  });
});

describe('pathimon note parser v2 schema', () => {
  it('reads evasion tags, band-commented stats, 학습포인트, and structured 대처법', () => {
    const built = buildPathimonFromNote(v2Note(), baseOptions('test_v2'));
    const monster = built.monster;

    // 태그.evasion → 방어특성 대체
    expect(monster.abilities).toEqual(['cyst', 'acid_tolerance']);
    expect(monster.ability).toBe('cyst');

    // `# 밴드: … 근거: …` 주석이 붙어도 수치를 읽는다 (구 파서는 NaN → 기본값 폴백)
    expect(monster.attack).toBe(95);
    expect(monster.defense).toBe(45);
    expect(monster.maxHp).toBe(40);

    // 메모 폐기 → 학습포인트
    expect(monster.profileMemo).toEqual([
      'L1 [감별점] 통증 없는 검은 가피가 감별점이다.',
      'L2 [치료] 항생제와 항독소를 함께 쓴다.',
    ]);

    // 대처법 4요소 구조에서 약제명만 추출, 무효/금기는 제외
    expect(monster.countermeasures?.direct).toEqual(['시프로플록사신', '독시사이클린', '고압증기멸균']);
  });

  it('parses VOCAB §4 effect notations that the v1 parser dropped', () => {
    const built = buildPathimonFromNote(v2Note({
      prepEffect: '공격 +2랭크',
      signatureEffect: '무적(3), 회복(25%), 반감(2)',
    }), baseOptions('test_effects'));

    expect(built.moves.test_effects_move_1?.effects).toContainEqual({
      kind: 'buff', stat: 'attack', rank: 2, pct: 300, turns: 99, target: 'self',
    });
    expect(built.moves.test_effects_move_2?.effects).toEqual(expect.arrayContaining([
      { kind: 'invuln', turns: 3, target: 'self' },
      { kind: 'heal', pct: 25, target: 'self' },
      { kind: 'field', side: 'incoming', factor: 0.5, turns: 2, target: 'self' },
    ]));
  });

  it('maps 증식(n) to a stacking attack rank buff for autoinfection', () => {
    const built = buildPathimonFromNote(v2Note({ signatureEffect: '증식(2)' }), baseOptions('test_proliferation'));

    expect(built.moves.test_proliferation_move_2?.effects).toContainEqual({
      kind: 'buff', stat: 'attack', rank: 1, pct: 100, turns: 99, target: 'self',
    });
  });

  it('still builds v1 notes so the 129 existing drafts keep working', () => {
    const built = buildPathimonFromNote(`이름: 구형몬
학명: 구형균(Legacy bacterium)
타입: 세균
방어특성: 바이오필름
태그:
- structure: 그람양성
- location: 세포외
- pathway: 소화기

메모:
- 구형 메모가 그대로 실린다.

대처법:
직접: 반코마이신
증상/태그: 발열

능력치:
- HP: 80
- 공격: 50
- 방어: 50

기술:
- 이름: 정착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  효과: 공격력 +1랭크
  description: {name}이 정착한다.
  learnText: 정착을 배운다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상: 발열
      증상: 발열
      description: {name}이 정착했다.
      learnText: 정착했다.
`, baseOptions('test_v1'));

    expect(built.monster.abilities).toEqual(['biofilm']);
    expect(built.monster.profileMemo).toEqual(['구형 메모가 그대로 실린다.']);
    expect(built.monster.countermeasures?.direct).toEqual(['반코마이신']);
    expect(built.monster.attack).toBe(50);
    expect(built.moves.test_v1_move_1?.effects).toContainEqual({
      kind: 'buff', stat: 'attack', rank: 1, pct: 100, turns: 99, target: 'self',
    });
  });
});

function baseOptions(id: string) {
  return {
    id,
    glyph: 'TST',
    captureRate: 0.4,
    defaultStats: { maxHp: 80, attack: 50, defense: 50 },
  };
}

function v2Note(overrides: { prepEffect?: string; signatureEffect?: string } = {}): string {
  const prepEffect = overrides.prepEffect ?? '공격 +1랭크';
  const signatureEffect = overrides.signatureEffect ?? '무적(3)';

  return `# 패시몬 노트

이름: 브이투몬
학명: 브이투균(Versio secunda)
타입: 세균
태그:
- structure: 그람양성, 아포형성
- location: 세포외
- evasion: 낭종, 위산저항
- pathway: 상처, 호흡기

학습포인트:
- L1 [감별점] 통증 없는 검은 가피가 감별점이다.
- L2 [치료] 항생제와 항독소를 함께 쓴다.

대처법:
- 1차: 시프로플록사신 | 계열: 핵산합성억제 | 기전: DNA gyrase 억제 | 표적 태그: 그람양성
- 2차: 독시사이클린 | 계열: 단백합성억제 | 기전: 30S 결합 | 표적 태그: 그람양성
- 보조: 고압증기멸균 | 계열: 환경차단 | 기전: 아포 사멸 | 표적 태그: 아포
- 무효/금기: 페니실린 | 사유: 내성이 흔하다
증상/태그: 세균, 발열

능력치:
- 공격: 95   # 밴드: 5   근거: 치사 독소
- 방어: 45   # 밴드: 2   근거: 감수성 양호
- HP: 40     # 밴드: 2   근거: 급성 종결

기술:
- 이름: 정착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect: —
  description: {name}이 정착한다.
  learnText: 정착 단계를 배운다.
  결과:
    - 확률: 100%
      단계: —
      위력: —
      효과: ${prepEffect}
      상태이상: —
      증상: —
      effect: —
      description: {name}이 정착했다.
      learnText: 정착했다.

- 이름: 방어막
  종류: 전용기
  타입: 방어
  위력: 0
  명중: 100%
  effect: —
  description: {name}이 방어막을 만든다.
  learnText: 방어 구조를 배운다.
  결과:
    - 확률: 100%
      단계: —
      위력: —
      효과: ${signatureEffect}
      상태이상: —
      증상: —
      effect: —
      description: {name}이 방어막을 세웠다.
      learnText: 방어막을 세웠다.

작업메모:
- 후보 번호: 99
- 출처 강의: 03
- 검증 상태: 강의 대조 완료
- 판단 기록: 테스트용
`;
}