import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseTakeoutJSON, parseTakeoutHTML, detectAndParse, parseHumanDate, cleanTitle, ParseError } from '../js/parser.js';
import {
  buildChannelIndex, classifyChannel, prepareRecords, dataRange, resolvePeriod, analyze,
  computeConcentration, comparePrediction, computeTypes, toHistoryEntry, compareEntries, normalizeName,
} from '../js/analyzer.js';

const db = JSON.parse(readFileSync(new URL('../data/channel-types.json', import.meta.url), 'utf8'));
const index = buildChannelIndex(db);

const rec = (time, title, channel, extra = {}) => ({
  header: 'YouTube', title: `Watched ${title}`, titleUrl: `https://www.youtube.com/watch?v=${title.replace(/\W/g, '')}xx`,
  subtitles: channel ? [{ name: channel, url: 'https://www.youtube.com/channel/UCabcdefghijklmnopqrstuv' }] : undefined,
  time, products: ['YouTube'], activityControls: ['YouTube watch history'], ...extra,
});

test('DB: 문제 없이 로드되고 유형 값이 모두 유효', () => {
  assert.equal(index.problems.length, 0);
  assert.ok(index.size > 30);
});

test('제목 접두·접미 제거 (영어·한국어)', () => {
  assert.equal(cleanTitle('Watched 고양이 영상'), '고양이 영상');
  assert.equal(cleanTitle('고양이 영상을(를) 시청했습니다.'), '고양이 영상');
});

test('JSON 파싱: 광고·중복·삭제 영상·검색 기록 처리', () => {
  const data = [
    rec('2026-05-01T10:00:00.000Z', 'A', 'YTN'),
    rec('2026-05-01T10:00:00.000Z', 'A', 'YTN'), // 중복
    rec('2026-05-02T10:00:00.000Z', 'Ad', 'Brand', { details: [{ name: 'From Google Ads' }] }),
    { header: 'YouTube', title: 'Watched a video that has been removed', time: '2026-05-03T10:00:00.000Z' },
    { header: 'YouTube', title: 'Searched for 고양이', titleUrl: 'https://www.youtube.com/results?search_query=x', time: '2026-05-03T11:00:00.000Z' },
    { header: 'YouTube', title: 'broken', time: 'not a date' },
  ];
  const parsed = parseTakeoutJSON(JSON.stringify(data));
  assert.equal(parsed.format, 'json');
  assert.equal(parsed.records.length, 4);
  assert.equal(parsed.info.skippedNonWatch, 1);
  assert.equal(parsed.info.missingTime, 1);
  const prep = prepareRecords(parsed.records);
  assert.equal(prep.ads, 1);
  assert.equal(prep.duplicates, 1);
  assert.equal(prep.records.length, 2);
  assert.equal(prep.records[1].channel, null);
});

test('JSON 오류: 형식 오류·빈 배열·객체', () => {
  assert.throws(() => parseTakeoutJSON('{oops'), ParseError);
  assert.throws(() => parseTakeoutJSON('[]'), /한 건도 없어요/);
  assert.throws(() => parseTakeoutJSON('{"a":1}'), /시청기록 목록을 찾을 수 없어요/);
  assert.throws(() => detectAndParse('hello', 'note.txt'), /지원하지 않는/);
});

test('날짜 파싱: 영어·한국어 HTML 표기', () => {
  const en = parseHumanDate('Jan 5, 2024, 3:12:45 PM KST');
  assert.equal(new Date(en.ms).toISOString(), '2024-01-05T06:12:45.000Z');
  const ko = parseHumanDate('2024. 1. 5. 오후 3:12:45 KST');
  assert.equal(new Date(ko.ms).toISOString(), '2024-01-05T06:12:45.000Z');
  const ko24 = parseHumanDate('2024. 12. 31. 오전 12:05:00 KST');
  assert.equal(new Date(ko24.ms).toISOString(), '2024-12-30T15:05:00.000Z');
  assert.equal(parseHumanDate('어제'), null);
});

test('HTML 파싱: 시청 항목, 광고 캡션, 채널 링크', () => {
  const html = readFileSync(new URL('./fixtures/watch-history.html', import.meta.url), 'utf8');
  const parsed = parseTakeoutHTML(html);
  assert.equal(parsed.format, 'html');
  assert.equal(parsed.records.length, 4);
  const [a, b, c, d] = parsed.records;
  assert.equal(a.title, 'Kurzgesagt 영상 & 설명');
  assert.equal(a.channel, 'Kurzgesagt – In a Nutshell');
  assert.equal(a.channelId, 'UCsXVk37bltHxD1rDPwtNM8Q');
  assert.equal(b.isAd, true);
  assert.equal(c.channel, '침착맨');
  assert.equal(d.channel, null);
  assert.equal(parsed.info.skippedNonWatch, 1);
});

