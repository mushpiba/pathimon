# 패시몬 노트

이름: 디피실룩
학명: 클로스트리디오이데스 디피실레(Clostridioides difficile)
타입: 세균
태그:
- structure: 그람양성/아포
- location: 세포외
- pathway: 소화기/항생제후
방어특성: 아포
메모:
- 세균 타입이며 방어특성은 아포이다.
- 그람양성, 아포 구조와 세포외 위치가 핵심이다.
- 소화기, 항생제후 경로로 감염될 수 있다.
- 균총 공백 점령와 독소 A, 독소 B이 대표 병인이다.

이미지:
- 대표 시각 특징: 아포성 혐기성 막대균, 항생제 뒤 비어버린 장내 균총, 노란 위막성 결장염 판
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 장 점막 모양 판 위에 아포성 막대균이 깃발처럼 올라탄 픽셀풍 몬스터
- 실사풍: 위막성 결장염 병변 또는 C. difficile 아포성 막대균을 보여주는 교육용 참고형 이미지

능력치:
- HP: 90
- 공격: 60
- 방어: 65

기술:
- 이름: 균총 공백 점령
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 항생제 뒤 비어버린 장내 공간을 차지한다.
  learnText: C. difficile 감염은 항생제 사용 뒤 정상균총이 무너질 때 잘 발생한다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 장내 균총의 빈자리를 빠르게 메웠다.
      learnText: 정상균총은 병원체 정착을 막는 방어선 역할을 한다.

- 이름: 독소 A
  종류: 공격기
  타입: 독소
  위력: 45
  명중: 100%
  effect:
  description: {name}이 장 점막을 흔드는 enterotoxin을 분비한다.
  learnText: C. difficile toxin A는 장염과 수분 분비를 일으키는 독소로 설명된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상
      증상: 배설 이상
      effect:
      description: {name}의 독소가 장 운동과 수분 균형을 무너뜨렸다.
      learnText: 항생제 후 설사는 C. difficile을 떠올려야 하는 대표 상황이다.

- 이름: 독소 B
  종류: 공격기
  타입: 독소
  위력: 60
  명중: 100%
  effect:
  description: {name}이 세포골격을 무너뜨리는 cytotoxin을 뿜는다.
  learnText: C. difficile toxin B는 세포 손상과 염증을 강하게 유발한다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 괴사
      증상: 괴사
      effect:
      description: {name}이 장 점막 세포를 망가뜨렸다.
      learnText: 위막성 결장염은 장 점막 손상과 염증의 결과로 이해할 수 있다.

- 이름: 위막성 결장염
  종류: 전용기
  타입: 소화기
  위력: 75
  명중: 100%
  effect:
  description: {name}이 장 점막 위에 두꺼운 염증성 위막을 만든다.
  learnText: C. difficile은 pseudomembranous colitis의 대표 원인이다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 탈수, 부종
      증상: 탈수, 부종
      effect:
      description: {name}이 위막성 결장염으로 장벽을 뒤덮었다.
      learnText: 심한 설사는 탈수와 전신 상태 악화로 이어질 수 있다.


작업메모:
- 후보 번호: 5
- 출처 강의: 20, 21, 22
- `항생제후` pathway는 게임 태그 정규화 때 `소화기`와 별도 태그로 둘지 검토가 필요하다.
