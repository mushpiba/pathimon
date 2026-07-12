# 패시몬 노트

이름:
학명: 알라리아흡충(Alaria)
타입: 흡충
태그:
- structure: 흡충/mesocercaria
- location: 조직/장관
- pathway: 개구리/뱀/덜익힘
방어특성: 조직이행

이미지:
- 대표 시각 특징: 개구리/뱀 매개 mesocercaria, 조직 이행, 동물원성 흡충
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 개구리 발자국과 납작한 흡충 유충이 조직 사이를 뛰어다니는 픽셀풍 몬스터
- 실사풍: Alaria mesocercaria 또는 trematode larva 교육용 참고형 이미지

능력치:
- HP: 70
- 공격: 66
- 방어: 60

기술:
- 이름: 중간숙주 덜익힘
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 덜 익힌 개구리나 뱀 속 유충으로 들어온다.
  learnText: Alaria는 mesocercaria와 야생동물/양서류 섭취 맥락으로 정리한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 조직을 향해 뛰어들었다.
      learnText: 준비기는 unusual food-borne larval infection을 표현했다.

- 이름: 조직 유충이행
  종류: 공격기
  타입: 기생
  위력: 65
  명중: 100%
  effect:
  description: {name}의 유충이 조직 사이를 이동한다.
  learnText: Alaria mesocercaria는 조직 이행성 감염 이미지가 중요하다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 피로, 부종
      증상: 피로, 부종
      effect:
      description: {name}이 조직 곳곳에 붓기와 피로를 남겼다.
      learnText: 조직 이행 증상은 피로/부종으로 임시 표현했다.

- 이름: 메조세르카리아 도약
  종류: 전용기
  타입: 기생
  위력: 85
  명중: 100%
  effect:
  description: {name}이 mesocercaria 형태로 조직 경계를 뛰어넘는다.
  learnText: Alaria는 일반적인 장흡충보다 유충 단계와 조직 이행을 강조한다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 신경 이상, 호흡 곤란
      증상: 신경 이상, 호흡 곤란
      effect:
      description: {name}이 깊은 조직을 넘어 신경과 호흡을 흔들었다.
      learnText: 중증 조직 이행 가능성은 신경 이상/호흡 곤란으로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- 강의 언급이 짧다면 최종 우선도 낮게 둘 수 있다.
