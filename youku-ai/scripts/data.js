// ==================================================================
// 数据源：严格遵循思维导图逻辑 —— 痛点 → 解法
// 结构：painDomains（痛点域） → solutions（三大AI产品解法） → 分层架构
// ==================================================================

/* ---------------- 一、痛点侧 ---------------- */
export const painDomains = [
  {
    id: 'pain-user',
    name: '用户层痛点',
    icon: 'ri-user-search-line',
    essence: '用户找不到、也留不住',
    items: [
      {
        name: '搜索体系停留在「关键词时代」',
        detail: '用户内容获取链路过长，不支持场景化、剧情化、情绪化检索。',
        fix: 'AI 搜索问答：自然语言直接提问，答案直达并标注哪部剧、哪一集、第几分钟，点击即跳转播放位置，把链路从「搜关键词→翻列表→逐集找」压缩为一步。',
        fixSol: 'sol-search',
        fixNode: 'AI 搜索问答'
      },
      {
        name: '内容消费形态单一',
        detail: '产品核心交付是完整长视频，留存高度依赖新剧供给，产品本身无留存抓手。',
        fix: 'AI 陪看与角色分身：把观看变成可提问、可跳看点、可对话的探索过程，再用角色动态圈让粉丝每天都有事可做，留存不再只靠新剧。',
        fixSol: 'sol-interact',
        fixNode: 'AI 陪看与角色分身'
      },
      {
        name: '个性化推荐场景固化',
        detail: '千人千面能力弱，长尾内容长期没有曝光机会。',
        fix: 'AI 内容理解底座：四维结构化（剧情/人物/看点/标签）替代粗粒度人工标签，语义理解让长尾内容被对的用户搜到，同时沉淀用户意图数据反哺推荐。',
        fixSol: 'sol-search',
        fixNode: 'AI 内容理解底座'
      }
    ],
    solvedBy: ['sol-search', 'sol-interact']
  },
  {
    id: 'pain-content',
    name: '内容生态痛点',
    icon: 'ri-scissors-cut-line',
    essence: '只有官方生产，没有再生产也没有社区',
    items: [
      {
        name: '平台只有「官方内容生产」',
        detail: '内容供给完全依赖官方采购与自制，成本高、节奏受限。',
        fix: 'WorkRally 工业级平台 + IP 热度预测：按项目分账支撑 AI 剧集规模化制作，并用 AI 预告片先做用户测试再决定是否投 S 级真人，把爆款风险前置到投资决策前。',
        fixSol: 'sol-gen',
        fixNode: '专业生产与决策前置'
      },
      {
        name: '用户想二创却无路可走',
        detail: '无官方工具、无正版素材、侵权风险极高，创作欲被彻底浪费。',
        fix: '分层创作工具 + 正版素材授权：轻创作一键角色 cut，深度创作支持混剪与 AI 番外，素材全部来自官方库，从源头消除侵权风险，用户再生产变成平台供给。',
        fixSol: 'sol-gen',
        fixNode: '分层创作工具'
      },
      {
        name: '缺少社区生态',
        detail: '用户看完就走，没有沉淀讨论与关系的场域：二创无处分发、低热度内容没有观看氛围、粉丝之间也缺少日常互动的载体，内容热度完全依赖官方运营硬推。',
        fix: 'AI 陪看与角色分身：用 AI 弹幕机器人为冷启动与低热度内容补足观看氛围，用角色动态圈让角色每天发布动态、粉丝每天有事可做，再让二创作品在社区内被分发和互动，把「一次性观看」沉淀成可持续运营的社区关系。',
        fixSol: 'sol-interact',
        fixNode: 'AI 陪看与角色分身'
      }
    ],
    solvedBy: ['sol-gen', 'sol-interact']
  },
  {
    id: 'pain-biz',
    name: '商业化痛点',
    icon: 'ri-line-chart-line',
    essence: '会员、广告、粉丝经济三线同时承压',
    items: [
      {
        name: '会员收入增长停滞、结构失衡',
        detail: '本质是让用户觉得「付费不值」：付费动机高度依赖爆剧驱动，权益缩水引发信任危机，付费结构单一缺乏增值选项。',
        fix: 'AI 成为会员权益本身（三大产品共同贡献）：搜索沉淀观看画像、互动沉淀角色关系、生成沉淀创作资产，三者叠加让权益「用得越久价值越大」，退订即损失；基础会员之上叠加 AI 增值档位补足结构单一；权益从「被缩水的资源」变成「持续增加的功能」，重建付费信任。',
        fixSol: 'sol-interact',
        fixNode: '__member__'
      },
      {
        name: '广告总量见顶、形式老化',
        detail: '贴片是核心形式、用户体验差转化低，广告位基本饱和，效果广告能力弱——只能讲品牌曝光量，讲不出 ROI。',
        fix: 'AI 搜索承接消费意图：用户主动提问时给出带来源的答案，天然是高意图流量入口，广告从打断式贴片转为意图承接，转化可归因，能讲 ROI 而不只是曝光量。',
        fixSol: 'sol-search',
        fixNode: 'AI 搜索问答'
      },
      {
        name: '粉丝经济浅层化变现',
        detail: '打投式粉丝经济依赖短期事件，缺少日常化、体系化的粉丝经济产品。',
        fix: '粉丝关系与社区运营：角色每天发布动态、可持续深度对话，粉丝每天都有事可做；再叠加二创社区分发与 IP 衍生品消费，把依赖打投事件的短期变现，变成日常可参与、可付费的生态。',
        fixSol: 'sol-interact',
        fixNode: '粉丝关系与社区运营'
      }
    ],
    solvedBy: ['sol-interact', 'sol-search']
  }
];

