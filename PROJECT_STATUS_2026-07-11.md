# PATHIMON 프로젝트 진행 요약

작성일: 2026-07-11
목적: 새 Codex 세션에서 바로 이어받기 위한 인수인계 문서

## 1. 프로젝트 개요

- 프로젝트명: 패시몬 / PATHIMON / 감염과 면역
- 컨셉: pathogen + pokemon. 병원체가 지성을 얻어 패시몬이 된 세계에서, 플레이어가 패시몬을 포획하고 사람/보스와 전투하며 100층을 목표로 진행하는 게임.
- 레퍼런스: PokeRogue UI/흐름을 강하게 참고.
- 현재 구현 방식: Phaser 3 + Vite + TypeScript 웹 게임.
- 장기 목표: APK 배포 가능성 있음. 현재는 브라우저 기반 프로토타입/학습 구조 우선.
- 메인 앱 위치: `C:\Users\박민겸\Desktop\project\2026\pathimon\app`
- 설계/참고 문서:
  - `C:\Users\박민겸\Desktop\project\2026\pathimon\pathogen-tower.html`
  - `C:\Users\박민겸\Desktop\project\2026\pathimon\pathogen-tower-design-flow.md`
  - `C:\Users\박민겸\Desktop\project\2026\pathimon\pathogen-tower-battle-v3.md`
- PokeRogue 소스/에셋 참고 폴더:
  - `C:\Users\박민겸\Desktop\project\2026\pathimon\pokerogue-beta`

## 2. 실행/검증 명령

앱 폴더에서 실행:

```powershell
cd C:\Users\박민겸\Desktop\project\2026\pathimon\app
npm.cmd run dev
```

- 개발 서버 기본 주소: `http://127.0.0.1:5173/`
- package scripts:
  - `npm.cmd run dev` = Vite dev server, host 127.0.0.1
  - `npm.cmd run typecheck` = `tsc --noEmit`
  - `npm.cmd run test:run` = Vitest 전체 테스트
  - `npm.cmd run build` = TypeScript + Vite production build

최근 확인 결과:

- 2026-07-11 전투 UI 타입 아이콘 작업 후:
  - `npm.cmd run typecheck` 통과
  - `npm.cmd run test:run` 통과: 16개 파일, 123개 테스트
  - `npm.cmd run build` 통과
  - Vite build에서 큰 번들 경고는 있음. 기능 실패는 아님.
  - 브라우저 새로고침 후 콘솔 에러 0개 확인.

## 3. 현재 씬 흐름

등록 위치: `app/src/game/config.ts`

현재 씬 순서:

1. `TitleScene`
2. `DisclaimerScene`
3. `StoryScene`
4. `ModeSelectScene`
5. `StarterSelectScene`
6. `BattleScene`
7. `ShopScene`
8. `BossIntroScene`

흐름 요약:

- 시작 화면: 제목은 `감염과 면역`. PATHIMON/픽셀풍 로고 스타일을 계속 조정 중.
- 면책조항: 제목 다음, 스토리 직전 0.7초 표시. 상업적 이용 금지, 저작권 미해결, 미완성 안내 성격.
- 스토리:
  - 1페이지: 서기 20000년, 병원체들이 지성을 얻고 패시몬 연합이 인류를 공격. 이미지 `images/story/war_page1.png` 사용.
  - 2페이지: 인하대학교 의과대학 반격. 이미지 `images/story/inha-logo.png` 사용.
  - 3페이지: 패시몬 캡슐. 이미지 `images/capsules/universal.png` 사용.
  - 우측 상단 스킵 버튼 있음. 스킵 시 모드 선택으로 이동.
- 모드/화풍 선택:
  - 4버튼 구조: 학습모드, 도전모드, 캐릭터풍, 실사풍.
  - 모드 하나 + 화풍 하나를 모두 선택해야 다음으로 진행.
- 스타터 선택:
  - `StarterSelectScene`.
  - 전체 패시몬 풀에서 랜덤 3개 후보를 보여줌. 후보끼리 중복될 수 있음.
  - 현재 최종 요구사항: 3개 중 1마리만 선택 가능. 중복 선택/여러 마리 시작은 취소됨.
  - 선택한 1마리로 `createInitialRunState(mode, visualStyle, starterId)` 시작.
