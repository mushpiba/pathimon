# 패시몬 노트

이름:
학명: 수막구균(Neisseria meningitidis)
타입: 세균
태그:
- structure: 그람음성쌍알균
- location: 비인두/혈류/수막
- pathway: 호흡기비말
방어특성: 협막

이미지:
- 대표 시각 특징: 그람음성 쌍알균, 비인두 보균, 협막, 수막염, 보체결핍 위험
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 협막 방울에 든 쌍알균이 수막 모양 방패와 보체 조각을 피하는 픽셀풍 몬스터
- 실사풍: Neisseria meningitidis diplococci or meningococcal rash/meningitis 교육용 참고형 이미지

능력치:
- HP: 78
- 공격: 72
- 방어: 66

기술:
- 이름: 비인두 보균
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 비인두에 숨어 비말 전파를 준비한다.
  learnText: N. meningitidis는 비인두 보균과 호흡기 비말 전파, 협막성 침습 감염을 기억한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 비인두 안에 협막을 두르고 숨었다.
      learnText: 보체 결핍과 수막구균 감염 위험은 면역학 강의와도 연결된다.

- 이름: 수막 침습
  종류: 공격기
  타입: 침습
  위력: 70
  명중: 100%
  effect:
  description: {name}이 혈류를 타고 수막에 염증을 만든다.
  learnText: Meningococcus는 급성 세균성 수막염의 중요한 원인균이다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 신경 이상
      증상: 발열, 신경 이상
      effect:
      description: {name}이 수막 염증으로 열과 신경 이상을 만들었다.
      learnText: 수막염은 발열과 신경 이상 조합으로 표현한다.

- 이름: 협막 보체회피
  종류: 전용기
  타입: 방어
  위력: 0
  명중: 100%
  effect:
  description: {name}이 협막으로 보체와 포식 공격을 피한다.
  learnText: 수막구균 협막과 보체 결핍 위험은 핵심 면역학 포인트다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 협막으로 보체 공격을 흘렸다.
      learnText: 임균과 달리 협막을 전용기 중심에 둔다.

메모:
- 2차 보류 후보.
- 출처 강의: 07, 17, 21, 22
