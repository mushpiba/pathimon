# 패시몬 노트

이름: 하이퍼클렙
학명: 고병원성 폐렴막대균(Hypervirulent Klebsiella pneumoniae, hvKP)
타입: 세균 병원형
태그:
- structure: 그람음성
- location: 세포외
- pathway: 혈류/간/눈
방어특성: 과점액협막
메모:
- 세균 병원형 타입이며 방어특성은 과점액협막이다.
- 그람음성 구조와 세포외 위치가 핵심이다.
- 혈류, 간, 눈 경로로 감염될 수 있다.
- 과점액 협막 팽창와 간농양 형성, 전이성 안구침범이 대표 병인이다.

이미지:
- 대표 시각 특징: hypermucoviscous string test, 간농양, 전이성 감염, 안구 침범
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 길게 늘어나는 점액 실을 휘두르는 막대균이 간 모양 방패와 눈 표식을 든 픽셀풍 몬스터
- 실사풍: string test 양성 mucoid colony 또는 hvKP 간농양/전이 감염 교육용 참고형 이미지

능력치:
- HP: 92
- 공격: 82
- 방어: 82

기술:
- 이름: 과점액 협막 팽창
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 끈처럼 늘어나는 과점액 협막을 부풀린다.
  learnText: hvKP는 hypermucoviscous phenotype과 침습성 감염으로 일반 Klebsiella와 구분한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}의 협막이 길게 늘어나며 방어막을 만들었다.
      learnText: string test는 hvKP를 떠올리는 강한 시각 키워드다.

- 이름: 간농양 형성
  종류: 공격기
  타입: 조직융해
  위력: 70
  명중: 100%
  effect:
  description: {name}이 간 조직에 농양성 병소를 만든다.
  learnText: hvKP는 community-acquired liver abscess와 연결해 기억할 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 부종
      증상: 발열, 부종
      effect:
      description: {name}이 깊은 장기에 농양과 발열을 남겼다.
      learnText: 농양성 병변은 발열과 부종 상태로 표현했다.

- 이름: 전이성 안구침범
  종류: 공격기
  타입: 침습
  위력: 60
  명중: 100%
  effect:
  description: {name}이 혈류를 타고 눈까지 전이성 감염을 만든다.
  learnText: hvKP는 endophthalmitis 같은 metastatic infection 위험을 떠올릴 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 시력 이상
      증상: 시력 이상
      effect:
      description: {name}이 전이성 감염으로 시야를 흐리게 했다.
      learnText: 세레우톡스와 달리 hvKP는 혈류 전이성 안구침범으로 차별화한다.

- 이름: 하이퍼점액 실검
  종류: 전용기
  타입: 방어
  위력: 0
  명중: 100%
  effect:
  description: {name}이 끈처럼 늘어나는 점액 실로 전장을 감싼다.
  learnText: hvKP의 hypermucoviscosity는 전용기 소재로 가장 직관적이다.
  결과:
    - 확률: 100%
      효과: 무적(3)
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 과점액 실 속에 숨어 공격을 버텼다.
      learnText: 점액성 협막은 포식 회피와 전이성 감염 위험을 함께 떠올리게 한다.


작업메모:
- 후보 번호: 28
- 출처 강의: 33
- 일반 K. pneumoniae와 중복되므로 최종 검수 때 별도 패시몬/진화형/변이형 여부를 결정해야 한다.
