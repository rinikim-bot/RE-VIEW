// 분석 로직: 화면(UI)과 분리된 순수 함수들. Node 테스트에서 그대로 실행된다.
import {
  CONTENT_TYPES, UNCLASSIFIED, TYPE_BY_ID, TYPE_NOUN, HHI_LEVELS, UNCLASSIFIED_WARN_PCT, PERIOD_OPTIONS,
} from './config.js';

// ---------- 채널 DB ----------

export function normalizeName(name) {
  return String(name || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\s ​]+/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '');
}

export function buildChannelIndex(db) {
  const byId = new Map();
  const byName = new Map();
  const validTypes = new Set(CONTENT_TYPES.map((t) => t.id));
  const problems = [];
  for (const ch of db.channels || []) {
    if (!validTypes.has(ch.type)) { problems.push(`알 수 없는 유형 "${ch.type}" (${ch.name})`); continue; }
    if (ch.channelId) byId.set(ch.channelId, ch.type);
    for (const n of [ch.name, ...(ch.aliases || [])]) {
      const key = normalizeName(n);
      if (key) byName.set(key, ch.type);
    }
  }
  const patterns = (db.patterns || []).filter((p) => validTypes.has(p.type));
  return { byId, byName, patterns, size: (db.channels || []).length, problems };
}

export function classifyChannel(name, channelId, index) {
  if (!name && !channelId) return { type: UNCLASSIFIED.id, matchedBy: 'no-channel' };
  if (channelId && index.byId.has(channelId)) return { type: index.byId.get(channelId), matchedBy: 'id' };
  const key = normalizeName(name);
  if (key && index.byName.has(key)) return { type: index.byName.get(key), matchedBy: 'name' };
  for (const p of index.patterns) {
    if (p.suffix && String(name || '').endsWith(p.suffix)) return { type: p.type, matchedBy: 'pattern' };
  }
  return { type: UNCLASSIFIED.id, matchedBy: null };
}

// ---------- 정리: 광고 제외, 중복 제거 ----------

export function prepareRecords(records) {
  const seen = new Set();
  const kept = [];
  let ads = 0;
  let duplicates = 0;
  for (const r of records) {
    if (r.isAd) { ads++; continue; }
    const key = `${r.time}|${r.url || r.title}`;
    if (seen.has(key)) { duplicates++; continue; }
    seen.add(key);
    kept.push(r);
  }
  kept.sort((a, b) => a.time - b.time);
  return { records: kept, ads, duplicates };
}

export function dataRange(records) {
  if (!records.length) return null;
  let min = Infinity; let max = -Infinity;
  for (const r of records) { if (r.time < min) min = r.time; if (r.time > max) max = r.time; }
  return { min, max };
}

// ---------- 분석 기간 ----------
// "최근 N개월"은 파일 안의 가장 최근 시청 시각을 기준으로 거슬러 올라간다.
export function resolvePeriod(optionId, range, custom) {
  if (!range) return null;
  const opt = PERIOD_OPTIONS.find((o) => o.id === optionId) || PERIOD_OPTIONS.find((o) => o.id === '6m');
  if (opt.id === 'all') return { id: 'all', label: opt.label, start: range.min, end: range.max };
  if (opt.id === 'custom') {
    const start = custom && custom.start ? Date.parse(custom.start + 'T00:00:00') : range.min;
    const end = custom && custom.end ? Date.parse(custom.end + 'T23:59:59.999') : range.max;
    if (Number.isNaN(start) || Number.isNaN(end) || start > end) return null;
    return { id: 'custom', label: opt.label, start, end };
  }
  const d = new Date(range.max);
  d.setMonth(d.getMonth() - opt.months);
  return { id: opt.id, label: opt.label, start: d.getTime(), end: range.max };
}

export function filterByPeriod(records, period) {
  return records.filter((r) => r.time >= period.start && r.time <= period.end);
}

// ---------- 집중도 ----------

export function hhiLevel(hhi) {
  return HHI_LEVELS.levels.find((l) => hhi <= l.max);
}

