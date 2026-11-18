// Google Takeout YouTube 시청기록(watch-history.json / watch-history.html) 파서.
// DOM에 의존하지 않으므로 브라우저와 Node 테스트 양쪽에서 동작한다.

export class ParseError extends Error {
  constructor(message, hint) {
    super(message);
    this.name = 'ParseError';
    this.hint = hint || '';
  }
}

// ---------- 공통 유틸 ----------

// "Watched 제목" / "제목을(를) 시청했습니다." 등 언어별 접두·접미 문구를 지운다.
const TITLE_PATTERNS = [
  /^Watched\s+/i,
  /^Visionado:?\s+/i,
  /^Visto\s+/i,
  /\s*을\(를\)\s*시청했습니다\.?$/,
  /\s*을\(를\)\s*시청함\.?$/,
  /\s*시청함\.?$/,
  /\s*を視聴しました$/,
];

export function cleanTitle(raw) {
  if (!raw) return '';
  let t = String(raw).trim();
  for (const p of TITLE_PATTERNS) t = t.replace(p, '');
  return t.trim();
}

export function videoIdFromUrl(url) {
  if (!url) return null;
  const m = String(url).match(/[?&]v=([\w-]{6,})/) || String(url).match(/youtu\.be\/([\w-]{6,})/);
  return m ? m[1] : null;
}

export function channelIdFromUrl(url) {
  if (!url) return null;
  const m = String(url).match(/\/channel\/(UC[\w-]{10,})/);
  return m ? m[1] : null;
}

const AD_MARKERS = ['From Google Ads', 'Google 광고에서', 'Google 광고', 'De anuncios de Google'];

function isAdDetails(details) {
  if (!Array.isArray(details)) return false;
  return details.some((d) => d && typeof d.name === 'string' && AD_MARKERS.some((m) => d.name.includes(m)));
}

// ---------- JSON ----------

export function parseTakeoutJSON(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new ParseError('JSON 파일을 읽을 수 없어요. 파일이 손상되었거나 JSON 형식이 아니에요.',
      'Google Takeout에서 받은 watch-history.json 파일을 그대로 올려 주세요.');
  }
  if (!Array.isArray(data)) {
    throw new ParseError('시청기록 목록을 찾을 수 없어요. 이 파일은 YouTube 시청기록 형식이 아니에요.',
      'Takeout 압축을 풀면 "YouTube 및 YouTube Music > 시청 기록" 폴더 안에 watch-history.json이 있어요.');
  }
  if (data.length === 0) {
    throw new ParseError('파일 안에 시청기록이 한 건도 없어요.', '시청 기록이 꺼져 있었거나 기록이 삭제된 계정일 수 있어요.');
  }

  const records = [];
  let skippedNonWatch = 0;
  let missingTime = 0;
  for (const item of data) {
    if (!item || typeof item !== 'object') { skippedNonWatch++; continue; }
    const title = typeof item.title === 'string' ? item.title : '';
    // 검색 기록 등 시청이 아닌 활동은 제외
    if (/^Searched for\s/i.test(title) || /검색했습니다/.test(title)) { skippedNonWatch++; continue; }
    const time = Date.parse(item.time);
    if (!item.time || Number.isNaN(time)) { missingTime++; continue; }
    const sub = Array.isArray(item.subtitles) && item.subtitles[0] ? item.subtitles[0] : null;
    records.push({
      title: cleanTitle(title),
      url: item.titleUrl || null,
      videoId: videoIdFromUrl(item.titleUrl),
      channel: sub && sub.name ? String(sub.name).trim() : null,
      channelUrl: sub && sub.url ? sub.url : null,
      channelId: sub ? channelIdFromUrl(sub.url) : null,
      time,
      header: item.header || 'YouTube',
      isAd: isAdDetails(item.details),
    });
  }
  return finish('json', records, { skippedNonWatch, missingTime, rawCount: data.length });
}

// ---------- HTML ----------

const ENTITY_MAP = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', emsp: ' ', ensp: ' ', '#39': "'" };

export function decodeEntities(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z0-9#]+);/gi, (m, n) => (n.toLowerCase() in ENTITY_MAP ? ENTITY_MAP[n.toLowerCase()] : m));
}

function stripTags(s) {
  return decodeEntities(String(s).replace(/<[^>]*>/g, '')).replace(/[   ]/g, ' ').trim();
}

const TZ_OFFSETS = {
  UTC: 0, GMT: 0, KST: 9, JST: 9, CST: -6, CDT: -5, PST: -8, PDT: -7, MST: -7, MDT: -6,
  EST: -5, EDT: -4, CET: 1, CEST: 2, BST: 1, IST: 5.5, AEST: 10, AEDT: 11, SGT: 8, HKT: 8,
};
const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

