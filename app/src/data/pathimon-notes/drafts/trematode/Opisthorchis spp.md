# 패시몬 노트

이름:
학명: 간흡충류(Opisthorchis spp.)
타입: 흡충
태그:
- structure: 흡충/담관기생
- location: 담관/간
- pathway: 민물고기섭취
방어특성: 담관정착

이미지:
- 대표 시각 특징: 민물고기 매개, 담관 안 흡충, 만성 담도염, 담관암 위험
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 납작한 흡충이 담관 모양 노란 관 안에 길게 자리 잡은 픽셀풍 몬스터
- 실사풍: Opisthorchis adult fluke/egg 또는 bile duct pathology 교육용 참고형 이미지

능력치:
- HP: 76
- 공격: 66
- 방어: 70

기술:
- 이름: 민물고기 피낭유충
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 덜 익힌 민물고기 속 피낭유충으로 들어온다.
  learnText: Opisthorchis는 생선 매개 담관 흡충으로 기억한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 담관으로 올라갈 준비를 마쳤다.
      learnText: 준비기는 metacercaria 섭취를 표현했다.

- 이름: 담관 자극
  종류: 공격기
  타입: 기생
  위력: 65
  명중: 100%
  effect:
  description: {name}이 담관 안에서 만성 염증을 만든다.
  learnText: 만성 담관 자극과 담관암 위험을 함께 떠올린다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 피로, 황달
      증상: 피로, 황달
      effect:
      description: {name}이 담관을 붓게 하고 몸을 무겁게 했다.
      learnText: 담관 자극으로 생기는 황달은 공식 상태이상 황달로 표현한다.

- 이름: 담관암 그림자
  종류: 전용기
  타입: 기생
  위력: 90
  명중: 100%
  effect:
  description: {name}이 담관 안에 오래 남는 위험한 그림자를 만든다.
  learnText: Opisthorchis viverrini 등은 cholangiocarcinoma 위험과 연결된다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 괴사, 피로
      증상: 괴사, 피로
      effect:
      description: {name}이 담관 조직에 오래 남는 손상을 새겼다.
      learnText: 암 위험 자체는 상태이상이 아니므로 괴사/피로로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- Clonorchis sinensis와 최종 이미지/기술 차별화 필요.
