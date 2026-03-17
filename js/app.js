// js/app.js
// 主入口：页面切换、弹窗、表单交互

import { MATCHES } from './data.js';
import { renderHome, renderLive, renderOdds, renderAI,
         renderCommunity, renderData, loadMatchPredictions } from './render.js';
import { addPrediction } from './firebase-service.js';

// ── 页面切换 ─────────────────────────────
const PAGE_MAP = {
  home:      'sec-home',
  live:      'sec-live',
  odds:      'sec-odds',
  ai:        'sec-ai',
  community: 'sec-community',
  data:      'sec-data',
};

window.switchPage = (page, el) => {
  document.querySelectorAll('.nl').forEach(n => n.classList.remove('on'));
  if (el) el.classList.add('on');
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('on'));
  const target = document.getElementById(PAGE_MAP[page] || 'sec-home');
  if (target) target.classList.add('on');
  window.scrollTo(0, 0);
};

// ── 联赛筛选 ──────────────────────────────
window.fl = (el, league) => {
  document.querySelectorAll('#fr .fb').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  renderHome(league === 'all' ? MATCHES : MATCHES.filter(m => m.league === league));
};

// ── 资料库 Tab ────────────────────────────
window.switchDataTab = (el, sec) => {
  document.querySelectorAll('.dtab').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
  document.querySelectorAll('.data-section').forEach(s => s.classList.remove('on'));
  document.getElementById('data-' + sec).classList.add('on');
};

// ── 弹窗状态 ─────────────────────────────
let _matchId   = '';
let _matchName = '';
let _vote      = '';

window.openPredict = (matchId, matchName) => {
  _matchId   = matchId;
  _matchName = matchName;

  document.getElementById('modal-match-name').textContent  = matchName;
  document.getElementById('modal-content').value           = '';
  document.getElementById('modal-username').value          = '';
  document.getElementById('modal-char-count').textContent  = '0 / 200 字';
  document.getElementById('modal-toast').style.display     = 'none';
  document.querySelectorAll('.mvote').forEach(v => v.classList.remove('on'));
  _vote = '';

  document.getElementById('modal-backdrop').classList.add('open');
};

window.closeModal = (e) => {
  if (e && e.target !== document.getElementById('modal-backdrop')) return;
  document.getElementById('modal-backdrop').classList.remove('open');
};

window.selectVote = (el, vote) => {
  document.querySelectorAll('.mvote').forEach(v => v.classList.remove('on'));
  el.classList.add('on');
  _vote = vote;
};

// ── 发布预测 ──────────────────────────────
window.submitPredict = async () => {
  const username = (document.getElementById('modal-username').value || '').trim() || '匿名用户';
  const content  = (document.getElementById('modal-content').value  || '').trim();
  const btn      = document.getElementById('modal-submit-btn');

  if (!content) { alert('请输入你的看法'); return; }

  btn.disabled    = true;
  btn.textContent = '发布中...';

  try {
    await addPrediction({
      matchId:   _matchId,
      matchName: _matchName,
      username,
      content,
      vote: _vote,
    });

    const toast = document.getElementById('modal-toast');
    toast.style.display = 'block';
    document.getElementById('modal-content').value          = '';
    document.getElementById('modal-username').value         = '';
    document.getElementById('modal-char-count').textContent = '0 / 200 字';
    document.querySelectorAll('.mvote').forEach(v => v.classList.remove('on'));
    _vote = '';

    setTimeout(() => {
      toast.style.display = 'none';
      window.closeModal();
      loadMatchPredictions(_matchId);
    }, 1400);
  } catch (err) {
    alert('发布失败，请检查 Firebase 配置');
    console.error('submitPredict error:', err);
  }

  btn.disabled    = false;
  btn.textContent = '发布';
};

// ── 字数计数 ──────────────────────────────
document.getElementById('modal-content').addEventListener('input', function () {
  document.getElementById('modal-char-count').textContent = `${this.value.length} / 200 字`;
});

// ── 初始化所有页面 ───────────────────────
renderHome(MATCHES);
renderLive();
renderOdds();
renderAI();
renderCommunity();
renderData();
