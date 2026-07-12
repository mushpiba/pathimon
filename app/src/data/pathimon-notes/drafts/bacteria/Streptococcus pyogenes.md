# 패시몬 노트

이름: 화농체인
학명: 화농성연쇄상구균(Streptococcus pyogenes)
타입: 세균
태그:
- structure: 그람양성
- location: 세포외
- pathway: 호흡기/피부
방어특성: M단백
메모:
- 세균 타입이며 방어특성은 M단백이다.
- 그람양성 구조와 세포외 위치가 핵심이다.
- 호흡기, 피부 경로로 감염될 수 있다.
- 인두 피부 부착와 스트렙톨리신, 발열 외독소이 대표 병인이다.

이미지:
- 대표 시각 특징: 사슬 모양 알균, 인두염/피부 감염, 붉은 독소 발진과 조직 침습
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 붉은 사슬 알균이 스카프처럼 휘감기고, 날카로운 M단백 가시가 돋은 픽셀풍 몬스터
- 실사풍: gram-positive cocci in chains 또는 beta-hemolysis 집락을 보여주는 교육용 참고형 이미지

능력치:
- HP: 75
- 공격: 70
- 방어: 55

기술:
- 이름: 인두 피부 부착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 인두와 피부 표면에 사슬처럼 달라붙는다.
  learnText: S. pyogenes는 인두염, 피부 감염, 독소성 질환, 감염 후 합병증과 연결된다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 점막과 피부의 약한 틈을 붙잡았다.
      learnText: Group A streptococcus는 beta-hemolytic streptococcus의 대표다.

- 이름: 스트렙톨리신
  종류: 공격기
  타입: 독소
  위력: 55
  명중: 100%
  effect:
  description: {name}이 용혈 독소로 세포막을 흔든다.
  learnText: Streptolysin O/S는 용혈과 조직 손상 이미지로 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 출혈
      증상: 출혈
      effect:
      description: {name}의 용혈 독소가 조직을 붉게 무너뜨렸다.
      learnText: ASO 같은 항체 반응은 streptolysin O와 연결해 기억할 수 있다.

- 이름: 발열 외독소
  종류: 공격기
  타입: 독소
  위력: 65
  명중: 100%
  effect:
  description: {name}이 발열성 외독소로 전신 반응을 일으킨다.
  learnText: Streptococcal pyrogenic exotoxin은 성홍열이나 독성 쇼크 양상과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열
      증상: 발열
      effect:
      description: {name}이 붉은 발진 같은 열성 반응을 끌어냈다.
      learnText: 독소성 질환에서는 균의 위치보다 독소가 만든 전신 반응이 중요하다.

- 이름: M단백 위장
  종류: 전용기
  타입: 방어
  위력: 0
  명중: 100%
  effect:
  description: {name}이 M단백으로 포식과 보체 공격을 피한다.
  learnText: M protein은 S. pyogenes의 중요한 항포식 인자다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 M단백 가시로 면역 공격을 흘려냈다.
      learnText: 감염 후 류마티스열 같은 면역학적 합병증도 S. pyogenes 학습 포인트다.


작업메모:
- 후보 번호: 9
- 출처 강의: 13, 25
- `성홍열`, `류마티스열`은 별도 상태이상으로 만들지 않고 learnText에만 남겼다.
