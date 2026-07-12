# 패시몬 노트

이름:
학명: 아데노바이러스(Adenovirus)
타입: 바이러스
태그:
- structure: 비외피/DNA/정이십면체
- location: 호흡기/결막/장관
- pathway: 비말/분변-경구/접촉
방어특성: 비외피안정성

이미지:
- 대표 시각 특징: 비외피 정이십면체, 호흡기 감염, 결막염, 장염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 단단한 다면체 껍질을 가진 바이러스가 눈물방울과 기침 구름을 들고 있는 픽셀풍 몬스터
- 실사풍: adenovirus icosahedral virion EM 또는 conjunctivitis 교육용 참고형 이미지

능력치:
- HP: 70
- 공격: 64
- 방어: 72

기술:
- 이름: 비외피 버티기
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 단단한 비외피 껍질로 환경에서 버틴다.
  learnText: Adenovirus는 non-enveloped DNA virus라 환경 안정성이 강한 편이다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 다면체 껍질을 세우고 감염 기회를 기다렸다.
      learnText: 준비기는 비외피 바이러스의 안정성을 표현했다.

- 이름: 인후결막열
  종류: 공격기
  타입: 호흡기
  위력: 60
  명중: 100%
  effect:
  description: {name}이 목과 눈, 호흡기를 동시에 자극한다.
  learnText: Adenovirus는 pharyngoconjunctival fever와 연결해 기억할 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 기침, 시력 이상
      증상: 기침, 시력 이상
      effect:
      description: {name}이 기침과 흐린 시야를 함께 남겼다.
      learnText: 결막염/각결막염은 공식 상태이상 시력 이상으로 표현했다.

- 이름: 장관 다면체
  종류: 공격기
  타입: 장관
  위력: 55
  명중: 100%
  effect:
  description: {name}이 장관에서도 단단한 껍질로 버틴다.
  learnText: 일부 adenovirus는 소아 장염과도 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}이 장관 리듬을 흐트러뜨렸다.
      learnText: 장염은 공식 상태이상 배설 이상으로 표현했다.

- 이름: 정이십면체 방패
  종류: 전용기
  타입: 바이러스
  위력: 0
  명중: 100%
  effect:
  description: {name}이 단단한 다면체 껍질로 공격을 튕겨낸다.
  learnText: Adenovirus의 비외피 capsid 안정성을 전투적으로 살린 초안이다.
  결과:
    - 확률: 100%
      효과: 2턴 무적
      상태이상:
      증상:
      effect:
      description: {name}이 다면체 방패 안으로 숨어 잠시 공격을 피했다.
      learnText: 비외피 안정성은 무적 키워드로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 10, 11, 22, 33
- 호흡기형/장관형/결막형을 하나로 묶은 초안이다.