/* ---------------- 二、解法侧：三大 AI 产品 ---------------- */
export const solutions = [
  {
    id: 'sol-search',
    name: 'AI 搜索',
    side: '消费侧',
    icon: 'ri-search-eye-line',
    theme: 'blue',
    claim: '让用户「搜问题」而不是「搜剧名」',
    solves: '直击「搜索关键词化 / 推荐固化 / 长尾无曝光 / 广告形式老化」，并把搜索能力下沉到播放页承接消费意图',
    layers: ['layer-base', 'layer-qa', 'layer-play']
  },
  {
    id: 'sol-interact',
    name: 'AI 互动',
    side: '消费侧',
    icon: 'ri-robot-2-line',
    theme: 'purple',
    claim: '让观看从「被动消费」变成「主动探索」',
    solves: '直击「看完即走无留存 / 缺少社区生态 / 粉丝经济浅层化」，并与另两个产品共同支撑「AI 成为会员权益本身」',
    layers: ['layer-base', 'layer-companion', 'layer-relation']
  },
  {
    id: 'sol-gen',
    name: 'AI 视频生成',
    side: '生产侧',
    icon: 'ri-magic-line',
    theme: 'green',
    claim: '把用户的创作欲变成平台的内容供给',
    solves: '直击「无用户再生产 / 二创侵权风险 / 官方生产成本高节奏受限」',
    layers: ['layer-base', 'layer-tool', 'layer-industry']
  }
];

