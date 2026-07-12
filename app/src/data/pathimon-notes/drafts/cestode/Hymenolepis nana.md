# 패시몬 노트

이름:
학명: 왜소조충(Hymenolepis nana)
타입: 조충
태그:
- structure: 소형조충/직접생활사
- location: 소장
- pathway: 충란섭취/자가감염
방어특성: 자가감염

이미지:
- 대표 시각 특징: 작은 조충, 직접생활사, 충란 섭취, 자가감염 반복
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 작은 리본 조충이 자기 꼬리를 물고 순환 고리를 만드는 픽셀풍 몬스터
- 실사풍: Hymenolepis nana egg/adult 또는 dwarf tapeworm 교육용 참고형 이미지

능력치:
- HP: 68
- 공격: 58
- 방어: 66

기술:
- 이름: 충란 직접섭취
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 충란 상태로 직접 장관에 들어온다.
  learnText: H. nana는 중간숙주 없이 사람에서 직접 생활사가 가능하다는 점이 핵심이다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 작은 충란 고리를 열었다.
      learnText: 준비기는 direct egg ingestion을 표현했다.

- 이름: 장관 소형조충
  종류: 공격기
  타입: 기생
  위력: 50
  명중: 100%
  effect:
  description: {name}이 작은 조충으로 장관에 달라붙는다.
  learnText: 왜소조충은 작지만 감염량이 많으면 소화기 증상을 만들 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}이 작은 편절들로 장관 리듬을 흐트러뜨렸다.
      learnText: 장관 증상은 공식 상태이상 배설 이상으로 표현했다.

- 이름: 자가감염 순환
  종류: 전용기
  타입: 기생
  위력: 0
  명중: 100%
  effect:
  description: {name}이 자기 생활사를 장 안에서 다시 돌린다.
  learnText: Autoinfection은 Hymenolepis nana를 떠올리는 대표 특징이다.
  결과:
    - 확률: 100%
      효과: 2턴 무적
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}이 장 안에서 순환 고리를 만들며 다시 숨어들었다.
      learnText: 자가감염 반복은 무적 키워드와 배설 이상으로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- 직접 생활사와 자가감염을 다른 조충과의 차별점으로 둔다.
