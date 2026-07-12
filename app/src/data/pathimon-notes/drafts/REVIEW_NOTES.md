# 패시몬 노트 검수 포인트

## 진행 상태

- 1차 핵심 후보 54개 파일 작성 완료.
- 2차 보류 후보 파일 작성 완료.
- 확정 노트: `Bacillus anthracis.md`, `Bacillus cereus.md`
- 검수용 draft:
  - `drafts/bacteria`
  - `drafts/fungus`
  - `drafts/protozoa`
  - `drafts/virus`
  - `drafts/nematode`
  - `drafts/trematode`
  - `drafts/cestode`
- 모든 draft의 `effect` 항목은 사용자가 지정하기 전까지 공란으로 유지한다.
- 상태이상은 `STATUS_CONDITIONS.md`의 공식 목록만 사용한다.
- 이미지 설명의 `기존과 겹치지 않게 할 요소`는 특정 패시몬명을 나열하지 않고, 현재 생성되어 있는 모든 기존 패시몬 이미지 풀과 비교하도록 통일했다.

## 후보지만 설계 검수가 필요한 항목

- `Chlamydia spp.`와 `Chlamydia trachomatis`
  - 속 대표 패시몬과 종별 패시몬이 중복될 수 있다.
  - 최종 반영 때 통합할지, `trachomatis`를 눈/성매개 특화형으로 둘지 결정 필요.
- `CRE`, `VRE`
  - 병원체 종이 아니라 내성형 묶음이다.
  - 독립 패시몬, 변이, 진화형, 특성 중 어느 방식으로 반영할지 검수 필요.
- `Klebsiella pneumoniae`, `Hypervirulent Klebsiella pneumoniae`, `CRE`
  - hvKP와 CRE는 종/병원형/내성형 축이 섞인다.
  - 서로 다른 개체로 둘 경우 이미지와 기술 차별화가 필수다.
- `Vibrio cholerae`, `Vibrio vulnificus`, `Vibrio parahaemolyticus`
  - 같은 속이지만 질환 축이 물설사/상처 괴사/해산물 장염으로 다르다.
  - 세 패시몬은 유지 가능성이 높지만 이미지 색과 실루엣 차별화 필요.
- `Mycobacterium tuberculosis`, `Mycobacterium leprae`, `Mycobacterium bovis`
  - 항산균이라는 시각 요소가 겹칠 수 있다.
  - 폐 육아종, 피부/말초신경, 소/우유/림프절 축으로 나눠야 한다.
- `Plasmodium spp.`
  - P. falciparum, P. vivax 등 종별 특징이 커서 추후 분리 후보.
- `Leishmania spp.`
  - 피부형/점막피부형/내장형을 하나로 묶은 초안이다.
  - 최종 반영 시 타입 또는 진화/폼 분리 검토.
- `Hepatitis viruses`
  - HAV/HBV/HCV/HDV/HEV를 한 파일에 묶은 임시 초안이다.
  - 게임 학습성은 좋지만 최종 반영은 종별 분리가 더 정확할 수 있다.
- `HSV`
  - HSV-1/HSV-2를 나눌지, 하나의 대표 패시몬으로 둘지 결정 필요.
- `Salmonella Typhi`와 `Salmonella Paratyphi`
  - 둘 다 장티푸스성 전신 발열 컨셉이라 기술이 겹칠 수 있다.
  - 별도 패시몬으로 유지할지, Paratyphi를 Typhi 변이/스킨처럼 처리할지 검수 필요.
- `Shigella spp.`와 Shigella 종별 3개
  - 속 대표 패시몬과 종별 패시몬이 중복될 수 있다.
  - `Shigella spp.`를 대표형으로 쓰고 종별은 변이로 둘지 검수 필요.
- `Trichinella spiralis`
  - 사용자가 말한 기생충 진화 구조에 맞춰 `유충`, `성충` 노트 분리 후보.
- `Schistosoma spp.`
  - `S. mansoni`, `S. japonicum`, `S. haematobium` 종별 병변이 달라 추후 분리 가능.
- `Taenia solium`, `Taenia saginata`
  - 돼지고기 낭미충 섭취/충란 섭취/소고기 낭미충 섭취가 서로 다르다.
  - `T. solium`은 장내 성충형과 낭미충증형 분리 후보.
- `Toxocara canis`, `Toxocara cati`
  - 개/고양이 유래 차이를 유지할지, Toxocara 대표형으로 통합할지 검수 필요.
- `Brugia malayi`, `Brugia timori`, `Wuchereria bancrofti`
  - 모두 림프사상충증 축이라 기술과 상태이상이 겹친다.
  - 지역/종 차이를 살릴지, 림프사상충 진화/폼으로 묶을지 결정 필요.
- `Heterophyes`, `Metagonimus`, `Echinostoma`
  - 모두 장흡충류라 `배설 이상` 중심으로 겹친다.
  - Heterophyes/Metagonimus는 통합 가능성이 높고, Echinostoma는 collar spine으로 차별화 가능.
- `Dirofilaria immitis`, `Mansonella spp.`, `Alaria`
  - 강의 언급이 짧거나 사람 병원체로서 우선순위가 애매할 수 있다.
  - 최종 로스터 반영 전 우선도 검수 필요.

## 공식 상태이상에 반영한 항목

- `통증`: 복통, 두통, 조직 침습 통증 표현에 사용한다.
- `가려움`: 피부염/소양감 표현에 사용한다.
- `황달`: 간염/담관계 병원체의 직접 피해 증가 표현에 사용한다.
- `청력 이상`: 중이염, 선천감염의 청각 저하 표현에 사용한다.
- `배설 이상`: 기존 `배변 이상`을 확장한 공식 용어다. 배변 이상과 배뇨 이상을 모두 포함한다.
- `면역 이상`: `호산구 증가`는 1스택, 기존 `면역 붕괴`는 2스택으로 표현한다.

## 상태이상이 아니라 증상 텍스트로 남길 항목

- 빈혈
  - 상태이상으로 만들지 않는다.
  - 필요하면 `증상:`과 description/learnText에 남긴다.
  - 관련 후보: `Ancylostoma duodenale`, `Necator americanus`, `Plasmodium spp.`
- 발진
  - 상태이상으로 만들지 않는다.
  - 필요하면 `증상:`과 description/learnText에 남긴다.
  - 관련 후보: `Measles`, `Rickettsia spp.`, `Treponema pallidum`, `Borrelia burgdorferi`

## 아직 공식 상태이상에 없어서 임시 표현하거나 텍스트로만 남긴 증상

- 흡수장애
  - 임시 표현: `배설 이상`, `탈수`, `피로`
  - 관련 후보: `Capillaria philippinensis`, 장관 기생충 후보들
- 경련/두통/수막자극
  - 임시 표현: `신경 이상`, `통증`, `발열`
  - 관련 후보: `Taenia solium`, `LCMV`, `Angiostrongylus cantonensis`, `HSV`, `Poliovirus`, `Rabies`
- 미각/후각 이상
  - 임시 표현: 직접 상태이상으로 쓰지 않음
  - 관련 후보: `SARS-CoV-2`
