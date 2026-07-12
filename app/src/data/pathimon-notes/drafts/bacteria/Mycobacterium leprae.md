# 패시몬 노트

이름:
학명: 나균(Mycobacterium leprae)
타입: 세균
태그:
- structure: 항산성
- location: 말초신경/피부세포내
- pathway: 장기접촉/호흡기
방어특성: 세포내생존

이미지:
- 대표 시각 특징: 항산성균, 말초신경 침범, 피부 병변, 감각 저하, 나종형/결핵형 스펙트럼
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 붉은 항산성 막대균이 피부 반점과 신경선 위를 기어가는 픽셀풍 몬스터
- 실사풍: M. leprae in tissue/skin lesion or peripheral nerve involvement 교육용 참고형 이미지

능력치:
- HP: 82
- 공격: 50
- 방어: 78

기술:
- 이름: 장기접촉 잠입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 긴 접촉 뒤 피부와 말초신경으로 숨어든다.
  learnText: M. leprae는 결핵균군 예시로 언급되지만 독립 강의 분량은 적어 2차 후보이다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 피부와 신경 말단을 향해 느리게 퍼졌다.
      learnText: 나균은 말초신경 침범이 결핵균과의 큰 차이다.

- 이름: 말초신경 침범
  종류: 공격기
  타입: 신경
  위력: 55
  명중: 100%
  effect:
  description: {name}이 말초신경을 손상시켜 감각과 운동을 흐린다.
  learnText: Leprosy는 peripheral nerve damage와 피부 병변을 함께 기억한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 신경 이상
      증상: 신경 이상
      effect:
      description: {name}이 말초신경 신호를 흐트러뜨렸다.
      learnText: 감각 저하 상태이상은 없어 신경 이상으로 표현했다.

- 이름: 피부감각 소실
  종류: 전용기
  타입: 신경
  위력: 0
  명중: 100%
  effect:
  description: {name}이 피부 병변과 감각 소실을 남긴다.
  learnText: 나균은 피부 병변보다 신경 손상이 더 큰 차별점이다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 신경 이상, 피로
      증상: 신경 이상, 피로
      effect:
      description: {name}이 감각을 흐리게 하고 몸을 지치게 했다.
      learnText: 결핵균과 묶어 항산성 세균 스펙트럼으로 검수한다.

메모:
- 2차 보류 후보.
- 출처 강의: 05, 17, 33
