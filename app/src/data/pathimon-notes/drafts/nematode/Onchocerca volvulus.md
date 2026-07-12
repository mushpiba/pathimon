# 패시몬 노트

이름: 회선블랙
학명: 회선사상충(Onchocerca volvulus)
타입: 선충
태그:
- structure: 사상충
- location: 피부/눈
- pathway: 먹파리매개
방어특성: 피하결절
메모:
- 선충 타입이며 방어특성은 피하결절이다.
- 사상충 구조와 피부, 눈 위치가 핵심이다.
- 먹파리매개 경로로 감염될 수 있다.
- 먹파리 주입와 피하 결절, 하천맹목이 대표 병인이다.

이미지:
- 대표 시각 특징: 먹파리 매개, 피하 결절, microfilaria 눈 이동, river blindness
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 검은 먹파리 날개와 피하 결절 갑옷, 눈으로 향하는 작은 유충 흐름을 가진 픽셀풍 몬스터
- 실사풍: Onchocerca microfilariae/skin snip 또는 river blindness 교육용 참고형 이미지

능력치:
- HP: 84
- 공격: 70
- 방어: 65

기술:
- 이름: 먹파리 주입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 먹파리 흡혈로 피부 아래에 들어간다.
  learnText: Onchocerca volvulus는 blackfly 매개와 river blindness로 기억한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 피부 아래에 첫 결절을 만들었다.
      learnText: 회선사상충은 림프사상충과 달리 피부/눈 침범 이미지가 강하다.

- 이름: 피하 결절
  종류: 공격기
  타입: 만성
  위력: 45
  명중: 100%
  effect:
  description: {name}의 성충이 피하 결절 속에 숨어 유충을 만든다.
  learnText: Onchocercoma 피하 결절은 성충 위치를 보여주는 중요한 단서다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 부종, 가려움
      증상: 부종, 가려움
      effect:
      description: {name}이 피부 밑 결절을 부풀렸다.
      learnText: 피부 소양감은 공식 상태이상 가려움으로 표현한다.

- 이름: 하천맹목
  종류: 전용기
  타입: 눈
  위력: 0
  명중: 100%
  effect:
  description: {name}의 미세사상충이 눈으로 이동해 시야를 흐린다.
  learnText: River blindness는 Onchocerca의 대표 학습 포인트다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 시력 이상
      증상: 시력 이상
      effect:
      description: {name}의 유충이 눈 염증을 일으켜 시야를 가렸다.
      learnText: river blindness는 공식 상태이상 `시력 이상`으로 표현한다.


작업메모:
- 후보 번호: 45
- 출처 강의: 29
- 가려움/피부염 축은 공식 상태이상 `가려움`으로 반영했다.
