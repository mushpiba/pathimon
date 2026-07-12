# 패시몬 노트

이름:
학명: 티모르사상충(Brugia timori)
타입: 선충
태그:
- structure: 사상충/미세사상충
- location: 림프관
- pathway: 모기매개
방어특성: 림프잠복

이미지:
- 대표 시각 특징: 모기 매개 사상충, 림프관, 하지 림프부종, 미세사상충
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 가느다란 사상충이 모기 날개와 림프관 고리를 감은 픽셀풍 몬스터
- 실사풍: Brugia microfilariae 또는 lymphatic filariasis 교육용 참고형 이미지

능력치:
- HP: 76
- 공격: 66
- 방어: 68

기술:
- 이름: 모기 매개 유충
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 모기 흡혈 때 림프관으로 향한다.
  learnText: Brugia timori는 모기 매개 림프사상충증 원인 중 하나다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 림프관 고리 안으로 들어갔다.
      learnText: 준비기는 mosquito-borne L3 larva entry를 표현했다.

- 이름: 림프관 염증
  종류: 공격기
  타입: 기생
  위력: 60
  명중: 100%
  effect:
  description: {name}이 림프관을 막고 염증을 일으킨다.
  learnText: 림프사상충증은 림프관 손상과 부종이 핵심 이미지다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 부종
      증상: 부종
      effect:
      description: {name}이 림프 흐름을 붓게 만들었다.
      learnText: 림프부종은 공식 상태이상 부종으로 표현했다.

- 이름: 티모르 림프고리
  종류: 전용기
  타입: 기생
  위력: 80
  명중: 100%
  effect:
  description: {name}이 림프관을 고리처럼 감아 부종을 반복시킨다.
  learnText: Brugia timori는 Brugia malayi와 비슷하지만 지역/종 차이를 남겨 검수한다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 부종(2)
      증상: 부종
      effect:
      description: {name}이 림프관 부종을 두 겹으로 겹쳤다.
      learnText: 전용기는 부종 2스택 후보로 둔다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- Brugia malayi와 최종 분리할지 검수 필요.