- 전투/상점/보스 흐름은 아래 섹션 참고.

## 4. 모드 규칙

### 학습모드

- 정비구역 없음.
- 전투 시작 시 내 패시몬 HP 100% 회복 및 상태 정리.
- 캡슐 수는 사실상 무제한 처리. UI에서는 `캡슐 ∞` 또는 개별 캡슐 `∞` 표시.
- 전투/포획/지나가기 로그에 학습 피드백이 붙음.
- 피드백 방향: 단순 타입 상성 설명이 아니라, 해당 병원체의 특징/태그/방어기전 등 감염·면역 학습 정보 중심.

### 도전모드

- 초기 소지금 0원.
- 초기 캡슐: 만능 캡슐 4개.
- 전투 시작/종료 시 자동 회복 없음.
- 5층 단위 사람 전투 또는 10층 단위 보스 전투 승리 후 정비구역 진입.
- 사람/보스 승리 보상: 5원.
  - 야생 패시몬 조우는 적 처치가 아니므로 보상 없음.
  - 예: 5층 정비구역 소지금 5원, 10층 정비구역 소지금 10원.
- 도전모드에서 패시몬 타입 색/아이콘 표시.
- 학습모드에서는 타입 색/아이콘 표시 안 함.

## 5. 층/조우 규칙

위치: `app/src/state/runState.ts`, `app/src/state/factory.ts`

- 총 층수: 100층. `TOTAL_FLOORS = 100`.
- `encounterKindForFloor(floor)`:
  - 10의 배수: `boss`
  - 5의 배수: `trainer`
  - 그 외: `wild`
- 야생 패시몬:
  - 전투하지 않음. 포획하거나 지나감.
  - 방어특성 없음. `createMonsterInstance(enemyData, { defenseTraits: false })`.
  - 야생 패시몬 공격 phase 없음.
  - 야생 조우 중 교체해도 공격받지 않게 변경됨.
- 일반 사람:
  - 5, 15, 25...층.
  - 트레이너 이미지에서 랜덤/순환 선택.
  - 방어특성 없음. `ability: 'none'`.
- 보스 사람:
  - 10, 20, 30...층.
  - 보스도 사람 전투임.
  - 방어특성은 `floor / 10`개. 10층 1개, 20층 2개 식.
  - 보스 UI에는 `BOSS` 글자 유지.

## 6. 전투 시스템 현재 상태

핵심 위치:

- 전투 상태 처리: `app/src/battle/turn.ts`
- 데미지/효과/상성:
  - `app/src/battle/damage.ts`
  - `app/src/battle/effects.ts`
  - `app/src/battle/effectiveness.ts`
  - `app/src/data/effectiveness.ts`
- 전투 UI: `app/src/scenes/BattleScene.ts`, `app/src/ui/battleUi.ts`

### 야생 패시몬 phase

- 버튼 구성: `지나간다`, `캡슐`, `도감`, `패시몬`.
- 기술/싸운다 버튼 없음.
- `지나간다`는 전투 phase를 넘기는 버튼.
- 캡슐 선택 시 캡슐 목록이 열림.
  - 각 캡슐 이미지 표시.
  - 개별 소지 수 표시.
  - 캡슐 타입이 대상 패시몬 category와 맞지 않으면 `패시몬 타입이 맞지 않습니다.` 출력, 포획 시도/소모 없음.
  - 만능 캡슐은 모든 타입 포획 가능.
- 포획 성공 시 파티에 추가.
- 파티가 6마리일 때 포획하면 `releaseCapture` phase로 이동.
  - 놓아줄 패시몬을 선택해야 함.
  - 교체창 메뉴: `놓아준다`, `능력치를 본다`, `그만둔다`.

### 사람/보스 전투 phase

- 버튼 구성: `싸운다`, `도감`, `패시몬`, `캡슐 불가`.
- 캡슐은 비활성/불가.
- 전투 대화 순서:
  1. `플루리온은 무엇을 할까?`
  2. `검체 연구원이 승부를 걸어왔다.` 같은 진입 로그
  3. `검체 연구원은 인터페론(인터페론)을 하려고 한다.` 같은 적 의도 문구
