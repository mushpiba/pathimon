# 패시몬 노트

이름: 플렉시겔
학명: 플렉스너이질균(Shigella flexneri)
타입: 세균
태그:
- structure: 그람음성
- location: 세포내
- pathway: 소화기/분변구강
방어특성: 세포내침입
메모:
- 세균 타입이며 방어특성은 세포내침입이다.
- 그람음성 구조와 세포내 위치가 핵심이다.
- 소화기, 분변구강 경로로 감염될 수 있다.
- 대장 점막 침입와 Ipa 침입, 점막 궤양화이 대표 병인이다.

이미지:
- 대표 시각 특징: 대장 점막 침습, 세포간 actin 이동, 개발도상국/전형적 세균성 이질 이미지
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 붉은 대장 점막 위를 actin 꼬리로 미끄러지는 막대균 픽셀 몬스터
- 실사풍: Shigella flexneri 세포내 확산 또는 대장 점막 염증 참고형 이미지

능력치:
- HP: 72
- 공격: 74
- 방어: 48

기술:
- 이름: 대장 점막 침입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 대장 점막 아래로 파고들어 감염을 시작한다.
  learnText: S. flexneri는 Shigella의 대표적인 침습성 이질균으로 정리할 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 대장 점막 장벽을 통과했다.
      learnText: 이질균은 소장보다 대장 점막 침습 이미지가 강하다.

- 이름: Ipa 침입
  종류: 공격기
  타입: 침습
  위력: 55
  명중: 100%
  effect:
  description: {name}이 침입 단백으로 상피세포 안으로 들어간다.
  learnText: Shigella invasion plasmid antigens는 침습성 병인의 키워드로 쓸 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 침입 장비로 상피 방어를 흔들었다.
      learnText: 침습 인자는 병원형 E. coli와 비교하기 좋다.

- 이름: 점막 궤양화
  종류: 공격기
  타입: 조직융해
  위력: 60
  명중: 100%
  effect:
  description: {name}이 대장 점막을 손상시켜 궤양과 출혈을 만든다.
  learnText: Shigella 이질은 점막 손상, 염증, 혈변을 중심으로 기억한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 출혈
      증상: 출혈
      effect:
      description: {name}이 점막을 헐게 해 출혈을 일으켰다.
      learnText: 출혈 상태이상은 혈성 설사를 표현하는 범용 상태로 쓴다.

- 이름: 플렉스너 로켓
  종류: 전용기
  타입: 침습
  위력: 80
  명중: 100%
  effect:
  description: {name}이 actin 로켓으로 세포 사이를 연속 돌파한다.
  learnText: S. flexneri는 세포내 이동과 세포간 확산을 전용기 컨셉으로 삼기 좋다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 출혈, 발열
      증상: 출혈, 발열
      effect:
      description: {name}이 actin 로켓으로 점막 전체에 염증을 퍼뜨렸다.
      learnText: Listeria와 비슷한 actin 이동이지만 장 점막 이질 쪽으로 차별화한다.


작업메모:
- 후보 번호: 23
- 출처 강의: 33