/* ---------------- 三、分层架构（各解法共享底座） ---------------- */
export const layerLib = {
  'layer-base': {
    id: 'layer-base',
    level: 1,
    theme: 'deep',
    title: 'AI 内容理解底座',
    subtitle: '把影视内容从「视频文件」变成「可计算的知识」',
    sideTag: '资源类供给',
    sideTagColor: 'deep',
    why: '现在的内容理解主要靠人工打标签，效率低、维度粗。底座把内容结构化，是所有 AI 应用的基础——没有这个底座，上面的应用都是空中楼阁。',
    nodes: [
      { name: '剧情结构化', icon: 'ri-git-commit-line', detail: '每集的剧情摘要、关键事件、转折点、结局，形成可检索的剧情时间轴。' },
      { name: '人物关系图谱', icon: 'ri-organization-chart', detail: '主要人物、人物关系、人物弧光，支撑「这个角色是谁」类问题。' },
      { name: '看点提取', icon: 'ri-fire-line', detail: '每集的高光时刻、名场面、情感爆点，支撑看点导航与一键成片。' },
      { name: '内容标签', icon: 'ri-price-tag-3-line', detail: '题材、风格、情绪、受众、价值观标签，替代粗粒度人工标签。' }
    ],
    metrics: [
      { label: '结构化覆盖率', icon: 'ri-database-2-line' },
      { label: '标签维度数', icon: 'ri-price-tag-3-line' },
      { label: '标注人力成本', icon: 'ri-time-line' },
      { label: '长尾可检索率', icon: 'ri-search-2-line' }
    ]
  },

  /* —— AI 搜索的上两层 —— */
  'layer-qa': {
    id: 'layer-qa',
    level: 2,
    theme: 'blue',
    title: 'AI 搜索问答',
    subtitle: '让用户「搜问题」而不是「搜剧名」',
    sideTag: '供给变消费',
    sideTagColor: 'green',
    why: '传统搜索是「关键词→剧集列表」，解决不了问题式需求，因为它不理解内容。有了底座，就能用自然语言直接给出答案并标注来源。',
    nodes: [
      { name: '自然语言提问', icon: 'ri-chat-3-line', detail: '「类似《隐秘的角落》的悬疑剧有哪些」「有没有主角智商在线的剧」。' },
      { name: '答案直达并标注来源', icon: 'ri-focus-3-line', detail: '标注哪部剧、哪一集、第几分钟，用户点击直接跳转播放位置。' },
      { name: '激活长尾内容', icon: 'ri-seedling-line', detail: '很多剧因标签粗、匹配不到而永无曝光，语义理解让它被对的用户搜到。' },
      { name: '沉淀用户意图数据', icon: 'ri-lightbulb-line', detail: '用户问什么本身就是最有价值的需求洞察，可反哺内容采购与运营策略。' }
    ],
    metrics: [
      { label: '搜索转化率', icon: 'ri-exchange-line' },
      { label: '长尾曝光量', icon: 'ri-seedling-line' },
      { label: '零结果率', icon: 'ri-search-eye-line' },
      { label: '意图数据量', icon: 'ri-lightbulb-line' }
    ]
  },
  'layer-play': {
    id: 'layer-play',
    level: 3,
    theme: 'purple',
    title: '播放页搜索与消费承接',
    subtitle: '把搜索能力下沉到观看现场，并承接消费意图',
    sideTag: '消费变关系',
    sideTagColor: 'purple',
    why: '搜索不只发生在首页搜索框。用户边看边产生的疑问，是最高频也最高意图的搜索场景——在这里答疑能提升完播，在这里承接消费能讲清 ROI。角色对话属于关系运营，归在 AI 互动产品。',
    nodes: [
      { name: 'AI 剧情问答', icon: 'ri-question-answer-line', detail: '看到一半看不懂人物关系，直接问「这个角色是谁」「之前发生了什么」。' },
      { name: 'AI 看点导航', icon: 'ri-flashlight-line', detail: '每集高光时刻与名场面被 AI 标记，用户可直接跳转到看点位置。' },
      { name: '防剧透边界控制', icon: 'ri-eye-off-line', detail: '答案严格限定在用户当前观看进度之内，只解释前情不透露后续，让边看边问变成安全的行为。' },
      { name: '搜索意图消费承接', icon: 'ri-shopping-bag-3-line', detail: '用户问到剧中同款、取景地、原著小说时，答案下方直接给出可购买或可跳转的承接卡片，把高意图提问变成可归因的转化。' }
    ],
    metrics: [
      { label: '完播率', icon: 'ri-play-circle-line' },
      { label: '弃剧率', icon: 'ri-logout-box-r-line' },
      { label: '播放页提问率', icon: 'ri-question-answer-line' },
      { label: '意图转化归因', icon: 'ri-exchange-line' }
    ]
  },

  /* —— AI 互动的上两层 —— */
  'layer-companion': {
    id: 'layer-companion',
    level: 2,
    theme: 'blue',
    title: 'AI 陪看与角色分身',
    subtitle: '解决「看完即走」的留存难题',
    sideTag: '供给变消费',
    sideTagColor: 'green',
    why: '留存不能只依赖新剧供给。把角色做成可对话的分身、把观看做成有人陪伴的过程，产品自身才有留存抓手。',
    nodes: [
      { name: 'AI 角色分身', icon: 'ri-user-star-line', detail: '基于人物关系图谱与人物弧光，让角色以一致的人格与用户持续对话。' },
      { name: 'AI 陪看助手', icon: 'ri-user-voice-line', detail: '边看边解说、随时答疑，或许可以和教育类内容打通。' },
      { name: 'AI 弹幕机器人', icon: 'ri-message-3-line', detail: '在冷启动或低热度内容里补足氛围，让长尾内容也有观看气氛。' },
      { name: '角色动态圈', icon: 'ri-heart-pulse-line', detail: '参考乙游形态，角色每天发布动态，粉丝每天都有事情可做。' }
    ],
    metrics: [
      { label: '次日留存', icon: 'ri-calendar-check-line' },
      { label: '日均互动次数', icon: 'ri-cursor-line' },
      { label: '非追剧期活跃', icon: 'ri-pulse-line' },
      { label: '付费转化', icon: 'ri-vip-crown-2-line' }
    ]
  },
  'layer-relation': {
    id: 'layer-relation',
    level: 3,
    theme: 'purple',
    title: '粉丝关系与社区运营',
    subtitle: '从「陪看一部剧」到「留在一个社区」',
    sideTag: '消费变关系',
    sideTagColor: 'purple',
    why: '陪看解决的是单次观看体验，但关系才是留存的载体。角色对话、动态圈、二创分发共同把一次性观看沉淀为可持续运营的粉丝关系，这是陪看能力的自然向上延伸。',
    nodes: [
      { name: 'AI 角色深度对话', icon: 'ri-robot-2-line', detail: '与剧中角色持续对话，角色记得聊过什么、记得你追到第几集，形成专属关系（需做好版权与内容安全）。' },
      { name: '角色动态圈日常运营', icon: 'ri-heart-pulse-line', detail: '角色每天发布动态、回应评论，粉丝每天都有事可做，把追剧期热度延展到非追剧期。' },
      { name: '二创社区分发', icon: 'ri-share-forward-line', detail: '用户在 AI 视频生成侧产出的二创作品，在这里被分发、点赞、二次讨论，形成创作—消费的社区回路。' },
      { name: '粉丝日常消费', icon: 'ri-shopping-bag-3-line', detail: '角色周边、IP 衍生品、票务与取景地旅游常态化上架，把打投式短期变现变成日常可参与的粉丝经济。' }
    ],
    metrics: [
      { label: '非追剧期活跃', icon: 'ri-pulse-line' },
      { label: '社区互动量', icon: 'ri-chat-smile-2-line' },
      { label: '粉丝经济 GMV', icon: 'ri-shopping-bag-3-line' },
      { label: '角色对话留存', icon: 'ri-links-line' }
    ]
  },

  /* —— AI 视频生成的上两层 —— */
  'layer-tool': {
    id: 'layer-tool',
    level: 2,
    theme: 'blue',
    title: '分层创作工具',
    subtitle: '用正版素材把创作欲变成内容供给',
    sideTag: '供给变消费',
    sideTagColor: 'green',
    why: '用户想二创但无工具、无正版素材、侵权风险高。官方工具同时解决供给不足与版权风险两个问题。',
    nodes: [
      { name: '轻创作：一键角色 cut', icon: 'ri-scissors-2-line', detail: '面向追剧型用户：一键生成角色cut、智能高光剪辑、台词导出。' },
      { name: '深度创作：混剪与番外', icon: 'ri-film-line', detail: '面向有剪辑基础的创作者：AI 番外/续集生成器、多剧混剪助手、AI 解说模板。' },
      { name: '正版素材授权', icon: 'ri-shield-star-line', detail: '素材来自官方库，从源头消除侵权风险，二创可安全分发。' }
    ],
    metrics: [
      { label: '二创产量', icon: 'ri-film-line' },
      { label: '创作者数', icon: 'ri-group-line' },
      { label: '侵权投诉量', icon: 'ri-shield-check-line' },
      { label: '内容供给成本', icon: 'ri-money-cny-circle-line' }
    ]
  },
  'layer-industry': {
    id: 'layer-industry',
    level: 3,
    theme: 'purple',
    title: '专业生产与决策前置',
    subtitle: '工业级平台 + 按项目分账，直接创收',
    sideTag: '消费变关系',
    sideTagColor: 'purple',
    why: '往上走到工业级生产，并用 AI 把「爆款不确定」的风险前置到投资决策之前。',
    nodes: [
      { name: 'WorkRally 工业级平台', icon: 'ri-building-4-line', detail: '按项目分账的专业生产平台，支撑 AI 剧集的规模化制作。' },
      { name: 'IP 热度预测工具', icon: 'ri-bar-chart-box-line', detail: '头部网文用 AI 快速生成预告片/预告漫剧做用户测试，根据反馈决定是否投入 S 级真人制作，大幅降低「爆款不确定性」风险。' },
      { name: 'AI 衍生内容量产', icon: 'ri-film-line', detail: '同一 IP 用 AI 低成本量产衍生形态：番外短剧、漫剧、多语种配音与本地化版本，让一次采购的版权持续产出新内容，摊薄内容成本。' }
    ],
    metrics: [
      { label: '内容 ROI', icon: 'ri-line-chart-line' },
      { label: '爆款命中率', icon: 'ri-focus-2-line' },
      { label: '衍生品 GMV', icon: 'ri-shopping-bag-3-line' },
      { label: '分账收入', icon: 'ri-money-cny-circle-line' }
    ]
  }
};

