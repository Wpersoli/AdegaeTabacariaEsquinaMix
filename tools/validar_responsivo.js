#!/usr/bin/env node
/* Valida o cabecalho responsivo em varias larguras (celular, tablet, desktop).
   Uso:  npm i -D playwright && npx playwright install chromium
         python -m http.server 8080        (em outro terminal, na pasta do site)
         node tools/validar_responsivo.js http://localhost:8080
   Referencia (exemplo enviado): quebra em 1025px; desktop = marca | busca 56px | caixas 48px + barra de categorias;
   celular = hamburguer 44 | marca 78 centralizada | busca/conta/sacola 44 sem caixa; barra vira menu em tela cheia. */
const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:8080';
const WIDTHS = [320, 360, 390, 430, 600, 768, 1024, 1025, 1280, 1440, 1920];
let ok = 0, bad = 0;
const check = (cond, msg) => { cond ? ok++ : (bad++, console.log('   ✗ ' + msg)); };
(async () => {
  const b = await chromium.launch();
  for (const w of WIDTHS) {
    const mobile = w <= 1024;
    const ctx = await b.newContext({ viewport: { width: w, height: 800 }, hasTouch: mobile, isMobile: mobile });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL); await p.waitForTimeout(400);
    const yes = await p.$('#yes'); if (yes && await yes.isVisible()) { await yes.click(); await p.waitForTimeout(250); }
    console.log(`\n${w}px  (${mobile ? 'CELULAR/TABLET' : 'DESKTOP'})`);
    const r = await p.evaluate(() => {
      const R = s => { const e = document.querySelector(s); if (!e) return null; const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return null; const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height, r: r.right }; };
      const nav = [...document.querySelectorAll('#nav > button')].map(e => e.getBoundingClientRect());
      return { menu: R('#menuBtn'), brand: R('.brand img'), brandT: R('.brand-t'), search: R('.search'), sBtn: R('#searchBtn'),
        acc: R('.actions a.ico'), cart: R('#cartBtn'), nav: R('#nav'), navItems: nav.map(r => ({ l: r.left, r: r.right, t: Math.round(r.top) })),
        overflow: document.documentElement.scrollWidth > innerWidth, vw: innerWidth, top: R('.top') };
    });
    check(!r.overflow, 'rolagem horizontal na pagina');
    check(!errs.length, 'erros no console: ' + errs.join(';'));
    if (mobile) {
      check(r.menu && Math.round(r.menu.w) === 44 && Math.round(r.menu.h) === 44, 'hamburguer deve ter 44x44');
      check(!r.nav, 'barra horizontal deve estar oculta');
      check(!r.brandT, 'texto da marca deve estar oculto');
      check(r.brand && r.brand.w >= 64 && r.brand.w <= 80, 'logo ~78px (66px em <=360): ' + (r.brand && Math.round(r.brand.w)));
      check(r.sBtn && r.acc && r.cart && [r.sBtn, r.acc, r.cart].every(e => Math.round(e.w) === 44 && Math.round(e.h) === 44), 'icones busca/conta/sacola 44x44');
      check(r.menu && r.brand && r.sBtn && r.menu.x < r.brand.x && r.brand.x < r.sBtn.x && r.sBtn.x < r.acc.x && r.acc.x < r.cart.x, 'ordem: hamburguer | logo | busca | conta | sacola');
      check(r.cart && r.cart.r <= w, 'sacola dentro da tela');
      check(!r.search, 'campo de busca oculto ate tocar na lupa');
      const rowTops = [r.menu, r.brand, r.sBtn, r.cart].map(e => Math.round(e.y + e.h / 2));
      check(Math.max(...rowTops) - Math.min(...rowTops) <= 4, 'elementos do topo alinhados na mesma linha');
      // busca (lupa)
      await p.click('#searchBtn'); await p.waitForTimeout(250);
      check(await p.$eval('.search', e => getComputedStyle(e).display !== 'none'), 'lupa deve abrir o campo de busca');
      await p.fill('#q', 'hei'); await p.dispatchEvent('#q', 'input'); await p.waitForTimeout(250);
      check((await p.$$('#sug .sug__i')).length > 0, 'auto-preenchimento deve sugerir produtos');
      await p.click('#sug .sug__i'); await p.waitForTimeout(300);
      check(await p.$eval('.search', e => getComputedStyle(e).display === 'none'), 'busca deve fechar ao escolher sugestao');
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(350);
      // menu em tela cheia
      await p.click('#menuBtn'); await p.waitForTimeout(450);
      check(await p.$eval('#mnav', e => e.classList.contains('is-open')), 'hamburguer deve abrir o menu');
      const n = await p.$$eval('#mnav .mnav__list > li', e => e.length); check(n === 7, 'menu com 7 opcoes (achou ' + n + ')');
      const full = await p.$eval('#mnav', e => { const r = e.getBoundingClientRect(); return r.width >= innerWidth - 1 && r.height >= innerHeight - 1; }); check(full, 'menu ocupa a tela toda');
      await p.click('#mnav .mnav__a:has-text("Bebidas")'); await p.waitForTimeout(200);
      check((await p.$$('#mnav .mnav__sub:not([hidden]) button')).length === 14, 'Bebidas: Ver tudo + 13 subcategorias');
      await p.click('#mnav .mnav__sub button:has-text("Energético")'); await p.waitForTimeout(400);
      check(!(await p.$eval('#mnav', e => e.classList.contains('is-open'))), 'menu fecha ao escolher');
      check((await p.$eval('#facets .is-active', e => e.textContent)) === 'Energético', 'subcategoria aplicada na secao do cardapio');
    } else {
      check(!r.menu && !r.sBtn, 'hamburguer e lupa ocultos no desktop');
      check(r.nav && r.navItems.every(i => i.t === r.navItems[0].t), 'barra de categorias em UMA linha');
      check(r.search && Math.round(r.search.h) === 56, 'busca com 56px de altura: ' + (r.search && Math.round(r.search.h)));
      check(r.acc && r.cart && Math.round(r.acc.w) === 48 && Math.round(r.cart.w) === 48, 'conta/sacola em caixas 48x48');
      const f = r.navItems[0], l = r.navItems[r.navItems.length - 1];
      check(Math.abs(f.l - (w - l.r)) <= 2, 'categorias centralizadas (esq ' + Math.round(f.l) + ' / dir ' + Math.round(w - l.r) + ')');
      check(r.search && r.brand && r.brand.x < r.search.x && r.search.r < r.acc.x, 'ordem: marca | busca | conta/sacola');
    }
    await ctx.close();
  }
  await b.close();
  console.log(`\nResultado: ${ok} verificacoes OK, ${bad} falhas`);
  process.exit(bad ? 1 : 0);
})();
