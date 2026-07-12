# 패시몬 노트

이름:
학명: 레지오넬라균(Legionella pneumophila)
타입: 세균
태그:
- structure: 그람음성
- location: 대식세포내/수계환경
- pathway: 에어로졸흡입/호흡기
방어특성: 식포융합차단

이미지:
- 대표 시각 특징: 냉각탑 물안개, 에어로졸, 대식세포 안 증식, 폐렴
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 물안개 왕관을 쓴 막대균이 대식세포 방 안에서 식포융합 금지 표식을 든 픽셀풍 몬스터
- 실사풍: Legionella intracellular growth in macrophage 또는 수계 biofilm/에어로졸 교육용 참고형 이미지

능력치:
- HP: 76
- 공격: 70
- 방어: 64

기술:
- 이름: 에어로졸 흡입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 물안개를 타고 호흡기로 들어온다.
  learnText: Legionella는 냉각탑, 샤워기 같은 수계 환경의 에어로졸 흡입과 연결된다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 폐포 깊숙한 곳에 물안개처럼 스며들었다.
      learnText: 사람 간 전파보다 오염된 물 에어로졸 흡입을 떠올리는 것이 핵심이다.

- 이름: 식포융합 차단
  종류: 공격기
  타입: 세포내
  위력: 55
  명중: 100%
  effect:
  description: {name}이 대식세포 안에서 분해 경로를 피해 증식한다.
  learnText: Legionella는 phagolysosome fusion을 방해해 대식세포 안에서 살아남는다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 대식세포의 소화 경로를 비껴 갔다.
      learnText: 세포내 생존과 식포융합 차단은 면역 이상으로 임시 표현했다.

- 이름: 레지오넬라 폐렴
  종류: 공격기
  타입: 호흡기
  위력: 75
  명중: 100%
  effect:
  description: {name}이 폐포에 염증성 안개를 퍼뜨린다.
  learnText: Legionella pneumonia는 고열, 기침, 호흡기 증상과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 기침, 호흡 곤란
      증상: 기침, 호흡 곤란
      effect:
      description: {name}이 폐포를 물안개로 채워 숨길을 좁혔다.
      learnText: 호흡기 침범은 기침과 호흡 곤란 조합으로 표현했다.

- 이름: 냉각탑 에어로졸
  종류: 전용기
  타입: 호흡기
  위력: 85
  명중: 100%
  effect:
  description: {name}이 냉각탑 물안개를 전장 전체에 퍼뜨린다.
  learnText: 집단 발생 맥락에서는 오염된 수계 에어로졸을 먼저 떠올린다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 기침, 발열, 배설 이상
      증상: 기침, 발열, 배설 이상
      effect:
      description: {name}이 물안개 속에서 폐와 장 증상을 동시에 흔들었다.
      learnText: 레지오넬라는 폐렴 외에도 소화기/신경 증상이 함께 언급될 수 있어 배설 이상을 보조로 넣었다.

메모:
- 2차 보류 후보.
- 출처 강의: 04, 13, 22, 33
- 저나트륨혈증 같은 특징은 공식 상태이상이 없어 기술 설명/learnText에만 남겼다.
