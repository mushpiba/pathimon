# 패시몬 노트

이름:
학명: 콜레라균(Vibrio cholerae)
타입: 세균
태그:
- structure: 그람음성/만곡막대
- location: 소장
- pathway: 오염수/소화기
방어특성:

이미지:
- 대표 시각 특징: 콤마 모양 만곡균, 오염수, 콜레라 독소, 쌀뜨물 설사
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 푸른 물결을 타는 콤마 모양 균이 쌀뜨물 방울을 뿌리는 픽셀풍 몬스터
- 실사풍: Vibrio cholerae curved rods 또는 cholera rice-water stool 교육용 참고형 이미지

능력치:
- HP: 72
- 공격: 75
- 방어: 45

기술:
- 이름: 오염수 유입
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect:
  description: {name}이 오염된 물을 타고 소장에 도달한다.
  learnText: 콜레라는 오염수와 분비성 수양성 설사를 대표하는 세균 감염이다.
  결과:
    - 확률: 100%
      효과: 공격력 +1랭크
      상태이상:
      증상:
      effect:
      description: {name}이 소장 표면에 떠밀려 들어왔다.
      learnText: 산에 약해 감염량이 큰 편이라는 점도 감별 포인트다.

- 이름: 콜레라 독소
  종류: 공격기
  타입: 독소
  위력: 65
  명중: 100%
  effect:
  description: {name}이 cAMP를 올려 물과 전해질을 장관으로 끌어낸다.
  learnText: Cholera toxin은 Gs를 ADP-ribosylation하여 cAMP를 증가시키는 A-B toxin이다.
  결과:
    - 확률: 100%
      단계:
      위력:
      효과:
      상태이상: 배설 이상, 탈수
      증상: 배설 이상, 탈수
      effect:
      description: {name}이 장관의 물길을 열어 탈수를 유발했다.
      learnText: 쌀뜨물 설사는 콜레라의 가장 강한 학습 키워드다.

- 이름: 쌀뜨물 파도
  종류: 전용기
  타입: 소화기
  위력: 0
  명중: 100%
  effect:
  description: {name}이 쌀뜨물 같은 수양성 설사 파도를 만든다.
  learnText: 콜레라 전용기는 직접 피해보다 탈수 누적 컨셉이 잘 어울린다.
  결과:
    - 확률: 100%
      효과:
      상태이상: 탈수, 배설 이상
      증상: 탈수, 배설 이상
      effect:
      description: {name}이 체액을 크게 빼앗는 파도를 일으켰다.
      learnText: 수액 보충이 치료에서 중요한 이유를 떠올리게 한다.

메모:
- 2차 보류 후보.
- 출처 강의: 13, 17, 33
- 기존 대표 패시몬 `콜렁방울`과 연결되므로 최종 반영 시 중복 확인 필요.
