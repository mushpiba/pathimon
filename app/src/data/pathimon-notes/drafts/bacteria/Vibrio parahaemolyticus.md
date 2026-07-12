# 패시몬 노트

이름:
학명: 장염비브리오균(Vibrio parahaemolyticus)
타입: 세균
태그:
- structure: 그람음성/만곡막대
- location: 소장
- pathway: 해산물/소화기
방어특성: 염분선호

이미지:
- 대표 시각 특징: 해산물 생식, 염분 환경, 장염, curved rod
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 소금 결정과 조개껍질을 탄 만곡균이 장염 물결을 만드는 픽셀풍 몬스터
- 실사풍: Vibrio parahaemolyticus seafood-associated gastroenteritis 교육용 참고형 이미지

능력치:
- HP: 70
- 공격: 62
- 방어: 45

기술:
- 이름: 해산물 장착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 해산물과 염분 환경을 타고 장관으로 들어간다.
  learnText: V. parahaemolyticus는 해산물 관련 장염 후보로 콜레라, vulnificus와 구분한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 소금기 많은 해산물 속에서 장관을 노렸다.
      learnText: 비브리오 후보들은 감염 경로와 임상 양상으로 구분한다.

- 이름: 해산물 장염
  종류: 공격기
  타입: 소화기
  위력: 55
  명중: 100%
  effect:
  description: {name}이 장 점막을 자극해 급성 장염을 만든다.
  learnText: V. parahaemolyticus는 seafood-associated gastroenteritis로 기억하기 좋다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}이 장관을 자극해 배변 리듬을 무너뜨렸다.
      learnText: 장염 증상은 공식 상태이상 배설 이상으로 표현한다.

- 이름: 염분 파도
  종류: 전용기
  타입: 소화기
  위력: 60
  명중: 100%
  effect:
  description: {name}이 염분 환경에서 장염 파도를 크게 만든다.
  learnText: 염분 선호성과 해산물 매개 이미지를 전용기 컨셉으로 둔다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 배설 이상, 탈수
      증상: 배설 이상, 탈수
      effect:
      description: {name}이 장염과 탈수를 함께 밀어붙였다.
      learnText: 콜레라보다 낮은 위력의 해산물 장염형으로 차별화한다.

메모:
- 2차 보류 후보.
- 출처 강의: 13, 17, 33
