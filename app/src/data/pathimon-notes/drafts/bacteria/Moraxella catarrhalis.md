# 패시몬 노트

이름:
학명: 모락셀라 카타랄리스(Moraxella catarrhalis)
타입: 세균
태그:
- structure: 그람음성/쌍알균
- location: 상기도
- pathway: 호흡기/기회감염
방어특성: 바이오필름

이미지:
- 대표 시각 특징: 그람음성 쌍알균, 상기도 정착, 중이염/부비동염, COPD 악화
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 둥근 쌍알균이 귀 모양 점액 방패와 작은 biofilm 막을 두른 픽셀풍 몬스터
- 실사풍: Moraxella catarrhalis Gram-negative diplococci 또는 respiratory mucus/biofilm 교육용 참고형 이미지

능력치:
- HP: 66
- 공격: 58
- 방어: 62

기술:
- 이름: 상기도 정착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 상기도 점막에 조용히 자리 잡는다.
  learnText: M. catarrhalis는 상기도 정상군/기회감염 맥락에서 중이염, 부비동염, COPD 악화와 연결된다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 점액층 위에 둥글게 붙었다.
      learnText: 준비기는 상기도 정착 뒤 기회감염으로 이어지는 흐름을 표현했다.

- 이름: 점액성 기침
  종류: 공격기
  타입: 호흡기
  위력: 50
  명중: 100%
  effect:
  description: {name}이 끈적한 점액 기침을 늘린다.
  learnText: COPD 악화와 호흡기 증상 맥락에서 기억할 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 기침
      증상: 기침
      effect:
      description: {name}이 점액성 기침으로 공격 흐름을 끊었다.
      learnText: 호흡기 증상은 공식 상태이상 기침으로 표현했다.

- 이름: 베타락타마제 그림자
  종류: 공격기
  타입: 내성
  위력: 45
  명중: 100%
  effect:
  description: {name}이 베타락탐 방어를 흐리게 만든다.
  learnText: M. catarrhalis는 beta-lactamase 양성 균주가 흔한 편이다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 방어 특성 하나를 흐릿하게 만들었다.
      learnText: 항생제 내성 자체는 상태이상이 아니지만 전투상 면역 이상으로 임시 표현했다.

- 이름: 중이 점액 봉쇄
  종류: 전용기
  타입: 호흡기
  위력: 75
  명중: 100%
  effect:
  description: {name}이 중이와 부비동에 점액 장벽을 세운다.
  learnText: 소아 중이염, 부비동염, COPD 악화와 연결해 기억한다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 부종, 기침, 청력 이상
      증상: 부종, 기침, 청력 이상
      effect:
      description: {name}이 점액 막으로 숨길과 청각 압력을 동시에 흔들었다.
      learnText: 중이염의 청각 저하는 공식 상태이상 `청력 이상`으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 22
- Neisseria와 같은 그람음성 쌍알균 이미지가 될 수 있어 최종 이미지 생성 때 구도 차별화 필요.
