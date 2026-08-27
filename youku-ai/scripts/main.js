import {
  painDomains, solutions, layerLib, demoCases,
  compareRows, loopAssets, memberBenefit, proofBySolution,
  productLoop, productLoopCore, ecoLoop, productDemo
} from './data.js';
import { renderStack, focusLayer, fitToViewport } from './stack.js';

const $ = id => document.getElementById(id);
const STEPS = ['pain', 'solution', 'demo', 'loop'];
let curStep = 'pain';
let curSol = solutions[0];
let curDemo = productDemo[0];
let curScreen = productDemo[0].screens[0].key;
let curQuery = 0;
let fitMode = true;
let painOpen = false;

/* curQuery 是 curDemo.queryList 数组里的索引；
   切换屏幕时如果当前 query 不属于新屏，则重置为 0 */
function setCurDemo(d) {
  curDemo = d;
  curScreen = d.screens[0].key;
  curQuery = 0;
}
function setCurScreen(key) {
  if (curScreen === key) return;
  curScreen = key;
  // 如果当前 query 不属于新屏，选第一个属于新屏的 query；都没有就保留 0
  const cur = curDemo.queryList[curQuery];
  if (!cur || (cur.screen && cur.screen !== key)) {
    const idx = curDemo.queryList.findIndex(q => q.screen === key);
    curQuery = idx >= 0 ? idx : 0;
  }
}
function curQueryDemo() {
  const ql = curDemo.queryList;
  if (!ql || ql.length === 0) return null;
  return demoCases[ql[curQuery].idx];
}
function queryBarHtml() {
  const d = curDemo;
  if (!d.queryList || d.queryList.length === 0) return '';
  return `<div class="app-qbar" role="tablist" aria-label="切换 query">
    ${d.queryList.map((q, i) => `
      <button class="app-qtag ${i === curQuery ? 'is-active' : ''}" data-q="${i}" title="${q.short}">
        <span class="app-qtag-type">${q.type}</span>
        <span class="app-qtag-q">${q.short}</span>
      </button>
    `).join('')}
    <span class="app-qbar-tip">点不同 query 看不同结果 ›</span>
  </div>`;
}

/* ================= STEP 1 痛点 ================= */
const rootCauses = [
  { title: '内容没有被结构化', icon: 'ri-database-2-line', text: '人工打标签效率低、维度粗，平台其实不理解自己的内容，智能分发无从谈起。' },
  { title: '产品没有留存抓手', icon: 'ri-magnet-line', text: '核心交付是完整长视频，留存完全依赖新剧供给，剧完即走。' },
  { title: '生产只有一条腿，且无社区沉淀', icon: 'ri-user-forbid-line', text: '只有官方生产，用户创作欲被浪费；看完即走没有讨论与关系的场域，热度只能靠官方运营硬推。' }
];

const solOf = id => solutions.find(x => x.id === id);

// 会员权益是三产品通用收益，不属于单一层级节点，单独标记渲染
const fixNodeTag = node => node === '__member__'
  ? `<span class="fix-node" style="background:linear-gradient(135deg,#7c3aed,#2a52d4);color:#fff;border-color:transparent"><i class="ri-vip-crown-2-line mr-1"></i>三产品通用 · 会员权益</span>`
  : `<span class="fix-node">${node}</span>`;

