// js/render.js
// 所有页面渲染函数

import { MATCHES, LIVE_MATCHES, ODDS_DATA, ASIAN_DATA,
         AI_DATA, AI_HISTORY, COMMUNITY_POSTS,
         FOOTBALL_LEAGUES, FOOTBALL_TEAMS, BBALL_LEAGUES } from './data.js';
import { fetchPredictions, likePrediction, fmtTime } from './firebase-service.js';

const fm = { W:'fw', D:'fdw', L:'fl' };
const chgMap = { up:'<span class="up">↑</span>', dn:'<span class="dn">↓</span>', flat:'<span class="flat">—</span>' };
const ini = n => n.length > 2 ? n.slice(0, 2) : n;

// ── 首页比赛列表 ─────────────────────────
export function renderHome(data) {
  document.getElementById('ml').innerHTML = data.map(m => {
    const live = m.status === '直播中';
    const ctr  = m.score
      ? `<div class="mc-ctr"><div class="mc-sc">${m.score}</div><div class="mc-live"><div class="ldot"></div>直播中</div></div>`
      : `<div class="mc-ctr"><div class="mc-tm">${m.time}</div><div class="mc-st">${m.status}</div></div>`;
    const hf = (m.hf || []).map(f => `<div class="fd ${fm[f]}">${f}</div>`).join('');
    const af = (m.af || []).map(f => `<div class="fd ${fm[f]}">${f}</div>`).join('');
    const ps = m.posts.map(p => `<div class="mpost"><span class="mpa">[${p.a}]</span> ${p.t}</div>`).join('');

    return `
    <div class="mc">
      <div class="mc-hd">
        <div class="mc-lg"><div class="mc-lgbar"></div><span class="mc-lgname">${m.league}</span><span class="mc-rd">${m.round}</span></div>
        <div class="mc-hdtime">${m.time}${live ? ' · <span style="color:var(--red);font-weight:600">直播中</span>' : ' · ' + m.status}</div>
      </div>
      <div class="mc-body">
        <div class="mc-team">
          <div class="mc-av" style="background:${m.hc}18;border-color:${m.hc}44;color:${m.hc}">${ini(m.home)}</div>
          <div class="mc-nm">${m.home}</div>
          <div class="mc-form">${hf}</div>
        </div>
        ${ctr}
        <div class="mc-team">
          <div class="mc-av" style="background:${m.ac}18;border-color:${m.ac}44;color:${m.ac}">${ini(m.away)}</div>
          <div class="mc-nm">${m.away}</div>
          <div class="mc-form">${af}</div>
        </div>
      </div>
      <div class="mc-ft">
        <div class="mc-tags">
          ${live ? '<span class="mtag lt"><span class="ldot" style="margin-right:4px;vertical-align:middle"></span>直播</span>' : ''}
          <span class="mtag">赛事分析</span><span class="mtag">亚盘</span>
          <span class="mtag">欧赔</span><span class="mtag">大小球</span><span class="mtag">AI预测</span>
        </div>
        <div class="mc-posts">${ps}</div>
      </div>
      <div class="mc-predict-section">
        <div class="predict-hd">
          <div class="predict-hd-title"><div class="predict-hd-bar"></div>球迷观点</div>
          <span class="predict-count" id="predict-count-${m.id}">加载中...</span>
        </div>
        <div class="predict-list" id="predict-list-${m.id}">
          <div class="predict-loading"><span class="spin"></span>加载中...</div>
        </div>
        <button class="predict-open-btn"
                onclick="window.openPredict('${m.id}','${m.home} vs ${m.away}')">
          ✏️ 发表我的看法
        </button>
      </div>
    </div>`;
  }).join('');

  data.forEach(m => loadMatchPredictions(m.id));
}

// ── 加载单场预测 ──────────────────────────
export async function loadMatchPredictions(matchId) {
  const listEl  = document.getElementById(`predict-list-${matchId}`);
  const countEl = document.getElementById(`predict-count-${matchId}`);
  if (!listEl) return;

  listEl.innerHTML = `<div class="predict-loading"><span class="spin"></span>加载中...</div>`;
  try {
    const preds = await fetchPredictions(matchId);
    countEl.textContent = `${preds.length} 条观点`;

    if (!preds.length) {
      listEl.innerHTML = `<div class="predict-empty">暂无观点，来第一个发表看法！</div>`;
      return;
    }
    listEl.innerHTML = preds.map(p => {
      const voteTag = p.vote
        ? `<span class="predict-vote-tag">${p.vote}</span>` : '';
      return `
        <div class="predict-item">
          <div class="predict-av">${(p.username || '匿').slice(0, 1)}</div>
          <div class="predict-body">
            <div class="predict-author">${p.username || '匿名用户'}${voteTag}</div>
            <div class="predict-content">${p.content}</div>
            <div class="predict-meta">
              <span class="predict-time">${fmtTime(p.createdAt)}</span>
              <span class="predict-like-btn" id="like-${p.id}"
                    onclick="window.handleLike('${p.id}','${matchId}')">
                👍 ${p.likes || 0}
              </span>
            </div>
          </div>
        </div>`;
    }).join('');
  } catch (err) {
    listEl.innerHTML = `<div class="predict-empty">加载失败，请检查 Firebase 配置</div>`;
    console.error('loadMatchPredictions error:', err);
  }
}

