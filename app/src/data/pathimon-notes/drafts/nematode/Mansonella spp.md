# 패시몬 노트

이름:
학명: 만소넬라속(Mansonella spp.)
타입: 선충
태그:
- structure: 사상충/미세사상충
- location: 피부/장막/혈액
- pathway: 흡혈곤충매개
방어특성: 저강도지속감염

이미지:
- 대표 시각 특징: 작은 사상충, 흡혈곤충 매개, 피부/장막 미세사상충, 가벼운 만성 증상
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 아주 가는 실 같은 선충 여러 마리가 얇은 피부막 아래 퍼져 있는 픽셀풍 몬스터
- 실사풍: Mansonella microfilariae 또는 filarial blood/skin smear 교육용 참고형 이미지

능력치:
- HP: 70
- 공격: 56
- 방어: 68

기술:
- 이름: 흡혈곤충 매개
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 작은 흡혈곤충을 타고 피부 쪽으로 들어온다.
  learnText: Mansonella는 사상충이지만 대개 더 가벼운 만성 감염으로 정리할 수 있다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 가느다란 실처럼 피부 아래에 자리 잡았다.
      learnText: 준비기는 vector-borne filarial entry를 표현했다.

- 이름: 미세사상충 산포
  종류: 공격기
  타입: 기생
  위력: 45
  명중: 100%
  effect:
  description: {name}이 아주 작은 미세사상충을 넓게 흩뿌린다.
  learnText: 미세사상충은 혈액/피부 도말에서 확인되는 이미지로 잡는다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 피로
      증상: 피로
      effect:
      description: {name}이 낮은 강도의 피로를 길게 남겼다.
      learnText: 가벼운 만성 감염은 피로로 임시 표현했다.

- 이름: 장막 자극
  종류: 공격기
  타입: 기생
  위력: 50
  명중: 100%
  effect:
  description: {name}이 피부나 장막 표면을 은근히 자극한다.
  learnText: 종에 따라 피부/장막 증상이 다를 수 있어 속 수준 초안으로 둔다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 부종, 가려움
      증상: 부종, 가려움
      effect:
      description: {name}이 얕은 부종을 남겼다.
      learnText: 가려움/피부 자극은 공식 상태이상 가려움으로 표현한다.

- 이름: 조용한 사상망
  종류: 전용기
  타입: 기생
  위력: 0
  명중: 100%
  effect:
  description: {name}이 가느다란 사상망으로 오래 버틴다.
  learnText: Mansonella는 극적인 급성 증상보다 저강도 지속감염 이미지가 어울린다.
  결과:
    - 확률: 100%
      효과: 2턴 무적
      상태이상:
      증상:
      effect:
      description: {name}이 얇은 사상망 안으로 숨어 잠시 공격을 피했다.
      learnText: 저강도 지속감염은 전투상 무적 키워드로 임시 표현했다.

메모:
- 2차 보류 후보.
- 출처 강의: 29
- M. perstans, M. ozzardi, M. streptocerca 중 분리 여부 검수 필요.
