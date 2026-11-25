// 결과 공유 이미지(JPG) 만들기.
// 결과 화면 전체가 아니라 핵심만 담은 1080×1350(인스타그램 세로 비율) 카드를 브라우저 안에서 그린다.
// 채널 이름·영상 제목은 넣지 않는다. 파일은 어디에도 전송되지 않고 내 기기에 저장만 된다.

const W = 1080, H = 1350, PAD = 72;
const INK = '#3A3A76', MUTED = '#6F7590', ACCENT = '#7468E8';
const FONT = '"Pretendard Variable", Pretendard, "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif';
const f = (weight, size) => `${weight} ${size}px ${FONT}`;

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function mix(a, b, t) { // a 비율 t
  const A = hexToRgb(a), B = hexToRgb(b);
  return `rgb(${A.map((v, i) => Math.round(v * t + B[i] * (1 - t))).join(',')})`;
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
  while (s > min && ctx.measureText(text).width > maxW) { s -= 2; ctx.font = f(weight, s); }
  return s;
}
function wrap(ctx, text, maxW, maxLines) {
  const words = text.split(' '); const lines = []; let line = '';
  for (const w of words) {
    const t = line ? line + ' ' + w : w;
    if (ctx.measureText(t).width <= maxW || !line) line = t;
    else { lines.push(line); line = w; }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const keep = lines.slice(0, maxLines);
    let last = keep[maxLines - 1];
    while (last.length && ctx.measureText(last + '…').width > maxW) last = last.slice(0, -1);
    keep[maxLines - 1] = last + '…';
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
  } catch { return null; }
}

function shadowCard(ctx, x, y, w, h, r, fill, border) {
  ctx.save();
  ctx.shadowColor = 'rgba(32, 56, 120, 0.10)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 8;
  rr(ctx, x, y, w, h, r); ctx.fillStyle = fill; ctx.fill();
  ctx.restore();
  if (border) { rr(ctx, x + 1, y + 1, w - 2, h - 2, r); ctx.lineWidth = 2; ctx.strokeStyle = border; ctx.stroke(); }
}

