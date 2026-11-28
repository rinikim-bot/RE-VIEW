(() => {
  // js/config.js
  var CONTENT_TYPES = [
    { id: "vlog", label: "\uBE0C\uC774\uB85C\uADF8\xB7\uC77C\uC0C1\uD615", persona: "\uB0A8\uC758 \uD558\uB8E8 \uCC3D\uBB38", color: "#ff8a3d" },
    { id: "entertain", label: "\uC5D4\uD130\uD14C\uC778\uBA3C\uD2B8\uD615", persona: "\uC6C3\uC74C \uC790\uD310\uAE30", color: "#f4506e" },
    { id: "game", label: "\uAC8C\uC784\uD615", persona: "\uD55C\uD310 \uB180\uC774\uD130", color: "#a06bd3" },
    { id: "beauty", label: "\uBDF0\uD2F0\xB7\uD328\uC158\uD615", persona: "\uC2A4\uD0C0\uC77C \uAC70\uC6B8", color: "#f77f9f" },
    { id: "knowledge", label: "\uC9C0\uC2DD\xB7\uAD50\uC721\uD615", persona: "\uD638\uAE30\uC2EC \uC11C\uC7AC", color: "#7fc34f" },
    { id: "music", label: "\uC74C\uC545\uD615", persona: "\uADC0 \uC18D \uB77C\uB514\uC624", color: "#3b82f6" },
    { id: "sports", label: "\uC2A4\uD3EC\uCE20\uD615", persona: "\uD568\uC131 \uAD00\uC911\uC11D", color: "#f5c518" },
    { id: "news", label: "\uB274\uC2A4\xB7\uC2DC\uC0AC\uD615", persona: "\uC138\uC0C1 \uC548\uD14C\uB098", color: "#64748b" }
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
  var PERSONA_DESC = {
    vlog: "\uB2E4\uB978 \uC0AC\uB78C\uB4E4\uC758 \uC77C\uC0C1\uC744 \uAD6C\uACBD\uD558\uBA70 \uC18C\uC18C\uD55C \uC990\uAC70\uC6C0\uC744 \uBC1C\uACAC\uD574\uC694. \uC5EC\uD589\uBD80\uD130 \uD3C9\uBC94\uD55C \uD558\uB8E8\uAE4C\uC9C0, \uC0AC\uB78C\uB4E4\uC758 \uC774\uC57C\uAE30\uB97C \uC88B\uC544\uD574\uC694.",
    entertain: "\uC6C3\uC74C\uACFC \uC7AC\uBBF8\uB97C \uCC3E\uC544 \uCF58\uD150\uCE20\uB97C \uC990\uACA8\uC694. \uC608\uB2A5, \uBC08, \uC720\uBA38\uCC98\uB7FC \uAC00\uBCCD\uAC8C \uC990\uAE38 \uC218 \uC788\uB294 \uC601\uC0C1\uC5D0 \uB04C\uB824\uC694.",
    game: "\uAC8C\uC784 \uC18D \uC138\uACC4\uC640 \uD50C\uB808\uC774\uB97C \uC990\uACA8\uC694. \uAC8C\uC784 \uC601\uC0C1\uBD80\uD130 \uACF5\uB7B5, \uC2A4\uD2B8\uB9AC\uBA38\uC758 \uD50C\uB808\uC774\uAE4C\uC9C0 \uAD00\uC2EC\uC774 \uC774\uC5B4\uC838\uC694.",
    beauty: "\uC0C8\uB85C\uC6B4 \uC2A4\uD0C0\uC77C\uACFC \uCDE8\uD5A5\uC744 \uBC1C\uACAC\uD558\uB294 \uAC78 \uC88B\uC544\uD574\uC694. \uD328\uC158, \uBA54\uC774\uD06C\uC5C5, \uCF54\uB514 \uB4F1 \uB098\uB9CC\uC758 \uAC10\uAC01\uC744 \uCC44\uC6CC\uAC00\uC694.",
    knowledge: "\uAD81\uAE08\uD55C \uAC83\uC744 \uC54C\uC544\uAC00\uACE0 \uC0C8\uB85C\uC6B4 \uC9C0\uC2DD\uC744 \uC313\uB294 \uAC78 \uC990\uACA8\uC694. \uBAB0\uB790\uB358 \uC0AC\uC2E4\uC744 \uBC1C\uACAC\uD558\uB294 \uC21C\uAC04\uC5D0 \uD765\uBBF8\uB97C \uB290\uAEF4\uC694.",
    music: "\uC74C\uC545\uC73C\uB85C \uC77C\uC0C1\uC5D0 \uBD84\uC704\uAE30\uB97C \uB354\uD574\uC694. \uC88B\uC544\uD558\uB294 \uB178\uB798\uBD80\uD130 \uC0C8\uB85C\uC6B4 \uC74C\uC545\uACFC \uD50C\uB808\uC774\uB9AC\uC2A4\uD2B8\uAE4C\uC9C0 \uC990\uACA8 \uCC3E\uC544\uC694.",
    sports: "\uACBD\uAE30\uC758 \uD750\uB984\uACFC \uB728\uAC70\uC6B4 \uC21C\uAC04\uC744 \uC990\uACA8\uC694. \uC120\uC218\uB4E4\uC758 \uD65C\uC57D\uACFC \uACBD\uAE30 \uD558\uC774\uB77C\uC774\uD2B8\uC5D0 \uAD00\uC2EC\uC774 \uB9CE\uC544\uC694.",
    news: "\uC138\uC0C1\uC5D0\uC11C \uC77C\uC5B4\uB098\uB294 \uC77C\uC5D0 \uAD00\uC2EC\uC774 \uB9CE\uC544\uC694. \uB274\uC2A4\uC640 \uB2E4\uC591\uD55C \uC774\uC288\uB97C \uD1B5\uD574 \uC138\uC0C1\uC758 \uD750\uB984\uC744 \uC0B4\uD3B4\uBD10\uC694.",
    unclassified: "\uC544\uC9C1 \uCC44\uB110 \uC815\uBCF4\uAC00 \uBD80\uC871\uD574\uC11C \uCDE8\uD5A5\uC744 \uC815\uD558\uAE30 \uC5B4\uB824\uC6CC\uC694. \uCC44\uB110 DB\uC5D0 \uCC44\uB110\uC774 \uB354\uD574\uC9C0\uBA74 \uB354 \uC815\uD655\uD558\uAC8C \uC54C\uB824\uB4DC\uB9B4\uAC8C\uC694."
  };
  var PERSONA_COMMON = "\uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uCF58\uD150\uCE20\uB97C \uC911\uC2EC\uC73C\uB85C \uC5EC\uB7EC \uCDE8\uD5A5\uC744 \uD568\uAED8 \uC990\uAE30\uACE0 \uC788\uB124\uC694.";
  var UNCLASSIFIED = { id: "unclassified", label: "\uC544\uC9C1 \uBD84\uB958\uD558\uC9C0 \uBABB\uD568", persona: "\uC774\uB984\uD45C \uC5C6\uB294 \uC11C\uB78D", color: "#b8c0cc" };
  var CHARACTER_IMG = Object.fromEntries(
    ["vlog", "entertain", "game", "beauty", "knowledge", "music", "sports", "news"].map((id) => [id, `./asset/characters/${id}.png`])
  );
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
  var MIN_SAMPLE = 30;

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
  function hasBatchim(word) {
    const code = String(word).charCodeAt(String(word).length - 1) - 44032;
    return code >= 0 && code <= 11171 && code % 28 !== 0;
  }
  function withIyeyo(word) {
    return word + (hasBatchim(word) ? "\uC774\uC5D0\uC694" : "\uC608\uC694");
  }
  function withIeosseoyo(word) {
    return word + (hasBatchim(word) ? "\uC774\uC5C8\uC5B4\uC694" : "\uC600\uC5B4\uC694");
  }
  function buildHeadline(comparison, types) {
    const rep = types && types.representative;
    if (!rep) return null;
    const noun = TYPE_NOUN[rep.id];
    const ratio = `\uB0B4 \uC2DC\uCCAD\uC758 ${rep.pct.toFixed(1)}%\uB294 ${withIeosseoyo(noun)}.`;
    const most = `\uB0B4\uAC00 \uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uCF58\uD150\uCE20\uB294 ${withIyeyo(noun)}.`;
    const cmp = comparison || { status: "no-prediction" };
    if (cmp.status === "match") {
      return { main: `\uC608\uC0C1 \uC801\uC911! \uAE30\uB85D\uC758 1\uC704\uB3C4 ${TYPE_BY_ID[cmp.primary.id].persona}!`, sub: [ratio] };
    }
    if (cmp.status === "mismatch") {
      return {
        main: `\uB0B4\uAC00 \uC608\uC0C1\uD55C \uAC74 ${TYPE_BY_ID[cmp.primary.id].persona}, \uAE30\uB85D\uC774 \uAC00\uB9AC\uD0A8 \uAC74 ${TYPE_BY_ID[cmp.actual.id].persona}!`,
        sub: [ratio]
      };
    }
    return { main: null, sub: [ratio, most] };
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
    const channelIdMap = /* @__PURE__ */ new Map();
    for (const r of inPeriod) {
      if (r.channel && !channelTypeMap.has(r.channel)) channelTypeMap.set(r.channel, classifyChannel(r.channel, r.channelId, index).type);
      if (r.channel && r.channelId && !channelIdMap.has(r.channel)) channelIdMap.set(r.channel, r.channelId);
    }
    const channelTitles = /* @__PURE__ */ new Map();
    for (const r of inPeriod) {
      if (!r.channel || !r.title) continue;
      const list = channelTitles.get(r.channel) || [];
      if (list.length < 3 && !list.includes(r.title)) {
        list.push(r.title);
        channelTitles.set(r.channel, list);
      }
    }
    conc.channels.forEach((c) => {
      c.type = channelTypeMap.get(c.name) || UNCLASSIFIED.id;
    });
    const unclassifiedChannels = conc.channels.filter((c) => c.type === UNCLASSIFIED.id).map((c) => ({ ...c, channelId: channelIdMap.get(c.name) || "", titles: channelTitles.get(c.name) || [] }));
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
  function toHistoryEntry(result, prediction) {
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
      prediction: prediction && prediction.primary ? { primary: prediction.primary, secondary: prediction.secondary || [] } : null
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
  function hasEnoughSample(count) {
    return count >= MIN_SAMPLE;
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

  // js/sharecard.js
  var W = 1080;
  var H = 1350;
  var INK = "#3A3A76";
  var MUTED = "#6F7590";
  var ACCENT = "#7468E8";
  var FONT = '"Pretendard Variable", Pretendard, "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif';
  var f = (weight, size) => `${weight} ${size}px ${FONT}`;
  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  function mix(a, b, t) {
    const A = hexToRgb(a), B = hexToRgb(b);
    return `rgb(${A.map((v, i) => Math.round(v * t + B[i] * (1 - t))).join(",")})`;
  }
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function fitFont(ctx, text, weight, size, maxW, min = 24) {
    let s = size;
    ctx.font = f(weight, s);
    while (s > min && ctx.measureText(text).width > maxW) {
      s -= 2;
      ctx.font = f(weight, s);
    }
    return s;
  }
  function wrap(ctx, text, maxW, maxLines) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (const w of words) {
      const t = line ? line + " " + w : w;
      if (ctx.measureText(t).width <= maxW || !line) line = t;
      else {
        lines.push(line);
        line = w;
      }
    }
    if (line) lines.push(line);
    if (lines.length > maxLines) {
      const keep = lines.slice(0, maxLines);
      let last = keep[maxLines - 1];
      while (last.length && ctx.measureText(last + "\u2026").width > maxW) last = last.slice(0, -1);
      keep[maxLines - 1] = last + "\u2026";
      return keep;
    }
    return lines;
  }
  async function loadImage(src) {
    if (!src) return null;
    try {
      const img = new Image();
      img.src = src;
      await img.decode();
      return img;
    } catch {
      return null;
    }
  }
  function shadowCard(ctx, x, y, w, h, r, fill, border) {
    ctx.save();
    ctx.shadowColor = "rgba(32, 56, 120, 0.10)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;
    rr(ctx, x, y, w, h, r);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.restore();
    if (border) {
      rr(ctx, x + 1, y + 1, w - 2, h - 2, r);
      ctx.lineWidth = 2;
      ctx.strokeStyle = border;
      ctx.stroke();
    }
  }
  function draw(ctx, d, img) {
    const BG = "#F6F7FB", SURFACE = "#FFFFFF", SURFACE2 = "#F3F4F9", LINE = "#E6E8F2";
    const tc = d.color;
    const [r0, g0, b0] = hexToRgb(tc);
    const light = 0.299 * r0 + 0.587 * g0 + 0.114 * b0 > 150;
    const deep = mix(tc, INK, light ? 0.5 : 0.85);
    const X = 56, CW = W - X * 2;
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    ctx.textBaseline = "alphabetic";
    rr(ctx, X, 52, 52, 52, 14);
    ctx.fillStyle = ACCENT;
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = f(800, 28);
    ctx.textAlign = "center";
    ctx.fillText("R", X + 26, 88);
    ctx.textAlign = "left";
    ctx.fillStyle = INK;
    ctx.font = f(800, 30);
    ctx.fillText("RE:VIEW", X + 68, 89);
    if (d.isSample) {
      ctx.font = f(800, 22);
      const tw = ctx.measureText("\uC608\uC2DC \uB370\uC774\uD130").width + 36;
      rr(ctx, W - X - tw, 58, tw, 42, 21);
      ctx.fillStyle = "#E5F8F4";
      ctx.fill();
      ctx.fillStyle = "#1F9D87";
      ctx.textAlign = "center";
      ctx.fillText("\uC608\uC2DC \uB370\uC774\uD130", W - X - tw / 2, 87);
    }
    ctx.textAlign = "left";
    ctx.fillStyle = ACCENT;
    ctx.font = f(700, 24);
    ctx.fillText(`\uB098\uC758 \uC2DC\uCCAD \uAE30\uB85D \uB3CC\uC544\uBCF4\uAE30 \xB7 ${d.periodText}`, X, 168);
    ctx.fillStyle = INK;
    ctx.font = f(800, 46);
    ctx.fillText("\uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D \uC18D \uB098", X, 226);
    const py = 262, ph = 322;
    shadowCard(ctx, X, py, CW, ph, 44, mix(tc, "#FFFFFF", 0.13), mix(tc, "#FFFFFF", 0.24));
    const imgBox = 290;
    const textW = CW - 96 - (img ? imgBox : 0);
    ctx.fillStyle = mix(tc, INK, light ? 0.5 : 0.75);
    ctx.font = f(700, 26);
    ctx.fillText("\uB0B4\uAC00 \uAC00\uC7A5 \uB9CE\uC774 \uBCF4\uB294 \uBD84\uC57C", X + 48, py + 72);
    ctx.fillStyle = deep;
    fitFont(ctx, d.persona, 850, 96, textW, 52);
    ctx.fillText(d.persona, X + 48, py + 168);
    if (img) {
      const s = Math.min(imgBox / img.naturalWidth, imgBox / img.naturalHeight);
      const iw = img.naturalWidth * s, ih = img.naturalHeight * s;
      ctx.drawImage(img, X + CW - 36 - iw, py + (ph - ih) / 2, iw, ih);
    }
    if (d.pctText) {
      ctx.fillStyle = INK;
      ctx.font = f(850, 62);
      ctx.fillText(d.pctText, X + 48, py + 258);
      const pw = ctx.measureText(d.pctText).width;
      ctx.fillStyle = MUTED;
      ctx.font = f(500, 24);
      wrap(ctx, d.shareText, textW - pw - 16, 2).forEach((l, i, arr) => ctx.fillText(l, X + 48 + pw + 16, py + 258 - (arr.length - 1) * 32 + i * 32));
    } else {
      ctx.fillStyle = MUTED;
      ctx.font = f(500, 24);
      wrap(ctx, d.shareText, textW, 2).forEach((l, i) => ctx.fillText(l, X + 48, py + 236 + i * 34));
    }
    const ly = py + ph + 24, lh = 448;
    shadowCard(ctx, X, ly, CW, lh, 44, SURFACE);
    ctx.textAlign = "left";
    ctx.fillStyle = INK;
    ctx.font = f(800, 34);
    ctx.fillText("\uB0B4\uAC00 \uBCF4\uB294 \uCF58\uD150\uCE20 \uAD6C\uC131", X + 44, ly + 66);
    ctx.textAlign = "right";
    ctx.fillStyle = MUTED;
    ctx.font = f(500, 22);
    ctx.fillText(`\uC804\uCCB4 ${d.totalText}\uAC74 \uAE30\uC900`, X + CW - 44, ly + 64);
    const rows = d.rows.slice(0, 5);
    rows.forEach((r, i) => {
      const y = ly + 136 + i * 64;
      ctx.textAlign = "left";
      ctx.beginPath();
      ctx.arc(X + 52, y - 9, 8, 0, Math.PI * 2);
      ctx.fillStyle = r.color;
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.font = f(i === 0 && r.top ? 800 : 600, 27);
      ctx.fillText(r.label, X + 72, y);
      ctx.textAlign = "right";
      ctx.font = f(800, 27);
      ctx.fillText(`${r.pctText}%`, X + CW - 44, y);
      const pctW = ctx.measureText(`${r.pctText}%`).width;
      ctx.fillStyle = MUTED;
      ctx.font = f(500, 22);
      ctx.fillText(`${r.countText}\uAC74`, X + CW - 44 - pctW - 14, y);
      const bx = X + 44, bwFull = CW - 88;
      rr(ctx, bx, y + 14, bwFull, 12, 6);
      ctx.fillStyle = SURFACE2;
      ctx.fill();
      const bw = Math.max(r.pct > 0 ? 6 : 0, bwFull * Math.min(1, r.pct / 100));
      if (bw) {
        rr(ctx, bx, y + 14, bw, 12, 6);
        ctx.fillStyle = r.color;
        ctx.fill();
      }
    });
    const by = ly + lh + 24, bh = 150, gap = 20, bw2 = (CW - gap) / 2;
    [["\uB0B4\uAC00 \uC0DD\uAC01\uD55C \uB098 vs \uC2E4\uC81C", d.predictionText], ["\uCC44\uB110 \uC9D1\uC911\uB3C4", d.levelText]].forEach(([k, v], i) => {
      const x = X + i * (bw2 + gap);
      shadowCard(ctx, x, by, bw2, bh, 36, SURFACE);
      ctx.textAlign = "left";
      ctx.fillStyle = MUTED;
      ctx.font = f(700, 22);
      ctx.fillText(k, x + 36, by + 50);
      ctx.fillStyle = INK;
      ctx.font = f(800, 28);
      wrap(ctx, v, bw2 - 72, 2).forEach((l, j) => ctx.fillText(l, x + 36, by + 96 + j * 38));
    });
    ctx.textAlign = "center";
    ctx.fillStyle = MUTED;
    ctx.font = f(500, 21);
    ctx.fillText("RE:VIEW \xB7 \uC2DC\uCCAD\uAE30\uB85D\uC740 \uB0B4 \uBE0C\uB77C\uC6B0\uC800 \uC548\uC5D0\uC11C\uB9CC \uBD84\uC11D\uD588\uC5B4\uC694 \xB7 \uC7AC\uBBF8\uB85C \uBCF4\uB294 \uACB0\uACFC\uC608\uC694", W / 2, H - 40);
    ctx.strokeStyle = LINE;
  }
  async function makeShareCard(d) {
    try {
      await Promise.all([document.fonts.load(f(850, 40)), document.fonts.load(f(600, 40))]);
    } catch {
    }
    const img = await loadImage(d.imgSrc);
    const render2 = (withImg) => new Promise((res, rej) => {
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      draw(canvas.getContext("2d"), d, withImg);
      try {
        canvas.toBlob((b) => b ? res(b) : rej(new Error("blob")), "image/jpeg", 0.92);
      } catch (e) {
        rej(e);
      }
    });
    try {
      return await render2(img);
    } catch {
      return render2(null);
    }
  }
  function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4e3);
  }

  // js/characters-data.js
  var CHARACTER_DATA = {
    vlog: "data:image/webp;base64,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",
    entertain: "data:image/webp;base64,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",
    game: "data:image/webp;base64,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",
    beauty: "data:image/webp;base64,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",
    knowledge: "data:image/webp;base64,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",
    music: "data:image/webp;base64,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",
    sports: "data:image/webp;base64,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",
    news: "data:image/webp;base64,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"
  };

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
    closeConsent();
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
      <p class="eyebrow">\uB098\uC758 \uCF58\uD150\uCE20 \uC18C\uBE44 \uD328\uD134 \uBD84\uC11D</p>
      <h1>\uB0B4\uAC00 \uBCF4\uB294 \uC720\uD29C\uBE0C,<br><em>\uC0DD\uAC01\uD55C \uADF8\uB300\uB85C</em>\uC77C\uAE4C?</h1>
      <p class="lead">\uD3C9\uC18C \uB9CE\uC774 \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD558\uB294 \uC720\uD615\uC744 \uBA3C\uC800 \uACE0\uB974\uACE0, \uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D\uACFC \uBE44\uAD50\uD574 \uBCF4\uC138\uC694.</p>
      <div class="trust-row"><span class="pill">\uC11C\uBC84 \uC804\uC1A1 \uC5C6\uC74C</span><span class="pill">\uB85C\uADF8\uC778 \uC5C6\uC74C</span><span class="pill">\uACC4\uC0B0 \uADFC\uAC70 \uACF5\uAC1C</span></div>
      <div class="btn-row">
        <a class="btn primary" href="#predict" id="startBtn">\uB0B4 \uC2DC\uCCAD \uCDE8\uD5A5 \uC54C\uC544\uBCF4\uAE30</a>
        <button class="btn" id="sampleBtn" type="button">\uC608\uC2DC \uB370\uC774\uD130\uB85C \uB458\uB7EC\uBCF4\uAE30</button>
        ${hist.length ? `<a class="btn" href="#history">\uC774\uC804 \uACB0\uACFC ${hist.length}\uAC1C</a>` : ""}
      </div>
    </div>
    <div class="label-card" aria-label="\uACB0\uACFC \uC608\uC2DC \uBBF8\uB9AC\uBCF4\uAE30">
      <div class="example-tag">\uACB0\uACFC \uC608\uC2DC \xB7 \uAC00\uC0C1 \uB370\uC774\uD130</div>
      <div class="label-title">\uB0B4\uAC00 \uBCF4\uB294 \uCF58\uD150\uCE20 \uAD6C\uC131</div>
      <div class="label-meta"><span>\uC804\uCCB4 248\uAC74 \uAE30\uC900</span><span>\uCD5C\uADFC 6\uAC1C\uC6D4</span></div>
      <div class="label-head"><span>\uCF58\uD150\uCE20 \uC720\uD615</span><span>\uBE44\uC911</span></div>
      ${[["entertain", 34.7, true], ["knowledge", 16.5], ["music", 15.7], ["vlog", 8.5], ["unclassified", 14.1]].map(([id, pct, top]) => `
        <div class="label-row ${top ? "top" : ""}">${dot(TYPE_BY_ID[id].color)}<span class="name">${typeLabel(id)}</span><span></span><span class="pct num">${p1(pct)}%</span><span class="bar"><i style="width:${pct}%;background:${TYPE_BY_ID[id].color}"></i></span></div>`).join("")}
      <div class="label-foot">\uCC44\uB110 \uC9D1\uC911\uB3C4 \uC810\uC218 612 \xB7 \uC0C1\uC704 3\uAC1C \uCC44\uB110 \uC2DC\uCCAD \uBE44\uC911 52.0%</div>
    </div>
  </section>

  <section class="card stack">
    <h2>3\uB2E8\uACC4\uBA74 \uB05D\uB098\uC694</h2>
    <ol class="steps">
      <li><b>\uB0B4\uAC00 \uC0DD\uAC01\uD558\uB294 \uB098</b><span>\uD3C9\uC18C \uAC00\uC7A5 \uB9CE\uC774 \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD558\uB294 \uC720\uD615\uC744 \uACE8\uB77C\uC694.</span></li>
      <li><b>\uAE30\uB85D \uAC00\uC838\uC624\uAE30</b><span>Google Takeout\uC5D0\uC11C \uBC1B\uC740 \uC2DC\uCCAD\uAE30\uB85D \uD30C\uC77C\uC744 \uC62C\uB824\uC694.</span></li>
      <li><b>\uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D \uC18D \uB098</b><span>\uC720\uD615\uBCC4 \uBE44\uC911, \uCC44\uB110 \uC9D1\uC911\uB3C4, \uC608\uC0C1\uACFC\uC758 \uCC28\uC774\uB97C \uD655\uC778\uD574\uC694.</span></li>
    </ol>
  </section>

  <section class="grid-2">
    <div class="card stack">
      <h2>\uC2DC\uCCAD\uAE30\uB85D \uD30C\uC77C \uBC1B\uB294 \uBC29\uBC95</h2>
      <ol class="guide">
        <li><a href="https://takeout.google.com/" target="_blank" rel="noopener">takeout.google.com</a>\uC5D0 \uC811\uC18D\uD574 <b>\uBAA8\uB450 \uC120\uD0DD \uD574\uC81C</b>\uB97C \uB20C\uB7EC\uC694.</li>
        <li><b>YouTube \uBC0F YouTube Music</b>\uB9CC \uC120\uD0DD\uD574\uC694.</li>
        <li><b>\uBAA8\uB4E0 YouTube \uB370\uC774\uD130 \uD3EC\uD568\uB428</b>\uC744 \uB20C\uB7EC <b>\uAE30\uB85D</b>\uB9CC \uB0A8\uACA8\uC694.</li>
        <li><b>\uC5EC\uB7EC \uD615\uC2DD</b>\uC5D0\uC11C \uAE30\uB85D \uD615\uC2DD\uC744 <b>JSON</b>\uC73C\uB85C \uBC14\uAFD4\uC694. (HTML\uB3C4 \uC77D\uC744 \uC218 \uC788\uC5B4\uC694)</li>
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
    <div class="choice" style="--tc:${t.color}">
      <input type="${kind}" name="${name}" id="${name}-${t.id}" value="${t.id}">
      <label for="${name}-${t.id}">${dot(t.color)}${TYPE_NOUN[t.id]}<span class="mark" aria-hidden="true"></span></label>
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
      <button class="btn primary" type="submit" id="predSave">\uC800\uC7A5\uD558\uACE0 \uAE30\uB85D \uAC00\uC838\uC624\uAE30</button>
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
    <p class="eyebrow">2\uB2E8\uACC4 \xB7 \uB0B4 \uC720\uD29C\uBE0C \uAE30\uB85D \uAC00\uC838\uC624\uAE30</p>
    <h1 class="page-title">YouTube \uC2DC\uCCAD\uAE30\uB85D \uD30C\uC77C\uC744 \uC62C\uB824 \uC8FC\uC138\uC694</h1>
    <p class="lead">\uBC1B\uC740 Takeout <b>zip \uD30C\uC77C\uC744 \uADF8\uB300\uB85C</b> \uC62C\uB824 \uC8FC\uC138\uC694. \uD30C\uC77C\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800 \uC548\uC5D0\uC11C\uB9CC \uC77D\uACE0, \uC5B4\uB514\uC5D0\uB3C4 \uBCF4\uB0B4\uAC70\uB098 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC544\uC694.</p>
  </header>
  ${state.dbError ? `<p class="notice warn">${esc(state.dbError)}</p>` : ""}
  <div class="notice small">${pred ? `\uC608\uC0C1 \uC800\uC7A5\uB428: \uAC00\uC7A5 \uB9CE\uC774 <b>${typeLabel(pred.primary)}</b>${pred.secondary.length ? `, \uC790\uC8FC ${pred.secondary.map(typeLabel).join(", ")}` : ""} \xB7 <a href="#predict">\uBC14\uAFB8\uAE30</a>` : '\uC544\uC9C1 \uC608\uC0C1\uC744 \uACE0\uB974\uC9C0 \uC54A\uC558\uC5B4\uC694. \uACB0\uACFC\uC5D0\uC11C \uBE44\uAD50\uD558\uB824\uBA74 <a href="#predict">\uBA3C\uC800 \uC608\uC0C1\uC744 \uACE8\uB77C \uC8FC\uC138\uC694</a>.'}</div>
  <label class="drop" id="drop" for="fileInput">
    <span class="drop-icon" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="m6 10 6-6 6 6"/><path d="M4 20h16"/></svg></span>
    <span class="big">\uD30C\uC77C\uC744 \uC5EC\uAE30\uB85C \uB04C\uC5B4\uB2E4 \uB193\uAC70\uB098 \uB20C\uB7EC\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694</span>
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
      const f2 = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f2) handleFile(f2);
    });
    renderUploadStatus();
    ensureConsent();
  }
  var CONSENT_KEY = "infodiet.consent.v1";
  var consentMemory = false;
  function hasConsent() {
    if (consentMemory) return true;
    try {
      return sessionStorage.getItem(CONSENT_KEY) === "1";
    } catch (e) {
      return false;
    }
  }
  function saveConsent() {
    consentMemory = true;
    try {
      sessionStorage.setItem(CONSENT_KEY, "1");
    } catch (e) {
    }
  }
  function closeConsent() {
    const m = document.getElementById("consent");
    if (m) m.remove();
    document.removeEventListener("keydown", onConsentKey);
  }
  function onConsentKey(e) {
    if (e.key === "Escape") {
      closeConsent();
      go("home");
    }
  }
  function ensureConsent() {
    if (hasConsent() || document.getElementById("consent")) return;
    const modal = document.createElement("div");
    modal.id = "consent";
    modal.className = "modal-bg";
    modal.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="consentTitle">
      <h2 id="consentTitle">\uC2DC\uC791\uD558\uAE30 \uC804\uC5D0 \uD655\uC778\uD574 \uC8FC\uC138\uC694</h2>
      <ul class="consent-list">
        <li>\uC5C5\uB85C\uB4DC\uD55C \uC2DC\uCCAD\uAE30\uB85D \uD30C\uC77C\uC740 <b>\uC774 \uBE0C\uB77C\uC6B0\uC800 \uC548\uC5D0\uC11C\uB9CC</b> \uBD84\uC11D\uB418\uBA70, \uC11C\uBC84\uB85C \uC804\uC1A1\uB418\uAC70\uB098 \uC800\uC7A5\uB418\uC9C0 \uC54A\uC544\uC694.</li>
        <li>\uBD84\uC11D\uC5D0\uB294 <b>\uC2DC\uCCAD\uC77C\uC2DC\uC640 \uCC44\uB110\uBA85(\uCC44\uB110 ID)</b>\uC744 \uC0AC\uC6A9\uD574\uC694. \uAC19\uC740 \uC2DC\uAC01\uC758 \uC911\uBCF5 \uAE30\uB85D\uC744 \uAC78\uB7EC\uB0B4\uAE30 \uC704\uD574 \uC601\uC0C1 \uC8FC\uC18C(\uC5C6\uC73C\uBA74 \uC81C\uBAA9)\uB97C \uBD84\uC11D \uC911\uC5D0\uB9CC \uC784\uC2DC\uB85C \uC4F0\uBA70, \uC720\uD615 \uBD84\uB958\uC5D0\uB294 \uC4F0\uC9C0 \uC54A\uACE0 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC544\uC694.</li>
        <li>\uBD84\uC11D \uACB0\uACFC\uB294 \uBCF8\uC778\uC5D0\uAC8C\uB9CC \uBCF4\uC774\uBA70 \uD300\uC774\uB098 \uC81C3\uC790\uC5D0\uAC8C \uC81C\uACF5\uB418\uC9C0 \uC54A\uC544\uC694.</li>
        <li>\u2018\uC774 \uACB0\uACFC \uC800\uC7A5\uD558\uAE30\u2019\uB97C \uC9C1\uC811 \uB204\uB978 \uACBD\uC6B0\uC5D0\uB9CC \uBD84\uC11D \uAE30\uAC04, \uC720\uD615\uBCC4 \uBE44\uC911, \uCC44\uB110 \uC9D1\uC911\uB3C4 \uC810\uC218\xB7\uC0C1\uC704 3\uAC1C \uCC44\uB110 \uC2DC\uCCAD \uBE44\uC911 \uC694\uC57D\uC774 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uC800\uC7A5\uB3FC\uC694.</li>
        <li>\uC815\uCE58\uC801 \uC131\uD5A5\uC774\uB098 \uCC44\uB110\uC758 \uD638\uBD88\uD638\xB7\uC2E0\uB8B0\uC131\uC740 \uD310\uB2E8\uD558\uC9C0 \uC54A\uACE0, \uC2DC\uCCAD \uD328\uD134 \uC9C0\uD45C\uB9CC \uBCF4\uC5EC\uC918\uC694.</li>
      </ul>
      <div class="btn-row modal-actions">
        <button class="btn" type="button" id="consentCancel">\uCDE8\uC18C</button>
        <button class="btn primary" type="button" id="consentOk">\uB3D9\uC758\uD558\uACE0 \uACC4\uC18D\uD558\uAE30</button>
      </div>
    </div>`;
    document.body.appendChild(modal);
    document.getElementById("consentCancel").addEventListener("click", () => {
      closeConsent();
      go("home");
    });
    document.getElementById("consentOk").addEventListener("click", () => {
      saveConsent();
      closeConsent();
      const d = document.getElementById("drop");
      if (d) d.focus();
    });
    document.addEventListener("keydown", onConsentKey);
    document.getElementById("consentOk").focus();
  }
  async function handleFile(file) {
    state.uploadError = null;
    state.result = null;
    state.savedId = null;
    const box = document.getElementById("uploadStatus");
    box.innerHTML = '<div class="card" role="status"><p>\uD30C\uC77C\uC744 \uC77D\uACE0 \uC788\uC5B4\uC694\u2026</p></div>';
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
    const status = document.getElementById("uploadStatus");
    if (status && status.firstElementChild) {
      const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      status.scrollIntoView({ block: "start", behavior: calm ? "auto" : "smooth" });
    }
  }
  function setDropDone(done) {
    const drop = document.getElementById("drop");
    if (!drop) return;
    drop.classList.toggle("compact", done);
    const big = drop.querySelector(".big");
    if (big) big.textContent = done ? "\uB2E4\uB978 \uD30C\uC77C\uB85C \uBC14\uAFB8\uAE30" : "\uD30C\uC77C\uC744 \uC5EC\uAE30\uB85C \uB04C\uC5B4\uB2E4 \uB193\uAC70\uB098 \uB20C\uB7EC\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694";
  }
  function renderUploadStatus() {
    const box = document.getElementById("uploadStatus");
    if (!box) return;
    if (state.uploadError) {
      setDropDone(false);
      box.innerHTML = `<div class="notice warn" role="alert"><strong>${esc(state.uploadError.message)}</strong><br>${esc(state.uploadError.hint)}</div>`;
      return;
    }
    const u = state.upload;
    if (!u || u.isSample) {
      setDropDone(false);
      box.innerHTML = "";
      return;
    }
    setDropDone(true);
    const { parsed, prepared, range } = u;
    const noChannel = prepared.records.filter((r) => !r.channel).length;
    const info = parsed.info;
    box.innerHTML = `
  <div class="notice ok" role="status">
    <span class="ok-mark" aria-hidden="true">\u2713</span>
    <div><strong>\uD30C\uC77C\uC774 \uD655\uC778\uB418\uC5C8\uC5B4\uC694</strong><br><span class="small">${esc(u.fileName)} \xB7 \uBD84\uC11D \uAC00\uB2A5\uD55C \uAE30\uB85D ${n0(prepared.records.length)}\uAC74</span></div>
  </div>
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
      <li><span class="info"></span><span>\uCC44\uB110 \uC815\uBCF4\uAC00 \uC5C6\uB294 \uAE30\uB85D(\uC0AD\uC81C\xB7\uBE44\uACF5\uAC1C \uC601\uC0C1 \uB4F1) \xB7 \uBD84\uC57C\uB294 \u2018\uC544\uC9C1 \uBD84\uB958\uD558\uC9C0 \uBABB\uD568\u2019, \uC9D1\uC911\uB3C4 \uACC4\uC0B0\uC5D0\uC11C\uB294 \uC81C\uC678</span><span class="num">${n0(noChannel)}\uAC74</span></li>
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
      const enough = hasEnoughSample(cnt);
      el.innerHTML = enough ? `\uC120\uD0DD\uD55C \uAE30\uAC04(${ymd(p.start)} ~ ${ymd(p.end)})\uC758 \uC2DC\uCCAD\uAE30\uB85D <b class="num">${n0(cnt)}\uAC74</b>\uC744 \uBD84\uC11D\uD574\uC694.` : cnt ? `<span class="notice warn" style="display:block"><strong>\uBD84\uC11D\uD560 \uAE30\uB85D\uC774 \uBD80\uC871\uD574\uC694.</strong> \uC120\uD0DD\uD55C \uAE30\uAC04(${ymd(p.start)} ~ ${ymd(p.end)})\uC758 \uC2DC\uCCAD\uAE30\uB85D\uC774 ${n0(cnt)}\uAC74\uC774\uC5D0\uC694. \uACB0\uACFC\uC758 \uC2E0\uB8B0\uB3C4\uB97C \uC704\uD574 \uCD5C\uC18C ${n0(MIN_SAMPLE)}\uAC74\uC774 \uD544\uC694\uD574\uC694. \uAE30\uAC04\uC744 \uB113\uD600 \uC8FC\uC138\uC694.</span>` : `<span class="notice warn" style="display:block">\uC120\uD0DD\uD55C \uAE30\uAC04(${ymd(p.start)} ~ ${ymd(p.end)})\uC5D0\uB294 \uC2DC\uCCAD\uAE30\uB85D\uC774 \uC5C6\uC5B4\uC694. \uAE30\uAC04\uC744 \uB113\uD600 \uC8FC\uC138\uC694.</span>`;
      btn.disabled = !enough || !!state.dbError;
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
      ["concentration", "\uCC44\uB110 \uC9D1\uC911\uB3C4 \uC810\uC218 \uACC4\uC0B0"],
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
    if (!state.upload.isSample && !hasEnoughSample(inPeriod.length)) {
      set("period", "fail", `${period.label} \xB7 ${n0(inPeriod.length)}\uAC74`);
      app.insertAdjacentHTML("beforeend", `<div class="notice warn" role="alert"><strong>\uBD84\uC11D\uD560 \uAE30\uB85D\uC774 \uBD80\uC871\uD574\uC694.</strong> \uC120\uD0DD\uD55C \uAE30\uAC04\uC758 \uC2DC\uCCAD\uAE30\uB85D\uC774 ${n0(inPeriod.length)}\uAC74\uC774\uC5D0\uC694. \uACB0\uACFC\uC758 \uC2E0\uB8B0\uB3C4\uB97C \uC704\uD574 \uCD5C\uC18C ${n0(MIN_SAMPLE)}\uAC74\uC774 \uD544\uC694\uD574\uC694.<div class="btn-row" style="margin-top:10px"><a class="btn" href="#upload">\uAE30\uAC04 \uBC14\uAFB8\uAE30</a><a class="btn" href="#home">\uBA54\uC778\uC73C\uB85C</a></div></div>`);
      return;
    }
    set("db", "run");
    await frame();
    set("db", "done", `\uB4F1\uB85D \uCC44\uB110 ${n0(state.index.size)}\uAC1C`);
    set("classify", "run");
    await frame();
    const result = analyze(state.upload.prepared.records, period, state.index, activePrediction());
    set("classify", "done", `\uBD84\uB958 ${n0(result.types.classifiedCount)}\uAC74 \xB7 \uBD84\uB958\uD558\uC9C0 \uBABB\uD568 ${n0(result.types.unclassifiedCount)}\uAC74`);
    set("concentration", "run");
    await frame();
    set("concentration", "done", `\uCC44\uB110 ${n0(result.concentration.channelCount)}\uAC1C \xB7 \uC9D1\uC911\uB3C4 \uC810\uC218 ${n0(Math.round(result.concentration.hhi))}`);
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
      <a class="btn primary" href="#upload">\uB0B4 \uC720\uD29C\uBE0C \uAE30\uB85D \uAC00\uC838\uC624\uAE30</a>
      <a class="btn" href="#history">\uC774\uC804 \uACB0\uACFC \uBCF4\uAE30</a>
    </div>
  </section>`;
  }
  function comparisonCard(cmp, pred) {
    const mine = pred && pred.primary ? `<div class="t">${typeLabel(pred.primary)}</div>${pred.secondary && pred.secondary.length ? `<div class="small">\uC790\uC8FC \uBCF8\uB2E4\uACE0 \uC0DD\uAC01\uD55C \uC720\uD615: ${pred.secondary.map(typeLabel).join(", ")}</div>` : ""}<div class="small muted">\uBD84\uC11D \uC804\uC5D0 \uB0B4\uAC00 \uACE0\uB978 \uC790\uAE30 \uC778\uC2DD\uC774\uC5D0\uC694.</div>` : `<div class="small">\uC544\uC9C1 \uC608\uC0C1\uC744 \uACE0\uB974\uC9C0 \uC54A\uC558\uC5B4\uC694.</div><a class="btn small" href="#predict">\uC608\uC0C1 \uACE0\uB974\uAE30</a>`;
    const r = state.result.types.representative;
    const real = r ? `<div class="t">${r.label}</div><div class="small">\uC804\uCCB4 \uC2DC\uCCAD\uAE30\uB85D\uC758 <b class="num">${p1(r.pct)}%</b> (${n0(r.count)}\uAC74)</div><div class="small muted">\uC5C5\uB85C\uB4DC\uD55C \uC2DC\uCCAD\uAE30\uB85D\uC5D0\uC11C \uACC4\uC0B0\uD55C \uAC12\uC774\uC5D0\uC694.</div>` : '<div class="small">\uBD84\uB958\uB41C \uAE30\uB85D\uC774 \uC5C6\uC5B4 \uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uBD84\uC57C\uB97C \uC815\uD560 \uC218 \uC5C6\uC5B4\uC694.</div>';
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
      msg = '<p class="small muted">\uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uBD84\uC57C\uAC00 \uC5C6\uC5B4 \uBE44\uAD50 \uBB38\uAD6C\uB97C \uBCF4\uC5EC\uB4DC\uB9AC\uC9C0 \uC54A\uC544\uC694.</p>';
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
  function topChannelsCard(top5, c) {
    if (!top5.length) return "";
    const max = Math.max(...top5.map((x) => x.count));
    return `<div class="card stack top-mini">
      <h2>\uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uCC44\uB110 5\uAC1C</h2>
      <ol class="top-list">${top5.map((x, i) => {
      const ty = TYPE_BY_ID[x.type] || UNCLASSIFIED;
      return `<li>
          <span class="rank num">${i + 1}</span>
          <span class="top-name"><b>${esc(x.name)}</b><span class="top-type">${dot(ty.color)}${typeLabel(x.type)}</span></span>
          <span class="top-cnt num">${n0(x.count)}\uAC74 \xB7 ${p1(x.pct)}%</span>
          <span class="bar"><i style="width:${x.count / max * 100}%;background:${ty.color}"></i></span>
        </li>`;
    }).join("")}</ol>
      <p class="small muted">\uCC44\uB110 \uC815\uBCF4\uAC00 \uC788\uB294 ${n0(c.withChannel)}\uAC74 \uAE30\uC900\uC774\uC5D0\uC694.</p>
    </div>`;
  }
  var EASY_LEVEL = {
    low: "\uC5EC\uB7EC \uCC44\uB110\uC744 \uACE0\uB974\uAC8C \uBD10\uC694",
    mid: "\uBA87\uBA87 \uCC44\uB110\uC744 \uC790\uC8FC \uBD10\uC694",
    high: "\uC77C\uBD80 \uCC44\uB110\uC5D0 \uB9CE\uC774 \uBAB0\uB824 \uC788\uC5B4\uC694",
    veryhigh: "\uAC70\uC758 \uBA87 \uCC44\uB110\uB9CC \uBD10\uC694"
  };
  function easyConcentrationCard(c, t, r) {
    const level = c.level ? EASY_LEVEL[c.level.tone] || c.level.label : "\uACC4\uC0B0\uD560 \uC218 \uC5C6\uC5B4\uC694";
    return `<section class="card stack">
    <h2>\uB0B4 \uC2DC\uCCAD\uC740 \uC5BC\uB9C8\uB098 \uD55C\uACF3\uC5D0 \uBAA8\uC5EC \uC788\uC744\uAE4C?</h2>
    <div class="easy-stats">
      <div class="easy-stat">
        <span class="easy-label">\uCC44\uB110 \uC9D1\uC911\uB3C4 ${HHI_LEVELS.provisional ? '<span class="pill warn" title="' + esc(HHI_LEVELS.note) + '">\uC784\uC2DC \uAE30\uC900</span>' : ""}</span>
        <span class="easy-value">${level}</span>
        <span class="small muted">\uCC44\uB110 \uC9D1\uC911\uB3C4 \uC810\uC218 <b class="num">${n0(Math.round(c.hhi))}</b>\uC810 (\uCD5C\uB300 10,000\uC810). 0\uC5D0 \uAC00\uAE4C\uC6B8\uC218\uB85D \uC5EC\uB7EC \uCC44\uB110\uC744 \uACE8\uACE0\uB8E8 \uBD24\uB2E4\uB294 \uB73B\uC774\uC5D0\uC694. \uCC44\uB110 \uC815\uBCF4\uAC00 \uC788\uB294 ${n0(c.withChannel)}\uAC74 \uAE30\uC900\uC774\uC5D0\uC694.</span>
      </div>
      <div class="easy-stat">
        <span class="easy-label">\uC0C1\uC704 3\uAC1C \uCC44\uB110 \uC2DC\uCCAD \uBE44\uC911</span>
        <span class="easy-value"><b class="num">${p1(c.cr3)}%</b></span>
        <span class="small muted">\uAC00\uC7A5 \uB9CE\uC774 \uBCF8 3\uAC1C \uCC44\uB110\uC774 \uCC44\uB110 \uC815\uBCF4\uAC00 \uC788\uB294 ${n0(c.withChannel)}\uAC74\uC758 ${p1(c.cr3)}%\uB97C \uCC28\uC9C0\uD574\uC694.</span>
        <span class="small muted">${c.cr3Channels.map((x) => esc(x.name)).join(", ") || "\uCC44\uB110 \uC815\uBCF4 \uC5C6\uC74C"}</span>
      </div>
      <div class="easy-stat">
        <span class="easy-label">\uC544\uC9C1 \uBD84\uB958\uD558\uC9C0 \uBABB\uD55C \uAE30\uB85D</span>
        <span class="easy-value"><b class="num">${p1(t.unclassifiedPct)}%</b></span>
        <span class="small muted">\uC804\uCCB4 ${n0(r.total)}\uAC74 \uAE30\uC900\uC774\uC5D0\uC694. \uCC44\uB110 DB\uC5D0 \uC544\uC9C1 \uC5C6\uB294 \uCC44\uB110\uC774\uB77C \uBD84\uC57C\uB97C \uC815\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694.</span>
      </div>
    </div>
    <p class="small muted">\uC774 \uC22B\uC790\uB294 \uBA87\uBA87 \uCC44\uB110\uC5D0 \uC5BC\uB9C8\uB098 \uBAB0\uB824 \uC788\uB294\uC9C0\uB9CC \uBCF4\uC5EC\uC918\uC694. \uC88B\uACE0 \uB098\uC068\uC774\uB098 \uC815\uBCF4\uC758 \uB2E4\uC591\uC131\xB7\uC2E0\uB8B0\uB3C4\uB97C \uD310\uB2E8\uD558\uC9C0 \uC54A\uC544\uC694. \uACC4\uC0B0 \uBC29\uBC95(\uCC44\uB110 \uC9D1\uC911\uB3C4 \uC810\uC218\xB7\uC0C1\uC704 3\uAC1C \uCC44\uB110 \uC2DC\uCCAD \uBE44\uC911)\uC740 <a href="#detail">\uC0C1\uC138 \uBD84\uC11D</a>\uC5D0\uC11C \uBCFC \uC218 \uC788\uC5B4\uC694.</p>
  </section>`;
  }
  function shareCardData(r, sorted, pred) {
    const t = r.types;
    const c = r.concentration;
    const rep = t.representative;
    const nonzero = sorted.filter((x) => x.count > 0);
    const cls = nonzero.filter((x) => x.id !== UNCLASSIFIED.id);
    const unc = nonzero.find((x) => x.id === UNCLASSIFIED.id);
    const rows = [...cls.slice(0, unc ? 4 : 5), ...unc ? [unc] : []].map((x, i) => ({ label: x.label, color: x.color, pct: x.pct, pctText: p1(x.pct), countText: n0(x.count), top: i === 0 && x.id !== UNCLASSIFIED.id }));
    const cmp = r.comparison;
    let predictionText = "\uC608\uC0C1 \uC5C6\uC774 \uBD84\uC11D\uD588\uC5B4\uC694";
    if (cmp.status === "match") predictionText = `\uC608\uC0C1 \uC801\uC911! \uAE30\uB85D\uC758 1\uC704\uB3C4 ${TYPE_BY_ID[cmp.primary.id].persona}!`;
    else if (cmp.status === "mismatch") predictionText = `\uB0B4\uAC00 \uC608\uC0C1\uD55C \uAC74 ${TYPE_BY_ID[cmp.primary.id].persona}, \uAE30\uB85D\uC774 \uAC00\uB9AC\uD0A8 \uAC74 ${TYPE_BY_ID[cmp.actual.id].persona}!`;
    else if (cmp.status === "no-actual") predictionText = "\uBD84\uB958\uB41C \uAE30\uB85D\uC774 \uC5C6\uC5B4 \uBE44\uAD50\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694";
    const levelText = c.level ? EASY_LEVEL[c.level.tone] || c.level.label : "\uACC4\uC0B0\uD560 \uC218 \uC5C6\uC5B4\uC694";
    return {
      persona: rep ? rep.persona : UNCLASSIFIED.persona,
      color: rep ? TYPE_BY_ID[rep.id].color : "#7c8594",
      imgSrc: rep ? CHARACTER_DATA[rep.id] || CHARACTER_IMG[rep.id] : null,
      pctText: rep ? `${p1(rep.pct)}%` : "",
      shareText: rep ? `${rep.label} \uCF58\uD150\uCE20 \xB7 ${n0(rep.count)}\uAC74\uC73C\uB85C \uAC00\uC7A5 \uB9CE\uC544\uC694` : "\uCC44\uB110 \uC815\uBCF4\uAC00 \uC544\uC9C1 \uC5C6\uC5B4 \uBD84\uC57C\uB97C \uC815\uD558\uC9C0 \uBABB\uD55C \uAE30\uB85D\uC774\uC5D0\uC694.",
      rows,
      totalText: n0(r.total),
      periodText: `${ymd(r.period.start)} ~ ${ymd(r.period.end)}`,
      predictionText,
      levelText,
      isSample: !!(state.upload && state.upload.isSample)
    };
  }
  function headlineHtml(h) {
    if (!h) return "";
    return `${h.main ? `<p class="lead"><b>${esc(h.main)}</b></p>` : ""}<p class="lead">${h.sub.map(esc).join(" ")}</p>`;
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
    const headline = buildHeadline(r.comparison, t);
    const sorted = [...t.rows].sort((a, b) => (a.id === UNCLASSIFIED.id) - (b.id === UNCLASSIFIED.id) || b.count - a.count);
    const hist = storage.getHistory().filter((e) => e.id !== state.savedId);
    const prevEntry = hist[0];
    const shown = sorted.filter((x) => x.count > 0);
    const zeroCount = sorted.filter((x) => x.count === 0 && x.id !== UNCLASSIFIED.id).length;
    const sumPct = t.rows.reduce((s, x) => s + x.pct, 0);
    app.innerHTML = `
  ${sampleBanner()}
  <header class="stack">
    <p class="eyebrow">\uB098\uC758 \uC2DC\uCCAD \uAE30\uB85D \uB3CC\uC544\uBCF4\uAE30 \xB7 ${esc(state.upload.isSample ? "\uC608\uC2DC \uB370\uC774\uD130" : state.upload.fileName)}</p>
    <h1 class="page-title">\uC2E4\uC81C \uC2DC\uCCAD\uAE30\uB85D \uC18D \uB098</h1>
    <p class="lead">${ymd(r.period.start)} ~ ${ymd(r.period.end)} \uB3D9\uC548\uC758 \uC2DC\uCCAD\uAE30\uB85D <b class="num">${n0(r.total)}\uAC74</b>\uC744 \uCC44\uB110 \uAE30\uC900\uC73C\uB85C \uBD84\uB958\uD588\uC5B4\uC694.</p>
    ${headlineHtml(headline)}
  </header>

  ${t.lowClassification ? `<p class="notice warn">\uC2DC\uCCAD\uAE30\uB85D\uC758 <b>${p1(t.unclassifiedPct)}%</b>\uAC00 \uC544\uC9C1 \uCC44\uB110 DB\uC5D0 \uC5C6\uB294 \uCC44\uB110\uC774\uB77C \u2018\uC544\uC9C1 \uBD84\uB958\uD558\uC9C0 \uBABB\uD55C \uAE30\uB85D\u2019\uC73C\uB85C \uB0A8\uC558\uC5B4\uC694. \uBD84\uC11D\uC5D0 \uD55C\uACC4\uAC00 \uC788\uC5B4\uC694. \uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uBD84\uC57C\uB294 \uBD84\uB958\uB41C \uAE30\uB85D\uB9CC\uC73C\uB85C \uC815\uD588\uAE30 \uB54C\uBB38\uC5D0 \uC2E4\uC81C\uC640 \uCC28\uC774\uAC00 \uD074 \uC218 \uC788\uC5B4\uC694. \uBD84\uB958\uD558\uC9C0 \uBABB\uD55C \uCC44\uB110 \uBAA9\uB85D\uC740 <a href="#detail">\uC0C1\uC138 \uBD84\uC11D</a>\uC5D0\uC11C \uBCFC \uC218 \uC788\uC5B4\uC694.</p>` : ""}

  <section class="grid-2 result-top">
    <div class="result-col">
    ${rep ? `<div class="persona-card" style="--tc:${TYPE_BY_ID[rep.id].color}">
        <div class="persona-head">
          <div class="persona-text">
            <span class="kicker">\uB0B4\uAC00 \uAC00\uC7A5 \uB9CE\uC774 \uBCF4\uB294 \uBD84\uC57C</span>
            <span class="persona">${rep.persona}</span>
            <p class="persona-desc">${PERSONA_DESC[rep.id] || ""} ${PERSONA_COMMON}</p>
          </div>
          ${CHARACTER_IMG[rep.id] ? `<img class="persona-char" src="${CHARACTER_IMG[rep.id]}" alt="${rep.persona} \uCE90\uB9AD\uD130" width="360" height="360">` : ""}
        </div>
        <div class="share"><b>${p1(rep.pct)}%</b><span>${rep.label} \uCF58\uD150\uCE20 \xB7 ${n0(rep.count)}\uAC74\uC73C\uB85C \uAC00\uC7A5 \uB9CE\uC544\uC694</span></div>
        ${t.tiedTopIds.length > 1 ? `<p class="small">\uAC19\uC740 \uAC74\uC218\uB85C \uACF5\uB3D9 1\uC704: ${t.tiedTopIds.map(typeLabel).join(", ")}</p>` : ""}
        <p class="fine">\uC720\uD615 \uC774\uB984\uC740 \uC7AC\uBBF8\uB97C \uC704\uD55C \uD45C\uD604\uC774\uC5D0\uC694. \uC131\uACA9\uC774\uB098 \uC815\uCCB4\uC131\uC744 \uD310\uC815\uD558\uC9C0 \uC54A\uC544\uC694.</p>
      </div>` : `<div class="persona-card" style="--tc:#7c8594">
        <div class="persona-text">
          <span class="kicker">\uB0B4\uAC00 \uAC00\uC7A5 \uB9CE\uC774 \uBCF4\uB294 \uBD84\uC57C</span>
          <span class="persona">${UNCLASSIFIED.persona}</span>
        </div>
        <p class="persona-desc">${PERSONA_DESC.unclassified}</p>
        <p class="fine">\uC720\uD615 \uC774\uB984\uC740 \uC7AC\uBBF8\uB97C \uC704\uD55C \uD45C\uD604\uC774\uC5D0\uC694. \uC131\uACA9\uC774\uB098 \uC815\uCCB4\uC131\uC744 \uD310\uC815\uD558\uC9C0 \uC54A\uC544\uC694.</p>
      </div>`}
    ${topChannelsCard(r.top5, c)}
    </div>
    <div class="label-card" aria-label="\uCF58\uD150\uCE20 \uC720\uD615\uBCC4 \uBE44\uC911">
      ${state.upload.isSample ? '<div class="example-tag">\uC608\uC2DC \uB370\uC774\uD130</div>' : ""}
      <div class="label-title">\uB0B4\uAC00 \uBCF4\uB294 \uCF58\uD150\uCE20 \uAD6C\uC131</div>
      <div class="label-meta"><span>\uC804\uCCB4 <b class="num">${n0(r.total)}</b>\uAC74 \uAE30\uC900</span><span>${esc(r.period.label)}</span></div>
      <div class="label-head"><span>\uCF58\uD150\uCE20 \uC720\uD615</span><span>\uAC74\uC218 \xB7 \uBE44\uC911</span></div>
      ${shown.map((x) => `<div class="label-row ${rep && t.tiedTopIds.includes(x.id) ? "top" : ""}">${dot(x.color)}<span class="name">${x.label}</span><span class="cnt num">${n0(x.count)}\uAC74</span><span class="pct num">${p1(x.pct)}%</span><span class="bar"><i style="width:${x.pct}%;background:${x.color}"></i></span></div>`).join("")}
      <div class="label-foot">\uBE44\uC911 = \uC720\uD615\uBCC4 \uAC74\uC218 \xF7 \uC804\uCCB4 ${n0(r.total)}\uAC74 \xD7 100 \xB7 \uD569\uACC4 ${p1(sumPct)}% (\uD45C\uC2DC\uAC12\uC740 \uBC18\uC62C\uB9BC)${zeroCount ? `<br>\uBCF8 \uAE30\uB85D\uC774 \uC5C6\uB294 \uC720\uD615 ${zeroCount}\uAC1C` : ""}</div>
    </div>
  </section>

  ${comparisonCard(r.comparison, pred)}

  <section class="card stack">
    <h2>\uC0C8\uB85C\uC6B4 \uCF58\uD150\uCE20 \uC720\uD615 \uD0D0\uC0C9</h2>
    ${r.suggestion ? `<p>${esc(r.suggestion.message)}</p>
      <ul class="explore-list">${r.suggestion.types.map((x) => {
      const url = youtubeSearchUrl(x.id);
      return `<li class="explore-item">
          <div class="explore-info">
            <span class="explore-name">${dot(x.color)} ${x.label} \xB7 ${TYPE_BY_ID[x.id].persona}</span>
            <span class="explore-meta">\uB0B4 \uC2DC\uCCAD \uBE44\uC911 <b class="num">${p1(x.pct)}%</b> \xB7 \uAC80\uC0C9\uC5B4 \u201C${esc(exploreQuery(x.id))}\u201D</span>
          </div>
          ${url ? `<a class="btn explore-btn" href="${esc(url)}" target="_blank" rel="noopener noreferrer" data-explore="${x.id}" aria-label="\uC720\uD29C\uBE0C\uC5D0\uC11C ${x.label} \uD0D0\uC0C9\uD558\uAE30 (\uC0C8 \uD0ED\uC5D0\uC11C \uC5F4\uB9BC)">\uC720\uD29C\uBE0C\uC5D0\uC11C \uD0D0\uC0C9\uD558\uAE30<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg></a>` : ""}
        </li>`;
    }).join("")}</ul>
      <p class="small muted">\uBC84\uD2BC\uC744 \uB204\uB974\uBA74 \uC0C8 \uD0ED\uC5D0\uC11C \uC720\uD29C\uBE0C \uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5F4\uB824\uC694. \uAC80\uC0C9 \uACB0\uACFC\uB294 \uC720\uD29C\uBE0C\uAC00 \uBCF4\uC5EC\uC8FC\uB294 \uAC83\uC73C\uB85C, \uC774 \uC11C\uBE44\uC2A4\uAC00 \uD2B9\uC815 \uCC44\uB110\uC774\uB098 \uC601\uC0C1\uC744 \uACE8\uB77C \uCD94\uCC9C\uD558\uC9C0\uB294 \uC54A\uC544\uC694. \uC801\uAC8C \uBCF8 \uC720\uD615\uC774 \uB354 \uC88B\uB2E4\uB294 \uB73B\uB3C4 \uC544\uB2C8\uC5D0\uC694.</p>` : '<p class="muted">\uBD84\uB958\uB41C \uAE30\uB85D\uC774 \uBD80\uC871\uD574 \uC81C\uC548\uD560 \uC720\uD615\uC774 \uC5C6\uC5B4\uC694.</p>'}
  </section>

  ${easyConcentrationCard(c, t, r)}

  <section class="grid-2">
    <div class="card stack">
      <h2>\uB0B4\uAC00 \uC790\uC8FC \uBCF4\uB294 \uCF58\uD150\uCE20\uB294?</h2>
      <p class="sub">\uADF8\uB798\uD504 \uC704\uC5D0 \uB9C8\uC6B0\uC2A4\uB97C \uC62C\uB9AC\uAC70\uB098 \uB20C\uB7EC \uC815\uD655\uD55C \uAC74\uC218\uC640 \uBE44\uC911\uC744 \uD655\uC778\uD574 \uBCF4\uC138\uC694.</p>
      <div class="chart-box"><canvas id="typeChart" aria-label="\uCF58\uD150\uCE20 \uC720\uD615\uBCC4 \uBE44\uC911 \uB3C4\uB11B \uCC28\uD2B8" role="img"></canvas></div>
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
    <h2>\uC774 \uACB0\uACFC\uB97C \uC77D\uB294 \uBC29\uBC95</h2>
    <ul class="small" style="margin:0;padding-left:18px;display:grid;gap:4px">
      <li>\uBAA8\uB4E0 \uBE44\uC911\uC740 <b>\uC2DC\uCCAD\uAE30\uB85D \uAC74\uC218</b> \uAE30\uC900\uC774\uC5D0\uC694. Takeout \uD30C\uC77C\uC5D0\uB294 \uC2DC\uCCAD \uC2DC\uAC04\uC774 \uC5C6\uC5B4\uC11C, 1\uBD84\uC9DC\uB9AC \uC601\uC0C1\uACFC 1\uC2DC\uAC04\uC9DC\uB9AC \uC601\uC0C1\uC744 \uAC19\uC740 1\uAC74\uC73C\uB85C \uC138\uC694.</li>
      <li>\uCF58\uD150\uCE20 \uC720\uD615\uC740 \uC601\uC0C1 \uC81C\uBAA9\uC774 \uC544\uB2C8\uB77C <b>\uCC44\uB110</b>\uB85C \uC815\uD574\uC694. \uCC44\uB110 DB\uC5D0 \uB4F1\uB85D\uB41C \uCC44\uB110\uB9CC \uBD84\uB958\uB418\uACE0, \uB098\uBA38\uC9C0\uB294 \u2018\uC544\uC9C1 \uBD84\uB958\uD558\uC9C0 \uBABB\uD55C \uAE30\uB85D\u2019\uC73C\uB85C \uB0A8\uC544\uC694.</li>
      <li>\uAC19\uC740 \uC601\uC0C1\uC744 \uB2E4\uC2DC \uBCF4\uBA74 \uAC01\uAC01 1\uAC74\uC73C\uB85C \uC138\uC694. \uAC19\uC740 \uC2DC\uAC01\uC5D0 \uAC19\uC740 \uC601\uC0C1\uC774 \uB450 \uBC88 \uAE30\uB85D\uB41C \uACBD\uC6B0\uB9CC \uC911\uBCF5\uC73C\uB85C \uBCF4\uACE0 \uBE90\uC5B4\uC694.</li>
      <li>\uC774 \uACB0\uACFC\uB294 \uC88B\uACE0 \uB098\uC068\uC758 \uD3C9\uAC00\uAC00 \uC544\uB2C8\uB77C, \uC2DC\uCCAD \uD328\uD134\uC744 \uC2A4\uC2A4\uB85C \uB3CC\uC544\uBCF4\uAE30 \uC704\uD55C \uAC70\uC6B8\uC774\uC5D0\uC694.</li>
    </ul>
  </section>

  ${prevEntry && !state.upload.isSample ? quickCompare(prevEntry) : ""}

  <div class="btn-row">
    <button class="btn primary" id="saveBtn" type="button">${state.savedId ? "\uACB0\uACFC \uC774\uBBF8\uC9C0 \uB2E4\uC2DC \uC800\uC7A5\uD558\uAE30" : "\uC774 \uACB0\uACFC \uC800\uC7A5\uD558\uAE30"}</button>
    <a class="btn" href="#detail">\uC0C1\uC138 \uBD84\uC11D \xB7 \uACC4\uC0B0 \uADFC\uAC70</a>
    <a class="btn" href="#history">\uC774\uC804 \uACB0\uACFC\uC640 \uBE44\uAD50</a>
  </div>
  <p class="small muted">\uB204\uB974\uBA74 \uAC00\uC7A5 \uB9CE\uC774 \uBCF4\uB294 \uBD84\uC57C\uC640 \uC2DC\uCCAD \uAD6C\uC131\uC744 \uB2F4\uC740 \uACF5\uC720\uC6A9 \uC774\uBBF8\uC9C0(JPG)\uAC00 \uB0B4 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB3FC\uC694. \uCC44\uB110 \uC774\uB984\uACFC \uC601\uC0C1 \uC81C\uBAA9\uC740 \uC774\uBBF8\uC9C0\uC5D0 \uB123\uC9C0 \uC54A\uC544\uC694. ${state.upload.isSample ? "\uC608\uC2DC \uB370\uC774\uD130 \uACB0\uACFC\uB294 \uC774\uBBF8\uC9C0\uC5D0 \u2018\uC608\uC2DC \uB370\uC774\uD130\u2019\uB85C \uD45C\uC2DC\uB418\uACE0, \uC774\uC804 \uACB0\uACFC \uBAA9\uB85D\uC5D0\uB294 \uB0A8\uC9C0 \uC54A\uC544\uC694." : "\uC720\uD615\uBCC4 \uBE44\uC911, \uCC44\uB110 \uC9D1\uC911\uB3C4 \uC810\uC218, \uC0C1\uC704 3\uAC1C \uCC44\uB110 \uC2DC\uCCAD \uBE44\uC911, \uBD84\uC11D \uAE30\uAC04, \uB0B4 \uC608\uC0C1\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC758 \u2018\uC774\uC804 \uACB0\uACFC\u2019\uC5D0\uB3C4 \uB0A8\uC544\uC694."}</p>`;
    typeDonut(document.getElementById("typeChart"), sorted);
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
    save.addEventListener("click", async () => {
      save.disabled = true;
      const label = save.textContent;
      save.textContent = "\uC774\uBBF8\uC9C0 \uB9CC\uB4DC\uB294 \uC911\u2026";
      let imageOk = false;
      try {
        const blob = await makeShareCard(shareCardData(r, sorted, activePrediction()));
        const d = /* @__PURE__ */ new Date();
        downloadBlob(blob, `review-\uACB0\uACFC-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}.jpg`);
        imageOk = true;
      } catch (e) {
        console.error(e);
      }
      let historyMsg = "";
      if (!state.upload.isSample && !state.savedId) {
        const entry = toHistoryEntry(r, activePrediction());
        if (storage.addHistory(entry)) {
          state.savedId = entry.id;
          historyMsg = " \uC774\uC804 \uACB0\uACFC\uC5D0\uB3C4 \uAE30\uB85D\uD588\uC5B4\uC694.";
        }
      }
      toast(imageOk ? "\uACB0\uACFC \uC774\uBBF8\uC9C0\uB97C \uC800\uC7A5\uD588\uC5B4\uC694." + historyMsg : "\uC774\uBBF8\uC9C0\uB97C \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC5B4\uC694." + historyMsg);
      if (historyMsg) render();
      else {
        save.disabled = false;
        save.textContent = label;
      }
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
      <dt>\uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uBD84\uC57C</dt><dd>${prev.representative ? typeLabel(prev.representative) : "\uC5C6\uC74C"} \u2192 ${curr.representative ? typeLabel(curr.representative) : "\uC5C6\uC74C"}${cmp.representativeChanged ? ' <span class="pill accent">\uBC14\uB01C</span>' : ""}</dd>
      <dt>\uCC44\uB110 \uC9D1\uC911\uB3C4 \uC810\uC218</dt><dd><span class="num">${n0(Math.round(prev.hhi))} \u2192 ${n0(Math.round(curr.hhi))}</span> (${signed(cmp.hhi.diff, 0)})</dd>
      <dt>\uC0C1\uC704 3\uAC1C \uCC44\uB110 \uC2DC\uCCAD \uBE44\uC911</dt><dd><span class="num">${p1(prev.cr3)}% \u2192 ${p1(curr.cr3)}%</span> (${signed(cmp.cr3.diff, 1, "%p")})</dd>
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
    const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = ["channel_name,channel_id,watch_count,sample_titles,type", ...r.unclassifiedChannels.map((x) => `${q(x.name)},${x.channelId || ""},${x.count},${q((x.titles || []).join(" | "))},`)].join("\n");
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
      <h2>\uCC44\uB110 \uC9D1\uC911\uB3C4 \uC810\uC218(HHI) \uACC4\uC0B0</h2>
      <p class="small">\uCC44\uB110 \uC815\uBCF4\uAC00 \uC788\uB294 ${n0(c.withChannel)}\uAC74 \uAE30\uC900\uC73C\uB85C \uAC01 \uCC44\uB110\uC758 \uBE44\uC911 s\u1D62(%)\uB97C \uAD6C\uD574 \uC81C\uACF1\uD55C \uB4A4 \uBAA8\uB450 \uB354\uD574\uC694.</p>
      <div class="formula">HHI = \u03A3 s\u1D62\xB2 = ${terms.join(" + ")}${c.channels.length > 5 ? ` + (\uB098\uBA38\uC9C0 ${n0(c.channels.length - 5)}\uAC1C \uCC44\uB110 ${p1(restSum)})` : ""} = <b>${p1(c.hhi)}</b></div>
      <p class="small muted">\uBC94\uC704 0 ~ 10,000. \uD604\uC7AC \uB2E8\uACC4: ${c.level ? c.level.label : "-"} (${HHI_LEVELS.provisional ? "\uC784\uC2DC \uAE30\uC900 \xB7 js/config.js\uC5D0\uC11C \uC870\uC815" : "\uD655\uC815 \uAE30\uC900"})</p>
      <div class="table-wrap"><table><thead><tr><th>\uB2E8\uACC4</th><th class="r">\uC810\uC218 \uC0C1\uD55C</th></tr></thead><tbody>
        ${HHI_LEVELS.levels.map((l) => `<tr><td>${l.label}</td><td class="r">${l.max === Infinity ? "10,000" : n0(l.max)}</td></tr>`).join("")}
      </tbody></table></div>
    </div>
    <div class="card stack">
      <h2>\uC0C1\uC704 3\uAC1C \uCC44\uB110 \uC2DC\uCCAD \uBE44\uC911(CR3) \uACC4\uC0B0</h2>
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
    <h2>\uC544\uC9C1 \uBD84\uB958\uD558\uC9C0 \uBABB\uD55C \uCC44\uB110 <span class="pill">${n0(r.unclassifiedChannels.length)}\uAC1C</span></h2>
<p class="small">\uD300\uC5D0\uC11C \uCC44\uB110 DB(<code>data/channel-types.json</code>)\uB97C \uCC44\uC6B8 \uC218 \uC788\uB3C4\uB85D CSV\uB85C \uC815\uB9AC\uD588\uC5B4\uC694. \uBCF5\uC0AC\uD55C \uB0B4\uC6A9\uC744 \uD300\uC758 <b>\uBD84\uB958\uD558\uC9C0 \uBABB\uD55C \uCC44\uB110 \uBD84\uB958 \uB3C4\uAD6C</b>(<code>tools/classify.html</code>)\uC5D0 \uBD99\uC5EC \uB123\uC73C\uBA74 \uD55C \uBC88\uC5D0 \uBD84\uB958\uD558\uACE0 \uAC80\uC218\uD560 \uC218 \uC788\uC5B4\uC694. <code>sample_titles</code>\uC5D0\uB294 \uD310\uB2E8\uC744 \uB3D5\uAE30 \uC704\uD574 \uADF8 \uCC44\uB110\uC5D0\uC11C \uB0B4\uAC00 \uBCF8 \uC601\uC0C1 \uC81C\uBAA9\uC774 \uCD5C\uB300 3\uAC1C \uB4E4\uC5B4\uAC00\uC694. \uC774 \uB0B4\uC6A9\uC740 \uBC84\uD2BC\uC744 \uB20C\uB7EC \uBCF5\uC0AC\uD560 \uB54C\uB9CC \uC4F0\uC774\uACE0, \uC0AC\uC774\uD2B8\uAC00 \uC5B4\uB514\uB85C \uBCF4\uB0B4\uC9C0 \uC54A\uC544\uC694.</p>
    <textarea class="copybox" id="csvBox" readonly aria-label="\uBD84\uB958\uD558\uC9C0 \uBABB\uD55C \uCC44\uB110 CSV">${esc(csv)}</textarea>
    <div class="btn-row"><button class="btn small" id="copyCsv" type="button">CSV \uBCF5\uC0AC</button></div>
  </section>`;
    vBar(document.getElementById("monthChart"), r.monthly.map((m) => ({ name: m.month, count: m.count })));
    const body = document.getElementById("chBody");
    const note = document.getElementById("chNote");
    const draw2 = (q2) => {
      const list = c.channels.map((x, i) => ({ ...x, rank: i + 1 })).filter((x) => !q2 || x.name.toLowerCase().includes(q2.toLowerCase()));
      const shown = list.slice(0, 200);
      body.innerHTML = shown.map((x) => `<tr><td class="r">${x.rank}</td><td>${esc(x.name)}</td><td>${typeLabel(x.type)}</td><td class="r">${n0(x.count)}</td><td class="r">${p1(x.pct)}%</td></tr>`).join("") || '<tr><td colspan="5" class="muted">\uC77C\uCE58\uD558\uB294 \uCC44\uB110\uC774 \uC5C6\uC5B4\uC694.</td></tr>';
      note.textContent = list.length > shown.length ? `${n0(list.length)}\uAC1C \uC911 \uC0C1\uC704 200\uAC1C\uB9CC \uD45C\uC2DC\uD588\uC5B4\uC694.` : "";
    };
    draw2("");
    document.getElementById("chSearch").addEventListener("input", (e) => draw2(e.target.value.trim()));
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
    const current = state.result && !state.result.empty && !state.upload.isSample && !state.savedId ? { ...toHistoryEntry(state.result, activePrediction()), id: "__current__", current: true } : null;
    const entries = current ? [current, ...hist] : hist;
    const item = (e, i) => `
    <div class="history-item">
      <input type="checkbox" id="sel-${esc(e.id)}" value="${esc(e.id)}" ${i < 2 ? "checked" : ""} aria-label="\uBE44\uAD50\uC5D0 \uC0AC\uC6A9">
      <label for="sel-${esc(e.id)}" style="min-width:0">
        <div><b>${e.current ? "\uC9C0\uAE08 \uACB0\uACFC (\uC800\uC7A5 \uC548 \uD568)" : ymd(e.savedAt) + " \uC800\uC7A5"}</b> \xB7 ${e.representative ? typeLabel(e.representative) : "\uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uBD84\uC57C \uC5C6\uC74C"}</div>
        <div class="meta">${esc(e.period.label)} ${ymd(e.period.start)} ~ ${ymd(e.period.end)} \xB7 ${n0(e.total)}\uAC74 \xB7 \uC9D1\uC911\uB3C4 \uC810\uC218 ${n0(Math.round(e.hhi))} \xB7 \uC0C1\uC704 3\uAC1C \uBE44\uC911 ${p1(e.cr3)}%${e.prediction ? ` \xB7 \uC608\uC0C1: ${typeLabel(e.prediction.primary)}` : ""}</div>
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
  <section class="card empty"><p>\uC544\uC9C1 \uC800\uC7A5\uD55C \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694.</p><p class="small muted">\uACB0\uACFC \uD654\uBA74\uC5D0\uC11C \u2018\uC774 \uACB0\uACFC \uC800\uC7A5\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 \uC5EC\uAE30\uC5D0 \uC313\uC5EC\uC694.</p><a class="btn primary" href="#upload">\uB0B4 \uC720\uD29C\uBE0C \uAE30\uB85D \uAC00\uC838\uC624\uAE30</a></section>`}

  <section class="card stack">
    <h2>\uC800\uC7A5\uB418\uB294 \uB370\uC774\uD130\uC640 \uC704\uCE58</h2>
    <p class="small">\uC774 \uC11C\uBE44\uC2A4\uC5D0\uB294 \uB85C\uADF8\uC778\uACFC \uC11C\uBC84\uAC00 \uC5C6\uC5B4\uC694. \uC544\uB798 \uC815\uBCF4\uB9CC <b>\uC9C0\uAE08 \uC4F0\uACE0 \uC788\uB294 \uBE0C\uB77C\uC6B0\uC800\uC758 LocalStorage</b>\uC5D0 \uC800\uC7A5\uB3FC\uC694.</p>
    <ul class="small" style="margin:0;padding-left:18px;display:grid;gap:2px">
      <li><code>${STORAGE_KEYS.prediction}</code>: \uB0B4\uAC00 \uACE0\uB978 \uC608\uC0C1 \uC720\uD615</li>
      <li><code>${STORAGE_KEYS.history}</code>: \uC800\uC7A5\uD55C \uACB0\uACFC(\uBD84\uC11D \uB0A0\uC9DC, \uAE30\uAC04, \uC720\uD615\uBCC4 \uAC74\uC218\xB7\uBE44\uC911, \uCC44\uB110 \uC9D1\uC911\uB3C4 \uC810\uC218, \uC0C1\uC704 3\uAC1C \uCC44\uB110 \uC2DC\uCCAD \uBE44\uC911, \uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uBD84\uC57C, \uADF8\uB54C\uC758 \uC608\uC0C1) \xB7 \uCD5C\uB300 20\uAC1C</li>
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
        <dt>\uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uBD84\uC57C</dt><dd>${a.representative ? typeLabel(a.representative) : "\uC5C6\uC74C"} \u2192 ${b.representative ? typeLabel(b.representative) : "\uC5C6\uC74C"}${cmp.representativeChanged ? ' <span class="pill accent">\uBC14\uB01C</span>' : ""}</dd>
        <dt>\uCC44\uB110 \uC9D1\uC911\uB3C4 \uC810\uC218</dt><dd><span class="num">${n0(Math.round(a.hhi))} \u2192 ${n0(Math.round(b.hhi))}</span> (${signed(cmp.hhi.diff, 0)})</dd>
        <dt>\uC0C1\uC704 3\uAC1C \uCC44\uB110 \uC2DC\uCCAD \uBE44\uC911</dt><dd><span class="num">${p1(a.cr3)}% \u2192 ${p1(b.cr3)}%</span> (${signed(cmp.cr3.diff, 1, "%p")})</dd>
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