// ── 点赞处理（防重复）────────────────────
window.handleLike = async (predId, matchId) => {
  const btn = document.getElementById(`like-${predId}`);
  if (!btn || btn.classList.contains('liked')) return;
  btn.classList.add('liked');
  try {
    await likePrediction(predId);
    loadMatchPredictions(matchId);
  } catch (err) {
    console.error('like error:', err);
  }
};

// ── 即时比分 ──────────────────────────────
export function renderLive() {
  document.getElementById('live-grid').innerHTML = LIVE_MATCHES.map(m => {
    const isLive = m.min.includes("'");
    return `
    <div class="lc">
      <div class="lc-top">
        <span class="lc-league">${m.league}</span>
        ${isLive
          ? `<span class="lc-min"><span class="ldot"></span>${m.min}</span>`
          : `<span style="font-size:11px;color:var(--text3)">${m.min}</span>`}
      </div>
      <div class="lc-body">
        <div class="lc-team">
          <div class="lc-av" style="background:${m.hc}18;border-color:${m.hc}44;color:${m.hc}">${ini(m.home)}</div>
          <div class="lc-nm">${m.home}</div>
        </div>
        <div class="lc-sc">${m.score}</div>
        <div class="lc-team">
          <div class="lc-av" style="background:${m.ac}18;border-color:${m.ac}44;color:${m.ac}">${ini(m.away)}</div>
          <div class="lc-nm">${m.away}</div>
        </div>
      </div>
      <div class="lc-footer">
        <span class="lc-tag">赔率</span>
        <span class="lc-tag">数据</span>
        <span class="lc-tag">分析</span>
        ${isLive ? '<span class="lc-tag" style="border-color:var(--p2);color:var(--p4);background:var(--p0)">动画直播</span>' : ''}
      </div>
    </div>`;
  }).join('');
}

// ── 赔率中心 ──────────────────────────────
export function renderOdds() {
  document.getElementById('odds-list').innerHTML = ODDS_DATA.map(o => {
    const live = o.time === '直播中';
    return `
    <div class="odds-body">
      <div>
        <div class="odds-teams">${o.home} <span style="color:var(--text3);font-weight:400;font-size:12px">vs</span> ${o.away}</div>
        <div style="display:flex;align-items:center;gap:6px;margin-top:4px">
          <span style="font-size:10px;color:var(--p4);background:var(--p0);padding:1px 6px;border-radius:3px;border:1px solid var(--p1);font-weight:600">${o.league}</span>
          ${live
            ? `<span class="odds-live-badge"><span class="ldot"></span>直播中</span>`
            : `<span style="font-size:10px;color:var(--text3)">${o.time}</span>`}
        </div>
      </div>
      <div class="odds-col"><div class="odds-val${parseFloat(o.win) < 2.2 ? ' best' : ''}">${o.win}</div><div class="odds-change">${chgMap[o.wchg]}</div></div>
      <div class="odds-col"><div class="odds-val">${o.draw}</div><div class="odds-change">${chgMap[o.dchg]}</div></div>
      <div class="odds-col"><div class="odds-val">${o.lose}</div><div class="odds-change">${chgMap[o.lchg]}</div></div>
      <div class="odds-col"><div style="font-size:12px;color:var(--text2);font-weight:500">${o.asian}</div></div>
      <div class="odds-col"><div style="font-size:12px;color:var(--text2);font-weight:500">${o.ou}</div></div>
    </div>`;
  }).join('');

  document.getElementById('asian-list').innerHTML = ASIAN_DATA.map(a => {
    const tc = a.trend.includes('流入') ? 'var(--red)' : 'var(--text3)';
    return `
    <div style="display:grid;grid-template-columns:200px 1fr 1fr 1fr 1fr;gap:12px;padding:11px 18px;border-bottom:1px solid var(--border);align-items:center">
      <div style="font-size:13px;font-weight:600;color:var(--text)">${a.home} vs ${a.away}</div>
      <div style="text-align:center;font-size:12px;color:var(--text2);font-weight:500">${a.pan}</div>
      <div style="text-align:center;font-size:14px;font-weight:600;color:var(--p4)">${a.hw}</div>
      <div style="text-align:center;font-size:14px;font-weight:600;color:var(--text2)">${a.aw}</div>
      <div style="text-align:center;font-size:11px;font-weight:600;color:${tc}">${a.trend}</div>
    </div>`;
  }).join('');
}

