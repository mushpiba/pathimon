# 패시몬 노트

이름:
학명: 세라티아 마르세센스(Serratia marcescens)
타입: 세균
태그:
- structure: 그람음성
- location: 의료기구/습윤환경
- pathway: 병원내/의료기구
방어특성: 바이오필름

이미지:
- 대표 시각 특징: 붉은 prodigiosin 색소, 습윤 환경, 의료기구 오염, 병원내 기회감염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 붉은 색소 물감 방울을 흘리는 막대균이 싱크대/기구 위에 붙은 픽셀풍 몬스터
- 실사풍: red-pigmented Serratia colony 또는 hospital water/device contamination 교육용 참고형 이미지

능력치:
- HP: 72
- 공격: 58
- 방어: 62

기술:
- 이름: 습윤기구 정착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 습한 병원 환경과 의료기구 표면에 자리 잡는다.
  learnText: Serratia marcescens는 붉은 색소와 의료환경 기회감염 이미지로 기억할 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 물기 많은 표면에 붉은 흔적을 남겼다.
      learnText: 2차 후보라 핵심 강의 분량은 적지만 시각 컨셉은 선명하다.

- 이름: 붉은 색소막
  종류: 공격기
  타입: 부착
  위력: 40
  명중: 100%
  effect:
  description: {name}이 붉은 색소와 biofilm으로 표면을 뒤덮는다.
  learnText: Prodigiosin 붉은 색소는 Serratia를 시각적으로 구분하기 좋다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 붉은 막으로 방어선을 흐렸다.
      learnText: 색소 자체가 병인이라는 뜻은 아니므로 학습문구에서 과장하지 않는다.

- 이름: 병원내 붉은 흔적
  종류: 전용기
  타입: 기회감염
  위력: 0
  명중: 100%
  effect:
  description: {name}이 의료 환경에 붉은 오염 흔적을 넓힌다.
  learnText: Serratia는 병원내 기회감염과 환경 오염 후보로 보류된 상태다.
  결과:
    - 확률: 100%
      효과: 무적(2)
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 기구 표면 biofilm 속으로 숨어 버텼다.
      learnText: 최종 승격 전 강의 강조도가 충분한지 검수한다.

메모:
- 2차 보류 후보.
- 출처 강의: 33
