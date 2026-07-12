# 패시몬 노트

이름:
학명: 매독균(Treponema pallidum)
타입: 세균
태그:
- structure: 스피로헤타
- location: 점막/혈류/신경
- pathway: 성접촉/수직감염
방어특성: 면역회피

이미지:
- 대표 시각 특징: 가느다란 나선균, 성접촉 전파, 경성하감, 전신 발진, 신경매독
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 은색 나선형 균이 점막 문과 신경선 사이를 미끄러지는 픽셀풍 몬스터
- 실사풍: dark-field Treponema pallidum or syphilis lesion 교육용 참고형 이미지

능력치:
- HP: 78
- 공격: 62
- 방어: 68

기술:
- 이름: 점막 나선침투
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 점막 미세상처를 따라 나선형으로 침투한다.
  learnText: Treponema pallidum은 성접촉 전파와 여러 단계의 매독으로 기억한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 점막 장벽 사이로 미끄러져 들어갔다.
      learnText: 스피로헤타는 형태 자체가 캐릭터 컨셉이 된다.

- 이름: 혈행 전신발진
  종류: 공격기
  타입: 혈류
  위력: 55
  명중: 100%
  effect:
  description: {name}이 혈류로 퍼져 전신 염증 반응을 만든다.
  learnText: 2기 매독의 전신 발진은 매독 단계 학습에 중요한 이미지다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열
      증상: 발열, 전신 발진
      effect:
      description: {name}이 전신에 열과 발진을 퍼뜨렸다.
      learnText: 발진은 상태이상이 아니라 증상 텍스트로 남긴다.

- 이름: 신경매독 잠복
  종류: 전용기
  타입: 신경
  위력: 0
  명중: 100%
  effect:
  description: {name}이 오래 숨어 있다가 신경계를 침범한다.
  learnText: 매독은 잠복성과 후기 신경계 침범을 전용기 소재로 삼기 좋다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 신경 이상
      증상: 신경 이상
      effect:
      description: {name}이 오래 숨어 신경 신호를 흐트러뜨렸다.
      learnText: 후속 성매개감염 강의가 있으면 승격 검토한다.

메모:
- 2차 보류 후보.
- 출처 강의: 17, 21, 22
