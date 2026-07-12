# 패시몬 노트

이름:
학명: 무구조충(Taenia saginata)
타입: 조충
태그:
- structure: 조충/무구두절
- location: 소장
- pathway: 소고기/낭미충섭취
방어특성: 편절분리

이미지:
- 대표 시각 특징: 소고기 매개, 무구 두절, 긴 성충, 움직이는 편절
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 갈고리 없는 둥근 두절과 긴 리본 편절이 소고기 표식과 이어진 픽셀풍 몬스터
- 실사풍: Taenia saginata proglottid/scolex 또는 beef cysticercus 교육용 참고형 이미지

능력치:
- HP: 82
- 공격: 60
- 방어: 72

기술:
- 이름: 소고기 낭미충
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 덜 익힌 소고기 속 낭미충으로 들어온다.
  learnText: Taenia saginata는 beef tapeworm, cysticercus 섭취, adult intestinal tapeworm으로 정리한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 소장 안에서 긴 리본으로 펼쳐질 준비를 했다.
      learnText: 준비기는 beef cysticercus ingestion을 표현했다.

- 이름: 편절 이동
  종류: 공격기
  타입: 기생
  위력: 55
  명중: 100%
  effect:
  description: {name}의 편절이 장관에서 꿈틀거리며 움직인다.
  learnText: T. saginata는 proglottid motility가 두드러질 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}이 장관 리듬을 길게 흔들었다.
      learnText: 장관 불편감은 공식 상태이상 배설 이상으로 표현했다.

- 이름: 무구 리본성충
  종류: 전용기
  타입: 기생
  위력: 75
  명중: 100%
  effect:
  description: {name}이 갈고리 없는 두절로 길게 버틴다.
  learnText: T. solium과 달리 T. saginata는 무구조충이고 사람 cysticercosis를 만들지 않는 점이 중요하다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 배설 이상, 피로
      증상: 배설 이상, 피로
      effect:
      description: {name}이 긴 리본처럼 영양을 빼앗아 피로를 남겼다.
      learnText: 조충 성충 감염은 배설 이상/피로로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- Taenia solium과 달리 신경낭미충증 이미지는 사용하지 않는다.
