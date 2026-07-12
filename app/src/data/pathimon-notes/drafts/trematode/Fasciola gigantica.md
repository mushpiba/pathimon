# 패시몬 노트

이름:
학명: 거대간질(Fasciola gigantica)
타입: 흡충
태그:
- structure: 잎모양흡충/간질
- location: 간실질/담관
- pathway: 수생식물섭취
방어특성: 간실질이행

이미지:
- 대표 시각 특징: 큰 잎모양 흡충, 수생식물, 간 실질 이행, 담관 정착
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 커다란 잎 모양 흡충이 간 조직을 뚫고 지나가는 픽셀풍 몬스터
- 실사풍: Fasciola adult fluke/egg 또는 liver migration lesion 교육용 참고형 이미지

능력치:
- HP: 82
- 공격: 72
- 방어: 70

기술:
- 이름: 수생식물 피낭유충
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 수생식물에 붙은 피낭유충으로 들어온다.
  learnText: Fasciola는 물냉이 같은 수생식물 섭취와 간 이행을 떠올린다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 간으로 향하는 길을 잡았다.
      learnText: 준비기는 metacercaria 섭취를 표현했다.

- 이름: 간실질 관통
  종류: 공격기
  타입: 기생
  위력: 75
  명중: 100%
  effect:
  description: {name}이 큰 잎처럼 간 실질을 뚫고 지나간다.
  learnText: 급성 fascioliasis는 유충의 간 실질 이행이 중요하다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 피로, 통증, 면역 이상
      증상: 발열, 피로, 통증, 면역 이상
      effect:
      description: {name}이 간을 가로질러 열과 피로를 남겼다.
      learnText: 호산구 증가는 면역 이상, 복통은 통증으로 표현한다.

- 이름: 거대 담관정착
  종류: 전용기
  타입: 기생
  위력: 90
  명중: 100%
  effect:
  description: {name}이 큰 몸으로 담관을 차지한다.
  learnText: Fasciola gigantica는 큰 간질 이미지를 살려 Fasciola hepatica와 구분한다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 부종, 황달
      증상: 부종, 황달
      effect:
      description: {name}이 담관을 막아 붓고 무거운 흐름을 만들었다.
      learnText: 담도 폐쇄와 황달은 공식 상태이상 황달로 표현한다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- Fasciola hepatica와 통합할지 별도 진화/지역 변이로 둘지 검수 필요.
