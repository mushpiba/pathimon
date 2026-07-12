# 패시몬 노트

이름:
학명: 녹농균(Pseudomonas aeruginosa)
타입: 세균
태그:
- structure: 그람음성
- location: 습윤환경/호흡기/상처
- pathway: 병원내/기회감염
방어특성: 바이오필름

이미지:
- 대표 시각 특징: 청록색 색소, 포도 냄새, 습윤 환경, biofilm, 화상/CF/병원내 감염
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 청록색 색소 연기를 뿜는 막대균이 물웅덩이와 biofilm 방패를 든 픽셀풍 몬스터
- 실사풍: Pseudomonas pigment colony 또는 biofilm/wound infection 교육용 참고형 이미지

능력치:
- HP: 86
- 공격: 78
- 방어: 82

기술:
- 이름: 습윤환경 정착
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 습한 병원 환경과 손상 조직에 자리 잡는다.
  learnText: Pseudomonas aeruginosa는 습윤 환경, 병원내 기회감염, biofilm 이미지가 강한 그람음성균이다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 물기 많은 표면에 청록색 흔적을 남겼다.
      learnText: 녹농균은 화상, CF, 의료기구 감염 후보로 자주 떠올린다.

- 이름: 엑소톡신 A
  종류: 공격기
  타입: 독소
  위력: 70
  명중: 100%
  effect:
  description: {name}이 단백질 합성을 막는 exotoxin A를 뿜는다.
  learnText: Pseudomonas exotoxin A는 EF-2 억제라는 점에서 디프테리아 독소와 비교할 수 있다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 피로
      증상: 피로
      effect:
      description: {name}의 독소가 세포 기능을 지치게 만들었다.
      learnText: 독소 비교는 디프테리아균과 함께 검수하면 좋다.

- 이름: 청록 바이오필름
  종류: 공격기
  타입: 부착
  위력: 45
  명중: 100%
  effect:
  description: {name}이 청록색 biofilm으로 표면을 덮는다.
  learnText: Pseudomonas biofilm은 CF 폐감염과 의료기구 감염에서 중요하다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 biofilm 속에서 방어선을 무력화했다.
      learnText: biofilm은 방어 특성 무력화 상태와 잘 어울린다.

- 이름: 녹농 색소장막
  종류: 전용기
  타입: 방어
  위력: 0
  명중: 100%
  effect:
  description: {name}이 청록색 색소와 biofilm 장막으로 오래 버틴다.
  learnText: 녹농균의 색소, 냄새, 습윤환경 이미지는 캐릭터 차별화에 좋다.
  결과:
    - 확률: 100%
      효과: 무적(3)
      상태이상: 면역 이상(2)
      증상: 면역 이상
      effect:
      description: {name}이 청록 장막 속에 숨어 공격을 버텼다.
      learnText: 현재 후보표에서는 예시/실습 맥락이 많아 2차로 둔다.

메모:
- 2차 보류 후보.
- 출처 강의: 17, 22, 28, 33