test('채널 분류: 이름 정규화, 패턴, 미분류', () => {
  assert.equal(normalizeName('피식대학 Psick Univ'), normalizeName('피식대학Psick Univ'));
  assert.equal(classifyChannel('ytn', null, index).type, 'news');
  assert.equal(classifyChannel('아이유 - Topic', null, index).type, 'music');
  assert.equal(classifyChannel('처음 보는 채널', null, index).type, 'unclassified');
  assert.equal(classifyChannel(null, null, index).matchedBy, 'no-channel');
});

test('HHI·CR3 계산', () => {
  // A 5, B 3, C 1, D 1 → 50,30,10,10 → HHI 2500+900+100+100 = 3600, CR3 90
  const rs = [];
  const add = (ch, n) => { for (let i = 0; i < n; i++) rs.push({ channel: ch, time: i }); };
  add('A', 5); add('B', 3); add('C', 1); add('D', 1); rs.push({ channel: null, time: 99 });
  const c = computeConcentration(rs);
  assert.equal(c.withChannel, 10);
  assert.equal(c.noChannel, 1);
  assert.ok(Math.abs(c.hhi - 3600) < 1e-9);
  assert.ok(Math.abs(c.cr3 - 90) < 1e-9);
  assert.equal(c.level.label, '채널 집중 매우 높음');
  const one = computeConcentration([{ channel: 'X' }, { channel: 'X' }]);
  assert.equal(one.hhi, 10000);
  assert.ok(one.cr3Note);
});

test('유형 비중 합계 100%, 미분류 포함', () => {
  const rs = [
    { channel: 'YTN' }, { channel: 'YTN' }, { channel: '침착맨' }, { channel: '모르는 채널' }, { channel: null },
  ];
  const t = computeTypes(rs, index);
  const sum = t.rows.reduce((s, r) => s + r.pct, 0);
  assert.ok(Math.abs(sum - 100) < 1e-9);
  assert.equal(t.unclassifiedCount, 2);
  assert.equal(t.representative.id, 'news');
  assert.equal(t.rows.reduce((s, r) => s + r.count, 0), 5);
});

test('예상 vs 실제 비교 문구', () => {
  const t = computeTypes([{ channel: 'YTN' }, { channel: 'YTN' }, { channel: 'TED' }], index);
  const mis = comparePrediction({ primary: 'knowledge', secondary: ['news'] }, t);
  assert.equal(mis.status, 'mismatch');
  assert.match(mis.message, /지식·교육 콘텐츠를 가장 많이 본다고 생각했지만, 실제 시청기록에서는 뉴스·시사 콘텐츠/);
  assert.equal(mis.secondary[0].inTop3, true);
  assert.equal(comparePrediction({ primary: 'news' }, t).status, 'match');
  assert.equal(comparePrediction(null, t).status, 'no-prediction');
  const none = computeTypes([{ channel: '모름' }], index);
  assert.equal(comparePrediction({ primary: 'news' }, none).status, 'no-actual');
});

test('기간: 파일의 마지막 기록 기준 최근 6개월, 직접 지정', () => {
  const range = { min: Date.parse('2025-01-01T00:00:00Z'), max: Date.parse('2026-07-15T12:00:00Z') };
  const p = resolvePeriod('6m', range);
  const start = new Date(p.start);
  assert.equal(start.getMonth(), new Date(range.max).getMonth() - 6 < 0 ? start.getMonth() : new Date(range.max).getMonth() - 6);
  assert.equal(p.end, range.max);
  assert.equal(resolvePeriod('all', range).start, range.min);
  assert.equal(resolvePeriod('custom', range, { start: '2026-03-01', end: '2026-02-01' }), null);
  const c = resolvePeriod('custom', range, { start: '2026-03-01', end: '2026-03-31' });
  assert.ok(c.start < c.end);
});

test('analyze 전체 + 기간 밖 기록 제외 + 저장/비교', () => {
  const recs = prepareRecords([
    { channel: 'YTN', time: Date.parse('2026-06-01T00:00:00Z'), url: 'u1' },
    { channel: 'TED', time: Date.parse('2026-06-02T00:00:00Z'), url: 'u2' },
    { channel: 'TED', time: Date.parse('2026-06-03T00:00:00Z'), url: 'u3' },
    { channel: 'YTN', time: Date.parse('2024-01-01T00:00:00Z'), url: 'old' },
  ]).records;
  const range = dataRange(recs);
  const r = analyze(recs, resolvePeriod('6m', range), index, { primary: 'knowledge', secondary: [] });
  assert.equal(r.total, 3);
  assert.equal(r.types.representative.id, 'knowledge');
  assert.equal(r.comparison.status, 'match');
  assert.ok(Math.abs(r.concentration.hhi - ((100 / 3) ** 2 + (200 / 3) ** 2)) < 1e-6);
  const e1 = toHistoryEntry(r, { primary: 'knowledge' });
  const r2 = analyze(recs, resolvePeriod('all', range), index, null);
  const e2 = toHistoryEntry(r2, null);
  const cmp = compareEntries(e1, e2);
  assert.ok(cmp.hhi.diff !== 0);
  assert.equal(JSON.stringify(e1).includes('YTN'), false, '저장 데이터에 채널명이 들어가지 않음');
  const empty = analyze(recs, { start: 0, end: 1 }, index, null);
  assert.equal(empty.empty, true);
});

