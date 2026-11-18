// Google Takeout zip에서 YouTube 시청기록 파일만 꺼내 읽는다.
// 외부 라이브러리 없이 브라우저 내장 DecompressionStream을 쓰고, 필요한 부분만 잘라 읽어서
// 동영상이 함께 들어 있는 큰 zip이어도 메모리를 많이 쓰지 않는다. 파일은 어디에도 전송되지 않는다.
import { ParseError, detectAndParse } from './parser.js';

const SIG_EOCD = 0x06054b50;
const SIG_EOCD64_LOC = 0x07064b50;
const SIG_EOCD64 = 0x06064b50;
const SIG_CEN = 0x02014b50;
const SIG_LOC = 0x04034b50;

async function readBytes(blob, start, end) {
  return new DataView(await blob.slice(start, end).arrayBuffer());
}
const u64 = (dv, o) => dv.getUint32(o, true) + dv.getUint32(o + 4, true) * 0x100000000;

function decodeName(bytes, utf8Flag) {
  try { return new TextDecoder('utf-8', { fatal: !utf8Flag ? true : false }).decode(bytes); }
  catch { return new TextDecoder('utf-8').decode(bytes); }
}

// zip 안의 파일 목록(이름, 크기, 위치)을 읽는다.
export async function listZipEntries(blob) {
  const size = blob.size;
  if (size < 22) throw new ParseError('zip 파일이 손상되었거나 비어 있어요.', 'Takeout에서 다시 내려받은 zip 파일을 올려 주세요.');
  const tailStart = Math.max(0, size - 65557);
  const tail = await readBytes(blob, tailStart, size);
  let eocd = -1;
  for (let i = tail.byteLength - 22; i >= 0; i--) {
    if (tail.getUint32(i, true) === SIG_EOCD) { eocd = i; break; }
  }
  if (eocd < 0) throw new ParseError('zip 파일 구조를 읽을 수 없어요.', '다운로드가 중간에 끊겼을 수 있어요. Takeout에서 zip을 다시 내려받아 주세요.');
  let count = tail.getUint16(eocd + 10, true);
  let cenSize = tail.getUint32(eocd + 12, true);
  let cenOffset = tail.getUint32(eocd + 16, true);
  // ZIP64 (파일이 크거나 항목이 많은 경우)
  if (count === 0xffff || cenSize === 0xffffffff || cenOffset === 0xffffffff) {
    const loc = eocd - 20;
    if (loc >= 0 && tail.getUint32(loc, true) === SIG_EOCD64_LOC) {
      const eocd64Off = u64(tail, loc + 8);
      const e64 = await readBytes(blob, eocd64Off, eocd64Off + 56);
      if (e64.getUint32(0, true) === SIG_EOCD64) {
        count = u64(e64, 32); cenSize = u64(e64, 40); cenOffset = u64(e64, 48);
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
    const name = decodeName(nameBytes, (flags & 0x800) !== 0);
    // ZIP64 추가 필드
    let e = p + 46 + nameLen;
    const eEnd = e + extraLen;
    while (e + 4 <= eEnd) {
      const id = cen.getUint16(e, true); const len = cen.getUint16(e + 2, true);
      if (id === 0x0001) {
        let q = e + 4;
        if (size0 === 0xffffffff) { size0 = u64(cen, q); q += 8; }
        if (compSize === 0xffffffff) { compSize = u64(cen, q); q += 8; }
        if (localOffset === 0xffffffff) { localOffset = u64(cen, q); q += 8; }
      }
      e += 4 + len;
    }
    entries.push({ name, method, compSize, size: size0, localOffset, encrypted: (flags & 1) !== 0, isDir: name.endsWith('/') });
    p += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

export async function readZipEntry(blob, entry) {
  if (entry.encrypted) throw new ParseError('암호가 걸린 zip은 읽을 수 없어요.', '암호 없이 내보낸 Takeout 파일을 올려 주세요.');
  const lh = await readBytes(blob, entry.localOffset, entry.localOffset + 30);
  if (lh.getUint32(0, true) !== SIG_LOC) throw new ParseError('zip 안의 파일을 읽을 수 없어요.', 'zip 파일이 손상되었을 수 있어요.');
  const start = entry.localOffset + 30 + lh.getUint16(26, true) + lh.getUint16(28, true);
  const data = blob.slice(start, start + entry.compSize);
  if (entry.method === 0) return new Uint8Array(await data.arrayBuffer());
  if (entry.method === 8) {
    if (typeof DecompressionStream === 'undefined') {
      throw new ParseError('이 브라우저는 zip 압축 풀기를 지원하지 않아요.', '최신 Chrome·Edge·Safari·Firefox를 쓰거나, 압축을 풀어 watch-history.json을 올려 주세요.');
    }
    const stream = data.stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }
  throw new ParseError('지원하지 않는 zip 압축 방식이에요.', '압축을 풀어 watch-history.json을 올려 주세요.');
}

// 시청기록일 가능성이 높은 순서로 후보를 정렬한다. 검색 기록 등은 뺀다.
function candidateScore(name) {
  const lower = name.toLowerCase();
  const base = lower.split('/').pop();
  if (!/\.(json|html?)$/.test(base)) return -1;
  if (/search|검색|comment|댓글|subscription|구독|playlist|재생목록|channel|채널|live.?chat|채팅/.test(base)) return -1;
  let s = 0;
  if (/watch-history|시청\s?기록|watch history/.test(base)) s += 10;
  if (/watch-history|시청\s?기록|history|기록/.test(lower)) s += 3;
  if (/youtube/.test(lower)) s += 2;
  if (base.endsWith('.json')) s += 1;
  return s;
}

// zip에서 시청기록을 찾아 파싱 결과와 함께 돌려준다.
export async function parseTakeoutZip(blob) {
  const entries = (await listZipEntries(blob)).filter((e) => !e.isDir);
  const candidates = entries
    .map((e) => ({ e, score: candidateScore(e.name) }))
    .filter((c) => c.score >= 0)
    .sort((a, b) => b.score - a.score || a.e.size - b.e.size);
  let lastError = null;
  for (const { e } of candidates.slice(0, 12)) {
    try {
      const bytes = await readZipEntry(blob, e);
      const text = new TextDecoder('utf-8').decode(bytes);
      const parsed = detectAndParse(text, e.name);
      return { parsed, innerName: e.name, entryCount: entries.length };
    } catch (err) {
      lastError = err;
    }
  }
  if (lastError && !(lastError instanceof ParseError)) throw lastError;
  throw new ParseError('zip 안에서 YouTube 시청기록을 찾지 못했어요.',
    'Takeout에서 "YouTube 및 YouTube Music → 기록"을 포함해 내보냈는지 확인해 주세요. 검색 기록만 들어 있는 zip일 수도 있어요.');
}
