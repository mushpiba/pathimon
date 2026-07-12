# 패시몬 노트

이름:
학명: 클라미디아속(Chlamydia spp.)
타입: 세균
태그:
- structure: 그람음성유사/절대세포내
- location: 세포내봉입체
- pathway: 호흡기/성접촉/점막
방어특성: 세포내생존

이미지:
- 대표 시각 특징: elementary body와 reticulate body 전환, 세포 안 봉입체, 점막 감염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 작은 감염소체가 숙주 세포 안의 투명한 봉입체 방에 숨어 있다가 증식형으로 커지는 픽셀풍 몬스터
- 실사풍: Chlamydia inclusion body 또는 세포내 봉입체 염색 교육용 참고형 이미지

능력치:
- HP: 66
- 공격: 64
- 방어: 58

기술:
- 이름: 감염소체 흡착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 작은 감염소체로 점막 세포에 달라붙는다.
  learnText: Chlamydia는 세포 밖 감염형 EB와 세포 안 증식형 RB를 오가는 절대세포내 세균이다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 숙주 세포 안으로 조용히 들어갔다.
      learnText: 준비기는 감염형 elementary body가 세포에 부착해 들어가는 과정을 표현했다.

- 이름: 봉입체 증식
  종류: 공격기
  타입: 세포내
  위력: 55
  명중: 100%
  effect:
  description: {name}이 봉입체 안에서 증식형으로 불어난다.
  learnText: Reticulate body는 세포 안 봉입체에서 증식한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 피로
      증상: 피로
      effect:
      description: {name}이 세포 안 자원을 빼앗아 전장을 지치게 했다.
      learnText: 공식 상태이상 안에서는 만성/세포내 감염 부담을 피로로 임시 표현했다.

- 이름: 점막 염증
  종류: 공격기
  타입: 면역매개
  위력: 60
  명중: 100%
  effect:
  description: {name}이 점막에 오래 남는 염증을 일으킨다.
  learnText: Chlamydia 감염은 눈, 호흡기, 비뇨생식기 점막 질환과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 부종
      증상: 부종
      effect:
      description: {name}이 점막 방어선을 붓게 만들었다.
      learnText: 점막 염증은 공식 상태이상 중 부종으로 우선 표현했다.

- 이름: EB-RB 순환
  종류: 전용기
  타입: 세포내
  위력: 0
  명중: 100%
  effect:
  description: {name}이 감염형과 증식형을 번갈아 바꾸며 숨어든다.
  learnText: Chlamydia의 대표 특징은 EB/RB 생활사 전환이다.
  결과:
    - 확률: 100%
      효과: 2턴 무적
      상태이상:
      증상:
      effect:
      description: {name}이 봉입체 안으로 숨어 잠시 공격을 피했다.
      learnText: 전용기는 절대세포내 생활사를 전투상 무적 키워드로 표현한 초안이다.

메모:
- 2차 보류 후보.
- 출처 강의: 13, 22
- Chlamydia trachomatis, Chlamydia pneumoniae 등으로 최종 분리할지 검수 필요.
