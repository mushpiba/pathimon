# 패시몬 노트

이름:
학명: 요코가와흡충(Metagonimus)
타입: 흡충
태그:
- structure: 소형장흡충
- location: 소장
- pathway: 은어/민물고기섭취
방어특성: 장점막부착

이미지:
- 대표 시각 특징: 은어 등 민물고기 매개, 소형 장흡충, 장관 설사
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 은빛 물고기비늘 위에 붙은 작은 흡충이 장 점막으로 뛰어드는 픽셀풍 몬스터
- 실사풍: Metagonimus adult/egg 또는 intestinal fluke 교육용 참고형 이미지

능력치:
- HP: 64
- 공격: 58
- 방어: 56

기술:
- 이름: 은어 피낭유충
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 민물고기 속 피낭유충으로 들어온다.
  learnText: Metagonimus는 은어 등 민물고기 섭취와 소장 기생을 떠올린다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 장점막에 붙을 위치를 잡았다.
      learnText: 준비기는 생선 매개 감염을 표현했다.

- 이름: 소장 흡착
  종류: 공격기
  타입: 기생
  위력: 50
  명중: 100%
  effect:
  description: {name}이 소장 점막에 붙어 장관을 자극한다.
  learnText: 소형 장흡충 감염은 소화기 증상 중심으로 정리한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}이 장관 리듬을 흐트러뜨렸다.
      learnText: 장관 자극은 배설 이상으로 표현한다.

- 이름: 은빛 장흡충
  종류: 전용기
  타입: 기생
  위력: 70
  명중: 100%
  effect:
  description: {name}이 은빛 물고기비늘처럼 작은 흡충 무리를 펼친다.
  learnText: Metagonimus는 Heterophyes와 비슷해 숙주 이미지로 차별화한다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 배설 이상, 피로
      증상: 배설 이상, 피로
      effect:
      description: {name}이 장관 증상을 오래 끌어 피로를 남겼다.
      learnText: 반복 장관 자극은 배설 이상/피로로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- Heterophyes와 통합 가능성이 높아 검수 필요.
