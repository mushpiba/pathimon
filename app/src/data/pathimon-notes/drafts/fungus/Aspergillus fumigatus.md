# 패시몬 노트

이름:
학명: 훈증곰팡이(Aspergillus fumigatus)
타입: 진균
태그:
- structure: 격벽균사/분생포자
- location: 호흡기/혈관
- pathway: 포자흡입/기회감염
방어특성: 포자분산

이미지:
- 대표 시각 특징: 공기 중 분생포자, 격벽균사, 급각분지, 혈관침습
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 작은 포자 구름에서 날카로운 각도의 균사가 뻗어 나오는 픽셀풍 몬스터
- 실사풍: Aspergillus septate hyphae with acute-angle branching 또는 conidial head 교육용 참고형 이미지

능력치:
- HP: 74
- 공격: 78
- 방어: 62

기술:
- 이름: 포자 흡입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 공기 중 포자로 폐 깊숙이 들어온다.
  learnText: Aspergillus는 공기 중 포자 흡입으로 시작하는 기회감염 이미지를 잡으면 좋다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}의 포자가 폐포 쪽에 내려앉았다.
      learnText: 준비기는 inhaled conidia를 표현했다.

- 이름: 균사 혈관침습
  종류: 공격기
  타입: 침습
  위력: 75
  명중: 100%
  effect:
  description: {name}이 날카로운 균사로 혈관을 파고든다.
  learnText: 침습성 aspergillosis에서는 혈관침습과 괴사가 중요하다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 출혈, 괴사
      증상: 출혈, 괴사
      effect:
      description: {name}의 균사가 혈관 벽을 찢고 괴사를 남겼다.
      learnText: angioinvasion은 출혈과 괴사 조합으로 표현했다.

- 이름: 알레르기 균사구름
  종류: 공격기
  타입: 면역매개
  위력: 55
  명중: 100%
  effect:
  description: {name}이 포자 구름으로 기관지를 예민하게 만든다.
  learnText: Aspergillus는 침습성 감염 외에도 알레르기성 기관지폐 아스페르길루스증과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 기침
      증상: 기침
      effect:
      description: {name}의 포자 구름이 기침을 끌어냈다.
      learnText: 호흡기 자극은 공식 상태이상 기침으로 표현했다.

- 이름: 급각분지 침습
  종류: 전용기
  타입: 진균
  위력: 95
  명중: 100%
  effect:
  description: {name}이 예각으로 갈라지는 균사를 한꺼번에 뻗는다.
  learnText: Septate hyphae with acute-angle branching은 Aspergillus의 대표 현미경 이미지다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 괴사, 호흡 곤란
      증상: 괴사, 호흡 곤란
      effect:
      description: {name}의 예각 균사가 폐 조직을 잠식했다.
      learnText: 전용기는 현미경 형태와 침습성 폐 감염을 함께 살린 초안이다.

메모:
- 2차 보류 후보.
- 출처 강의: 19, 22, 33
- Mucorales와 구분되는 예각 분지/격벽균사 이미지를 강조한다.
