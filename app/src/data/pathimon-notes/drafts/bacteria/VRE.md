# 패시몬 노트

이름:
학명: 반코마이신내성 장구균(VRE, Vancomycin-resistant Enterococcus)
타입: 세균 내성형
태그:
- structure: 그람양성/내성형
- location: 장관/병원내환경
- pathway: 병원내/항생제압박
방어특성: 반코마이신내성

이미지:
- 대표 시각 특징: vanA/vanB 내성, 반코마이신 방패 무력화, 병원내 격리와 접촉주의
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 보라색 반코마이신 방패를 비껴내는 둥근 장구균 픽셀풍 몬스터
- 실사풍: VRE infection control 또는 Enterococcus culture 교육용 참고형 이미지

능력치:
- HP: 84
- 공격: 58
- 방어: 90

기술:
- 이름: 항생제 압박 선별
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 항생제 압박 속에서 내성형으로 살아남는다.
  learnText: VRE는 vancomycin-resistant Enterococcus로 병원내 감염관리에서 중요하다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 치료 압박을 지나 살아남았다.
      learnText: 내성형 후보는 종 자체보다 치료 선택지 제한을 학습시키는 역할이 크다.

- 이름: D-Ala 변환
  종류: 공격기
  타입: 내성
  위력: 0
  명중: 100%
  effect:
  description: {name}이 세포벽 말단 표적을 바꿔 반코마이신 결합을 피한다.
  learnText: VRE는 D-Ala-D-Lac 변화로 vancomycin 결합을 회피하는 개념과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과: 공격력 +1랭크
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 표적을 바꿔 방어 전략을 무력화했다.
      learnText: 실제 내성 기전을 전투에서는 방어 특성 무력화로 표현했다.

- 이름: 접촉주의 확산
  종류: 전용기
  타입: 내성
  위력: 0
  명중: 100%
  effect:
  description: {name}이 병원 환경에서 접촉 전파 고리를 만든다.
  learnText: VRE는 치료뿐 아니라 감염관리, 격리, 접촉주의와 연결되는 후보이다.
  결과:
    - 확률: 100%
      효과: 무적(3)
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 내성 장벽과 접촉 전파로 버텼다.
      learnText: CRE와 마찬가지로 내성형을 별도 패시몬으로 둘지 검수 필요하다.

메모:
- 2차 보류 후보.
- 출처 강의: 15, 22, 25, 28
- 종이 아니라 내성형이므로 최종 반영 방식 검수 필요.
