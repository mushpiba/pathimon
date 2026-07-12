# 패시몬 노트

이름:
학명: 웰치균(Clostridium perfringens)
타입: 세균
태그:
- structure: 그람양성/아포
- location: 세포외/혐기조직
- pathway: 상처/소화기
방어특성: 아포

이미지:
- 대표 시각 특징: 혐기성 상처, 가스괴저, alpha toxin, 빠르게 퍼지는 조직 괴사
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 검붉은 근육 조각 위에서 가스방울을 뿜는 두꺼운 막대균 픽셀풍 몬스터
- 실사풍: C. perfringens gram-positive rods 또는 gas gangrene 조직 병변 교육용 참고형 이미지

능력치:
- HP: 82
- 공격: 82
- 방어: 58

기술:
- 이름: 혐기 상처 발아
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 산소가 적은 오염 상처에서 발아한다.
  learnText: C. perfringens는 오염 상처의 혐기 환경에서 빠르게 증식하며 가스괴저를 만들 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 상처 속 혐기 공간을 차지했다.
      learnText: 클로스트리듐 계열은 아포와 혐기 환경을 함께 기억한다.

- 이름: 알파 독소
  종류: 공격기
  타입: 독소
  위력: 70
  명중: 100%
  effect:
  description: {name}이 세포막을 무너뜨리는 alpha toxin을 분비한다.
  learnText: C. perfringens alpha toxin은 phospholipase C로 조직 손상과 용혈에 관여한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 괴사
      증상: 괴사
      effect:
      description: {name}의 독소가 세포막을 찢어 괴사를 만들었다.
      learnText: 가스괴저는 독소성 조직 파괴를 중심으로 기억한다.

- 이름: 장독소 식중독
  종류: 공격기
  타입: 독소
  위력: 45
  명중: 100%
  effect:
  description: {name}이 장독소로 급성 장 증상을 만든다.
  learnText: C. perfringens는 식중독 맥락에서도 등장할 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}이 장관 리듬을 무너뜨렸다.
      learnText: 장독소성 설사는 공식 상태이상 `배설 이상`으로 표현한다.

- 이름: 가스괴저 확산
  종류: 전용기
  타입: 조직융해
  위력: 85
  명중: 100%
  effect:
  description: {name}이 조직 안 가스와 괴사를 빠르게 퍼뜨린다.
  learnText: Gas gangrene은 C. perfringens를 떠올리는 강한 전용기 소재다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 괴사, 부종
      증상: 괴사, 부종
      effect:
      description: {name}이 조직을 부풀리고 검게 무너뜨렸다.
      learnText: 가스 생성과 괴사는 시각적으로도 차별화하기 좋다.

메모:
- 2차 보류 후보.
- 출처 강의: 21
- 강의 내 독립 분량은 적지만 가스괴저 컨셉은 패시몬화 가치가 높다.
