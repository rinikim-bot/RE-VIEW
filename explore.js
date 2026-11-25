// '새로운 콘텐츠 유형 탐색'용 유튜브 검색 링크 생성 (분석 로직과 분리된 순수 함수).
import { EXPLORE_QUERIES, YOUTUBE_SEARCH_BASE } from './config.js';

// 콘텐츠 유형 id → 검색어. 미분류나 알 수 없는 유형은 null.
export function exploreQuery(typeId) {
  return Object.prototype.hasOwnProperty.call(EXPLORE_QUERIES, typeId) ? EXPLORE_QUERIES[typeId] : null;
}

// 콘텐츠 유형 id → 유튜브 검색 결과 URL. 검색어는 encodeURIComponent로 인코딩한다.
export function youtubeSearchUrl(typeId) {
  const q = exploreQuery(typeId);
  return q ? YOUTUBE_SEARCH_BASE + encodeURIComponent(q) : null;
}
