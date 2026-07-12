# 패시몬 노트

이름: 파라파라
학명: 파라티푸스균(Salmonella Paratyphi)
타입: 세균
태그:
- structure: 그람음성
- location: 세포내
- pathway: 소화기/혈류
방어특성: 세포내생존
메모:
- 세균 타입이며 방어특성은 세포내생존이다.
- 그람음성 구조와 세포내 위치가 핵심이다.
- 소화기, 혈류 경로로 감염될 수 있다.
- 장관 통과와 파라티푸스 발열, 세포내 버티기이 대표 병인이다.

이미지:
- 대표 시각 특징: 장티푸스와 닮은 전신 발열, 장관 침입, 사람 숙주 적응
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 막대균이 장관 문을 통과하며 작은 열기 고리를 두른 픽셀풍 몬스터
- 실사풍: Salmonella Paratyphi 또는 장티푸스성 salmonellosis를 설명하는 교육용 참고형 이미지

능력치:
- HP: 78
- 공격: 65
- 방어: 60

기술:
- 이름: 장관 통과
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 장관을 지나 전신 발열 감염을 준비한다.
  learnText: Salmonella Paratyphi는 paratyphoid fever를 일으키며 Typhi와 함께 장티푸스성 살모넬라로 다룰 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 장 점막을 넘어 혈류 쪽으로 향했다.
      learnText: Paratyphi는 Typhi와 닮았지만 별도 혈청형/원인균으로 정리한다.

- 이름: 파라티푸스 발열
  종류: 공격기
  타입: 면역매개
  위력: 55
  명중: 100%
  effect:
  description: {name}이 장티푸스와 닮은 발열 양상을 만든다.
  learnText: Paratyphoid fever도 지속 발열과 전신 증상으로 접근한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열
      증상: 발열
      effect:
      description: {name}이 오래가는 발열을 일으켰다.
      learnText: 장티푸스성 감염은 단순 식중독과 구분해서 기억한다.

- 이름: 세포내 버티기
  종류: 공격기
  타입: 방어
  위력: 0
  명중: 100%
  effect:
  description: {name}이 대식세포 안에서 전신 확산 기회를 기다린다.
  learnText: Salmonella의 세포내 생존 능력은 전신 감염을 설명하는 데 중요하다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과: 무적(1)
      상태이상: 피로
      증상: 피로
      effect:
      description: {name}이 세포 안에서 버티며 전신 피로를 누적시켰다.
      learnText: 세포내 생존은 장내세균과 안에서도 중요한 병원성 차이를 만든다.

- 이름: 장티푸스성 확산
  종류: 전용기
  타입: 침습
  위력: 70
  명중: 100%
  effect:
  description: {name}이 장관 감염을 전신 발열로 확장한다.
  learnText: Paratyphi는 Typhi보다 덜 강조되더라도 장티푸스성 감염군으로 함께 기억한다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 발열, 피로
      증상: 발열, 피로
      effect:
      description: {name}이 파라티푸스성 발열을 전장에 퍼뜨렸다.
      learnText: Typhi와 비교 검수하면서 전용기 차별화가 필요하다.


작업메모:
- 후보 번호: 19
- 출처 강의: 33
- Typhi와 너무 겹칠 수 있어 최종 검수 때 통합/변이 처리 여부를 판단해야 한다.