export const themeMap = {
  deep:   { text: '#ffffff', accent: '#dbeafe', soft: 'rgba(255,255,255,.16)' },
  blue:   { text: '#1d4ed8', accent: '#2a52d4', soft: 'rgba(59,107,240,.12)' },
  purple: { text: '#6d28d9', accent: '#7c3aed', soft: 'rgba(124,58,237,.12)' },
  green:  { text: '#047857', accent: '#059669', soft: 'rgba(5,150,105,.12)' }
};

export const sideTagColorMap = {
  deep:   'background:linear-gradient(135deg,#1e3a8a,#2a52d4);color:#fff',
  green:  'background:linear-gradient(135deg,#059669,#10b981);color:#fff',
  purple: 'background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff'
};

/* ---------------- 六、AI 成为会员权益本身（三产品通用收益） ---------------- */
export const memberBenefit = {
  title: 'AI 成为会员权益本身',
  claim: '续费理由从「为了某部剧」变成「为了 AI 这个功能」',
  why: '这不是某一个产品的功能，而是三大 AI 产品叠加后共同产生的结果。会员痛点的本质是「付费不值」，而 AI 是「用得越久、价值越大」的权益——三个产品分别贡献不同的沉淀，合起来才构成退订即损失的壁垒。',
  contributions: [
    { sol: 'sol-search', name: 'AI 搜索', icon: 'ri-search-eye-line', give: '搜索历史与观看画像越用越准，换平台就要重新训练一遍', tier: '高级会员享无限次深度问答与全库检索' },
    { sol: 'sol-interact', name: 'AI 互动', icon: 'ri-robot-2-line', give: '角色对话记忆与粉丝关系持续积累，退订即丢失专属关系', tier: '高级会员享角色深度对话与动态圈优先互动' },
    { sol: 'sol-gen', name: 'AI 视频生成', icon: 'ri-magic-line', give: '创作素材库、作品与粉丝沉淀在平台，创作者迁移成本高', tier: '高级会员享高阶创作工具与正版素材额度' }
  ],
  pillars: [
    { title: '用得越久价值越大', icon: 'ri-stack-line', desc: '三个产品的记忆与沉淀叠加，形成天然留存壁垒，退订即损失。' },
    { title: '分层增值付费', icon: 'ri-layout-grid-line', desc: '补足「付费结构单一」：基础会员之上叠加 AI 权益增值档位。' },
    { title: '重建付费信任', icon: 'ri-shield-check-line', desc: '权益是持续增加的功能而非被缩水的资源，扭转信任危机。' }
  ],
  metrics: ['续费率', 'ARPU', '非爆剧期付费', '权益满意度']
};

