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
});