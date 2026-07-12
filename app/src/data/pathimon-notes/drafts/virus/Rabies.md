# 패시몬 노트

이름:
학명: 광견병바이러스(Rabies virus)
타입: 바이러스
태그:
- structure: 외피보유/RNA/탄환형
- location: 말초신경/중추신경계
- pathway: 동물교상/타액
방어특성: 신경축삭이동

이미지:
- 대표 시각 특징: 탄환형 virion, 동물 교상, 역행성 축삭 이동, 공수증
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 탄환 모양 바이러스가 신경선을 거슬러 올라가는 픽셀풍 몬스터
- 실사풍: bullet-shaped rabies virion EM 또는 Negri body 교육용 참고형 이미지

능력치:
- HP: 72
- 공격: 84
- 방어: 56

기술:
- 이름: 동물교상 진입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 타액이 묻은 상처로 들어온다.
  learnText: Rabies는 동물 교상 뒤 말초신경을 타고 이동하는 바이러스다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 상처 주변 신경 끝을 붙잡았다.
      learnText: 준비기는 bite exposure와 peripheral nerve entry를 표현했다.

- 이름: 축삭 역행
  종류: 공격기
  타입: 신경
  위력: 70
  명중: 100%
  effect:
  description: {name}이 축삭을 거슬러 중추신경계로 올라간다.
  learnText: Retrograde axonal transport는 광견병의 중요한 병인 이미지다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 신경 이상
      증상: 신경 이상
      effect:
      description: {name}이 신경 길을 거꾸로 타고 올라갔다.
      learnText: 신경계 침범은 공식 상태이상 신경 이상으로 표현했다.

- 이름: 공수증 발작
  종류: 전용기
  타입: 신경
  위력: 95
  명중: 100%
  effect:
  description: {name}이 삼킴 근육과 신경 반응을 공포처럼 뒤틀어 놓는다.
  learnText: Hydrophobia는 rabies의 대표 임상 이미지다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 신경 이상, 마비
      증상: 신경 이상, 마비
      effect:
      description: {name}이 신경 반응을 폭주시켜 몸을 굳게 했다.
      learnText: 공수증/연하곤란은 공식 상태이상 안에서 신경 이상과 마비로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 10, 11, 22, 33
- 공포/연하곤란 전용 상태이상은 만들지 않았다.
