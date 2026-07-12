# 패시몬 노트

이름:
학명: 칸디다 알비칸스(Candida albicans)
타입: 진균
태그:
- structure: 효모/균사형전환
- location: 점막/피부/혈류
- pathway: 기회감염/내인성
방어특성: 형태전환

이미지:
- 대표 시각 특징: 효모와 균사 전환, 점막 백색 판, biofilm
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 둥근 효모 몸에서 하얀 균사 팔이 뻗는 픽셀풍 몬스터
- 실사풍: Candida budding yeast/pseudohyphae 또는 점막 도말 교육용 참고형 이미지

능력치:
- HP: 72
- 공격: 64
- 방어: 68

기술:
- 이름: 점막 정착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 점막 표면에 하얗게 자리 잡는다.
  learnText: Candida는 정상균무리였다가 면역저하나 항생제 사용 뒤 기회감염으로 문제를 일으킬 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 점막 표면에 효모처럼 붙었다.
      learnText: 준비기는 내인성 기회감염의 출발점을 표현했다.

- 이름: 균사 침투
  종류: 공격기
  타입: 진균
  위력: 60
  명중: 100%
  effect:
  description: {name}이 균사형으로 바뀌어 점막 틈을 파고든다.
  learnText: C. albicans의 yeast-hyphae switching은 병원성과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 부종
      증상: 부종
      effect:
      description: {name}의 균사가 점막을 붓게 만들었다.
      learnText: 점막 염증은 공식 상태이상 부종으로 임시 표현했다.

- 이름: 바이오필름 막
  종류: 공격기
  타입: 진균
  위력: 50
  명중: 100%
  effect:
  description: {name}이 카테터 표면에 끈적한 막을 만든다.
  learnText: Candida biofilm은 기구 관련 감염과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 방어 특성 하나를 끈적하게 덮었다.
      learnText: biofilm의 방어 회피 이미지는 면역 이상으로 임시 표현했다.

- 이름: 효모-균사 전환
  종류: 전용기
  타입: 진균
  위력: 0
  명중: 100%
  effect:
  description: {name}이 둥근 효모와 뻗는 균사를 빠르게 오간다.
  learnText: 형태 전환은 Candida albicans를 기억하게 해 주는 대표 특징이다.
  결과:
    - 확률: 100%
      효과: 2턴 무적
      상태이상:
      증상:
      effect:
      description: {name}이 형태를 바꿔 공격 타이밍을 흘려냈다.
      learnText: 전용기는 형태 전환을 전투상 무적 키워드로 표현한 초안이다.

메모:
- 2차 보류 후보.
- 출처 강의: 07, 19, 22, 33
- 점막 칸디다증과 침습성 칸디다혈증을 한 노트에 묶은 초안이다.
