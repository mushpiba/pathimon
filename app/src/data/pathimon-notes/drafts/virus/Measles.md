# 패시몬 노트

이름:
학명: 홍역바이러스(Measles virus)
타입: 바이러스
태그:
- structure: 외피보유/RNA/파라믹소바이러스
- location: 호흡기/림프조직
- pathway: 공기매개/호흡기
방어특성: 면역기억소거

이미지:
- 대표 시각 특징: 공기매개 전파, Koplik spot, 발진, 면역 기억 약화
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 작은 흰 Koplik 점과 붉은 발진 별무늬를 두른 공기방울형 픽셀풍 몬스터
- 실사풍: measles rash/Koplik spots 또는 measles virus 교육용 참고형 이미지

능력치:
- HP: 74
- 공격: 72
- 방어: 64

기술:
- 이름: 공기매개 흡입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 공기 중 작은 비말핵을 타고 들어온다.
  learnText: 홍역은 전염력이 매우 강한 공기매개 호흡기 바이러스다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 호흡기와 림프조직 쪽으로 번졌다.
      learnText: 준비기는 airborne transmission을 표현했다.

- 이름: 발열 발진
  종류: 공격기
  타입: 면역매개
  위력: 70
  명중: 100%
  effect:
  description: {name}이 열과 발진을 함께 끌어올린다.
  learnText: Fever, cough, coryza, conjunctivitis, Koplik spots, rash를 묶어 기억한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열, 기침
      증상: 발열, 기침, 발진
      effect:
      description: {name}이 열과 기침, 발진을 함께 몰고 왔다.
      learnText: 발진은 상태이상이 아니라 증상 텍스트로 남긴다.

- 이름: 면역기억 소거
  종류: 전용기
  타입: 면역매개
  위력: 80
  명중: 100%
  effect:
  description: {name}이 지나간 면역 기억을 흐릿하게 만든다.
  learnText: 홍역 뒤 immune amnesia 개념을 함께 잡을 수 있다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 면역 이상(2), 피로
      증상: 면역 이상, 피로
      effect:
      description: {name}이 방어 특성을 흐리고 긴 피로를 남겼다.
      learnText: 면역 기억 약화는 공식 상태이상 면역 이상으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 10, 11, 22, 33
- 결막염은 시력 이상으로 넣기보다는 learnText에만 남겼다.
