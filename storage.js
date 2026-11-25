// 브라우저 LocalStorage 저장소. 실패해도(사생활 보호 모드 등) 앱은 계속 동작한다.
import { STORAGE_KEYS, MAX_HISTORY } from './config.js';

function read(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}
function remove(key) {
  try { localStorage.removeItem(key); return true; } catch { return false; }
}

export const storage = {
  available() {
    try { const k = '__infodiet_test__'; localStorage.setItem(k, '1'); localStorage.removeItem(k); return true; } catch { return false; }
  },
  getPrediction() { return read(STORAGE_KEYS.prediction, null); },
  setPrediction(p) { return write(STORAGE_KEYS.prediction, { ...p, savedAt: Date.now() }); },
  clearPrediction() { return remove(STORAGE_KEYS.prediction); },
  getHistory() {
    const h = read(STORAGE_KEYS.history, []);
    return Array.isArray(h) ? h : [];
  },
  addHistory(entry) {
    const h = [entry, ...this.getHistory()].slice(0, MAX_HISTORY);
    return write(STORAGE_KEYS.history, h);
  },
  deleteHistory(id) { return write(STORAGE_KEYS.history, this.getHistory().filter((e) => e.id !== id)); },
  clearHistory() { return remove(STORAGE_KEYS.history); },
  clearAll() { remove(STORAGE_KEYS.history); remove(STORAGE_KEYS.prediction); },
};
