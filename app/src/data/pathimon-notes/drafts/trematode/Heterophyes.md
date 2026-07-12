# 패시몬 노트

이름:
학명: 이형흡충(Heterophyes)
타입: 흡충
태그:
- structure: 소형장흡충
- location: 소장
- pathway: 민물고기/해산어섭취
방어특성: 장점막부착

이미지:
- 대표 시각 특징: 작은 장흡충, 생선 매개, 소장 점막 부착, 설사
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 아주 작은 납작 흡충이 생선비늘 방패와 장 점막 갈고리를 든 픽셀풍 몬스터
- 실사풍: Heterophyes adult/egg 또는 intestinal fluke 교육용 참고형 이미지

능력치:
- HP: 64
- 공격: 56
- 방어: 58

기술:
- 이름: 생선 피낭유충
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 생선 속 피낭유충으로 소장에 들어온다.
  learnText: Heterophyes는 fish-borne intestinal fluke로 정리한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 소장 점막에 붙을 준비를 했다.
      learnText: 준비기는 metacercaria 섭취를 표현했다.

- 이름: 장점막 부착
  종류: 공격기
  타입: 기생
  위력: 50
  명중: 100%
  effect:
  description: {name}이 소장 점막에 작게 달라붙어 자극한다.
  learnText: 소형 장흡충은 장관 증상을 중심으로 잡는다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}이 장관 리듬을 흐트러뜨렸다.
      learnText: 설사/복부불편감은 배설 이상으로 표현했다.

- 이름: 소형흡충 산란
  종류: 전용기
  타입: 기생
  위력: 65
  명중: 100%
  effect:
  description: {name}이 작은 충란을 장 점막 가까이 흩뿌린다.
  learnText: 작은 장흡충류는 서로 비슷하므로 숙주와 크기 이미지를 검수해야 한다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 배설 이상, 탈수
      증상: 배설 이상, 탈수
      effect:
      description: {name}이 배설 이상을 길게 끌어 탈수를 남겼다.
      learnText: 장관 흡충 증상은 배설 이상/탈수 조합으로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- Metagonimus와 구분이 애매해 최종 통합 여부 검수 필요.