/* ---------------- 七、AI 搜索问答演示 ---------------- */
export const demoCases = [
  {
    q: '类似《隐秘的角落》的悬疑剧有哪些',
    type: '推荐类',
    sol: 'sol-search',
    answer: '为你找到 3 部高相似度悬疑剧，按相似维度分类：',
    results: [
      { title: '《漫长的季节》', reason: '同为悬疑 + 生活质感，东北小镇叙事', sim: 92 },
      { title: '《沉默的真相》', reason: '同一 IP 宇宙（紫金陈原著），多线叙事', sim: 89 },
      { title: '《八角亭谜雾》', reason: '家庭伦理裹挟悬疑，压抑氛围接近', sim: 81 }
    ],
    bases: ['内容标签', '剧情结构化']
  },
  {
    q: '《甄嬛传》甄嬛回宫是哪一集',
    type: '定位类',
    sol: 'sol-search',
    answer: '第 55 集，第 12 分钟。甄嬛以「钮祜禄氏」身份重返紫禁城。',
    results: [{ title: '第 55 集 · 12:00', reason: '关键转折点：甄嬛回宫', sim: 100, jump: true }],
    bases: ['剧情结构化', '看点提取']
  },
  {
    q: '这部剧烂尾了吗',
    type: '口碑类',
    sol: 'sol-search',
    answer: '综合结局段落的剧情结构与观众情感反馈：结局收束完整度中等，后 3 集节奏偏快，主线闭合但支线留白较多。',
    results: [
      { title: '结局完整度', reason: '主线闭合，支线留白 2 条', sim: 72 },
      { title: '观众情感倾向', reason: '正向 61% / 负向 39%，争议集中在最后 2 集', sim: 61 }
    ],
    bases: ['剧情结构化', '内容标签']
  },
  {
    q: '有没有主角智商在线的剧',
    type: '模糊描述类',
    sol: 'sol-search',
    answer: '「智商在线」被解析为人设标签，匹配到 3 部作品：',
    results: [
      { title: '《显微镜下的大明》', reason: '主角以算学破局，逻辑链完整', sim: 88 },
      { title: '《繁城之下》', reason: '推理严密，无降智情节', sim: 86 },
      { title: '《琅琊榜》', reason: '权谋博弈，主角全程掌控节奏', sim: 84 }
    ],
    bases: ['内容标签', '人物关系图谱']
  },
  {
    q: '这个角色是谁，之前发生了什么',
    type: '播放页问答',
    sol: 'sol-search',
    answer: '当前出场角色：谢玉（大梁一等军侯）。他与主角的关系及前情如下：',
    results: [
      { title: '人物关系', reason: '与林殊为世仇，赤焰案主谋之一', sim: 100 },
      { title: '前情提要', reason: '第 12 集设局诬陷，导致赤焰军覆灭', sim: 100, jump: true }
    ],
    bases: ['人物关系图谱', '剧情结构化']
  },
  {
    q: '我想和剧里的角色聊聊刚才那段剧情',
    type: '角色对话',
    sol: 'sol-interact',
    answer: '梅长苏（AI 分身）：你说的是我在琅琊阁那段吧？我记得你追到第 18 集了，所以后面的事我先不提。',
    results: [
      { title: '人格一致性', reason: '基于人物弧光生成语气与立场，不出戏', sim: 94 },
      { title: '进度感知', reason: '记得用户追到第 18 集，自动规避后续剧透', sim: 100 },
      { title: '对话记忆', reason: '延续上次聊过的话题，关系可累积', sim: 91 }
    ],
    bases: ['人物关系图谱', '剧情结构化']
  },
  {
    q: '今天角色动态圈有什么新内容',
    type: '关系运营',
    sol: 'sol-interact',
    answer: '为你聚合了 3 条今日动态，非追剧期也有可参与的内容：',
    results: [
      { title: '角色日常动态', reason: '梅长苏发布了一条秋日随笔，已有 1.2 万粉丝互动', sim: 100 },
      { title: '二创作品推荐', reason: '社区热门混剪《赤焰旧事》，来自用户创作', sim: 88 },
      { title: '粉丝消费入口', reason: '同款周边与取景地路线常态上架', sim: 85 }
    ],
    bases: ['人物关系图谱', '内容标签']
  },
  {
    q: '把这部剧的角色高光片段剪成一条视频',
    type: '轻创作',
    sol: 'sol-gen',
    answer: '已基于看点提取自动生成角色 cut，全部素材来自官方正版库：',
    results: [
      { title: '自动选段', reason: '从 42 集中筛出该角色 8 个高光片段', sim: 96 },
      { title: '成片时长', reason: '一键生成 90 秒竖版成片，可直接分发', sim: 100, jump: true },
      { title: '版权状态', reason: '正版素材授权，侵权风险为零', sim: 100 }
    ],
    bases: ['看点提取', '剧情结构化']
  },
  {
    q: '这个网文 IP 值得投 S 级真人剧吗',
    type: '决策前置',
    sol: 'sol-gen',
    answer: '已用 AI 生成预告片做小流量用户测试，结论如下：',
    results: [
      { title: '用户测试反馈', reason: '完播率高于同题材基准 23%，女性向受众集中', sim: 89 },
      { title: '建议决策', reason: '建议先投漫剧验证，再决定 S 级真人投入', sim: 84 },
      { title: '风险前置价值', reason: '把爆款不确定性挪到投资决策之前', sim: 100 }
    ],
    bases: ['内容标签', '剧情结构化']
  }
];

