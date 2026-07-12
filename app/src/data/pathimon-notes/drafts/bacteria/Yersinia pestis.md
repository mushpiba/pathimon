# 패시몬 노트

이름: 페스틱
학명: 페스트균(Yersinia pestis)
타입: 세균
태그:
- structure: 그람음성
- location: 세포외
- pathway: 벼룩/호흡기/혈류
방어특성: F1협막
메모:
- 세균 타입이며 방어특성은 F1협막이다.
- 그람음성 구조와 세포외 위치가 핵심이다.
- 벼룩, 호흡기, 혈류 경로로 감염될 수 있다.
- 벼룩 주입와 Yop 주입, 림프절 종창이 대표 병인이다.

이미지:
- 대표 시각 특징: 안전핀 모양 bipolar staining, 벼룩 매개, 가래톳, F1 협막과 Yop 주입
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 안전핀 모양 얼굴과 벼룩 날개, 검은 림프절 구슬을 든 픽셀풍 막대균 몬스터
- 실사풍: Y. pestis bipolar safety-pin staining 또는 bubonic plague 병태를 보여주는 교육용 참고형 이미지

능력치:
- HP: 80
- 공격: 90
- 방어: 65

기술:
- 이름: 벼룩 주입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 벼룩을 타고 피부 아래 림프절로 들어간다.
  learnText: Yersinia pestis는 벼룩 매개와 림프절 종창이 대표 이미지인 페스트균이다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 벼룩의 물린 자리에서 림프절로 향했다.
      learnText: 가래톳 페스트는 flea-borne plague의 대표 표현이다.

- 이름: Yop 주입
  종류: 공격기
  타입: 침습
  위력: 60
  명중: 100%
  effect:
  description: {name}이 Yop 단백을 주입해 포식세포 기능을 무너뜨린다.
  learnText: Yersinia의 type III secretion과 Yop은 면역 회피 병인으로 정리할 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 Yop 주입으로 포식세포의 반격을 꺾었다.
      learnText: 면역 이상는 방어 특성 무력화와 연결되는 범용 상태이상이다.

- 이름: 림프절 종창
  종류: 공격기
  타입: 조직융해
  위력: 65
  명중: 100%
  effect:
  description: {name}이 림프절을 붓게 해 가래톳을 만든다.
  learnText: Buboes는 bubonic plague를 떠올리게 하는 핵심 병변이다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 부종
      증상: 부종
      effect:
      description: {name}이 림프절을 검붉게 부풀렸다.
      learnText: 부종 상태는 다른 상태이상 확률을 올리는 방향으로 전투에 반영된다.

- 이름: 폐페스트 비말
  종류: 전용기
  타입: 호흡기
  위력: 90
  명중: 100%
  effect:
  description: {name}이 폐페스트로 전환해 비말 전파와 호흡기 악화를 일으킨다.
  learnText: Pneumonic plague는 사람 간 호흡기 전파와 높은 위험도로 따로 기억한다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 기침, 호흡 곤란
      증상: 기침, 호흡 곤란
      effect:
      description: {name}이 폐페스트 비말을 퍼뜨려 숨길을 압박했다.
      learnText: 페스트는 bubonic, septicemic, pneumonic 형태를 구분해 볼 수 있다.


작업메모:
- 후보 번호: 26
- 출처 강의: 13, 17, 33
- 패혈성 페스트는 `혈압 이상` 후보지만 전용기는 폐페스트 비말로 차별화했다.
