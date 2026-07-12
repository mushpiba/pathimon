# 패시몬 노트

이름:
학명: 프로테우스 미라빌리스(Proteus mirabilis)
타입: 세균
태그:
- structure: 그람음성
- location: 요로
- pathway: 요로/카테터
방어특성: 편모운동

이미지:
- 대표 시각 특징: swarming motility, urease 양성, 요로감염, struvite stone
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 소용돌이 편모를 휘두르며 결정 방패를 만드는 막대균 픽셀풍 몬스터
- 실사풍: Proteus swarming colony 또는 struvite stone/UTI 교육용 참고형 이미지

능력치:
- HP: 74
- 공격: 64
- 방어: 58

기술:
- 이름: 요로 상승운동
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 편모 swarm으로 요로 표면을 타고 오른다.
  learnText: Proteus mirabilis는 요로감염, urease, swarming motility로 기억하기 좋다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 소용돌이 무늬처럼 퍼져 요로를 올라갔다.
      learnText: UPEC와 달리 swarming과 urease/결석을 강조한다.

- 이름: 유레아제 알칼리화
  종류: 공격기
  타입: 효소
  위력: 50
  명중: 100%
  effect:
  description: {name}이 urea를 분해해 요로 환경을 바꾼다.
  learnText: Proteus의 urease는 소변 pH 상승과 struvite stone 형성으로 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상, 부종, 통증
      증상: 배뇨 이상, 부종, 통증
      effect:
      description: {name}이 결정이 생기기 쉬운 환경을 만들고 배설 리듬과 통증을 흔들었다.
      learnText: 요로결석의 통증은 `통증`, 배뇨 이상은 `배설 이상`으로 표현했다.

- 이름: 스트루바이트 결석
  종류: 전용기
  타입: 요로
  위력: 70
  명중: 100%
  effect:
  description: {name}이 감염성 결석을 만들어 흐름을 막는다.
  learnText: Proteus UTI는 struvite stone과 연결해 구분하면 좋다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 배설 이상, 부종, 통증
      증상: 배뇨 이상, 부종, 통증
      effect:
      description: {name}이 결정 장벽을 만들어 흐름을 막고 통증을 남겼다.
      learnText: 결석 통증은 `통증`, 배뇨 이상은 `배설 이상`으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 21, 33
- 배뇨 이상은 `배설 이상`으로 표현하고, 결석 자체는 증상/description에 남긴다.
