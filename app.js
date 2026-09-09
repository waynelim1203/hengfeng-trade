/* ===================== 恒峰贸易 H5 产品图册 - 交互逻辑 ===================== */

;(function () {
  'use strict';

  /* ---------- 产品数据（从 products.js 加载） ---------- */
  // PRODUCTS is declared in products.js

  /* ---------- 工具函数 ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- 构建图片 HTML ---------- */
  function buildImgHtml(item, category) {
    // 使用 products.json 中的 image 字段
    var imagePath = item.image;
    if (!imagePath) {
      // 回退：按约定路径
      var id = item.id.replace(/-R\d+$/, '');
      imagePath = 'images/' + category + '/' + category + '_' + id + '.png';
    }
    var alt = item.name || item.desc || item.model || '';
    return '<img src="' + imagePath + '" alt="' + alt + '" loading="lazy" onerror="loadImageFallback(this)">';
  }

  /* ---------- 当前状态 ---------- */
  let currentCategory = 'all';
  let currentPage = 'home';

  /* ========== 页面切换 ========== */
  function switchPage(page) {
    currentPage = page;
    $$('.page').forEach(p => p.classList.remove('active'));
    $('#page' + page.charAt(0).toUpperCase() + page.slice(1)).classList.add('active');
    $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.nav === page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ========== 产品卡片 ========== */
  function buildCard(item, category) {
    var name = item.name || item.desc || item.model || '';
    var spec = item.spec ? '<div class="product-spec">' + item.spec + '</div>' : '';
    var imgHtml = buildImgHtml(item, category);

    return '<div class="product-card" data-id="' + item.id + '" data-category="' + category + '" data-type="' + (item.type || '') + '">' +
      '<div class="product-img">' + imgHtml + '</div>' +
      '<div class="product-info">' +
        '<div class="product-name">' + name + '</div>' +
        spec +
      '</div>' +
    '</div>';
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
      const imgHtml = buildImgHtml(item, category);
      return '<div class="featured-item" data-id="' + item.id + '" data-category="' + category + '">' +
        '<div class="featured-item-img">' + imgHtml + '</div>' +
        '<div class="featured-item-info">' +
          '<div class="featured-item-name">' + name + '</div>' +
        '</div>' +
      '</div>';
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
    const title = isFaucet ? item.code + ' - ' + name : name;
    const imgHtml = '<div class="detail-img">' + buildImgHtml(item, category) + '</div>';

    content.innerHTML = '<h2 class="detail-title">' + title + '</h2>' +
      (item.code ? '<p class="detail-code">产品编号：' + item.code + '</p>' : '') +
      (item.model ? '<p class="detail-code">产品型号：' + item.model + '</p>' : '') +
      imgHtml +
      '<table class="detail-table">' +
        (item.type ? '<tr><td>分类</td><td>' + item.type + '</td></tr>' : '') +
        (item.spec ? '<tr><td>规格</td><td>' + item.spec + '</td></tr>' : '') +
      '</table>' +
      '<h3 class="detail-section-title">产品描述</h3>' +
      '<ul class="detail-list">' +
        '<li>' + (isFaucet ? item.desc : name) + '</li>' +
        '<li>请联系我们获取详细技术资料与报价</li>' +
      '</ul>';

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
    // PRODUCTS is loaded from products.js via <script> tag
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
