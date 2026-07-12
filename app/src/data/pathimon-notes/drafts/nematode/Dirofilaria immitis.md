# 패시몬 노트

이름:
학명: 개심장사상충(Dirofilaria immitis)
타입: 선충
태그:
- structure: 사상충/심장사상충
- location: 폐혈관/심장
- pathway: 모기매개/동물원성
방어특성: 혈관잠복

이미지:
- 대표 시각 특징: 개 심장사상충, 모기 매개, 사람 폐결절, 혈관 속 긴 사상충
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 심장 모양 붉은 고리와 폐혈관을 감은 긴 사상충 픽셀풍 몬스터
- 실사풍: Dirofilaria immitis adult worm 또는 pulmonary coin lesion 교육용 참고형 이미지

능력치:
- HP: 78
- 공격: 68
- 방어: 70

기술:
- 이름: 모기 유충 주입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 모기를 통해 혈관 쪽으로 들어온다.
  learnText: Dirofilaria immitis는 개 심장사상충이며 사람에서는 폐결절로 발견될 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 폐혈관으로 향하는 긴 길을 잡았다.
      learnText: 준비기는 mosquito-borne larva entry를 표현했다.

- 이름: 폐혈관 매듭
  종류: 공격기
  타입: 기생
  위력: 65
  명중: 100%
  effect:
  description: {name}이 폐혈관 안에서 작은 매듭 같은 결절을 만든다.
  learnText: 사람 감염에서는 pulmonary nodule/coin lesion 이미지가 중요하다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 기침
      증상: 기침
      effect:
      description: {name}이 폐 쪽에 기침을 남기는 결절을 만들었다.
      learnText: 폐결절 자극은 공식 상태이상 기침으로 표현했다.

- 이름: 심폐 사상고리
  종류: 전용기
  타입: 기생
  위력: 85
  명중: 100%
  effect:
  description: {name}이 심장과 폐혈관을 긴 고리처럼 감는다.
  learnText: 개에서는 심장사상충이라는 이름 그대로 심폐 혈관계 감염을 떠올린다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 기침, 호흡 곤란
      증상: 기침, 호흡 곤란
      effect:
      description: {name}이 폐혈관을 조여 숨길을 답답하게 했다.
      learnText: 심폐 부담은 기침과 호흡 곤란 조합으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- 사람 패시몬으로 낼지, 동물원성 특수 후보로 둘지 최종 검수 필요.
