# 패시몬 노트

이름:
학명: 노로바이러스(Norovirus)
타입: 바이러스
태그:
- structure: 비외피/RNA/칼리시바이러스
- location: 장관
- pathway: 분변-경구/오염식품/집단발생
방어특성: 환경저항성

이미지:
- 대표 시각 특징: 집단 식중독, 갑작스런 구토, 소량 감염, 비외피 장관 바이러스
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 단단한 작은 바이러스가 식판 위에서 소용돌이 구토 파동을 만드는 픽셀풍 몬스터
- 실사풍: norovirus virion EM 또는 outbreak/gastroenteritis 교육용 참고형 이미지

능력치:
- HP: 68
- 공격: 70
- 방어: 66

기술:
- 이름: 오염식품 섭취
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 오염된 음식과 함께 장관으로 들어온다.
  learnText: Norovirus는 소량으로도 집단 위장관염을 일으킬 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 장관 안에서 빠르게 퍼질 준비를 했다.
      learnText: 준비기는 분변-경구/오염식품 전파를 표현했다.

- 이름: 급성 구토
  종류: 공격기
  타입: 장관
  위력: 65
  명중: 100%
  effect:
  description: {name}이 갑작스런 구토 파동을 일으킨다.
  learnText: Norovirus는 vomiting이 두드러지는 급성 위장관염으로 기억하기 쉽다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 구토
      증상: 구토
      effect:
      description: {name}이 회복 흐름을 구토로 끊었다.
      learnText: 구토는 체력 회복량을 줄이는 공식 상태이상이다.

- 이름: 집단 설사
  종류: 공격기
  타입: 장관
  위력: 60
  명중: 100%
  effect:
  description: {name}이 좁은 공간에서 장관 증상을 빠르게 퍼뜨린다.
  learnText: 집단발생과 오염식품 맥락을 함께 잡는다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상, 탈수
      증상: 배설 이상, 탈수
      effect:
      description: {name}이 배설 이상과 탈수를 함께 남겼다.
      learnText: 설사는 배설 이상, 수분 손실은 탈수로 표현한다.

- 이름: 크루즈 집단발생
  종류: 전용기
  타입: 장관
  위력: 0
  명중: 100%
  effect:
  description: {name}이 닫힌 공간 전체에 구토 파동을 퍼뜨린다.
  learnText: Norovirus는 cruise ship/outbreak 이미지가 강한 바이러스다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 구토(2), 탈수
      증상: 구토, 탈수
      effect:
      description: {name}의 구토 파동이 겹쳐 회복을 크게 막았다.
      learnText: 전용기는 구토 2스택과 탈수로 집단 위장관염을 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 10, 22, 33
- 식중독 세균들과 겹치지 않게 비외피/집단발생 이미지를 강조한다.
