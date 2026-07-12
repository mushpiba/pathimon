# 패시몬 노트

이름:
학명: 장염예르시니아균(Yersinia enterocolitica)
타입: 세균
태그:
- structure: 그람음성
- location: 장관/림프절
- pathway: 소화기/돼지고기
방어특성: 저온증식

이미지:
- 대표 시각 특징: 돼지고기/저온 보관, 회장말단/장간막 림프절염, pseudoappendicitis
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 냉기 낀 돼지고기 조각 위에 앉아 림프절 구슬을 든 막대균 픽셀풍 몬스터
- 실사풍: Yersinia enterocolitica 또는 mesenteric lymphadenitis 교육용 참고형 이미지

능력치:
- HP: 76
- 공격: 62
- 방어: 56

기술:
- 이름: 냉장 식품 잠입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 냉장 식품과 돼지고기를 타고 장관에 들어간다.
  learnText: Y. enterocolitica는 장염과 장간막 림프절염, 저온 증식 가능성으로 기억할 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 차가운 식품 속에서 버티며 감염을 준비했다.
      learnText: 냉장 보관이 모든 세균 증식을 완전히 막지는 못한다.

- 이름: 장간막 림프절염
  종류: 공격기
  타입: 소화기
  위력: 55
  명중: 100%
  effect:
  description: {name}이 장간막 림프절을 부풀려 충수염처럼 보이게 한다.
  learnText: Yersinia enterocolitica는 pseudoappendicitis와 연결해 기억하기 좋다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 부종, 통증
      증상: 부종, 통증
      effect:
      description: {name}이 림프절을 부풀려 복부 통증을 남겼다.
      learnText: 복통은 공식 상태이상 `통증`으로 표현했다.

- 이름: 장염 돌파
  종류: 전용기
  타입: 소화기
  위력: 65
  명중: 100%
  effect:
  description: {name}이 회장말단과 대장을 자극해 장염을 일으킨다.
  learnText: 장내세균과 후보지만 Y. pestis보다 우선도는 낮아 2차 draft로 둔다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 배설 이상, 발열
      증상: 배설 이상, 발열
      effect:
      description: {name}이 장염과 열성 반응을 함께 일으켰다.
      learnText: Yersinia 종별 차이는 최종 검수에서 정리한다.

메모:
- 2차 보류 후보.
- 출처 강의: 33
