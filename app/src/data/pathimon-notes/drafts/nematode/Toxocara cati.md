# 패시몬 노트

이름:
학명: 고양이회충(Toxocara cati)
타입: 선충
태그:
- structure: 선충/유충이행
- location: 장관/조직/눈
- pathway: 충란섭취/고양이
방어특성: 유충이행

이미지:
- 대표 시각 특징: 고양이 유래 충란, visceral larva migrans, ocular larva migrans
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 고양이 발자국 모양 충란에서 작은 유충이 눈 표식을 향해 이동하는 픽셀풍 몬스터
- 실사풍: Toxocara egg 또는 ocular/visceral larva migrans 교육용 참고형 이미지

능력치:
- HP: 74
- 공격: 68
- 방어: 62

기술:
- 이름: 충란 섭취
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 고양이 유래 충란으로 숙주 안에 들어온다.
  learnText: Toxocara cati는 고양이 회충 충란 섭취와 유충이행을 떠올리면 된다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}의 충란이 장 안에서 깨어났다.
      learnText: 준비기는 embryonated egg ingestion을 표현했다.

- 이름: 장기 유충이행
  종류: 공격기
  타입: 기생
  위력: 65
  명중: 100%
  effect:
  description: {name}의 유충이 장기를 떠돌며 염증을 남긴다.
  learnText: Visceral larva migrans는 발열, 피로, 호산구 증가 같은 맥락으로 배운다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 피로, 면역 이상
      증상: 발열, 피로, 면역 이상
      effect:
      description: {name}이 장기 사이를 지나며 열과 피로를 남겼다.
      learnText: 호산구 증가는 면역 이상 1스택으로 표현한다.

- 이름: 눈 유충이행
  종류: 전용기
  타입: 기생
  위력: 80
  명중: 100%
  effect:
  description: {name}의 유충이 눈 쪽으로 길을 잃고 들어간다.
  learnText: Ocular larva migrans는 Toxocara에서 중요한 학습 포인트다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 시력 이상
      증상: 시력 이상
      effect:
      description: {name}이 시야를 흐리게 만들었다.
      learnText: 눈 침범은 공식 상태이상 시력 이상으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- Toxocara canis와 이미지가 겹치지 않게 고양이 유래 표식을 강조한다.
