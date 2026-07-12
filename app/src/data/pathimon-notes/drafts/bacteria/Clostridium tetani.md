# 패시몬 노트

이름: 파상톡스
학명: 파상풍균(Clostridium tetani)
타입: 세균
태그:
- structure: 그람양성/아포
- location: 세포외
- pathway: 상처
방어특성: 아포
메모:
- 세균 타입이며 방어특성은 아포이다.
- 그람양성, 아포 구조와 세포외 위치가 핵심이다.
- 상처 경로로 감염될 수 있다.
- 오염 상처 발아와 테타노스파스민, 강직 경련이 대표 병인이다.

이미지:
- 대표 시각 특징: 북채 모양 말단 아포, 오염 상처, 온몸이 굳는 강직성 경련
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 북채 모양 꼬리 아포를 가진 막대균이 팽팽한 근육 실을 당기는 픽셀풍 몬스터
- 실사풍: terminal spore가 보이는 drumstick 형태의 C. tetani 현미경 참고형 이미지

능력치:
- HP: 70
- 공격: 75
- 방어: 55

기술:
- 이름: 오염 상처 발아
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 산소가 적은 오염 상처에서 아포를 발아시킨다.
  learnText: 파상풍균은 흙이나 오염 상처를 통해 들어가 혐기 환경에서 독소를 만든다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 상처 속 깊은 곳에서 독소 생산을 준비했다.
      learnText: 균 자체의 침습보다 tetanospasmin 독소가 핵심 병인이다.

- 이름: 테타노스파스민
  종류: 공격기
  타입: 독소
  위력: 65
  명중: 100%
  effect:
  description: {name}이 억제성 신경전달을 막는 독소를 보낸다.
  learnText: Tetanospasmin은 inhibitory neurotransmitter 방출을 막아 spastic paralysis를 일으킨다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 신경 이상
      증상: 신경 이상
      effect:
      description: {name}의 독소가 억제 신호를 끊어 경련을 유도했다.
      learnText: 파상풍은 근육이 이완되지 못해 강직과 경련이 나타난다.

- 이름: 강직 경련
  종류: 공격기
  타입: 신경
  위력: 55
  명중: 100%
  effect:
  description: {name}이 턱과 몸통 근육을 굳게 만든다.
  learnText: Trismus와 opisthotonos 같은 강직 증상이 파상풍의 대표 이미지다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 마비
      증상: 마비
      effect:
      description: {name}이 근육을 굳혀 움직임을 봉쇄했다.
      learnText: 파상풍 백신은 toxoid를 이용한 예방 개념과 연결된다.

- 이름: 억제신호 봉인
  종류: 전용기
  타입: 신경
  위력: 0
  명중: 100%
  effect:
  description: {name}이 억제성 시냅스를 봉인해 전장을 긴장시킨다.
  learnText: 파상풍 독소는 GABA/glycine 억제 신호 감소로 과도한 근수축을 일으킨다.
  결과:
    - 확률: 100%
      효과: 공격력 +2랭크
      상태이상: 마비, 신경 이상
      증상: 마비, 신경 이상
      effect:
      description: {name}이 억제 신호를 봉인해 강직 상태를 만들었다.
      learnText: 같은 신경독소라도 파상풍은 강직성 마비, 보툴리눔은 이완성 마비 쪽으로 구분한다.


작업메모:
- 후보 번호: 6
- 출처 강의: 17
- `강직성 마비` 상태이상은 따로 만들지 않고 기존 `마비`, `신경 이상` 조합으로 표현했다.
