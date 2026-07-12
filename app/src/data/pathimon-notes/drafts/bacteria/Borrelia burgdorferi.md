# 패시몬 노트

이름:
학명: 라임병보렐리아(Borrelia burgdorferi)
타입: 세균
태그:
- structure: 스피로헤타
- location: 피부/관절/신경
- pathway: 진드기매개
방어특성: 항원변이

이미지:
- 대표 시각 특징: 진드기 매개, 스피로헤타, bull's-eye rash, 관절/신경 침범
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 진드기 망토를 쓴 나선균이 과녁 무늬 방패를 들고 있는 픽셀풍 몬스터
- 실사풍: Borrelia spirochete or erythema migrans 교육용 참고형 이미지

능력치:
- HP: 78
- 공격: 60
- 방어: 66

기술:
- 이름: 진드기 흡혈전파
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 진드기 흡혈을 타고 피부에 들어간다.
  learnText: Borrelia burgdorferi는 tick-borne Lyme disease의 대표 원인균이다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 진드기 물린 자리에 나선형 흔적을 남겼다.
      learnText: 매개체와 피부 병변을 함께 기억한다.

- 이름: 과녁 홍반
  종류: 공격기
  타입: 피부
  위력: 45
  명중: 100%
  effect:
  description: {name}이 퍼지는 과녁 모양 피부 반응을 만든다.
  learnText: Erythema migrans는 Lyme disease의 대표 소견이다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열
      증상: 발열, 과녁 홍반
      effect:
      description: {name}이 피부에 과녁 모양 반응을 남겼다.
      learnText: 발진은 상태이상이 아니라 증상 텍스트로 남긴다.

- 이름: 관절신경 확산
  종류: 전용기
  타입: 면역매개
  위력: 0
  명중: 100%
  effect:
  description: {name}이 관절과 신경으로 늦게 퍼져 증상을 남긴다.
  learnText: Lyme disease는 관절염, 신경 침범, 심장 침범으로 확장될 수 있다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 신경 이상, 통증
      증상: 신경 이상, 통증
      effect:
      description: {name}이 뒤늦게 신경과 관절을 흔들었다.
      learnText: 관절통은 공식 상태이상 `통증`으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 17, 21, 22
