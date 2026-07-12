# 패시몬 노트

이름:
학명: 캄필로박터 제주니(Campylobacter jejuni)
타입: 세균
태그:
- structure: 그람음성/나선형
- location: 장관
- pathway: 가금류/소화기
방어특성: 미세호기성

이미지:
- 대표 시각 특징: 갈매기 날개 모양 curved rods, 가금류, 염증성 장염, Guillain-Barre syndrome 연관
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 갈매기 날개 모양으로 휘어진 균이 닭 깃털과 장염 불꽃을 두른 픽셀풍 몬스터
- 실사풍: Campylobacter curved gull-wing rods 또는 poultry-associated enteritis 교육용 참고형 이미지

능력치:
- HP: 72
- 공격: 66
- 방어: 48

기술:
- 이름: 가금류 섭취감염
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 덜 익힌 가금류를 통해 장관에 들어간다.
  learnText: C. jejuni는 가금류 관련 장염과 갈매기 날개 모양 균으로 기억하기 좋다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 장관에서 날개처럼 휘어진 몸을 펼쳤다.
      learnText: 장염 감별 후보지만 현재 강의 범위에서는 2차로 둔다.

- 이름: 염증성 장염
  종류: 공격기
  타입: 소화기
  위력: 60
  명중: 100%
  effect:
  description: {name}이 장 점막 염증으로 설사와 발열을 일으킨다.
  learnText: Campylobacter 장염은 염증성 설사, 복통, 발열을 떠올릴 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상, 발열, 통증
      증상: 배설 이상, 발열, 복통
      effect:
      description: {name}이 장 점막을 자극해 열성 장염을 만들었다.
      learnText: 복통은 공식 상태이상 `통증`으로 표현한다.

- 이름: 말초신경 교차반응
  종류: 전용기
  타입: 면역매개
  위력: 0
  명중: 100%
  effect:
  description: {name}이 감염 뒤 말초신경 혼선을 남긴다.
  learnText: C. jejuni는 Guillain-Barre syndrome과 연관될 수 있어 신경 이상 컨셉으로 잡기 좋다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 신경 이상, 마비
      증상: 신경 이상, 마비
      effect:
      description: {name}이 면역 교차반응으로 신경 신호를 흔들었다.
      learnText: GBS는 공식 상태이상 신경 이상/마비 조합으로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 33
