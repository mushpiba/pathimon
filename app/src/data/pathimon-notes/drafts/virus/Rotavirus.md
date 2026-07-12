# 패시몬 노트

이름:
학명: 로타바이러스(Rotavirus)
타입: 바이러스
태그:
- structure: 비외피/dsRNA/분절유전체
- location: 소장융모
- pathway: 분변-경구/소아장염
방어특성: 이중캡시드

이미지:
- 대표 시각 특징: 바퀴 모양 capsid, 소아 설사, NSP4 장독소, 탈수
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 바퀴처럼 생긴 바이러스가 소장 융모 위를 굴러가며 물방울을 흩뿌리는 픽셀풍 몬스터
- 실사풍: rotavirus wheel-like virion EM 또는 villous enterocyte injury 교육용 참고형 이미지

능력치:
- HP: 70
- 공격: 68
- 방어: 68

기술:
- 이름: 소아 장관 진입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 분변-경구 경로로 소장까지 들어온다.
  learnText: Rotavirus는 영유아 수양성 설사와 탈수를 떠올리게 한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 바퀴처럼 소장 표면에 내려앉았다.
      learnText: 준비기는 소아 장관 감염의 시작점을 표현했다.

- 이름: NSP4 장독소
  종류: 공격기
  타입: 장관
  위력: 65
  명중: 100%
  effect:
  description: {name}이 장세포의 물 흐름을 뒤틀어 설사를 만든다.
  learnText: NSP4는 rotavirus의 enterotoxin처럼 설명되는 핵심 단서다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상, 탈수
      증상: 배설 이상, 탈수
      effect:
      description: {name}이 장관 수분을 빼앗아 탈수를 남겼다.
      learnText: 설사는 배설 이상, 수분 손실은 탈수로 표현한다.

- 이름: 바퀴형 캡시드
  종류: 전용기
  타입: 장관
  위력: 75
  명중: 100%
  effect:
  description: {name}이 바퀴 같은 이중 capsid로 장관을 굴러다닌다.
  learnText: Rotavirus라는 이름은 wheel-like appearance에서 온다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 배설 이상, 탈수, 구토
      증상: 배설 이상, 탈수, 구토
      effect:
      description: {name}이 장관 증상을 한꺼번에 굴려 보냈다.
      learnText: 소아 급성 위장관염 증상을 공식 상태이상 조합으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 10, 22, 33
- Norovirus와 달리 소아/바퀴형/NSP4 이미지를 강조한다.
