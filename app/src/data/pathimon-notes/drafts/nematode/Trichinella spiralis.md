# 패시몬 노트

이름: 근육스피라
학명: 선모충(Trichinella spiralis)
타입: 선충
태그:
- structure: 선충/유충-성충
- location: 장관/횡문근
- pathway: 덜익힌돼지고기
방어특성: 근육낭종
메모:
- 선충 타입이며 방어특성은 근육낭종이다.
- 선충, 유충-성충 구조와 장관, 횡문근 위치가 핵심이다.
- 덜익힌돼지고기 경로로 감염될 수 있다.
- 덜익힌 고기 섭취와 근육 유충 침투, 근육낭종 형성이 대표 병인이다.

이미지:
- 대표 시각 특징: 덜 익힌 돼지고기, 장내 성충, 근육 속 유충 낭종, 근육통과 안면 부종
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 근육 섬유 안에서 나선형으로 말린 유충이 붉은 근육 갑옷을 입은 픽셀풍 몬스터
- 실사풍: Trichinella encysted larvae in muscle 교육용 현미경 참고형 이미지

능력치:
- HP: 82
- 공격: 70
- 방어: 68

기술:
- 이름: 덜익힌 고기 섭취
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 덜 익힌 돼지고기 속 유충으로 감염을 시작한다.
  learnText: Trichinella spiralis는 근육 속 유충 낭종을 섭취해 감염된다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}의 유충이 장에서 깨어났다.
      learnText: 선모충은 유충-성충 단계 분리 후보로 특히 적합하다.

- 이름: 근육 유충 침투
  종류: 공격기
  타입: 이동
  위력: 65
  명중: 100%
  effect:
  description: {name}의 유충이 혈류를 타고 횡문근으로 들어간다.
  learnText: 선모충 유충은 근육에 낭종을 형성해 근육통과 부종을 만든다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 통증, 부종
      증상: 통증, 부종
      effect:
      description: {name}이 근육 속으로 파고들어 부종과 통증을 남겼다.
      learnText: 근육통은 공식 상태이상 통증으로 표현한다.

- 이름: 근육낭종 형성
  종류: 전용기
  타입: 잠복
  위력: 0
  명중: 100%
  effect:
  description: {name}이 근육세포 안에 나선형 낭종을 만든다.
  learnText: Trichinella 유충은 nurse cell/근육 낭종 이미지가 강한 전용기 소재다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 피로
      증상: 피로
      effect:
      description: {name}이 근육 낭종 속에 말려 들어가 버텼다.
      learnText: 사용자 설계처럼 유충-성충을 별도 패시몬 노트로 나누기 좋은 후보이다.


작업메모:
- 후보 번호: 38
- 출처 강의: 23
- 사용자가 언급한 진화 구조상 `Trichinella spiralis-유충`, `Trichinella spiralis-성충`으로 분리 검토 필요.
