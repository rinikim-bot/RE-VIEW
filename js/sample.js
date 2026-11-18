// 예시 데이터: 실제 시청기록이 없을 때 화면을 둘러보기 위한 가상 기록.
// 화면 전체에 "예시 데이터" 표시가 붙고, 이전 결과로 저장되지 않는다.

const SAMPLE_CHANNELS = [
  ['침착맨', 70], ['피식대학Psick Univ', 34], ['숏박스', 22], ['MrBeast', 15],
  ['슈카월드', 26], ['Kurzgesagt – In a Nutshell', 9], ['TED', 6],
  ['HYBE LABELS', 18], ['아이유 - Topic', 14], ['1theK (원더케이)', 8],
  ['YTN', 10], ['SBS 뉴스', 6],
  ['우왁굳의 게임방송', 12], ['LCK', 7],
  ['KBO', 5],
  ['예시 브이로그 채널', 21], ['예시 요리 채널', 17], ['예시 여행 채널', 11], ['예시 리뷰 채널', 9],
];

// 시드가 고정된 난수 (매번 같은 예시가 나오도록)
function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

export function makeSampleRecords() {
  const rand = rng(20261113);
  const end = Date.parse('2026-10-31T22:00:00+09:00');
  const span = 240 * 24 * 3600 * 1000; // 약 8개월
  const records = [];
  let n = 0;
  for (const [channel, count] of SAMPLE_CHANNELS) {
    for (let i = 0; i < count; i++) {
      n++;
      const time = Math.round(end - rand() * span);
      records.push({
        title: `[예시] ${channel} 영상 ${i + 1}`,
        url: `https://www.youtube.com/watch?v=sample${String(n).padStart(5, '0')}`,
        videoId: `sample${n}`,
        channel,
        channelUrl: null,
        channelId: null,
        time,
        header: channel.endsWith(' - Topic') ? 'YouTube Music' : 'YouTube',
        isAd: false,
      });
    }
  }
  // 광고 2건, 삭제된 영상 3건도 섞어 검증 단계가 보이게 한다
  records.push({ title: '[예시] 광고', url: 'https://www.youtube.com/watch?v=sampleAd1', channel: '예시 광고주', time: end - 1000, header: 'YouTube', isAd: true });
  records.push({ title: '[예시] 광고', url: 'https://www.youtube.com/watch?v=sampleAd2', channel: '예시 광고주', time: end - 2000, header: 'YouTube', isAd: true });
  for (let i = 0; i < 3; i++) records.push({ title: '삭제된 영상', url: null, channel: null, time: end - (i + 3) * 86400000, header: 'YouTube', isAd: false });
  return { format: 'sample', records, info: { skippedNonWatch: 0, missingTime: 0, rawCount: records.length, unknownTz: 0 } };
}

export const SAMPLE_PREDICTION = { primary: 'knowledge', secondary: ['music', 'entertain'] };