// ---------- 유튜브 탐색 링크 ----------
import { youtubeSearchUrl, exploreQuery } from '../js/explore.js';
import { CONTENT_TYPES } from '../js/config.js';

test('탐색 링크: 8개 유형 모두 검색어가 있고 URL 인코딩됨', () => {
  const expected = {
    vlog: '일상 브이로그', entertain: '예능 및 엔터테인먼트', game: '게임 플레이 및 게임 영상', beauty: '뷰티 및 패션',
    knowledge: '지식 및 교육', music: '음악 및 라이브', sports: '스포츠 경기 및 하이라이트', news: '뉴스 및 시사',
  };
  for (const t of CONTENT_TYPES) {
    const url = youtubeSearchUrl(t.id);
    assert.ok(url.startsWith('https://www.youtube.com/results?search_query='), url);
    const raw = url.slice('https://www.youtube.com/results?search_query='.length);
    assert.match(raw, /^[A-Za-z0-9%\-_.!~*'()]+$/, '공백·한글이 그대로 남지 않음');
    assert.equal(decodeURIComponent(raw), expected[t.id]);
    assert.equal(new URL(url).searchParams.get('search_query'), expected[t.id]);
    assert.equal(exploreQuery(t.id), expected[t.id]);
  }
  assert.equal(youtubeSearchUrl('unclassified'), null);
  assert.equal(youtubeSearchUrl('toString'), null);
});

test('탐색 링크: 실제 분석에서 선정된 유형 기준', () => {
  const t = computeTypes([{ channel: 'YTN' }, { channel: 'YTN' }, { channel: 'TED' }], index);
  const r = analyze(prepareRecords([
    { channel: 'YTN', time: 3, url: 'a' }, { channel: 'YTN', time: 2, url: 'b' }, { channel: 'TED', time: 1, url: 'c' },
  ]).records, { start: 0, end: 10 }, index, null);
  assert.ok(t);
  const ids = r.suggestion.types.map((x) => x.id);
  assert.ok(!ids.includes('news') && !ids.includes('unclassified'));
  ids.forEach((id) => assert.ok(youtubeSearchUrl(id)));
});

// ---------- Takeout zip 읽기 ----------
import { parseTakeoutZip } from '../js/zip.js';
import { existsSync } from 'node:fs';

const ZIPDIR = new URL('./fixtures/', import.meta.url);
const zipBlob = (name) => new Blob([readFileSync(new URL(name, ZIPDIR))]);

test('zip: 한국어 Takeout 구조(검색 기록이 같이 있어도 시청기록 선택)', { skip: !existsSync(new URL('takeout-ko.zip', ZIPDIR)) }, async () => {
  const z = await parseTakeoutZip(zipBlob('takeout-ko.zip'));
  assert.match(z.innerName, /시청 기록\.json$/);
  assert.equal(z.parsed.format, 'json');
  assert.ok(z.parsed.records.length > 100);
});

test('zip: 압축 안 함(stored) + HTML', { skip: !existsSync(new URL('takeout-en-html.zip', ZIPDIR)) }, async () => {
  const z = await parseTakeoutZip(zipBlob('takeout-en-html.zip'));
  assert.match(z.innerName, /watch-history\.html$/);
  assert.equal(z.parsed.format, 'html');
});

test('zip: ZIP64 형식', { skip: !existsSync(new URL('takeout-zip64.zip', ZIPDIR)) }, async () => {
  const z = await parseTakeoutZip(zipBlob('takeout-zip64.zip'));
  assert.ok(z.parsed.records.length > 100);
});

test('zip: 파일 이름이 달라도 내용으로 찾음', { skip: !existsSync(new URL('odd-name.zip', ZIPDIR)) }, async () => {
  const z = await parseTakeoutZip(zipBlob('odd-name.zip'));
  assert.match(z.innerName, /records\.json$/);
});

test('zip: 시청기록 없음·깨진 zip은 안내 문구', async () => {
  await assert.rejects(parseTakeoutZip(zipBlob('no-history.zip')), /시청기록을 찾지 못했어요/);
  await assert.rejects(parseTakeoutZip(zipBlob('broken.zip')), /zip 파일/);
});
