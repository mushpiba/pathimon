# 패시몬 노트

이름:
학명: 표피포도알균(Staphylococcus epidermidis)
타입: 세균
태그:
- structure: 그람양성
- location: 피부/의료기구표면
- pathway: 기회감염/의료기구
방어특성: 바이오필름

이미지:
- 대표 시각 특징: 피부 정상균총, coagulase 음성 포도알균, 카테터/인공삽입물 biofilm
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 반투명 biofilm 막을 두른 작은 흰 포도송이 알균이 카테터 조각에 붙은 픽셀풍 몬스터
- 실사풍: coagulase-negative staphylococci 또는 catheter biofilm 교육용 참고형 이미지

능력치:
- HP: 78
- 공격: 45
- 방어: 78

기술:
- 이름: 피부상재 대기
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 피부 표면에서 기회감염 순간을 기다린다.
  learnText: S. epidermidis는 피부 정상균총이지만 의료기구 감염에서는 중요한 기회감염균이다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 삽입물 표면에 달라붙을 준비를 했다.
      learnText: 정상균총도 위치와 숙주 상황이 바뀌면 병원체가 될 수 있다.

- 이름: 카테터 부착
  종류: 공격기
  타입: 부착
  위력: 35
  명중: 100%
  effect:
  description: {name}이 카테터와 인공삽입물 표면에 붙는다.
  learnText: 의료기구 표면 부착은 S. epidermidis 감염의 출발점이다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 기구 표면에 숨어 면역 접근을 피했다.
      learnText: biofilm은 항생제와 면역 반응을 피하는 데 도움을 준다.

- 이름: 점액 바이오필름
  종류: 전용기
  타입: 방어
  위력: 0
  명중: 100%
  effect:
  description: {name}이 삽입물 위에 끈적한 biofilm 방패를 만든다.
  learnText: S. epidermidis의 전용기는 독소보다 biofilm 지속감염이 더 적합하다.
  결과:
    - 확률: 100%
      효과: 무적(3)
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 biofilm 속으로 숨어 공격을 버텼다.
      learnText: 인공삽입물 감염은 제거가 필요할 정도로 biofilm이 문제가 된다.

메모:
- 2차 보류 후보.
- 출처 강의: 20, 21, 25
- 황색포도알균과 달리 저위력/고방어형으로 차별화했다.
