# 패시몬 노트

이름:
학명: 사람 거대세포바이러스(HCMV)
타입: 바이러스
태그:
- structure: 외피보유/DNA/헤르페스바이러스
- location: 백혈구/침샘/망막/태반
- pathway: 체액/태반/이식
방어특성: 잠복감염

이미지:
- 대표 시각 특징: 거대세포, 올빼미눈 봉입체, 선천감염, 면역저하 망막염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 큰 눈 모양 핵봉입체를 가진 둥근 바이러스가 세포를 부풀리는 픽셀풍 몬스터
- 실사풍: CMV owl's eye intranuclear inclusion 또는 CMV retinitis 교육용 참고형 이미지

능력치:
- HP: 78
- 공격: 66
- 방어: 72

기술:
- 이름: 체액 잠입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 체액과 세포를 타고 조용히 들어온다.
  learnText: CMV는 체액 전파, 태반 전파, 이식/면역저하 맥락에서 자주 등장한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 백혈구 안에 잠복할 자리를 만들었다.
      learnText: 준비기는 herpesvirus의 잠복성과 느린 확산을 표현했다.

- 이름: 올빼미눈 봉입체
  종류: 공격기
  타입: 세포변성
  위력: 65
  명중: 100%
  effect:
  description: {name}이 세포를 크게 만들고 핵 안에 눈 모양 흔적을 남긴다.
  learnText: Owl's eye inclusion은 CMV의 대표 병리 이미지다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 피로
      증상: 피로
      effect:
      description: {name}이 세포를 부풀려 전장을 무겁게 만들었다.
      learnText: 거대세포 변화 자체는 상태이상이 아니므로 피로로 임시 표현했다.

- 이름: 망막염 번짐
  종류: 공격기
  타입: 침습
  위력: 70
  명중: 100%
  effect:
  description: {name}이 면역저하 상태에서 망막 쪽으로 번진다.
  learnText: CMV retinitis는 면역저하 환자에서 중요한 단서다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 시력 이상
      증상: 시력 이상
      effect:
      description: {name}이 시야 가장자리를 흐리게 만들었다.
      learnText: 망막염은 공식 상태이상 시력 이상으로 표현했다.

- 이름: 선천감염 봉인
  종류: 전용기
  타입: 침습
  위력: 85
  명중: 100%
  effect:
  description: {name}이 태반을 넘어 성장 중인 조직에 흔적을 남긴다.
  learnText: Congenital CMV는 선천감염 바이러스 중 중요하게 다뤄진다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 신경 이상, 청력 이상, 시력 이상
      증상: 신경 이상, 청력 이상, 시력 이상
      effect:
      description: {name}이 신경과 감각 쪽에 남는 흔적을 새겼다.
      learnText: 선천감염의 청각/신경/망막 포인트는 청력 이상, 신경 이상, 시력 이상으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 06, 10, 11, 22, 33
- 청력 이상은 공식 상태이상으로 승격했다.
