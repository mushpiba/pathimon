# 패시몬 노트

이름:
학명: 유극악구충속(Gnathostoma spp.)
타입: 선충
태그:
- structure: 선충/이동유충
- location: 피부/눈/중추신경계
- pathway: 민물고기/개구리/뱀/덜익힘
방어특성: 조직이행

이미지:
- 대표 시각 특징: 이동성 피부부종, 덜 익힌 민물고기/개구리, 신경/눈 침범
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 가시 달린 머리 유충이 피부 아래를 지그재그로 이동하며 부종 흔적을 남기는 픽셀풍 몬스터
- 실사풍: Gnathostoma larva 또는 migratory swelling 교육용 참고형 이미지

능력치:
- HP: 76
- 공격: 72
- 방어: 60

기술:
- 이름: 덜익힌 유충 섭취
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 덜 익힌 중간숙주 속 유충으로 들어온다.
  learnText: Gnathostoma는 덜 익힌 민물고기, 개구리, 뱀 등을 통한 유충 섭취와 연결된다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 조직으로 이동할 준비를 마쳤다.
      learnText: 준비기는 감염형 유충 섭취를 표현했다.

- 이름: 이동성 부종
  종류: 공격기
  타입: 기생
  위력: 65
  명중: 100%
  effect:
  description: {name}의 유충이 피부 아래를 움직이며 부종을 남긴다.
  learnText: Migratory swelling은 gnathostomiasis의 대표 이미지다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 부종
      증상: 부종
      effect:
      description: {name}이 피부 아래에 움직이는 붓기를 만들었다.
      learnText: 이동성 피부 병변은 공식 상태이상 부종으로 표현했다.

- 이름: 신경이행
  종류: 공격기
  타입: 신경
  위력: 75
  명중: 100%
  effect:
  description: {name}이 드물게 신경계나 눈 쪽으로 파고든다.
  learnText: Gnathostoma는 neurognathostomiasis와 ocular involvement를 주의한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 신경 이상, 시력 이상
      증상: 신경 이상, 시력 이상
      effect:
      description: {name}이 신경과 시야를 동시에 흔들었다.
      learnText: 신경/눈 침범은 공식 상태이상 조합으로 표현했다.

- 이름: 가시머리 잠행
  종류: 전용기
  타입: 기생
  위력: 90
  명중: 100%
  effect:
  description: {name}이 가시 달린 머리로 조직 사이를 파고든다.
  learnText: Gnathostoma의 이동성과 머리 가시 이미지를 전용기로 살렸다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 부종, 신경 이상, 통증, 면역 이상
      증상: 부종, 신경 이상, 통증, 면역 이상
      effect:
      description: {name}이 붓기와 신경 자극을 남기며 사라졌다.
      learnText: 통증은 턴 피해, 호산구 증가는 면역 이상 1스택으로 표현한다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- 피부 이동형 선충들과 겹치지 않게 가시머리와 식품매개 유충 섭취를 강조한다.