- 야생 패시몬에서는 적 의도 문구를 표시하지 않음.
- 내 패시몬이 쓰러지면 다음 패시몬 강제 선택 phase.
  - 교체 가능 패시몬이 있으면 `forcedSwitch`.
  - 없으면 `defeat`.

### 교체/파티/스테이터스

- 파티 화면에 패시몬 이미지 표시.
- 선택된 패시몬 카드 강조 표시.
- 교체 목적 메뉴:
  - 일반 교체: `능력치를 본다`, `교체한다`, `그만둔다`
  - 강제 교체: `능력치를 본다`, `교체한다`
  - 포획 후 방출: `놓아준다`, `능력치를 본다`, `그만둔다`
- 능력치 화면:
  - 왼쪽 패시몬 이미지.
  - 상단 `스테이터스`.
  - 이름, 학명, 방어특성, 메모 영역.
  - 하단 뒤로가기/기술 버튼.

## 7. 전투 UI 최신 상태

최근 반영 요청: 2026-07-11

- 도전모드에서 내 패시몬 UI 우측 상단에 타입 아이콘 표시.
  - 별도 PNG가 아니라 Phaser 도형으로 그림.
  - 타입 색은 캡슐/테두리 색과 동일한 매핑 사용.
  - 기생충/연충: 노란색 + 둥근 검은 표식.
  - 세균: 파란색 + 막대균 느낌.
  - 바이러스: 흰색 + 방사형 표식.
  - 진균: 검정 + 버섯/균사 느낌.
  - 원충: 남색 + 원생동물 느낌.
  - 프리온: 보라색 + 접힌 단백질 느낌.
- 패널 텍스트 정리:
  - `내 패시몬`, `야생 패시몬`, `사람` 헤더 제거.
  - `BOSS` 헤더만 유지.
  - 내 패시몬 패널에서는 방어특성 숨김.
  - 사람 적 패널에서는 학명칸 숨김.
  - `상태이상` 문구는 `상태`로 변경.
- 패시몬 UI 크기 조정:
  - 내 패시몬 패널은 이전보다 약간 작게/정돈됨.
  - 사람/보스 UI는 상태/증상 여러 줄 확장 가능성을 위해 비교적 유지.
- HP 표시:
  - HP 바 + 퍼센트 표시.
  - 숫자 HP는 전투 패널에서는 표시하지 않음.
- 모바일 오버레이:
  - 십자 버튼: WASD/화살표 대응.
  - A/B 버튼: Enter/Backspace 대응.
  - 우측 하단 `처음으로` 버튼: 모드 선택 화면으로 돌아감.

## 8. 도감/상성 UI

- 전투 중 `도감` 버튼으로 접근.
- 탭:
  - `기술 목록`: 현재 내 패시몬이 배운 4가지 기술 상세 설명.
  - `상성표`: 공격/방어로 나눠서 표시.
- 공격:
  - 야생/상대 패시몬의 방어특성/태그에 효과가 좋은 공격 특성 정리.
- 방어:
  - 내 패시몬의 방어특성/태그에 효과가 좋은 적 공격 특성 정리.
- 도감 창에는 캡슐 버튼 없음.

## 9. 정비구역/상점

핵심 위치:

- `app/src/data/shop.ts`
- `app/src/scenes/ShopScene.ts`
- `app/src/state/runState.ts`

도전모드에서 사람/보스 전투 이후 진입.

품목 6칸:

1. 캡슐 2칸
2. 상처약 1칸
3. 고급 상처약 1칸
4. 진화의돌 1칸
5. 유전자 쐐기 1칸

상세:

- 캡슐:
  - 7종 중 2개가 정비구역마다 계산/랜덤식으로 등장.
  - 구매 시 해당 캡슐 소지 수 +1.
  - 구매한 아이템은 해당 정비구역에서 비활성화/재구매 불가.
- 상처약:
  - 가격 1원.
  - 구매 시 소지 중 모든 패시몬 회복.
- 고급 상처약:
  - 가격 3원.
  - 구매 시 소지 중 모든 패시몬 회복.
- 진화의돌:
  - 아직 미구현.
  - 이미지: 이상한 사탕/rare candy 계열.
