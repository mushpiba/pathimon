# 패시몬 노트

이름:
학명: 엔테로코쿠스 패시움(Enterococcus faecium)
타입: 세균
태그:
- structure: 그람양성
- location: 장관/병원내환경
- pathway: 병원내/기회감염
방어특성: 내성

이미지:
- 대표 시각 특징: 장구균, 병원내 감염, 항생제 내성, VRE와 가까운 이미지
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 병원 타일 위에서 항생제 방패를 들고 버티는 둥근 알균 픽셀풍 몬스터
- 실사풍: Enterococcus faecium 또는 hospital-acquired resistant Enterococcus 교육용 참고형 이미지

능력치:
- HP: 80
- 공격: 52
- 방어: 78

기술:
- 이름: 병원내 장관정착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 항생제 압박 속 장관에 살아남는다.
  learnText: E. faecium은 병원내 감염과 내성 Enterococcus 맥락에서 중요하다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 항생제 뒤 빈자리에 버텼다.
      learnText: 항생제 압박은 내성균 선별을 설명하는 좋은 게임 소재다.

- 이름: 내성 생존
  종류: 공격기
  타입: 내성
  위력: 0
  명중: 100%
  effect:
  description: {name}이 치료 압박을 버티며 다음 공격을 준비한다.
  learnText: E. faecium은 VRE와 연결될 수 있어 내성형 설계의 기반이 된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과: 공격력 +1랭크
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 내성 장벽으로 방어 전략을 흐트러뜨렸다.
      learnText: 실제 항생제 내성을 전투에서는 방어 무력화로 임시 표현했다.

- 이름: 병원내 집요함
  종류: 전용기
  타입: 내성
  위력: 0
  명중: 100%
  effect:
  description: {name}이 병원 환경에 오래 남아 제거를 어렵게 한다.
  learnText: Enterococcus의 환경 생존성과 내성은 병원감염 관리에서 중요한 주제다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 병원내 내성 장벽 뒤로 숨어 버텼다.
      learnText: VRE를 별도 내성형 후보로 둘지 검수해야 한다.

메모:
- 2차 보류 후보.
- 출처 강의: 15, 22, 25, 28
