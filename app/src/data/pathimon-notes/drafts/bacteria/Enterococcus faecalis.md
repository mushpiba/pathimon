# 패시몬 노트

이름:
학명: 엔테로코쿠스 패칼리스(Enterococcus faecalis)
타입: 세균
태그:
- structure: 그람양성
- location: 장관/요로/혈류
- pathway: 기회감염/병원내
방어특성: 내성

이미지:
- 대표 시각 특징: 장구균, 담즙/염분 내성, 요로감염, 심내막염, 병원내 감염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 장관 문양을 가진 둥근 알균이 요로 표식과 심장판막 표식을 들고 있는 픽셀풍 몬스터
- 실사풍: Enterococcus cocci in pairs/chains 또는 nosocomial infection 교육용 참고형 이미지

능력치:
- HP: 78
- 공격: 55
- 방어: 68

기술:
- 이름: 장관 상재 대기
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 장관 속에서 기회감염 순간을 기다린다.
  learnText: Enterococcus는 장관 정상균총이지만 요로감염, 혈류감염, 심내막염을 일으킬 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 장관 밖으로 나갈 틈을 노렸다.
      learnText: 정상 위치와 다른 장소로 이동하면 상재균도 병원체가 된다.

- 이름: 요로 기회감염
  종류: 공격기
  타입: 기회감염
  위력: 50
  명중: 100%
  effect:
  description: {name}이 요로와 카테터 환경에서 염증을 만든다.
  learnText: Enterococcus는 병원내 UTI 원인으로도 다뤄진다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상
      증상: 배뇨 이상
      effect:
      description: {name}이 요로 감염으로 배설 리듬을 흔들었다.
      learnText: 배뇨 이상은 공식 상태이상 `배설 이상`으로 표현했다.

- 이름: 판막 기회정착
  종류: 전용기
  타입: 혈류
  위력: 0
  명중: 100%
  effect:
  description: {name}이 손상된 판막에 정착해 오래 버틴다.
  learnText: Enterococcus faecalis는 심내막염과 병원내 감염 맥락에서 중요하다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 피로, 혈압 이상
      증상: 피로, 혈압 이상
      effect:
      description: {name}이 판막 위에 붙어 순환을 지치게 했다.
      learnText: 심내막염 상태는 혈압 이상과 피로 조합으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 15, 22, 25, 28