- 유전자 쐐기:
  - 아직 미구현.
  - 이미지: DNA splicers.
- 새로고침:
  - 가격 1원.
  - 정비 품목 새로고침.

## 10. 캡슐 시스템

핵심 위치: `app/src/data/capsules.ts`

현재 순서:

1. `universal` = 만능 캡슐
2. `virus` = 바이러스 캡슐
3. `bacteria` = 세균 캡슐
4. `parasite` = 기생충 캡슐
5. `fungus` = 진균 캡슐
6. `protozoa` = 원생동물 캡슐
7. `prion` = 프리온 캡슐

포획 가능 범위:

- 만능 캡슐: 모든 계열
- 바이러스 캡슐: 바이러스
- 세균 캡슐: 세균
- 기생충 캡슐: 연충/기생충
- 진균 캡슐: 진균
- 원생동물 캡슐: 원충/원생동물
- 프리온 캡슐: 프리온

현재 초기 인벤토리:

- 만능 캡슐 4개
- 나머지 0개

캡슐 이미지 위치:

- `app/public/images/capsules/universal.png`
- `app/public/images/capsules/virus.png`
- `app/public/images/capsules/bacteria.png`
- `app/public/images/capsules/parasite.png`
- `app/public/images/capsules/fungus.png`
- `app/public/images/capsules/protozoa.png`
- `app/public/images/capsules/prion.png`

참고: 사용자가 `virus`와 `universal`의 상징성을 바꾸는 방향을 언급했고, 현재 코드상 이름은 `universal = 만능 캡슐`, `virus = 바이러스 캡슐`로 정리되어 있음.

## 11. 패시몬 데이터 현재 10종

위치: `app/src/data/monsters.ts`

1. `influenza` / 플루리온 / 인플루엔자 바이러스 / 바이러스
2. `hiv` / 레트로잠 / 인간면역결핍바이러스 / 바이러스
3. `cholera` / 콜렁방울 / 콜레라균 / 세균
4. `tb` / 폐잠복 / 결핵균 / 세균
5. `candida` / 백태디아 / 칸디다 알비칸스 / 진균
6. `aspergillus` / 포자길루 / 아스페르길루스 푸미가투스 / 진균
7. `malaria` / 말라리듬 / 열대열원충 / 원충
8. `entamoeba` / 아메바이트 / 이질아메바 / 원충
9. `ascaris` / 회충루프 / 회충 / 연충
10. `schistosoma` / 혈흡충돌 / 주혈흡충 / 연충

스타터:

- 기본값은 `STARTER_ID = influenza`.
- 현재 실제 시작은 스타터 선택 화면에서 고른 1마리.
- 후보 3개는 전체 패시몬 풀에서 랜덤으로 뽑음. 후보끼리 중복 가능.

이미지:

- 캐릭터풍: `app/public/images/pathimon/*-front.png`, `*-back.png`
- 실사/현미경풍: `app/public/images/pathimon/*-micro-front.png`
- 일부 원본/소스 이미지도 보존됨: `*-micro-source.png`, `pathimon-character-sheet-source.png`, `pathimon-micro-sheet-source.png`

사용자 취향 메모:

- 캐릭터풍은 프로젝트 소유의 픽셀 몬스터풍. 병원체 이름/특징만 참고하고 기존 이미지를 과도하게 답습하지 않는 방향.
- 실사풍은 캐릭터화하지 말고 실제 현미경 표본/학습 관찰감 우선. 너무 징그러운 표현은 피함.

## 12. 사람/트레이너/보스 데이터

- 일반 사람 데이터: `app/src/data/trainers.ts`
  - 현재 16명.
  - 이미지: `app/public/images/trainers/*.png`
  - PokeRogue 트레이너/관장/챔피언 스타일 이미지 다수 포함.
- 보스 데이터: `app/src/data/bosses.ts`
  - 현재 `immune_hq` + 여러 보스 이미지 기반 보스들.
  - `createBoss(...)` helper로 Red/Blue/Giovanni/Brock/Misty 등 다수 생성.
  - 보스 방어특성 풀: epithelial barrier, mucociliary, gastric acid, microbiota defense, iron limitation, antitoxin, receptor defect, immune regulation.
  - 보스 기술 풀: m_phago, m_opsonin, m_antibody, m_complement, m_ctl, m_th1, m_th2, m_interferon.