export function computeConcentration(records) {
  const counts = new Map();
  let noChannel = 0;
  for (const r of records) {
    if (!r.channel) { noChannel++; continue; }
    counts.set(r.channel, (counts.get(r.channel) || 0) + 1);
  }
  const withChannel = records.length - noChannel;
  const channels = [...counts.entries()]
    .map(([name, count]) => ({ name, count, pct: withChannel ? (count / withChannel) * 100 : 0 }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ko'));
  const hhi = channels.reduce((s, c) => s + c.pct * c.pct, 0);
  const top3 = channels.slice(0, 3);
  const cr3 = top3.reduce((s, c) => s + c.pct, 0);
  return {
    withChannel, noChannel, channelCount: channels.length, channels,
    hhi, cr3, cr3Channels: top3, cr3Note: channels.length < 3 ? `채널이 ${channels.length}개뿐이라 CR3는 전체 채널의 합이에요.` : '',
    level: withChannel ? hhiLevel(hhi) : null,
  };
}

// ---------- 콘텐츠 유형 ----------

export function computeTypes(records, index) {
  const counts = Object.fromEntries([...CONTENT_TYPES, UNCLASSIFIED].map((t) => [t.id, 0]));
  const channelType = new Map();
  const matchStats = { id: 0, name: 0, pattern: 0, 'no-channel': 0, none: 0 };
  for (const r of records) {
    let c = channelType.get(r.channelId || r.channel || '');
    if (!c || !r.channel) {
      c = classifyChannel(r.channel, r.channelId, index);
      if (r.channel) channelType.set(r.channelId || r.channel, c);
    }
    counts[c.type]++;
    matchStats[c.matchedBy || 'none']++;
  }
  const total = records.length;
  const rows = [...CONTENT_TYPES, UNCLASSIFIED].map((t) => ({
    id: t.id, label: t.label, color: t.color, count: counts[t.id], pct: total ? (counts[t.id] / total) * 100 : 0,
  }));
  const classified = rows.filter((r) => r.id !== UNCLASSIFIED.id);
  const classifiedCount = classified.reduce((s, r) => s + r.count, 0);
  const maxCount = Math.max(0, ...classified.map((r) => r.count));
  const topIds = maxCount > 0 ? classified.filter((r) => r.count === maxCount).map((r) => r.id) : [];
  const rep = topIds.length ? TYPE_BY_ID[topIds[0]] : null;
  const unclassifiedPct = rows.find((r) => r.id === UNCLASSIFIED.id).pct;
  return {
    total, rows, classifiedCount, unclassifiedCount: counts[UNCLASSIFIED.id], unclassifiedPct, matchStats,
    representative: rep ? { id: rep.id, label: rep.label, persona: rep.persona, count: maxCount, pct: (maxCount / total) * 100 } : null,
    tiedTopIds: topIds,
    lowClassification: unclassifiedPct >= UNCLASSIFIED_WARN_PCT,
  };
}

export function rankOfType(types, id) {
  const sorted = types.rows.filter((r) => r.id !== UNCLASSIFIED.id).sort((a, b) => b.count - a.count);
  const row = sorted.find((r) => r.id === id);
  // 같은 건수는 같은 순위
  return row ? 1 + sorted.filter((r) => r.count > row.count).length : null;
}

// ---------- 예상 vs 실제 ----------

export function comparePrediction(prediction, types) {
  if (!prediction || !prediction.primary) return { status: 'no-prediction' };
  if (!types.representative) return { status: 'no-actual' };
  const primary = prediction.primary;
  const match = types.tiedTopIds.includes(primary);
  const actual = types.representative;
  const pRow = types.rows.find((r) => r.id === primary);
  const message = match
    ? '예상했던 콘텐츠 유형과 실제 시청기록에서 가장 높은 비중을 차지한 유형이 일치해요.'
    : `나는 평소 ${TYPE_NOUN[primary]} 콘텐츠를 가장 많이 본다고 생각했지만, 실제 시청기록에서는 ${TYPE_NOUN[actual.id]} 콘텐츠의 비중이 가장 높았어요.`;
  const secondary = (prediction.secondary || []).map((id) => {
    const row = types.rows.find((r) => r.id === id);
    const rank = rankOfType(types, id);
    return { id, label: TYPE_BY_ID[id].label, pct: row.pct, count: row.count, rank, inTop3: row.count > 0 && rank <= 3 };
  });
  return {
    status: match ? 'match' : 'mismatch',
    message,
    tie: types.tiedTopIds.length > 1,
    primary: { id: primary, label: TYPE_BY_ID[primary].label, pct: pRow.pct, count: pRow.count, rank: rankOfType(types, primary) },
    actual,
    secondary,
  };
}

// ---------- 새로운 유형 탐색 제안 ----------

export function suggestTypes(types, max = 2) {
  if (!types.representative) return null;
  const low = types.rows
    .filter((r) => r.id !== UNCLASSIFIED.id && !types.tiedTopIds.includes(r.id))
    .sort((a, b) => a.count - b.count || CONTENT_TYPES.findIndex((t) => t.id === a.id) - CONTENT_TYPES.findIndex((t) => t.id === b.id))
    .slice(0, max);
  if (!low.length) return null;
  const top = TYPE_NOUN[types.representative.id];
  const lowNames = low.map((r) => TYPE_NOUN[r.id]);
  return {
    types: low,
    message: `평소 ${top} 콘텐츠를 주로 시청하고 있어요. 평소 시청 비중이 낮았던 ${lowNames.join('·')} 콘텐츠도 탐색해 보는 건 어떨까요?`,
  };
}

// ---------- 월별 추이 ----------

export function monthlyCounts(records) {
  const map = new Map();
  for (const r of records) {
    const d = new Date(r.time);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return [...map.entries()].sort().map(([month, count]) => ({ month, count }));
}

// ---------- 전체 분석 ----------

export function analyze(prepared, period, index, prediction) {
  const inPeriod = filterByPeriod(prepared, period);
  if (!inPeriod.length) return { empty: true, period };
  const types = computeTypes(inPeriod, index);
  const conc = computeConcentration(inPeriod);
  const channelTypeMap = new Map();
  for (const r of inPeriod) {
    if (r.channel && !channelTypeMap.has(r.channel)) channelTypeMap.set(r.channel, classifyChannel(r.channel, r.channelId, index).type);
  }
  conc.channels.forEach((c) => { c.type = channelTypeMap.get(c.name) || UNCLASSIFIED.id; });
  const unclassifiedChannels = conc.channels.filter((c) => c.type === UNCLASSIFIED.id);
  return {
    empty: false,
    period,
    total: inPeriod.length,
    actualRange: dataRange(inPeriod),
    types,
    concentration: conc,
    top5: conc.channels.slice(0, 5),
    unclassifiedChannels,
    monthly: monthlyCounts(inPeriod),
    comparison: comparePrediction(prediction, types),
    suggestion: suggestTypes(types),
    musicHeaderCount: inPeriod.filter((r) => r.header === 'YouTube Music').length,
  };
}

// ---------- 저장용 요약과 이전 결과 비교 ----------

export function toHistoryEntry(result, prediction, meta = {}) {
  return {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    savedAt: Date.now(),
    period: { label: result.period.label, start: result.period.start, end: result.period.end },
    total: result.total,
    shares: Object.fromEntries(result.types.rows.map((r) => [r.id, { count: r.count, pct: r.pct }])),
    representative: result.types.representative ? result.types.representative.id : null,
    hhi: result.concentration.hhi,
    cr3: result.concentration.cr3,
    unclassifiedPct: result.types.unclassifiedPct,
    prediction: prediction && prediction.primary ? { primary: prediction.primary, secondary: prediction.secondary || [] } : null,
    fileName: meta.fileName || null,
  };
}

export function compareEntries(prev, curr) {
  const types = [...CONTENT_TYPES, UNCLASSIFIED].map((t) => {
    const a = prev.shares[t.id] ? prev.shares[t.id].pct : 0;
    const b = curr.shares[t.id] ? curr.shares[t.id].pct : 0;
    return { id: t.id, label: t.label, color: t.color, prev: a, curr: b, diff: b - a };
  });
  const biggest = types.filter((t) => t.id !== UNCLASSIFIED.id).sort((x, y) => Math.abs(y.diff) - Math.abs(x.diff))[0];
  return {
    types,
    hhi: { prev: prev.hhi, curr: curr.hhi, diff: curr.hhi - prev.hhi },
    cr3: { prev: prev.cr3, curr: curr.cr3, diff: curr.cr3 - prev.cr3 },
    representativeChanged: prev.representative !== curr.representative,
    biggest: biggest && Math.abs(biggest.diff) >= 0.05 ? biggest : null,
  };
}
