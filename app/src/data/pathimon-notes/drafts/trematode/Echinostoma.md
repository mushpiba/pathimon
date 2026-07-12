# 패시몬 노트

이름:
학명: 극구흡충(Echinostoma)
타입: 흡충
태그:
- structure: 장흡충/두관극
- location: 소장
- pathway: 패류/어류/양서류섭취
방어특성: 두관극부착

이미지:
- 대표 시각 특징: collar spine(두관극), 장흡충, 다양한 중간숙주 섭취
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 목둘레 가시 왕관을 두른 납작한 장흡충 픽셀풍 몬스터
- 실사풍: Echinostoma adult with collar spines 또는 egg 교육용 참고형 이미지

능력치:
- HP: 66
- 공격: 62
- 방어: 58

기술:
- 이름: 중간숙주 섭취
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 패류나 어류 속 피낭유충으로 들어온다.
  learnText: Echinostoma는 collar spine과 장관 기생 이미지를 함께 잡는다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 가시 왕관을 세우고 장으로 향했다.
      learnText: 준비기는 metacercaria 섭취를 표현했다.

- 이름: 두관극 긁기
  종류: 공격기
  타입: 기생
  위력: 60
  명중: 100%
  effect:
  description: {name}이 목둘레 가시로 장점막을 긁는다.
  learnText: Collar spines are a visual cue for Echinostoma.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상, 출혈
      증상: 배설 이상, 출혈
      effect:
      description: {name}이 장점막을 긁어 배설 이상과 출혈을 남겼다.
      learnText: 장점막 손상은 배설 이상/출혈 조합으로 표현했다.

- 이름: 가시왕관 흡착
  종류: 전용기
  타입: 기생
  위력: 80
  명중: 100%
  effect:
  description: {name}이 가시왕관으로 장점막에 단단히 붙는다.
  learnText: 전용기는 collar spine 형태를 가장 강하게 살린 초안이다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 배설 이상, 탈수
      증상: 배설 이상, 탈수
      effect:
      description: {name}이 장관 자극을 오래 끌어 탈수를 남겼다.
      learnText: 설사성 장관 증상은 배설 이상과 탈수로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- 장흡충류 중에서는 collar spine 시각 특징을 반드시 살린다.
