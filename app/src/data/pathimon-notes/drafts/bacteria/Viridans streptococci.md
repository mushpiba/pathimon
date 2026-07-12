# 패시몬 노트

이름:
학명: 녹색연쇄상구균군(Viridans streptococci)
타입: 세균
태그:
- structure: 그람양성
- location: 구강/치면/심내막
- pathway: 구강상재/치과시술
방어특성: 바이오필름

이미지:
- 대표 시각 특징: 구강 정상균총, 치면 biofilm, 치아우식, 아급성 심내막염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 치아 위에 녹색 biofilm 망토를 펼친 사슬 알균 픽셀풍 몬스터
- 실사풍: alpha-hemolytic viridans streptococci 또는 dental plaque/endocarditis 교육용 참고형 이미지

능력치:
- HP: 74
- 공격: 52
- 방어: 70

기술:
- 이름: 치면 정착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 치면 biofilm 안에 자리 잡는다.
  learnText: Viridans streptococci는 구강 정상균총과 치면 biofilm, 심내막염 맥락으로 떠올릴 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 치아 표면에 얇은 biofilm을 만들었다.
      learnText: 정상균총이 혈류로 들어가면 다른 임상 문제가 될 수 있다.

- 이름: 덱스트란 접착
  종류: 공격기
  타입: 부착
  위력: 40
  명중: 100%
  effect:
  description: {name}이 끈적한 dextran으로 표면에 달라붙는다.
  learnText: S. mutans 등 viridans group은 dental plaque와 caries 개념으로 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 끈적한 막으로 방어선을 우회했다.
      learnText: biofilm성 부착은 전투에서 방어 특성 무력화로 임시 표현했다.

- 이름: 판막 식생
  종류: 전용기
  타입: 혈류
  위력: 0
  명중: 100%
  effect:
  description: {name}이 손상된 심장판막 위에 식생을 만든다.
  learnText: Viridans streptococci는 아급성 감염성 심내막염의 대표 원인군이다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 혈압 이상, 피로
      증상: 혈압 이상, 피로
      effect:
      description: {name}이 판막 식생 속에 숨어 순환을 흔들었다.
      learnText: 심내막염은 별도 상태이상 없이 혈압 이상과 피로로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 25
- 속/군 단위 후보라 최종 반영 시 대표종을 정할지 검수 필요.