function renderPain() {
  $('painGrid').innerHTML = painDomains.map((p, pi) => `
    <div class="pain-col fade-in" data-pain="${p.id}" style="animation-delay:${pi * 90}ms">
      <div class="pain-col-head">
        <span class="h-9 w-9 shrink-0 rounded-xl bg-white/20 grid place-items-center"><i class="${p.icon} text-lg"></i></span>
        <div class="min-w-0">
          <h3 class="text-sm font-bold leading-tight">${p.name}</h3>
          <p class="text-[11px] text-white/85 font-semibold mt-0.5">${p.essence}</p>
        </div>
        <button class="pain-more" data-pain-more="${p.id}" title="查看痛点详情"><i class="ri-information-line"></i></button>
      </div>

      <div class="p-3 space-y-2.5">
        ${p.items.map((it, i) => {
          const s = solOf(it.fixSol);
          return `
          <div class="pair" data-pair>
            <div class="pair-pain">
              <span class="pair-no">${pi + 1}.${i + 1}</span>
              <div class="min-w-0 flex-1">
                <p class="text-[12.5px] font-bold text-slate-800 leading-snug">${it.name}</p>
                <p class="pair-detail text-[11px] text-slate-500 leading-relaxed mt-1">${it.detail}</p>
              </div>
            </div>

            <div class="pair-arrow"><i class="ri-arrow-down-line"></i><span>对应解法</span></div>

            <div class="pair-fix">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="fix-badge"><i class="${s ? s.icon : 'ri-magic-line'}"></i>${s ? s.name : 'AI 解法'}</span>
                ${fixNodeTag(it.fixNode)}
                <button class="fix-toggle ml-auto" data-pair-toggle title="展开解法说明">
                  <span class="fix-toggle-txt">展开</span><i class="ri-arrow-down-s-line"></i>
                </button>
              </div>
              <p class="pair-fixtext text-[11px] text-slate-700 leading-relaxed mt-1.5">${it.fix}</p>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`).join('');

  $('rootCauseGrid').innerHTML = rootCauses.map(r => `
    <div class="rounded-xl bg-slate-50 border border-slate-200 p-4">
      <h4 class="text-[13px] font-bold mb-1.5"><i class="${r.icon} text-brand-500 mr-1"></i>${r.title}</h4>
      <p class="text-[11px] text-slate-600 leading-relaxed">${r.text}</p>
    </div>`).join('');
}

function openPainModal(id) {
  const p = painDomains.find(x => x.id === id);
  if (!p) return;
  $('modalTitle').textContent = p.name;
  $('modalPath').textContent = `痛点域 · ${p.essence}`;
  $('modalIcon').className = 'h-11 w-11 shrink-0 rounded-xl grid place-items-center bg-pain-50 text-pain-500 text-xl';
  $('modalIcon').innerHTML = `<i class="${p.icon}"></i>`;
  $('modalBody').innerHTML = `
    <div class="space-y-3">
      ${p.items.map((it, i) => {
        const s = solOf(it.fixSol);
        return `<div class="rounded-xl border border-slate-200 overflow-hidden">
        <div class="p-3.5 bg-rose-50/60 border-l-[3px] border-rose-400">
          <h4 class="text-[13px] font-bold text-slate-800 mb-1">${i + 1}. ${it.name}</h4>
          <p class="text-xs text-slate-600 leading-relaxed">${it.detail}</p>
        </div>
        <div class="p-3.5 bg-blue-50/50 border-l-[3px] border-brand-500 border-t border-slate-100">
          <div class="flex items-center gap-1.5 flex-wrap mb-1.5">
            <span class="fix-badge"><i class="${s ? s.icon : 'ri-magic-line'}"></i>${s ? s.name : 'AI 解法'}</span>
            ${fixNodeTag(it.fixNode)}
          </div>
          <p class="text-xs text-slate-700 leading-relaxed">${it.fix}</p>
        </div>
      </div>`;
      }).join('')}
    </div>
    <div class="mt-4 pt-4 border-t border-slate-100">
      <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">承接解法</div>
      <div class="flex flex-wrap gap-2">
        ${p.solvedBy.map(sid => {
          const s = solutions.find(x => x.id === sid);
          return s ? `<button data-jump-sol="${s.id}" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 hover:bg-brand-100 transition"><i class="${s.icon} mr-1"></i>${s.name}</button>` : '';
        }).join('')}
      </div>
    </div>`;
  showModal();
}

/* ================= STEP 2 解法架构 ================= */
function renderSolTabs() {
  $('solTabs').innerHTML = solutions.map(s => `
    <button class="sol-tab ${s.id === curSol.id ? 'is-active' : ''}" data-sol="${s.id}">
      <i class="${s.icon} text-base"></i>
      <span>${s.name}</span>
      <span class="text-[10px] font-semibold opacity-60">${s.side}</span>
    </button>`).join('');
}

function renderSolution() {
  renderSolTabs();
  $('stackTitle').textContent = `${curSol.name} · 三层架构（自下而上依赖）`;
  $('stackClaim').textContent = curSol.claim + ' · 点击任意节点查看详情';
  renderStack($('stackScene'), curSol);

  renderLayerDetail(curSol.layers[curSol.layers.length - 1]);

  $('solveBack').innerHTML = `
    <div class="text-[11px] font-bold text-brand-100 uppercase tracking-wide mb-2">回应的痛点</div>
    <p class="text-xs leading-relaxed text-brand-50/95">${curSol.solves}</p>`;

  applyFit();
}

// 等布局稳定后再测量，避免字体/图标未加载导致高度失真
function applyFit() {
  requestAnimationFrame(() => fitToViewport($('stackScene'), fitMode));
}

function updateFitBtn() {
  const b = $('btnFitScreen');
  b.classList.toggle('is-active', fitMode);
  b.innerHTML = fitMode
    ? '<i class="ri-fullscreen-exit-line mr-1"></i>一屏展示'
    : '<i class="ri-fullscreen-line mr-1"></i>展开详情';
}

function renderLayerDetail(layerId) {
  const l = layerLib[layerId];
  if (!l) return;
  const isDeep = l.theme === 'deep';
  $('layerDetail').className = 'lg:col-span-2 rounded-2xl bg-slate-50 border border-slate-200 p-5 fade-in';
  $('layerDetail').innerHTML = `
    <div class="flex items-center gap-2 mb-2">
      <span class="text-[11px] font-extrabold px-2.5 py-1 rounded-full ${isDeep ? 'bg-brand-800 text-white' : 'bg-brand-50 text-brand-600'}">第 ${l.level} 层</span>
      <span class="text-[11px] text-slate-400 ml-auto">${l.nodes.length} 个能力节点</span>
    </div>
    <h3 class="text-base font-bold leading-snug">${l.title}</h3>
    <p class="text-xs text-slate-500 mt-1">${l.subtitle}</p>
    <div class="mt-3 rounded-xl bg-slate-50 border-l-2 border-brand-400 pl-3 py-2.5 pr-3">
      <p class="text-xs text-slate-600 leading-relaxed">${l.why}</p>
    </div>
    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2.5">
      ${l.nodes.map((n, i) => `<button data-node="${l.id}::${i}" class="text-left rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 transition p-3">
        <div class="text-[12.5px] font-bold text-slate-800 mb-1"><i class="${n.icon} text-brand-500 mr-1"></i>${n.name}</div>
        <div class="text-[11px] text-slate-500 leading-relaxed">${n.detail}</div>
      </button>`).join('')}
    </div>`;
}

function openNodeModal(key) {
  const [layerId, idxStr] = key.split('::');
  const l = layerLib[layerId];
  if (!l) return;
  const n = l.nodes[Number(idxStr)];
  if (!n) return;
  $('modalTitle').textContent = n.name;
  $('modalPath').textContent = `${curSol.name} › 第 ${l.level} 层 · ${l.title}`;
  $('modalIcon').className = 'h-11 w-11 shrink-0 rounded-xl grid place-items-center bg-brand-50 text-brand-600 text-xl';
  $('modalIcon').innerHTML = `<i class="${n.icon}"></i>`;
  $('modalBody').innerHTML = `
    <p class="leading-relaxed">${n.detail}</p>
    <div class="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3.5">
      <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">所属层的作用</div>
      <p class="text-xs text-slate-600 leading-relaxed">${l.why}</p>
    </div>`;
  showModal();
}

/* ================= STEP 3 产品 Demo（形态/入口/交互） ================= */
function renderDemoTabs() {
  $('demoTabs').innerHTML = productDemo.map(d => `
    <button class="sol-tab ${d.id === curDemo.id ? 'is-active' : ''}" data-demo-sol="${d.id}">
      <i class="${d.icon} text-base"></i><span>${d.name}</span>
      <span class="text-[10px] font-semibold opacity-60">${d.side}</span>
    </button>`).join('');
}

function screenHtml(d, key) {
  const status = `<div class="app-status"><span>9:41</span><span class="app-status-right"><i class="ri-signal-wifi-line"></i><i class="ri-battery-2-fill"></i></span></div>`;
  const q = curQueryDemo();
  const qBar = queryBarHtml();

  /* ------ 结果迷你列表（屏内紧凑展示） ------ */
  const rMini = (q ? q.results : []).map(r => `
    <div class="app-rmini ${r.jump ? 'has-jump' : ''}">
      <div class="app-rmini-main">
        <div class="app-rmini-t">${r.title}</div>
        <div class="app-rmini-r">${r.reason}</div>
      </div>
      <div class="app-rmini-s">
        <span class="app-rmini-snum" style="color:${d.accent}">${r.sim}</span>
        <span class="app-rmini-slabel">${d.id === 'sol-gen' ? '完成度' : '匹配度'}</span>
        ${r.jump ? '<i class="ri-play-circle-fill app-rmini-jump" title="可跳转"></i>' : ''}
      </div>
    </div>
  `).join('');
  const baseRow = (q ? q.bases : []).map(b => `<span class="app-base"><i class="ri-database-2-line mr-1"></i>${b}</span>`).join('');
  const answerBubble = q ? `
    <div class="app-answer-mini">
      <span class="app-ai-badge" style="background:${d.accent}">AI</span>
      <div class="app-answer-mini-body">
        <div class="app-answer-q">${q.q}</div>
        <div class="app-answer-hint">${q.answer}</div>
      </div>
    </div>` : '';

  if (key === 'home' || key === 'search') {
    // AI 搜索：搜索页 + 屏内 5 类 query 切换
    return `
      <div class="app-screen">
        ${status}
        <div class="app-topbar">
          <span class="app-logo">优酷</span>
          <div class="app-searchbar spot" data-spot="1">
            <i class="ri-search-line"></i>
            <span class="app-search-ph">${q ? q.q : '问任何剧情 / 人物 / 看点问题'}</span>
            <span class="app-ai-badge">AI</span>
          </div>
        </div>
        ${qBar}
        <div class="app-result-area">
          ${answerBubble}
          <div class="app-rmini-list">${rMini}</div>
          <div class="app-bases-row">${baseRow}</div>
        </div>
      </div>`;
  }
  if (key === 'player') {
    // AI 互动：播放页（暂停态）+ AI 胶囊 + 角色气泡 + 屏内 query 切换 + 边看边问
    const isPlayQA = q && q.id === 5;
    return `
      <div class="app-screen">
        ${status}
        <div class="app-video">
          <span class="app-video-tag">《琅琊榜》 第 18 集</span>
          <span class="app-paused"><i class="ri-pause-circle-fill"></i> 已暂停</span>
          <div class="app-video-center"><i class="ri-play-fill"></i></div>
          <div class="app-ai-capsule spot" data-spot="1"><i class="ri-sparkling-2-line"></i>AI</div>
          <div class="app-role">
            <span class="role-avatar">苏</span>
            <span class="role-msg">${isPlayQA ? '你刚才那段我记着呢…' : '想聊点什么？'}</span>
          </div>
        </div>
        <div class="app-ctrl">
          <i class="ri-play-circle-line"></i><i class="ri-speed-up-line"></i><i class="ri-chat-1-line"></i><i class="ri-fullscreen-line"></i>
        </div>
        ${qBar}
        <div class="app-result-area app-result-compact">
          ${answerBubble}
          <div class="app-rmini-list">${rMini}</div>
          <div class="app-bases-row">${baseRow}</div>
        </div>
      </div>`;
  }
  if (key === 'community') {
    // AI 互动社区：角色朋友圈 + 屏内 query 切换（关系运营）
    return `
      <div class="app-screen">
        ${status}
        <div class="app-community-head">
          <div class="app-community-title">社区</div>
          <div class="app-community-sub">角色朋友圈 · 你的追剧同好圈</div>
        </div>
        ${qBar}
        <div class="app-feed">
          <div class="app-feed-card">
            <div class="app-feed-role">
              <span class="role-avatar sm">苏</span>
              <div class="app-feed-roleinfo">
                <div class="app-feed-name">梅长苏 <span class="app-ai-badge">AI</span></div>
                <div class="app-feed-time">2 小时前 · 追剧中</div>
              </div>
              <i class="ri-more-2-fill app-feed-more"></i>
            </div>
            <div class="app-feed-text">琅琊榜首，江左梅郎。今日秋色正好，诸位可愿与我共饮一杯？</div>
            <div class="app-feed-actions">
              <span><i class="ri-heart-3-line"></i>1.2万</span><span><i class="ri-chat-1-line"></i>2860</span><span><i class="ri-share-forward-line"></i>分享</span>
            </div>
          </div>
          <div class="app-feed-card spot" data-spot="1">
            <div class="app-feed-role">
              <span class="role-avatar sm rev">萧</span>
              <div class="app-feed-roleinfo">
                <div class="app-feed-name">靖王萧景琰 <span class="app-ai-badge">AI</span></div>
                <div class="app-feed-time">刚刚 · 互动提醒</div>
              </div>
              <i class="ri-more-2-fill app-feed-more"></i>
            </div>
            <div class="app-feed-text">今日份的追剧打卡：第 18 集，赤焰旧案渐明。评论区聊聊你们最想对苏先生说的一句话。</div>
            <div class="app-feed-actions">
              <span><i class="ri-heart-3-line"></i>3.4万</span><span><i class="ri-chat-1-line"></i>9120</span><span><i class="ri-share-forward-line"></i>分享</span>
            </div>
          </div>
          <div class="app-feed-remix">
            <i class="ri-magic-line"></i>
            <div class="app-feed-remix-info">
              <div class="app-feed-remix-title">二创推荐 · 用户混剪《赤焰旧事》</div>
              <div class="app-feed-remix-sub">来自创作中心 · 正版素材授权</div>
            </div>
            <i class="ri-play-circle-fill"></i>
          </div>
        </div>
        <div class="app-bottom-tab">
          <span class="app-tab"><i class="ri-home-5-line"></i>首页</span>
          <span class="app-tab is-on"><i class="ri-team-line"></i>社区</span>
          <span class="app-tab"><i class="ri-user-3-line"></i>我的</span>
        </div>
      </div>`;
  }
  if (key === 'mine') {
    // AI 生视频：我的页 + 屏内 2 类 query 切换（轻创作 / 决策前置）
    return `
      <div class="app-screen">
        ${status}
        <div class="app-user">
          <span class="app-avatar">冬</span>
          <div>
            <div class="app-nick">winterduan</div>
            <div class="app-vip"><i class="ri-vip-crown-2-fill"></i> 优酷 VIP</div>
          </div>
        </div>
        <div class="app-create-card spot" data-spot="1">
          <span class="app-create-ic"><i class="ri-magic-line"></i></span>
          <div>
            <div class="app-create-title">创作中心</div>
            <div class="app-create-sub">一键角色 cut · 混剪 · AI 番外</div>
          </div>
          <i class="ri-arrow-right-s-line"></i>
        </div>
        ${qBar}
        <div class="app-result-area app-result-compact">
          ${answerBubble}
          <div class="app-rmini-list">${rMini}</div>
          <div class="app-bases-row">${baseRow}</div>
        </div>
      </div>`;
  }
  // 兜底：fallback 到 home
  return '';
}

function renderScreenTabs() {
  const d = curDemo;
  const wrap = $('demoScreenTabs');
  if (!d.screens || d.screens.length <= 1) { wrap.innerHTML = ''; wrap.classList.add('hidden'); return; }
  wrap.classList.remove('hidden');
  wrap.innerHTML = d.screens.map(s => `
    <button class="screen-tab ${s.key === curScreen ? 'is-active' : ''}" data-screen="${s.key}">
      <span class="screen-tab-dot"></span>${s.label}
    </button>`).join('');
}

function renderProductDemo() {
  renderDemoTabs();
  renderScreenTabs();
  const d = curDemo;
  const screenKey = d.screens.some(s => s.key === curScreen) ? curScreen : d.screens[0].key;
  $('demoPhone').style.setProperty('--spot-c', d.accent);
  $('demoPhone').innerHTML = `<div class="phone-notch"></div>${screenHtml(d, screenKey)}`;

  const noteMap = {
    'sol-search': '搜索页还原 · 圆圈① 即 AI 搜索主入口（顶部搜索框升级为自然语言问答）',
    'sol-interact:player': '播放页还原（暂停态）· 圆圈① 为右下角 AI 胶囊（调起入口），点击后角色气泡与边看边问才浮现',
    'sol-interact:community': '社区页还原 · 角色朋友圈：角色动态流 + 二创分发 + 粉丝互动，圆圈① 为角色动态入口',
    'sol-gen': '我的页还原 · 圆圈① 为创作中心入口，一键二创 / 混剪 / AI 番外从这里进'
  };
  $('demoScreenNote').textContent = noteMap[`${d.id}:${screenKey}`] || noteMap[d.id] || '';

  const entryTags = d.entries.map((e, i) => `
    <div class="entry-row">
      <span class="entry-dot" style="background:${d.accent}">${i + 1}</span>
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <span class="text-[12.5px] font-bold text-slate-800">${e.name}</span>
          ${e.primary ? '<span class="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-brand-600 text-white">主入口</span>' : '<span class="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">次入口</span>'}
        </div>
        <div class="text-[11px] text-slate-500 mt-0.5">${e.where}</div>
        <div class="text-[11px] text-slate-500 mt-0.5 leading-relaxed">${e.note}</div>
      </div>
    </div>`).join('');

  const stepTags = d.interactions.map((it, i) => `
    <div class="flow-step">
      <span class="flow-no" style="background:${d.accent}">${i + 1}</span>
      <div class="min-w-0 flex-1">
        <div class="text-[12px] font-bold text-slate-800 leading-snug">${it.text}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">${it.sub}</div>
      </div>
    </div>`).join('');

  const overlayHtml = d.overlay ? `
    <div class="rounded-2xl bg-white border border-slate-200 shadow-soft p-5 fade-in">
      <h3 class="text-sm font-bold mb-1"><i class="ri-eye-off-line text-brand-500 mr-1"></i>${d.overlay.title}</h3>
      <p class="text-[11px] text-slate-500 mb-3 leading-relaxed">${d.overlay.principle}</p>
      <div class="space-y-2">
        ${d.overlay.states.map((s, i) => `
          <div class="overlay-state">
            <span class="overlay-state-no" style="background:${d.accent}">${i + 1}</span>
            <div class="min-w-0 flex-1">
              <div class="text-[12px] font-bold text-slate-800">${s.name}</div>
              <div class="text-[11px] text-slate-500 mt-0.5 leading-relaxed">${s.desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>` : '';

  $('demoDetail').innerHTML = `
    <div class="rounded-2xl bg-white border border-slate-200 shadow-soft p-5 fade-in">
      <div class="flex items-center gap-2 mb-2">
        <span class="h-9 w-9 rounded-xl grid place-items-center text-white" style="background:${d.accent}"><i class="${d.icon} text-lg"></i></span>
        <div>
          <h3 class="text-sm font-bold">产品形态</h3>
          <p class="text-[11px] text-slate-400">${d.tagline}</p>
        </div>
      </div>
      <h4 class="text-[13px] font-bold text-slate-800 mt-3">${d.form.title}</h4>
      <p class="text-xs text-slate-600 leading-relaxed mt-1.5">${d.form.desc}</p>
      <div class="flex flex-wrap gap-2 mt-3">
        ${d.form.points.map(p => `<span class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200"><i class="ri-check-line text-brand-500 mr-1"></i>${p}</span>`).join('')}
      </div>
    </div>

    <div class="rounded-2xl bg-white border border-slate-200 shadow-soft p-5 fade-in">
      <h3 class="text-sm font-bold mb-1"><i class="ri-map-pin-line text-brand-500 mr-1"></i>入口在哪</h3>
      <p class="text-[11px] text-slate-500 mb-3">主入口已在左侧手机界面标注，次入口用文字补充位置</p>
      <div class="space-y-2.5">${entryTags}</div>
    </div>

    <div class="rounded-2xl bg-white border border-slate-200 shadow-soft p-5 fade-in">
      <h3 class="text-sm font-bold mb-1"><i class="ri-gesture-line text-brand-500 mr-1"></i>怎么交互</h3>
      <p class="text-[11px] text-slate-500 mb-3">从进入到完整体验的三步</p>
      <div class="space-y-2.5">${stepTags}</div>
    </div>

    ${overlayHtml}`;

  // 效果验证：能力演示已并入手机屏内（点 query 切换即可），此处只渲染验证指标
  renderProofMetrics();
}

/* ================= 效果验证（指标；能力演示已嵌入手机屏内） ================= */
function renderProofMetrics() {
  const p = proofBySolution.find(x => x.sol === curDemo.id);
  if (!p) return;
  $('proofMetrics').innerHTML = p.metrics.map(m => `
    <div class="rounded-xl bg-white border border-slate-200 p-3.5 fade-in">
      <div class="text-[12.5px] font-bold text-slate-800 mb-2">${m.label}</div>
      <div class="flex items-start gap-1.5 mb-1.5">
        <i class="ri-close-circle-line text-pain-500 text-xs mt-0.5"></i>
        <span class="text-[11px] text-slate-500 leading-relaxed">${m.before}</span>
      </div>
      <div class="flex items-start gap-1.5">
        <i class="ri-checkbox-circle-line text-emerald-500 text-xs mt-0.5"></i>
        <span class="text-[11px] text-slate-700 font-medium leading-relaxed">${m.after}</span>
      </div>
    </div>`).join('');
}

function renderCompare() {
  $('compareList').innerHTML = compareRows.map(r => `
    <div class="cmp-row grid grid-cols-1 md:grid-cols-12 gap-3 px-5 py-3.5 items-center">
      <div class="md:col-span-2 text-[12.5px] font-bold text-slate-800">${r.dim}</div>
      <div class="md:col-span-5 flex items-start gap-2">
        <i class="ri-close-circle-line text-pain-500 mt-0.5"></i>
        <span class="text-xs text-slate-500 leading-relaxed">${r.before}</span>
      </div>
      <div class="md:col-span-5 flex items-start gap-2">
        <i class="ri-checkbox-circle-line text-emerald-500 mt-0.5"></i>
        <span class="text-xs text-slate-700 font-medium leading-relaxed">${r.after}</span>
      </div>
    </div>`).join('');
}

/* ================= STEP 4 双闭环 ================= */
function renderLoop() {
  $('productLoopGrid').innerHTML = productLoop.map(s => `
    <div class="loop-step fade-in">
      <div class="flex items-center gap-2 mb-2.5">
        <span class="h-9 w-9 rounded-xl bg-brand-50 text-brand-600 grid place-items-center"><i class="${s.icon} text-lg"></i></span>
        <span class="text-[11px] font-extrabold text-brand-600">${s.from}</span>
        <i class="ri-arrow-right-line text-slate-300"></i>
        <span class="text-[11px] font-extrabold text-purple-600">${s.to}</span>
      </div>
      <h4 class="text-[13px] font-bold mb-1.5">${s.title}</h4>
      <p class="text-[11px] text-slate-600 leading-relaxed">${s.desc}</p>
      <div class="mt-2.5 pt-2.5 border-t border-slate-100 text-[10.5px] font-bold text-brand-600"><i class="ri-arrow-right-circle-line mr-1"></i>${s.hand}</div>
    </div>`).join('');

  $('loopCore').innerHTML = `
    <h4 class="text-[13px] font-bold mb-1.5"><i class="ri-database-2-line mr-1"></i>${productLoopCore.title}</h4>
    <p class="text-[11px] leading-relaxed text-brand-50/95">${productLoopCore.desc}</p>`;

  $('ecoIntro').textContent = ecoLoop.intro;

  $('ecoGrid').innerHTML = ecoLoop.nodes.map(n => `
    <div class="rounded-xl bg-white border border-slate-200 p-4 hover:border-brand-300 hover:shadow-soft transition fade-in">
      <div class="flex items-center gap-2 mb-2">
        <span class="h-9 w-9 rounded-xl bg-brand-50 text-brand-600 grid place-items-center"><i class="${n.icon} text-lg"></i></span>
        <div class="min-w-0">
          <h4 class="text-[13px] font-bold leading-tight">${n.name}</h4>
          <p class="text-[10.5px] text-slate-400 leading-tight mt-0.5">${n.asset}</p>
        </div>
      </div>
      <p class="text-[11px] text-slate-600 leading-relaxed">${n.link}</p>
      <div class="mt-2.5 inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700"><i class="ri-arrow-right-circle-line"></i>${n.value}</div>
    </div>`).join('');

  $('ecoCompare').innerHTML = ecoLoop.compare.map(r => `
    <div class="cmp-row grid grid-cols-1 md:grid-cols-12 gap-3 px-5 py-3 items-center">
      <div class="md:col-span-2 text-[12.5px] font-bold text-slate-800">${r.dim}</div>
      <div class="md:col-span-5 flex items-start gap-2">
        <i class="ri-close-circle-line text-pain-500 mt-0.5"></i>
        <span class="text-xs text-slate-500 leading-relaxed">${r.before}</span>
      </div>
      <div class="md:col-span-5 flex items-start gap-2">
        <i class="ri-checkbox-circle-line text-emerald-500 mt-0.5"></i>
        <span class="text-xs text-slate-700 font-medium leading-relaxed">${r.after}</span>
      </div>
    </div>`).join('');

  $('assetGrid').innerHTML = loopAssets.map(a => `
    <div class="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
      <i class="${a.icon} text-2xl text-brand-500"></i>
      <div class="text-[12.5px] font-bold mt-2">${a.title}</div>
      <div class="text-[10.5px] text-slate-500 mt-1">${a.desc}</div>
    </div>`).join('');
}

/* ================= 会员权益（三产品通用） ================= */
function renderMemberBenefit() {
  const m = memberBenefit;
  $('memberWrap').innerHTML = `
    <div class="rounded-2xl bg-gradient-to-br from-purple-700 via-brand-700 to-brand-800 text-white p-6 shadow-soft">
      <div class="flex items-center gap-2 mb-2">
        <span class="h-10 w-10 rounded-xl bg-white/20 grid place-items-center"><i class="ri-vip-crown-2-line text-xl"></i></span>
        <div>
          <span class="text-[10.5px] font-extrabold tracking-widest text-brand-100">三大产品通用收益</span>
          <h3 class="text-base lg:text-lg font-extrabold leading-tight">${m.title}</h3>
        </div>
      </div>
      <p class="text-xs font-bold text-white mb-2">${m.claim}</p>
      <p class="text-[11.5px] leading-relaxed text-brand-50/90">${m.why}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
      ${m.contributions.map(c => `
        <div class="rounded-xl bg-white border border-slate-200 shadow-soft p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="h-8 w-8 rounded-lg bg-brand-50 text-brand-600 grid place-items-center"><i class="${c.icon}"></i></span>
            <h4 class="text-[13px] font-bold">${c.name}</h4>
          </div>
          <p class="text-[11px] text-slate-600 leading-relaxed">${c.give}</p>
          <div class="mt-2.5 pt-2.5 border-t border-slate-100 text-[10.5px] text-purple-700 font-bold leading-relaxed"><i class="ri-vip-crown-line mr-1"></i>${c.tier}</div>
        </div>`).join('')}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
      ${m.pillars.map(p => `
        <div class="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <h4 class="text-[12.5px] font-bold mb-1.5"><i class="${p.icon} text-brand-500 mr-1"></i>${p.title}</h4>
          <p class="text-[11px] text-slate-600 leading-relaxed">${p.desc}</p>
        </div>`).join('')}
    </div>

    <div class="flex flex-wrap gap-2 mt-3">
      ${m.metrics.map(x => `<span class="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-100"><i class="ri-focus-2-line mr-1"></i>${x}</span>`).join('')}
    </div>`;
}

/* ================= 步骤切换 ================= */
function renderDots() {
  const labels = { pain:'痛点×解法', solution:'解法', demo:'产品Demo×验证', loop:'闭环' };
  $('stepDots').innerHTML = STEPS.map(s => `
    <button data-goto-step="${s}" class="flex items-center gap-1.5 px-2 py-1 rounded-lg transition ${s === curStep ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}">
      <span class="h-1.5 w-1.5 rounded-full ${s === curStep ? 'bg-white' : 'bg-slate-400'}"></span>
      <span class="text-[11px] font-bold">${labels[s]}</span>
    </button>`).join('');
}

function goStep(step) {
  if (!STEPS.includes(step)) return;
  curStep = step;
  document.querySelectorAll('.step-panel').forEach(p => p.classList.add('hidden'));
  $(`step-${step}`).classList.remove('hidden');
  document.querySelectorAll('#stepNav .view-tab').forEach(b => b.classList.toggle('is-active', b.dataset.step === step));
  renderDots();

  const i = STEPS.indexOf(step);
  $('btnPrev').disabled = i === 0;
  $('btnNext').disabled = i === STEPS.length - 1;
  $('btnPrev').style.opacity = i === 0 ? '.4' : '1';
  $('btnNext').style.opacity = i === STEPS.length - 1 ? '.4' : '1';

  if (step === 'demo') renderProductDemo();
  if (step === 'solution') applyFit();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ================= 弹窗 ================= */
function showModal() {
  $('modal').classList.remove('hidden');
  $('modal').classList.add('flex');
}
function closeModal() {
  $('modal').classList.add('hidden');
  $('modal').classList.remove('flex');
}

/* ================= 事件绑定 ================= */
function bind() {
  $('stepNav').addEventListener('click', e => {
    const b = e.target.closest('[data-step]');
    if (b) goStep(b.dataset.step);
  });

  $('btnPrev').addEventListener('click', () => {
    const i = STEPS.indexOf(curStep);
    if (i > 0) goStep(STEPS[i - 1]);
  });
  $('btnNext').addEventListener('click', () => {
    const i = STEPS.indexOf(curStep);
    if (i < STEPS.length - 1) goStep(STEPS[i + 1]);
  });

  $('btnFocusReset').addEventListener('click', () => focusLayer($('stackScene'), null));

  $('btnExpandAll').addEventListener('click', () => {
    painOpen = !painOpen;
    document.querySelectorAll('.pair').forEach(c => c.classList.toggle('is-open', painOpen));
    document.querySelectorAll('.fix-toggle-txt').forEach(t => { t.textContent = painOpen ? '收起' : '展开'; });
    $('btnExpandAll').innerHTML = painOpen
      ? '<i class="ri-collapse-vertical-line mr-1"></i>收起全部说明'
      : '<i class="ri-expand-vertical-line mr-1"></i>展开全部说明';
  });

  $('btnFitScreen').addEventListener('click', () => {
    fitMode = !fitMode;
    updateFitBtn();
    applyFit();
  });

  // 折叠详情展开/收起后，一屏高度预算变化，需重算
  $('detailWrap').addEventListener('toggle', () => {
    if ($('detailWrap').open) $('detailWrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
    else applyFit();
  });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (curStep === 'solution') applyFit(); }, 160);
  });

  document.body.addEventListener('click', e => {
    const goto = e.target.closest('[data-goto-step]');
    if (goto) { goStep(goto.dataset.gotoStep); return; }

    const jump = e.target.closest('[data-jump-sol]');
    if (jump) {
      const s = solutions.find(x => x.id === jump.dataset.jumpSol);
      if (s) { curSol = s; renderSolution(); closeModal(); goStep('solution'); }
      return;
    }

    const solTab = e.target.closest('[data-sol]');
    if (solTab) {
      const s = solutions.find(x => x.id === solTab.dataset.sol);
      if (s && s.id !== curSol.id) { curSol = s; renderSolution(); }
      return;
    }

    const demoTab = e.target.closest('[data-demo-sol]');
    if (demoTab) {
      const d = productDemo.find(x => x.id === demoTab.dataset.demoSol);
      if (d && d.id !== curDemo.id) { setCurDemo(d); renderProductDemo(); }
      return;
    }

    const screenTab = e.target.closest('[data-screen]');
    if (screenTab) {
      if (screenTab.dataset.screen !== curScreen) { setCurScreen(screenTab.dataset.screen); renderProductDemo(); }
      return;
    }

    const qtag = e.target.closest('[data-q]');
    if (qtag) {
      const i = Number(qtag.dataset.q);
      if (Number.isInteger(i) && i >= 0 && i < (curDemo.queryList || []).length && i !== curQuery) {
        curQuery = i;
        renderProductDemo();
      }
      return;
    }

    const pairToggle = e.target.closest('[data-pair-toggle]');
    if (pairToggle) {
      const pair = pairToggle.closest('.pair');
      if (pair) {
        const open = pair.classList.toggle('is-open');
        const txt = pair.querySelector('.fix-toggle-txt');
        if (txt) txt.textContent = open ? '收起' : '展开';
      }
      return;
    }

    const painMore = e.target.closest('[data-pain-more]');
    if (painMore) { openPainModal(painMore.dataset.painMore); return; }

    const pairPain = e.target.closest('.pair-pain');
    if (pairPain) {
      const pair = pairPain.closest('.pair');
      if (pair) {
        const open = pair.classList.toggle('is-open');
        const txt = pair.querySelector('.fix-toggle-txt');
        if (txt) txt.textContent = open ? '收起' : '展开';
      }
      return;
    }

    const node = e.target.closest('[data-node]');
    if (node) { openNodeModal(node.dataset.node); return; }

    const row = e.target.closest('.layer-row');
    if (row && row.dataset.layer) {
      focusLayer($('stackScene'), row.dataset.layer);
      renderLayerDetail(row.dataset.layer);
      return;
    }
  });

  $('modalClose').addEventListener('click', closeModal);
  $('modal').addEventListener('click', e => { if (e.target === $('modal')) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') { const i = STEPS.indexOf(curStep); if (i < STEPS.length - 1) goStep(STEPS[i + 1]); }
    if (e.key === 'ArrowLeft') { const i = STEPS.indexOf(curStep); if (i > 0) goStep(STEPS[i - 1]); }
  });
}

/* ================= 启动 ================= */
function boot() {
  renderPain();
  renderSolution();
  renderProductDemo();
  renderMemberBenefit();
  renderCompare();
  renderLoop();
  bind();
  updateFitBtn();
  goStep('pain');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
