# 패시몬 노트

이름: 폐렴클렙
학명: 폐렴막대균(Klebsiella pneumoniae)
타입: 세균
태그:
- structure: 그람음성
- location: 세포외
- pathway: 호흡기/소화기/병원내
방어특성: 협막
메모:
- 세균 타입이며 방어특성은 협막이다.
- 그람음성 구조와 세포외 위치가 핵심이다.
- 호흡기, 소화기, 병원내 경로로 감염될 수 있다.
- 점액 협막 팽창와 폐포 점액 장악, 내독소 발열이 대표 병인이다.

이미지:
- 대표 시각 특징: 두꺼운 협막, 점액성 집락, 폐렴, currant jelly sputum, 간농양
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 끈적한 점액 망토를 두른 통통한 막대균이 붉은 가래 방울을 들고 있는 픽셀풍 몬스터
- 실사풍: mucoid Klebsiella colony, capsule stain 또는 Klebsiella pneumonia 병태 참고형 이미지

능력치:
- HP: 90
- 공격: 70
- 방어: 80

기술:
- 이름: 점액 협막 팽창
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 두꺼운 점액 협막을 부풀려 정착을 준비한다.
  learnText: Klebsiella pneumoniae는 두꺼운 협막과 mucoid colony가 중요한 이미지다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 끈적한 협막으로 자신을 감쌌다.
      learnText: 협막은 포식 회피와 병원성 강화에 연결된다.

- 이름: 폐포 점액 장악
  종류: 공격기
  타입: 호흡기
  위력: 60
  명중: 100%
  effect:
  description: {name}이 폐포를 끈적한 염증성 점액으로 채운다.
  learnText: Klebsiella 폐렴은 점액성 객담과 심한 폐렴 이미지로 기억할 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 기침
      증상: 기침
      effect:
      description: {name}이 끈적한 가래와 기침을 만들었다.
      learnText: 기침 상태이상은 호흡기 감염의 반복 키워드로 사용한다.

- 이름: 내독소 발열
  종류: 공격기
  타입: 독소
  위력: 50
  명중: 100%
  effect:
  description: {name}이 LPS 내독소로 발열 반응을 일으킨다.
  learnText: Klebsiella는 그람음성 막대균이므로 LPS 내독소 개념과 연결된다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 발열
      증상: 발열
      effect:
      description: {name}의 내독소가 열성 반응을 끌어냈다.
      learnText: 그람음성균의 공통 축은 LPS와 염증 반응이다.

- 이름: 점액 협막 성벽
  종류: 전용기
  타입: 방어
  위력: 0
  명중: 100%
  effect:
  description: {name}이 끈적한 협막 성벽을 세워 면역 공격을 버틴다.
  learnText: Klebsiella의 협막은 hvKP와 CRE 설계에서도 이어지는 핵심 소재다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 점액 협막 속으로 숨어 포식을 피했다.
      learnText: 점액성 집락과 협막은 Klebsiella를 한눈에 구분하게 해준다.


작업메모:
- 후보 번호: 27
- 출처 강의: 15, 16, 22, 28, 33
- hvKP와 CRE는 별도 후보라 이 노트는 일반 K. pneumoniae 중심으로 유지했다.
