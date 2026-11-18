# 정보편식 진단기

유튜브 시청 패턴 및 출처 편중도 진단 웹서비스. Google Takeout 시청기록을 브라우저 안에서 분석해 콘텐츠 유형별 비중, 채널 집중도(HHI·CR3), 그리고 "내가 생각하는 나 vs 실제 시청기록 속 나"를 비교한다.

## 실행

1. 받은 zip 파일을 **먼저 압축 해제**한다. (zip 안에서 바로 `index.html`을 열면 css·js 파일을 찾지 못해 깨진 화면이 나온다.)
2. 압축을 푼 폴더의 `index.html`을 더블클릭하면 바로 실행된다. 인터넷 연결이 있어야 차트가 보인다.
3. GitHub Pages에 그대로 올려도 된다.

## GitHub에 zip 그대로 올려서 배포하기

압축을 풀지 않고 zip 파일만 올려도 사이트가 열리게 하는 방법이다. 처음 한 번만 1~3번을 하고, 그다음부터는 4번만 하면 된다.

1. GitHub에서 새 저장소(Public)를 만든다.
2. **Add file → Create new file**을 누르고, 파일 이름 칸에 `.github/workflows/deploy-zip.yml`을 그대로 입력한다. (`/`를 치면 폴더가 자동으로 만들어진다.) 본문에 이 프로젝트의 `.github/workflows/deploy-zip.yml` 내용을 붙여 넣고 **Commit changes**를 누른다.
3. **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 바꾼다.
4. **Add file → Upload files**로 프로젝트 zip 파일을 올리고 **Commit changes**를 누른다.
5. **Actions** 탭에서 "zip 자동 배포"가 초록색 체크가 되면(1~2분) `https://아이디.github.io/저장소이름/`에서 열린다.

- 수정본을 배포할 때는 새 zip을 올리기만 하면 된다. zip이 여러 개 있으면 가장 최근에 올린 zip을 쓴다.
- zip 안에 폴더가 한 겹 더 있어도(`infodiet/index.html`) 알아서 찾는다.
- 빨간 X가 뜨면 Actions 탭에서 실행 기록을 눌러 오류 문구를 확인한다. ("zip 파일이 없어요", "index.html이 없어요" 등)

## 코드를 고친 뒤

화면은 `js/app.bundle.js`(여러 js 파일을 하나로 묶은 파일)를 불러온다. `js/` 폴더의 원본 파일이나 `data/channel-types.json`을 고쳤다면 다시 묶어야 반영된다.

```
npm install
npm run build
```

## 폴더 구조

```
index.html              화면 뼈대 (js/app.bundle.js와 data/channel-types.js를 불러옴) (단일 페이지, #home #predict #upload #analyzing #result #detail #history)
css/style.css           디자인 토큰과 스타일 (라이트/다크)
js/config.js            유형 목록, HHI 단계 기준(임시값), 기간 옵션, 저장 키
js/parser.js            Takeout JSON/HTML 파서 (DOM 비의존)
js/analyzer.js          분류·비중·HHI·CR3·비교 계산 (순수 함수, UI와 분리)
js/storage.js           LocalStorage 저장/삭제
js/zip.js               Takeout zip에서 시청기록 파일만 찾아 읽기 (브라우저 내장 압축 해제, 외부 전송 없음)
js/explore.js           '새로운 콘텐츠 유형 탐색'의 유튜브 검색 링크 생성 (검색어는 config.js의 EXPLORE_QUERIES)
js/charts.js            Chart.js 래퍼 (라이브러리 실패 시 안내 문구)
js/sample.js            예시 데이터 (화면에 "예시"로 표시, 저장 불가)
js/app.js               화면 7개와 라우팅
data/channel-types.json 채널별 대표 콘텐츠 유형 DB (원본)
data/channel-types.js   위 JSON을 스크립트로 바꾼 자동 생성 파일 (더블클릭 실행용)
js/app.bundle.js        npm run build로 만든 묶음 파일
asset/fonts/            Pretendard 글꼴 (SIL Open Font License 1.1)
tools/make-db-js.mjs    JSON → JS 변환 스크립트
tests/                  Node 단위 테스트와 HTML 샘플
```

## 채널 DB 수정 방법

`data/channel-types.json`의 `channels` 배열에 추가한다.

```json
{ "name": "채널 이름", "aliases": ["다른 표기"], "channelId": "UC로 시작하는 ID(선택)", "type": "knowledge" }
```

- `type`: `vlog` `entertain` `game` `beauty` `knowledge` `music` `sports` `news`
- 이름은 띄어쓰기·대소문자·특수문자를 무시하고 비교한다. `channelId`가 있으면 이름이 바뀌어도 매칭된다.
- 상세 분석 화면의 "유형 미분류 채널" CSV를 복사해 팀이 유형을 채운 뒤 옮기면 된다.
- 현재 목록은 초기 시드(65개)이며 팀 검수가 필요하다.

## 올릴 수 있는 파일

- Google Takeout에서 받은 **zip 파일 그대로** (압축을 풀 필요 없음). zip 안에서 시청기록(`watch-history.json`, `시청 기록.json` 등)을 찾아 읽고, 검색 기록은 건너뛴다. ZIP64와 동영상이 함께 든 큰 zip도 필요한 부분만 읽는다.
- 압축을 푼 `watch-history.json` 또는 `watch-history.html`

## 계산 기준

- 단위: 시청기록 **건수** (Takeout에 시청 시간이 없음)
- 제외: 광고(`From Google Ads`), 같은 시각·같은 영상 중복, 검색 기록, 날짜를 읽을 수 없는 항목
- 기간: "최근 N개월"은 파일 안의 가장 최근 시청 시각 기준. 기본 6개월, 1·3·12개월·전체·직접 지정 가능
- 유형: 채널 ID → 채널명 → `" - Topic"` 자동 음원 채널 순으로 DB 매칭, 없으면 미분류 (제목으로 판정하지 않음)
- HHI: 채널 정보가 있는 기록에서 채널별 비중(%)의 제곱합, 0~10,000
- CR3: 상위 3개 채널 비중 합
- HHI 단계 이름(분산된 이용 ~ 채널 집중 매우 높음)의 경계값은 **임시값**이다. `js/config.js`의 `HHI_LEVELS`에서 팀 데이터로 검증 후 조정한다.

## 저장 데이터

LocalStorage `infodiet.prediction.v1`(예상 유형), `infodiet.history.v1`(결과 요약 최대 20개). 원본 파일·영상 제목·채널명은 저장하지 않는다. 이전 결과 화면에서 삭제할 수 있다.

## 테스트

```
node --test tests/analyzer.test.js
```