/* ---------------- 八、分产品效果验证指标 ---------------- */
export const proofBySolution = [
  {
    sol: 'sol-search',
    name: 'AI 搜索',
    icon: 'ri-search-eye-line',
    verify: '看用户是否真的用「问问题」替代了「翻列表」，以及长尾内容是否被激活。',
    metrics: [
      { label: '搜索转化率', before: '关键词搜索后仍需翻列表，转化链路长', after: '答案直达播放点，一步完成' },
      { label: '零结果率', before: '模糊描述类提问基本无结果', after: '语义理解兜底，零结果显著下降' },
      { label: '长尾曝光量', before: '标签粗，长尾永无曝光机会', after: '被对的用户主动搜到' },
      { label: '广告可归因转化', before: '只能讲品牌曝光量', after: '意图承接可归因，能讲 ROI' }
    ]
  },
  {
    sol: 'sol-interact',
    name: 'AI 互动',
    icon: 'ri-robot-2-line',
    verify: '看留存是否摆脱对新剧供给的依赖，非追剧期还有没有人活跃。',
    metrics: [
      { label: '次日留存', before: '剧集更新驱动，无更新即掉量', after: '角色关系与动态圈驱动日常回访' },
      { label: '非追剧期活跃', before: '剧完即走，空窗期近乎归零', after: '动态圈与社区维持基础活跃' },
      { label: '社区互动量', before: '看完即走，二创无处分发', after: 'AI 弹幕补氛围 + 二创社区分发' },
      { label: '粉丝经济 GMV', before: '依赖打投式短期事件', after: '日常可参与、可付费的生态' }
    ]
  },
  {
    sol: 'sol-gen',
    name: 'AI 视频生成',
    icon: 'ri-magic-line',
    verify: '看用户再生产是否真的成为供给，以及官方内容成本与爆款风险是否下降。',
    metrics: [
      { label: '二创产量', before: '无工具无素材，创作欲被浪费', after: '分层工具让创作欲变成平台供给' },
      { label: '侵权投诉量', before: '素材来源不明，侵权风险高', after: '正版素材授权，源头消除风险' },
      { label: '内容供给成本', before: '完全依赖官方采购与自制', after: 'AI 衍生量产摊薄单位成本' },
      { label: '爆款命中率', before: '靠经验赌 S 级投入', after: 'AI 预告片测试，决策前置' }
    ]
  }
];

/* ---------------- 五、现状 vs AI 化对比 ---------------- */
export const compareRows = [
  { dim: '内容理解', before: '人工打标签，效率低、维度粗', after: 'AI 深度理解，剧情/人物/看点/标签四维结构化' },
  { dim: '搜索方式', before: '输入关键词 → 返回剧集列表', after: '自然语言提问 → 直接给出带来源的答案' },
  { dim: '长尾内容', before: '标签粗、匹配不到，永远没有曝光', after: '语义理解让长尾被对的用户搜到' },
  { dim: '观看过程', before: '被动消费，看完即走', after: '主动探索：可提问、可跳看点、可对话角色' },
  { dim: '内容供给', before: '只有官方生产，用户创作欲被浪费', after: '官方工具 + 正版素材，用户再生产成为供给' },
  { dim: '社区生态', before: '看完即走，二创无处分发，低热度内容没氛围', after: 'AI 弹幕补氛围 + 角色动态圈 + 二创社区分发' },
  { dim: '会员价值', before: '为了某部剧付费，剧完即走', after: '为了 AI 功能付费，用得越久价值越大' },
  { dim: '广告形态', before: '贴片打断体验，只能讲品牌曝光', after: '搜索意图承接，转化可归因' },
  { dim: '内容决策', before: '靠经验赌爆款，S 级投入风险高', after: 'AI 预告片做用户测试，决策前置' },
  { dim: '产品关系', before: '搜索、播放、运营各自独立，互不供养', after: '搜索引流→互动留存→生成造供给，三产品互为上下游' },
  { dim: '生态协同', before: '仅优酷站内闭环，消费只有会员和广告', after: '打通淘宝、支付宝、飞猪、大麦、阿里云的阿里生态闭环' }
];

