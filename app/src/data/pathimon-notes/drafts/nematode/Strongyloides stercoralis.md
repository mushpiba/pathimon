# 패시몬 노트

이름: 과감염충
학명: 분선충(Strongyloides stercoralis)
타입: 선충
태그:
- structure: 선충
- location: 피부/장관/폐
- pathway: 피부침투/자가감염
방어특성: 자가감염
메모:
- 선충 타입이며 방어특성은 자가감염이다.
- 선충 구조와 피부, 장관, 폐 위치가 핵심이다.
- 피부침투, 자가감염 경로로 감염될 수 있다.
- 피부 침투와 폐장 순환, 과감염 루프이 대표 병인이다.

이미지:
- 대표 시각 특징: 피부를 뚫고 들어오는 유충, 폐-장 이동, 자가감염, 면역저하 과감염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 피부에서 장, 폐로 이어지는 원형 화살표 위를 달리는 작은 유충 픽셀풍 몬스터
- 실사풍: Strongyloides larvae 또는 hyperinfection cycle 교육용 참고형 이미지

능력치:
- HP: 80
- 공격: 68
- 방어: 70

기술:
- 이름: 피부 침투
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 토양의 유충으로 피부를 뚫고 들어온다.
  learnText: Strongyloides는 filariform larva가 피부를 침투해 감염을 시작한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}의 유충이 피부 장벽을 통과했다.
      learnText: 피부 침투 선충은 구충과 비교해 정리할 수 있다.

- 이름: 폐장 순환
  종류: 공격기
  타입: 이동
  위력: 55
  명중: 100%
  effect:
  description: {name}이 폐와 장을 오가며 기침과 장 증상을 만든다.
  learnText: 분선충은 피부-폐-장 이동과 장내 자가감염이 핵심이다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 기침, 배설 이상
      증상: 기침, 배설 이상
      effect:
      description: {name}이 폐와 장을 오가며 증상을 겹쳤다.
      learnText: 복합 이동 생활사는 여러 상태이상을 동시에 걸기 좋다.

- 이름: 과감염 루프
  종류: 전용기
  타입: 증식
  위력: 0
  명중: 100%
  effect:
  description: {name}이 자가감염 루프를 폭주시켜 전신 과감염을 만든다.
  learnText: 면역저하에서 Strongyloides hyperinfection은 매우 위험한 포인트다.
  결과:
    - 확률: 100%
      효과: 공격력 +2랭크
      상태이상: 면역 이상(2), 호흡 곤란
      증상: 면역 이상, 호흡 곤란
      effect:
      description: {name}의 자가감염 루프가 통제 불능으로 커졌다.
      learnText: 과감염은 이 후보의 전용기 컨셉으로 가장 적합하다.


작업메모:
- 후보 번호: 39
- 출처 강의: 23, 26
