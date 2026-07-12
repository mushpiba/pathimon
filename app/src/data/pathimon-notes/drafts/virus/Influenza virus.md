# 패시몬 노트

이름:
학명: 인플루엔자바이러스(Influenza virus)
타입: 바이러스
태그:
- structure: 외피보유/RNA/분절유전체
- location: 호흡기
- pathway: 비말/호흡기
방어특성: 항원변이

이미지:
- 대표 시각 특징: HA/NA spike, 분절 RNA, 항원소변이와 대변이, 급성 호흡기 증상
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: HA/NA 스파이크가 다른 색으로 꽂힌 둥근 바이러스가 분절 카드들을 들고 있는 픽셀풍 몬스터
- 실사풍: influenza virion EM 또는 respiratory epithelial infection 교육용 참고형 이미지

능력치:
- HP: 74
- 공격: 78
- 방어: 60

기술:
- 이름: 비말 흡입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 비말을 타고 호흡기 상피에 붙는다.
  learnText: Influenza는 호흡기 비말 전파와 HA/NA spike를 함께 기억한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 호흡기 상피에 스파이크를 꽂았다.
      learnText: 준비기는 hemagglutinin-mediated attachment를 표현했다.

- 이름: 급성 발열기침
  종류: 공격기
  타입: 호흡기
  위력: 70
  명중: 100%
  effect:
  description: {name}이 갑작스런 열과 기침을 몰고 온다.
  learnText: 인플루엔자는 갑작스런 발열, 근육통, 기침 같은 급성 증상이 특징적이다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 기침, 통증
      증상: 발열, 기침, 통증
      effect:
      description: {name}이 열과 기침, 몸살 같은 통증을 남겼다.
      learnText: 근육통은 공식 상태이상 `통증`으로 표현했다.

- 이름: 항원소변이
  종류: 공격기
  타입: 바이러스
  위력: 60
  명중: 100%
  effect:
  description: {name}이 HA/NA 표면을 조금씩 바꾼다.
  learnText: Antigenic drift는 매년 유행과 백신 갱신을 설명하는 키워드다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 방어 표식을 흐릿하게 만들었다.
      learnText: 항원 변화는 면역 이상으로 임시 표현했다.

- 이름: 항원대변이
  종류: 전용기
  타입: 바이러스
  위력: 95
  명중: 100%
  effect:
  description: {name}이 분절 유전체를 재조합해 완전히 다른 표정을 만든다.
  learnText: Antigenic shift는 segmented genome과 pandemic potential을 함께 떠올리게 한다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 면역 이상(2), 발열
      증상: 면역 이상, 발열
      effect:
      description: {name}이 새 표식으로 방어를 무너뜨리고 열을 다시 올렸다.
      learnText: 전용기는 분절 유전체와 대유행 가능성을 함께 살린 초안이다.

메모:
- 2차 보류 후보.
- 출처 강의: 10, 11, 22, 33
- SARS-CoV-2와 겹치지 않게 분절유전체/HA-NA/shift-drift 이미지를 강조한다.
