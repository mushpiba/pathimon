# 패시몬 노트

이름:
학명: 비브리오 패혈증균(Vibrio vulnificus)
타입: 세균
태그:
- structure: 그람음성/만곡막대
- location: 혈류/피부연조직
- pathway: 해산물/상처해수
방어특성: 철획득

이미지:
- 대표 시각 특징: 해산물/바닷물, 간질환 위험군, 패혈증, 괴사성 피부연조직 감염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 바닷물 방울과 날카로운 조개껍질을 두른 만곡균이 검붉은 상처를 만드는 픽셀풍 몬스터
- 실사풍: Vibrio vulnificus wound infection 또는 curved rods 교육용 참고형 이미지

능력치:
- HP: 78
- 공격: 88
- 방어: 50

기술:
- 이름: 해산물 상처진입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 날해산물이나 바닷물 상처를 통해 침입한다.
  learnText: V. vulnificus는 해산물 섭취와 해수 상처 노출, 간질환 위험군에서 중요하다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 바닷물 상처를 타고 혈류를 노렸다.
      learnText: 콜레라와 달리 장독소 설사보다 패혈증/상처 감염 이미지가 강하다.

- 이름: 괴사성 상처
  종류: 공격기
  타입: 조직융해
  위력: 80
  명중: 100%
  effect:
  description: {name}이 피부와 연조직을 빠르게 무너뜨린다.
  learnText: Vibrio vulnificus는 necrotizing soft tissue infection과 연결해 기억할 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 괴사
      증상: 괴사
      effect:
      description: {name}이 상처 주변 조직을 검붉게 무너뜨렸다.
      learnText: 괴사는 최대 체력 상한 감소 상태로 이미 쓰고 있다.

- 이름: 해수 패혈증
  종류: 전용기
  타입: 혈류
  위력: 85
  명중: 100%
  effect:
  description: {name}이 혈류로 퍼져 급격한 전신 악화를 일으킨다.
  learnText: V. vulnificus는 패혈증과 높은 위험도로 다른 Vibrio와 차별화된다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 혈압 이상, 발열
      증상: 혈압 이상, 발열
      effect:
      description: {name}이 전신 혈압과 열 반응을 흔들었다.
      learnText: 패혈증 상태는 혈압 이상과 발열 조합으로 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 13, 17, 33
