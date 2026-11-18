(() => {
  // js/config.js
  var CONTENT_TYPES = [
    { id: "vlog", label: "\uBE0C\uC774\uB85C\uADF8\xB7\uC77C\uC0C1\uD615", persona: "\uBE0C\uC774\uB85C\uAC70\uD615", color: "#ff8a3d" },
    { id: "entertain", label: "\uC5D4\uD130\uD14C\uC778\uBA3C\uD2B8\uD615", persona: "\uC5D4\uD130\uD14C\uC778\uBA3C\uD2B8\uD615", color: "#f0478f" },
    { id: "game", label: "\uAC8C\uC784\uD615", persona: "\uAC8C\uC774\uBA38\uD615", color: "#7b5cff" },
    { id: "beauty", label: "\uBDF0\uD2F0\xB7\uD328\uC158\uD615", persona: "\uBDF0\uD2F0\xB7\uD328\uC158\uD615", color: "#ff6b7a" },
    { id: "knowledge", label: "\uC9C0\uC2DD\xB7\uAD50\uC721\uD615", persona: "\uC9C0\uC2DD \uD0D0\uAD6C\uD615", color: "#13b07e" },
    { id: "music", label: "\uC74C\uC545\uD615", persona: "\uC74C\uC545 \uC560\uD638\uD615", color: "#3b82f6" },
    { id: "sports", label: "\uC2A4\uD3EC\uCE20\uD615", persona: "\uC2A4\uD3EC\uCE20 \uD32C\uD615", color: "#1fb5c9" },
    { id: "news", label: "\uB274\uC2A4\xB7\uC2DC\uC0AC\uD615", persona: "\uB274\uC2A4\xB7\uC2DC\uC0AC\uD615", color: "#64748b" }
  ];
  var TYPE_NOUN = {
    vlog: "\uBE0C\uC774\uB85C\uADF8\xB7\uC77C\uC0C1",
    entertain: "\uC5D4\uD130\uD14C\uC778\uBA3C\uD2B8",
    game: "\uAC8C\uC784",
    beauty: "\uBDF0\uD2F0\xB7\uD328\uC158",
    knowledge: "\uC9C0\uC2DD\xB7\uAD50\uC721",
    music: "\uC74C\uC545",
    sports: "\uC2A4\uD3EC\uCE20",
    news: "\uB274\uC2A4\xB7\uC2DC\uC0AC"
  };
  var YOUTUBE_SEARCH_BASE = "https://www.youtube.com/results?search_query=";
  var EXPLORE_QUERIES = {
    vlog: "\uC77C\uC0C1 \uBE0C\uC774\uB85C\uADF8",
    entertain: "\uC608\uB2A5 \uBC0F \uC5D4\uD130\uD14C\uC778\uBA3C\uD2B8",
    game: "\uAC8C\uC784 \uD50C\uB808\uC774 \uBC0F \uAC8C\uC784 \uC601\uC0C1",
    beauty: "\uBDF0\uD2F0 \uBC0F \uD328\uC158",
    knowledge: "\uC9C0\uC2DD \uBC0F \uAD50\uC721",
    music: "\uC74C\uC545 \uBC0F \uB77C\uC774\uBE0C",
    sports: "\uC2A4\uD3EC\uCE20 \uACBD\uAE30 \uBC0F \uD558\uC774\uB77C\uC774\uD2B8",
    news: "\uB274\uC2A4 \uBC0F \uC2DC\uC0AC"
  };
  var UNCLASSIFIED = { id: "unclassified", label: "\uC720\uD615 \uBBF8\uBD84\uB958", color: "#b8c0cc" };
  var TYPE_BY_ID = Object.fromEntries(
    [...CONTENT_TYPES, UNCLASSIFIED].map((t) => [t.id, t])
  );
  var HHI_LEVELS = {
    provisional: true,
    note: "\uC784\uC2DC \uAE30\uC900\uAC12\uC785\uB2C8\uB2E4. \uD300\uC6D0\uB4E4\uC758 \uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D\uC73C\uB85C \uBD84\uD3EC\uB97C \uD655\uC778\uD55C \uB4A4 \uC870\uC815\uD574\uC57C \uD569\uB2C8\uB2E4.",
    levels: [
      { max: 300, label: "\uBD84\uC0B0\uB41C \uC774\uC6A9", tone: "low" },
      { max: 1e3, label: "\uC77C\uBD80 \uCC44\uB110 \uC9D1\uC911", tone: "mid" },
      { max: 2500, label: "\uCC44\uB110 \uC9D1\uC911 \uB192\uC74C", tone: "high" },
      { max: Infinity, label: "\uCC44\uB110 \uC9D1\uC911 \uB9E4\uC6B0 \uB192\uC74C", tone: "veryhigh" }
    ]
  };
  var UNCLASSIFIED_WARN_PCT = 50;
  var PERIOD_OPTIONS = [
    { id: "1m", label: "\uCD5C\uADFC 1\uAC1C\uC6D4", months: 1 },
    { id: "3m", label: "\uCD5C\uADFC 3\uAC1C\uC6D4", months: 3 },
    { id: "6m", label: "\uCD5C\uADFC 6\uAC1C\uC6D4", months: 6 },
    { id: "12m", label: "\uCD5C\uADFC 12\uAC1C\uC6D4", months: 12 },
    { id: "all", label: "\uC804\uCCB4 \uAE30\uAC04", months: null },
    { id: "custom", label: "\uC9C1\uC811 \uC9C0\uC815", months: null }
  ];
  var DEFAULT_PERIOD = "6m";
  var STORAGE_KEYS = {
    prediction: "infodiet.prediction.v1",
    history: "infodiet.history.v1"
  };
  var MAX_HISTORY = 20;

  // js/parser.js
  var ParseError = class extends Error {
    constructor(message, hint) {
      super(message);
      this.name = "ParseError";
      this.hint = hint || "";
    }
  };
  var TITLE_PATTERNS = [
    /^Watched\s+/i,
    /^Visionado:?\s+/i,
    /^Visto\s+/i,
    /\s*을\(를\)\s*시청했습니다\.?$/,
    /\s*을\(를\)\s*시청함\.?$/,
    /\s*시청함\.?$/,
    /\s*を視聴しました$/
  ];
  function cleanTitle(raw) {
    if (!raw) return "";
    let t = String(raw).trim();
    for (const p of TITLE_PATTERNS) t = t.replace(p, "");
    return t.trim();
  }
  function videoIdFromUrl(url) {
    if (!url) return null;
    const m = String(url).match(/[?&]v=([\w-]{6,})/) || String(url).match(/youtu\.be\/([\w-]{6,})/);
    return m ? m[1] : null;
  }
  function channelIdFromUrl(url) {
    if (!url) return null;
    const m = String(url).match(/\/channel\/(UC[\w-]{10,})/);
    return m ? m[1] : null;
  }
  var AD_MARKERS = ["From Google Ads", "Google \uAD11\uACE0\uC5D0\uC11C", "Google \uAD11\uACE0", "De anuncios de Google"];
  function isAdDetails(details) {
    if (!Array.isArray(details)) return false;
    return details.some((d) => d && typeof d.name === "string" && AD_MARKERS.some((m) => d.name.includes(m)));
  }
  function parseTakeoutJSON(text) {
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new ParseError(
        "JSON \uD30C\uC77C\uC744 \uC77D\uC744 \uC218 \uC5C6\uC5B4\uC694. \uD30C\uC77C\uC774 \uC190\uC0C1\uB418\uC5C8\uAC70\uB098 JSON \uD615\uC2DD\uC774 \uC544\uB2C8\uC5D0\uC694.",
        "Google Takeout\uC5D0\uC11C \uBC1B\uC740 watch-history.json \uD30C\uC77C\uC744 \uADF8\uB300\uB85C \uC62C\uB824 \uC8FC\uC138\uC694."
      );
    }
    if (!Array.isArray(data)) {
      throw new ParseError(
        "\uC2DC\uCCAD\uAE30\uB85D \uBAA9\uB85D\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4\uC694. \uC774 \uD30C\uC77C\uC740 YouTube \uC2DC\uCCAD\uAE30\uB85D \uD615\uC2DD\uC774 \uC544\uB2C8\uC5D0\uC694.",
        'Takeout \uC555\uCD95\uC744 \uD480\uBA74 "YouTube \uBC0F YouTube Music > \uC2DC\uCCAD \uAE30\uB85D" \uD3F4\uB354 \uC548\uC5D0 watch-history.json\uC774 \uC788\uC5B4\uC694.'
      );
    }
    if (data.length === 0) {
      throw new ParseError("\uD30C\uC77C \uC548\uC5D0 \uC2DC\uCCAD\uAE30\uB85D\uC774 \uD55C \uAC74\uB3C4 \uC5C6\uC5B4\uC694.", "\uC2DC\uCCAD \uAE30\uB85D\uC774 \uAEBC\uC838 \uC788\uC5C8\uAC70\uB098 \uAE30\uB85D\uC774 \uC0AD\uC81C\uB41C \uACC4\uC815\uC77C \uC218 \uC788\uC5B4\uC694.");
    }
    const records = [];
    let skippedNonWatch = 0;
    let missingTime = 0;
    for (const item of data) {
      if (!item || typeof item !== "object") {
        skippedNonWatch++;
        continue;
      }
      const title = typeof item.title === "string" ? item.title : "";
      if (/^Searched for\s/i.test(title) || /검색했습니다/.test(title)) {
        skippedNonWatch++;
        continue;
      }
      const time = Date.parse(item.time);
      if (!item.time || Number.isNaN(time)) {
        missingTime++;
        continue;
      }
      const sub = Array.isArray(item.subtitles) && item.subtitles[0] ? item.subtitles[0] : null;
      records.push({
        title: cleanTitle(title),
        url: item.titleUrl || null,
        videoId: videoIdFromUrl(item.titleUrl),
        channel: sub && sub.name ? String(sub.name).trim() : null,
        channelUrl: sub && sub.url ? sub.url : null,
        channelId: sub ? channelIdFromUrl(sub.url) : null,
        time,
        header: item.header || "YouTube",
        isAd: isAdDetails(item.details)
      });
    }
    return finish("json", records, { skippedNonWatch, missingTime, rawCount: data.length });
  }
  var ENTITY_MAP = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", emsp: " ", ensp: " ", "#39": "'" };
  function decodeEntities(s) {
    return String(s).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10))).replace(/&([a-z0-9#]+);/gi, (m, n) => n.toLowerCase() in ENTITY_MAP ? ENTITY_MAP[n.toLowerCase()] : m);
  }
  function stripTags(s) {
    return decodeEntities(String(s).replace(/<[^>]*>/g, "")).replace(/[   ]/g, " ").trim();
  }
  var TZ_OFFSETS = {
    UTC: 0,
    GMT: 0,
    KST: 9,
    JST: 9,
    CST: -6,
    CDT: -5,
    PST: -8,
    PDT: -7,
    MST: -7,
    MDT: -6,
    EST: -5,
    EDT: -4,
    CET: 1,
    CEST: 2,
    BST: 1,
    IST: 5.5,
    AEST: 10,
    AEDT: 11,
    SGT: 8,
    HKT: 8
  };
  var MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  function toUtc(y, mo, d, h, mi, s, tz) {
    let offset = 0;
    let tzKnown = true;
    if (tz) {
      const up = tz.toUpperCase();
      const gmt = up.match(/^(?:GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?$/);
      if (gmt) offset = (gmt[1] === "-" ? -1 : 1) * (Number(gmt[2]) + Number(gmt[3] || 0) / 60);
      else if (up in TZ_OFFSETS) offset = TZ_OFFSETS[up];
      else tzKnown = false;
    } else tzKnown = false;
    const ms = Date.UTC(y, mo, d, h, mi, s) - offset * 3600 * 1e3;
    return { ms, tzKnown };
  }
  function parseHumanDate(str) {
    const s = String(str).replace(/[   ]/g, " ").replace(/\s+/g, " ").trim();
    let m = s.match(/^([A-Za-z]{3})[a-z]*\.? (\d{1,2}), (\d{4}),? (\d{1,2}):(\d{2}):(\d{2}) ?([AP]M)? ?([A-Za-z]{2,5}(?:[+-]\d{1,2}(?::?\d{2})?)?)?$/i);
    if (m && m[1].toLowerCase() in MONTHS) {
      let h = Number(m[4]);
      if (m[7]) {
        const pm = m[7].toUpperCase() === "PM";
        if (pm && h < 12) h += 12;
        if (!pm && h === 12) h = 0;
      }
      return toUtc(Number(m[3]), MONTHS[m[1].toLowerCase()], Number(m[2]), h, Number(m[5]), Number(m[6]), m[8]);
    }
    m = s.match(/^(\d{1,2}) ([A-Za-z]{3})[a-z]* (\d{4}),? (\d{1,2}):(\d{2}):(\d{2}) ?([A-Za-z]{2,5}(?:[+-]\d{1,2}(?::?\d{2})?)?)?$/);
    if (m && m[2].toLowerCase() in MONTHS) {
      return toUtc(Number(m[3]), MONTHS[m[2].toLowerCase()], Number(m[1]), Number(m[4]), Number(m[5]), Number(m[6]), m[7]);
    }
    m = s.match(/^(\d{4})\. ?(\d{1,2})\. ?(\d{1,2})\.? (?:(오전|오후) )?(\d{1,2}):(\d{2}):(\d{2}) ?([A-Za-z]{2,5}(?:[+-]\d{1,2}(?::?\d{2})?)?)?$/);
    if (m) {
      let h = Number(m[5]);
      if (m[4] === "\uC624\uD6C4" && h < 12) h += 12;
      if (m[4] === "\uC624\uC804" && h === 12) h = 0;
      return toUtc(Number(m[1]), Number(m[2]) - 1, Number(m[3]), h, Number(m[6]), Number(m[7]), m[8]);
    }
    return null;
  }
  function parseTakeoutHTML(text) {
    if (!/content-cell/.test(text) || !/outer-cell/.test(text)) {
      throw new ParseError(
        "\uC774 HTML \uD30C\uC77C\uC5D0\uC11C \uC2DC\uCCAD\uAE30\uB85D \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4\uC694.",
        "Takeout\uC758 watch-history.html \uD30C\uC77C\uC778\uC9C0 \uD655\uC778\uD574 \uC8FC\uC138\uC694. \uAC00\uB2A5\uD558\uBA74 JSON \uD615\uC2DD\uC73C\uB85C \uB0B4\uBCF4\uB0B4\uB294 \uAC83\uC744 \uAD8C\uC7A5\uD574\uC694."
      );
    }
    const blocks = text.split(/<div class="outer-cell/).slice(1);
    const records = [];
    let skippedNonWatch = 0;
    let missingTime = 0;
    let unknownTz = 0;
    for (const block of blocks) {
      const headerMatch = block.match(/class="mdl-typography--title"[^>]*>([\s\S]*?)<\/p>/);
      const header = headerMatch ? stripTags(headerMatch[1]) : "YouTube";
      const cellMatch = block.match(/<div class="content-cell[^"]*mdl-typography--body-1(?![^"]*text-right)[^"]*">([\s\S]*?)<\/div>/);
      if (!cellMatch) {
        skippedNonWatch++;
        continue;
      }
      const cell = cellMatch[1];
      const anchors = [...cell.matchAll(/<a href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map((a) => ({ href: decodeEntities(a[1]), text: stripTags(a[2]) }));
      const fullText = stripTags(cell);
      if (/^Searched for/i.test(fullText) || /검색했습니다/.test(fullText)) {
        skippedNonWatch++;
        continue;
      }
      const parts = cell.split(/<br\s*\/?>/i).map(stripTags).filter(Boolean);
      const dateStr = parts[parts.length - 1] || "";
      const parsed = parseHumanDate(dateStr);
      if (!parsed) {
        missingTime++;
        continue;
      }
      if (!parsed.tzKnown) unknownTz++;
      const videoA = anchors.find((a) => /watch\?v=|youtu\.be\//.test(a.href));
      const channelA = anchors.find((a) => /\/channel\/|\/@|\/c\/|\/user\//.test(a.href));
      let title = videoA ? videoA.text : cleanTitle(parts[0] || "");
      const caption = (block.match(/mdl-typography--caption">([\s\S]*?)<\/div>/) || [])[1] || "";
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
        isAd
      });
    }
    return finish("html", records, { skippedNonWatch, missingTime, rawCount: blocks.length, unknownTz });
  }
  function detectAndParse(text, fileName = "") {
    const head = text.slice(0, 2e3).trimStart();
    const lower = fileName.toLowerCase();
    if (head.startsWith("[") || head.startsWith("{") || lower.endsWith(".json")) return parseTakeoutJSON(text);
    if (/<html|<!doctype|<div/i.test(head) || lower.endsWith(".html") || lower.endsWith(".htm")) return parseTakeoutHTML(text);
    throw new ParseError("\uC9C0\uC6D0\uD558\uC9C0 \uC54A\uB294 \uD30C\uC77C \uD615\uC2DD\uC774\uC5D0\uC694.", "watch-history.json \uB610\uB294 watch-history.html \uD30C\uC77C\uC744 \uC62C\uB824 \uC8FC\uC138\uC694.");
  }
  function finish(format, records, extra) {
    if (records.length === 0) {
      throw new ParseError(
        "\uD30C\uC77C\uC740 \uC77D\uC5C8\uC9C0\uB9CC \uBD84\uC11D\uD560 \uC218 \uC788\uB294 \uC2DC\uCCAD\uAE30\uB85D\uC774 \uC5C6\uC5B4\uC694.",
        "\uAC80\uC0C9 \uAE30\uB85D \uD30C\uC77C(search-history)\uC744 \uC62C\uB838\uAC70\uB098, \uB0A0\uC9DC\uB97C \uC77D\uC744 \uC218 \uC5C6\uB294 \uD615\uC2DD\uC77C \uC218 \uC788\uC5B4\uC694."
      );
    }
    return { format, records, info: { ...extra, unknownTz: extra.unknownTz || 0 } };
  }

  // js/analyzer.js
  function normalizeName(name) {
    return String(name || "").normalize("NFKC").toLowerCase().replace(/[\s ​]+/g, "").replace(/[^\p{L}\p{N}]+/gu, "");
  }
  function buildChannelIndex(db) {
    const byId = /* @__PURE__ */ new Map();
    const byName = /* @__PURE__ */ new Map();
    const validTypes = new Set(CONTENT_TYPES.map((t) => t.id));
    const problems = [];
    for (const ch of db.channels || []) {
      if (!validTypes.has(ch.type)) {
        problems.push(`\uC54C \uC218 \uC5C6\uB294 \uC720\uD615 "${ch.type}" (${ch.name})`);
        continue;
      }
      if (ch.channelId) byId.set(ch.channelId, ch.type);
      for (const n of [ch.name, ...ch.aliases || []]) {
        const key = normalizeName(n);
        if (key) byName.set(key, ch.type);
      }
    }
    const patterns = (db.patterns || []).filter((p) => validTypes.has(p.type));
    return { byId, byName, patterns, size: (db.channels || []).length, problems };
  }
  function classifyChannel(name, channelId, index) {
    if (!name && !channelId) return { type: UNCLASSIFIED.id, matchedBy: "no-channel" };
    if (channelId && index.byId.has(channelId)) return { type: index.byId.get(channelId), matchedBy: "id" };
    const key = normalizeName(name);
    if (key && index.byName.has(key)) return { type: index.byName.get(key), matchedBy: "name" };
    for (const p of index.patterns) {
      if (p.suffix && String(name || "").endsWith(p.suffix)) return { type: p.type, matchedBy: "pattern" };
    }
    return { type: UNCLASSIFIED.id, matchedBy: null };
  }
  function prepareRecords(records) {
    const seen = /* @__PURE__ */ new Set();
    const kept = [];
    let ads = 0;
    let duplicates = 0;
    for (const r of records) {
      if (r.isAd) {
        ads++;
        continue;
      }
      const key = `${r.time}|${r.url || r.title}`;
      if (seen.has(key)) {
        duplicates++;
        continue;
      }
      seen.add(key);
      kept.push(r);
    }
    kept.sort((a, b) => a.time - b.time);
    return { records: kept, ads, duplicates };
  }
  function dataRange(records) {
    if (!records.length) return null;
    let min = Infinity;
    let max = -Infinity;
    for (const r of records) {
      if (r.time < min) min = r.time;
      if (r.time > max) max = r.time;
    }
    return { min, max };
  }
  function resolvePeriod(optionId, range, custom) {
    if (!range) return null;
    const opt = PERIOD_OPTIONS.find((o) => o.id === optionId) || PERIOD_OPTIONS.find((o) => o.id === "6m");
    if (opt.id === "all") return { id: "all", label: opt.label, start: range.min, end: range.max };
    if (opt.id === "custom") {
      const start = custom && custom.start ? Date.parse(custom.start + "T00:00:00") : range.min;
      const end = custom && custom.end ? Date.parse(custom.end + "T23:59:59.999") : range.max;
      if (Number.isNaN(start) || Number.isNaN(end) || start > end) return null;
      return { id: "custom", label: opt.label, start, end };
    }
    const d = new Date(range.max);
    d.setMonth(d.getMonth() - opt.months);
    return { id: opt.id, label: opt.label, start: d.getTime(), end: range.max };
  }
  function filterByPeriod(records, period) {
    return records.filter((r) => r.time >= period.start && r.time <= period.end);
  }
  function hhiLevel(hhi) {
    return HHI_LEVELS.levels.find((l) => hhi <= l.max);
  }
  function computeConcentration(records) {
    const counts = /* @__PURE__ */ new Map();
    let noChannel = 0;
    for (const r of records) {
      if (!r.channel) {
        noChannel++;
        continue;
      }
      counts.set(r.channel, (counts.get(r.channel) || 0) + 1);
    }
    const withChannel = records.length - noChannel;
    const channels = [...counts.entries()].map(([name, count]) => ({ name, count, pct: withChannel ? count / withChannel * 100 : 0 })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ko"));
    const hhi = channels.reduce((s, c) => s + c.pct * c.pct, 0);
    const top3 = channels.slice(0, 3);
    const cr3 = top3.reduce((s, c) => s + c.pct, 0);
    return {
      withChannel,
      noChannel,
      channelCount: channels.length,
      channels,
      hhi,
      cr3,
      cr3Channels: top3,
      cr3Note: channels.length < 3 ? `\uCC44\uB110\uC774 ${channels.length}\uAC1C\uBFD0\uC774\uB77C CR3\uB294 \uC804\uCCB4 \uCC44\uB110\uC758 \uD569\uC774\uC5D0\uC694.` : "",
      level: withChannel ? hhiLevel(hhi) : null
    };
  }
  function computeTypes(records, index) {
    const counts = Object.fromEntries([...CONTENT_TYPES, UNCLASSIFIED].map((t) => [t.id, 0]));
    const channelType = /* @__PURE__ */ new Map();
    const matchStats = { id: 0, name: 0, pattern: 0, "no-channel": 0, none: 0 };
    for (const r of records) {
      let c = channelType.get(r.channelId || r.channel || "");
      if (!c || !r.channel) {
        c = classifyChannel(r.channel, r.channelId, index);
        if (r.channel) channelType.set(r.channelId || r.channel, c);
      }
      counts[c.type]++;
      matchStats[c.matchedBy || "none"]++;
    }
    const total = records.length;
    const rows = [...CONTENT_TYPES, UNCLASSIFIED].map((t) => ({
      id: t.id,
      label: t.label,
      color: t.color,
      count: counts[t.id],
      pct: total ? counts[t.id] / total * 100 : 0
    }));
    const classified = rows.filter((r) => r.id !== UNCLASSIFIED.id);
    const classifiedCount = classified.reduce((s, r) => s + r.count, 0);
    const maxCount = Math.max(0, ...classified.map((r) => r.count));
    const topIds = maxCount > 0 ? classified.filter((r) => r.count === maxCount).map((r) => r.id) : [];
    const rep = topIds.length ? TYPE_BY_ID[topIds[0]] : null;
    const unclassifiedPct = rows.find((r) => r.id === UNCLASSIFIED.id).pct;
    return {
      total,
      rows,
      classifiedCount,
      unclassifiedCount: counts[UNCLASSIFIED.id],
      unclassifiedPct,
      matchStats,
      representative: rep ? { id: rep.id, label: rep.label, persona: rep.persona, count: maxCount, pct: maxCount / total * 100 } : null,
      tiedTopIds: topIds,
      lowClassification: unclassifiedPct >= UNCLASSIFIED_WARN_PCT
    };
  }
  function rankOfType(types, id) {
    const sorted = types.rows.filter((r) => r.id !== UNCLASSIFIED.id).sort((a, b) => b.count - a.count);
    const row = sorted.find((r) => r.id === id);
    return row ? 1 + sorted.filter((r) => r.count > row.count).length : null;
  }
  function comparePrediction(prediction, types) {
    if (!prediction || !prediction.primary) return { status: "no-prediction" };
    if (!types.representative) return { status: "no-actual" };
    const primary = prediction.primary;
    const match = types.tiedTopIds.includes(primary);
    const actual = types.representative;
    const pRow = types.rows.find((r) => r.id === primary);
    const message = match ? "\uC608\uC0C1\uD588\uB358 \uCF58\uD150\uCE20 \uC720\uD615\uACFC \uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D\uC5D0\uC11C \uAC00\uC7A5 \uB192\uC740 \uBE44\uC911\uC744 \uCC28\uC9C0\uD55C \uC720\uD615\uC774 \uC77C\uCE58\uD574\uC694." : `\uB098\uB294 \uD3C9\uC18C ${TYPE_NOUN[primary]} \uCF58\uD150\uCE20\uB97C \uAC00\uC7A5 \uB9CE\uC774 \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD588\uC9C0\uB9CC, \uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D\uC5D0\uC11C\uB294 ${TYPE_NOUN[actual.id]} \uCF58\uD150\uCE20\uC758 \uBE44\uC911\uC774 \uAC00\uC7A5 \uB192\uC558\uC5B4\uC694.`;
    const secondary = (prediction.secondary || []).map((id) => {
      const row = types.rows.find((r) => r.id === id);
      const rank = rankOfType(types, id);
      return { id, label: TYPE_BY_ID[id].label, pct: row.pct, count: row.count, rank, inTop3: row.count > 0 && rank <= 3 };
    });
    return {
      status: match ? "match" : "mismatch",
      message,
      tie: types.tiedTopIds.length > 1,
      primary: { id: primary, label: TYPE_BY_ID[primary].label, pct: pRow.pct, count: pRow.count, rank: rankOfType(types, primary) },
      actual,
      secondary
    };
  }
  function suggestTypes(types, max = 2) {
    if (!types.representative) return null;
    const low = types.rows.filter((r) => r.id !== UNCLASSIFIED.id && !types.tiedTopIds.includes(r.id)).sort((a, b) => a.count - b.count || CONTENT_TYPES.findIndex((t) => t.id === a.id) - CONTENT_TYPES.findIndex((t) => t.id === b.id)).slice(0, max);
    if (!low.length) return null;
    const top = TYPE_NOUN[types.representative.id];
    const lowNames = low.map((r) => TYPE_NOUN[r.id]);
    return {
      types: low,
      message: `\uD3C9\uC18C ${top} \uCF58\uD150\uCE20\uB97C \uC8FC\uB85C \uC2DC\uCCAD\uD558\uACE0 \uC788\uC5B4\uC694. \uD3C9\uC18C \uC2DC\uCCAD \uBE44\uC911\uC774 \uB0AE\uC558\uB358 ${lowNames.join("\xB7")} \uCF58\uD150\uCE20\uB3C4 \uD0D0\uC0C9\uD574 \uBCF4\uB294 \uAC74 \uC5B4\uB5A8\uAE4C\uC694?`
    };
  }
  function monthlyCounts(records) {
    const map = /* @__PURE__ */ new Map();
    for (const r of records) {
      const d = new Date(r.time);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      map.set(key, (map.get(key) || 0) + 1);
    }
    return [...map.entries()].sort().map(([month, count]) => ({ month, count }));
  }
  function analyze(prepared, period, index, prediction) {
    const inPeriod = filterByPeriod(prepared, period);
    if (!inPeriod.length) return { empty: true, period };
    const types = computeTypes(inPeriod, index);
    const conc = computeConcentration(inPeriod);
    const channelTypeMap = /* @__PURE__ */ new Map();
    for (const r of inPeriod) {
      if (r.channel && !channelTypeMap.has(r.channel)) channelTypeMap.set(r.channel, classifyChannel(r.channel, r.channelId, index).type);
    }
    conc.channels.forEach((c) => {
      c.type = channelTypeMap.get(c.name) || UNCLASSIFIED.id;
    });
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
      musicHeaderCount: inPeriod.filter((r) => r.header === "YouTube Music").length
    };
  }
  function toHistoryEntry(result, prediction, meta = {}) {
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
      fileName: meta.fileName || null
    };
  }
  function compareEntries(prev, curr) {
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
      biggest: biggest && Math.abs(biggest.diff) >= 0.05 ? biggest : null
    };
  }

  // js/storage.js
  function read(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
  function remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }
  var storage = {
    available() {
      try {
        const k = "__infodiet_test__";
        localStorage.setItem(k, "1");
        localStorage.removeItem(k);
        return true;
      } catch {
        return false;
      }
    },
    getPrediction() {
      return read(STORAGE_KEYS.prediction, null);
    },
    setPrediction(p) {
      return write(STORAGE_KEYS.prediction, { ...p, savedAt: Date.now() });
    },
    clearPrediction() {
      return remove(STORAGE_KEYS.prediction);
    },
    getHistory() {
      const h = read(STORAGE_KEYS.history, []);
      return Array.isArray(h) ? h : [];
    },
    addHistory(entry) {
      const h = [entry, ...this.getHistory()].slice(0, MAX_HISTORY);
      return write(STORAGE_KEYS.history, h);
    },
    deleteHistory(id) {
      return write(STORAGE_KEYS.history, this.getHistory().filter((e) => e.id !== id));
    },
    clearHistory() {
      return remove(STORAGE_KEYS.history);
    },
    clearAll() {
      remove(STORAGE_KEYS.history);
      remove(STORAGE_KEYS.prediction);
    }
  };

  // js/sample.js
  var SAMPLE_CHANNELS = [
    ["\uCE68\uCC29\uB9E8", 70],
    ["\uD53C\uC2DD\uB300\uD559Psick Univ", 34],
    ["\uC20F\uBC15\uC2A4", 22],
    ["MrBeast", 15],
    ["\uC288\uCE74\uC6D4\uB4DC", 26],
    ["Kurzgesagt \u2013 In a Nutshell", 9],
    ["TED", 6],
    ["HYBE LABELS", 18],
    ["\uC544\uC774\uC720 - Topic", 14],
    ["1theK (\uC6D0\uB354\uCF00\uC774)", 8],
    ["YTN", 10],
    ["SBS \uB274\uC2A4", 6],
    ["\uC6B0\uC641\uAD73\uC758 \uAC8C\uC784\uBC29\uC1A1", 12],
    ["LCK", 7],
    ["KBO", 5],
    ["\uC608\uC2DC \uBE0C\uC774\uB85C\uADF8 \uCC44\uB110", 21],
    ["\uC608\uC2DC \uC694\uB9AC \uCC44\uB110", 17],
    ["\uC608\uC2DC \uC5EC\uD589 \uCC44\uB110", 11],
    ["\uC608\uC2DC \uB9AC\uBDF0 \uCC44\uB110", 9]
  ];
  function rng(seed) {
    let s = seed >>> 0;
    return () => {
      s = s * 1664525 + 1013904223 >>> 0;
      return s / 4294967296;
    };
  }
  function makeSampleRecords() {
    const rand = rng(20261113);
    const end = Date.parse("2026-10-31T22:00:00+09:00");
    const span = 240 * 24 * 3600 * 1e3;
    const records = [];
    let n = 0;
    for (const [channel, count] of SAMPLE_CHANNELS) {
      for (let i = 0; i < count; i++) {
        n++;
        const time = Math.round(end - rand() * span);
        records.push({
          title: `[\uC608\uC2DC] ${channel} \uC601\uC0C1 ${i + 1}`,
          url: `https://www.youtube.com/watch?v=sample${String(n).padStart(5, "0")}`,
          videoId: `sample${n}`,
          channel,
          channelUrl: null,
          channelId: null,
          time,
          header: channel.endsWith(" - Topic") ? "YouTube Music" : "YouTube",
          isAd: false
        });
      }
    }
    records.push({ title: "[\uC608\uC2DC] \uAD11\uACE0", url: "https://www.youtube.com/watch?v=sampleAd1", channel: "\uC608\uC2DC \uAD11\uACE0\uC8FC", time: end - 1e3, header: "YouTube", isAd: true });
    records.push({ title: "[\uC608\uC2DC] \uAD11\uACE0", url: "https://www.youtube.com/watch?v=sampleAd2", channel: "\uC608\uC2DC \uAD11\uACE0\uC8FC", time: end - 2e3, header: "YouTube", isAd: true });
    for (let i = 0; i < 3; i++) records.push({ title: "\uC0AD\uC81C\uB41C \uC601\uC0C1", url: null, channel: null, time: end - (i + 3) * 864e5, header: "YouTube", isAd: false });
    return { format: "sample", records, info: { skippedNonWatch: 0, missingTime: 0, rawCount: records.length, unknownTz: 0 } };
  }
  var SAMPLE_PREDICTION = { primary: "knowledge", secondary: ["music", "entertain"] };

  // js/charts.js
  var instances = /* @__PURE__ */ new Map();
  function css(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  var fmt = (n, d = 1) => Number(n).toLocaleString("ko-KR", { minimumFractionDigits: d, maximumFractionDigits: d });
  function ready(canvas) {
    if (!canvas) return false;
    if (typeof window.Chart === "undefined") {
      const box = canvas.parentElement;
      box.innerHTML = '<p class="chart-fallback">\uCC28\uD2B8 \uB77C\uC774\uBE0C\uB7EC\uB9AC\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD574 \uADF8\uB798\uD504 \uB300\uC2E0 \uC544\uB798 \uD45C\uC758 \uC218\uCE58\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694.</p>';
      return false;
    }
    window.Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
    window.Chart.defaults.font.size = 13;
    const old = instances.get(canvas.id);
    if (old) old.destroy();
    return true;
  }
  function baseOptions() {
    const ink = css("--ink");
    const muted = css("--muted");
    const line = css("--line");
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? false : { duration: 400 },
      plugins: { legend: { display: false }, tooltip: { backgroundColor: css("--ink"), titleColor: css("--bg"), bodyColor: css("--bg"), padding: 10 } },
      color: ink,
      scales: void 0,
      _muted: muted,
      _line: line
    };
  }
  function typeDonut(canvas, rows) {
    if (!ready(canvas)) return;
    const data = rows.filter((r) => r.count > 0);
    const o = baseOptions();
    o.cutout = "62%";
    o.plugins.tooltip.callbacks = {
      label: (ctx) => {
        const r = data[ctx.dataIndex];
        return ` ${r.label}: ${r.count.toLocaleString("ko-KR")}\uAC74 (${fmt(r.pct)}%)`;
      }
    };
    instances.set(canvas.id, new window.Chart(canvas, {
      type: "doughnut",
      data: { labels: data.map((r) => r.label), datasets: [{ data: data.map((r) => r.count), backgroundColor: data.map((r) => r.color), borderColor: css("--surface"), borderWidth: 2 }] },
      options: o
    }));
  }
  function hBar(canvas, items, { valueLabel = "\uAC74", colors } = {}) {
    if (!ready(canvas)) return;
    const o = baseOptions();
    o.indexAxis = "y";
    o.scales = {
      x: { beginAtZero: true, grid: { color: o._line }, ticks: { color: o._muted, precision: 0 } },
      y: { grid: { display: false }, ticks: { color: css("--ink"), callback(v) {
        const l = this.getLabelForValue(v);
        return l.length > 14 ? l.slice(0, 13) + "\u2026" : l;
      } } }
    };
    o.plugins.tooltip.callbacks = {
      title: (ctx) => items[ctx[0].dataIndex].name,
      label: (ctx) => {
        const it = items[ctx.dataIndex];
        return ` ${it.count.toLocaleString("ko-KR")}${valueLabel}${it.pct != null ? ` (${fmt(it.pct)}%)` : ""}`;
      }
    };
    instances.set(canvas.id, new window.Chart(canvas, {
      type: "bar",
      data: { labels: items.map((i) => i.name), datasets: [{ data: items.map((i) => i.count), backgroundColor: colors || css("--accent"), borderRadius: 4, barThickness: 16 }] },
      options: o
    }));
  }
  function vBar(canvas, items) {
    if (!ready(canvas)) return;
    const o = baseOptions();
    o.scales = {
      x: { grid: { display: false }, ticks: { color: o._muted } },
      y: { beginAtZero: true, grid: { color: o._line }, ticks: { color: o._muted, precision: 0 } }
    };
    o.plugins.tooltip.callbacks = { label: (ctx) => ` ${items[ctx.dataIndex].count.toLocaleString("ko-KR")}\uAC74` };
    instances.set(canvas.id, new window.Chart(canvas, {
      type: "bar",
      data: { labels: items.map((i) => i.name), datasets: [{ data: items.map((i) => i.count), backgroundColor: css("--accent"), borderRadius: 4 }] },
      options: o
    }));
  }
  function compareBars(canvas, types, labels) {
    if (!ready(canvas)) return;
    const o = baseOptions();
    o.plugins.legend = { display: true, labels: { color: css("--ink"), boxWidth: 12 } };
    o.scales = {
      x: { grid: { display: false }, ticks: { color: o._muted, autoSkip: false, maxRotation: 50, minRotation: 0 } },
      y: { beginAtZero: true, grid: { color: o._line }, ticks: { color: o._muted, callback: (v) => v + "%" } }
    };
    o.plugins.tooltip.callbacks = { label: (ctx) => ` ${ctx.dataset.label}: ${fmt(ctx.raw)}%` };
    instances.set(canvas.id, new window.Chart(canvas, {
      type: "bar",
      data: {
        labels: types.map((t) => t.label),
        datasets: [
          { label: labels[0], data: types.map((t) => t.prev), backgroundColor: css("--line"), borderRadius: 3 },
          { label: labels[1], data: types.map((t) => t.curr), backgroundColor: css("--accent"), borderRadius: 3 }
        ]
      },
      options: o
    }));
  }
  function destroyAll() {
    for (const c of instances.values()) c.destroy();
    instances.clear();
  }

  // js/explore.js
  function exploreQuery(typeId) {
    return Object.prototype.hasOwnProperty.call(EXPLORE_QUERIES, typeId) ? EXPLORE_QUERIES[typeId] : null;
  }
  function youtubeSearchUrl(typeId) {
    const q = exploreQuery(typeId);
    return q ? YOUTUBE_SEARCH_BASE + encodeURIComponent(q) : null;
  }

  // js/zip.js
  var SIG_EOCD = 101010256;
  var SIG_EOCD64_LOC = 117853008;
  var SIG_EOCD64 = 101075792;
  var SIG_CEN = 33639248;
  var SIG_LOC = 67324752;
  async function readBytes(blob, start, end) {
    return new DataView(await blob.slice(start, end).arrayBuffer());
  }
  var u64 = (dv, o) => dv.getUint32(o, true) + dv.getUint32(o + 4, true) * 4294967296;
  function decodeName(bytes, utf8Flag) {
    try {
      return new TextDecoder("utf-8", { fatal: !utf8Flag ? true : false }).decode(bytes);
    } catch {
      return new TextDecoder("utf-8").decode(bytes);
    }
  }
  async function listZipEntries(blob) {
    const size = blob.size;
    if (size < 22) throw new ParseError("zip \uD30C\uC77C\uC774 \uC190\uC0C1\uB418\uC5C8\uAC70\uB098 \uBE44\uC5B4 \uC788\uC5B4\uC694.", "Takeout\uC5D0\uC11C \uB2E4\uC2DC \uB0B4\uB824\uBC1B\uC740 zip \uD30C\uC77C\uC744 \uC62C\uB824 \uC8FC\uC138\uC694.");
    const tailStart = Math.max(0, size - 65557);
    const tail = await readBytes(blob, tailStart, size);
    let eocd = -1;
    for (let i = tail.byteLength - 22; i >= 0; i--) {
      if (tail.getUint32(i, true) === SIG_EOCD) {
        eocd = i;
        break;
      }
    }
    if (eocd < 0) throw new ParseError("zip \uD30C\uC77C \uAD6C\uC870\uB97C \uC77D\uC744 \uC218 \uC5C6\uC5B4\uC694.", "\uB2E4\uC6B4\uB85C\uB4DC\uAC00 \uC911\uAC04\uC5D0 \uB04A\uACBC\uC744 \uC218 \uC788\uC5B4\uC694. Takeout\uC5D0\uC11C zip\uC744 \uB2E4\uC2DC \uB0B4\uB824\uBC1B\uC544 \uC8FC\uC138\uC694.");
    let count = tail.getUint16(eocd + 10, true);
    let cenSize = tail.getUint32(eocd + 12, true);
    let cenOffset = tail.getUint32(eocd + 16, true);
    if (count === 65535 || cenSize === 4294967295 || cenOffset === 4294967295) {
      const loc = eocd - 20;
      if (loc >= 0 && tail.getUint32(loc, true) === SIG_EOCD64_LOC) {
        const eocd64Off = u64(tail, loc + 8);
        const e64 = await readBytes(blob, eocd64Off, eocd64Off + 56);
        if (e64.getUint32(0, true) === SIG_EOCD64) {
          count = u64(e64, 32);
          cenSize = u64(e64, 40);
          cenOffset = u64(e64, 48);
        }
      }
    }
    const cen = await readBytes(blob, cenOffset, cenOffset + cenSize);
    const entries = [];
    let p = 0;
    for (let n = 0; n < count && p + 46 <= cen.byteLength; n++) {
      if (cen.getUint32(p, true) !== SIG_CEN) break;
      const flags = cen.getUint16(p + 8, true);
      const method = cen.getUint16(p + 10, true);
      let compSize = cen.getUint32(p + 20, true);
      let size0 = cen.getUint32(p + 24, true);
      const nameLen = cen.getUint16(p + 28, true);
      const extraLen = cen.getUint16(p + 30, true);
      const commentLen = cen.getUint16(p + 32, true);
      let localOffset = cen.getUint32(p + 42, true);
      const nameBytes = new Uint8Array(cen.buffer, cen.byteOffset + p + 46, nameLen);
      const name = decodeName(nameBytes, (flags & 2048) !== 0);
      let e = p + 46 + nameLen;
      const eEnd = e + extraLen;
      while (e + 4 <= eEnd) {
        const id = cen.getUint16(e, true);
        const len = cen.getUint16(e + 2, true);
        if (id === 1) {
          let q = e + 4;
          if (size0 === 4294967295) {
            size0 = u64(cen, q);
            q += 8;
          }
          if (compSize === 4294967295) {
            compSize = u64(cen, q);
            q += 8;
          }
          if (localOffset === 4294967295) {
            localOffset = u64(cen, q);
            q += 8;
          }
        }
        e += 4 + len;
      }
      entries.push({ name, method, compSize, size: size0, localOffset, encrypted: (flags & 1) !== 0, isDir: name.endsWith("/") });
      p += 46 + nameLen + extraLen + commentLen;
    }
    return entries;
  }
  async function readZipEntry(blob, entry) {
    if (entry.encrypted) throw new ParseError("\uC554\uD638\uAC00 \uAC78\uB9B0 zip\uC740 \uC77D\uC744 \uC218 \uC5C6\uC5B4\uC694.", "\uC554\uD638 \uC5C6\uC774 \uB0B4\uBCF4\uB0B8 Takeout \uD30C\uC77C\uC744 \uC62C\uB824 \uC8FC\uC138\uC694.");
    const lh = await readBytes(blob, entry.localOffset, entry.localOffset + 30);
    if (lh.getUint32(0, true) !== SIG_LOC) throw new ParseError("zip \uC548\uC758 \uD30C\uC77C\uC744 \uC77D\uC744 \uC218 \uC5C6\uC5B4\uC694.", "zip \uD30C\uC77C\uC774 \uC190\uC0C1\uB418\uC5C8\uC744 \uC218 \uC788\uC5B4\uC694.");
    const start = entry.localOffset + 30 + lh.getUint16(26, true) + lh.getUint16(28, true);
    const data = blob.slice(start, start + entry.compSize);
    if (entry.method === 0) return new Uint8Array(await data.arrayBuffer());
    if (entry.method === 8) {
      if (typeof DecompressionStream === "undefined") {
        throw new ParseError("\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 zip \uC555\uCD95 \uD480\uAE30\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC544\uC694.", "\uCD5C\uC2E0 Chrome\xB7Edge\xB7Safari\xB7Firefox\uB97C \uC4F0\uAC70\uB098, \uC555\uCD95\uC744 \uD480\uC5B4 watch-history.json\uC744 \uC62C\uB824 \uC8FC\uC138\uC694.");
      }
      const stream = data.stream().pipeThrough(new DecompressionStream("deflate-raw"));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    }
    throw new ParseError("\uC9C0\uC6D0\uD558\uC9C0 \uC54A\uB294 zip \uC555\uCD95 \uBC29\uC2DD\uC774\uC5D0\uC694.", "\uC555\uCD95\uC744 \uD480\uC5B4 watch-history.json\uC744 \uC62C\uB824 \uC8FC\uC138\uC694.");
  }
  function candidateScore(name) {
    const lower = name.toLowerCase();
    const base = lower.split("/").pop();
    if (!/\.(json|html?)$/.test(base)) return -1;
    if (/search|검색|comment|댓글|subscription|구독|playlist|재생목록|channel|채널|live.?chat|채팅/.test(base)) return -1;
    let s = 0;
    if (/watch-history|시청\s?기록|watch history/.test(base)) s += 10;
    if (/watch-history|시청\s?기록|history|기록/.test(lower)) s += 3;
    if (/youtube/.test(lower)) s += 2;
    if (base.endsWith(".json")) s += 1;
    return s;
  }
  async function parseTakeoutZip(blob) {
    const entries = (await listZipEntries(blob)).filter((e) => !e.isDir);
    const candidates = entries.map((e) => ({ e, score: candidateScore(e.name) })).filter((c) => c.score >= 0).sort((a, b) => b.score - a.score || a.e.size - b.e.size);
    let lastError = null;
    for (const { e } of candidates.slice(0, 12)) {
      try {
        const bytes = await readZipEntry(blob, e);
        const text = new TextDecoder("utf-8").decode(bytes);
        const parsed = detectAndParse(text, e.name);
        return { parsed, innerName: e.name, entryCount: entries.length };
      } catch (err) {
        lastError = err;
      }
    }
    if (lastError && !(lastError instanceof ParseError)) throw lastError;
    throw new ParseError(
      "zip \uC548\uC5D0\uC11C YouTube \uC2DC\uCCAD\uAE30\uB85D\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.",
      'Takeout\uC5D0\uC11C "YouTube \uBC0F YouTube Music \u2192 \uAE30\uB85D"\uC744 \uD3EC\uD568\uD574 \uB0B4\uBCF4\uB0C8\uB294\uC9C0 \uD655\uC778\uD574 \uC8FC\uC138\uC694. \uAC80\uC0C9 \uAE30\uB85D\uB9CC \uB4E4\uC5B4 \uC788\uB294 zip\uC77C \uC218\uB3C4 \uC788\uC5B4\uC694.'
    );
  }

  // js/app.js
  var state = {
    db: null,
    index: null,
    dbError: null,
    upload: null,
    // { fileName, isSample, parsed, prepared, range }
    uploadError: null,
    periodId: DEFAULT_PERIOD,
    custom: { start: "", end: "" },
    result: null,
    savedId: null,
    prediction: storage.getPrediction()
  };
  var app = document.getElementById("app");
  var ROUTES = ["home", "predict", "upload", "analyzing", "result", "detail", "history"];
  var esc = (s) => String(s != null ? s : "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var n0 = (n) => Number(n).toLocaleString("ko-KR");
  var p1 = (n) => Number(n).toLocaleString("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  var ymd = (ms) => {
    const d = new Date(ms);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  };
  var isoDate = (ms) => {
    const d = new Date(ms);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  var frame = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
  var go = (route) => {
    if (location.hash !== "#" + route) location.hash = route;
    else render();
  };
  var activePrediction = () => state.upload && state.upload.isSample ? SAMPLE_PREDICTION : state.prediction;
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2400);
  }
  function typeLabel(id) {
    return TYPE_BY_ID[id] ? TYPE_BY_ID[id].label : id;
  }
  function dot(color) {
    return `<span class="dot" style="background:${color}"></span>`;
  }
  function sampleBanner() {
    if (!state.upload || !state.upload.isSample) return "";
    return `<div class="notice sample" role="note"><strong>\uC608\uC2DC \uB370\uC774\uD130\uB85C \uBCF4\uACE0 \uC788\uC5B4\uC694.</strong> \uC544\uB798 \uC218\uCE58\uB294 \uAC00\uC0C1\uC758 \uC2DC\uCCAD\uAE30\uB85D\uC73C\uB85C \uACC4\uC0B0\uD55C \uAC83\uC774\uBA70 \uB0B4 \uC2DC\uCCAD\uAE30\uB85D\uC774 \uC544\uB2C8\uC5D0\uC694. \uC608\uC2DC \uACB0\uACFC\uB294 \uC800\uC7A5\uB418\uC9C0 \uC54A\uC544\uC694. <a href="#upload">\uB0B4 \uD30C\uC77C \uC62C\uB9AC\uAE30</a></div>`;
  }
  async function loadDb() {
    try {
      const res = await fetch("data/channel-types.json", { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      state.db = await res.json();
      state.index = buildChannelIndex(state.db);
      if (state.index.problems.length) console.warn("\uCC44\uB110 DB \uD655\uC778 \uD544\uC694:", state.index.problems);
    } catch (e) {
      if (window.CHANNEL_DB) {
        state.db = window.CHANNEL_DB;
        state.index = buildChannelIndex(state.db);
        return;
      }
      state.dbError = "\uCC44\uB110 \uC720\uD615 DB(data/channel-types.json)\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uD30C\uC77C\uC744 \uC9C1\uC811 \uC5F4\uC5C8\uB2E4\uBA74 \uB85C\uCEEC \uC11C\uBC84\uB098 GitHub Pages\uC5D0\uC11C \uC2E4\uD589\uD574 \uC8FC\uC138\uC694.";
      console.error(e);
    }
  }
  function currentRoute() {
    const h = location.hash.replace("#", "");
    return ROUTES.includes(h) ? h : "home";
  }
  function render() {
    const route = currentRoute();
    destroyAll();
    document.querySelectorAll(".nav a").forEach((a) => {
      const target = a.getAttribute("href").slice(1);
      const on = target === route || target === "result" && (route === "detail" || route === "analyzing");
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    const view = { home: viewHome, predict: viewPredict, upload: viewUpload, analyzing: viewAnalyzing, result: viewResult, detail: viewDetail, history: viewHistory }[route];
    view();
    window.scrollTo(0, 0);
    const h = app.querySelector("h1");
    if (h) {
      h.setAttribute("tabindex", "-1");
      h.focus({ preventScroll: true });
    }
  }
  function viewHome() {
    const hist = storage.getHistory();
    app.innerHTML = `
  <section class="hero">
    <div class="stack" style="gap:16px">
      <p class="eyebrow">\uC720\uD29C\uBE0C \uC2DC\uCCAD \uD328\uD134 \uBC0F \uCD9C\uCC98 \uD3B8\uC911\uB3C4 \uC9C4\uB2E8</p>
      <h1>\uB0B4\uAC00 \uBCF4\uB294 \uC720\uD29C\uBE0C,<br><em>\uC0DD\uAC01\uD55C \uADF8\uB300\uB85C</em>\uC77C\uAE4C?</h1>
      <p class="lead">\uD3C9\uC18C \uB9CE\uC774 \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD558\uB294 \uC720\uD615\uC744 \uBA3C\uC800 \uACE0\uB974\uACE0, \uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D\uACFC \uBE44\uAD50\uD574 \uBCF4\uC138\uC694. \uC5B4\uB5A4 \uC720\uD615\uC744 \uC5BC\uB9C8\uB098 \uBD24\uB294\uC9C0, \uC2DC\uCCAD\uC774 \uBA87\uBA87 \uCC44\uB110\uC5D0 \uBAB0\uB824 \uC788\uB294\uC9C0 \uC22B\uC790\uB85C \uBCF4\uC5EC\uB4DC\uB824\uC694.</p>
      <div class="trust-row"><span class="pill">\uC11C\uBC84 \uC804\uC1A1 \uC5C6\uC74C</span><span class="pill">\uB85C\uADF8\uC778 \uC5C6\uC74C</span><span class="pill">\uACC4\uC0B0 \uADFC\uAC70 \uACF5\uAC1C</span></div>
      <div class="btn-row">
        <a class="btn primary" href="#predict" id="startBtn">\uBD84\uC11D \uC2DC\uC791\uD558\uAE30</a>
        <button class="btn" id="sampleBtn" type="button">\uC608\uC2DC \uB370\uC774\uD130\uB85C \uB458\uB7EC\uBCF4\uAE30</button>
        ${hist.length ? `<a class="btn" href="#history">\uC774\uC804 \uACB0\uACFC ${hist.length}\uAC1C</a>` : ""}
      </div>
    </div>
    <div class="label-card" aria-label="\uACB0\uACFC \uC608\uC2DC \uBBF8\uB9AC\uBCF4\uAE30">
      <div class="example-tag">\uACB0\uACFC \uC608\uC2DC \xB7 \uAC00\uC0C1 \uB370\uC774\uD130</div>
      <div class="label-title">\uB0B4 \uC2DC\uCCAD \uAD6C\uC131</div>
      <div class="label-meta"><span>\uCD1D \uC2DC\uCCAD\uAE30\uB85D 248\uAC74 \uAE30\uC900</span><span>\uCD5C\uADFC 6\uAC1C\uC6D4</span></div>
      <div class="label-head"><span>\uCF58\uD150\uCE20 \uC720\uD615</span><span>\uBE44\uC911</span></div>
      ${[["entertain", 34.7, true], ["knowledge", 16.5], ["music", 15.7], ["vlog", 8.5], ["unclassified", 14.1]].map(([id, pct, top]) => `
        <div class="label-row ${top ? "top" : ""}">${dot(TYPE_BY_ID[id].color)}<span class="name">${typeLabel(id)}</span><span></span><span class="pct num">${p1(pct)}%</span><span class="bar"><i style="width:${pct}%;background:${TYPE_BY_ID[id].color}"></i></span></div>`).join("")}
      <div class="label-foot">\uCC44\uB110 \uC9D1\uC911\uB3C4 HHI 612 \xB7 \uC0C1\uC704 3\uAC1C \uCC44\uB110 CR3 52.0%</div>
    </div>
  </section>

  <section class="card stack">
    <h2>3\uB2E8\uACC4\uBA74 \uB05D\uB098\uC694</h2>
    <ol class="steps">
      <li><b>\uB0B4\uAC00 \uC0DD\uAC01\uD558\uB294 \uB098</b><span>\uD3C9\uC18C \uAC00\uC7A5 \uB9CE\uC774 \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD558\uB294 \uC720\uD615\uC744 \uACE8\uB77C\uC694.</span></li>
      <li><b>\uC2DC\uCCAD\uAE30\uB85D \uC62C\uB9AC\uAE30</b><span>Google Takeout\uC5D0\uC11C \uBC1B\uC740 \uC2DC\uCCAD\uAE30\uB85D \uD30C\uC77C\uC744 \uC62C\uB824\uC694.</span></li>
      <li><b>\uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D \uC18D \uB098</b><span>\uC720\uD615\uBCC4 \uBE44\uC911, \uCC44\uB110 \uC9D1\uC911\uB3C4, \uC608\uC0C1\uACFC\uC758 \uCC28\uC774\uB97C \uD655\uC778\uD574\uC694.</span></li>
    </ol>
  </section>

  <section class="grid-2">
    <div class="card stack">
      <h2>\uC2DC\uCCAD\uAE30\uB85D \uD30C\uC77C \uBC1B\uB294 \uBC29\uBC95</h2>
      <ol class="guide">
        <li><a href="https://takeout.google.com/" target="_blank" rel="noopener">takeout.google.com</a>\uC5D0 \uC811\uC18D\uD574 <b>\uBAA8\uB450 \uC120\uD0DD \uD574\uC81C</b>\uB97C \uB204\uB985\uB2C8\uB2E4.</li>
        <li><b>YouTube \uBC0F YouTube Music</b>\uB9CC \uC120\uD0DD\uD569\uB2C8\uB2E4.</li>
        <li><b>\uBAA8\uB4E0 YouTube \uB370\uC774\uD130 \uD3EC\uD568\uB428</b>\uC744 \uB20C\uB7EC <b>\uAE30\uB85D</b>\uB9CC \uB0A8\uAE41\uB2C8\uB2E4.</li>
        <li><b>\uC5EC\uB7EC \uD615\uC2DD</b>\uC5D0\uC11C \uAE30\uB85D \uD615\uC2DD\uC744 <b>JSON</b>\uC73C\uB85C \uBC14\uAFC9\uB2C8\uB2E4. (HTML\uB3C4 \uC77D\uC744 \uC218 \uC788\uC5B4\uC694)</li>
        <li>\uB0B4\uBCF4\uB0B4\uAE30\uAC00 \uB05D\uB098\uBA74 \uBC1B\uC740 <b>zip \uD30C\uC77C\uC744 \uADF8\uB300\uB85C</b> \uC62C\uB9AC\uBA74 \uB3FC\uC694. \uC555\uCD95\uC744 \uD480\uC5C8\uB2E4\uBA74 <b>\uC2DC\uCCAD \uAE30\uB85D</b> \uD3F4\uB354\uC758 <code>watch-history.json</code>\uC744 \uC62C\uB824\uB3C4 \uB3FC\uC694.</li>
      </ol>
    </div>
    <div class="card stack">
      <h2>\uC774 \uC11C\uBE44\uC2A4\uAC00 \uD558\uC9C0 \uC54A\uB294 \uAC83</h2>
      <p class="small">\uC2DC\uCCAD \uC2B5\uAD00\uC744 \uC88B\uACE0 \uB098\uC068\uC73C\uB85C \uD3C9\uAC00\uD558\uC9C0 \uC54A\uC544\uC694. \uC815\uCE58\uC801 \uC131\uD5A5, \uCF58\uD150\uCE20\uC758 \uC2E0\uB8B0\uB3C4\uB098 \uC815\uD655\uC131, \uC54C\uACE0\uB9AC\uC998 \uD3B8\uD5A5\uB3C4 \uD310\uC815\uD558\uC9C0 \uC54A\uC544\uC694. \uC5B4\uB5A4 \uC720\uD615\uC744 \uC5BC\uB9C8\uB098 \uBD24\uB294\uC9C0, \uC2DC\uCCAD\uC774 \uBA87\uBA87 \uCC44\uB110\uC5D0 \uC5BC\uB9C8\uB098 \uBAB0\uB824 \uC788\uB294\uC9C0\uB97C \uAC74\uC218\uB85C \uBCF4\uC5EC\uC904 \uBFD0\uC774\uC5D0\uC694.</p>
      <p class="small muted">\uC2DC\uCCAD \uC2DC\uAC04\uC740 Takeout \uD30C\uC77C\uC5D0 \uC5C6\uC5B4\uC11C \uC4F0\uC9C0 \uC54A\uC544\uC694. \uBAA8\uB4E0 \uBE44\uC911\uC740 \uC2DC\uCCAD\uAE30\uB85D <b>\uAC74\uC218</b> \uAE30\uC900\uC774\uC5D0\uC694.</p>
    </div>
  </section>`;
    document.getElementById("sampleBtn").addEventListener("click", startSample);
  }
  function startSample() {
    const parsed = makeSampleRecords();
    const prep = prepareRecords(parsed.records);
    state.upload = { fileName: "\uC608\uC2DC \uB370\uC774\uD130", isSample: true, parsed, prepared: prep, range: dataRange(prep.records) };
    state.periodId = DEFAULT_PERIOD;
    state.result = null;
    state.savedId = null;
    go("analyzing");
  }
  function viewPredict() {
    const pred = state.prediction || { primary: null, secondary: [] };
    const choices = (name, kind) => CONTENT_TYPES.map((t) => `
    <div class="choice">
      <input type="${kind}" name="${name}" id="${name}-${t.id}" value="${t.id}">
      <label for="${name}-${t.id}">${dot(t.color)}${t.label}<span class="mark" aria-hidden="true"></span></label>
    </div>`).join("");
    app.innerHTML = `
  <header class="stack">
    <p class="eyebrow">1\uB2E8\uACC4 \xB7 \uB0B4\uAC00 \uC0DD\uAC01\uD558\uB294 \uB098</p>
    <h1 class="page-title">\uD3C9\uC18C \uC5B4\uB5A4 \uC601\uC0C1\uC744 \uB9CE\uC774 \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD558\uB098\uC694?</h1>
    <p class="lead">\uC815\uB2F5\uC740 \uC5C6\uC5B4\uC694. \uC9C0\uAE08 \uB5A0\uC624\uB974\uB294 \uB300\uB85C \uACE8\uB77C \uC8FC\uC138\uC694. \uC774 \uC120\uD0DD\uC740 \uB098\uC758 <b>\uC790\uAE30 \uC778\uC2DD</b>\uC774\uACE0, \uCE21\uC815\uAC12\uC774 \uC544\uB2C8\uC5D0\uC694. \uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D\uACFC \uB098\uB780\uD788 \uB193\uACE0 \uBE44\uAD50\uD560 \uB54C\uB9CC \uC4F0\uC5EC\uC694.</p>
  </header>
  <form id="predForm" class="stack" style="gap:20px" novalidate>
    <div class="card stack">
      <h2>\uAC00\uC7A5 \uB9CE\uC774 \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD558\uB294 \uC720\uD615 <span class="pill accent">1\uAC1C \uC120\uD0DD</span></h2>
      <div class="choice-grid" role="radiogroup" aria-label="\uAC00\uC7A5 \uB9CE\uC774 \uBCF4\uB294 \uC720\uD615">${choices("primary", "radio")}</div>
    </div>
    <div class="card stack">
      <h2>\uADF8\uB2E4\uC74C\uC73C\uB85C \uC790\uC8FC \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD558\uB294 \uC720\uD615 <span class="pill">\uCD5C\uB300 2\uAC1C \xB7 \uC120\uD0DD \uC0AC\uD56D</span></h2>
      <div class="choice-grid" aria-label="\uC790\uC8FC \uBCF4\uB294 \uC720\uD615">${choices("secondary", "checkbox")}</div>
      <p class="small muted" id="secHint">\uAC00\uC7A5 \uB9CE\uC774 \uBCF8\uB2E4\uACE0 \uACE0\uB978 \uC720\uD615\uC740 \uC5EC\uAE30\uC11C \uC120\uD0DD\uD560 \uC218 \uC5C6\uC5B4\uC694.</p>
    </div>
    <p id="predError" class="notice warn" hidden></p>
    <div class="btn-row">
      <button class="btn primary" type="submit" id="predSave">\uC800\uC7A5\uD558\uACE0 \uC2DC\uCCAD\uAE30\uB85D \uC62C\uB9AC\uAE30</button>
      <a class="btn" href="#upload" id="predSkip">\uC608\uC0C1 \uC5C6\uC774 \uAC74\uB108\uB6F0\uAE30</a>
      ${state.prediction ? '<button class="btn danger" type="button" id="predClear">\uC800\uC7A5\uB41C \uC608\uC0C1 \uC9C0\uC6B0\uAE30</button>' : ""}
    </div>
    <p class="small muted">\uAC74\uB108\uB6F0\uBA74 \uACB0\uACFC \uD654\uBA74\uC5D0\uC11C \u2018\uB0B4\uAC00 \uC0DD\uAC01\uD558\uB294 \uB098\u2019 \uBE44\uAD50\uB294 \uBCF4\uC774\uC9C0 \uC54A\uC544\uC694. \uC120\uD0DD\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uC800\uC7A5\uB3FC\uC694.</p>
  </form>`;
    const form = document.getElementById("predForm");
    const prim = [...form.querySelectorAll("input[name=primary]")];
    const sec = [...form.querySelectorAll("input[name=secondary]")];
    prim.forEach((i) => {
      i.checked = i.value === pred.primary;
    });
    sec.forEach((i) => {
      i.checked = (pred.secondary || []).includes(i.value);
    });
    const sync = () => {
      const p = (prim.find((i) => i.checked) || {}).value;
      sec.forEach((i) => {
        if (i.value === p) i.checked = false;
      });
      const count = sec.filter((i) => i.checked).length;
      sec.forEach((i) => {
        i.disabled = i.value === p || !i.checked && count >= 2;
      });
      prim.forEach((i) => {
        i.nextElementSibling.querySelector(".mark").textContent = i.checked ? "\uAC00\uC7A5 \uB9CE\uC774" : "";
      });
      sec.forEach((i) => {
        i.nextElementSibling.querySelector(".mark").textContent = i.checked ? "\uC790\uC8FC" : "";
      });
      document.getElementById("predError").hidden = true;
    };
    form.addEventListener("change", sync);
    sync();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const p = (prim.find((i) => i.checked) || {}).value;
      if (!p) {
        const err = document.getElementById("predError");
        err.textContent = "\uAC00\uC7A5 \uB9CE\uC774 \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD558\uB294 \uC720\uD615\uC744 1\uAC1C \uACE8\uB77C \uC8FC\uC138\uC694. \uACE0\uB974\uC9C0 \uC54A\uC73C\uB824\uBA74 \u2018\uC608\uC0C1 \uC5C6\uC774 \uAC74\uB108\uB6F0\uAE30\u2019\uB97C \uB20C\uB7EC \uC8FC\uC138\uC694.";
        err.hidden = false;
        return;
      }
      state.prediction = { primary: p, secondary: sec.filter((i) => i.checked).map((i) => i.value) };
      if (!storage.setPrediction(state.prediction)) toast("\uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C\uB294 \uC800\uC7A5\uD560 \uC218 \uC5C6\uC5B4 \uC774\uBC88 \uBC29\uBB38 \uB3D9\uC548\uB9CC \uAE30\uC5B5\uD574\uC694.");
      if (state.result && !state.upload.isSample) state.result.comparison = comparePrediction(state.prediction, state.result.types);
      go("upload");
    });
    const clr = document.getElementById("predClear");
    if (clr) clr.addEventListener("click", () => {
      storage.clearPrediction();
      state.prediction = null;
      toast("\uC800\uC7A5\uB41C \uC608\uC0C1\uC744 \uC9C0\uC6E0\uC5B4\uC694.");
      render();
    });
  }
  function periodControls(idPrefix) {
    return `
  <div class="fields">
    <div class="field">
      <label for="${idPrefix}-period">\uBD84\uC11D \uAE30\uAC04</label>
      <select id="${idPrefix}-period">${PERIOD_OPTIONS.map((o) => `<option value="${o.id}" ${o.id === state.periodId ? "selected" : ""}>${o.label}</option>`).join("")}</select>
    </div>
    <div class="field" data-custom ${state.periodId === "custom" ? "" : "hidden"}>
      <label for="${idPrefix}-start">\uC2DC\uC791\uC77C</label>
      <input type="date" id="${idPrefix}-start" value="${state.custom.start}">
    </div>
    <div class="field" data-custom ${state.periodId === "custom" ? "" : "hidden"}>
      <label for="${idPrefix}-end">\uC885\uB8CC\uC77C</label>
      <input type="date" id="${idPrefix}-end" value="${state.custom.end}">
    </div>
  </div>`;
  }
  function bindPeriod(idPrefix, onChange) {
    const sel = document.getElementById(`${idPrefix}-period`);
    const s = document.getElementById(`${idPrefix}-start`);
    const e = document.getElementById(`${idPrefix}-end`);
    sel.addEventListener("change", () => {
      state.periodId = sel.value;
      if (sel.value === "custom" && state.upload && !state.custom.start) {
        state.custom = { start: isoDate(state.upload.range.min), end: isoDate(state.upload.range.max) };
        s.value = state.custom.start;
        e.value = state.custom.end;
      }
      document.querySelectorAll("[data-custom]").forEach((el) => {
        el.hidden = sel.value !== "custom";
      });
      onChange();
    });
    [s, e].forEach((inp) => inp.addEventListener("change", () => {
      state.custom = { start: s.value, end: e.value };
      onChange();
    }));
  }
  function currentPeriod() {
    if (!state.upload) return null;
    return resolvePeriod(state.periodId, state.upload.range, state.custom);
  }
  function viewUpload() {
    const pred = state.prediction;
    app.innerHTML = `
  <header class="stack">
    <p class="eyebrow">2\uB2E8\uACC4 \xB7 \uC2DC\uCCAD\uAE30\uB85D \uC62C\uB9AC\uAE30</p>
    <h1 class="page-title">YouTube \uC2DC\uCCAD\uAE30\uB85D \uD30C\uC77C\uC744 \uC62C\uB824 \uC8FC\uC138\uC694</h1>
    <p class="lead">Google Takeout\uC5D0\uC11C \uBC1B\uC740 <b>zip \uD30C\uC77C\uC744 \uADF8\uB300\uB85C</b> \uC62C\uB9AC\uAC70\uB098, \uC555\uCD95\uC744 \uD47C <code>watch-history.json</code>\xB7<code>watch-history.html</code>\uC744 \uC62C\uB9AC\uC138\uC694. \uC774 \uBE0C\uB77C\uC6B0\uC800 \uC548\uC5D0\uC11C \uBC14\uB85C \uC77D\uACE0, \uD30C\uC77C\uC740 \uC5B4\uB514\uC5D0\uB3C4 \uC804\uC1A1\uB418\uAC70\uB098 \uC800\uC7A5\uB418\uC9C0 \uC54A\uC544\uC694.</p>
  </header>
  ${state.dbError ? `<p class="notice warn">${esc(state.dbError)}</p>` : ""}
  <div class="notice small">${pred ? `\uC608\uC0C1 \uC800\uC7A5\uB428: \uAC00\uC7A5 \uB9CE\uC774 <b>${typeLabel(pred.primary)}</b>${pred.secondary.length ? `, \uC790\uC8FC ${pred.secondary.map(typeLabel).join(", ")}` : ""} \xB7 <a href="#predict">\uBC14\uAFB8\uAE30</a>` : '\uC544\uC9C1 \uC608\uC0C1\uC744 \uACE0\uB974\uC9C0 \uC54A\uC558\uC5B4\uC694. \uACB0\uACFC\uC5D0\uC11C \uBE44\uAD50\uD558\uB824\uBA74 <a href="#predict">\uBA3C\uC800 \uC608\uC0C1\uC744 \uACE8\uB77C \uC8FC\uC138\uC694</a>.'}</div>
  <label class="drop" id="drop" for="fileInput">
    <span class="drop-icon" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="m6 10 6-6 6 6"/><path d="M4 20h16"/></svg></span>
    <span class="big">\uD30C\uC77C\uC744 \uC5EC\uAE30\uB85C \uB04C\uC5B4\uB2E4 \uB193\uAC70\uB098 \uB20C\uB7EC\uC11C \uC120\uD0DD\uD558\uC138\uC694</span>
    <span class="small muted">Takeout zip \uADF8\uB300\uB85C \xB7 JSON \xB7 HTML \uBAA8\uB450 \uAC00\uB2A5</span>
    <input type="file" id="fileInput" accept=".zip,.json,.html,.htm,application/zip,application/x-zip-compressed,application/json,text/html" hidden>
    <span class="btn small" aria-hidden="true">\uD30C\uC77C \uC120\uD0DD</span>
  </label>
  <div id="uploadStatus"></div>`;
    const drop = document.getElementById("drop");
    const input = document.getElementById("fileInput");
    input.addEventListener("change", () => {
      if (input.files[0]) handleFile(input.files[0]);
    });
    ["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.add("drag");
    }));
    ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.remove("drag");
    }));
    drop.addEventListener("drop", (e) => {
      const f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) handleFile(f);
    });
    renderUploadStatus();
  }
  async function handleFile(file) {
    state.uploadError = null;
    state.result = null;
    state.savedId = null;
    const box = document.getElementById("uploadStatus");
    box.innerHTML = '<div class="card"><p>\uD30C\uC77C\uC744 \uC77D\uB294 \uC911\uC774\uC5D0\uC694\u2026</p></div>';
    const name = file.name || "";
    try {
      if (!/\.(zip|json|html?)$/i.test(name)) throw new ParseError("\uC9C0\uC6D0\uD558\uC9C0 \uC54A\uB294 \uD30C\uC77C \uD615\uC2DD\uC774\uC5D0\uC694.", "Takeout zip \uD30C\uC77C\uC774\uB098 watch-history.json\xB7watch-history.html \uD30C\uC77C\uC744 \uC62C\uB824 \uC8FC\uC138\uC694.");
      if (file.size === 0) throw new ParseError("\uBE48 \uD30C\uC77C\uC774\uC5D0\uC694.", "Takeout\uC5D0\uC11C \uB2E4\uC2DC \uB0B4\uBCF4\uB0B8 \uD30C\uC77C\uC744 \uC62C\uB824 \uC8FC\uC138\uC694.");
      let parsed;
      let innerName = null;
      if (/\.zip$/i.test(name)) {
        box.innerHTML = '<div class="card"><p>zip \uC548\uC5D0\uC11C \uC2DC\uCCAD\uAE30\uB85D \uD30C\uC77C\uC744 \uCC3E\uB294 \uC911\uC774\uC5D0\uC694\u2026</p></div>';
        const z = await parseTakeoutZip(file);
        parsed = z.parsed;
        innerName = z.innerName;
      } else {
        const text = await file.text();
        await frame();
        parsed = detectAndParse(text, name);
      }
      const prep = prepareRecords(parsed.records);
      if (!prep.records.length) throw new ParseError("\uAD11\uACE0\uC640 \uC911\uBCF5\uC744 \uBE7C\uACE0 \uB098\uB2C8 \uBD84\uC11D\uD560 \uAE30\uB85D\uC774 \uB0A8\uC9C0 \uC54A\uC558\uC5B4\uC694.", "\uB2E4\uB978 \uAE30\uAC04\uC758 \uC2DC\uCCAD\uAE30\uB85D \uD30C\uC77C\uC778\uC9C0 \uD655\uC778\uD574 \uC8FC\uC138\uC694.");
      state.upload = { fileName: name, innerName, isSample: false, parsed, prepared: prep, range: dataRange(prep.records) };
      state.custom = { start: "", end: "" };
      if (state.periodId === "custom") state.periodId = DEFAULT_PERIOD;
    } catch (e) {
      state.upload = null;
      state.uploadError = e instanceof ParseError ? { message: e.message, hint: e.hint } : { message: "\uD30C\uC77C\uC744 \uCC98\uB9AC\uD558\uB294 \uC911\uC5D0 \uBB38\uC81C\uAC00 \uC0DD\uACBC\uC5B4\uC694.", hint: String(e.message || e) };
      if (!(e instanceof ParseError)) console.error(e);
    }
    renderUploadStatus();
  }
  function renderUploadStatus() {
    const box = document.getElementById("uploadStatus");
    if (!box) return;
    if (state.uploadError) {
      box.innerHTML = `<div class="notice warn" role="alert"><strong>${esc(state.uploadError.message)}</strong><br>${esc(state.uploadError.hint)}</div>`;
      return;
    }
    const u = state.upload;
    if (!u || u.isSample) {
      box.innerHTML = "";
      return;
    }
    const { parsed, prepared, range } = u;
    const noChannel = prepared.records.filter((r) => !r.channel).length;
    const info = parsed.info;
    box.innerHTML = `
  <section class="card stack" aria-live="polite">
    <h2>\uD30C\uC77C \uD655\uC778 \uACB0\uACFC <span class="pill accent">${parsed.format.toUpperCase()}</span></h2>
    <p class="small muted">${esc(u.fileName)}${u.innerName ? ` \u2192 zip \uC548\uC758 <code>${esc(u.innerName)}</code>\uB97C \uCC3E\uC544 \uC77D\uC5C8\uC5B4\uC694` : ""}</p>
    <ul class="checklist">
      <li><span class="ok"></span><span>\uD30C\uC77C \uD615\uC2DD\uC744 \uC77D\uC5C8\uC5B4\uC694 (${parsed.format === "json" ? "JSON" : "HTML"})</span><span class="num">${n0(info.rawCount)}\uAC1C \uD56D\uBAA9</span></li>
      <li><span class="ok"></span><span>\uD544\uC218 \uC815\uBCF4(\uC2DC\uCCAD \uC2DC\uAC01)\uB97C \uC77D\uC740 \uC2DC\uCCAD\uAE30\uB85D</span><span class="num">${n0(parsed.records.length)}\uAC74</span></li>
      <li><span class="info"></span><span>\uAD11\uACE0\uB85C \uD45C\uC2DC\uB41C \uAE30\uB85D \xB7 \uBD84\uC11D\uC5D0\uC11C \uC81C\uC678</span><span class="num">${n0(prepared.ads)}\uAC74</span></li>
      <li><span class="${prepared.duplicates ? "bad" : "info"}"></span><span>\uAC19\uC740 \uC2DC\uAC01\xB7\uAC19\uC740 \uC601\uC0C1\uC758 \uC911\uBCF5 \uAE30\uB85D \xB7 \uC81C\uC678</span><span class="num">${n0(prepared.duplicates)}\uAC74</span></li>
      ${info.skippedNonWatch ? `<li><span class="info"></span><span>\uAC80\uC0C9 \uB4F1 \uC2DC\uCCAD\uC774 \uC544\uB2CC \uD56D\uBAA9 \xB7 \uC81C\uC678</span><span class="num">${n0(info.skippedNonWatch)}\uAC74</span></li>` : ""}
      ${info.missingTime ? `<li><span class="bad"></span><span>\uB0A0\uC9DC\uB97C \uC77D\uC9C0 \uBABB\uD55C \uD56D\uBAA9 \xB7 \uC81C\uC678</span><span class="num">${n0(info.missingTime)}\uAC74</span></li>` : ""}
      ${info.unknownTz ? `<li><span class="bad"></span><span>\uC2DC\uAC04\uB300\uB97C \uC54C \uC218 \uC5C6\uC5B4 UTC\uB85C \uCC98\uB9AC\uD55C \uD56D\uBAA9</span><span class="num">${n0(info.unknownTz)}\uAC74</span></li>` : ""}
      <li><span class="info"></span><span>\uCC44\uB110 \uC815\uBCF4\uAC00 \uC5C6\uB294 \uAE30\uB85D(\uC0AD\uC81C\xB7\uBE44\uACF5\uAC1C \uC601\uC0C1 \uB4F1) \xB7 \uC720\uD615\uC740 \u2018\uBBF8\uBD84\uB958\u2019, \uC9D1\uC911\uB3C4 \uACC4\uC0B0\uC5D0\uC11C\uB294 \uC81C\uC678</span><span class="num">${n0(noChannel)}\uAC74</span></li>
      <li><span class="ok"></span><span>\uBD84\uC11D \uAC00\uB2A5\uD55C \uAE30\uB85D \xB7 ${ymd(range.min)} ~ ${ymd(range.max)}</span><span class="num"><b>${n0(prepared.records.length)}\uAC74</b></span></li>
    </ul>
  </section>
  <section class="card stack">
    <h2>\uBD84\uC11D \uAE30\uAC04</h2>
    <p class="small muted">\u2018\uCD5C\uADFC N\uAC1C\uC6D4\u2019\uC740 \uD30C\uC77C \uC548\uC758 \uAC00\uC7A5 \uCD5C\uADFC \uC2DC\uCCAD \uB0A0\uC9DC(${ymd(range.max)})\uB97C \uAE30\uC900\uC73C\uB85C \uACC4\uC0B0\uD574\uC694.</p>
    ${periodControls("up")}
    <p id="periodCount" class="small"></p>
    <div class="btn-row"><button class="btn primary" id="analyzeBtn" type="button">\uBD84\uC11D \uC2DC\uC791</button></div>
  </section>`;
    const update = () => {
      const p = currentPeriod();
      const el = document.getElementById("periodCount");
      const btn = document.getElementById("analyzeBtn");
      if (!p) {
        el.innerHTML = '<span class="notice warn" style="display:block">\uC2DC\uC791\uC77C\uC774 \uC885\uB8CC\uC77C\uBCF4\uB2E4 \uB2A6\uC5B4\uC694. \uB0A0\uC9DC\uB97C \uB2E4\uC2DC \uACE8\uB77C \uC8FC\uC138\uC694.</span>';
        btn.disabled = true;
        return;
      }
      const cnt = filterByPeriod(u.prepared.records, p).length;
      el.innerHTML = cnt ? `\uC120\uD0DD\uD55C \uAE30\uAC04(${ymd(p.start)} ~ ${ymd(p.end)})\uC758 \uC2DC\uCCAD\uAE30\uB85D <b class="num">${n0(cnt)}\uAC74</b>\uC744 \uBD84\uC11D\uD574\uC694.` : `<span class="notice warn" style="display:block">\uC120\uD0DD\uD55C \uAE30\uAC04(${ymd(p.start)} ~ ${ymd(p.end)})\uC5D0\uB294 \uC2DC\uCCAD\uAE30\uB85D\uC774 \uC5C6\uC5B4\uC694. \uAE30\uAC04\uC744 \uB113\uD600 \uC8FC\uC138\uC694.</span>`;
      btn.disabled = !cnt || !!state.dbError;
    };
    bindPeriod("up", update);
    update();
    document.getElementById("analyzeBtn").addEventListener("click", () => {
      state.result = null;
      state.savedId = null;
      go("analyzing");
    });
  }
  async function viewAnalyzing() {
    if (!state.upload) {
      go("upload");
      return;
    }
    if (state.dbError) {
      go("upload");
      return;
    }
    const steps = [
      ["period", "\uBD84\uC11D \uAE30\uAC04 \uC801\uC6A9"],
      ["db", "\uCC44\uB110 \uC720\uD615 DB \uBD88\uB7EC\uC624\uAE30"],
      ["classify", "\uCC44\uB110\uBCC4 \uCF58\uD150\uCE20 \uC720\uD615 \uBD84\uB958"],
      ["concentration", "\uCC44\uB110 \uC9D1\uC911\uB3C4(HHI\xB7CR3) \uACC4\uC0B0"],
      ["compare", "\uB0B4 \uC608\uC0C1\uACFC \uBE44\uAD50"]
    ];
    app.innerHTML = `
  ${sampleBanner()}
  <header class="stack">
    <p class="eyebrow">3\uB2E8\uACC4 \xB7 \uBD84\uC11D \uC911</p>
    <h1 class="page-title">\uC2DC\uCCAD\uAE30\uB85D\uC744 \uBD84\uC11D\uD558\uACE0 \uC788\uC5B4\uC694</h1>
    <p class="lead">\uBAA8\uB4E0 \uACC4\uC0B0\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800 \uC548\uC5D0\uC11C \uC774\uB8E8\uC5B4\uC838\uC694.</p>
  </header>
  <section class="card"><ol class="progress-list">${steps.map(([id, l]) => `<li id="st-${id}"><span class="st" aria-hidden="true"></span><span>${l}</span><span class="small muted num" data-v></span></li>`).join("")}</ol></section>
  <div class="btn-row" id="doneRow" hidden><a class="btn primary" href="#result" id="toResult">\uACB0\uACFC \uBCF4\uAE30</a></div>`;
    const set = (id, cls, v) => {
      const li = document.getElementById(`st-${id}`);
      if (!li) return;
      li.className = cls;
      if (v != null) li.querySelector("[data-v]").textContent = v;
    };
    const period = currentPeriod();
    set("period", "run");
    await frame();
    if (!period) {
      set("period", "fail", "\uAE30\uAC04 \uC624\uB958");
      return;
    }
    const inPeriod = filterByPeriod(state.upload.prepared.records, period);
    set("period", inPeriod.length ? "done" : "fail", `${period.label} \xB7 ${n0(inPeriod.length)}\uAC74`);
    if (!inPeriod.length) {
      app.insertAdjacentHTML("beforeend", '<p class="notice warn">\uC120\uD0DD\uD55C \uAE30\uAC04\uC5D0 \uC2DC\uCCAD\uAE30\uB85D\uC774 \uC5C6\uC5B4\uC694. <a href="#upload">\uAE30\uAC04\uC744 \uBC14\uAFD4 \uC8FC\uC138\uC694.</a></p>');
      return;
    }
    set("db", "run");
    await frame();
    set("db", "done", `\uB4F1\uB85D \uCC44\uB110 ${n0(state.index.size)}\uAC1C`);
    set("classify", "run");
    await frame();
    const result = analyze(state.upload.prepared.records, period, state.index, activePrediction());
    set("classify", "done", `\uBD84\uB958 ${n0(result.types.classifiedCount)}\uAC74 \xB7 \uBBF8\uBD84\uB958 ${n0(result.types.unclassifiedCount)}\uAC74`);
    set("concentration", "run");
    await frame();
    set("concentration", "done", `\uCC44\uB110 ${n0(result.concentration.channelCount)}\uAC1C \xB7 HHI ${n0(Math.round(result.concentration.hhi))}`);
    set("compare", "run");
    await frame();
    const cmp = result.comparison;
    set("compare", "done", cmp.status === "no-prediction" ? "\uC608\uC0C1 \uC5C6\uC74C" : cmp.status === "no-actual" ? "\uBD84\uB958\uB41C \uAE30\uB85D \uC5C6\uC74C" : cmp.status === "match" ? "\uC77C\uCE58" : "\uB2E4\uB984");
    state.result = result;
    state.savedId = null;
    const row = document.getElementById("doneRow");
    if (row) {
      row.hidden = false;
      document.getElementById("toResult").focus();
    }
  }
  function emptyResult() {
    app.innerHTML = `
  <section class="card empty">
    <h1 class="page-title" style="font-size:28px">\uC544\uC9C1 \uBD84\uC11D\uD55C \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694</h1>
    <p class="muted">\uC2DC\uCCAD\uAE30\uB85D \uD30C\uC77C\uC744 \uC62C\uB9AC\uBA74 \uC774\uACF3\uC5D0 \uACB0\uACFC\uAC00 \uD45C\uC2DC\uB3FC\uC694. \uC0C8\uB85C\uACE0\uCE68\uD558\uBA74 \uACB0\uACFC\uB294 \uC0AC\uB77C\uC9C0\uACE0, \uC800\uC7A5\uD55C \uACB0\uACFC\uB294 \u2018\uC774\uC804 \uACB0\uACFC\u2019\uC5D0\uC11C \uBCFC \uC218 \uC788\uC5B4\uC694.</p>
    <div class="btn-row" style="justify-content:center">
      <a class="btn primary" href="#upload">\uC2DC\uCCAD\uAE30\uB85D \uC62C\uB9AC\uAE30</a>
      <a class="btn" href="#history">\uC774\uC804 \uACB0\uACFC \uBCF4\uAE30</a>
    </div>
  </section>`;
  }
  function comparisonCard(cmp, pred) {
    const mine = pred && pred.primary ? `<div class="t">${typeLabel(pred.primary)}</div>${pred.secondary && pred.secondary.length ? `<div class="small">\uC790\uC8FC \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD55C \uC720\uD615: ${pred.secondary.map(typeLabel).join(", ")}</div>` : ""}<div class="small muted">\uBD84\uC11D \uC804\uC5D0 \uB0B4\uAC00 \uACE0\uB978 \uC790\uAE30 \uC778\uC2DD\uC774\uC5D0\uC694.</div>` : `<div class="small">\uC544\uC9C1 \uC608\uC0C1\uC744 \uACE0\uB974\uC9C0 \uC54A\uC558\uC5B4\uC694.</div><a class="btn small" href="#predict">\uC608\uC0C1 \uACE0\uB974\uAE30</a>`;
    const r = state.result.types.representative;
    const real = r ? `<div class="t">${r.label}</div><div class="small">\uC804\uCCB4 \uC2DC\uCCAD\uAE30\uB85D\uC758 <b class="num">${p1(r.pct)}%</b> (${n0(r.count)}\uAC74)</div><div class="small muted">\uC5C5\uB85C\uB4DC\uD55C \uC2DC\uCCAD\uAE30\uB85D\uC5D0\uC11C \uACC4\uC0B0\uD55C \uAC12\uC774\uC5D0\uC694.</div>` : '<div class="small">\uBD84\uB958\uB41C \uAE30\uB85D\uC774 \uC5C6\uC5B4 \uB300\uD45C \uC720\uD615\uC744 \uC815\uD560 \uC218 \uC5C6\uC5B4\uC694.</div>';
    let msg = "";
    if (cmp.status === "match" || cmp.status === "mismatch") {
      msg = `<p class="vs-msg">${esc(cmp.message)}</p>`;
      const rows = [
        `<li>\uB0B4\uAC00 \uAC00\uC7A5 \uB9CE\uC774 \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD55C <b>${cmp.primary.label}</b>\uC740 \uC2E4\uC81C\uB85C <b class="num">${p1(cmp.primary.pct)}%</b> (${n0(cmp.primary.count)}\uAC74)${cmp.primary.count ? `, 8\uAC1C \uC720\uD615 \uC911 ${cmp.primary.rank}\uC704` : ""}\uC600\uC5B4\uC694.</li>`,
        ...cmp.secondary.map((s) => `<li>\uC790\uC8FC \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD55C <b>${s.label}</b>\uC740 <b class="num">${p1(s.pct)}%</b>${s.count ? ` \xB7 ${s.rank}\uC704${s.inTop3 ? " (\uC0C1\uC704 3\uC704 \uC548)" : ""}` : ""}\uC600\uC5B4\uC694.</li>`)
      ];
      if (cmp.tie) rows.push("<li>\uAC00\uC7A5 \uB192\uC740 \uBE44\uC911\uC744 \uCC28\uC9C0\uD55C \uC720\uD615\uC774 \uC5EC\uB7EC \uAC1C\uB77C \uACF5\uB3D9 1\uC704\uB85C \uD310\uB2E8\uD588\uC5B4\uC694.</li>");
      msg += `<ul class="small" style="margin:0;padding-left:18px;display:grid;gap:2px">${rows.join("")}</ul>`;
    } else if (cmp.status === "no-actual") {
      msg = '<p class="small muted">\uC2E4\uC81C \uB300\uD45C \uC720\uD615\uC774 \uC5C6\uC5B4 \uBE44\uAD50 \uBB38\uAD6C\uB97C \uBCF4\uC5EC\uB4DC\uB9AC\uC9C0 \uC54A\uC544\uC694.</p>';
    } else {
      msg = '<p class="small muted">\uC608\uC0C1\uC744 \uACE0\uB974\uBA74 \uC2E4\uC81C \uACB0\uACFC\uC640 \uB098\uB780\uD788 \uBE44\uAD50\uD574 \uB4DC\uB824\uC694.</p>';
    }
    return `
  <section class="card stack">
    <h2>\uB0B4\uAC00 \uC0DD\uAC01\uD558\uB294 \uB098 vs \uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D \uC18D \uB098</h2>
    <div class="vs">
      <div class="vs-side mine"><span class="tag">A \xB7 \uB0B4\uAC00 \uC0DD\uAC01\uD558\uB294 \uB098 (\uC608\uC0C1)</span>${mine}</div>
      <div class="vs-side real"><span class="tag">B \xB7 \uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D \uC18D \uB098 (\uCE21\uC815)</span>${real}</div>
    </div>
    <div class="stack" style="gap:8px"><span class="small muted" style="font-weight:700">C \xB7 \uC608\uC0C1\uACFC \uC2E4\uC81C\uC758 \uCC28\uC774</span>${msg}</div>
    ${cmp.status === "mismatch" ? '<p class="small muted">\uC608\uC0C1\uACFC \uB2E4\uB978 \uAC74 \uD754\uD55C \uC77C\uC774\uC5D0\uC694. \uC790\uAE30 \uC778\uC2DD\uC774 \uD2C0\uB838\uB2E4\uB294 \uB73B\uC774 \uC544\uB2C8\uB77C, \uAE30\uC5B5\uC5D0 \uB0A8\uB294 \uC2DC\uCCAD\uACFC \uC2E4\uC81C\uB85C \uC313\uC778 \uAE30\uB85D\uC774 \uB2E4\uB97C \uC218 \uC788\uB2E4\uB294 \uB73B\uC774\uC5D0\uC694.</p>' : ""}
  </section>`;
  }
  function viewResult() {
    const r = state.result;
    if (!r) {
      emptyResult();
      return;
    }
    if (r.empty) {
      app.innerHTML = `<section class="card empty"><h1 class="page-title" style="font-size:26px">\uC774 \uAE30\uAC04\uC5D0\uB294 \uC2DC\uCCAD\uAE30\uB85D\uC774 \uC5C6\uC5B4\uC694</h1><p class="muted">\uAE30\uAC04\uC744 \uB113\uD600 \uB2E4\uC2DC \uBD84\uC11D\uD574 \uC8FC\uC138\uC694.</p><a class="btn primary" href="#upload">\uAE30\uAC04 \uBC14\uAFB8\uAE30</a></section>`;
      return;
    }
    const t = r.types;
    const c = r.concentration;
    const rep = t.representative;
    const pred = activePrediction();
    const sorted = [...t.rows].sort((a, b) => (a.id === UNCLASSIFIED.id) - (b.id === UNCLASSIFIED.id) || b.count - a.count);
    const hist = storage.getHistory().filter((e) => e.id !== state.savedId);
    const prevEntry = hist[0];
    const sumPct = t.rows.reduce((s, x) => s + x.pct, 0);
    app.innerHTML = `
  ${sampleBanner()}
  <header class="stack">
    <p class="eyebrow">\uBD84\uC11D \uACB0\uACFC \xB7 ${esc(state.upload.isSample ? "\uC608\uC2DC \uB370\uC774\uD130" : state.upload.fileName)}</p>
    <h1 class="page-title">\uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D \uC18D \uB098</h1>
    <p class="lead">${ymd(r.period.start)} ~ ${ymd(r.period.end)} \uB3D9\uC548\uC758 \uC2DC\uCCAD\uAE30\uB85D <b class="num">${n0(r.total)}\uAC74</b>\uC744 \uCC44\uB110 \uAE30\uC900\uC73C\uB85C \uBD84\uB958\uD588\uC5B4\uC694.</p>
  </header>

  ${t.lowClassification ? `<p class="notice warn">\uC2DC\uCCAD\uAE30\uB85D\uC758 <b>${p1(t.unclassifiedPct)}%</b>\uAC00 \uC544\uC9C1 \uCC44\uB110 DB\uC5D0 \uC5C6\uB294 \uCC44\uB110\uC774\uB77C \u2018\uC720\uD615 \uBBF8\uBD84\uB958\u2019\uB85C \uB0A8\uC558\uC5B4\uC694. \uB300\uD45C \uC720\uD615\uC740 \uBD84\uB958\uB41C \uAE30\uB85D\uB9CC\uC73C\uB85C \uC815\uD588\uAE30 \uB54C\uBB38\uC5D0 \uC2E4\uC81C\uC640 \uCC28\uC774\uAC00 \uD074 \uC218 \uC788\uC5B4\uC694. \uBBF8\uBD84\uB958 \uCC44\uB110 \uBAA9\uB85D\uC740 <a href="#detail">\uC0C1\uC138 \uBD84\uC11D</a>\uC5D0\uC11C \uBCFC \uC218 \uC788\uC5B4\uC694.</p>` : ""}

  <section class="grid-2">
    ${rep ? `<div class="persona-card" style="--tc:${TYPE_BY_ID[rep.id].color}">
        <span class="kicker">\uB098\uC758 \uB300\uD45C \uC2DC\uCCAD \uC720\uD615</span>
        <span class="persona">${rep.persona}</span>
        <div class="share"><b>${p1(rep.pct)}%</b><span>${rep.label} \uCF58\uD150\uCE20 \xB7 ${n0(rep.count)}\uAC74\uC73C\uB85C \uAC00\uC7A5 \uB9CE\uC544\uC694</span></div>
        ${t.tiedTopIds.length > 1 ? `<p class="small">\uAC19\uC740 \uAC74\uC218\uB85C \uACF5\uB3D9 1\uC704: ${t.tiedTopIds.map(typeLabel).join(", ")}</p>` : ""}
        <p class="fine">\uB300\uD45C \uC720\uD615 \uC774\uB984\uC740 \uC7AC\uBBF8\uB97C \uC704\uD55C \uD45C\uD604\uC774\uC5D0\uC694. \uC131\uACA9\uC774\uB098 \uC815\uCCB4\uC131\uC744 \uD310\uC815\uD558\uC9C0 \uC54A\uC544\uC694.</p>
      </div>` : '<div class="card stack"><h2>\uB300\uD45C \uC2DC\uCCAD \uC720\uD615</h2><p>\uBD84\uB958\uB41C \uAE30\uB85D\uC774 \uC5C6\uC5B4 \uB300\uD45C \uC720\uD615\uC744 \uC815\uD560 \uC218 \uC5C6\uC5B4\uC694. \uCC44\uB110 DB\uC5D0 \uCC44\uB110\uC744 \uCD94\uAC00\uD558\uBA74 \uBD84\uB958\uD560 \uC218 \uC788\uC5B4\uC694.</p></div>'}
    <div class="label-card" aria-label="\uCF58\uD150\uCE20 \uC720\uD615\uBCC4 \uBE44\uC911">
      ${state.upload.isSample ? '<div class="example-tag">\uC608\uC2DC \uB370\uC774\uD130</div>' : ""}
      <div class="label-title">\uB0B4 \uC2DC\uCCAD \uAD6C\uC131</div>
      <div class="label-meta"><span>\uCD1D \uC2DC\uCCAD\uAE30\uB85D <b class="num">${n0(r.total)}</b>\uAC74 \uAE30\uC900</span><span>${esc(r.period.label)}</span></div>
      <div class="label-head"><span>\uCF58\uD150\uCE20 \uC720\uD615</span><span>\uAC74\uC218 \xB7 \uBE44\uC911</span></div>
      ${sorted.map((x) => `<div class="label-row ${rep && t.tiedTopIds.includes(x.id) ? "top" : ""}">${dot(x.color)}<span class="name">${x.label}</span><span class="cnt num">${n0(x.count)}\uAC74</span><span class="pct num">${p1(x.pct)}%</span><span class="bar"><i style="width:${x.pct}%;background:${x.color}"></i></span></div>`).join("")}
      <div class="label-foot">\uBE44\uC911 = \uC720\uD615\uBCC4 \uAC74\uC218 \xF7 \uC804\uCCB4 ${n0(r.total)}\uAC74 \xD7 100 \xB7 \uD569\uACC4 ${p1(sumPct)}% (\uD45C\uC2DC\uAC12\uC740 \uBC18\uC62C\uB9BC)</div>
    </div>
  </section>

  ${comparisonCard(r.comparison, pred)}

  <section class="card stack">
    <h2>\uCF58\uD150\uCE20 \uC720\uD615\uBCC4 \uBE44\uC911</h2>
    <p class="sub">\uADF8\uB798\uD504 \uC704\uC5D0 \uB9C8\uC6B0\uC2A4\uB97C \uC62C\uB9AC\uAC70\uB098 \uB20C\uB7EC \uC815\uD655\uD55C \uAC74\uC218\uC640 \uBE44\uC911\uC744 \uD655\uC778\uD558\uC138\uC694.</p>
    <div class="chart-box"><canvas id="typeChart" aria-label="\uCF58\uD150\uCE20 \uC720\uD615\uBCC4 \uBE44\uC911 \uB3C4\uB11B \uCC28\uD2B8" role="img"></canvas></div>
  </section>

  <section class="grid-3">
    <div class="card stack">
      <h2>\uCC44\uB110 \uC9D1\uC911\uB3C4 HHI ${HHI_LEVELS.provisional ? '<span class="pill warn" title="' + esc(HHI_LEVELS.note) + '">\uC784\uC2DC \uAE30\uC900</span>' : ""}</h2>
      <div class="big-num">${n0(Math.round(c.hhi))}<small> / 10,000</small></div>
      ${c.level ? `<span class="pill accent" style="justify-self:start">${c.level.label}</span>` : ""}
      <p class="small muted">\uCC44\uB110\uBCC4 \uC2DC\uCCAD \uBE44\uC911(%)\uC744 \uC81C\uACF1\uD574 \uBAA8\uB450 \uB354\uD55C \uAC12\uC774\uC5D0\uC694. \uD55C \uCC44\uB110\uB9CC \uBCF4\uBA74 10,000, \uC5EC\uB7EC \uCC44\uB110\uC5D0 \uACE0\uB974\uAC8C \uB098\uB260\uC218\uB85D 0\uC5D0 \uAC00\uAE4C\uC6CC\uC694.</p>
    </div>
    <div class="card stack">
      <h2>\uC0C1\uC704 3\uAC1C \uCC44\uB110 \uBE44\uC911 CR3</h2>
      <div class="big-num">${p1(c.cr3)}<small>%</small></div>
      <div class="small">${c.cr3Channels.map((x) => `${esc(x.name)} <span class="num muted">${p1(x.pct)}%</span>`).join(" + ")}</div>
      ${c.cr3Note ? `<p class="small muted">${esc(c.cr3Note)}</p>` : ""}
    </div>
    <div class="card stack">
      <h2>\uC720\uD615 \uBBF8\uBD84\uB958 \uBE44\uC911</h2>
      <div class="big-num">${p1(t.unclassifiedPct)}<small>%</small></div>
      <p class="small muted">\uCC44\uB110 DB\uC5D0 \uC5C6\uB294 \uCC44\uB110 ${n0(r.unclassifiedChannels.length)}\uAC1C\uC640 \uCC44\uB110 \uC815\uBCF4\uAC00 \uC5C6\uB294 \uAE30\uB85D ${n0(c.noChannel)}\uAC74\uC774\uC5D0\uC694. \uC804\uCCB4 \uBE44\uC911 \uACC4\uC0B0\uC5D0\uB294 \uD3EC\uD568\uB3FC\uC694.</p>
    </div>
  </section>
  <p class="notice small">HHI\uC640 CR3\uB294 <b>\uCC44\uB110\uBCC4 \uC2DC\uCCAD\uAE30\uB85D\uC774 \uC5BC\uB9C8\uB098 \uBAB0\uB824 \uC788\uB294\uC9C0</b>\uB9CC \uB098\uD0C0\uB0B4\uC694. \uC815\uBCF4\uC758 \uB2E4\uC591\uC131, \uC815\uCE58\uC801 \uD3B8\uD5A5, \uCF58\uD150\uCE20\uC758 \uC2E0\uB8B0\uB3C4\uB97C \uC9C1\uC811 \uCE21\uC815\uD558\uC9C0 \uC54A\uC544\uC694. \uCC44\uB110 \uC815\uBCF4\uAC00 \uC5C6\uB294 ${n0(c.noChannel)}\uAC74\uC740 \uB450 \uC9C0\uD45C \uACC4\uC0B0\uC5D0\uC11C \uBE60\uC84C\uC5B4\uC694. ${HHI_LEVELS.provisional ? "\uB2E8\uACC4 \uC774\uB984(\uBD84\uC0B0\xB7\uC9D1\uC911 \uB4F1)\uC740 " + esc(HHI_LEVELS.note) : ""}</p>

  <section class="grid-2">
    <div class="card stack">
      <h2>\uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uCC44\uB110 5\uAC1C</h2>
      <div class="chart-box"><canvas id="topChart" aria-label="\uC0C1\uC704 5\uAC1C \uCC44\uB110 \uB9C9\uB300 \uCC28\uD2B8" role="img"></canvas></div>
      <div class="table-wrap"><table><thead><tr><th>\uCC44\uB110</th><th>\uC720\uD615</th><th class="r">\uAC74\uC218</th><th class="r">\uBE44\uC911</th></tr></thead><tbody>
        ${r.top5.map((x) => `<tr><td>${esc(x.name)}</td><td>${typeLabel(x.type)}</td><td class="r">${n0(x.count)}</td><td class="r">${p1(x.pct)}%</td></tr>`).join("")}
      </tbody></table></div>
      <p class="small muted">\uCC44\uB110 \uBE44\uC911\uC740 \uCC44\uB110 \uC815\uBCF4\uAC00 \uC788\uB294 ${n0(c.withChannel)}\uAC74 \uAE30\uC900\uC774\uC5D0\uC694.</p>
    </div>
    <div class="card stack">
      <h2>\uBD84\uC11D \uAE30\uAC04\uACFC \uAE30\uB85D</h2>
      <dl class="kv">
        <dt>\uBD84\uC11D \uAE30\uAC04</dt><dd>${esc(r.period.label)} \xB7 ${ymd(r.period.start)} ~ ${ymd(r.period.end)}</dd>
        <dt>\uC2E4\uC81C \uAE30\uB85D \uBC94\uC704</dt><dd>${ymd(r.actualRange.min)} ~ ${ymd(r.actualRange.max)}</dd>
        <dt>\uCD1D \uC2DC\uCCAD\uAE30\uB85D</dt><dd class="num">${n0(r.total)}\uAC74</dd>
        <dt>\uCC44\uB110 \uC218</dt><dd class="num">${n0(c.channelCount)}\uAC1C</dd>
        <dt>\uC81C\uC678\uD55C \uAE30\uB85D</dt><dd>\uAD11\uACE0 ${n0(state.upload.prepared.ads)}\uAC74 \xB7 \uC911\uBCF5 ${n0(state.upload.prepared.duplicates)}\uAC74 (\uD30C\uC77C \uC804\uCCB4 \uAE30\uC900)</dd>
      </dl>
      ${periodControls("res")}
      <div class="btn-row"><button class="btn small" id="reanalyze" type="button">\uC774 \uAE30\uAC04\uC73C\uB85C \uB2E4\uC2DC \uBD84\uC11D</button></div>
    </div>
  </section>

  <section class="card stack">
    <h2>\uC0C8\uB85C\uC6B4 \uCF58\uD150\uCE20 \uC720\uD615 \uD0D0\uC0C9</h2>
    ${r.suggestion ? `<p>${esc(r.suggestion.message)}</p>
      <ul class="explore-list">${r.suggestion.types.map((x) => {
      const url = youtubeSearchUrl(x.id);
      return `<li class="explore-item">
          <div class="explore-info">
            <span class="explore-name">${dot(x.color)} ${x.label}</span>
            <span class="explore-meta">\uB0B4 \uC2DC\uCCAD \uBE44\uC911 <b class="num">${p1(x.pct)}%</b> \xB7 \uAC80\uC0C9\uC5B4 \u201C${esc(exploreQuery(x.id))}\u201D</span>
          </div>
          ${url ? `<a class="btn explore-btn" href="${esc(url)}" target="_blank" rel="noopener noreferrer" data-explore="${x.id}" aria-label="\uC720\uD29C\uBE0C\uC5D0\uC11C ${x.label} \uD0D0\uC0C9\uD558\uAE30 (\uC0C8 \uD0ED\uC5D0\uC11C \uC5F4\uB9BC)">\uC720\uD29C\uBE0C\uC5D0\uC11C \uD0D0\uC0C9\uD558\uAE30<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg></a>` : ""}
        </li>`;
    }).join("")}</ul>
      <p class="small muted">\uBC84\uD2BC\uC744 \uB204\uB974\uBA74 \uC0C8 \uD0ED\uC5D0\uC11C \uC720\uD29C\uBE0C \uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5F4\uB824\uC694. \uAC80\uC0C9 \uACB0\uACFC\uB294 \uC720\uD29C\uBE0C\uAC00 \uBCF4\uC5EC\uC8FC\uB294 \uAC83\uC73C\uB85C, \uC774 \uC11C\uBE44\uC2A4\uAC00 \uD2B9\uC815 \uCC44\uB110\uC774\uB098 \uC601\uC0C1\uC744 \uACE8\uB77C \uCD94\uCC9C\uD558\uC9C0\uB294 \uC54A\uC544\uC694. \uC801\uAC8C \uBCF8 \uC720\uD615\uC774 \uB354 \uC88B\uB2E4\uB294 \uB73B\uB3C4 \uC544\uB2C8\uC5D0\uC694.</p>` : '<p class="muted">\uBD84\uB958\uB41C \uAE30\uB85D\uC774 \uBD80\uC871\uD574 \uC81C\uC548\uD560 \uC720\uD615\uC774 \uC5C6\uC5B4\uC694.</p>'}
  </section>

  <section class="card stack">
    <h2>\uC774 \uACB0\uACFC\uB97C \uC77D\uB294 \uBC29\uBC95</h2>
    <ul class="small" style="margin:0;padding-left:18px;display:grid;gap:4px">
      <li>\uBAA8\uB4E0 \uBE44\uC911\uC740 <b>\uC2DC\uCCAD\uAE30\uB85D \uAC74\uC218</b> \uAE30\uC900\uC774\uC5D0\uC694. Takeout \uD30C\uC77C\uC5D0\uB294 \uC2DC\uCCAD \uC2DC\uAC04\uC774 \uC5C6\uC5B4\uC11C, 1\uBD84\uC9DC\uB9AC \uC601\uC0C1\uACFC 1\uC2DC\uAC04\uC9DC\uB9AC \uC601\uC0C1\uC744 \uAC19\uC740 1\uAC74\uC73C\uB85C \uC138\uC694.</li>
      <li>\uCF58\uD150\uCE20 \uC720\uD615\uC740 \uC601\uC0C1 \uC81C\uBAA9\uC774 \uC544\uB2C8\uB77C <b>\uCC44\uB110</b>\uB85C \uC815\uD574\uC694. \uCC44\uB110 DB\uC5D0 \uB4F1\uB85D\uB41C \uCC44\uB110\uB9CC \uBD84\uB958\uB418\uACE0, \uB098\uBA38\uC9C0\uB294 \u2018\uC720\uD615 \uBBF8\uBD84\uB958\u2019\uB85C \uB0A8\uC544\uC694.</li>
      <li>\uAC19\uC740 \uC601\uC0C1\uC744 \uB2E4\uC2DC \uBCF4\uBA74 \uAC01\uAC01 1\uAC74\uC73C\uB85C \uC138\uC694. \uAC19\uC740 \uC2DC\uAC01\uC5D0 \uAC19\uC740 \uC601\uC0C1\uC774 \uB450 \uBC88 \uAE30\uB85D\uB41C \uACBD\uC6B0\uB9CC \uC911\uBCF5\uC73C\uB85C \uBCF4\uACE0 \uBE90\uC5B4\uC694.</li>
      <li>\uC774 \uACB0\uACFC\uB294 \uC88B\uACE0 \uB098\uC068\uC758 \uD3C9\uAC00\uAC00 \uC544\uB2C8\uB77C, \uC2DC\uCCAD \uD328\uD134\uC744 \uC2A4\uC2A4\uB85C \uB3CC\uC544\uBCF4\uAE30 \uC704\uD55C \uAC70\uC6B8\uC774\uC5D0\uC694.</li>
    </ul>
  </section>

  ${prevEntry && !state.upload.isSample ? quickCompare(prevEntry) : ""}

  <div class="btn-row">
    <button class="btn primary" id="saveBtn" type="button" ${state.upload.isSample || state.savedId ? "disabled" : ""}>${state.savedId ? "\uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uC800\uC7A5\uB428" : "\uC774 \uACB0\uACFC \uC800\uC7A5\uD558\uAE30"}</button>
    <a class="btn" href="#detail">\uC0C1\uC138 \uBD84\uC11D \xB7 \uACC4\uC0B0 \uADFC\uAC70</a>
    <a class="btn" href="#history">\uC774\uC804 \uACB0\uACFC\uC640 \uBE44\uAD50</a>
  </div>
  <p class="small muted">${state.upload.isSample ? "\uC608\uC2DC \uB370\uC774\uD130 \uACB0\uACFC\uB294 \uC800\uC7A5\uD560 \uC218 \uC5C6\uC5B4\uC694." : "\uC800\uC7A5\uD558\uBA74 \uC720\uD615\uBCC4 \uBE44\uC911, HHI, CR3, \uBD84\uC11D \uAE30\uAC04, \uB0B4 \uC608\uC0C1\uB9CC \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uB0A8\uC544\uC694. \uC601\uC0C1 \uC81C\uBAA9\uACFC \uCC44\uB110\uBA85\uC740 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC544\uC694."}</p>`;
    typeDonut(document.getElementById("typeChart"), sorted);
    hBar(document.getElementById("topChart"), r.top5.map((x) => ({ name: x.name, count: x.count, pct: x.pct })), { colors: r.top5.map((x) => TYPE_BY_ID[x.type].color) });
    bindPeriod("res", () => {
    });
    document.getElementById("reanalyze").addEventListener("click", () => {
      const p = currentPeriod();
      if (!p) {
        toast("\uC2DC\uC791\uC77C\uC774 \uC885\uB8CC\uC77C\uBCF4\uB2E4 \uB2A6\uC5B4\uC694.");
        return;
      }
      state.result = null;
      go("analyzing");
    });
    const save = document.getElementById("saveBtn");
    save.addEventListener("click", () => {
      const entry = toHistoryEntry(r, activePrediction(), { fileName: state.upload.fileName });
      if (storage.addHistory(entry)) {
        state.savedId = entry.id;
        toast("\uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uACB0\uACFC\uB97C \uC800\uC7A5\uD588\uC5B4\uC694.");
        render();
      } else toast("\uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uBE0C\uB77C\uC6B0\uC800\uAC00 \uC800\uC7A5\uC744 \uB9C9\uACE0 \uC788\uC744 \uC218 \uC788\uC5B4\uC694.");
    });
  }
  function signed(n, digits = 1, suffix = "") {
    const v = Number(n);
    const s = v.toLocaleString("ko-KR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
    if (Math.abs(v) < Math.pow(10, -digits) / 2) return `<span class="muted">\uBCC0\uD654 \uC5C6\uC74C</span>`;
    return v > 0 ? `<span class="diff-up">+${s}${suffix}</span>` : `<span class="diff-down">${s}${suffix}</span>`;
  }
  function quickCompare(prev) {
    const curr = toHistoryEntry(state.result, activePrediction());
    const cmp = compareEntries(prev, curr);
    return `
  <section class="card stack">
    <h2>\uC9C0\uB09C \uC800\uC7A5 \uACB0\uACFC\uC640 \uBE44\uAD50 <span class="pill">${ymd(prev.savedAt)} \uC800\uC7A5</span></h2>
    <dl class="kv">
      <dt>\uB300\uD45C \uC720\uD615</dt><dd>${prev.representative ? typeLabel(prev.representative) : "\uC5C6\uC74C"} \u2192 ${curr.representative ? typeLabel(curr.representative) : "\uC5C6\uC74C"}${cmp.representativeChanged ? ' <span class="pill accent">\uBC14\uB01C</span>' : ""}</dd>
      <dt>HHI</dt><dd><span class="num">${n0(Math.round(prev.hhi))} \u2192 ${n0(Math.round(curr.hhi))}</span> (${signed(cmp.hhi.diff, 0)})</dd>
      <dt>CR3</dt><dd><span class="num">${p1(prev.cr3)}% \u2192 ${p1(curr.cr3)}%</span> (${signed(cmp.cr3.diff, 1, "%p")})</dd>
      ${cmp.biggest ? `<dt>\uAC00\uC7A5 \uD06C\uAC8C \uBCC0\uD55C \uC720\uD615</dt><dd>${cmp.biggest.label} ${signed(cmp.biggest.diff, 1, "%p")}</dd>` : ""}
    </dl>
    <p class="small muted">\uBD84\uC11D \uAE30\uAC04\uC774 \uB2E4\uB974\uBA74 \uC9C1\uC811 \uBE44\uAD50\uD558\uAE30 \uC5B4\uB824\uC6B8 \uC218 \uC788\uC5B4\uC694. \uC9C0\uB09C \uACB0\uACFC: ${esc(prev.period.label)} \xB7 ${ymd(prev.period.start)} ~ ${ymd(prev.period.end)}</p>
  </section>`;
  }
  function viewDetail() {
    const r = state.result;
    if (!r || r.empty) {
      emptyResult();
      return;
    }
    const t = r.types;
    const c = r.concentration;
    const terms = c.channels.slice(0, 5).map((x) => `${p1(x.pct)}\xB2`);
    const restSum = c.channels.slice(5).reduce((s, x) => s + x.pct * x.pct, 0);
    const ms = t.matchStats;
    const csv = ["channel_name,watch_count,type", ...r.unclassifiedChannels.map((x) => `"${x.name.replace(/"/g, '""')}",${x.count},`)].join("\n");
    app.innerHTML = `
  ${sampleBanner()}
  <header class="stack">
    <p class="eyebrow">\uC0C1\uC138 \uBD84\uC11D</p>
    <h1 class="page-title">\uACC4\uC0B0 \uADFC\uAC70\uC640 \uC804\uCCB4 \uB370\uC774\uD130</h1>
    <p class="lead">\uACB0\uACFC \uD654\uBA74\uC758 \uBAA8\uB4E0 \uC22B\uC790\uAC00 \uC5B4\uB5BB\uAC8C \uB098\uC654\uB294\uC9C0 \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694.</p>
    <div class="btn-row"><a class="btn small" href="#result">\u2190 \uACB0\uACFC\uB85C \uB3CC\uC544\uAC00\uAE30</a></div>
  </header>

  <section class="card stack">
    <h2>\uCF58\uD150\uCE20 \uC720\uD615\uBCC4 \uACC4\uC0B0</h2>
    <div class="table-wrap"><table><thead><tr><th>\uC720\uD615</th><th class="r">\uAC74\uC218</th><th class="r">\uACC4\uC0B0</th><th class="r">\uBE44\uC911</th></tr></thead><tbody>
      ${t.rows.map((x) => `<tr><td>${dot(x.color)} ${x.label}</td><td class="r">${n0(x.count)}</td><td class="r">${n0(x.count)} \xF7 ${n0(r.total)} \xD7 100</td><td class="r">${p1(x.pct)}%</td></tr>`).join("")}
      <tr><td><b>\uD569\uACC4</b></td><td class="r"><b>${n0(t.rows.reduce((s, x) => s + x.count, 0))}</b></td><td class="r"></td><td class="r"><b>${p1(t.rows.reduce((s, x) => s + x.pct, 0))}%</b></td></tr>
    </tbody></table></div>
    <p class="small muted">\uBD84\uB958 \uBC29\uBC95: \uCC44\uB110 ID \uC77C\uCE58 ${n0(ms.id)}\uAC74 \xB7 \uCC44\uB110\uBA85 \uC77C\uCE58 ${n0(ms.name)}\uAC74 \xB7 \uC790\uB3D9 \uC0DD\uC131 \uC74C\uC6D0 \uCC44\uB110(\u201C- Topic\u201D) ${n0(ms.pattern)}\uAC74 \xB7 DB\uC5D0 \uC5C6\uB294 \uCC44\uB110 ${n0(ms.none)}\uAC74 \xB7 \uCC44\uB110 \uC815\uBCF4 \uC5C6\uC74C ${n0(ms["no-channel"])}\uAC74${r.musicHeaderCount ? ` \xB7 \uC774 \uC911 YouTube Music \uC571 \uAE30\uB85D ${n0(r.musicHeaderCount)}\uAC74 \uD3EC\uD568` : ""}</p>
  </section>

  <section class="grid-2">
    <div class="card stack">
      <h2>HHI \uACC4\uC0B0</h2>
      <p class="small">\uCC44\uB110 \uC815\uBCF4\uAC00 \uC788\uB294 ${n0(c.withChannel)}\uAC74\uC5D0\uC11C \uAC01 \uCC44\uB110\uC758 \uBE44\uC911 s\u1D62(%)\uB97C \uAD6C\uD574 \uC81C\uACF1\uD55C \uB4A4 \uBAA8\uB450 \uB354\uD574\uC694.</p>
      <div class="formula">HHI = \u03A3 s\u1D62\xB2 = ${terms.join(" + ")}${c.channels.length > 5 ? ` + (\uB098\uBA38\uC9C0 ${n0(c.channels.length - 5)}\uAC1C \uCC44\uB110 ${p1(restSum)})` : ""} = <b>${p1(c.hhi)}</b></div>
      <p class="small muted">\uBC94\uC704 0 ~ 10,000. \uD604\uC7AC \uB2E8\uACC4: ${c.level ? c.level.label : "-"} (${HHI_LEVELS.provisional ? "\uC784\uC2DC \uAE30\uC900 \xB7 js/config.js\uC5D0\uC11C \uC870\uC815" : "\uD655\uC815 \uAE30\uC900"})</p>
      <div class="table-wrap"><table><thead><tr><th>\uB2E8\uACC4</th><th class="r">HHI \uC0C1\uD55C</th></tr></thead><tbody>
        ${HHI_LEVELS.levels.map((l) => `<tr><td>${l.label}</td><td class="r">${l.max === Infinity ? "10,000" : n0(l.max)}</td></tr>`).join("")}
      </tbody></table></div>
    </div>
    <div class="card stack">
      <h2>CR3 \uACC4\uC0B0</h2>
      <p class="small">\uC2DC\uCCAD\uAE30\uB85D\uC774 \uAC00\uC7A5 \uB9CE\uC740 3\uAC1C \uCC44\uB110\uC758 \uBE44\uC911\uC744 \uB354\uD574\uC694.</p>
      <div class="formula">CR3 = ${c.cr3Channels.map((x) => p1(x.pct)).join(" + ")} = <b>${p1(c.cr3)}%</b></div>
      <ul class="small" style="margin:0;padding-left:18px">${c.cr3Channels.map((x) => `<li>${esc(x.name)}: ${n0(x.count)}\uAC74 \xF7 ${n0(c.withChannel)}\uAC74</li>`).join("")}</ul>
    </div>
  </section>

  <section class="card stack">
    <h2>\uC6D4\uBCC4 \uC2DC\uCCAD\uAE30\uB85D \uAC74\uC218</h2>
    <div class="chart-box"><canvas id="monthChart" role="img" aria-label="\uC6D4\uBCC4 \uC2DC\uCCAD\uAE30\uB85D \uB9C9\uB300 \uCC28\uD2B8"></canvas></div>
    <p class="small muted">${r.monthly.map((m) => `${m.month}: ${n0(m.count)}\uAC74`).join(" \xB7 ")}</p>
  </section>

  <section class="card stack">
    <h2>\uC804\uCCB4 \uCC44\uB110 \uBAA9\uB85D <span class="pill">${n0(c.channelCount)}\uAC1C</span></h2>
    <div class="field" style="max-width:320px"><label for="chSearch">\uCC44\uB110 \uC774\uB984\uC73C\uB85C \uCC3E\uAE30</label><input id="chSearch" type="search" placeholder="\uC608: \uB274\uC2A4"></div>
    <div class="table-wrap"><table><thead><tr><th class="r">\uC21C\uC704</th><th>\uCC44\uB110</th><th>\uC720\uD615</th><th class="r">\uAC74\uC218</th><th class="r">\uBE44\uC911</th></tr></thead><tbody id="chBody"></tbody></table></div>
    <p class="small muted" id="chNote"></p>
  </section>

  <section class="card stack">
    <h2>\uC720\uD615 \uBBF8\uBD84\uB958 \uCC44\uB110 <span class="pill">${n0(r.unclassifiedChannels.length)}\uAC1C</span></h2>
    <p class="small">\uD300\uC5D0\uC11C \uCC44\uB110 DB(<code>data/channel-types.json</code>)\uC5D0 \uCD94\uAC00\uD560 \uC218 \uC788\uB3C4\uB85D CSV\uB85C \uC815\uB9AC\uD588\uC5B4\uC694. <code>type</code> \uC5F4\uC5D0 vlog, entertain, game, beauty, knowledge, music, sports, news \uC911 \uD558\uB098\uB97C \uCC44\uC6CC \uB123\uC73C\uBA74 \uB3FC\uC694.</p>
    <textarea class="copybox" id="csvBox" readonly aria-label="\uBBF8\uBD84\uB958 \uCC44\uB110 CSV">${esc(csv)}</textarea>
    <div class="btn-row"><button class="btn small" id="copyCsv" type="button">CSV \uBCF5\uC0AC</button></div>
  </section>`;
    vBar(document.getElementById("monthChart"), r.monthly.map((m) => ({ name: m.month, count: m.count })));
    const body = document.getElementById("chBody");
    const note = document.getElementById("chNote");
    const draw = (q) => {
      const list = c.channels.map((x, i) => ({ ...x, rank: i + 1 })).filter((x) => !q || x.name.toLowerCase().includes(q.toLowerCase()));
      const shown = list.slice(0, 200);
      body.innerHTML = shown.map((x) => `<tr><td class="r">${x.rank}</td><td>${esc(x.name)}</td><td>${typeLabel(x.type)}</td><td class="r">${n0(x.count)}</td><td class="r">${p1(x.pct)}%</td></tr>`).join("") || '<tr><td colspan="5" class="muted">\uC77C\uCE58\uD558\uB294 \uCC44\uB110\uC774 \uC5C6\uC5B4\uC694.</td></tr>';
      note.textContent = list.length > shown.length ? `${n0(list.length)}\uAC1C \uC911 \uC0C1\uC704 200\uAC1C\uB9CC \uD45C\uC2DC\uD588\uC5B4\uC694.` : "";
    };
    draw("");
    document.getElementById("chSearch").addEventListener("input", (e) => draw(e.target.value.trim()));
    document.getElementById("copyCsv").addEventListener("click", async () => {
      const box = document.getElementById("csvBox");
      try {
        await navigator.clipboard.writeText(box.value);
        toast("CSV\uB97C \uBCF5\uC0AC\uD588\uC5B4\uC694.");
      } catch {
        box.focus();
        box.select();
        toast("\uC790\uB3D9 \uBCF5\uC0AC\uAC00 \uB9C9\uD600 \uC788\uC5B4\uC694. \uC120\uD0DD\uB41C \uB0B4\uC6A9\uC744 \uC9C1\uC811 \uBCF5\uC0AC\uD574 \uC8FC\uC138\uC694.");
      }
    });
  }
  function viewHistory() {
    const hist = storage.getHistory();
    const canStore = storage.available();
    const current = state.result && !state.result.empty && !state.upload.isSample && !state.savedId ? { ...toHistoryEntry(state.result, activePrediction(), { fileName: state.upload.fileName }), id: "__current__", current: true } : null;
    const entries = current ? [current, ...hist] : hist;
    const item = (e, i) => `
    <div class="history-item">
      <input type="checkbox" id="sel-${esc(e.id)}" value="${esc(e.id)}" ${i < 2 ? "checked" : ""} aria-label="\uBE44\uAD50\uC5D0 \uC0AC\uC6A9">
      <label for="sel-${esc(e.id)}" style="min-width:0">
        <div><b>${e.current ? "\uC9C0\uAE08 \uACB0\uACFC (\uC800\uC7A5 \uC548 \uD568)" : ymd(e.savedAt) + " \uC800\uC7A5"}</b> \xB7 ${e.representative ? typeLabel(e.representative) : "\uB300\uD45C \uC720\uD615 \uC5C6\uC74C"}</div>
        <div class="meta">${esc(e.period.label)} ${ymd(e.period.start)} ~ ${ymd(e.period.end)} \xB7 ${n0(e.total)}\uAC74 \xB7 HHI ${n0(Math.round(e.hhi))} \xB7 CR3 ${p1(e.cr3)}%${e.prediction ? ` \xB7 \uC608\uC0C1: ${typeLabel(e.prediction.primary)}` : ""}</div>
      </label>
      ${e.current ? "" : `<span class="btn-row"><button class="btn small danger" type="button" data-del="${esc(e.id)}">\uC0AD\uC81C</button></span>`}
    </div>`;
    app.innerHTML = `
  <header class="stack">
    <p class="eyebrow">\uC774\uC804 \uBD84\uC11D \uACB0\uACFC</p>
    <h1 class="page-title">\uC9C0\uB09C \uACB0\uACFC\uC640 \uBE44\uAD50\uD558\uAE30</h1>
    <p class="lead">\uC800\uC7A5\uD55C \uACB0\uACFC\uB97C \uB450 \uAC1C \uACE8\uB77C \uC720\uD615\uBCC4 \uBE44\uC911\uACFC \uC9D1\uC911\uB3C4\uAC00 \uC5B4\uB5BB\uAC8C \uB2EC\uB77C\uC84C\uB294\uC9C0 \uBCFC \uC218 \uC788\uC5B4\uC694.</p>
  </header>
  ${!canStore ? '<p class="notice warn">\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uC800\uC7A5\uC18C \uC0AC\uC6A9\uC744 \uB9C9\uACE0 \uC788\uC5B4\uC11C \uACB0\uACFC\uB97C \uC800\uC7A5\uD558\uAC70\uB098 \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC5B4\uC694.</p>' : ""}
  ${entries.length ? `
  <section class="stack" id="histList">${entries.map(item).join("")}</section>
  <p class="small muted" id="selNote">\uBE44\uAD50\uD560 \uACB0\uACFC\uB97C 2\uAC1C \uACE8\uB77C \uC8FC\uC138\uC694.</p>
  <section id="cmpBox"></section>` : `
  <section class="card empty"><p>\uC544\uC9C1 \uC800\uC7A5\uD55C \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694.</p><p class="small muted">\uACB0\uACFC \uD654\uBA74\uC5D0\uC11C \u2018\uC774 \uACB0\uACFC \uC800\uC7A5\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 \uC5EC\uAE30\uC5D0 \uC313\uC5EC\uC694.</p><a class="btn primary" href="#upload">\uC2DC\uCCAD\uAE30\uB85D \uBD84\uC11D\uD558\uAE30</a></section>`}

  <section class="card stack">
    <h2>\uC800\uC7A5\uB418\uB294 \uB370\uC774\uD130\uC640 \uC704\uCE58</h2>
    <p class="small">\uC774 \uC11C\uBE44\uC2A4\uC5D0\uB294 \uB85C\uADF8\uC778\uACFC \uC11C\uBC84\uAC00 \uC5C6\uC5B4\uC694. \uC544\uB798 \uC815\uBCF4\uB9CC <b>\uC9C0\uAE08 \uC4F0\uACE0 \uC788\uB294 \uBE0C\uB77C\uC6B0\uC800\uC758 LocalStorage</b>\uC5D0 \uC800\uC7A5\uB3FC\uC694.</p>
    <ul class="small" style="margin:0;padding-left:18px;display:grid;gap:2px">
      <li><code>${STORAGE_KEYS.prediction}</code>: \uB0B4\uAC00 \uACE0\uB978 \uC608\uC0C1 \uC720\uD615</li>
      <li><code>${STORAGE_KEYS.history}</code>: \uC800\uC7A5\uD55C \uACB0\uACFC(\uBD84\uC11D \uB0A0\uC9DC, \uAE30\uAC04, \uC720\uD615\uBCC4 \uAC74\uC218\xB7\uBE44\uC911, HHI, CR3, \uB300\uD45C \uC720\uD615, \uADF8\uB54C\uC758 \uC608\uC0C1, \uD30C\uC77C \uC774\uB984) \xB7 \uCD5C\uB300 20\uAC1C</li>
    </ul>
    <p class="small">\uC6D0\uBCF8 \uC2DC\uCCAD\uAE30\uB85D \uD30C\uC77C, \uC601\uC0C1 \uC81C\uBAA9, \uCC44\uB110\uBA85\uC740 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC544\uC694. \uBE0C\uB77C\uC6B0\uC800 \uB370\uC774\uD130\uB97C \uC9C0\uC6B0\uAC70\uB098 \uB2E4\uB978 \uAE30\uAE30\xB7\uBE0C\uB77C\uC6B0\uC800\uB97C \uC4F0\uBA74 \uC800\uC7A5\uD55C \uACB0\uACFC\uB97C \uB418\uC0B4\uB9B4 \uC218 \uC5C6\uC5B4\uC694.</p>
    <div class="btn-row">
      <button class="btn danger" type="button" id="wipe">\uC800\uC7A5\uD55C \uACB0\uACFC\uC640 \uC608\uC0C1 \uBAA8\uB450 \uC9C0\uC6B0\uAE30</button>
    </div>
  </section>`;
    const selected = () => [...app.querySelectorAll("#histList input[type=checkbox]:checked")].map((i) => i.value);
    const drawCmp = () => {
      const ids = selected();
      const box = document.getElementById("cmpBox");
      const note = document.getElementById("selNote");
      if (!box) return;
      if (ids.length !== 2) {
        box.innerHTML = "";
        note.textContent = ids.length > 2 ? "2\uAC1C\uB9CC \uACE8\uB77C \uC8FC\uC138\uC694." : "\uBE44\uAD50\uD560 \uACB0\uACFC\uB97C 2\uAC1C \uACE8\uB77C \uC8FC\uC138\uC694.";
        return;
      }
      note.textContent = "";
      const [a, b] = ids.map((id) => entries.find((e) => e.id === id)).sort((x, y) => x.savedAt - y.savedAt);
      const cmp = compareEntries(a, b);
      const la = a.current ? "\uC9C0\uAE08" : ymd(a.savedAt);
      const lb = b.current ? "\uC9C0\uAE08" : ymd(b.savedAt);
      box.innerHTML = `
    <div class="card stack">
      <h2>${la} \u2192 ${lb}</h2>
      <dl class="kv">
        <dt>\uB300\uD45C \uC720\uD615</dt><dd>${a.representative ? typeLabel(a.representative) : "\uC5C6\uC74C"} \u2192 ${b.representative ? typeLabel(b.representative) : "\uC5C6\uC74C"}${cmp.representativeChanged ? ' <span class="pill accent">\uBC14\uB01C</span>' : ""}</dd>
        <dt>HHI</dt><dd><span class="num">${n0(Math.round(a.hhi))} \u2192 ${n0(Math.round(b.hhi))}</span> (${signed(cmp.hhi.diff, 0)})</dd>
        <dt>CR3</dt><dd><span class="num">${p1(a.cr3)}% \u2192 ${p1(b.cr3)}%</span> (${signed(cmp.cr3.diff, 1, "%p")})</dd>
        <dt>\uBD84\uC11D \uAE30\uAC04</dt><dd>${ymd(a.period.start)}~${ymd(a.period.end)} / ${ymd(b.period.start)}~${ymd(b.period.end)}</dd>
      </dl>
      <div class="chart-box tall"><canvas id="cmpChart" role="img" aria-label="\uC720\uD615\uBCC4 \uBE44\uC911 \uBE44\uAD50 \uB9C9\uB300 \uCC28\uD2B8"></canvas></div>
      <div class="table-wrap"><table><thead><tr><th>\uC720\uD615</th><th class="r">${la}</th><th class="r">${lb}</th><th class="r">\uBCC0\uD654</th></tr></thead><tbody>
        ${cmp.types.map((x) => `<tr><td>${dot(x.color)} ${x.label}</td><td class="r">${p1(x.prev)}%</td><td class="r">${p1(x.curr)}%</td><td class="r">${signed(x.diff, 1, "%p")}</td></tr>`).join("")}
      </tbody></table></div>
      <p class="small muted">%p(\uD37C\uC13C\uD2B8\uD3EC\uC778\uD2B8)\uB294 \uB450 \uBE44\uC911\uC758 \uCC28\uC774\uC608\uC694. \uB450 \uACB0\uACFC\uC758 \uBD84\uC11D \uAE30\uAC04\uC774\uB098 \uCC44\uB110 DB\uAC00 \uB2E4\uB974\uBA74 \uCC28\uC774\uC758 \uC77C\uBD80\uB294 \uADF8 \uB54C\uBB38\uC77C \uC218 \uC788\uC5B4\uC694.</p>
    </div>`;
      compareBars(document.getElementById("cmpChart"), cmp.types, [la, lb]);
    };
    app.querySelectorAll("#histList input[type=checkbox]").forEach((i) => i.addEventListener("change", drawCmp));
    drawCmp();
    app.querySelectorAll("[data-del]").forEach((btn) => btn.addEventListener("click", () => {
      if (btn.dataset.armed) {
        storage.deleteHistory(btn.dataset.del);
        toast("\uC800\uC7A5\uD55C \uACB0\uACFC\uB97C \uC9C0\uC6E0\uC5B4\uC694.");
        render();
        return;
      }
      btn.dataset.armed = "1";
      btn.textContent = "\uC815\uB9D0 \uC0AD\uC81C";
      setTimeout(() => {
        if (btn.isConnected) {
          delete btn.dataset.armed;
          btn.textContent = "\uC0AD\uC81C";
        }
      }, 4e3);
    }));
    const wipe = document.getElementById("wipe");
    wipe.addEventListener("click", () => {
      if (wipe.dataset.armed) {
        storage.clearAll();
        state.prediction = null;
        state.savedId = null;
        toast("\uC800\uC7A5\uD55C \uACB0\uACFC\uC640 \uC608\uC0C1\uC744 \uBAA8\uB450 \uC9C0\uC6E0\uC5B4\uC694.");
        render();
        return;
      }
      wipe.dataset.armed = "1";
      wipe.textContent = "\uD55C \uBC88 \uB354 \uB204\uB974\uBA74 \uBAA8\uB450 \uC9C0\uC6CC\uC838\uC694";
      setTimeout(() => {
        if (wipe.isConnected) {
          delete wipe.dataset.armed;
          wipe.textContent = "\uC800\uC7A5\uD55C \uACB0\uACFC\uC640 \uC608\uC0C1 \uBAA8\uB450 \uC9C0\uC6B0\uAE30";
        }
      }, 4e3);
    });
  }
  window.addEventListener("hashchange", render);
  loadDb().then(render);
})();
