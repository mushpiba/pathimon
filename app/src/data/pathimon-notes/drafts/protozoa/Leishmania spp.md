# 패시몬 노트

이름:
학명: 리슈마니아속(Leishmania spp.)
타입: 원생동물
태그:
- structure: 원충/편모형-무편모형
- location: 대식세포내
- pathway: 모래파리매개
방어특성: 대식세포생존

이미지:
- 대표 시각 특징: 모래파리 매개, 대식세포 안 amastigote, 피부궤양/내장 침범
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 모래색 파리 날개와 대식세포 방패 안 작은 원충 무리가 합쳐진 픽셀풍 몬스터
- 실사풍: Leishmania amastigotes in macrophages 또는 cutaneous leishmaniasis 교육용 참고형 이미지

능력치:
- HP: 74
- 공격: 72
- 방어: 66

기술:
- 이름: 모래파리 흡혈
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 모래파리 침과 함께 피부로 들어온다.
  learnText: Leishmania는 sandfly 매개와 대식세포 내 생존을 함께 기억한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 피부 아래 대식세포를 향해 들어갔다.
      learnText: 준비기는 promastigote가 피부로 들어오는 경로를 표현했다.

- 이름: 대식세포 생존
  종류: 공격기
  타입: 세포내
  위력: 55
  명중: 100%
  effect:
  description: {name}이 대식세포 안에서 오히려 살아남는다.
  learnText: Leishmania amastigote는 대식세포 안에서 증식한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 포식세포 방어를 안쪽에서 무너뜨렸다.
      learnText: 대식세포 내 생존은 면역 이상으로 임시 표현했다.

- 이름: 피부궤양 고리
  종류: 공격기
  타입: 침습
  위력: 65
  명중: 100%
  effect:
  description: {name}이 피부에 가장자리 솟은 궤양을 남긴다.
  learnText: Cutaneous leishmaniasis는 만성 피부궤양 이미지가 강하다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 괴사
      증상: 괴사
      effect:
      description: {name}이 피부 표면에 궤양성 흔적을 만들었다.
      learnText: 궤양은 공식 상태이상 중 괴사로 임시 표현했다.

- 이름: 내장 잠식
  종류: 전용기
  타입: 세포내
  위력: 90
  명중: 100%
  effect:
  description: {name}이 대식세포를 타고 간과 비장 쪽으로 번진다.
  learnText: Visceral leishmaniasis는 발열, 체중감소, 간비장종대와 연결된다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 발열, 피로, 혈압 이상
      증상: 발열, 피로, 혈압 이상
      effect:
      description: {name}이 장기 깊은 곳에서 열과 피로를 키웠다.
      learnText: 내장형 리슈마니아증의 전신 소모 이미지는 발열/피로로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 19
- 피부형/내장형을 분리할지 최종 검수 필요.
