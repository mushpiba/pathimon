# 패시몬 노트

이름:
학명: 사스코로나바이러스-2(SARS-CoV-2)
타입: 바이러스
태그:
- structure: 외피보유/RNA/코로나바이러스
- location: 호흡기/혈관내피
- pathway: 비말/에어로졸
방어특성: 스파이크변이

이미지:
- 대표 시각 특징: 코로나 모양 spike, ACE2 결합, 호흡기 비말, 폐렴/염증 폭주
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 왕관 같은 spike 돌기를 두른 둥근 바이러스가 ACE2 열쇠를 들고 있는 픽셀풍 몬스터
- 실사풍: coronavirus virion EM 또는 SARS-CoV-2 infected respiratory epithelium 교육용 참고형 이미지

능력치:
- HP: 78
- 공격: 76
- 방어: 66

기술:
- 이름: 스파이크 결합
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 spike 단백으로 ACE2 문을 연다.
  learnText: SARS-CoV-2는 spike-ACE2 결합과 호흡기 전파를 핵심으로 잡는다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 세포 표면의 문고리를 붙잡았다.
      learnText: 준비기는 바이러스 부착/진입을 표현했다.

- 이름: 바이러스 폐렴
  종류: 공격기
  타입: 호흡기
  위력: 75
  명중: 100%
  effect:
  description: {name}이 폐포 쪽 염증을 키운다.
  learnText: COVID-19는 기침, 발열, 호흡 곤란과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 기침, 호흡 곤란
      증상: 기침, 호흡 곤란
      effect:
      description: {name}이 폐포를 흐리게 만들며 숨을 가쁘게 했다.
      learnText: 호흡기 증상은 기침과 호흡 곤란 조합으로 표현했다.

- 이름: 염증 폭주
  종류: 공격기
  타입: 면역매개
  위력: 70
  명중: 100%
  effect:
  description: {name}이 과한 염증 반응을 일으킨다.
  learnText: 중증 COVID-19에서는 면역반응과 혈관/응고 문제가 함께 언급될 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 혈압 이상
      증상: 발열, 혈압 이상
      effect:
      description: {name}이 열과 혈관성 압박을 동시에 키웠다.
      learnText: 응고/혈관 이상은 공식 상태이상 중 혈압 이상으로 임시 표현했다.

- 이름: 변이 스파이크
  종류: 전용기
  타입: 바이러스
  위력: 90
  명중: 100%
  effect:
  description: {name}이 spike 모양을 바꿔 방어 인식을 흐린다.
  learnText: 변이와 spike 항원성은 SARS-CoV-2 학습에서 반복되는 축이다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 면역 이상(2), 기침
      증상: 면역 이상, 기침
      effect:
      description: {name}이 방어 표식을 흐리고 다시 기침을 불러냈다.
      learnText: 항원 변화/면역 회피 이미지는 면역 이상으로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 10, 11, 22, 33
- 미각/후각 이상은 공식 상태이상이 없어 기술에는 넣지 않았다.
