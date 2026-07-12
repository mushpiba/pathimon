# 패시몬 노트

이름: 장붙콜리
학명: 장병원성 대장균(EPEC, Enteropathogenic E. coli)
타입: 세균 병원형
태그:
- structure: 그람음성
- location: 세포외
- pathway: 소화기
방어특성: 부착선모
메모:
- 세균 병원형 타입이며 방어특성은 부착선모이다.
- 그람음성 구조와 세포외 위치가 핵심이다.
- 소화기 경로로 감염될 수 있다.
- 장상피 부착와 미세융모 소거, Tir 발판 주입이 대표 병인이다.

이미지:
- 대표 시각 특징: 장상피에 단단히 붙은 균, 미세융모 소실, pedestal 형성
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 장상피 위에 작은 발판을 세우고 올라탄 막대균 픽셀 몬스터
- 실사풍: attaching and effacing lesion 또는 E. coli 장상피 부착을 설명하는 교육용 참고형 이미지

능력치:
- HP: 70
- 공격: 55
- 방어: 55

기술:
- 이름: 장상피 부착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 장상피에 밀착해 발판을 만들기 시작한다.
  learnText: EPEC는 attaching and effacing lesion으로 미세융모를 손상시키는 병원형이다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 상피세포 표면에 단단히 붙었다.
      learnText: 부착 자체가 병인인 경우 공격기보다 준비기에서 특징을 드러내기 좋다.

- 이름: 미세융모 소거
  종류: 공격기
  타입: 부착
  위력: 50
  명중: 100%
  effect:
  description: {name}이 장상피 미세융모를 지워 흡수를 방해한다.
  learnText: 미세융모 소실은 흡수 장애와 설사로 이어질 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}이 미세융모를 깎아 장 흡수를 무너뜨렸다.
      learnText: EPEC는 강한 독소보다 부착과 상피 구조 변화가 중심이다.

- 이름: Tir 발판 주입
  종류: 공격기
  타입: 침습
  위력: 45
  명중: 100%
  effect:
  description: {name}이 상피세포에 자기 수용체를 심어 발판을 세운다.
  learnText: EPEC/EHEC의 type III secretion과 Tir-intimin 상호작용은 pedestal 형성과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 세포 표면에 자기 발판을 만들었다.
      learnText: 세균이 숙주세포 구조를 바꾸는 방식은 병원성 이해에 중요하다.

- 이름: 발판 군락
  종류: 전용기
  타입: 부착
  위력: 0
  명중: 100%
  effect:
  description: {name}이 장상피 위에 발판 군락을 넓힌다.
  learnText: EPEC는 독소보다 장상피 부착과 미세융모 손상을 대표 이미지로 삼는 편이 좋다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}이 발판 군락 속으로 숨어 장상피를 뒤덮었다.
      learnText: attaching and effacing lesion은 EPEC를 구분하는 핵심 표현이다.


작업메모:
- 후보 번호: 13
- 출처 강의: 33
- `흡수 장애` 상태이상은 공식 목록에 없어 `배설 이상`으로 표현했다.
