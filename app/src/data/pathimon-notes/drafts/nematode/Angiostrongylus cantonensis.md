# 패시몬 노트

이름:
학명: 광동주혈선충(Angiostrongylus cantonensis)
타입: 선충
태그:
- structure: 선충/쥐폐선충
- location: 중추신경계
- pathway: 달팽이/민달팽이/중간숙주섭취
방어특성: 신경이행

이미지:
- 대표 시각 특징: 쥐-달팽이 생활사, 호산구성 수막염, 신경계 유충이행
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 달팽이 껍질과 뇌막 나선이 합쳐진 작은 선충 픽셀풍 몬스터
- 실사풍: Angiostrongylus larvae 또는 eosinophilic meningitis 교육용 참고형 이미지

능력치:
- HP: 74
- 공격: 70
- 방어: 62

기술:
- 이름: 달팽이 유충 섭취
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 달팽이 속 유충으로 숙주 안에 들어온다.
  learnText: Angiostrongylus cantonensis는 쥐-달팽이 생활사와 우발적 사람 감염을 기억한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 신경계로 향할 길을 잡았다.
      learnText: 준비기는 감염 유충 섭취를 표현했다.

- 이름: 호산구성 수막염
  종류: 공격기
  타입: 신경
  위력: 75
  명중: 100%
  effect:
  description: {name}이 뇌막에 호산구성 염증을 일으킨다.
  learnText: Rat lungworm disease는 eosinophilic meningitis로 자주 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 신경 이상, 면역 이상
      증상: 발열, 신경 이상, 면역 이상
      effect:
      description: {name}이 뇌막을 자극해 열과 신경 이상을 남겼다.
      learnText: 호산구 증가는 면역 이상 1스택으로 표현한다.

- 이름: 뇌막 나선
  종류: 전용기
  타입: 신경
  위력: 90
  명중: 100%
  effect:
  description: {name}이 뇌막을 따라 나선형으로 이동한다.
  learnText: 중추신경계로 길을 잃는 유충이행을 전용기로 살렸다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 신경 이상, 통증
      증상: 신경 이상, 두통
      effect:
      description: {name}이 신경계에 오래 남는 두통을 새겼다.
      learnText: 두통은 공식 상태이상 `통증`으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- 광동주혈선충은 신경계 이행과 달팽이 생활사 이미지가 핵심이다.