function toUtc(y, mo, d, h, mi, s, tz) {
  let offset = 0;
  let tzKnown = true;
  if (tz) {
    const up = tz.toUpperCase();
    const gmt = up.match(/^(?:GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?$/);
    if (gmt) offset = (gmt[1] === '-' ? -1 : 1) * (Number(gmt[2]) + Number(gmt[3] || 0) / 60);
    else if (up in TZ_OFFSETS) offset = TZ_OFFSETS[up];
    else tzKnown = false;
  } else tzKnown = false;
  const ms = Date.UTC(y, mo, d, h, mi, s) - offset * 3600 * 1000;
  return { ms, tzKnown };
}

// HTML에 적힌 사람이 읽는 날짜를 시각(ms)으로 바꾼다. 영어·한국어 표기를 지원한다.
export function parseHumanDate(str) {
  const s = String(str).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
  // 영어: "Jan 5, 2024, 3:12:45 PM KST"
  let m = s.match(/^([A-Za-z]{3})[a-z]*\.? (\d{1,2}), (\d{4}),? (\d{1,2}):(\d{2}):(\d{2}) ?([AP]M)? ?([A-Za-z]{2,5}(?:[+-]\d{1,2}(?::?\d{2})?)?)?$/i);
  if (m && m[1].toLowerCase() in MONTHS) {
    let h = Number(m[4]);
    if (m[7]) { const pm = m[7].toUpperCase() === 'PM'; if (pm && h < 12) h += 12; if (!pm && h === 12) h = 0; }
    return toUtc(Number(m[3]), MONTHS[m[1].toLowerCase()], Number(m[2]), h, Number(m[5]), Number(m[6]), m[8]);
  }
  // 영어(일-월 순): "5 Jan 2024, 15:12:45 GMT"
  m = s.match(/^(\d{1,2}) ([A-Za-z]{3})[a-z]* (\d{4}),? (\d{1,2}):(\d{2}):(\d{2}) ?([A-Za-z]{2,5}(?:[+-]\d{1,2}(?::?\d{2})?)?)?$/);
  if (m && m[2].toLowerCase() in MONTHS) {
    return toUtc(Number(m[3]), MONTHS[m[2].toLowerCase()], Number(m[1]), Number(m[4]), Number(m[5]), Number(m[6]), m[7]);
  }
  // 한국어: "2024. 1. 5. 오후 3:12:45 KST" 또는 "2024. 1. 5. 15:12:45 KST"
  m = s.match(/^(\d{4})\. ?(\d{1,2})\. ?(\d{1,2})\.? (?:(오전|오후) )?(\d{1,2}):(\d{2}):(\d{2}) ?([A-Za-z]{2,5}(?:[+-]\d{1,2}(?::?\d{2})?)?)?$/);
  if (m) {
    let h = Number(m[5]);
    if (m[4] === '오후' && h < 12) h += 12;
    if (m[4] === '오전' && h === 12) h = 0;
    return toUtc(Number(m[1]), Number(m[2]) - 1, Number(m[3]), h, Number(m[6]), Number(m[7]), m[8]);
  }
  return null;
}

export function parseTakeoutHTML(text) {
  if (!/content-cell/.test(text) || !/outer-cell/.test(text)) {
    throw new ParseError('이 HTML 파일에서 시청기록 항목을 찾을 수 없어요.',
      'Takeout의 watch-history.html 파일인지 확인해 주세요. 가능하면 JSON 형식으로 내보내는 것을 권장해요.');
  }
  const blocks = text.split(/<div class="outer-cell/).slice(1);
  const records = [];
  let skippedNonWatch = 0;
  let missingTime = 0;
  let unknownTz = 0;
  for (const block of blocks) {
    const headerMatch = block.match(/class="mdl-typography--title"[^>]*>([\s\S]*?)<\/p>/);
    const header = headerMatch ? stripTags(headerMatch[1]) : 'YouTube';
    const cellMatch = block.match(/<div class="content-cell[^"]*mdl-typography--body-1(?![^"]*text-right)[^"]*">([\s\S]*?)<\/div>/);
    if (!cellMatch) { skippedNonWatch++; continue; }
    const cell = cellMatch[1];
    const anchors = [...cell.matchAll(/<a href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map((a) => ({ href: decodeEntities(a[1]), text: stripTags(a[2]) }));
    const fullText = stripTags(cell);
    if (/^Searched for/i.test(fullText) || /검색했습니다/.test(fullText)) { skippedNonWatch++; continue; }
    const parts = cell.split(/<br\s*\/?>/i).map(stripTags).filter(Boolean);
    const dateStr = parts[parts.length - 1] || '';
    const parsed = parseHumanDate(dateStr);
    if (!parsed) { missingTime++; continue; }
    if (!parsed.tzKnown) unknownTz++;
    const videoA = anchors.find((a) => /watch\?v=|youtu\.be\//.test(a.href));
    const channelA = anchors.find((a) => /\/channel\/|\/@|\/c\/|\/user\//.test(a.href));
    let title = videoA ? videoA.text : cleanTitle(parts[0] || '');
    const caption = (block.match(/mdl-typography--caption">([\s\S]*?)<\/div>/) || [])[1] || '';
    const isAd = AD_MARKERS.some((mk) => decodeEntities(caption).includes(mk));
    records.push({
      title: cleanTitle(title),
      url: videoA ? videoA.href : null,
      videoId: videoA ? videoIdFromUrl(videoA.href) : null,
      channel: channelA ? channelA.text : null,
      channelUrl: channelA ? channelA.href : null,
      channelId: channelA ? channelIdFromUrl(channelA.href) : null,
      time: parsed.ms,
      header,
      isAd,
    });
  }
  return finish('html', records, { skippedNonWatch, missingTime, rawCount: blocks.length, unknownTz });
}

// ---------- 형식 판별 ----------

export function detectAndParse(text, fileName = '') {
  const head = text.slice(0, 2000).trimStart();
  const lower = fileName.toLowerCase();
  if (head.startsWith('[') || head.startsWith('{') || lower.endsWith('.json')) return parseTakeoutJSON(text);
  if (/<html|<!doctype|<div/i.test(head) || lower.endsWith('.html') || lower.endsWith('.htm')) return parseTakeoutHTML(text);
  throw new ParseError('지원하지 않는 파일 형식이에요.', 'watch-history.json 또는 watch-history.html 파일을 올려 주세요.');
}

function finish(format, records, extra) {
  if (records.length === 0) {
    throw new ParseError('파일은 읽었지만 분석할 수 있는 시청기록이 없어요.',
      '검색 기록 파일(search-history)을 올렸거나, 날짜를 읽을 수 없는 형식일 수 있어요.');
  }
  return { format, records, info: { ...extra, unknownTz: extra.unknownTz || 0 } };
}
