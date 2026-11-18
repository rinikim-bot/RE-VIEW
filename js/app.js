// 화면(UI) 담당. 계산은 analyzer.js, 파일 해석은 parser.js가 맡는다.
import { CONTENT_TYPES, UNCLASSIFIED, TYPE_BY_ID, TYPE_NOUN, HHI_LEVELS, PERIOD_OPTIONS, DEFAULT_PERIOD, STORAGE_KEYS } from './config.js';
import { detectAndParse, ParseError } from './parser.js';
import {
  buildChannelIndex, prepareRecords, dataRange, resolvePeriod, filterByPeriod, analyze,
  comparePrediction, toHistoryEntry, compareEntries,
} from './analyzer.js';
import { storage } from './storage.js';
import { makeSampleRecords, SAMPLE_PREDICTION } from './sample.js';
import * as charts from './charts.js';
import { exploreQuery, youtubeSearchUrl } from './explore.js';
import { parseTakeoutZip } from './zip.js';

// ---------- 상태 ----------
const state = {
  db: null, index: null, dbError: null,
  upload: null,        // { fileName, isSample, parsed, prepared, range }
  uploadError: null,
  periodId: DEFAULT_PERIOD,
  custom: { start: '', end: '' },
  result: null,
  savedId: null,
  prediction: storage.getPrediction(),
};

const app = document.getElementById('app');
const ROUTES = ['home', 'predict', 'upload', 'analyzing', 'result', 'detail', 'history'];

