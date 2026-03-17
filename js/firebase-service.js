// js/firebase-service.js
// 所有 Firestore 操作集中在这里

import { initializeApp }     from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, addDoc, query, where,
         orderBy, limit, getDocs, doc, updateDoc,
         increment, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

// ── 初始化 ──────────────────────────────
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ── 格式化时间戳 ─────────────────────────
export function fmtTime(ts) {
  if (!ts) return '';
  const d    = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60)    return `${diff}秒前`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

// ── 读取某场比赛的预测（按点赞降序，最多5条）─
export async function fetchPredictions(matchId) {
  const q = query(
    collection(db, 'predictions'),
    where('matchId', '==', matchId),
    orderBy('likes', 'desc'),
    limit(5)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── 新增一条预测 ──────────────────────────
export async function addPrediction({ matchId, matchName, username, content, vote }) {
  return addDoc(collection(db, 'predictions'), {
    matchId, matchName, username, content, vote,
    likes:     0,
    createdAt: serverTimestamp()
  });
}

// ── 点赞 ─────────────────────────────────
export async function likePrediction(predId) {
  return updateDoc(doc(db, 'predictions', predId), {
    likes: increment(1)
  });
}

// ── 读取比赛列表（后台写入，前台读取）───────
export async function fetchMatches() {
  const { getDocs, query, orderBy: ob } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  const snap = await getDocs(query(collection(db, 'matches'), ob('createdAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── 读取赔率列表 ─────────────────────────────
export async function fetchOdds() {
  const { getDocs, query, orderBy: ob } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  const snap = await getDocs(query(collection(db, 'odds'), ob('createdAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── 读取公告列表 ─────────────────────────────
export async function fetchNotices() {
  const { getDocs, query, orderBy: ob } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  const snap = await getDocs(query(collection(db, 'notices'), ob('order', 'asc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