/* ---------------- 九、闭环一：三大产品内循环 ---------------- */
export const productLoop = [
  {
    step: 1,
    from: 'AI 搜索',
    to: 'AI 互动',
    icon: 'ri-search-eye-line',
    title: '搜索把人带到内容里',
    desc: 'AI 搜索用自然语言把用户直接送到具体剧集与具体分钟，并沉淀「用户在关心什么」的意图数据，交给互动侧决定该陪看什么、该运营哪个角色。',
    hand: '交付物：精准到达的用户 + 意图数据'
  },
  {
    step: 2,
    from: 'AI 互动',
    to: 'AI 视频生成',
    icon: 'ri-robot-2-line',
    title: '互动把人留成关系',
    desc: '陪看与角色分身把一次性观看变成持续关系，角色动态圈养出高粘性粉丝——而高粘性粉丝正是最有创作欲的那批人，他们会想为角色产出内容。',
    hand: '交付物：有创作欲的高粘性粉丝'
  },
  {
    step: 3,
    from: 'AI 视频生成',
    to: 'AI 搜索',
    icon: 'ri-magic-line',
    title: '生成把关系变成新供给',
    desc: '粉丝用官方工具产出二创与衍生内容，这些内容重新进入内容库被结构化，成为 AI 搜索可检索、可推荐的新增供给，让下一轮循环有更多内容可分发。',
    hand: '交付物：可被检索的新增内容供给'
  }
];

export const productLoopCore = {
  title: 'AI 内容理解底座',
  desc: '三个产品共用同一个底座：搜索靠它给答案，互动靠它做人格与陪看，生成靠它选素材。底座是闭环能转起来的前提，也是三个产品复用同一份投入的原因。'
};

/* ---------------- 十、闭环二：阿里生态外循环 ---------------- */
export const ecoLoop = {
  platform: '优酷',
  intro: '优酷本身在阿里体系内，通路之外真正的差异化在于把阿里的电商、支付、本地生活与云能力接进内容消费链路——这是纯内容平台无法复制的闭环。',
  nodes: [
    {
      name: '淘宝天猫',
      icon: 'ri-shopping-cart-2-line',
      asset: '电商交易与供应链',
      link: 'AI 搜索识别到「剧中同款」意图时直接跳转淘宝商品，二创与角色周边可开设官方旗舰店，把内容种草在站内闭环成交易，转化全程可归因。',
      value: '内容种草 → 站内成交'
    },
    {
      name: '支付宝',
      icon: 'ri-wallet-3-line',
      asset: '支付与会员账户体系',
      link: '会员付费与 AI 增值档位打通支付宝免密续费与花呗分期，降低付费门槛；88VIP 体系天然承载「AI 权益」作为跨端增值卖点。',
      value: '降低付费门槛 + 跨端权益'
    },
    {
      name: '飞猪 · 高德',
      icon: 'ri-map-pin-line',
      asset: '本地生活与出行',
      link: '取景地旅游、剧集主题线路、演唱会与展会票务由飞猪高德承接，AI 搜索回答「这部剧在哪拍的」时直接给出可预订的行程卡片。',
      value: '内容 IP → 线下消费'
    },
    {
      name: '阿里云 · 通义',
      icon: 'ri-cloud-line',
      asset: '算力与大模型底座',
      link: '内容理解底座、角色分身与视频生成直接复用通义系模型与阿里云算力，边际成本更低，也让 AI 视频生成能力具备对外输出的可能。',
      value: '降低 AI 边际成本'
    },
    {
      name: '大麦 · 阿里鱼',
      icon: 'ri-ticket-2-line',
      asset: '票务与 IP 授权',
      link: '大麦承接 IP 线下演出与粉丝活动，阿里鱼负责 IP 衍生品授权与开发，把角色动态圈里的粉丝热度导向可售卖的实体与体验。',
      value: '粉丝热度 → IP 变现'
    },
    {
      name: '夸克 · UC',
      icon: 'ri-compass-3-line',
      asset: '站外搜索入口',
      link: '夸克与 UC 是天然的搜索流量入口，用户在站外搜剧情问题时可由优酷 AI 搜索答案承接并直接跳转播放，把站外搜索需求引流回站内。',
      value: '站外搜索 → 站内播放'
    }
  ],
  compare: [
    { dim: '内容源头', before: '仅靠采购与自制版权', after: '阿里鱼 IP 授权 + AI 衍生量产扩充供给' },
    { dim: '消费承接', before: '站内只有会员与广告两条路', after: '淘宝、飞猪、大麦承接多形态消费' },
    { dim: '付费转化', before: '独立支付链路，门槛高', after: '支付宝免密与 88VIP 体系降低门槛' },
    { dim: 'AI 成本', before: '自建算力与模型，投入重', after: '复用阿里云与通义，边际成本可控' },
    { dim: '流量入口', before: '依赖站内与外部投放', after: '夸克 UC 搜索入口直接承接引流' }
  ]
};

