// 설정값 모음: 유형 목록, 집중도 단계 기준, 저장 키.
// 팀에서 기준을 바꿀 때는 이 파일만 수정하면 된다.

// persona: 결과 화면에 띄우는 대표 유형 이름 (재미를 위한 표현)
export const CONTENT_TYPES = [
  { id: 'vlog',      label: '브이로그·일상형',  persona: '남의 하루 창문',       color: '#ff8a3d' },
  { id: 'entertain', label: '엔터테인먼트형',   persona: '웃음 자판기',   color: '#f4506e' },
  { id: 'game',      label: '게임형',           persona: '한판 놀이터',         color: '#a06bd3' },
  { id: 'beauty',    label: '뷰티·패션형',      persona: '스타일 거울',      color: '#f77f9f' },
  { id: 'knowledge', label: '지식·교육형',      persona: '호기심 서재',      color: '#7fc34f' },
  { id: 'music',     label: '음악형',           persona: '귀 속 라디오',      color: '#3b82f6' },
  { id: 'sports',    label: '스포츠형',         persona: '함성 관중석',      color: '#f5c518' },
  { id: 'news',      label: '뉴스·시사형',      persona: '세상 안테나',      color: '#64748b' },
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

// 결과 화면 대표 유형 카드 아래에 붙는 설명. 문구를 바꾸려면 여기만 고치면 된다.
export const PERSONA_DESC = {
  vlog: '다른 사람들의 일상을 구경하며 소소한 즐거움을 발견해요. 여행부터 평범한 하루까지, 사람들의 이야기를 좋아해요.',
  entertain: '웃음과 재미를 찾아 콘텐츠를 즐겨요. 예능, 밈, 유머처럼 가볍게 즐길 수 있는 영상에 끌려요.',
  game: '게임 속 세계와 플레이를 즐겨요. 게임 영상부터 공략, 스트리머의 플레이까지 관심이 이어져요.',
  beauty: '새로운 스타일과 취향을 발견하는 걸 좋아해요. 패션, 메이크업, 코디 등 나만의 감각을 채워가요.',
  knowledge: '궁금한 것을 알아가고 새로운 지식을 쌓는 걸 즐겨요. 몰랐던 사실을 발견하는 순간에 흥미를 느껴요.',
  music: '음악으로 일상에 분위기를 더해요. 좋아하는 노래부터 새로운 음악과 플레이리스트까지 즐겨 찾아요.',
  sports: '경기의 흐름과 뜨거운 순간을 즐겨요. 선수들의 활약과 경기 하이라이트에 관심이 많아요.',
  news: '세상에서 일어나는 일에 관심이 많아요. 뉴스와 다양한 이슈를 통해 세상의 흐름을 살펴봐요.',
  unclassified: '아직 채널 정보가 부족해서 취향을 정하기 어려워요. 채널 DB에 채널이 더해지면 더 정확하게 알려드릴게요.',
};
// 설명 뒤에 공통으로 붙는 한 줄 (대표 유형이 있을 때만)
export const PERSONA_COMMON = '가장 많이 본 콘텐츠를 중심으로 여러 취향을 함께 즐기고 있네요.';

export const UNCLASSIFIED = { id: 'unclassified', label: '아직 분류하지 못함', persona: '이름표 없는 서랍', color: '#b8c0cc' };

// 대표 유형 카드에 띄우는 캐릭터 그림 (asset/characters). 미분류(이름표 없는 서랍)는 그림 없음.
export const CHARACTER_IMG = Object.fromEntries(
  ['vlog', 'entertain', 'game', 'beauty', 'knowledge', 'music', 'sports', 'news'].map((id) => [id, `./asset/characters/${id}.png`])
);

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

// 최소 표본: 선택한 기간의 시청기록(광고·중복 제외)이 이 건수보다 적으면 분석하지 않는다.
// ⚠ 임시값이다. 팀원들의 실제 시청기록으로 확인한 뒤 조정한다.
export const MIN_SAMPLE = 30;
