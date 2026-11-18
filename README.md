# 정보편식 진단기

유튜브 시청기록을 브라우저에서 분석하여 콘텐츠 유형별 시청 비중과 채널별 시청 집중도를 확인하는 웹서비스입니다.

## 주요 기능

- Google Takeout 시청기록 파일 업로드 및 분석
- 콘텐츠 유형별 시청 비중 확인
- 채널별 시청 집중도(HHI·CR3) 확인
- 사용자가 예상한 시청 유형과 실제 기록 비교
- 이전 진단 결과 확인
- 새로운 콘텐츠 유형 탐색 안내

> 분석 결과는 참고용이며, 콘텐츠의 신뢰성이나 사용자의 정치적 성향 등을 평가하지 않습니다.

## 실행 방법

별도 서버 없이 정적 웹사이트로 실행할 수 있습니다.

1. 저장소를 다운로드하거나 Clone 합니다.
2. 프로젝트 폴더에서 `index.html`을 브라우저로 엽니다.
3. 차트 라이브러리를 불러오려면 인터넷 연결이 필요합니다.

로컬 개발 서버를 사용하려면 프로젝트 폴더에서 다음 명령을 실행할 수 있습니다.

```bash
npx serve .
```

## GitHub에 올리는 방법

1. GitHub에서 새 저장소를 만듭니다.
2. 이 압축파일을 푼 뒤 **압축 안의 파일과 폴더 전체**를 저장소 최상위에 업로드합니다.
3. GitHub 저장소의 `Settings → Pages`에서 배포 방식이 `GitHub Actions`로 설정되어 있는지 확인합니다.
4. `Actions` 탭에서 `GitHub Pages 배포` 작업이 성공했는지 확인합니다.
5. 배포가 완료되면 `https://깃허브아이디.github.io/저장소이름/` 주소로 접속합니다.

`main` 브랜치에 변경 사항을 push하면 테스트와 빌드가 실행된 뒤 GitHub Pages에 자동 배포됩니다.

## 개발 및 빌드

Node.js 20 이상을 권장합니다.

```bash
npm install
npm test
npm run build
```

- `npm test`: 분석기 단위 테스트 실행
- `npm run build`: JavaScript 번들과 채널 유형 데이터 스크립트 재생성

## 프로젝트 구조

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── asset/
│   └── fonts/
├── css/
│   └── style.css
├── data/
│   ├── channel-types.json
│   └── channel-types.js
├── js/
│   ├── app.js
│   ├── app.bundle.js
│   ├── analyzer.js
│   ├── charts.js
│   ├── config.js
│   ├── explore.js
│   ├── parser.js
│   ├── sample.js
│   ├── storage.js
│   └── zip.js
├── tests/
│   ├── analyzer.test.js
│   └── fixtures/
├── tools/
│   └── make-db-js.mjs
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## 채널 유형 데이터 수정

`data/channel-types.json`의 `channels` 배열을 수정합니다. 데이터 스크립트를 갱신하려면 다음 명령을 실행합니다.

```bash
npm run build
```

## 데이터 및 개인정보 안내

시청기록 분석은 브라우저에서 수행하도록 설계되어 있습니다. 원본 시청기록이나 개인 데이터가 저장·전송되는 방식은 실제 코드와 브라우저 동작을 기준으로 확인해야 합니다. 분석 결과 저장 기능은 브라우저 저장소를 사용합니다.

## 테스트 데이터

`tests/fixtures/`에는 파서와 분석 기능을 점검하기 위한 샘플 파일이 포함되어 있습니다. 실제 개인 시청기록을 저장소에 업로드하지 마세요.