// ---------- 유틸 ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const n0 = (n) => Number(n).toLocaleString('ko-KR');
const p1 = (n) => Number(n).toLocaleString('ko-KR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const ymd = (ms) => { const d = new Date(ms); return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`; };
const isoDate = (ms) => { const d = new Date(ms); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const frame = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
const go = (route) => { if (location.hash !== '#' + route) location.hash = route; else render(); };
const activePrediction = () => (state.upload && state.upload.isSample ? SAMPLE_PREDICTION : state.prediction);

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

function typeLabel(id) { return TYPE_BY_ID[id] ? TYPE_BY_ID[id].label : id; }
function dot(color) { return `<span class="dot" style="background:${color}"></span>`; }

function sampleBanner() {
  if (!state.upload || !state.upload.isSample) return '';
  return `<div class="notice sample" role="note"><strong>예시 데이터로 보고 있어요.</strong> 아래 수치는 가상의 시청기록으로 계산한 것이며 내 시청기록이 아니에요. 예시 결과는 저장되지 않아요. <a href="#upload">내 파일 올리기</a></div>`;
}

// ---------- 채널 DB ----------
async function loadDb() {
  try {
    const res = await fetch('data/channel-types.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.db = await res.json();
    state.index = buildChannelIndex(state.db);
    if (state.index.problems.length) console.warn('채널 DB 확인 필요:', state.index.problems);
  } catch (e) {
    // 파일을 더블클릭해 연 경우(file://)에는 fetch가 막히므로, 같은 내용의 data/channel-types.js를 사용한다.
    if (window.CHANNEL_DB) {
      state.db = window.CHANNEL_DB;
      state.index = buildChannelIndex(state.db);
      return;
    }
    state.dbError = '채널 유형 DB(data/channel-types.json)를 불러오지 못했어요. 파일을 직접 열었다면 로컬 서버나 GitHub Pages에서 실행해 주세요.';
    console.error(e);
  }
}

// ---------- 라우터 ----------
function currentRoute() {
  const h = location.hash.replace('#', '');
  return ROUTES.includes(h) ? h : 'home';
}

function render() {
  const route = currentRoute();
  charts.destroyAll();
  document.querySelectorAll('.nav a').forEach((a) => {
    const target = a.getAttribute('href').slice(1);
    const on = target === route || (target === 'result' && (route === 'detail' || route === 'analyzing'));
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  const view = { home: viewHome, predict: viewPredict, upload: viewUpload, analyzing: viewAnalyzing, result: viewResult, detail: viewDetail, history: viewHistory }[route];
  view();
  window.scrollTo(0, 0);
  const h = app.querySelector('h1');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
}

// ======================================================
// 1. 메인
// ======================================================
function viewHome() {
  const hist = storage.getHistory();
  app.innerHTML = `
  <section class="hero">
    <div class="stack" style="gap:16px">
      <p class="eyebrow">유튜브 시청 패턴 및 출처 편중도 진단</p>
      <h1>내가 보는 유튜브,<br><em>생각한 그대로</em>일까?</h1>
      <p class="lead">평소 많이 본다고 생각하는 유형을 먼저 고르고, 실제 시청기록과 비교해 보세요. 어떤 유형을 얼마나 봤는지, 시청이 몇몇 채널에 몰려 있는지 숫자로 보여드려요.</p>
      <div class="trust-row"><span class="pill">서버 전송 없음</span><span class="pill">로그인 없음</span><span class="pill">계산 근거 공개</span></div>
      <div class="btn-row">
        <a class="btn primary" href="#predict" id="startBtn">분석 시작하기</a>
        <button class="btn" id="sampleBtn" type="button">예시 데이터로 둘러보기</button>
        ${hist.length ? `<a class="btn" href="#history">이전 결과 ${hist.length}개</a>` : ''}
      </div>
    </div>
    <div class="label-card" aria-label="결과 예시 미리보기">
      <div class="example-tag">결과 예시 · 가상 데이터</div>
      <div class="label-title">내 시청 구성</div>
      <div class="label-meta"><span>총 시청기록 248건 기준</span><span>최근 6개월</span></div>
      <div class="label-head"><span>콘텐츠 유형</span><span>비중</span></div>
      ${[['entertain', 34.7, true], ['knowledge', 16.5], ['music', 15.7], ['vlog', 8.5], ['unclassified', 14.1]].map(([id, pct, top]) => `
        <div class="label-row ${top ? 'top' : ''}">${dot(TYPE_BY_ID[id].color)}<span class="name">${typeLabel(id)}</span><span></span><span class="pct num">${p1(pct)}%</span><span class="bar"><i style="width:${pct}%;background:${TYPE_BY_ID[id].color}"></i></span></div>`).join('')}
      <div class="label-foot">채널 집중도 HHI 612 · 상위 3개 채널 CR3 52.0%</div>
    </div>
  </section>

  <section class="card stack">
    <h2>3단계면 끝나요</h2>
    <ol class="steps">
      <li><b>내가 생각하는 나</b><span>평소 가장 많이 본다고 생각하는 유형을 골라요.</span></li>
      <li><b>시청기록 올리기</b><span>Google Takeout에서 받은 시청기록 파일을 올려요.</span></li>
      <li><b>실제 시청기록 속 나</b><span>유형별 비중, 채널 집중도, 예상과의 차이를 확인해요.</span></li>
    </ol>
  </section>

  <section class="grid-2">
    <div class="card stack">
      <h2>시청기록 파일 받는 방법</h2>
      <ol class="guide">
        <li><a href="https://takeout.google.com/" target="_blank" rel="noopener">takeout.google.com</a>에 접속해 <b>모두 선택 해제</b>를 누릅니다.</li>
        <li><b>YouTube 및 YouTube Music</b>만 선택합니다.</li>
        <li><b>모든 YouTube 데이터 포함됨</b>을 눌러 <b>기록</b>만 남깁니다.</li>
        <li><b>여러 형식</b>에서 기록 형식을 <b>JSON</b>으로 바꿉니다. (HTML도 읽을 수 있어요)</li>
        <li>내보내기가 끝나면 받은 <b>zip 파일을 그대로</b> 올리면 돼요. 압축을 풀었다면 <b>시청 기록</b> 폴더의 <code>watch-history.json</code>을 올려도 돼요.</li>
      </ol>
    </div>
    <div class="card stack">
      <h2>이 서비스가 하지 않는 것</h2>
      <p class="small">시청 습관을 좋고 나쁨으로 평가하지 않아요. 정치적 성향, 콘텐츠의 신뢰도나 정확성, 알고리즘 편향도 판정하지 않아요. 어떤 유형을 얼마나 봤는지, 시청이 몇몇 채널에 얼마나 몰려 있는지를 건수로 보여줄 뿐이에요.</p>
      <p class="small muted">시청 시간은 Takeout 파일에 없어서 쓰지 않아요. 모든 비중은 시청기록 <b>건수</b> 기준이에요.</p>
    </div>
  </section>`;
  document.getElementById('sampleBtn').addEventListener('click', startSample);
}

function startSample() {
  const parsed = makeSampleRecords();
  const prep = prepareRecords(parsed.records);
  state.upload = { fileName: '예시 데이터', isSample: true, parsed, prepared: prep, range: dataRange(prep.records) };
  state.periodId = DEFAULT_PERIOD;
  state.result = null; state.savedId = null;
  go('analyzing');
}

// ======================================================
// 2. 시청 유형 예상
// ======================================================
function viewPredict() {
  const pred = state.prediction || { primary: null, secondary: [] };
  const choices = (name, kind) => CONTENT_TYPES.map((t) => `
    <div class="choice">
      <input type="${kind}" name="${name}" id="${name}-${t.id}" value="${t.id}">
      <label for="${name}-${t.id}">${dot(t.color)}${t.label}<span class="mark" aria-hidden="true"></span></label>
    </div>`).join('');
  app.innerHTML = `
  <header class="stack">
    <p class="eyebrow">1단계 · 내가 생각하는 나</p>
    <h1 class="page-title">평소 어떤 영상을 많이 본다고 생각하나요?</h1>
    <p class="lead">정답은 없어요. 지금 떠오르는 대로 골라 주세요. 이 선택은 나의 <b>자기 인식</b>이고, 측정값이 아니에요. 실제 시청기록과 나란히 놓고 비교할 때만 쓰여요.</p>
  </header>
  <form id="predForm" class="stack" style="gap:20px" novalidate>
    <div class="card stack">
      <h2>가장 많이 본다고 생각하는 유형 <span class="pill accent">1개 선택</span></h2>
      <div class="choice-grid" role="radiogroup" aria-label="가장 많이 보는 유형">${choices('primary', 'radio')}</div>
    </div>
    <div class="card stack">
      <h2>그다음으로 자주 본다고 생각하는 유형 <span class="pill">최대 2개 · 선택 사항</span></h2>
      <div class="choice-grid" aria-label="자주 보는 유형">${choices('secondary', 'checkbox')}</div>
      <p class="small muted" id="secHint">가장 많이 본다고 고른 유형은 여기서 선택할 수 없어요.</p>
    </div>
    <p id="predError" class="notice warn" hidden></p>
    <div class="btn-row">
      <button class="btn primary" type="submit" id="predSave">저장하고 시청기록 올리기</button>
      <a class="btn" href="#upload" id="predSkip">예상 없이 건너뛰기</a>
      ${state.prediction ? '<button class="btn danger" type="button" id="predClear">저장된 예상 지우기</button>' : ''}
    </div>
    <p class="small muted">건너뛰면 결과 화면에서 ‘내가 생각하는 나’ 비교는 보이지 않아요. 선택은 이 브라우저에만 저장돼요.</p>
  </form>`;

  const form = document.getElementById('predForm');
  const prim = [...form.querySelectorAll('input[name=primary]')];
  const sec = [...form.querySelectorAll('input[name=secondary]')];
  prim.forEach((i) => { i.checked = i.value === pred.primary; });
  sec.forEach((i) => { i.checked = (pred.secondary || []).includes(i.value); });
  const sync = () => {
    const p = (prim.find((i) => i.checked) || {}).value;
    sec.forEach((i) => { if (i.value === p) i.checked = false; });
    const count = sec.filter((i) => i.checked).length;
    sec.forEach((i) => { i.disabled = i.value === p || (!i.checked && count >= 2); });
    prim.forEach((i) => { i.nextElementSibling.querySelector('.mark').textContent = i.checked ? '가장 많이' : ''; });
    sec.forEach((i) => { i.nextElementSibling.querySelector('.mark').textContent = i.checked ? '자주' : ''; });
    document.getElementById('predError').hidden = true;
  };
  form.addEventListener('change', sync);
  sync();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const p = (prim.find((i) => i.checked) || {}).value;
    if (!p) {
      const err = document.getElementById('predError');
      err.textContent = '가장 많이 본다고 생각하는 유형을 1개 골라 주세요. 고르지 않으려면 ‘예상 없이 건너뛰기’를 눌러 주세요.';
      err.hidden = false; return;
    }
    state.prediction = { primary: p, secondary: sec.filter((i) => i.checked).map((i) => i.value) };
    if (!storage.setPrediction(state.prediction)) toast('이 브라우저에서는 저장할 수 없어 이번 방문 동안만 기억해요.');
    if (state.result && !state.upload.isSample) state.result.comparison = comparePrediction(state.prediction, state.result.types);
    go('upload');
  });
  const clr = document.getElementById('predClear');
  if (clr) clr.addEventListener('click', () => { storage.clearPrediction(); state.prediction = null; toast('저장된 예상을 지웠어요.'); render(); });
}

// ======================================================
// 3. 업로드
// ======================================================
function periodControls(idPrefix) {
  return `
  <div class="fields">
    <div class="field">
      <label for="${idPrefix}-period">분석 기간</label>
      <select id="${idPrefix}-period">${PERIOD_OPTIONS.map((o) => `<option value="${o.id}" ${o.id === state.periodId ? 'selected' : ''}>${o.label}</option>`).join('')}</select>
    </div>
    <div class="field" data-custom ${state.periodId === 'custom' ? '' : 'hidden'}>
      <label for="${idPrefix}-start">시작일</label>
      <input type="date" id="${idPrefix}-start" value="${state.custom.start}">
    </div>
    <div class="field" data-custom ${state.periodId === 'custom' ? '' : 'hidden'}>
      <label for="${idPrefix}-end">종료일</label>
      <input type="date" id="${idPrefix}-end" value="${state.custom.end}">
    </div>
  </div>`;
}

function bindPeriod(idPrefix, onChange) {
  const sel = document.getElementById(`${idPrefix}-period`);
  const s = document.getElementById(`${idPrefix}-start`);
  const e = document.getElementById(`${idPrefix}-end`);
  sel.addEventListener('change', () => {
    state.periodId = sel.value;
    if (sel.value === 'custom' && state.upload && !state.custom.start) {
      state.custom = { start: isoDate(state.upload.range.min), end: isoDate(state.upload.range.max) };
      s.value = state.custom.start; e.value = state.custom.end;
    }
    document.querySelectorAll('[data-custom]').forEach((el) => { el.hidden = sel.value !== 'custom'; });
    onChange();
  });
  [s, e].forEach((inp) => inp.addEventListener('change', () => { state.custom = { start: s.value, end: e.value }; onChange(); }));
}

function currentPeriod() {
  if (!state.upload) return null;
  return resolvePeriod(state.periodId, state.upload.range, state.custom);
}

function viewUpload() {
  const pred = state.prediction;
  app.innerHTML = `
  <header class="stack">
    <p class="eyebrow">2단계 · 시청기록 올리기</p>
    <h1 class="page-title">YouTube 시청기록 파일을 올려 주세요</h1>
    <p class="lead">Google Takeout에서 받은 <b>zip 파일을 그대로</b> 올리거나, 압축을 푼 <code>watch-history.json</code>·<code>watch-history.html</code>을 올리세요. 이 브라우저 안에서 바로 읽고, 파일은 어디에도 전송되거나 저장되지 않아요.</p>
  </header>
  ${state.dbError ? `<p class="notice warn">${esc(state.dbError)}</p>` : ''}
  <div class="notice small">${pred ? `예상 저장됨: 가장 많이 <b>${typeLabel(pred.primary)}</b>${pred.secondary.length ? `, 자주 ${pred.secondary.map(typeLabel).join(', ')}` : ''} · <a href="#predict">바꾸기</a>` : '아직 예상을 고르지 않았어요. 결과에서 비교하려면 <a href="#predict">먼저 예상을 골라 주세요</a>.'}</div>
  <label class="drop" id="drop" for="fileInput">
    <span class="drop-icon" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="m6 10 6-6 6 6"/><path d="M4 20h16"/></svg></span>
    <span class="big">파일을 여기로 끌어다 놓거나 눌러서 선택하세요</span>
    <span class="small muted">Takeout zip 그대로 · JSON · HTML 모두 가능</span>
    <input type="file" id="fileInput" accept=".zip,.json,.html,.htm,application/zip,application/x-zip-compressed,application/json,text/html" hidden>
    <span class="btn small" aria-hidden="true">파일 선택</span>
  </label>
  <div id="uploadStatus"></div>`;

  const drop = document.getElementById('drop');
  const input = document.getElementById('fileInput');
  input.addEventListener('change', () => { if (input.files[0]) handleFile(input.files[0]); });
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('drag'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('drag'); }));
  drop.addEventListener('drop', (e) => { const f = e.dataTransfer.files && e.dataTransfer.files[0]; if (f) handleFile(f); });
  renderUploadStatus();
}

async function handleFile(file) {
  state.uploadError = null;
  state.result = null; state.savedId = null;
  const box = document.getElementById('uploadStatus');
  box.innerHTML = '<div class="card"><p>파일을 읽는 중이에요…</p></div>';
  const name = file.name || '';
  try {
    if (!/\.(zip|json|html?)$/i.test(name)) throw new ParseError('지원하지 않는 파일 형식이에요.', 'Takeout zip 파일이나 watch-history.json·watch-history.html 파일을 올려 주세요.');
    if (file.size === 0) throw new ParseError('빈 파일이에요.', 'Takeout에서 다시 내보낸 파일을 올려 주세요.');
    let parsed; let innerName = null;
    if (/\.zip$/i.test(name)) {
      box.innerHTML = '<div class="card"><p>zip 안에서 시청기록 파일을 찾는 중이에요…</p></div>';
      const z = await parseTakeoutZip(file);
      parsed = z.parsed; innerName = z.innerName;
    } else {
      const text = await file.text();
      await frame();
      parsed = detectAndParse(text, name);
    }
    const prep = prepareRecords(parsed.records);
    if (!prep.records.length) throw new ParseError('광고와 중복을 빼고 나니 분석할 기록이 남지 않았어요.', '다른 기간의 시청기록 파일인지 확인해 주세요.');
    state.upload = { fileName: name, innerName, isSample: false, parsed, prepared: prep, range: dataRange(prep.records) };
    state.custom = { start: '', end: '' };
    if (state.periodId === 'custom') state.periodId = DEFAULT_PERIOD;
  } catch (e) {
    state.upload = null;
    state.uploadError = e instanceof ParseError ? { message: e.message, hint: e.hint } : { message: '파일을 처리하는 중에 문제가 생겼어요.', hint: String(e.message || e) };
    if (!(e instanceof ParseError)) console.error(e);
  }
  renderUploadStatus();
}

function renderUploadStatus() {
  const box = document.getElementById('uploadStatus');
  if (!box) return;
  if (state.uploadError) {
    box.innerHTML = `<div class="notice warn" role="alert"><strong>${esc(state.uploadError.message)}</strong><br>${esc(state.uploadError.hint)}</div>`;
    return;
  }
  const u = state.upload;
  if (!u || u.isSample) { box.innerHTML = ''; return; }
  const { parsed, prepared, range } = u;
  const noChannel = prepared.records.filter((r) => !r.channel).length;
  const info = parsed.info;
  box.innerHTML = `
  <section class="card stack" aria-live="polite">
    <h2>파일 확인 결과 <span class="pill accent">${parsed.format.toUpperCase()}</span></h2>
    <p class="small muted">${esc(u.fileName)}${u.innerName ? ` → zip 안의 <code>${esc(u.innerName)}</code>를 찾아 읽었어요` : ''}</p>
    <ul class="checklist">
      <li><span class="ok"></span><span>파일 형식을 읽었어요 (${parsed.format === 'json' ? 'JSON' : 'HTML'})</span><span class="num">${n0(info.rawCount)}개 항목</span></li>
      <li><span class="ok"></span><span>필수 정보(시청 시각)를 읽은 시청기록</span><span class="num">${n0(parsed.records.length)}건</span></li>
      <li><span class="info"></span><span>광고로 표시된 기록 · 분석에서 제외</span><span class="num">${n0(prepared.ads)}건</span></li>
      <li><span class="${prepared.duplicates ? 'bad' : 'info'}"></span><span>같은 시각·같은 영상의 중복 기록 · 제외</span><span class="num">${n0(prepared.duplicates)}건</span></li>
      ${info.skippedNonWatch ? `<li><span class="info"></span><span>검색 등 시청이 아닌 항목 · 제외</span><span class="num">${n0(info.skippedNonWatch)}건</span></li>` : ''}
      ${info.missingTime ? `<li><span class="bad"></span><span>날짜를 읽지 못한 항목 · 제외</span><span class="num">${n0(info.missingTime)}건</span></li>` : ''}
      ${info.unknownTz ? `<li><span class="bad"></span><span>시간대를 알 수 없어 UTC로 처리한 항목</span><span class="num">${n0(info.unknownTz)}건</span></li>` : ''}
      <li><span class="info"></span><span>채널 정보가 없는 기록(삭제·비공개 영상 등) · 유형은 ‘미분류’, 집중도 계산에서는 제외</span><span class="num">${n0(noChannel)}건</span></li>
      <li><span class="ok"></span><span>분석 가능한 기록 · ${ymd(range.min)} ~ ${ymd(range.max)}</span><span class="num"><b>${n0(prepared.records.length)}건</b></span></li>
    </ul>
  </section>
  <section class="card stack">
    <h2>분석 기간</h2>
    <p class="small muted">‘최근 N개월’은 파일 안의 가장 최근 시청 날짜(${ymd(range.max)})를 기준으로 계산해요.</p>
    ${periodControls('up')}
    <p id="periodCount" class="small"></p>
    <div class="btn-row"><button class="btn primary" id="analyzeBtn" type="button">분석 시작</button></div>
  </section>`;
  const update = () => {
    const p = currentPeriod();
    const el = document.getElementById('periodCount');
    const btn = document.getElementById('analyzeBtn');
    if (!p) { el.innerHTML = '<span class="notice warn" style="display:block">시작일이 종료일보다 늦어요. 날짜를 다시 골라 주세요.</span>'; btn.disabled = true; return; }
    const cnt = filterByPeriod(u.prepared.records, p).length;
    el.innerHTML = cnt
      ? `선택한 기간(${ymd(p.start)} ~ ${ymd(p.end)})의 시청기록 <b class="num">${n0(cnt)}건</b>을 분석해요.`
      : `<span class="notice warn" style="display:block">선택한 기간(${ymd(p.start)} ~ ${ymd(p.end)})에는 시청기록이 없어요. 기간을 넓혀 주세요.</span>`;
    btn.disabled = !cnt || !!state.dbError;
  };
  bindPeriod('up', update);
  update();
  document.getElementById('analyzeBtn').addEventListener('click', () => { state.result = null; state.savedId = null; go('analyzing'); });
}

// ======================================================
// 4. 분석 진행
// ======================================================
async function viewAnalyzing() {
  if (!state.upload) { go('upload'); return; }
  if (state.dbError) { go('upload'); return; }
  const steps = [
    ['period', '분석 기간 적용'],
    ['db', '채널 유형 DB 불러오기'],
    ['classify', '채널별 콘텐츠 유형 분류'],
    ['concentration', '채널 집중도(HHI·CR3) 계산'],
    ['compare', '내 예상과 비교'],
  ];
  app.innerHTML = `
  ${sampleBanner()}
  <header class="stack">
    <p class="eyebrow">3단계 · 분석 중</p>
    <h1 class="page-title">시청기록을 분석하고 있어요</h1>
    <p class="lead">모든 계산은 이 브라우저 안에서 이루어져요.</p>
  </header>
  <section class="card"><ol class="progress-list">${steps.map(([id, l]) => `<li id="st-${id}"><span class="st" aria-hidden="true"></span><span>${l}</span><span class="small muted num" data-v></span></li>`).join('')}</ol></section>
  <div class="btn-row" id="doneRow" hidden><a class="btn primary" href="#result" id="toResult">결과 보기</a></div>`;
  const set = (id, cls, v) => { const li = document.getElementById(`st-${id}`); if (!li) return; li.className = cls; if (v != null) li.querySelector('[data-v]').textContent = v; };

  const period = currentPeriod();
  set('period', 'run'); await frame();
  if (!period) { set('period', 'fail', '기간 오류'); return; }
  const inPeriod = filterByPeriod(state.upload.prepared.records, period);
  set('period', inPeriod.length ? 'done' : 'fail', `${period.label} · ${n0(inPeriod.length)}건`);
  if (!inPeriod.length) { app.insertAdjacentHTML('beforeend', '<p class="notice warn">선택한 기간에 시청기록이 없어요. <a href="#upload">기간을 바꿔 주세요.</a></p>'); return; }

  set('db', 'run'); await frame();
  set('db', 'done', `등록 채널 ${n0(state.index.size)}개`);

  set('classify', 'run'); await frame();
  const result = analyze(state.upload.prepared.records, period, state.index, activePrediction());
  set('classify', 'done', `분류 ${n0(result.types.classifiedCount)}건 · 미분류 ${n0(result.types.unclassifiedCount)}건`);

  set('concentration', 'run'); await frame();
  set('concentration', 'done', `채널 ${n0(result.concentration.channelCount)}개 · HHI ${n0(Math.round(result.concentration.hhi))}`);

  set('compare', 'run'); await frame();
  const cmp = result.comparison;
  set('compare', 'done', cmp.status === 'no-prediction' ? '예상 없음' : cmp.status === 'no-actual' ? '분류된 기록 없음' : cmp.status === 'match' ? '일치' : '다름');

  state.result = result;
  state.savedId = null;
  const row = document.getElementById('doneRow');
  if (row) { row.hidden = false; document.getElementById('toResult').focus(); }
}

// ======================================================
// 5. 결과 대시보드
// ======================================================
function emptyResult() {
  app.innerHTML = `
  <section class="card empty">
    <h1 class="page-title" style="font-size:28px">아직 분석한 결과가 없어요</h1>
    <p class="muted">시청기록 파일을 올리면 이곳에 결과가 표시돼요. 새로고침하면 결과는 사라지고, 저장한 결과는 ‘이전 결과’에서 볼 수 있어요.</p>
    <div class="btn-row" style="justify-content:center">
      <a class="btn primary" href="#upload">시청기록 올리기</a>
      <a class="btn" href="#history">이전 결과 보기</a>
    </div>
  </section>`;
}

function comparisonCard(cmp, pred) {
  const mine = pred && pred.primary
    ? `<div class="t">${typeLabel(pred.primary)}</div>${pred.secondary && pred.secondary.length ? `<div class="small">자주 본다고 생각한 유형: ${pred.secondary.map(typeLabel).join(', ')}</div>` : ''}<div class="small muted">분석 전에 내가 고른 자기 인식이에요.</div>`
    : `<div class="small">아직 예상을 고르지 않았어요.</div><a class="btn small" href="#predict">예상 고르기</a>`;
  const r = state.result.types.representative;
  const real = r
    ? `<div class="t">${r.label}</div><div class="small">전체 시청기록의 <b class="num">${p1(r.pct)}%</b> (${n0(r.count)}건)</div><div class="small muted">업로드한 시청기록에서 계산한 값이에요.</div>`
    : '<div class="small">분류된 기록이 없어 대표 유형을 정할 수 없어요.</div>';
  let msg = '';
  if (cmp.status === 'match' || cmp.status === 'mismatch') {
    msg = `<p class="vs-msg">${esc(cmp.message)}</p>`;
    const rows = [
      `<li>내가 가장 많이 본다고 생각한 <b>${cmp.primary.label}</b>은 실제로 <b class="num">${p1(cmp.primary.pct)}%</b> (${n0(cmp.primary.count)}건)${cmp.primary.count ? `, 8개 유형 중 ${cmp.primary.rank}위` : ''}였어요.</li>`,
      ...cmp.secondary.map((s) => `<li>자주 본다고 생각한 <b>${s.label}</b>은 <b class="num">${p1(s.pct)}%</b>${s.count ? ` · ${s.rank}위${s.inTop3 ? ' (상위 3위 안)' : ''}` : ''}였어요.</li>`),
    ];
    if (cmp.tie) rows.push('<li>가장 높은 비중을 차지한 유형이 여러 개라 공동 1위로 판단했어요.</li>');
    msg += `<ul class="small" style="margin:0;padding-left:18px;display:grid;gap:2px">${rows.join('')}</ul>`;
  } else if (cmp.status === 'no-actual') {
    msg = '<p class="small muted">실제 대표 유형이 없어 비교 문구를 보여드리지 않아요.</p>';
  } else {
    msg = '<p class="small muted">예상을 고르면 실제 결과와 나란히 비교해 드려요.</p>';
  }
  return `
  <section class="card stack">
    <h2>내가 생각하는 나 vs 실제 시청기록 속 나</h2>
    <div class="vs">
      <div class="vs-side mine"><span class="tag">A · 내가 생각하는 나 (예상)</span>${mine}</div>
      <div class="vs-side real"><span class="tag">B · 실제 시청기록 속 나 (측정)</span>${real}</div>
    </div>
    <div class="stack" style="gap:8px"><span class="small muted" style="font-weight:700">C · 예상과 실제의 차이</span>${msg}</div>
    ${cmp.status === 'mismatch' ? '<p class="small muted">예상과 다른 건 흔한 일이에요. 자기 인식이 틀렸다는 뜻이 아니라, 기억에 남는 시청과 실제로 쌓인 기록이 다를 수 있다는 뜻이에요.</p>' : ''}
  </section>`;
}

function viewResult() {
  const r = state.result;
  if (!r) { emptyResult(); return; }
  if (r.empty) {
    app.innerHTML = `<section class="card empty"><h1 class="page-title" style="font-size:26px">이 기간에는 시청기록이 없어요</h1><p class="muted">기간을 넓혀 다시 분석해 주세요.</p><a class="btn primary" href="#upload">기간 바꾸기</a></section>`;
    return;
  }
  const t = r.types; const c = r.concentration; const rep = t.representative;
  const pred = activePrediction();
  const sorted = [...t.rows].sort((a, b) => (a.id === UNCLASSIFIED.id) - (b.id === UNCLASSIFIED.id) || b.count - a.count);
  const hist = storage.getHistory().filter((e) => e.id !== state.savedId);
  const prevEntry = hist[0];
  const sumPct = t.rows.reduce((s, x) => s + x.pct, 0);

  app.innerHTML = `
  ${sampleBanner()}
  <header class="stack">
    <p class="eyebrow">분석 결과 · ${esc(state.upload.isSample ? '예시 데이터' : state.upload.fileName)}</p>
    <h1 class="page-title">실제 시청기록 속 나</h1>
    <p class="lead">${ymd(r.period.start)} ~ ${ymd(r.period.end)} 동안의 시청기록 <b class="num">${n0(r.total)}건</b>을 채널 기준으로 분류했어요.</p>
  </header>

  ${t.lowClassification ? `<p class="notice warn">시청기록의 <b>${p1(t.unclassifiedPct)}%</b>가 아직 채널 DB에 없는 채널이라 ‘유형 미분류’로 남았어요. 대표 유형은 분류된 기록만으로 정했기 때문에 실제와 차이가 클 수 있어요. 미분류 채널 목록은 <a href="#detail">상세 분석</a>에서 볼 수 있어요.</p>` : ''}

  <section class="grid-2">
    ${rep ? `<div class="persona-card" style="--tc:${TYPE_BY_ID[rep.id].color}">
        <span class="kicker">나의 대표 시청 유형</span>
        <span class="persona">${rep.persona}</span>
        <div class="share"><b>${p1(rep.pct)}%</b><span>${rep.label} 콘텐츠 · ${n0(rep.count)}건으로 가장 많아요</span></div>
        ${t.tiedTopIds.length > 1 ? `<p class="small">같은 건수로 공동 1위: ${t.tiedTopIds.map(typeLabel).join(', ')}</p>` : ''}
        <p class="fine">대표 유형 이름은 재미를 위한 표현이에요. 성격이나 정체성을 판정하지 않아요.</p>
      </div>`
      : '<div class="card stack"><h2>대표 시청 유형</h2><p>분류된 기록이 없어 대표 유형을 정할 수 없어요. 채널 DB에 채널을 추가하면 분류할 수 있어요.</p></div>'}
    <div class="label-card" aria-label="콘텐츠 유형별 비중">
      ${state.upload.isSample ? '<div class="example-tag">예시 데이터</div>' : ''}
      <div class="label-title">내 시청 구성</div>
      <div class="label-meta"><span>총 시청기록 <b class="num">${n0(r.total)}</b>건 기준</span><span>${esc(r.period.label)}</span></div>
      <div class="label-head"><span>콘텐츠 유형</span><span>건수 · 비중</span></div>
      ${sorted.map((x) => `<div class="label-row ${rep && t.tiedTopIds.includes(x.id) ? 'top' : ''}">${dot(x.color)}<span class="name">${x.label}</span><span class="cnt num">${n0(x.count)}건</span><span class="pct num">${p1(x.pct)}%</span><span class="bar"><i style="width:${x.pct}%;background:${x.color}"></i></span></div>`).join('')}
      <div class="label-foot">비중 = 유형별 건수 ÷ 전체 ${n0(r.total)}건 × 100 · 합계 ${p1(sumPct)}% (표시값은 반올림)</div>
    </div>
  </section>

  ${comparisonCard(r.comparison, pred)}

  <section class="card stack">
    <h2>콘텐츠 유형별 비중</h2>
    <p class="sub">그래프 위에 마우스를 올리거나 눌러 정확한 건수와 비중을 확인하세요.</p>
    <div class="chart-box"><canvas id="typeChart" aria-label="콘텐츠 유형별 비중 도넛 차트" role="img"></canvas></div>
  </section>

  <section class="grid-3">
    <div class="card stack">
      <h2>채널 집중도 HHI ${HHI_LEVELS.provisional ? '<span class="pill warn" title="' + esc(HHI_LEVELS.note) + '">임시 기준</span>' : ''}</h2>
      <div class="big-num">${n0(Math.round(c.hhi))}<small> / 10,000</small></div>
      ${c.level ? `<span class="pill accent" style="justify-self:start">${c.level.label}</span>` : ''}
      <p class="small muted">채널별 시청 비중(%)을 제곱해 모두 더한 값이에요. 한 채널만 보면 10,000, 여러 채널에 고르게 나뉠수록 0에 가까워요.</p>
    </div>
    <div class="card stack">
      <h2>상위 3개 채널 비중 CR3</h2>
      <div class="big-num">${p1(c.cr3)}<small>%</small></div>
      <div class="small">${c.cr3Channels.map((x) => `${esc(x.name)} <span class="num muted">${p1(x.pct)}%</span>`).join(' + ')}</div>
      ${c.cr3Note ? `<p class="small muted">${esc(c.cr3Note)}</p>` : ''}
    </div>
    <div class="card stack">
      <h2>유형 미분류 비중</h2>
      <div class="big-num">${p1(t.unclassifiedPct)}<small>%</small></div>
      <p class="small muted">채널 DB에 없는 채널 ${n0(r.unclassifiedChannels.length)}개와 채널 정보가 없는 기록 ${n0(c.noChannel)}건이에요. 전체 비중 계산에는 포함돼요.</p>
    </div>
  </section>
  <p class="notice small">HHI와 CR3는 <b>채널별 시청기록이 얼마나 몰려 있는지</b>만 나타내요. 정보의 다양성, 정치적 편향, 콘텐츠의 신뢰도를 직접 측정하지 않아요. 채널 정보가 없는 ${n0(c.noChannel)}건은 두 지표 계산에서 빠졌어요. ${HHI_LEVELS.provisional ? '단계 이름(분산·집중 등)은 ' + esc(HHI_LEVELS.note) : ''}</p>

  <section class="grid-2">
    <div class="card stack">
      <h2>가장 많이 본 채널 5개</h2>
      <div class="chart-box"><canvas id="topChart" aria-label="상위 5개 채널 막대 차트" role="img"></canvas></div>
      <div class="table-wrap"><table><thead><tr><th>채널</th><th>유형</th><th class="r">건수</th><th class="r">비중</th></tr></thead><tbody>
        ${r.top5.map((x) => `<tr><td>${esc(x.name)}</td><td>${typeLabel(x.type)}</td><td class="r">${n0(x.count)}</td><td class="r">${p1(x.pct)}%</td></tr>`).join('')}
      </tbody></table></div>
      <p class="small muted">채널 비중은 채널 정보가 있는 ${n0(c.withChannel)}건 기준이에요.</p>
    </div>
    <div class="card stack">
      <h2>분석 기간과 기록</h2>
      <dl class="kv">
        <dt>분석 기간</dt><dd>${esc(r.period.label)} · ${ymd(r.period.start)} ~ ${ymd(r.period.end)}</dd>
        <dt>실제 기록 범위</dt><dd>${ymd(r.actualRange.min)} ~ ${ymd(r.actualRange.max)}</dd>
        <dt>총 시청기록</dt><dd class="num">${n0(r.total)}건</dd>
        <dt>채널 수</dt><dd class="num">${n0(c.channelCount)}개</dd>
        <dt>제외한 기록</dt><dd>광고 ${n0(state.upload.prepared.ads)}건 · 중복 ${n0(state.upload.prepared.duplicates)}건 (파일 전체 기준)</dd>
      </dl>
      ${periodControls('res')}
      <div class="btn-row"><button class="btn small" id="reanalyze" type="button">이 기간으로 다시 분석</button></div>
    </div>
  </section>

  <section class="card stack">
    <h2>새로운 콘텐츠 유형 탐색</h2>
    ${r.suggestion ? `<p>${esc(r.suggestion.message)}</p>
      <ul class="explore-list">${r.suggestion.types.map((x) => {
        const url = youtubeSearchUrl(x.id);
        return `<li class="explore-item">
          <div class="explore-info">
            <span class="explore-name">${dot(x.color)} ${x.label}</span>
            <span class="explore-meta">내 시청 비중 <b class="num">${p1(x.pct)}%</b> · 검색어 “${esc(exploreQuery(x.id))}”</span>
          </div>
          ${url ? `<a class="btn explore-btn" href="${esc(url)}" target="_blank" rel="noopener noreferrer" data-explore="${x.id}" aria-label="유튜브에서 ${x.label} 탐색하기 (새 탭에서 열림)">유튜브에서 탐색하기<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg></a>` : ''}
        </li>`;
      }).join('')}</ul>
      <p class="small muted">버튼을 누르면 새 탭에서 유튜브 검색 결과가 열려요. 검색 결과는 유튜브가 보여주는 것으로, 이 서비스가 특정 채널이나 영상을 골라 추천하지는 않아요. 적게 본 유형이 더 좋다는 뜻도 아니에요.</p>`
      : '<p class="muted">분류된 기록이 부족해 제안할 유형이 없어요.</p>'}
  </section>

  <section class="card stack">
    <h2>이 결과를 읽는 방법</h2>
    <ul class="small" style="margin:0;padding-left:18px;display:grid;gap:4px">
      <li>모든 비중은 <b>시청기록 건수</b> 기준이에요. Takeout 파일에는 시청 시간이 없어서, 1분짜리 영상과 1시간짜리 영상을 같은 1건으로 세요.</li>
      <li>콘텐츠 유형은 영상 제목이 아니라 <b>채널</b>로 정해요. 채널 DB에 등록된 채널만 분류되고, 나머지는 ‘유형 미분류’로 남아요.</li>
      <li>같은 영상을 다시 보면 각각 1건으로 세요. 같은 시각에 같은 영상이 두 번 기록된 경우만 중복으로 보고 뺐어요.</li>
      <li>이 결과는 좋고 나쁨의 평가가 아니라, 시청 패턴을 스스로 돌아보기 위한 거울이에요.</li>
    </ul>
  </section>

  ${prevEntry && !state.upload.isSample ? quickCompare(prevEntry) : ''}

  <div class="btn-row">
    <button class="btn primary" id="saveBtn" type="button" ${state.upload.isSample || state.savedId ? 'disabled' : ''}>${state.savedId ? '이 브라우저에 저장됨' : '이 결과 저장하기'}</button>
    <a class="btn" href="#detail">상세 분석 · 계산 근거</a>
    <a class="btn" href="#history">이전 결과와 비교</a>
  </div>
  <p class="small muted">${state.upload.isSample ? '예시 데이터 결과는 저장할 수 없어요.' : '저장하면 유형별 비중, HHI, CR3, 분석 기간, 내 예상만 이 브라우저에 남아요. 영상 제목과 채널명은 저장하지 않아요.'}</p>`;

  charts.typeDonut(document.getElementById('typeChart'), sorted);
  charts.hBar(document.getElementById('topChart'), r.top5.map((x) => ({ name: x.name, count: x.count, pct: x.pct })), { colors: r.top5.map((x) => TYPE_BY_ID[x.type].color) });
  bindPeriod('res', () => {});
  document.getElementById('reanalyze').addEventListener('click', () => {
    const p = currentPeriod();
    if (!p) { toast('시작일이 종료일보다 늦어요.'); return; }
    state.result = null; go('analyzing');
  });
  const save = document.getElementById('saveBtn');
  save.addEventListener('click', () => {
    const entry = toHistoryEntry(r, activePrediction(), { fileName: state.upload.fileName });
    if (storage.addHistory(entry)) { state.savedId = entry.id; toast('이 브라우저에 결과를 저장했어요.'); render(); }
    else toast('저장하지 못했어요. 브라우저가 저장을 막고 있을 수 있어요.');
  });
}

function signed(n, digits = 1, suffix = '') {
  const v = Number(n);
  const s = v.toLocaleString('ko-KR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  if (Math.abs(v) < Math.pow(10, -digits) / 2) return `<span class="muted">변화 없음</span>`;
  return v > 0 ? `<span class="diff-up">+${s}${suffix}</span>` : `<span class="diff-down">${s}${suffix}</span>`;
}

function quickCompare(prev) {
  const curr = toHistoryEntry(state.result, activePrediction());
  const cmp = compareEntries(prev, curr);
  return `
  <section class="card stack">
    <h2>지난 저장 결과와 비교 <span class="pill">${ymd(prev.savedAt)} 저장</span></h2>
    <dl class="kv">
      <dt>대표 유형</dt><dd>${prev.representative ? typeLabel(prev.representative) : '없음'} → ${curr.representative ? typeLabel(curr.representative) : '없음'}${cmp.representativeChanged ? ' <span class="pill accent">바뀜</span>' : ''}</dd>
      <dt>HHI</dt><dd><span class="num">${n0(Math.round(prev.hhi))} → ${n0(Math.round(curr.hhi))}</span> (${signed(cmp.hhi.diff, 0)})</dd>
      <dt>CR3</dt><dd><span class="num">${p1(prev.cr3)}% → ${p1(curr.cr3)}%</span> (${signed(cmp.cr3.diff, 1, '%p')})</dd>
      ${cmp.biggest ? `<dt>가장 크게 변한 유형</dt><dd>${cmp.biggest.label} ${signed(cmp.biggest.diff, 1, '%p')}</dd>` : ''}
    </dl>
    <p class="small muted">분석 기간이 다르면 직접 비교하기 어려울 수 있어요. 지난 결과: ${esc(prev.period.label)} · ${ymd(prev.period.start)} ~ ${ymd(prev.period.end)}</p>
  </section>`;
}

// ======================================================
// 6. 상세 분석
// ======================================================
function viewDetail() {
  const r = state.result;
  if (!r || r.empty) { emptyResult(); return; }
  const t = r.types; const c = r.concentration;
  const terms = c.channels.slice(0, 5).map((x) => `${p1(x.pct)}²`);
  const restSum = c.channels.slice(5).reduce((s, x) => s + x.pct * x.pct, 0);
  const ms = t.matchStats;
  const csv = ['channel_name,watch_count,type', ...r.unclassifiedChannels.map((x) => `"${x.name.replace(/"/g, '""')}",${x.count},`)].join('\n');
  app.innerHTML = `
  ${sampleBanner()}
  <header class="stack">
    <p class="eyebrow">상세 분석</p>
    <h1 class="page-title">계산 근거와 전체 데이터</h1>
    <p class="lead">결과 화면의 모든 숫자가 어떻게 나왔는지 확인할 수 있어요.</p>
    <div class="btn-row"><a class="btn small" href="#result">← 결과로 돌아가기</a></div>
  </header>

  <section class="card stack">
    <h2>콘텐츠 유형별 계산</h2>
    <div class="table-wrap"><table><thead><tr><th>유형</th><th class="r">건수</th><th class="r">계산</th><th class="r">비중</th></tr></thead><tbody>
      ${t.rows.map((x) => `<tr><td>${dot(x.color)} ${x.label}</td><td class="r">${n0(x.count)}</td><td class="r">${n0(x.count)} ÷ ${n0(r.total)} × 100</td><td class="r">${p1(x.pct)}%</td></tr>`).join('')}
      <tr><td><b>합계</b></td><td class="r"><b>${n0(t.rows.reduce((s, x) => s + x.count, 0))}</b></td><td class="r"></td><td class="r"><b>${p1(t.rows.reduce((s, x) => s + x.pct, 0))}%</b></td></tr>
    </tbody></table></div>
    <p class="small muted">분류 방법: 채널 ID 일치 ${n0(ms.id)}건 · 채널명 일치 ${n0(ms.name)}건 · 자동 생성 음원 채널(“- Topic”) ${n0(ms.pattern)}건 · DB에 없는 채널 ${n0(ms.none)}건 · 채널 정보 없음 ${n0(ms['no-channel'])}건${r.musicHeaderCount ? ` · 이 중 YouTube Music 앱 기록 ${n0(r.musicHeaderCount)}건 포함` : ''}</p>
  </section>

  <section class="grid-2">
    <div class="card stack">
      <h2>HHI 계산</h2>
      <p class="small">채널 정보가 있는 ${n0(c.withChannel)}건에서 각 채널의 비중 sᵢ(%)를 구해 제곱한 뒤 모두 더해요.</p>
      <div class="formula">HHI = Σ sᵢ² = ${terms.join(' + ')}${c.channels.length > 5 ? ` + (나머지 ${n0(c.channels.length - 5)}개 채널 ${p1(restSum)})` : ''} = <b>${p1(c.hhi)}</b></div>
      <p class="small muted">범위 0 ~ 10,000. 현재 단계: ${c.level ? c.level.label : '-'} (${HHI_LEVELS.provisional ? '임시 기준 · js/config.js에서 조정' : '확정 기준'})</p>
      <div class="table-wrap"><table><thead><tr><th>단계</th><th class="r">HHI 상한</th></tr></thead><tbody>
        ${HHI_LEVELS.levels.map((l) => `<tr><td>${l.label}</td><td class="r">${l.max === Infinity ? '10,000' : n0(l.max)}</td></tr>`).join('')}
      </tbody></table></div>
    </div>
    <div class="card stack">
      <h2>CR3 계산</h2>
      <p class="small">시청기록이 가장 많은 3개 채널의 비중을 더해요.</p>
      <div class="formula">CR3 = ${c.cr3Channels.map((x) => p1(x.pct)).join(' + ')} = <b>${p1(c.cr3)}%</b></div>
      <ul class="small" style="margin:0;padding-left:18px">${c.cr3Channels.map((x) => `<li>${esc(x.name)}: ${n0(x.count)}건 ÷ ${n0(c.withChannel)}건</li>`).join('')}</ul>
    </div>
  </section>

  <section class="card stack">
    <h2>월별 시청기록 건수</h2>
    <div class="chart-box"><canvas id="monthChart" role="img" aria-label="월별 시청기록 막대 차트"></canvas></div>
    <p class="small muted">${r.monthly.map((m) => `${m.month}: ${n0(m.count)}건`).join(' · ')}</p>
  </section>

  <section class="card stack">
    <h2>전체 채널 목록 <span class="pill">${n0(c.channelCount)}개</span></h2>
    <div class="field" style="max-width:320px"><label for="chSearch">채널 이름으로 찾기</label><input id="chSearch" type="search" placeholder="예: 뉴스"></div>
    <div class="table-wrap"><table><thead><tr><th class="r">순위</th><th>채널</th><th>유형</th><th class="r">건수</th><th class="r">비중</th></tr></thead><tbody id="chBody"></tbody></table></div>
    <p class="small muted" id="chNote"></p>
  </section>

  <section class="card stack">
    <h2>유형 미분류 채널 <span class="pill">${n0(r.unclassifiedChannels.length)}개</span></h2>
    <p class="small">팀에서 채널 DB(<code>data/channel-types.json</code>)에 추가할 수 있도록 CSV로 정리했어요. <code>type</code> 열에 vlog, entertain, game, beauty, knowledge, music, sports, news 중 하나를 채워 넣으면 돼요.</p>
    <textarea class="copybox" id="csvBox" readonly aria-label="미분류 채널 CSV">${esc(csv)}</textarea>
    <div class="btn-row"><button class="btn small" id="copyCsv" type="button">CSV 복사</button></div>
  </section>`;

  charts.vBar(document.getElementById('monthChart'), r.monthly.map((m) => ({ name: m.month, count: m.count })));
  const body = document.getElementById('chBody');
  const note = document.getElementById('chNote');
  const draw = (q) => {
    const list = c.channels.map((x, i) => ({ ...x, rank: i + 1 })).filter((x) => !q || x.name.toLowerCase().includes(q.toLowerCase()));
    const shown = list.slice(0, 200);
    body.innerHTML = shown.map((x) => `<tr><td class="r">${x.rank}</td><td>${esc(x.name)}</td><td>${typeLabel(x.type)}</td><td class="r">${n0(x.count)}</td><td class="r">${p1(x.pct)}%</td></tr>`).join('') || '<tr><td colspan="5" class="muted">일치하는 채널이 없어요.</td></tr>';
    note.textContent = list.length > shown.length ? `${n0(list.length)}개 중 상위 200개만 표시했어요.` : '';
  };
  draw('');
  document.getElementById('chSearch').addEventListener('input', (e) => draw(e.target.value.trim()));
  document.getElementById('copyCsv').addEventListener('click', async () => {
    const box = document.getElementById('csvBox');
    try { await navigator.clipboard.writeText(box.value); toast('CSV를 복사했어요.'); }
    catch { box.focus(); box.select(); toast('자동 복사가 막혀 있어요. 선택된 내용을 직접 복사해 주세요.'); }
  });
}

// ======================================================
// 7. 이전 결과 및 비교
// ======================================================
function viewHistory() {
  const hist = storage.getHistory();
  const canStore = storage.available();
  const current = state.result && !state.result.empty && !state.upload.isSample && !state.savedId
    ? { ...toHistoryEntry(state.result, activePrediction(), { fileName: state.upload.fileName }), id: '__current__', current: true }
    : null;
  const entries = current ? [current, ...hist] : hist;

  const item = (e, i) => `
    <div class="history-item">
      <input type="checkbox" id="sel-${esc(e.id)}" value="${esc(e.id)}" ${i < 2 ? 'checked' : ''} aria-label="비교에 사용">
      <label for="sel-${esc(e.id)}" style="min-width:0">
        <div><b>${e.current ? '지금 결과 (저장 안 함)' : ymd(e.savedAt) + ' 저장'}</b> · ${e.representative ? typeLabel(e.representative) : '대표 유형 없음'}</div>
        <div class="meta">${esc(e.period.label)} ${ymd(e.period.start)} ~ ${ymd(e.period.end)} · ${n0(e.total)}건 · HHI ${n0(Math.round(e.hhi))} · CR3 ${p1(e.cr3)}%${e.prediction ? ` · 예상: ${typeLabel(e.prediction.primary)}` : ''}</div>
      </label>
      ${e.current ? '' : `<span class="btn-row"><button class="btn small danger" type="button" data-del="${esc(e.id)}">삭제</button></span>`}
    </div>`;

  app.innerHTML = `
  <header class="stack">
    <p class="eyebrow">이전 분석 결과</p>
    <h1 class="page-title">지난 결과와 비교하기</h1>
    <p class="lead">저장한 결과를 두 개 골라 유형별 비중과 집중도가 어떻게 달라졌는지 볼 수 있어요.</p>
  </header>
  ${!canStore ? '<p class="notice warn">이 브라우저는 저장소 사용을 막고 있어서 결과를 저장하거나 불러올 수 없어요.</p>' : ''}
  ${entries.length ? `
  <section class="stack" id="histList">${entries.map(item).join('')}</section>
  <p class="small muted" id="selNote">비교할 결과를 2개 골라 주세요.</p>
  <section id="cmpBox"></section>` : `
  <section class="card empty"><p>아직 저장한 결과가 없어요.</p><p class="small muted">결과 화면에서 ‘이 결과 저장하기’를 누르면 여기에 쌓여요.</p><a class="btn primary" href="#upload">시청기록 분석하기</a></section>`}

  <section class="card stack">
    <h2>저장되는 데이터와 위치</h2>
    <p class="small">이 서비스에는 로그인과 서버가 없어요. 아래 정보만 <b>지금 쓰고 있는 브라우저의 LocalStorage</b>에 저장돼요.</p>
    <ul class="small" style="margin:0;padding-left:18px;display:grid;gap:2px">
      <li><code>${STORAGE_KEYS.prediction}</code>: 내가 고른 예상 유형</li>
      <li><code>${STORAGE_KEYS.history}</code>: 저장한 결과(분석 날짜, 기간, 유형별 건수·비중, HHI, CR3, 대표 유형, 그때의 예상, 파일 이름) · 최대 20개</li>
    </ul>
    <p class="small">원본 시청기록 파일, 영상 제목, 채널명은 저장하지 않아요. 브라우저 데이터를 지우거나 다른 기기·브라우저를 쓰면 저장한 결과를 되살릴 수 없어요.</p>
    <div class="btn-row">
      <button class="btn danger" type="button" id="wipe">저장한 결과와 예상 모두 지우기</button>
    </div>
  </section>`;

  const selected = () => [...app.querySelectorAll('#histList input[type=checkbox]:checked')].map((i) => i.value);
  const drawCmp = () => {
    const ids = selected();
    const box = document.getElementById('cmpBox');
    const note = document.getElementById('selNote');
    if (!box) return;
    if (ids.length !== 2) { box.innerHTML = ''; note.textContent = ids.length > 2 ? '2개만 골라 주세요.' : '비교할 결과를 2개 골라 주세요.'; return; }
    note.textContent = '';
    const [a, b] = ids.map((id) => entries.find((e) => e.id === id)).sort((x, y) => x.savedAt - y.savedAt);
    const cmp = compareEntries(a, b);
    const la = a.current ? '지금' : ymd(a.savedAt); const lb = b.current ? '지금' : ymd(b.savedAt);
    box.innerHTML = `
    <div class="card stack">
      <h2>${la} → ${lb}</h2>
      <dl class="kv">
        <dt>대표 유형</dt><dd>${a.representative ? typeLabel(a.representative) : '없음'} → ${b.representative ? typeLabel(b.representative) : '없음'}${cmp.representativeChanged ? ' <span class="pill accent">바뀜</span>' : ''}</dd>
        <dt>HHI</dt><dd><span class="num">${n0(Math.round(a.hhi))} → ${n0(Math.round(b.hhi))}</span> (${signed(cmp.hhi.diff, 0)})</dd>
        <dt>CR3</dt><dd><span class="num">${p1(a.cr3)}% → ${p1(b.cr3)}%</span> (${signed(cmp.cr3.diff, 1, '%p')})</dd>
        <dt>분석 기간</dt><dd>${ymd(a.period.start)}~${ymd(a.period.end)} / ${ymd(b.period.start)}~${ymd(b.period.end)}</dd>
      </dl>
      <div class="chart-box tall"><canvas id="cmpChart" role="img" aria-label="유형별 비중 비교 막대 차트"></canvas></div>
      <div class="table-wrap"><table><thead><tr><th>유형</th><th class="r">${la}</th><th class="r">${lb}</th><th class="r">변화</th></tr></thead><tbody>
        ${cmp.types.map((x) => `<tr><td>${dot(x.color)} ${x.label}</td><td class="r">${p1(x.prev)}%</td><td class="r">${p1(x.curr)}%</td><td class="r">${signed(x.diff, 1, '%p')}</td></tr>`).join('')}
      </tbody></table></div>
      <p class="small muted">%p(퍼센트포인트)는 두 비중의 차이예요. 두 결과의 분석 기간이나 채널 DB가 다르면 차이의 일부는 그 때문일 수 있어요.</p>
    </div>`;
    charts.compareBars(document.getElementById('cmpChart'), cmp.types, [la, lb]);
  };
  app.querySelectorAll('#histList input[type=checkbox]').forEach((i) => i.addEventListener('change', drawCmp));
  drawCmp();

  // 삭제: 한 번 더 눌러 확인
  app.querySelectorAll('[data-del]').forEach((btn) => btn.addEventListener('click', () => {
    if (btn.dataset.armed) { storage.deleteHistory(btn.dataset.del); toast('저장한 결과를 지웠어요.'); render(); return; }
    btn.dataset.armed = '1'; btn.textContent = '정말 삭제';
    setTimeout(() => { if (btn.isConnected) { delete btn.dataset.armed; btn.textContent = '삭제'; } }, 4000);
  }));
  const wipe = document.getElementById('wipe');
  wipe.addEventListener('click', () => {
    if (wipe.dataset.armed) { storage.clearAll(); state.prediction = null; state.savedId = null; toast('저장한 결과와 예상을 모두 지웠어요.'); render(); return; }
    wipe.dataset.armed = '1'; wipe.textContent = '한 번 더 누르면 모두 지워져요';
    setTimeout(() => { if (wipe.isConnected) { delete wipe.dataset.armed; wipe.textContent = '저장한 결과와 예상 모두 지우기'; } }, 4000);
  });
}

// ---------- 시작 ----------
window.addEventListener('hashchange', render);
loadDb().then(render);
