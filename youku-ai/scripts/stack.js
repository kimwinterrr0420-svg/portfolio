import { layerLib, themeMap, sideTagColorMap } from './data.js';

const BADGE_BG = {
  deep:   'background:linear-gradient(135deg,#3b6bf0,#1e3a8a)',
  blue:   'background:linear-gradient(135deg,#5b86fa,#2a52d4)',
  purple: 'background:linear-gradient(135deg,#a78bfa,#7c3aed)'
};

function nodesHtml(layer) {
  const badge = BADGE_BG[layer.theme] || BADGE_BG.blue;
  return `<div class="node-grid">
    ${layer.nodes.map((n, i) => `<button class="node-card" data-node="${layer.id}::${i}">
      <span class="node-badge" style="${badge}"><i class="${n.icon}"></i></span>
      <span class="min-w-0 flex-1">
        <span class="node-name block font-bold text-slate-800 leading-snug">${n.name}</span>
        <span class="node-desc block text-slate-500 mt-1 leading-relaxed">${n.detail}</span>
      </span>
    </button>`).join('')}
  </div>`;
}

function metricsHtml(layer) {
  const isDeep = layer.theme === 'deep';
  const color = isDeep ? 'color:rgba(255,255,255,.92)' : 'color:#475569';
  const line = isDeep ? 'rgba(255,255,255,.24)' : 'rgba(59,107,240,.2)';
  return `<div class="metric-bar" style="border-top:1px solid ${line}">
    ${layer.metrics.map((m, i) => `<div class="metric-cell" style="${color};${i ? `border-left:1px solid ${line}` : ''}">
      <i class="${m.icon} text-sm opacity-80"></i><span>${m.label}</span></div>`).join('')}
  </div>`;
}

function layerHtml(layer, i, total) {
  const t = themeMap[layer.theme];
  const isDeep = layer.theme === 'deep';
  const titleColor = isDeep ? '#ffffff' : t.text;
  const subColor = isDeep ? 'rgba(255,255,255,.85)' : 'rgba(31,52,107,.65)';

  return `<div class="layer-row rise" data-layer="${layer.id}" style="animation-delay:${(total - 1 - i) * 0.14}s">
    <div class="disc disc-${layer.theme}">
      <span class="side-tag" style="${sideTagColorMap[layer.sideTagColor]}">${layer.sideTag}</span>
      <div class="layer-head">
        <div class="layer-badge inline-flex items-center gap-2 px-3 py-0.5 rounded-full mb-1.5"
             style="background:${isDeep ? 'rgba(255,255,255,.18)' : t.soft};color:${isDeep ? '#dbeafe' : t.accent}">
          <span class="text-[11px] font-extrabold tracking-widest">第 ${layer.level} 层</span>
        </div>
        <h3 class="font-extrabold leading-tight" style="color:${titleColor};font-size:var(--title-fs)">${layer.title}</h3>
        <p class="mt-1 font-medium" style="color:${subColor};font-size:var(--sub-fs)">${layer.subtitle}</p>
      </div>
      ${nodesHtml(layer)}
      ${metricsHtml(layer)}
    </div>
  </div>`;
}

function linkHtml(text) {
  return `<div class="layer-link">
    <i class="ri-arrow-up-double-line text-xl"></i><span>${text}</span><i class="ri-arrow-up-double-line text-xl"></i>
  </div>`;
}

// 自下而上渲染：底座在最下方，故倒序输出
export function renderStack(container, solution) {
  const ids = [...solution.layers];
  const ordered = ids.map(id => layerLib[id]).filter(Boolean).sort((a, b) => b.level - a.level);
  let html = '';
  ordered.forEach((l, i) => {
    html += layerHtml(l, i, ordered.length);
    if (i < ordered.length - 1) {
      const lower = ordered[i + 1];
      html += linkHtml(`${lower.title}支撑${l.title}`);
    }
  });
  container.innerHTML = html;
}

export function focusLayer(container, layerId) {
  container.querySelectorAll('.layer-row').forEach(row => {
    const match = row.dataset.layer === layerId;
    row.classList.toggle('is-focus', match);
    row.classList.toggle('is-dimmed', layerId ? !match : false);
  });
}

/**
 * 一屏自适应：测量真实高度，逐级降级直到塞进可用高度。
 * 降级顺序：紧凑变量 → 隐去描述与指标条 → 等比缩放兜底。
 * @param {HTMLElement} container .stack-scene
 * @param {boolean} enabled 是否启用一屏模式
 */
export function fitToViewport(container, enabled) {
  if (!container) return;

  // 复位，避免上一次的缩放影响本次测量
  container.classList.remove('is-compact', 'is-lean');
  container.style.transform = '';
  container.style.marginBottom = '';
  container.style.transformOrigin = 'top center';

  if (!enabled || window.innerWidth < 1024) return;

  const avail = getAvailableHeight(container);
  if (avail <= 0) return;

  // 第一级：启用紧凑变量
  container.classList.add('is-compact');
  if (container.scrollHeight <= avail) return;

  // 第二级：隐去节点描述、指标条与层徽章
  container.classList.add('is-lean');
  if (container.scrollHeight <= avail) return;

  // 第三级：等比缩放兜底，用负 margin 回收缩放后多余的占位空白
  const raw = container.scrollHeight;
  const scale = Math.max(0.62, avail / raw);
  container.style.transform = `scale(${scale})`;
  container.style.marginBottom = `${-raw * (1 - scale)}px`;
}

// 可用高度 = 视口底部 - 容器在视口中的顶部位置 - 底部安全留白
function getAvailableHeight(container) {
  const top = container.getBoundingClientRect().top;
  const safeBottom = 28;
  return window.innerHeight - top - safeBottom;
}
