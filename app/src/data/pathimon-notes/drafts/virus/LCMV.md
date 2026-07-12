# 패시몬 노트

이름:
학명: 림프구성 맥락수막염 바이러스(LCMV)
타입: 바이러스
태그:
- structure: 외피보유/RNA/아레나바이러스
- location: 중추신경계/혈액
- pathway: 설치류분비물/흡입
방어특성: 지속감염

이미지:
- 대표 시각 특징: 설치류 매개, arenavirus 과립 느낌, 림프구성 수막염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 작은 과립이 든 둥근 바이러스가 뇌막 리본을 두른 픽셀풍 몬스터
- 실사풍: arenavirus virion 또는 lymphocytic meningitis 교육용 참고형 이미지

능력치:
- HP: 66
- 공격: 62
- 방어: 58

기술:
- 이름: 설치류 분비물 흡입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 설치류 분비물 먼지와 함께 들어온다.
  learnText: LCMV는 설치류 분비물 노출과 연결해 기억한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 조용히 혈류와 신경계 쪽 길을 열었다.
      learnText: 준비기는 흡입/노출 뒤 전신 감염으로 이어지는 흐름을 표현했다.

- 이름: 림프구성 수막염
  종류: 공격기
  타입: 신경
  위력: 70
  명중: 100%
  effect:
  description: {name}이 뇌막 주변에 림프구성 염증을 일으킨다.
  learnText: 이름 그대로 lymphocytic choriomeningitis가 핵심이다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 신경 이상
      증상: 발열, 신경 이상
      effect:
      description: {name}이 뇌막을 달구며 신경 흐름을 흔들었다.
      learnText: 수막염은 발열과 신경 이상 조합으로 임시 표현했다.

- 이름: 맥락수막 흔들림
  종류: 전용기
  타입: 신경
  위력: 85
  명중: 100%
  effect:
  description: {name}이 맥락막과 수막 사이를 동시에 흔든다.
  learnText: LCMV는 이름 자체가 학습 힌트인 바이러스다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 신경 이상, 피로
      증상: 신경 이상, 피로
      effect:
      description: {name}이 신경계에 긴 피로감을 남겼다.
      learnText: 전용기는 CNS 침범 이미지를 가장 강하게 살린 초안이다.

메모:
- 2차 보류 후보.
- 출처 강의: 10, 11, 33
- 국내 강의 비중이 낮으면 최종 반영 우선도 조정 필요.
