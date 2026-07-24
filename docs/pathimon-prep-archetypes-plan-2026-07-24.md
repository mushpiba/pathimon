# 준비기 아키타입 구현 플랜 (2026-07-24)

준비기(prep)에 패시몬 특성별 메리트를 부여. 이름·learnText는 감염경로 그대로 두고 **기계 효과만 코드에서 아키타입으로 주입**한다.

## 확정 설계

- **준비기 = 전투당 1회** (전용기처럼, 해금 게이트는 없음). 지금은 무한 사용 + 영구 스택이라 밸런스 붕괴였다.
- **랭크업 1.5배** (전역): `rankEffect` `(2**rank-1)*100` → `(1.5**rank-1)*100`. 1랭크=+50%.
- **새 primitive 1개**: `empower_status` — 다음에 적에게 부여하는 상태이상 스택 ×배수(2), 1회 소모.
- **무적 가드 완화**: `dataIntegrity`가 무적을 전용기 전용으로 막던 것을 전용기 **또는 준비기**(둘 다 1회 제한)로 확장.

### 아키타입 8종 (전투당 1회, 우선순위 위→아래)

| 순위 | 아키타입 | 트리거(태그) | 메리트 효과 |
|---|---|---|---|
| 1 | 독소벼림 | 외독소·초항원 기술(type toxin·superantigen) | `empower_status(x2)` + 공격 +1랭크 |
| 2 | 휴면버스트 | evasion 아포·낭종(spore·cyst) | 무적(1) + 강한 단발 공격버프(2턴) |
| 3 | 잠복회복 | evasion 잠복·항원변이(latency·antigen_var) | 회복(100%) + 적 명중저하 상태이상(시력 이상) |
| 4 | 방벽전개 | evasion 협막·생물막(capsule·biofilm) | 방어 +1랭크 + 받는피해 감소 field(0.6, 2턴) |
| 5 | 폭발증식 | evasion 자가감염(autoinfection) | 공격 +2랭크 |
| 6 | 대형저항 | category 연충/선충/흡충/조충 | 방어 +1랭크 + 조직손상 dot(2턴) |
| 7 | 침습 | location 세포내·조직침습·혈류·적혈구 | 공격 +1랭크 + 방어 +1랭크 |
| 8 | 준비(기본) | 그 외 | 공격 +1랭크 |

- 탄저 → 독소벼림(규칙대로). 아포는 전용기(협막형성)라 겹침 없음.
- 애매 종은 8번(준비). 우선순위 충돌·전용기 겹침은 override로 조정(고려사항).

## 구현 단계

- **A. 랭크 1.5배** — `pathimonNoteParser.ts rankEffect` 공식 교체. 관련 테스트(pct 100/300 → 50/125) 갱신.
- **B. empower_status primitive** — `types/game.ts`(EffectPrimitive+ActiveEffect), `battle/effects.ts applyEffects`(적 condition 스택 배수+소모). 단위 테스트.
- **C. 준비기 1회 제한** — `battle/turn.ts`(once-per-battle를 signature∪prep로), `ui/battleUi.ts canUseBattleMove`, 무적 가드 테스트 완화. 테스트.
- **D. 아키타입 모듈** — `data/prepArchetypes.ts`: 아키타입→효과 템플릿 + 태그 기반 배정 함수(우선순위). 단위 테스트.
- **E. 주입** — `data/pathimonNoteData.ts`에서 각 패시몬 아키타입 산출 → prep move 효과를 아키타입으로 세팅(이름/서술/learnText/증상=노트 유지, 다중 outcome은 효과만 교체). 커버리지·배정 테스트.
- **F. 밸런스·전체 테스트** — vitest 전체 + tsc.

각 단계 테스트 게이트. 세부 수치는 하면서 조정.