// ── AI 预测 ───────────────────────────────
export function renderAI() {
  document.getElementById('ai-result-grid').innerHTML = `
    <div class="ai-card">
      <div class="ai-card-title"><div class="ai-card-bar"></div>意甲 · AC米兰 vs 国际米兰 · 胜平负预测</div>
      <div class="ai-prob-rows">
        <div class="ai-prob-row"><span class="ai-prob-label">主胜</span><div class="ai-prob-track"><div class="ai-prob-fill fill-win" style="width:${AI_DATA.win}%"></div></div><span class="ai-prob-pct">${AI_DATA.win}%</span></div>
        <div class="ai-prob-row"><span class="ai-prob-label">平局</span><div class="ai-prob-track"><div class="ai-prob-fill fill-draw" style="width:${AI_DATA.draw}%"></div></div><span class="ai-prob-pct">${AI_DATA.draw}%</span></div>
        <div class="ai-prob-row"><span class="ai-prob-label">客胜</span><div class="ai-prob-track"><div class="ai-prob-fill fill-lose" style="width:${AI_DATA.lose}%"></div></div><span class="ai-prob-pct">${AI_DATA.lose}%</span></div>
      </div>
      <div class="ai-verdict"><span class="ai-verdict-tag">AI 结论</span><span class="ai-verdict-text">${AI_DATA.verdict}</span></div>
      <div class="ai-disclaimer">本预测仅供参考，不构成任何投注建议。理性看球，合理娱乐。</div>
    </div>
    <div class="ai-card">
      <div class="ai-card-title"><div class="ai-card-bar"></div>关键影响因素</div>
      <div class="ai-factors-grid">
        ${AI_DATA.factors.map(f => `<div class="ai-factor"><div class="ai-factor-name">${f.name}</div><div class="ai-factor-val">${f.val}</div></div>`).join('')}
      </div>
    </div>`;

  document.getElementById('ai-history').innerHTML = AI_HISTORY.map(h => `
    <div class="ai-hist-card">
      <div class="ai-hist-league">${h.league}</div>
      <div class="ai-hist-match">${h.match}</div>
      <div class="ai-hist-pred">预测：${h.pred}</div>
      <div class="ai-hist-result">
        ${h.hit === null
          ? '<span class="ai-hist-badge" style="background:var(--p0);color:var(--p4);border:1px solid var(--p1)">待结果</span>'
          : `<span class="ai-hist-badge ${h.hit ? 'badge-hit' : 'badge-miss'}">${h.hit ? '✓ 命中' : '✗ 未中'}</span>`}
        <span class="ai-hist-score">${h.score}</span>
      </div>
    </div>`).join('');
}

// ── 球吧社区 ──────────────────────────────
export function renderCommunity() {
  document.getElementById('comm-list').innerHTML = COMMUNITY_POSTS.map(p => `
    <div class="post-card">
      <div class="pc-top">
        <div class="pc-av" style="background:${p.color}18;border-color:${p.color}44;color:${p.color}">${p.av}</div>
        <div><div class="pc-author">${p.author}</div><div class="pc-meta">${p.community} · ${p.time}</div></div>
        ${p.role ? `<div class="pc-badge">${p.role}</div>` : ''}
      </div>
      <div class="pc-league-tag">${p.league}</div>
      <div class="pc-title">${p.title}</div>
      <div class="pc-body">${p.body}</div>
      <div class="pc-footer">
        <span class="pc-stat">
          <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          ${p.views.toLocaleString()}
        </span>
        <span class="pc-stat">
          <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          ${p.comments}
        </span>
        <div class="pc-vote">
          ${p.votes.map((v, i) => `<div class="pc-vote-btn${i === 0 ? ' active' : ''}">${v}</div>`).join('')}
        </div>
      </div>
    </div>`).join('');
}

// ── 资料库 ────────────────────────────────
export function renderData() {
  document.getElementById('data-football-grid').innerHTML = FOOTBALL_LEAGUES.map(l => `
    <div class="data-league-card">
      <div class="dlc-icon">${l.icon}</div>
      <div class="dlc-name">${l.name}</div>
      <div class="dlc-country">${l.country}</div>
      <div class="dlc-badge">${l.badge}</div>
    </div>`).join('');

  document.getElementById('data-team-grid').innerHTML = FOOTBALL_TEAMS.map(t => `
    <div class="data-team-card">
      <div class="dtc-av" style="background:${t.c}18;border-color:${t.c}44;color:${t.c}">${t.name.slice(0, 2)}</div>
      <div class="dtc-name">${t.name}</div>
      <div class="dtc-league">${t.l}</div>
    </div>`).join('');

  document.getElementById('data-bball-grid').innerHTML = BBALL_LEAGUES.map(l => `
    <div class="data-league-card">
      <div class="dlc-icon">${l.icon}</div>
      <div class="dlc-name">${l.name}</div>
      <div class="dlc-country">${l.country}</div>
      <div class="dlc-badge">${l.badge}</div>
    </div>`).join('');
}
