# 패시몬 노트

이름: 시가콜리
학명: 장출혈성/시가독소 생성 대장균(EHEC/STEC, E. coli O157:H7)
타입: 세균 병원형
태그:
- structure: 그람음성
- location: 세포외
- pathway: 소화기/오염식품
방어특성: 산저항
메모:
- 세균 병원형 타입이며 방어특성은 산저항이다.
- 그람음성 구조와 세포외 위치가 핵심이다.
- 소화기, 오염식품 경로로 감염될 수 있다.
- 산성 장벽 통과와 시가 독소, 장출혈 병변이 대표 병인이다.

이미지:
- 대표 시각 특징: 낮은 감염량, 햄버거병, Shiga toxin, 혈성 설사와 HUS
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 붉은 O157 방패와 시가 독소 창을 든 막대균 픽셀 몬스터
- 실사풍: E. coli O157:H7 또는 hemorrhagic colitis/HUS 학습용 참고 이미지

능력치:
- HP: 75
- 공격: 85
- 방어: 55

기술:
- 이름: 산성 장벽 통과
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 낮은 감염량으로 위산 장벽을 버티고 장까지 도달한다.
  learnText: EHEC/STEC는 낮은 infectious dose와 오염 식품 감염을 함께 기억한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 적은 수로도 장 점막에 도달했다.
      learnText: 낮은 감염량은 전파 위험과 식품 위생을 이해하는 데 중요하다.

- 이름: 시가 독소
  종류: 공격기
  타입: 독소
  위력: 80
  명중: 100%
  effect:
  description: {name}이 단백질 합성을 막는 시가 독소를 내보낸다.
  learnText: Shiga toxin은 60S ribosome을 억제하고 혈성 설사/HUS와 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 출혈
      증상: 출혈
      effect:
      description: {name}의 시가 독소가 장 점막을 붉게 손상시켰다.
      learnText: EHEC에서는 항생제 사용이 독소 방출과 관련해 조심스럽게 다뤄진다.

- 이름: 장출혈 병변
  종류: 공격기
  타입: 소화기
  위력: 65
  명중: 100%
  effect:
  description: {name}이 장 점막에 출혈성 손상을 만든다.
  learnText: EHEC는 watery diarrhea보다 bloody diarrhea 쪽으로 떠올리기 좋다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 괴사
      증상: 괴사
      effect:
      description: {name}이 장 점막을 괴사성으로 손상시켰다.
      learnText: 혈성 설사와 용혈요독증후군은 EHEC/STEC의 큰 학습 포인트다.

- 이름: HUS 연쇄
  종류: 전용기
  타입: 독소
  위력: 0
  명중: 100%
  effect:
  description: {name}이 시가 독소 손상을 전신 혈관 문제로 이어간다.
  learnText: HUS는 Shiga toxin 이후 생길 수 있는 심각한 합병증으로 정리한다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 출혈, 혈압 이상
      증상: 출혈, 혈압 이상
      effect:
      description: {name}이 미세혈관 손상을 연쇄적으로 일으켰다.
      learnText: HUS를 별도 상태이상으로 만들지는 않고 출혈/혈압 이상 조합으로 임시 표현했다.


작업메모:
- 후보 번호: 15
- 출처 강의: 17, 33
- `신장 손상/HUS` 상태이상은 공식 목록에 없어 `출혈`, `혈압 이상`으로 표현했다.
