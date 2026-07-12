# 패시몬 노트

이름:
학명: 이질아메바(Entamoeba histolytica)
타입: 원생동물
태그:
- structure: 아메바/포낭-영양형
- location: 대장/간
- pathway: 분변-경구/포낭섭취
방어특성: 조직침습

이미지:
- 대표 시각 특징: 포낭 섭취, 영양형 대장 침습, 플라스크 모양 궤양, 간농양
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 흐물거리는 아메바가 플라스크 모양 궤양을 들고 움직이는 픽셀풍 몬스터
- 실사풍: Entamoeba trophozoites with ingested RBCs 또는 flask-shaped ulcer 교육용 참고형 이미지

능력치:
- HP: 72
- 공격: 76
- 방어: 56

기술:
- 이름: 포낭 섭취
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 포낭 형태로 장까지 살아 들어온다.
  learnText: E. histolytica는 오염된 물/음식의 포낭 섭취로 감염된다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 단단한 포낭을 풀고 장 안에서 깨어났다.
      learnText: 준비기는 cyst ingestion과 excystation을 표현했다.

- 이름: 혈성 이질
  종류: 공격기
  타입: 침습
  위력: 70
  명중: 100%
  effect:
  description: {name}이 대장 점막을 파고들어 피 섞인 설사를 만든다.
  learnText: 조직침습성 아메바는 dysentery와 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 출혈, 배설 이상
      증상: 출혈, 배설 이상
      effect:
      description: {name}이 장 점막을 흔들어 출혈성 배설 이상을 만들었다.
      learnText: 혈성 설사는 출혈과 배설 이상 조합으로 표현한다.

- 이름: 간농양 침투
  종류: 공격기
  타입: 침습
  위력: 75
  명중: 100%
  effect:
  description: {name}이 문맥을 타고 간까지 퍼진다.
  learnText: Amoebic liver abscess는 E. histolytica의 중요한 합병증이다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 피로
      증상: 발열, 피로
      effect:
      description: {name}이 간 깊은 곳에 열과 피로를 남겼다.
      learnText: 간농양은 공식 상태이상 안에서 발열/피로로 표현했다.

- 이름: 플라스크 궤양
  종류: 전용기
  타입: 침습
  위력: 95
  명중: 100%
  effect:
  description: {name}이 플라스크 모양으로 아래가 넓은 궤양을 판다.
  learnText: Flask-shaped ulcer는 이질아메바를 떠올리게 하는 대표 병리 이미지다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 괴사, 출혈
      증상: 괴사, 출혈
      effect:
      description: {name}이 깊게 파고든 궤양으로 조직을 무너뜨렸다.
      learnText: 전용기는 병리학적 플라스크 모양 궤양을 괴사/출혈로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 19, 33
- 비침습성 Entamoeba species와 구분되는 조직침습성을 강조한다.
