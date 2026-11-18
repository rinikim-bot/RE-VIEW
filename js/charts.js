// Chart.js 래퍼. 라이브러리를 불러오지 못하면 차트 자리에 안내 문구를 남기고, 같은 수치는 표로 함께 보여준다.
const instances = new Map();

function css(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
const fmt = (n, d = 1) => Number(n).toLocaleString('ko-KR', { minimumFractionDigits: d, maximumFractionDigits: d });

function ready(canvas) {
  if (!canvas) return false;
  if (typeof window.Chart === 'undefined') {
    const box = canvas.parentElement;
    box.innerHTML = '<p class="chart-fallback">차트 라이브러리를 불러오지 못해 그래프 대신 아래 표의 수치를 확인해 주세요.</p>';
    return false;
  }
  window.Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
  window.Chart.defaults.font.size = 13;
  const old = instances.get(canvas.id);
  if (old) old.destroy();
  return true;
}

function baseOptions() {
  const ink = css('--ink'); const muted = css('--muted'); const line = css('--line');
  return {
    responsive: true, maintainAspectRatio: false, animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : { duration: 400 },
    plugins: { legend: { display: false }, tooltip: { backgroundColor: css('--ink'), titleColor: css('--bg'), bodyColor: css('--bg'), padding: 10 } },
    color: ink,
    scales: undefined,
    _muted: muted, _line: line,
  };
}

// 유형별 비중 도넛
export function typeDonut(canvas, rows) {
  if (!ready(canvas)) return;
  const data = rows.filter((r) => r.count > 0);
  const o = baseOptions();
  o.cutout = '62%';
  o.plugins.tooltip.callbacks = {
    label: (ctx) => {
      const r = data[ctx.dataIndex];
      return ` ${r.label}: ${r.count.toLocaleString('ko-KR')}건 (${fmt(r.pct)}%)`;
    },
  };
  instances.set(canvas.id, new window.Chart(canvas, {
    type: 'doughnut',
    data: { labels: data.map((r) => r.label), datasets: [{ data: data.map((r) => r.count), backgroundColor: data.map((r) => r.color), borderColor: css('--surface'), borderWidth: 2 }] },
    options: o,
  }));
}

// 가로 막대 (채널 상위, 월별 등)
export function hBar(canvas, items, { valueLabel = '건', colors } = {}) {
  if (!ready(canvas)) return;
  const o = baseOptions();
  o.indexAxis = 'y';
  o.scales = {
    x: { beginAtZero: true, grid: { color: o._line }, ticks: { color: o._muted, precision: 0 } },
    y: { grid: { display: false }, ticks: { color: css('--ink'), callback(v) { const l = this.getLabelForValue(v); return l.length > 14 ? l.slice(0, 13) + '…' : l; } } },
  };
  o.plugins.tooltip.callbacks = {
    title: (ctx) => items[ctx[0].dataIndex].name,
    label: (ctx) => { const it = items[ctx.dataIndex]; return ` ${it.count.toLocaleString('ko-KR')}${valueLabel}${it.pct != null ? ` (${fmt(it.pct)}%)` : ''}`; },
  };
  instances.set(canvas.id, new window.Chart(canvas, {
    type: 'bar',
    data: { labels: items.map((i) => i.name), datasets: [{ data: items.map((i) => i.count), backgroundColor: colors || css('--accent'), borderRadius: 4, barThickness: 16 }] },
    options: o,
  }));
}

// 세로 막대 (월별 추이)
export function vBar(canvas, items) {
  if (!ready(canvas)) return;
  const o = baseOptions();
  o.scales = {
    x: { grid: { display: false }, ticks: { color: o._muted } },
    y: { beginAtZero: true, grid: { color: o._line }, ticks: { color: o._muted, precision: 0 } },
  };
  o.plugins.tooltip.callbacks = { label: (ctx) => ` ${items[ctx.dataIndex].count.toLocaleString('ko-KR')}건` };
  instances.set(canvas.id, new window.Chart(canvas, {
    type: 'bar',
    data: { labels: items.map((i) => i.name), datasets: [{ data: items.map((i) => i.count), backgroundColor: css('--accent'), borderRadius: 4 }] },
    options: o,
  }));
}

// 이전/현재 비교 막대
export function compareBars(canvas, types, labels) {
  if (!ready(canvas)) return;
  const o = baseOptions();
  o.plugins.legend = { display: true, labels: { color: css('--ink'), boxWidth: 12 } };
  o.scales = {
    x: { grid: { display: false }, ticks: { color: o._muted, autoSkip: false, maxRotation: 50, minRotation: 0 } },
    y: { beginAtZero: true, grid: { color: o._line }, ticks: { color: o._muted, callback: (v) => v + '%' } },
  };
  o.plugins.tooltip.callbacks = { label: (ctx) => ` ${ctx.dataset.label}: ${fmt(ctx.raw)}%` };
  instances.set(canvas.id, new window.Chart(canvas, {
    type: 'bar',
    data: {
      labels: types.map((t) => t.label),
      datasets: [
        { label: labels[0], data: types.map((t) => t.prev), backgroundColor: css('--line'), borderRadius: 3 },
        { label: labels[1], data: types.map((t) => t.curr), backgroundColor: css('--accent'), borderRadius: 3 },
      ],
    },
    options: o,
  }));
}

export function destroyAll() {
  for (const c of instances.values()) c.destroy();
  instances.clear();
}
