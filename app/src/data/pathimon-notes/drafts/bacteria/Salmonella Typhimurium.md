# 패시몬 노트

이름: 쥐살모
학명: 쥐티푸스균(Salmonella Typhimurium)
타입: 세균
태그:
- structure: 그람음성
- location: 세포내
- pathway: 소화기/동물성식품
방어특성: 세포내생존
메모:
- 세균 타입이며 방어특성은 세포내생존이다.
- 그람음성 구조와 세포내 위치가 핵심이다.
- 소화기, 동물성식품 경로로 감염될 수 있다.
- M세포 침입와 SPI 주입, 염증성 설사이 대표 병인이다.

이미지:
- 대표 시각 특징: 비장티푸스성 장염, M cell 침입, 염증성 설사
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 장상피 문을 들이받는 작은 막대균 돌격대 픽셀 몬스터
- 실사풍: Salmonella Typhimurium 장상피 침입 또는 비장티푸스성 salmonellosis 참고형 이미지

능력치:
- HP: 74
- 공격: 66
- 방어: 52

기술:
- 이름: M세포 침입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 M세포를 통해 장 점막 안으로 들어간다.
  learnText: Salmonella는 장상피/M cell을 통해 침입하고 염증성 장염을 만들 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 장 점막의 문을 뚫었다.
      learnText: Typhimurium은 비장티푸스성 살모넬라 장염 후보로 Enteritidis와 함께 다룬다.

- 이름: SPI 주입
  종류: 공격기
  타입: 침습
  위력: 55
  명중: 100%
  effect:
  description: {name}이 분비 시스템으로 숙주세포 반응을 조작한다.
  learnText: Salmonella pathogenicity island와 type III secretion은 침습성 병인 설명에 어울린다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 세포 신호를 조작해 방어선을 흔들었다.
      learnText: 장내세균과 병원성은 분비 시스템과 독력 인자로 차별화할 수 있다.

- 이름: 염증성 설사
  종류: 공격기
  타입: 소화기
  위력: 50
  명중: 100%
  effect:
  description: {name}이 장 점막 염증으로 설사를 일으킨다.
  learnText: 비장티푸스성 Salmonella 감염은 장염, 발열, 설사로 정리한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상, 발열
      증상: 배설 이상, 발열
      effect:
      description: {name}이 염증성 장염을 일으켰다.
      learnText: 침습성 장염은 발열이 동반될 수 있다.

- 이름: 세포내 살모넬라 소굴
  종류: 전용기
  타입: 방어
  위력: 0
  명중: 100%
  effect:
  description: {name}이 세포 안 소굴을 만들어 면역 압박을 견딘다.
  learnText: Salmonella는 세포내 생존과 장염을 함께 표현할 수 있다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 피로
      증상: 피로
      effect:
      description: {name}이 세포내 소굴 속에서 버티며 전신 피로를 남겼다.
      learnText: Typhi와 달리 이 노트는 비장티푸스성 장염 중심으로 검수한다.


작업메모:
- 후보 번호: 21
- 출처 강의: 33
