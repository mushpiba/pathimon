# 패시몬 노트

이름:
학명: 임균(Neisseria gonorrhoeae)
타입: 세균
태그:
- structure: 그람음성쌍알균
- location: 점막/요로/생식기
- pathway: 성접촉/수직감염
방어특성: 항원변이

이미지:
- 대표 시각 특징: 그람음성 쌍알균, 호중구 안 쌍알균, 성접촉 전파, 항원변이 pili
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 커피콩처럼 붙은 쌍알균이 pili 갈고리를 흔드는 픽셀풍 몬스터
- 실사풍: intracellular gram-negative diplococci in neutrophils 교육용 참고형 이미지

능력치:
- HP: 72
- 공격: 66
- 방어: 52

기술:
- 이름: 점막 Pili 부착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 pili로 요생식기 점막에 달라붙는다.
  learnText: N. gonorrhoeae는 성접촉 전파와 antigenic variation, pili 부착이 핵심이다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 점막 표면에 단단히 붙었다.
      learnText: 임균은 협막이 없고 수막구균과 구분해 기억한다.

- 이름: 호중구 잠입
  종류: 공격기
  타입: 침습
  위력: 55
  명중: 100%
  effect:
  description: {name}이 호중구 안에 쌍알균 모습으로 숨어든다.
  learnText: 임균 도말에서 호중구 내 그람음성 쌍알균은 강한 진단 이미지다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2), 배설 이상
      증상: 면역 이상, 배뇨 이상, 분비물
      effect:
      description: {name}이 호중구 안에서 방어선과 배설 리듬을 흔들었다.
      learnText: 배뇨 이상은 `배설 이상`으로 표현하고, 분비물은 증상 텍스트로 남겼다.

- 이름: Pili 항원변이
  종류: 전용기
  타입: 회피
  위력: 0
  명중: 100%
  effect:
  description: {name}이 pili 항원을 바꿔 재감염과 회피를 노린다.
  learnText: Gonococcus의 antigenic variation은 백신 개발이 어려운 이유와 연결된다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 표면 항원을 바꿔 추적을 피했다.
      learnText: 수막구균과 달리 협막보다 pili 변이를 전용기로 둔다.

메모:
- 2차 보류 후보.
- 출처 강의: 07, 17, 21, 22
- 배뇨 이상은 `배설 이상`으로 표현하고, 분비물은 증상 텍스트로 남긴다.
