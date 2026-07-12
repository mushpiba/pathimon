# 패시몬 노트

이름:
학명: 헤모필루스 인플루엔자균(Haemophilus influenzae)
타입: 세균
태그:
- structure: 그람음성/소구간균
- location: 호흡기
- pathway: 호흡기비말
방어특성: 협막

이미지:
- 대표 시각 특징: 작은 그람음성 coccobacillus, X/V factor 요구, Hib 협막, 호흡기 감염과 수막염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: X와 V 글자가 새겨진 작은 막대균이 투명 협막 방패를 든 픽셀풍 몬스터
- 실사풍: Haemophilus influenzae coccobacilli 또는 chocolate agar/X-V factor 교육용 참고형 이미지

능력치:
- HP: 74
- 공격: 60
- 방어: 62

기술:
- 이름: 비인두 정착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 비인두 점막에 조용히 자리 잡는다.
  learnText: H. influenzae는 이름과 달리 인플루엔자 바이러스가 아니라 세균성 호흡기 병원체다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 비인두 표면에 작은 막대처럼 붙었다.
      learnText: Hib 백신과 협막 개념으로 폐렴구균과 함께 비교할 수 있다.

- 이름: Hib 협막 침습
  종류: 공격기
  타입: 침습
  위력: 60
  명중: 100%
  effect:
  description: {name}이 협막을 앞세워 혈류와 중추신경계로 침습한다.
  learnText: Type b 협막주는 수막염과 침습성 감염의 대표 이미지다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 신경 이상
      증상: 발열, 신경 이상
      effect:
      description: {name}이 협막으로 포식을 피하며 깊이 침습했다.
      learnText: 수막염은 발열과 신경 이상 조합으로 임시 표현했다.

- 이름: 후두개 부종
  종류: 전용기
  타입: 호흡기
  위력: 0
  명중: 100%
  effect:
  description: {name}이 후두개를 붓게 해 숨길을 좁힌다.
  learnText: Hib는 epiglottitis와도 연결해 기억할 수 있다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 부종, 호흡 곤란
      증상: 부종, 호흡 곤란
      effect:
      description: {name}이 후두개 부종으로 호흡을 어렵게 했다.
      learnText: 후두개염은 호흡 곤란 상태로 표현하기 좋다.

메모:
- 2차 보류 후보.
- 출처 강의: 13, 21, 22, 33
- 호흡기균 전용 강의 확인 후 승격 권장.
