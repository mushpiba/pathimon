# 패시몬 노트

이름: 장벽돌
학명: 장응집성 대장균(EAEC, Enteroaggregative E. coli)
타입: 세균 병원형
태그:
- structure: 그람음성
- location: 세포외
- pathway: 소화기
방어특성: 바이오필름
메모:
- 세균 병원형 타입이며 방어특성은 바이오필름이다.
- 그람음성 구조와 세포외 위치가 핵심이다.
- 소화기 경로로 감염될 수 있다.
- 집합 부착와 점액 바이오필름, 장점막 자극이 대표 병인이다.

이미지:
- 대표 시각 특징: stacked-brick pattern, 장 점막 위 끈적한 biofilm, 지속성 설사
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 벽돌처럼 층층이 쌓인 막대균들이 끈적한 막으로 연결된 픽셀풍 몬스터
- 실사풍: aggregative adherence pattern 또는 biofilm성 장 점막 부착을 설명하는 교육용 참고형 이미지

능력치:
- HP: 80
- 공격: 55
- 방어: 70

기술:
- 이름: 집합 부착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 장 점막 위에 벽돌처럼 모여 붙는다.
  learnText: EAEC는 stacked-brick aggregative adherence pattern으로 기억하기 좋다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 장 점막 위에 집합성 군락을 만들었다.
      learnText: 집합성 부착은 장기적인 설사와 biofilm 이미지를 만든다.

- 이름: 점액 바이오필름
  종류: 공격기
  타입: 부착
  위력: 45
  명중: 100%
  effect:
  description: {name}이 끈적한 막으로 장 점막을 덮는다.
  learnText: EAEC는 biofilm을 형성하며 지속성 설사와 연결될 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}의 끈적한 막이 장 점막을 자극했다.
      learnText: 지속성 설사는 단발성 독소보다 정착과 biofilm의 느낌이 강하다.

- 이름: 장점막 자극
  종류: 공격기
  타입: 소화기
  위력: 40
  명중: 100%
  effect:
  description: {name}이 장 점막을 오래 자극해 체력을 깎는다.
  learnText: EAEC는 급격한 침습보다 지속적인 장 점막 자극으로 표현하기 좋다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 피로
      증상: 피로
      effect:
      description: {name}이 오래 이어지는 장 불편감을 만들었다.
      learnText: 만성/지속성 양상은 전투에서 누적형 상태이상과 잘 어울린다.

- 이름: 벽돌쌓기 군락
  종류: 전용기
  타입: 방어
  위력: 0
  명중: 100%
  effect:
  description: {name}이 벽돌처럼 겹겹이 쌓여 제거하기 어려운 군락을 만든다.
  learnText: EAEC의 stacked-brick pattern은 다른 E. coli 병원형과 구분되는 시각 키워드다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}이 끈적한 벽돌 군락 속으로 숨어 버텼다.
      learnText: biofilm성 부착은 병원체가 쉽게 떨어지지 않는 느낌으로 표현할 수 있다.


작업메모:
- 후보 번호: 14
- 출처 강의: 33
