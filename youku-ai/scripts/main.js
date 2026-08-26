import {
  painDomains, solutions, layerLib, demoCases,
  compareRows, loopAssets, memberBenefit, proofBySolution,
  productLoop, productLoopCore, ecoLoop, productDemo
} from './data.js';
import { renderStack, focusLayer, fitToViewport } from './stack.js';

const $ = id => document.getElementById(id);
const STEPS = ['pain', 'solution', 'demo', 'proof', 'loop'];
let curStep = 'pain';
let curSol = solutions[0];
let curDemo = productDemo[0];
let fitMode = true;
let painOpen = false;

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

function screenHtml(d) {
  const status = `<div class="app-status"><span>9:41</span><span class="app-status-right"><i class="ri-signal-wifi-line"></i><i class="ri-battery-2-fill"></i></span></div>`;
  if (d.id === 'sol-search') {
    return `
      <div class="app-screen">
        ${status}
        <div class="app-topbar">
          <span class="app-logo">优酷</span>
          <div class="app-searchbar spot" data-spot="1">
            <i class="ri-search-line"></i>
            <span class="app-search-ph">问任何剧情 / 人物 / 看点问题</span>
            <span class="app-ai-badge">AI</span>
          </div>
        </div>
        <div class="app-chips">
          <span class="app-chip is-on">推荐</span><span class="app-chip">电视剧</span><span class="app-chip">电影</span><span class="app-chip">综艺</span>
        </div>
        <div class="app-answer">
          <div class="app-answer-head"><span class="app-ai-badge">AI</span> 搜索结果</div>
          <div class="app-answer-q">类似《隐秘的角落》的悬疑剧</div>
          <div class="app-answer-item"><span class="ari-title">《漫长的季节》</span><span class="ari-reason">悬疑+生活质感</span><span class="ari-jump"><i class="ri-play-circle-line"></i>92%</span></div>
          <div class="app-answer-item"><span class="ari-title">《沉默的真相》</span><span class="ari-reason">紫金陈原著 · 多线叙事</span><span class="ari-jump"><i class="ri-play-circle-line"></i>89%</span></div>
          <div class="app-answer-item"><span class="ari-title">《八角亭谜雾》</span><span class="ari-reason">家庭伦理裹挟悬疑</span><span class="ari-jump"><i class="ri-play-circle-line"></i>81%</span></div>
          <div class="app-answer-foot"><i class="ri-focus-3-line"></i> 点击卡片直达对应剧集分钟</div>
        </div>
      </div>`;
  }
  if (d.id === 'sol-interact') {
    return `
      <div class="app-screen">
        ${status}
        <div class="app-video">
          <span class="app-video-tag">《琅琊榜》 第 18 集</span>
          <div class="app-video-center"><i class="ri-play-fill"></i></div>
          <div class="app-role spot" data-spot="1">
            <span class="role-avatar">苏</span>
            <span class="role-msg">想聊聊刚才这段吗？</span>
          </div>
        </div>
        <div class="app-progress"><span class="app-progress-bar"></span></div>
        <div class="app-ctrl">
          <i class="ri-play-circle-line"></i><i class="ri-speed-up-line"></i><i class="ri-chat-1-line"></i><i class="ri-fullscreen-line"></i>
        </div>
        <div class="app-ask"><i class="ri-search-eye-line"></i><span>边看边问 · 这个角色是谁？</span></div>
        <div class="app-gen"><i class="ri-magic-line"></i><span>一键二创</span></div>
      </div>`;
  }
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
      <div class="app-create-grid">
        <div class="cg-item"><i class="ri-scissors-2-line"></i><span>一键二创</span></div>
        <div class="cg-item"><i class="ri-folder-5-line"></i><span>我的作品</span></div>
        <div class="cg-item"><i class="ri-flag-line"></i><span>官方活动</span></div>
        <div class="cg-item"><i class="ri-shield-star-line"></i><span>正版素材</span></div>
      </div>
    </div>`;
}

function renderProductDemo() {
  renderDemoTabs();
  const d = curDemo;
  $('demoPhone').style.setProperty('--spot-c', d.accent);
  $('demoPhone').innerHTML = `<div class="phone-notch"></div>${screenHtml(d)}`;

  const note = {
    'sol-search': '首页搜索页还原 · 圆圈① 即 AI 搜索主入口（顶部搜索框升级为自然语言问答）',
    'sol-interact': '播放页还原 · 圆圈① 为 AI 互动主入口「角色气泡」；播放页同时是搜索/二创的汇合点',
    'sol-gen': '我的页还原 · 圆圈① 为创作中心主入口，一键二创 / 混剪 / AI 番外从这里进'
  };
  $('demoScreenNote').textContent = note[d.id] || '';

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
    </div>`;
}

