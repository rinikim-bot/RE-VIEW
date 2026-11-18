// 설정값 모음: 유형 목록, 집중도 단계 기준, 저장 키.
// 팀에서 기준을 바꿀 때는 이 파일만 수정하면 된다.

export const CONTENT_TYPES = [
  { id: 'vlog',      label: '브이로그·일상형',  persona: '브이로거형',       color: '#ff8a3d' },
  { id: 'entertain', label: '엔터테인먼트형',   persona: '엔터테인먼트형',   color: '#f0478f' },
  { id: 'game',      label: '게임형',           persona: '게이머형',         color: '#7b5cff' },
  { id: 'beauty',    label: '뷰티·패션형',      persona: '뷰티·패션형',      color: '#ff6b7a' },
  { id: 'knowledge', label: '지식·교육형',      persona: '지식 탐구형',      color: '#13b07e' },
  { id: 'music',     label: '음악형',           persona: '음악 애호형',      color: '#3b82f6' },
  { id: 'sports',    label: '스포츠형',         persona: '스포츠 팬형',      color: '#1fb5c9' },
  { id: 'news',      label: '뉴스·시사형',      persona: '뉴스·시사형',      color: '#64748b' },
];

// 문장 속에서 쓰는 이름 ("지식·교육 콘텐츠")
export const TYPE_NOUN = {
  vlog: '브이로그·일상', entertain: '엔터테인먼트', game: '게임', beauty: '뷰티·패션',
  knowledge: '지식·교육', music: '음악', sports: '스포츠', news: '뉴스·시사',
};

// '새로운 콘텐츠 유형 탐색'의 유튜브 검색어. 검색어를 바꾸려면 여기만 고치면 된다.
export const YOUTUBE_SEARCH_BASE = 'https://www.youtube.com/results?search_query=';
export const EXPLORE_QUERIES = {
  vlog: '일상 브이로그',
  entertain: '예능 및 엔터테인먼트',
  game: '게임 플레이 및 게임 영상',
  beauty: '뷰티 및 패션',
  knowledge: '지식 및 교육',
  music: '음악 및 라이브',
  sports: '스포츠 경기 및 하이라이트',
  news: '뉴스 및 시사',
};

export const UNCLASSIFIED = { id: 'unclassified', label: '유형 미분류', color: '#b8c0cc' };

export const TYPE_BY_ID = Object.fromEntries(
  [...CONTENT_TYPES, UNCLASSIFIED].map((t) => [t.id, t])
);

// 채널 집중도(HHI) 단계 기준.
// ⚠ 임시값이다. 시청기록 HHI에 대해 검증된 기준이 없으므로,
//   팀 데이터로 분포를 확인한 뒤 수정해야 한다. 화면에도 "임시 기준"으로 표시된다.
export const HHI_LEVELS = {
  provisional: true,
  note: '임시 기준값입니다. 팀원들의 실제 시청기록으로 분포를 확인한 뒤 조정해야 합니다.',
  levels: [
    { max: 300,      label: '분산된 이용',          tone: 'low' },
    { max: 1000,     label: '일부 채널 집중',       tone: 'mid' },
    { max: 2500,     label: '채널 집중 높음',       tone: 'high' },
    { max: Infinity, label: '채널 집중 매우 높음',  tone: 'veryhigh' },
  ],
};

// 대표 유형 안내: 미분류 비중이 이 값 이상이면 "분류된 기록이 적다"는 주의 문구를 띄운다.
export const UNCLASSIFIED_WARN_PCT = 50;

export const PERIOD_OPTIONS = [
  { id: '1m',  label: '최근 1개월',  months: 1 },
  { id: '3m',  label: '최근 3개월',  months: 3 },
  { id: '6m',  label: '최근 6개월',  months: 6 },
  { id: '12m', label: '최근 12개월', months: 12 },
  { id: 'all', label: '전체 기간',   months: null },
  { id: 'custom', label: '직접 지정', months: null },
];
export const DEFAULT_PERIOD = '6m';

export const STORAGE_KEYS = {
  prediction: 'infodiet.prediction.v1',
  history: 'infodiet.history.v1',
};

export const MAX_HISTORY = 20;
