# 패시몬 노트

이름: 장침콜리
학명: 장침습성 대장균(EIEC, Enteroinvasive E. coli)
타입: 세균 병원형
태그:
- structure: 그람음성
- location: 세포내
- pathway: 소화기
방어특성: 세포내침입
메모:
- 세균 병원형 타입이며 방어특성은 세포내침입이다.
- 그람음성 구조와 세포내 위치가 핵심이다.
- 소화기 경로로 감염될 수 있다.
- 대장상피 침입와 세포내 확산, 염증성 이질이 대표 병인이다.

이미지:
- 대표 시각 특징: 대장 상피 침입, Shigella 유사 병인, 염증성 설사
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 장상피 벽을 뚫고 들어가는 작은 막대균 부대 형태의 픽셀풍 몬스터
- 실사풍: invasive E. coli/Shigella-like colonic invasion을 설명하는 교육용 참고형 이미지

능력치:
- HP: 70
- 공격: 70
- 방어: 50

기술:
- 이름: 대장상피 침입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 대장 상피 안으로 침입할 준비를 한다.
  learnText: EIEC는 Shigella처럼 장상피 침입과 염증성 설사로 설명할 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 대장 점막 방어선을 파고들었다.
      learnText: 침습성 장염은 독소성 수양성 설사와 구분된다.

- 이름: 세포내 확산
  종류: 공격기
  타입: 침습
  위력: 60
  명중: 100%
  effect:
  description: {name}이 세포 안에서 옆 세포로 퍼진다.
  learnText: 침습성 병원체는 장상피 손상과 염증 반응을 일으킨다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열
      증상: 발열
      effect:
      description: {name}이 상피세포 사이를 넘어 염증을 키웠다.
      learnText: 발열은 침습성 장염에서 독소성 수양성 설사보다 더 어울리는 상태이상이다.

- 이름: 염증성 이질
  종류: 공격기
  타입: 소화기
  위력: 55
  명중: 100%
  effect:
  description: {name}이 대장 점막 염증으로 피 섞인 설사 양상을 만든다.
  learnText: EIEC는 dysentery-like illness로 정리할 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 출혈
      증상: 출혈
      effect:
      description: {name}이 대장 점막을 손상시켜 출혈을 일으켰다.
      learnText: 이질 양상은 대장 침습과 점막 손상을 떠올리면 된다.

- 이름: 쉬겔라식 돌파
  종류: 전용기
  타입: 침습
  위력: 75
  명중: 100%
  effect:
  description: {name}이 쉬겔라처럼 상피 방어선을 연속 돌파한다.
  learnText: EIEC는 병원성 기전이 Shigella와 비슷하다는 점이 핵심 구분점이다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 출혈, 발열
      증상: 출혈, 발열
      effect:
      description: {name}이 장상피를 뚫고 염증성 전장을 만들었다.
      learnText: 병원형 이름의 invasive가 곧 이 패시몬의 핵심 컨셉이다.


작업메모:
- 후보 번호: 16
- 출처 강의: 33
