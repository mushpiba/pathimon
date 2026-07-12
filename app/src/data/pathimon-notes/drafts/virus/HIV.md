# 패시몬 노트

이름: 레트로잠
학명: 인간면역결핍바이러스(HIV, Human immunodeficiency virus)
타입: 바이러스
태그:
- structure: 외피보유/레트로바이러스
- location: 세포내
- pathway: 성접촉/혈액/수직감염
방어특성: 잠복
메모:
- 바이러스 타입이며 방어특성은 잠복이다.
- 외피보유, 레트로바이러스 구조와 세포내 위치가 핵심이다.
- 성접촉, 혈액, 수직감염 경로로 감염될 수 있다.
- gp120 결합와 역전사 삽입, CD4 고갈이 대표 병인이다.

이미지:
- 대표 시각 특징: 외피 바이러스, gp120-CD4 결합, 역전사, CD4 T세포 감소, proviral latency
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: CD4 열쇠를 든 구형 외피 바이러스가 RNA 나선을 DNA로 바꾸는 픽셀풍 몬스터
- 실사풍: HIV virion 전자현미경 또는 CD4 T cell 감염 과정을 보여주는 교육용 참고형 이미지

능력치:
- HP: 82
- 공격: 65
- 방어: 78

기술:
- 이름: gp120 결합
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 gp120으로 CD4 수용체에 달라붙는다.
  learnText: HIV는 gp120-CD4 결합과 보조수용체를 통해 CD4 T세포 감염을 시작한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 CD4 T세포 표면에 결합했다.
      learnText: CD4 T세포 감소는 HIV 면역결핍의 핵심이다.

- 이름: 역전사 삽입
  종류: 공격기
  타입: 유전
  위력: 55
  명중: 100%
  effect:
  description: {name}이 RNA를 DNA로 바꿔 숙주 유전체에 들어간다.
  learnText: HIV는 reverse transcriptase와 integrase를 통해 provirus를 형성한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 역전사 후 숙주 방어 체계 안쪽으로 숨어들었다.
      learnText: 레트로바이러스라는 타입은 역전사 흐름으로 기억한다.

- 이름: CD4 고갈
  종류: 공격기
  타입: 면역매개
  위력: 70
  명중: 100%
  effect:
  description: {name}이 CD4 T세포를 줄여 면역 조율을 무너뜨린다.
  learnText: AIDS는 CD4 T cell depletion과 opportunistic infection 위험으로 정리한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2), 피로
      증상: 면역 이상, 피로
      effect:
      description: {name}이 면역 지휘 체계를 약화시켰다.
      learnText: 면역결핍 강의에서 HIV는 가장 대표적인 예시로 반복된다.

- 이름: 프로바이러스 잠복
  종류: 전용기
  타입: 잠복
  위력: 0
  명중: 100%
  effect:
  description: {name}이 프로바이러스로 숨어 장기 잠복 상태에 들어간다.
  learnText: HIV latency는 치료가 어려운 이유와 만성 감염을 설명하는 핵심 개념이다.
  결과:
    - 확률: 100%
      효과: 무적(3)
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 숙주 유전체 안에 숨어 추적을 피했다.
      learnText: 잠복 저장소는 HIV 완치가 어려운 이유 중 하나다.


작업메모:
- 후보 번호: 31
- 출처 강의: 01, 08, 09, 10, 12, 17, 20
- 기존 대표 패시몬 `레트로잠`과 연결되므로 최종 반영 시 이름/기술 중복 확인 필요.
