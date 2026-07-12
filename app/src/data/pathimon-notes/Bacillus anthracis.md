# 패시몬 노트

이름: 탄저록스
학명: 탄저균(Bacillus anthracis)
타입: 세균
태그:
- structure: 그람양성
- location: 세포외
- pathway: 상처/호흡기/소화기
방어특성: 아포
메모:
- 세균 타입이며 방어특성은 아포이다.
- 그람양성 구조와 세포외 위치가 핵심이다.
- 상처, 호흡기, 소화기 경로로 감염될 수 있다.
- 아포 발아와 탄저 독소, 협막 형성이 대표 병인이다.

이미지:
- 대표 시각 특징: 피부탄저의 검은 가피, 붉은 부종 테두리, 짧은 사슬형 막대균
- 기존과 겹치지 않게 할 요소: 현재 생성되어 있는 모든 기존 패시몬 이미지(app/public/images/pathimon 및 app/dist/images/pathimon 기준)의 실루엣, 색 조합, 장식 요소, 구도와 비교해 너무 유사하게 보이지 않도록 한다.
- 캐릭터풍: 검은 가피를 얼굴/중심 실루엣으로 둔 픽셀풍 몬스터
- 실사풍: 대식세포가 막대균을 감싸 들이는 포식작용 구도와, 막대균 주변의 poly-D-glutamate 협막을 연상시키는 옅은 막/halo가 보이는 실제 현미경 참고형 이미지

능력치:
- HP: 100
- 공격: 100
- 방어: 100

기술:
- 이름: 아포 발아
  종류: 준비기
  타입: 준비
  위력: 0
  명중: 100%
  effect: 
  description: {name}이 아포를 발아시켜 감염을 준비한다.
  learnText: 탄저균은 아포 상태로 버티다가 숙주 안에서 발아해 감염을 시작한다.
  결과:
    - 확률: 95%
      효과: 공격력 +1랭크
      상태이상:
      증상: 피부탄저
      effect: 
      description: {name}이 피부 상처를 통해 감염을 시작했다.
      learnText: 피부상처로 감염되었다.
    - 확률: 4%
      효과: 공격력 +2랭크
      상태이상:
      증상: 위장탄저
      effect: 
      description: {name}이 소화기를 통해 감염을 시작했다.
      learnText: 소화기로 감염되었다.
    - 확률: 1%
      효과: 공격력 +4랭크
      상태이상: 발열, 기침, 피로
      증상: 흡입탄저
      effect: 
      description: {name}이 호흡기를 통해 감염을 시작했다.
      learnText: 호흡기로 감염되었다.

- 이름: 탄저 독소
  종류: 공격기
  타입: 독소
  위력: 단계별(0/40/200)
  명중: 100%
  effect: 
  description: {name}이 탄저 독소 복합체를 단계적으로 투입한다.
  learnText: PA는 EF와 LF가 세포 안으로 들어갈 발판을 만든다.
  결과:
    - 확률: 100%
      단계: 1단계
      효과:
      상태이상:
      증상:
      effect: 
      description: {name}은 PA(protective antigen)를 투입했다.
      learnText: PA는 EF와 LF가 세포 안으로 들어갈 발판을 만든다.
    - 확률: 100%
      단계: 2단계
      효과:
      상태이상: 부종
      증상: 부종
      effect: 
      description: {name}이 EF(edema factor)로 cAMP를 증가시켜 부종을 만들었다.
      learnText: EF는 adenylate cyclase로 작동해 세포 내 cAMP를 올린다.
    - 확률: 100%
      단계: 3단계
      효과:
      상태이상: 괴사
      증상: 괴사
      effect: 
      description: {name}은 LF(lethal factor)로 MAP kinase를 잘라 세포를 괴사시켰다.
      learnText: LF는 MAPK 경로를 방해해 세포 손상과 괴사를 유도한다.

- 이름: 협막 형성
  종류: 전용기
  타입: 방어
  위력: 0
  명중: 100%
  effect: 
  description: {name}이 협막을 형성해 포식을 피한다.
  learnText: 탄저균의 poly-D-glutamate 협막은 식세포 포식을 피하는 데 도움을 준다.
  결과:
    - 확률: 100%
      효과: 무적(3)
      상태이상:
      증상:
      effect: 
      description: {name}이 협막을 형성하여 포식세포의 포식을 막았다.
      learnText: 탄저균의 poly-D-glutamate 협막은 식세포 포식을 피하는 데 도움을 준다.


작업메모:
- 탄저 독소는 한 기술이지만 1단계, 2단계, 3단계 결과가 순환한다.
- 전용기는 4번 슬롯에 고정된다.
- 도전모드에서는 이 개체가 이상한 사탕을 사용하기 전까지 전용기가 잠겨 있다.
