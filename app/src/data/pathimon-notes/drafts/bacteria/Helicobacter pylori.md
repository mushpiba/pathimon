# 패시몬 노트

이름:
학명: 헬리코박터 파일로리(Helicobacter pylori)
타입: 세균
태그:
- structure: 그람음성/나선형
- location: 위점막
- pathway: 구강-구강/분변-구강
방어특성: 유레아제

이미지:
- 대표 시각 특징: 나선형 균, 편모, urease, 위점막 점액층, 위염/궤양
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 위 점액 방패 아래에서 암모니아 방울을 만드는 나선형 균 픽셀풍 몬스터
- 실사풍: H. pylori in gastric mucosa 또는 urease test 교육용 참고형 이미지

능력치:
- HP: 80
- 공격: 60
- 방어: 74

기술:
- 이름: 위점막 잠입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 편모로 위 점액층 속으로 파고든다.
  learnText: H. pylori는 위산 환경에서도 점액층과 urease를 이용해 살아남는다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 위 점액층 아래에 숨었다.
      learnText: 나선형 운동성과 urease가 핵심 이미지다.

- 이름: 유레아제 방패
  종류: 공격기
  타입: 효소
  위력: 0
  명중: 100%
  effect:
  description: {name}이 urease로 산성 환경을 중화한다.
  learnText: Urease는 H. pylori 진단과 생존 전략 모두에서 중요한 키워드다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과: 무적(1)
      상태이상:
      증상:
      effect:
      description: {name}이 암모니아 방패로 위산을 버텼다.
      learnText: 위산 회피는 이 후보의 방어적 기술로 표현하기 좋다.

- 이름: 위궤양 자극
  종류: 전용기
  타입: 소화기
  위력: 65
  명중: 100%
  effect:
  description: {name}이 위점막 염증과 궤양성 손상을 만든다.
  learnText: H. pylori는 만성 위염, 소화성 궤양, 위암/MALT lymphoma와 연결된다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 구토, 통증, 괴사
      증상: 구토, 통증, 괴사
      effect:
      description: {name}이 위점막을 자극해 통증과 구토감을 남겼다.
      learnText: 복통/속쓰림은 공식 상태이상 `통증`으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 22, 33
- 제균요법 예시 중심이라 보류되었지만 캐릭터 컨셉은 명확하다.
