# 패시몬 노트

이름:
학명: 간염바이러스군(Hepatitis viruses)
타입: 바이러스
태그:
- structure: HAV/HBV/HCV/HDV/HEV
- location: 간세포
- pathway: 분변-경구/혈액/성접촉/수직감염
방어특성: 만성화

이미지:
- 대표 시각 특징: 간세포 표적, 황달, 혈액/분변-경구 전파 차이, 만성 간염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 간 모양 방패 위에 서로 다른 전파 표식이 붙은 바이러스 무리 픽셀풍 몬스터
- 실사풍: hepatitis-associated liver inflammation 또는 hepatitis virus educational schematic 참고형 이미지

능력치:
- HP: 78
- 공격: 70
- 방어: 70

기술:
- 이름: 전파형 선택
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 분변-경구, 혈액, 성접촉 중 한 길로 간을 노린다.
  learnText: 간염바이러스는 종류별 전파 경로 차이를 먼저 정리하면 좋다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 간세포 쪽으로 표적을 맞췄다.
      learnText: 준비기는 HAV/HEV와 HBV/HCV/HDV 전파 차이를 한 노트에 묶은 초안이다.

- 이름: 간세포 염증
  종류: 공격기
  타입: 면역매개
  위력: 70
  명중: 100%
  effect:
  description: {name}이 간세포 주변 염증을 키워 전신 피로를 남긴다.
  learnText: 간염은 피로, 발열, 황달, 간효소 상승 같은 맥락으로 배운다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 피로, 발열, 황달
      증상: 피로, 발열, 황달
      effect:
      description: {name}이 간을 달구고 몸을 무겁게 했다.
      learnText: 간염의 황달은 공식 상태이상 황달로 표현한다.

- 이름: 만성 간염
  종류: 공격기
  타입: 면역매개
  위력: 60
  명중: 100%
  effect:
  description: {name}이 긴 시간 간세포 손상을 이어 간다.
  learnText: HBV/HCV는 만성화, 간경변, 간암 위험과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 피로, 혈압 이상
      증상: 피로, 혈압 이상
      effect:
      description: {name}이 오래 남는 간 부담을 쌓았다.
      learnText: 간경변/문맥압 같은 축은 공식 상태이상 혈압 이상으로 임시 표현했다.

- 이름: 항원 표식 연대기
  종류: 전용기
  타입: 바이러스
  위력: 0
  명중: 100%
  effect:
  description: {name}이 표면항원과 항체 표식을 시간표처럼 바꾼다.
  learnText: HBV serology는 간염바이러스 학습의 큰 축이다.
  결과:
    - 확률: 100%
      효과: 2턴 무적
      상태이상:
      증상:
      effect:
      description: {name}이 항원 표식을 바꾸며 잠시 판정을 피했다.
      learnText: serology 패턴 변화는 전투상 무적 키워드로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 06, 10, 11, 22, 33
- 실제 반영 때는 HAV/HBV/HCV/HDV/HEV를 분리하는 편이 더 좋을 수 있다.
- 황달은 공식 상태이상 `황달`로 반영했다.
