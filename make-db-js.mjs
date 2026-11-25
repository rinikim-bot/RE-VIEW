// data/channel-types.json → data/channel-types.js
// index.html을 더블클릭해서 열면(file://) 브라우저가 JSON fetch를 막기 때문에, 같은 내용을 스크립트로도 만들어 둔다.
import { readFileSync, writeFileSync } from 'node:fs';
const json = readFileSync(new URL('../data/channel-types.json', import.meta.url), 'utf8');
JSON.parse(json); // 문법 검사
writeFileSync(new URL('../data/channel-types.js', import.meta.url),
  `// 자동 생성 파일입니다. 직접 고치지 말고 channel-types.json을 고친 뒤 npm run build 를 실행하세요.\nwindow.CHANNEL_DB = ${json.trim()};\n`);
console.log('data/channel-types.js 생성 완료');
