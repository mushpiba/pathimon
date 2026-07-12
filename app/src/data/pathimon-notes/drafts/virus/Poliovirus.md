# 패시몬 노트

이름:
학명: 폴리오바이러스(Poliovirus)
타입: 바이러스
태그:
- structure: 비외피/RNA/피코르나바이러스
- location: 장관/전각운동신경
- pathway: 분변-경구
방어특성: 산저항성

이미지:
- 대표 시각 특징: 비외피 장관 바이러스, 분변-경구 전파, 전각세포 침범, 이완성 마비
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 단단한 작은 바이러스가 장관 문을 지나 척수 전각 표식을 향해 굴러가는 픽셀풍 몬스터
- 실사풍: poliovirus virion 또는 anterior horn motor neuron pathology 교육용 참고형 이미지

능력치:
- HP: 68
- 공격: 76
- 방어: 62

기술:
- 이름: 장관 증식
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 장관에서 먼저 증식한다.
  learnText: Poliovirus는 분변-경구 전파 뒤 장관에서 증식하고 일부가 신경계로 간다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 장관 표면에서 작은 입자를 늘렸다.
      learnText: 준비기는 enteric replication을 표현했다.

- 이름: 전각세포 침범
  종류: 공격기
  타입: 신경
  위력: 80
  명중: 100%
  effect:
  description: {name}이 척수 전각 운동신경을 침범한다.
  learnText: Paralytic poliomyelitis는 anterior horn cell 손상과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 마비
      증상: 마비
      effect:
      description: {name}이 운동신경의 힘을 끊었다.
      learnText: 이완성 마비는 공식 상태이상 마비로 표현한다.

- 이름: 이완성 마비
  종류: 전용기
  타입: 신경
  위력: 90
  명중: 100%
  effect:
  description: {name}이 한쪽 힘을 빠르게 빼앗는 이완성 마비를 일으킨다.
  learnText: Poliovirus는 acute flaccid paralysis와 함께 기억한다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 마비(2), 피로
      증상: 마비, 피로
      effect:
      description: {name}이 근력을 꺼뜨리고 긴 피로를 남겼다.
      learnText: 전용기는 마비 2스택으로 급성 이완성 마비를 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 10, 11, 22, 33
- 백신/박멸 역사 요소는 기술보다는 도감 설명 후보로 둔다.
