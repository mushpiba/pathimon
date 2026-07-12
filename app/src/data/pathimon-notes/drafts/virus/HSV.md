# 패시몬 노트

이름:
학명: 단순헤르페스바이러스(HSV)
타입: 바이러스
태그:
- structure: 외피보유/DNA/헤르페스바이러스
- location: 점막/신경절
- pathway: 접촉/성접촉/수직감염
방어특성: 신경절잠복

이미지:
- 대표 시각 특징: 입술/생식기 수포, 신경절 잠복, 재활성화, HSV encephalitis
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 작은 수포 방울들이 신경선 위에 붙어 있다가 다시 빛나는 픽셀풍 몬스터
- 실사풍: HSV cytopathic effect/Tzanck smear 또는 vesicular lesion 교육용 참고형 이미지

능력치:
- HP: 72
- 공격: 74
- 방어: 64

기술:
- 이름: 점막 접촉
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 점막과 피부의 작은 틈으로 들어온다.
  learnText: HSV는 접촉 전파와 수포성 병변, 신경절 잠복을 함께 기억한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 신경절로 향하는 길을 잡았다.
      learnText: 준비기는 피부/점막 감염 뒤 신경절 잠복으로 이어지는 흐름이다.

- 이름: 수포 재발
  종류: 공격기
  타입: 세포변성
  위력: 60
  명중: 100%
  effect:
  description: {name}이 작고 아픈 수포를 다시 피워 올린다.
  learnText: HSV 병변은 grouped vesicles 이미지로 기억하기 좋다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 부종, 통증
      증상: 부종, 통증
      effect:
      description: {name}이 수포성 부종을 남겼다.
      learnText: 아픈 수포는 공식 상태이상 통증으로 표현한다.

- 이름: 측두엽 뇌염
  종류: 공격기
  타입: 신경
  위력: 80
  명중: 100%
  effect:
  description: {name}이 신경 경로를 타고 뇌염을 일으킨다.
  learnText: HSV encephalitis는 temporal lobe 침범과 함께 기억한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 신경 이상, 발열
      증상: 신경 이상, 발열
      effect:
      description: {name}이 신경 흐름을 달구며 혼란을 남겼다.
      learnText: 뇌염은 신경 이상과 발열 조합으로 표현했다.

- 이름: 신경절 재활성화
  종류: 전용기
  타입: 신경
  위력: 0
  명중: 100%
  effect:
  description: {name}이 신경절에서 숨어 있다가 다시 깨어난다.
  learnText: Herpesvirus의 잠복과 재활성화는 핵심 학습 포인트다.
  결과:
    - 확률: 100%
      효과: 2턴 무적
      상태이상:
      증상:
      effect:
      description: {name}이 신경절 안으로 숨어 잠시 공격을 피했다.
      learnText: 잠복감염은 전투상 무적 키워드로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 10, 11, 22, 33
- HSV-1/HSV-2 분리 여부는 최종 검수 필요.