## 13. 에셋 현재 상태

`app/public` 아래에 현재 사용 중인 주요 에셋이 있음.

- BGM:
  - `audio/bgm/battle_wild.mp3`
  - `audio/bgm/battle_wild_strong.mp3`
  - `audio/bgm/battle_trainer.mp3`
  - `audio/bgm/battle_final.mp3`
- 전투 배경:
  - `images/arenas/grass_bg.png`
  - `images/arenas/grass_a.png`
  - `images/arenas/grass_b.png`
- 캡슐:
  - `images/capsules/*.png`
- 아이템:
  - `images/items/potion.png`
  - `images/items/super_potion.png`
  - `images/items/rare_candy.png`
  - `images/items/dna_splicers.png`
- 패시몬:
  - `images/pathimon/*.png`
- 스토리:
  - `images/story/war_page1.png`
  - `images/story/inha-logo.png`
  - `images/story/pathogen-war-v1.png`, `v2`, `v3`도 남아 있음.
- 트레이너:
  - `images/trainers/*.png`
- PokeRogue 포켓몬 일부:
  - `images/pokemon/...`
  - 현재 직접 게임 핵심에 계속 쓰는지는 재확인 필요.

## 14. 제목/스토리/면책조항

- 제목 화면:
  - 현재 제목은 `감염과 면역`.
  - 사용자가 예시 이미지처럼 포켓몬식 두꺼운 픽셀 로고 느낌을 원함.
  - 왼쪽에 패시몬들, 오른쪽에 보스들 약간 투명 배치하는 방향을 반영 중.
- 면책조항:
  - 상업적 이용 금지.
  - 저작권 관련 문제가 해결되지 않음.
  - 미완성 안내.
  - 0.7초 표시 후 스토리로 넘어감.
- 스토리 1페이지 이미지는 사용자가 따로 저장한 `war_page1` 이미지를 적용.

## 15. 주요 테스트 파일

- `app/src/ui/battleUi.test.ts`
  - 전투 UI helper, 타입 테두리/아이콘, 상태 문구, 도감, 캡슐 메뉴, BGM 선택 등.
- `app/src/state/runState.test.ts`
  - 층/조우/모드/상점/보스 방어특성/보상 등.
- `app/src/battle/battle.test.ts`
  - 데미지, 상성, 효과, 상태 등.
- `app/src/data/dataIntegrity.test.ts`
  - 패시몬/보스/트레이너/이미지/데이터 정합성.
- `app/src/ui/starterSelectUi.test.ts`
  - 스타터 후보/선택 규칙.
- `app/src/data/shop.test.ts`
  - 정비구역 품목/캡슐 설명.
- `app/src/game/config.test.ts`
  - 씬 순서.

## 16. 최근 구현된 핵심 변경 이력

대략적인 순서:

1. Phaser/Vite 기반으로 전환.
2. PokeRogue 스타일 전투 화면 구현.
3. 포켓로그 에셋 구조 확인 및 필요한 이미지/BGM을 프로젝트 `public`으로 복사.
4. 전투 화면에서 패시몬 위치/바닥/HP/패널/도감/모바일 오버레이/마커 조정.
5. 학습모드/도전모드 추가.
6. 정비구역/상점 추가.
7. 야생 패시몬은 전투하지 않고 포획/지나가기만 하는 구조로 개편.
8. 5층 일반 사람, 10층 보스 사람 구조로 개편.
9. 캡슐 타입별 포획 제한, 소지 수 표시, 만능 캡슐 추가/정리.
10. 10종 대표 병원체 데이터/이미지 적용.
11. 캐릭터풍/실사풍 선택 구조 추가.
12. 스타터 선택 화면 추가. 현재는 3개 후보 중 1마리만 선택.
13. 전투 UI에서 도전모드 타입 아이콘 추가.
14. 전투 UI 문구 정리: 내 패시몬/야생 패시몬/사람 헤더 제거, BOSS 유지, 상태이상 -> 상태.

## 17. 현재 Git/작업트리 상태 주의

현재 `app` 아래에는 많은 수정/신규 파일이 존재한다.

