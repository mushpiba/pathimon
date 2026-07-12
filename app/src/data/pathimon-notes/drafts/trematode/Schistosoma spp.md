# 패시몬 노트

이름: 달팽혈충
학명: 주혈흡충(Schistosoma spp.)
타입: 흡충
태그:
- structure: 흡충
- location: 혈관/문맥/방광정맥
- pathway: 피부침투/담수
방어특성: 항원위장
메모:
- 흡충 타입이며 방어특성은 항원위장이다.
- 흡충 구조와 혈관, 문맥, 방광정맥 위치가 핵심이다.
- 피부침투, 담수 경로로 감염될 수 있다.
- 세르카리아 피부침투와 충란 육아종, 혈관 포옹이 대표 병인이다.

이미지:
- 대표 시각 특징: 세르카리아 피부침투, 혈관 내 암수 포옹 성충, 충란 육아종, 간섬유화/혈뇨
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 혈관 터널 안에서 암수 한 쌍이 붙어 다니며 가시 달린 충란을 뿌리는 픽셀풍 몬스터
- 실사풍: Schistosoma adult pair/egg granuloma 또는 cercaria skin penetration 교육용 참고형 이미지

능력치:
- HP: 92
- 공격: 68
- 방어: 78

기술:
- 이름: 세르카리아 피부침투
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 담수의 세르카리아로 피부를 직접 뚫고 들어온다.
  learnText: 주혈흡충은 다른 흡충과 달리 세르카리아가 피부를 직접 침투한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상: 가려움
      증상: 가려움
      effect:
      description: {name}이 피부 장벽을 뚫고 혈관으로 향했다.
      learnText: Swimmer's itch는 공식 상태이상 가려움으로 표현한다.

- 이름: 충란 육아종
  종류: 공격기
  타입: 면역매개
  위력: 60
  명중: 100%
  effect:
  description: {name}의 충란이 조직에 걸려 육아종성 염증을 만든다.
  learnText: Schistosoma 병변은 성충보다 충란에 대한 면역 반응이 중요하다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 부종
      증상: 부종
      effect:
      description: {name}의 충란 주위로 염증성 부종이 생겼다.
      learnText: 충란 육아종은 주혈흡충의 핵심 병인이다.

- 이름: 혈관 포옹
  종류: 전용기
  타입: 혈관
  위력: 0
  명중: 100%
  effect:
  description: {name}의 암수 성충이 혈관 안에서 붙어 다니며 충란을 뿌린다.
  learnText: Schistosoma는 혈관 내 기생과 암수 쌍 구조가 매우 독특하다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 출혈, 혈압 이상
      증상: 출혈, 혈압 이상
      effect:
      description: {name}이 혈관 안에서 버티며 출혈성 손상을 남겼다.
      learnText: 방광혈뇨/문맥고혈압 이미지를 출혈과 혈압 이상으로 표현했다.


작업메모:
- 후보 번호: 52
- 출처 강의: 14, 30
- 종별 S. haematobium/mansoni/japonicum 분리는 후속 검수 필요.