export const loopAssets = [
  { title: '优酷独家影视 IP', icon: 'ri-film-line', desc: '内容源头，闭环的起点' },
  { title: '阿里电商与支付', icon: 'ri-shopping-cart-2-line', desc: '消费与付费的承接能力' },
  { title: '阿里云与通义模型', icon: 'ri-cloud-line', desc: 'AI 能力的算力底座' }
];

/* ---------------- 十一、产品 Demo：形态 / 入口 / 交互（基于优酷 App 界面） ---------------- */
export const productDemo = [
  {
    id: 'sol-search',
    name: 'AI 搜索',
    side: '消费侧',
    icon: 'ri-search-eye-line',
    theme: 'blue',
    accent: '#2a52d4',
    tagline: '把「搜剧名」升级成「问问题」',
    form: {
      title: '自然语言问答搜索框 + 答案直达卡片',
      desc: '产品形态不是一个新的 App 或独立页，而是对优酷现有搜索入口的「能力升级」：用户输入的不再是剧名关键词，而是场景化、剧情化、情绪化的问题；返回的不再是剧集列表，而是一张「带来源、可跳转」的答案卡——告诉你哪部剧、哪一集、第几分钟，点一下直接跳过去看。',
      points: ['入口复用，零学习成本', '答案直达，一步到片', '问题即意图，沉淀需求数据']
    },
    entries: [
      { name: '首页顶部搜索框', where: 'App 首页 · 顶部', note: '主入口，替换原关键词搜索框，升级为自然语言问答', primary: true },
      { name: '播放页「边看边问」浮条', where: '播放页 · 底部', note: '次入口，承接观看中的即时疑问，答案严格限定在当前进度内', primary: false }
    ],
    interactions: [
      { text: '在搜索框输入自然语言问题', sub: '「类似《隐秘的角落》的悬疑剧有哪些」' },
      { text: 'AI 返回答案卡：相关剧集 + 匹配理由 + 可跳转时间点', sub: '答案标注哪部剧、哪一集、第几分钟' },
      { text: '点击卡片直接跳到对应分钟开始播放', sub: '把「搜关键词→翻列表→逐集找」压缩成一步' }
    ]
  },
  {
    id: 'sol-interact',
    name: 'AI 互动',
    side: '消费侧',
    icon: 'ri-robot-2-line',
    theme: 'purple',
    accent: '#7c3aed',
    tagline: '把「被动看」变成「主动玩」',
    form: {
      title: '角色分身对话 + 角色动态圈 + AI 陪看',
      desc: '产品形态是把「剧中角色」做成可持续对话的 AI 分身，叠加角色每天更新的动态圈，让观看从一次性的内容消费变成一段可累积的关系。角色记得你的观看进度、聊过的话题，形成专属感；动态圈让非追剧期也有事可做。',
      points: ['角色人格一致，不出戏', '进度感知，自动防剧透', '动态圈让非追剧期也有事可做']
    },
    entries: [
      { name: '播放页「角色」气泡', where: '播放页 · 右侧悬浮', note: '主入口，边看边和当前剧的角色聊剧情', primary: true },
      { name: '社区「角色动态圈」', where: '底部社区 Tab', note: '日常入口，角色每天更新动态、回应评论', primary: false }
    ],
    interactions: [
      { text: '点播放页右侧「角色」气泡', sub: '唤起当前剧的角色 AI 分身' },
      { text: '与角色实时对话当前剧情', sub: '角色记得你追到第几集，自动规避剧透' },
      { text: '进入角色动态圈，日常参与', sub: '点赞评论动态、看二创、买周边，关系可累积' }
    ]
  },
  {
    id: 'sol-gen',
    name: 'AI 视频生成',
    side: '生产侧',
    icon: 'ri-magic-line',
    theme: 'green',
    accent: '#059669',
    tagline: '把「创作欲」变成「平台供给」',
    form: {
      title: '分层创作工具（轻创作 / 深度创作）+ 正版素材库',
      desc: '产品形态是官方创作工具矩阵：面向追剧用户的「一键角色 cut」，面向有剪辑基础创作者的「混剪 / AI 番外」，素材全部来自官方正版库。把「用户想二创但无路可走」变成「一键生成、安全分发」，产出回流平台成为新供给。',
      points: ['一键角色 cut，零门槛', '正版素材，零侵权风险', '产出回流平台，成为新供给']
    },
    entries: [
      { name: '播放页「一键二创」按钮', where: '播放页 · 底部控制条', note: '主入口，看剧时随手生成角色高光片段', primary: true },
      { name: '「我的」创作中心', where: '我的页 · 创作中心卡片', note: '创作入口，管理作品、参与官方二创活动', primary: false }
    ],
    interactions: [
      { text: '点「一键二创」选角色 / 模板', sub: '轻创作一键角色 cut，深度创作选混剪 / AI 番外' },
      { text: 'AI 自动选段 + 生成成片', sub: '基于看点提取，从正版库自动剪出高光片段' },
      { text: '发布到社区 / 参与官方活动', sub: '作品回流平台，成为可被检索的新供给' }
    ]
  }
];
