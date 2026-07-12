# 패시몬 노트

이름:
학명: 엡스타인-바 바이러스(EBV)
타입: 바이러스
태그:
- structure: 외피보유/DNA/헤르페스바이러스
- location: B세포/인두상피
- pathway: 침/타액
방어특성: B세포잠복

이미지:
- 대표 시각 특징: 타액 전파, B세포 감염, 이형림프구, 전염단핵구증
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: B세포 방울 안에 숨어 별 모양 이형림프구 꼬리를 단 픽셀풍 몬스터
- 실사풍: atypical lymphocytes in infectious mononucleosis 또는 EBV-infected B cell 교육용 참고형 이미지

능력치:
- HP: 76
- 공격: 68
- 방어: 70

기술:
- 이름: 타액 전파
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 타액을 타고 인두와 B세포를 노린다.
  learnText: EBV는 kissing disease, B세포 감염, 잠복을 함께 기억한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 B세포 표면에 달라붙었다.
      learnText: 준비기는 타액 전파와 B세포 표적성을 표현했다.

- 이름: 전염단핵구증
  종류: 공격기
  타입: 면역매개
  위력: 65
  명중: 100%
  effect:
  description: {name}이 림프구 반응을 크게 흔든다.
  learnText: Fever, pharyngitis, lymphadenopathy와 atypical lymphocytes를 떠올릴 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 피로
      증상: 발열, 피로
      effect:
      description: {name}이 긴 피로와 열을 남겼다.
      learnText: 전염단핵구증의 피로감은 공식 상태이상 피로로 표현했다.

- 이름: B세포 잠복
  종류: 공격기
  타입: 세포내
  위력: 50
  명중: 100%
  effect:
  description: {name}이 B세포 안에 숨어 면역 감시를 흐린다.
  learnText: EBV는 B cell latency와 종양 연관성으로도 다뤄진다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 B세포 안에서 방어 특성을 무디게 했다.
      learnText: 잠복과 면역 회피 이미지는 면역 이상으로 임시 표현했다.

- 이름: 이형림프구 폭주
  종류: 전용기
  타입: 면역매개
  위력: 85
  명중: 100%
  effect:
  description: {name}이 이형림프구 반응을 한꺼번에 끌어올린다.
  learnText: EBV 감염에서는 atypical lymphocyte가 시험 포인트가 될 수 있다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 발열, 피로, 부종
      증상: 발열, 피로, 부종
      effect:
      description: {name}이 열과 피로, 림프절 부종을 함께 남겼다.
      learnText: 림프절 종대는 공식 상태이상 부종으로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 06, 10, 11, 22, 33
- Burkitt lymphoma/NPC 관련성은 최종 기술로 따로 뺄지 검수 필요.
