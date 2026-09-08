/* ===================== 恒峰贸易 H5 产品图册 - 交互逻辑 ===================== */

;(function () {
  'use strict';

  /* ---------- 产品数据 ---------- */
  const PRODUCTS = {
    toilet: [
      { id:'TU-3', model:'2001', name:'分体马桶地排s', spec:'250mm', type:'马桶' , image:'images/toilet/toilet_TU-3'},
      { id:'TU-4', model:'2002', name:'澳洲分体马桶', spec:'地排S接头/墙排p接头', type:'马桶' , image:'images/toilet/toilet_TU-4.jpeg'},
      { id:'TU-5', model:'2003', name:'分体马桶地排S', spec:'250mm', type:'马桶' , image:'images/toilet/toilet_TU-5.png'},
      { id:'TU-6', model:'2004', name:'分体马桶地排S', spec:'', type:'马桶' , image:'images/toilet/toilet_TU-6.jpeg'},
      { id:'TU-7', model:'2005', name:'分体马桶地排S', spec:'', type:'马桶' , image:'images/toilet/toilet_TU-7.jpeg'},
      { id:'TU-8', model:'2006', name:'分体马桶横排S/地排P', spec:'250mm', type:'马桶' , image:'images/toilet/toilet_TU-8.png'},
      { id:'TU-9', model:'2007', name:'分体马桶地排s/墙排p', spec:'250mm', type:'马桶' , image:'images/toilet/toilet_TU-9.jpeg'},
      { id:'TU-10', model:'2008', name:'澳洲分体马桶地排s/墙排p', spec:'', type:'马桶' , image:'images/toilet/toilet_TU-10.jpeg'},
      { id:'TU-11', model:'2009', name:'澳洲分体马桶地排S/墙排P', spec:'', type:'马桶' , image:'images/toilet/toilet_TU-11.jpeg'},
      { id:'TU-12', model:'2010', name:'澳洲分体马桶地排S/墙排P', spec:'', type:'马桶' , image:'images/toilet/toilet_TU-12.png'},
      { id:'TU-16', model:'4001', name:'立柱盆', spec:'', type:'立柱盆' , image:'images/toilet/toilet_TU-16.jpeg'},
      { id:'TU-17', model:'4002', name:'立柱盆', spec:'', type:'立柱盆' , image:'images/toilet/toilet_TU-17.png'},
      { id:'TU-18', model:'4005', name:'立柱盆', spec:'', type:'立柱盆' , image:'images/toilet/toilet_TU-18.png'},
      { id:'TU-19', model:'4006', name:'立柱盆', spec:'', type:'立柱盆' , image:'images/toilet/toilet_TU-19.png'},
      { id:'TU-20', model:'4007', name:'立柱盆', spec:'', type:'立柱盆' , image:'images/toilet/toilet_TU-20.jpeg'},
      { id:'TU-21', model:'4008', name:'立柱盆', spec:'', type:'立柱盆' , image:'images/toilet/toilet_TU-21.jpeg'},
      { id:'TU-27', model:'C003', name:'蹲便器', spec:'', type:'蹲便器' , image:'images/toilet/toilet_TU-27.jpeg'},
    ],
    faucet: [
      { id:'HJ-5001', code:'HJ-5001', desc:'不锈钢主体 陶瓷阀芯 锌合金手柄 冷热', type:'厨房龙头' , image:'images/faucet/faucet_HJ-5001.png'},
      { id:'HJ-5003', code:'HJ-5003', desc:'枪灰色 不锈钢主体 不锈钢手柄 冷热', type:'厨房龙头' , image:'images/faucet/faucet_HJ-5003.png'},
      { id:'HJ-5004', code:'HJ-5004', desc:'不锈钢主体 不锈钢手柄 冷热', type:'厨房龙头' , image:'images/faucet/faucet_HJ-5004.png'},
      { id:'HJ-5005', code:'HJ-5005', desc:'不锈钢主体 不锈钢手柄 冷热', type:'厨房龙头' , image:'images/faucet/faucet_HJ-5005.png'},
      { id:'HJ-5006', code:'HJ-5006', desc:'不锈钢主体 不锈钢手柄 冷热', type:'厨房龙头' , image:'images/faucet/faucet_HJ-5006.png'},
      { id:'HJ-5007', code:'HJ-5007', desc:'不锈钢主体 不锈钢手柄 冷热', type:'厨房龙头' , image:'images/faucet/faucet_HJ-5007.png'},
      { id:'HJ-5008', code:'HJ-5008', desc:'不锈钢主体 不锈钢手柄 冷热', type:'厨房龙头' , image:'images/faucet/faucet_HJ-5008.png'},
      { id:'HJ-5009', code:'HJ-5009', desc:'不锈钢主体 不锈钢手柄 冷热', type:'厨房龙头' , image:'images/faucet/faucet_HJ-5009.png'},
      { id:'HJ-5010', code:'HJ-5010', desc:'不锈钢主体 不锈钢手柄 冷热', type:'厨房龙头' , image:'images/faucet/faucet_HJ-5010.png'},
      { id:'HJ-5011', code:'HJ-5011', desc:'不锈钢主体 不锈钢手柄 冷热', type:'厨房龙头' , image:'images/faucet/faucet_HJ-5011.png'},
      { id:'HJ-5012', code:'HJ-5012', desc:'不锈钢主体 不锈钢手柄 冷热', type:'厨房龙头' , image:'images/faucet/faucet_HJ-5012.png'},
      { id:'HJ-4001', code:'HJ-4001', desc:'不锈钢主体 ABS手柄 单冷', type:'面盆龙头' , image:'images/faucet/faucet_HJ-4001.png'},
      { id:'HJ-4002', code:'HJ-4002', desc:'锌合金主体 锌合金手柄 单冷', type:'面盆龙头' , image:'images/faucet/faucet_HJ-4002.png'},
      { id:'HJ-4003', code:'HJ-4003', desc:'锌合金主体 锌合金手柄 单冷', type:'面盆龙头' , image:'images/faucet/faucet_HJ-4003.png'},
      { id:'HJ-4005', code:'HJ-4005', desc:'锌合金主体 锌合金手柄 单冷', type:'面盆龙头' , image:'images/faucet/faucet_HJ-4005.png'},
      { id:'HJ-4006', code:'HJ-4006', desc:'锌合金主体 ABS手柄 单冷', type:'面盆龙头' , image:'images/faucet/faucet_HJ-4006.png'},
      { id:'HJ-4007', code:'HJ-4007', desc:'锌合金主体 ABS手柄 单冷', type:'面盆龙头' , image:'images/faucet/faucet_HJ-4007.png'},
      { id:'HJ-4008', code:'HJ-4008', desc:'锌合金主体 单冷', type:'面盆龙头' , image:'images/faucet/faucet_HJ-4008.png'},
      { id:'HJ-6001', code:'HJ-6001', desc:'不锈钢主体 锌合金手柄 冷热', type:'冷热龙头' , image:'images/faucet/faucet_HJ-6001.png'},
      { id:'HJ-6002', code:'HJ-6002', desc:'不锈钢主体 锌合金手柄 冷热', type:'冷热龙头' , image:'images/faucet/faucet_HJ-6002.png'},
      { id:'HJ-6003', code:'HJ-6003', desc:'不锈钢主体 锌合金手柄 冷热', type:'冷热龙头' , image:'images/faucet/faucet_HJ-6003.png'},
      { id:'HJ-6004', code:'HJ-6004', desc:'不锈钢主体 锌合金手柄 冷热', type:'冷热龙头' , image:'images/faucet/faucet_HJ-6004.png'},
      { id:'HJ-6005', code:'HJ-6005', desc:'不锈钢主体 锌合金手柄 冷热', type:'冷热龙头' , image:'images/faucet/faucet_HJ-6005.png'},
      { id:'HJ-3001', code:'HJ-3001', desc:'不锈钢主体 ABS手柄 单冷', type:'单冷龙头' , image:'images/faucet/faucet_HJ-3001.png'},
      { id:'HJ-3002', code:'HJ-3002', desc:'不锈钢主体 ABS手柄 单冷', type:'单冷龙头' , image:'images/faucet/faucet_HJ-3002.png'},
      { id:'HJ-3003', code:'HJ-3003', desc:'不锈钢主体 ABS手柄 单冷', type:'单冷龙头' , image:'images/faucet/faucet_HJ-3003.png'},
      { id:'HJ-3006', code:'HJ-3006', desc:'锌合金主体 ABS手柄 单冷', type:'单冷龙头' , image:'images/faucet/faucet_HJ-3006.png'},
      { id:'HJ-1001', code:'HJ-1001', desc:'不锈钢主体 ABS手轮 冷水', type:'手轮龙头' , image:'images/faucet/faucet_HJ-1001.png'},
      { id:'HJ-1002', code:'HJ-1002', desc:'拉丝不锈钢 不锈钢手轮 冷水', type:'手轮龙头' , image:'images/faucet/faucet_HJ-1002.png'},
      { id:'HJ-1003', code:'HJ-1003', desc:'拉丝不锈钢 ABS手轮 冷水', type:'手轮龙头' , image:'images/faucet/faucet_HJ-1003.png'},
      { id:'HJ-7001', code:'HJ-7001', desc:'不锈钢主体 ABS把手 冷水', type:'花洒龙头' , image:'images/faucet/faucet_HJ-7001.png'},
      { id:'HJ-7002', code:'HJ-7002', desc:'不锈钢主体 ABS把手 冷水', type:'花洒龙头' , image:'images/faucet/faucet_HJ-7002.png'},
      { id:'HJ-7003', code:'HJ-7003', desc:'不锈钢主体 ABS把手 冷水', type:'花洒龙头' , image:'images/faucet/faucet_HJ-7003.png'},
      { id:'HJ-5550', code:'HJ-5550', desc:'双杆配件', type:'配件' , image:'images/faucet/faucet_HJ-5550.png'},
      { id:'HJ-5551', code:'HJ-5551', desc:'单杆配件', type:'配件' , image:'images/faucet/faucet_HJ-5551.png'},
      { id:'HJ-5552', code:'HJ-5552', desc:'马桶刷', type:'配件' , image:'images/faucet/faucet_HJ-5552.png'},
      { id:'HJ-5553', code:'HJ-5553', desc:'不锈钢201配件', type:'配件' , image:'images/faucet/faucet_HJ-5553.png'},
      { id:'HJ-9001', code:'HJ-9001', desc:'不锈钢配件 ABS排水管', type:'下水配件' , image:'images/faucet/faucet_HJ-9001.png'},
      { id:'HJ-9002', code:'HJ-9002', desc:'防臭下水', type:'下水配件' , image:'images/faucet/faucet_HJ-9002.png'},
      { id:'HJ-8001', code:'HJ-8001', desc:'不锈钢201 单盆 10×10×3.6', type:'不锈钢件' , image:'images/faucet/faucet_HJ-8001.png'},
      { id:'HJ-8002', code:'HJ-8002', desc:'不锈钢201 双盆 10×10×3.6', type:'不锈钢件' , image:'images/faucet/faucet_HJ-8002.png'},
      { id:'HJ-8621', code:'HJ-8621', desc:'ABS花洒头 不锈钢管', type:'淋浴管' , image:'images/faucet/faucet_HJ-8621.png'},
      { id:'HJ-8622', code:'HJ-8622', desc:'ABS花洒头 不锈钢管', type:'淋浴管' , image:'images/faucet/faucet_HJ-8622.png'},
      { id:'HJ-8623', code:'HJ-8623', desc:'淋浴软管', type:'淋浴管' , image:'images/faucet/faucet_HJ-8623.png'},
      { id:'HJ-8624', code:'HJ-8624', desc:'淋浴软管', type:'淋浴管' , image:'images/faucet/faucet_HJ-8624.png'},
      { id:'HJ-2001', code:'HJ-2001', desc:'黄铜主体 锌合金手柄 冷热', type:'淋浴套装' , image:'images/faucet/faucet_HJ-2001.png'},
      { id:'HJ-2002', code:'HJ-2002', desc:'黄铜主体 锌合金手柄 冷热', type:'淋浴套装' , image:'images/faucet/faucet_HJ-2002.png'},
      { id:'HJ-2003', code:'HJ-2003', desc:'太空铝主体 太空铝手柄', type:'淋浴套装' , image:'images/faucet/faucet_HJ-2003.png'},
      { id:'HJ-2004', code:'HJ-2004', desc:'太空铝主体 太空铝手柄', type:'淋浴套装' , image:'images/faucet/faucet_HJ-2004.png'},
      { id:'HJ-2005', code:'HJ-2005', desc:'即热式电热水器', type:'即热' , image:'images/faucet/faucet_HJ-2005.png'},
      { id:'HJ-2006', code:'HJ-2006', desc:'即热式电热水器', type:'即热' , image:'images/faucet/faucet_HJ-2006.png'},
      { id:'HJ-2009', code:'HJ-2009', desc:'太空铝主体 太空铝手柄', type:'淋浴套装' , image:'images/faucet/faucet_HJ-2009.png'},
      { id:'HJ-2010', code:'HJ-2010', desc:'太空铝主体 太空铝手柄', type:'淋浴套装' , image:'images/faucet/faucet_HJ-2010.png'},
      { id:'HJ-2011', code:'HJ-2011', desc:'太空铝主体 太空铝手柄', type:'淋浴套装' , image:'images/faucet/faucet_HJ-2011.png'},
      { id:'HJ-2012', code:'HJ-2012', desc:'太空铝主体 太空铝手柄', type:'淋浴套装' , image:'images/faucet/faucet_HJ-2012.png'},
    ],
    cabinet: [
      { id:'YC-1', model:'V8-80', name:'浴室柜 V8-80', spec:'80cm', type:'浴室柜' },
      { id:'YC-2', model:'A50-80', name:'浴室柜 A50-80', spec:'80cm', type:'浴室柜' , image:'images/cabinet/cabinet_YC-2.png'},
      { id:'YC-3', model:'J2-60-80', name:'浴室柜 J2-60-80', spec:'60/80cm', type:'浴室柜' , image:'images/cabinet/cabinet_YC-3.png'},
      { id:'YC-4', model:'D9-80', name:'浴室柜 D9-80', spec:'80cm', type:'浴室柜' , image:'images/cabinet/cabinet_YC-4.png'},
      { id:'YC-5', model:'43-华夏古橡', name:'浴室柜 华夏古橡', spec:'', type:'浴室柜' , image:'images/cabinet/cabinet_YC-5.png'},
      { id:'YC-6', model:'D2-60双色门', name:'浴室柜 D2-60双色门', spec:'60cm', type:'浴室柜' },
      { id:'YC-7', model:'D6-60', name:'浴室柜 D6-60', spec:'60cm', type:'浴室柜' , image:'images/cabinet/cabinet_YC-7.png'},
      { id:'YC-8', model:'4335支架', name:'浴室柜支架(黑/白)', spec:'4335B/W', type:'支架' , image:'images/cabinet/cabinet_YC-8.jpeg'},
      { id:'YC-9', model:'43-白浪', name:'浴室柜 白浪', spec:'', type:'浴室柜' , image:'images/cabinet/cabinet_YC-9.png'},
      { id:'YC-10', model:'D60-SK天空蓝', name:'浴室柜 D60-SK天空蓝', spec:'60cm', type:'浴室柜' , image:'images/cabinet/cabinet_YC-10.png'},
      { id:'YC-11', model:'43-豆沙绿', name:'浴室柜 豆沙绿', spec:'', type:'浴室柜' },
      { id:'YC-12', model:'D3-60圆镜', name:'浴室柜 D3-60圆镜', spec:'特价引流款', type:'浴室柜' , image:'images/cabinet/cabinet_YC-12.png'},
      { id:'YC-13', model:'43-水泥灰', name:'浴室柜 水泥灰', spec:'', type:'浴室柜' , image:'images/cabinet/cabinet_YC-13.png'},
    ],
  };

  /* ---------- 工具函数 ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- 当前状态 ---------- */
  let currentCategory = 'all';
  let currentPage = 'home';

  /* ========== 页面切换 ========== */
  function switchPage(page) {
    currentPage = page;
    $$('.page').forEach(p => p.classList.remove('active'));
    $(`#page${page.charAt(0).toUpperCase() + page.slice(1)}`).classList.add('active');
    $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.nav === page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ========== 产品卡片 ========== */
  function buildCard(item, category) {
    const hasImage = !!item.image;
    const imgHtml = hasImage
      ? `<img src="${item.image}" alt="${item.name || item.desc}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\'img-placeholder\'><span>📷</span></div>'">`
      : `<div class="img-placeholder"><span>📷</span></div>`;
    const name = item.name || item.desc || item.model || '';
    const spec = item.spec ? `<div class="product-spec">${item.spec}</div>` : '';

    return `
      <div class="product-card" data-id="${item.id}" data-category="${category}" data-type="${item.type}">
        <div class="product-img">${imgHtml}</div>
        <div class="product-info">
          <div class="product-name">${name}</div>
          ${spec}
        </div>
      </div>`;
  }

  /* ========== 渲染产品列表 ========== */
  function renderProducts() {
    const grid = $('#productGrid');
    const empty = $('#emptyTip');
    if (!grid) return;

    let items = [];

    if (currentCategory === 'shower') {
      // 淋浴/即热筛选
      (PRODUCTS.faucet || []).forEach(item => {
        if (['淋浴套装', '淋浴管', '即热'].includes(item.type)) {
          items.push({ item, category: 'faucet' });
        }
      });
    } else {
      const cats = currentCategory === 'all'
        ? ['toilet', 'faucet', 'cabinet']
        : [currentCategory];

      cats.forEach(cat => {
        (PRODUCTS[cat] || []).forEach(item => {
          items.push({ item, category: cat });
        });
      });
    }

    if (items.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    grid.innerHTML = items.map(({ item, category }) => buildCard(item, category)).join('');
  }

  /* ========== 精选产品 ========== */
  function renderFeatured() {
    const scroll = $('#featuredScroll');
    if (!scroll) return;

    // 从每个分类取前3个作为精选
    const featured = [];
    ['toilet', 'faucet', 'cabinet'].forEach(cat => {
      (PRODUCTS[cat] || []).slice(0, 3).forEach(item => {
        featured.push({ item, category: cat });
      });
    });

    scroll.innerHTML = featured.map(({ item, category }) => {
      const name = item.name || item.desc || item.model || '';
      const imgHtml = item.image
        ? `<img src="${item.image}" alt="${name}" loading="lazy" onerror="this.parentElement.innerHTML='📷'">`
        : '📷';
      return `
        <div class="featured-item" data-id="${item.id}" data-category="${category}">
          <div class="featured-item-img">${imgHtml}</div>
          <div class="featured-item-info">
            <div class="featured-item-name">${name}</div>
          </div>
        </div>`;
    }).join('');

    // 点击精选产品
    scroll.querySelectorAll('.featured-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.id;
        const category = el.dataset.category;
        const list = PRODUCTS[category] || [];
        const item = list.find(p => p.id === id);
        if (item) {
          switchPage('catalog');
          openModal(item, category);
        }
      });
    });
  }

  /* ========== 产品详情弹窗 ========== */
  function openModal(item, category) {
    const modal = $('#productModal');
    const content = $('#modalContent');
    if (!modal || !content) return;

    const isFaucet = category === 'faucet';
    const name = item.name || item.desc || '';
    const title = isFaucet ? `${item.code} - ${name}` : name;
    const imgHtml = item.image
      ? `<div class="detail-img"><img src="${item.image}" alt="${name}" onerror="this.parentElement.innerHTML='📷'"></div>`
      : `<div class="detail-img">📷</div>`;

    content.innerHTML = `
      <h2 class="detail-title">${title}</h2>
      ${item.code ? `<p class="detail-code">产品编号：${item.code}</p>` : ''}
      ${item.model ? `<p class="detail-code">产品型号：${item.model}</p>` : ''}
      ${imgHtml}
      <table class="detail-table">
        ${item.type ? `<tr><td>分类</td><td>${item.type}</td></tr>` : ''}
        ${item.spec ? `<tr><td>规格</td><td>${item.spec}</td></tr>` : ''}
      </table>
      <h3 class="detail-section-title">产品描述</h3>
      <ul class="detail-list">
        ${isFaucet ? `<li>${item.desc}</li>` : `<li>${name}</li>`}
        <li>请联系我们获取详细技术资料与报价</li>
      </ul>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = $('#productModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ========== 事件绑定 ========== */
  function bindEvents() {
    // 底部导航
    $$('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        switchPage(item.dataset.nav);
      });
    });

    // 分类 Tab
    $$('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderProducts();
      });
    });

    // 产品卡片点击
    $('#productGrid')?.addEventListener('click', e => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      const id = card.dataset.id;
      const category = card.dataset.category;
      const list = PRODUCTS[category] || [];
      const item = list.find(p => p.id === id);
      if (item) openModal(item, category);
    });

    // Hero CTA
    $$('[data-nav="catalog"]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        switchPage('catalog');
      });
    });

    // 弹窗关闭
    $('#modalClose')?.addEventListener('click', closeModal);
    $('#productModal')?.querySelector('.modal-mask')?.addEventListener('click', closeModal);

    // ESC 关闭弹窗
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ========== 初始化 ========== */
  function init() {
    renderProducts();
    renderFeatured();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
