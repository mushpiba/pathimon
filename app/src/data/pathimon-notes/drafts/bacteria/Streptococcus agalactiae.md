# 패시몬 노트

이름:
학명: 무유성연쇄상구균(Streptococcus agalactiae)
타입: 세균
태그:
- structure: 그람양성
- location: 생식기/장관/혈류
- pathway: 수직감염
방어특성: 협막

이미지:
- 대표 시각 특징: Group B streptococcus, 신생아 감염, 산도 수직감염, 협막
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 파란 협막을 두른 짧은 사슬 알균이 신생아 담요 표식 옆에 있는 픽셀풍 몬스터
- 실사풍: GBS gram-positive cocci in chains 또는 neonatal sepsis/meningitis 교육용 참고형 이미지

능력치:
- HP: 76
- 공격: 58
- 방어: 64

기술:
- 이름: 산도 정착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 산도와 장관에 정착해 수직감염을 준비한다.
  learnText: Group B streptococcus는 산모 보균과 신생아 감염 예방 맥락에서 중요하다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 출생 경로에 조용히 자리 잡았다.
      learnText: GBS는 산전 선별검사와 예방적 항생제 개념으로도 연결된다.

- 이름: 신생아 침습
  종류: 공격기
  타입: 침습
  위력: 60
  명중: 100%
  effect:
  description: {name}이 신생아 혈류와 중추신경계로 침습한다.
  learnText: S. agalactiae는 신생아 sepsis, pneumonia, meningitis 원인으로 기억한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 신경 이상
      증상: 발열, 신경 이상
      effect:
      description: {name}이 약한 방어선을 넘어 전신 염증을 만들었다.
      learnText: 수막염/패혈증은 발열과 신경 이상 조합으로 임시 표현했다.

- 이름: 협막 신생아 방패
  종류: 전용기
  타입: 방어
  위력: 0
  명중: 100%
  effect:
  description: {name}이 협막으로 포식세포 접근을 막는다.
  learnText: GBS 협막은 항포식 인자로 병원성에 중요하다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상:
      증상:
      effect:
      description: {name}이 협막을 두껍게 만들어 방어를 버텼다.
      learnText: 협막균 감염은 숙주 면역 성숙도와도 연결해 생각할 수 있다.

메모:
- 2차 보류 후보.
- 출처 강의: 25
- 신생아 감염 컨셉은 강하지만 현재 후보표에서는 설명량이 짧아 보류되어 있다.