// 결과 화면과 같은 모양: 회색 바탕, 흰 카드, 유형 색으로 물든 대표 유형 카드
function draw(ctx, d, img) {
  const BG = '#F6F7FB', SURFACE = '#FFFFFF', SURFACE2 = '#F3F4F9', LINE = '#E6E8F2';
  const tc = d.color;
  const [r0, g0, b0] = hexToRgb(tc);
  const light = (0.299 * r0 + 0.587 * g0 + 0.114 * b0) > 150; // 밝은 색(미분류 회색 등)은 글자를 더 진하게
  const deep = mix(tc, INK, light ? 0.5 : 0.85);
  const X = 56, CW = W - X * 2;

  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
  ctx.textBaseline = 'alphabetic';

  // 상단 바: 로고 + 예시 표시
  rr(ctx, X, 52, 52, 52, 14); ctx.fillStyle = ACCENT; ctx.fill();
  ctx.fillStyle = '#FFFFFF'; ctx.font = f(800, 28); ctx.textAlign = 'center';
  ctx.fillText('R', X + 26, 88);
  ctx.textAlign = 'left'; ctx.fillStyle = INK; ctx.font = f(800, 30);
  ctx.fillText('RE:VIEW', X + 68, 89);
  if (d.isSample) {
    ctx.font = f(800, 22);
    const tw = ctx.measureText('예시 데이터').width + 36;
    rr(ctx, W - X - tw, 58, tw, 42, 21); ctx.fillStyle = '#E5F8F4'; ctx.fill();
    ctx.fillStyle = '#1F9D87'; ctx.textAlign = 'center'; ctx.fillText('예시 데이터', W - X - tw / 2, 87);
  }

  // 머리말 (결과 화면의 eyebrow · 제목)
  ctx.textAlign = 'left';
  ctx.fillStyle = ACCENT; ctx.font = f(700, 24);
  ctx.fillText(`나의 시청 기록 돌아보기 · ${d.periodText}`, X, 168);
  ctx.fillStyle = INK; ctx.font = f(800, 46);
  ctx.fillText('실제 시청기록 속 나', X, 226);

  // 대표 유형 카드 (persona-card)
  const py = 262, ph = 322;
  shadowCard(ctx, X, py, CW, ph, 44, mix(tc, '#FFFFFF', 0.13), mix(tc, '#FFFFFF', 0.24));
  const imgBox = 290;
  const textW = CW - 96 - (img ? imgBox : 0);
  ctx.fillStyle = mix(tc, INK, light ? 0.5 : 0.75); ctx.font = f(700, 26);
  ctx.fillText('내가 가장 많이 보는 분야', X + 48, py + 72);
  ctx.fillStyle = deep;
  fitFont(ctx, d.persona, 850, 96, textW, 52);
  ctx.fillText(d.persona, X + 48, py + 168);
  if (img) {
    const s = Math.min(imgBox / img.naturalWidth, imgBox / img.naturalHeight);
    const iw = img.naturalWidth * s, ih = img.naturalHeight * s;
    ctx.drawImage(img, X + CW - 36 - iw, py + (ph - ih) / 2, iw, ih);
  }
  if (d.pctText) {
    ctx.fillStyle = INK; ctx.font = f(850, 62);
    ctx.fillText(d.pctText, X + 48, py + 258);
    const pw = ctx.measureText(d.pctText).width;
    ctx.fillStyle = MUTED; ctx.font = f(500, 24);
    wrap(ctx, d.shareText, textW - pw - 16, 2).forEach((l, i, arr) =>
      ctx.fillText(l, X + 48 + pw + 16, py + 258 - (arr.length - 1) * 32 + i * 32));
  } else {
    ctx.fillStyle = MUTED; ctx.font = f(500, 24);
    wrap(ctx, d.shareText, textW, 2).forEach((l, i) => ctx.fillText(l, X + 48, py + 236 + i * 34));
  }

  // 내 시청 구성 카드 (label-card)
  const ly = py + ph + 24, lh = 448;
  shadowCard(ctx, X, ly, CW, lh, 44, SURFACE);
  ctx.textAlign = 'left'; ctx.fillStyle = INK; ctx.font = f(800, 34);
  ctx.fillText('내가 보는 콘텐츠 구성', X + 44, ly + 66);
  ctx.textAlign = 'right'; ctx.fillStyle = MUTED; ctx.font = f(500, 22);
  ctx.fillText(`전체 ${d.totalText}건 기준`, X + CW - 44, ly + 64);
  const rows = d.rows.slice(0, 5);
  rows.forEach((r, i) => {
    const y = ly + 136 + i * 64;
    ctx.textAlign = 'left';
    ctx.beginPath(); ctx.arc(X + 52, y - 9, 8, 0, Math.PI * 2); ctx.fillStyle = r.color; ctx.fill();
    ctx.fillStyle = INK; ctx.font = f(i === 0 && r.top ? 800 : 600, 27);
    ctx.fillText(r.label, X + 72, y);
    ctx.textAlign = 'right'; ctx.font = f(800, 27);
    ctx.fillText(`${r.pctText}%`, X + CW - 44, y);
    const pctW = ctx.measureText(`${r.pctText}%`).width;
    ctx.fillStyle = MUTED; ctx.font = f(500, 22);
    ctx.fillText(`${r.countText}건`, X + CW - 44 - pctW - 14, y);
    const bx = X + 44, bwFull = CW - 88;
    rr(ctx, bx, y + 14, bwFull, 12, 6); ctx.fillStyle = SURFACE2; ctx.fill();
    const bw = Math.max(r.pct > 0 ? 6 : 0, bwFull * Math.min(1, r.pct / 100));
    if (bw) { rr(ctx, bx, y + 14, bw, 12, 6); ctx.fillStyle = r.color; ctx.fill(); }
  });

  // 아래 두 카드: 예상 vs 실제 · 채널 집중도
  const by = ly + lh + 24, bh = 150, gap = 20, bw2 = (CW - gap) / 2;
  [['내가 생각한 나 vs 실제', d.predictionText], ['채널 집중도', d.levelText]].forEach(([k, v], i) => {
    const x = X + i * (bw2 + gap);
    shadowCard(ctx, x, by, bw2, bh, 36, SURFACE);
    ctx.textAlign = 'left'; ctx.fillStyle = MUTED; ctx.font = f(700, 22);
    ctx.fillText(k, x + 36, by + 50);
    ctx.fillStyle = INK; ctx.font = f(800, 28);
    wrap(ctx, v, bw2 - 72, 2).forEach((l, j) => ctx.fillText(l, x + 36, by + 96 + j * 38));
  });

  // 바닥글
  ctx.textAlign = 'center'; ctx.fillStyle = MUTED; ctx.font = f(500, 21);
  ctx.fillText('RE:VIEW · 시청기록은 내 브라우저 안에서만 분석했어요 · 재미로 보는 결과예요', W / 2, H - 40);
  ctx.strokeStyle = LINE;
}

// d: { persona, color, imgSrc, pctText, shareText, rows:[{label,color,pct,pctText}], totalText, periodText, predictionText, levelText, isSample }
export async function makeShareCard(d) {
  try { await Promise.all([document.fonts.load(f(850, 40)), document.fonts.load(f(600, 40))]); } catch { /* 글꼴이 없으면 기본 글꼴 */ }
  const img = await loadImage(d.imgSrc);
  const render = (withImg) => new Promise((res, rej) => {
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    draw(canvas.getContext('2d'), d, withImg);
    try { canvas.toBlob((b) => (b ? res(b) : rej(new Error('blob'))), 'image/jpeg', 0.92); } catch (e) { rej(e); }
  });
  try { return await render(img); }
  catch {
    // 파일을 더블클릭해 연 경우(file://)에는 캐릭터 그림 때문에 저장이 막힐 수 있어, 새 캔버스에 그림 없이 다시 그린다.
    return render(null);
  }
}

export function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = fileName;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