- 기존 파일 수정 다수:
  - `src/scenes/BattleScene.ts`
  - `src/ui/battleUi.ts`
  - `src/state/runState.ts`
  - `src/battle/*`
  - `src/data/*`
  - `src/game/*`
  - `src/scenes/*`
- 신규 파일 다수:
  - `public/`
  - `scripts/`
  - `src/data/capsules.ts`
  - `src/data/shop.ts`
  - `src/data/trainers.ts`
  - `src/scenes/DisclaimerScene.ts`
  - `src/scenes/ModeSelectScene.ts`
  - `src/scenes/StarterSelectScene.ts`
  - 여러 test/helper 파일.

주의:

- 절대 `git reset --hard` 또는 `git checkout --`로 되돌리지 말 것.
- 사용자와 Codex가 함께 만든 진행분이 많다.
- 새 세션에서는 먼저 `git status --short`로 상태를 보고, 필요한 파일만 조심스럽게 수정할 것.

## 18. 남은 큰 방향/미구현

- 전투 시스템 대규모 개편 예정.
  - `pathogen-tower-battle-v3.md`가 큰 방향 참고 문서지만, 사용자 의도와 100% 일치하는 것은 아니므로 질문을 통해 조율해야 함.
- 진화의돌/유전자 쐐기 기능은 아직 미구현. 현재는 이미지와 placeholder 문구만 있음.
- 디자인은 전체적으로 아직 중간 단계. 사용자는 “학습에 치중한 구조 우선, 이후 디자인 완성”을 원함.
- 제목 로고/타이틀 화면은 계속 개선 여지 있음.
- 실사풍 이미지와 캐릭터풍 이미지 퀄리티는 계속 비교/교체 가능.
- 모바일/반응형은 기본 유동 조정이 필요. 이전에 viewport 변화 문제를 논의함.
- APK화는 아직 결정/구현 안 됨. Phaser 웹앱을 Capacitor/Tauri/Electron/Godot 등 어떤 방식으로 포장할지는 나중 결정.
- 저작권/상업 배포 문제는 해결되지 않음. 현재 면책조항도 이 전제를 반영.

## 19. 새 세션 시작 추천 순서

1. 이 파일을 먼저 읽기.
2. 앱 폴더로 이동:

```powershell
cd C:\Users\박민겸\Desktop\project\2026\pathimon\app
```

3. 상태 확인:

```powershell
git status --short
```

4. 필요하면 dev server 실행:

```powershell
npm.cmd run dev
```

5. 브라우저에서 확인:

```text
http://127.0.0.1:5173/
```

6. 작업 전 관련 테스트를 먼저 확인/추가.
7. 수정 후 최소 검증:

```powershell
npm.cmd run typecheck
npm.cmd run test:run
npm.cmd run build
```

## 20. 사용자 선호/작업 스타일 메모

- 한국어로 대화.
- 사용자는 직접 브라우저에서 보고 피드백하는 방식을 선호.
- PokeRogue 느낌을 강하게 원하지만, 최종은 PATHIMON 고유 스타일로 이동하려 함.
- 병원체 이미지는 두 트랙:
  - 캐릭터풍: 귀엽지만 위협적인 픽셀 몬스터풍.
  - 실사풍: 캐릭터화하지 않은 현미경/학습 표본풍.
- 너무 징그러운 실사 이미지는 지양.
- UI 글자 넘침/버튼 밖 텍스트를 자주 신경 씀.
- 전투 화면은 PokeRogue처럼 상대 우측 상단, 내 패시몬 좌측 하단 구도를 선호.
- 디자인보다 구조/학습 내용 우선이지만, UI가 너무 구리면 바로 개선 요청함.

## 21. 바로 다음 작업 후보

사용자에게 물어보고 진행할 만한 것:

1. 최근 추가한 타입 아이콘의 실제 화면 위치/크기/모양 조정.
2. 사람/보스 UI에서 상태/증상 여러 줄 레이아웃 정리.
3. 제목 화면 로고 추가 개선.
4. 전투 시스템 대규모 개편을 `pathogen-tower-battle-v3.md` 기준으로 다시 설계.
5. 실사풍/캐릭터풍 패시몬 이미지 추가 교체.
6. APK 포장 방식 조사/결정.