/* ================= STEP 4 效果验证 ================= */
let proofSol = 'sol-search';
let demoIdx = 0;
let typeTimer = null;

const demoList = () => demoCases.filter(d => d.sol === proofSol);

function renderProofTabs() {
  $('proofTabs').innerHTML = proofBySolution.map(p => `
    <button class="sol-tab ${p.sol === proofSol ? 'is-active' : ''}" data-proof-sol="${p.sol}">
      <i class="${p.icon} text-base"></i><span>${p.name}</span>
    </button>`).join('');
}

function renderDemoQuestions() {
  const list = demoList();
  const cur = proofBySolution.find(p => p.sol === proofSol);
  $('demoTitle').textContent = `${cur ? cur.name : ''} 能力演示`;
  $('demoHint').textContent = cur ? cur.verify : '';
  $('demoQuestions').innerHTML = list.map((d, i) => `
    <button class="demo-chip ${i === demoIdx ? 'is-active' : ''}" data-demo="${i}">
      <span class="opacity-60 mr-1">[${d.type}]</span>${d.q}
    </button>`).join('');
}

function renderDemoAnswer() {
  const d = demoList()[demoIdx];
  if (!d) return;
  const box = $('demoAnswer');
  clearTimeout(typeTimer);

  box.innerHTML = `
    <div class="flex items-start gap-2 mb-3">
      <span class="h-7 w-7 shrink-0 rounded-lg bg-brand-600 text-white grid place-items-center text-xs"><i class="ri-sparkling-2-line"></i></span>
      <div class="flex-1">
        <p id="typeTarget" class="text-xs text-slate-700 leading-relaxed typing"></p>
      </div>
    </div>
    <div id="demoResults" class="space-y-2 opacity-0 transition-opacity duration-500"></div>`;

  const target = box.querySelector('#typeTarget');
  const full = d.answer;
  let i = 0;
  const tick = () => {
    target.textContent = full.slice(0, i);
    if (i < full.length) { i += 1; typeTimer = setTimeout(tick, 22); }
    else {
      target.classList.remove('typing');
      const rw = box.querySelector('#demoResults');
      rw.innerHTML = d.results.map(r => `
        <div class="rounded-xl bg-white border border-slate-200 p-3 flex items-center gap-3">
          <div class="min-w-0 flex-1">
            <div class="text-[12.5px] font-bold text-slate-800">${r.title}${r.jump ? ' <span class="text-[10px] font-semibold text-brand-600 ml-1"><i class="ri-play-circle-line"></i> 可跳转</span>' : ''}</div>
            <div class="text-[11px] text-slate-500 mt-0.5 leading-relaxed">${r.reason}</div>
          </div>
          <div class="shrink-0 text-right">
            <div class="text-sm font-extrabold text-brand-600">${r.sim}</div>
            <div class="text-[10px] text-slate-400">匹配度</div>
          </div>
        </div>`).join('');
      rw.classList.remove('opacity-0');
    }
  };
  tick();

  $('usedBases').innerHTML = d.bases.map(b => `
    <span class="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 border border-brand-100"><i class="ri-database-2-line mr-1"></i>${b}</span>`).join('');
}

function renderProofMetrics() {
  const p = proofBySolution.find(x => x.sol === proofSol);
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

function renderProof() {
  renderProofTabs();
  renderDemoQuestions();
  renderDemoAnswer();
  renderProofMetrics();
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

/* ================= STEP 5 双闭环 ================= */
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
  const labels = { pain:'痛点×解法', solution:'解法', demo:'产品Demo', proof:'验证', loop:'闭环' };
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

  if (step === 'proof') renderDemoAnswer();
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

    const proofTab = e.target.closest('[data-proof-sol]');
    if (proofTab) {
      if (proofTab.dataset.proofSol !== proofSol) {
        proofSol = proofTab.dataset.proofSol;
        demoIdx = 0;
        renderProof();
      }
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
      if (d && d.id !== curDemo.id) { curDemo = d; renderProductDemo(); }
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
    const demo = e.target.closest('[data-demo]');
    if (demo) {
      demoIdx = Number(demo.dataset.demo);
      renderDemoQuestions();
      renderDemoAnswer();
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
  renderProof();
  renderCompare();
  renderLoop();
  bind();
  updateFitBtn();
  goStep('pain');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
