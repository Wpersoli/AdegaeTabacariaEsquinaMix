(() => {
  'use strict';

  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => [...root.querySelectorAll(s)];

  const produtos = [
    { id:1,nome:'Heineken Long Neck',volume:'330ml',preco:7.49,precoDe:8.99,promocao:true,categoria:'Cervejas',imagem:'https://www.kakuyasu.co.jp/images/commodityExtention/00401113/00401113-main.jpg',descricao:'Puro malte, refrescante e pronta para chegar trincando.',estoque:24,destaque:true },
    { id:2,nome:'Red Bull Energy Drink',volume:'250ml',preco:10.90,precoDe:12.90,promocao:true,categoria:'Energéticos',imagem:'https://toppng.com/uploads/preview/red-bull-1152606041778170rzdws.png',descricao:'Energia clássica para virar a noite no ritmo da Esquina.',estoque:24,destaque:true },
    { id:3,nome:'Coca-Cola Original',volume:'2L',preco:12.99,precoDe:15.00,promocao:true,categoria:'Refrigerantes',imagem:'https://www.vhv.rs/dpng/d/436-4362440_coca-cola-bottle-2l-coca-cola-bottle-2l.png',descricao:'O clássico gelado para completar qualquer pedido.',estoque:18,destaque:true },
    { id:4,nome:'Gelo em Cubos',volume:'5kg',preco:14.90,categoria:'Gelo',imagem:'assets/products/ice.svg',descricao:'Gelo de sobra para manter o rolê inteiro no ponto.',estoque:30 },
    { id:5,nome:'Combo Esquina Mix',volume:'6 Heineken + Gelo 5kg',preco:59.90,precoDe:69.90,promocao:true,categoria:'Combos',imagem:'assets/products/combo.svg',descricao:'Cerveja gelada + gelo: o combo que salva a resenha.',estoque:8,destaque:true },
    { id:6,nome:'Doritos Nacho Cheese',volume:'120g',preco:8.90,categoria:'Conveniência',imagem:'https://io.convertiez.com.br/m/drogariaveracruz/shop/products/images/22672/large/salgadinho-de-milho-doritos-sabor-queijo-nacho-120g_23292.jpg',descricao:'Crocância e sabor para acompanhar sua bebida favorita.',estoque:14 },
    { id:7,nome:'Budweiser Long Neck',volume:'330ml',preco:6.90,categoria:'Cervejas',imagem:'https://www.gojumbo.co.uk/user/products/large/Budweiser-Lager-bottles.jpg',descricao:'Lager leve, refrescante e pronta para servir bem gelada.',estoque:20 },
    { id:8,nome:'Amstel Lager',volume:'350ml',preco:4.99,precoDe:5.99,promocao:true,categoria:'Cervejas',imagem:'assets/products/beer.svg',descricao:'Lager equilibrada para pedir sem erro, sempre gelada.',estoque:22 },
    { id:9,nome:'Corona Extra',volume:'330ml',preco:8.90,categoria:'Cervejas',imagem:'https://toppng.com/uploads/preview/corona-beer-corona-extra-710-11562961013wpedmqnrky.png',descricao:'Leve e refrescante, perfeita para momentos descontraídos.',estoque:16,destaque:true },
    { id:10,nome:'Stella Artois',volume:'330ml',preco:7.90,categoria:'Cervejas',imagem:'assets/products/beer.svg',descricao:'Lager premium com sabor equilibrado e final refrescante.',estoque:18 },
    { id:11,nome:'Brahma Duplo Malte',volume:'350ml',preco:4.79,categoria:'Cervejas',imagem:'assets/products/beer.svg',descricao:'Duplo malte, corpo macio e aquela temperatura de respeito.',estoque:28 },
    { id:12,nome:'Skol Pilsen',volume:'350ml',preco:4.29,categoria:'Cervejas',imagem:'assets/products/beer.svg',descricao:'Leve, gelada e pronta para acompanhar a sua madrugada.',estoque:30 },
    { id:13,nome:'Antarctica Original',volume:'600ml',preco:12.90,categoria:'Cervejas',imagem:'assets/products/beer.svg',descricao:'Garrafa para compartilhar, com sabor clássico de boteco.',estoque:12 },
    { id:14,nome:'Eisenbahn Pilsen',volume:'355ml',preco:6.90,categoria:'Cervejas',imagem:'assets/products/beer.svg',descricao:'Pilsen puro malte com perfil leve e refrescante.',estoque:14 },
    { id:15,nome:'Itaipava Pilsen',volume:'350ml',preco:3.69,categoria:'Cervejas',imagem:'assets/products/beer.svg',descricao:'Opção gelada e econômica para abastecer a resenha.',estoque:32 },
    { id:16,nome:'Heineken Zero',volume:'330ml',preco:7.49,categoria:'Cervejas',imagem:'https://www.kakuyasu.co.jp/images/commodityExtention/00401113/00401113-main.jpg',descricao:'Versão zero álcool para curtir o sabor com outra proposta.',estoque:12 },
    { id:17,nome:'Smirnoff Nº21',volume:'998ml',preco:39.90,precoDe:44.90,promocao:true,categoria:'Destilados',imagem:'https://acdn-us.mitiendanube.com/stores/005/108/528/products/smirnoff-f350176998a1c1855d17253688063382-1024-1024.webp',descricao:'Vodka versátil para drinks, combos e aquela mistura caprichada.',estoque:10,destaque:true },
    { id:18,nome:'Absolut Vodka',volume:'1L',preco:89.90,categoria:'Destilados',imagem:'assets/products/party.svg',descricao:'Vodka premium para drinks marcantes e noites especiais.',estoque:8 },
    { id:19,nome:'Tanqueray London Dry',volume:'750ml',preco:109.90,categoria:'Destilados',imagem:'assets/products/party.svg',descricao:'Gin clássico para montar um gin tônica no seu estilo.',estoque:7 },
    { id:20,nome:"Gordon's London Dry",volume:'750ml',preco:69.90,categoria:'Destilados',imagem:'assets/products/party.svg',descricao:'Gin equilibrado para combinar com tônica, gelo e cítricos.',estoque:8 },
    { id:21,nome:'Johnnie Walker Red Label',volume:'1L',preco:99.90,categoria:'Destilados',imagem:'assets/products/party.svg',descricao:'Whisky intenso e versátil para servir com gelo ou em drinks.',estoque:6 },
    { id:22,nome:'White Horse Whisky',volume:'1L',preco:79.90,categoria:'Destilados',imagem:'assets/products/party.svg',descricao:'Whisky clássico para quem quer sabor e praticidade no pedido.',estoque:7 },
    { id:23,nome:'Cachaça 51',volume:'965ml',preco:18.90,categoria:'Destilados',imagem:'assets/products/party.svg',descricao:'A clássica para caipirinha e combinações bem brasileiras.',estoque:15 },
    { id:24,nome:'Campari',volume:'748ml',preco:54.90,categoria:'Destilados',imagem:'assets/products/party.svg',descricao:'Aperitivo marcante para drinks cítricos e combinações especiais.',estoque:7 },
    { id:25,nome:'Coca-Cola Zero',volume:'2L',preco:12.99,categoria:'Refrigerantes',imagem:'assets/products/energy.svg',descricao:'Sabor clássico sem açúcar, gelada para acompanhar tudo.',estoque:18 },
    { id:26,nome:'Guaraná Antarctica',volume:'2L',preco:10.90,categoria:'Refrigerantes',imagem:'assets/products/energy.svg',descricao:'Guaraná gelado, brasileiro e certeiro para compartilhar.',estoque:20 },
    { id:27,nome:'Sprite',volume:'2L',preco:9.90,categoria:'Refrigerantes',imagem:'assets/products/energy.svg',descricao:'Refrescância cítrica para o pedido chegar completo.',estoque:14 },
    { id:28,nome:'Fanta Laranja',volume:'2L',preco:9.90,categoria:'Refrigerantes',imagem:'assets/products/energy.svg',descricao:'Sabor laranja e muita refrescância para dividir com a galera.',estoque:14 },
    { id:29,nome:'Schweppes Citrus',volume:'350ml',preco:5.49,categoria:'Refrigerantes',imagem:'assets/products/energy.svg',descricao:'Cítrica e gelada, ótima pura ou como parceira de drinks.',estoque:18 },
    { id:30,nome:'Água Tônica Antarctica',volume:'350ml',preco:4.90,categoria:'Refrigerantes',imagem:'assets/products/energy.svg',descricao:'Tônica gelada para gin, drinks ou para beber pura.',estoque:20 },
    { id:31,nome:'Água Mineral sem Gás',volume:'500ml',preco:3.49,categoria:'Águas',imagem:'assets/products/ice.svg',descricao:'Hidratação gelada, simples e indispensável em qualquer pedido.',estoque:36 },
    { id:32,nome:'Água Mineral com Gás',volume:'500ml',preco:3.99,categoria:'Águas',imagem:'assets/products/ice.svg',descricao:'Gelada e com gás para refrescar ou acompanhar seu drink.',estoque:24 },
    { id:33,nome:'H2OH! Limão',volume:'500ml',preco:5.90,categoria:'Águas',imagem:'assets/products/ice.svg',descricao:'Leve toque de limão para refrescar sem pesar.',estoque:16 },
    { id:34,nome:'Monster Energy',volume:'473ml',preco:11.90,categoria:'Energéticos',imagem:'assets/products/energy.svg',descricao:'Lata grande para dar energia quando a noite pede mais.',estoque:15 },
    { id:35,nome:'Red Bull Tropical',volume:'250ml',preco:11.90,categoria:'Energéticos',imagem:'assets/products/energy.svg',descricao:'Energia com perfil tropical para variar o combo.',estoque:12 },
    { id:36,nome:'Fusion Energy Drink',volume:'473ml',preco:8.90,categoria:'Energéticos',imagem:'assets/products/energy.svg',descricao:'Energia e custo-benefício para manter o ritmo.',estoque:18 },
    { id:37,nome:'Suco Del Valle Uva',volume:'290ml',preco:5.90,categoria:'Sucos',imagem:'assets/products/energy.svg',descricao:'Suco gelado de uva para uma pausa mais leve.',estoque:14 },
    { id:38,nome:'Suco Del Valle Laranja',volume:'290ml',preco:5.90,categoria:'Sucos',imagem:'assets/products/energy.svg',descricao:'Sabor de laranja, gelado e pronto para acompanhar o lanche.',estoque:14 },
    { id:39,nome:'Água de Coco',volume:'1L',preco:11.90,categoria:'Sucos',imagem:'assets/products/ice.svg',descricao:'Refrescante e prática para hidratar a qualquer hora.',estoque:10 },
    { id:40,nome:'Gelo em Cubos',volume:'3kg',preco:9.90,categoria:'Gelo',imagem:'assets/products/ice.svg',descricao:'O tamanho certo para deixar bebida e cooler no grau.',estoque:20 },
    { id:41,nome:'Gelo de Coco',volume:'1kg',preco:16.90,categoria:'Gelo',imagem:'assets/products/ice.svg',descricao:'Gelo saborizado para dar outra cara aos seus drinks.',estoque:7 },
    { id:42,nome:'Amendoim Crocante',volume:'100g',preco:5.90,categoria:'Conveniência',imagem:'assets/products/snack.svg',descricao:'Petisco crocante que combina com cerveja bem gelada.',estoque:16 },
    { id:43,nome:'Chocolate',volume:'90g',preco:7.90,categoria:'Conveniência',imagem:'assets/products/snack.svg',descricao:'Um doce rápido para completar o pedido da madrugada.',estoque:11 },
    { id:44,nome:'Carvão Premium',volume:'3kg',preco:18.90,categoria:'Conveniência',imagem:'assets/products/party.svg',descricao:'Churrasco de última hora? A Esquina também resolve.',estoque:9 },
    { id:45,nome:'Combo Gin Tônica',volume:'Gin + tônica + gelo',preco:79.90,precoDe:89.90,promocao:true,categoria:'Combos',imagem:'assets/products/party.svg',descricao:'Kit prático para montar o gin tônica sem esquecer nada.',estoque:6 },
    { id:46,nome:'Combo Churrasco',volume:'Cervejas + gelo + carvão',preco:109.90,categoria:'Combos',imagem:'assets/products/party.svg',descricao:'O essencial do churrasco reunido em um pedido só.',estoque:5 },
    { id:47,nome:'Combo Madrugada',volume:'Bebidas + energético + gelo',preco:64.90,categoria:'Combos',imagem:'assets/products/combo.svg',descricao:'Virou a noite? Esse combo chega para manter o clima.',estoque:7 },
    { id:48,nome:'Isqueiro Premium',volume:'Unidade',preco:19.90,categoria:'Tabacaria',imagem:'assets/products/tabacaria.svg',descricao:'Acessório de conveniência para maiores de 18 anos.',estoque:4 }
  ];

  const niveis = { GUEST: 0, CLIENTE: 1, ADMIN: 2 };
  const storageGet = key => { try { return window.localStorage?.getItem(key); } catch { return null; } };
  const storageSet = (key, value) => { try { window.localStorage?.setItem(key, value); } catch { /* modo privado/arquivo */ } };
  const storageRemove = key => { try { window.localStorage?.removeItem(key); } catch { /* noop */ } };
  const sessionGet = key => { try { return window.sessionStorage?.getItem(key); } catch { return null; } };
  const sessionSet = (key, value) => { try { window.sessionStorage?.setItem(key, value); } catch { /* noop */ } };
  const sessionRemove = key => { try { window.sessionStorage?.removeItem(key); } catch { /* noop */ } };

  const utilizadorAtual = {
    nome: 'Visitante',
    perfil: storageGet('esquinaMixRole') || 'GUEST'
  };

  let filtroAtual = 'Todos';
  let buscaAtual = '';
  let ordenacaoAtual = 'destaques';
  let toastTimer = null;
  let carrinho = carregarCarrinho();

  const els = {
    site: qs('.site-shell'),
    ageGate: qs('#ageGate'), ageConfirm: qs('#ageConfirm'), ageDeny: qs('#ageDeny'), ageDeniedPanel: qs('#ageDeniedPanel'), ageDeniedBack: qs('#ageDeniedBack'),
    drawer: qs('#drawer'), drawerBackdrop: qs('#drawerBackdrop'), drawerClose: qs('#drawerClose'), menuTrigger: qs('#menuTrigger'),
    cartCount: qs('#cartCount'), cartButton: qs('#cartButton'), orderButton: qs('#orderButton'), toast: qs('#toast'),
    searchForm: qs('#searchForm'), searchInput: qs('#searchInput'), catalogSearch: qs('#catalogSearch'), catalogSort: qs('#catalogSort'), catalogCount: qs('#catalogCount'), productGrid: qs('#lista-produtos'), categoryFilters: qs('#categoryFilters'),
    offersTrack: qs('#offersTrack'), offersViewport: qs('#offersViewport'), offersPrev: qs('#offersPrev'), offersNext: qs('#offersNext'), offersUpdated: qs('#offersUpdated'),
    faqChatButton: qs('#faqChatButton'), footerChatButton: qs('#footerChatButton'), footerYear: qs('#footerYear'),
    accessLabel: qs('#accessLabel'), drawerRole: qs('#drawerRole'), demoLogin: qs('#demoLogin'), demoLogout: qs('#demoLogout'),
    profileButton: qs('#profileButton'), accountDialog: qs('#accountDialog'), accountClose: qs('#accountClose'), accountLogin: qs('#accountLogin'), accountLogout: qs('#accountLogout'), accountTitle: qs('#accountTitle'), accountText: qs('#accountText'),
    cartDrawer: qs('#cartDrawer'), cartBackdrop: qs('#cartBackdrop'), cartClose: qs('#cartClose'), cartItems: qs('#cartItems'), cartEmpty: qs('#cartEmpty'), cartSubtotal: qs('#cartSubtotal'), checkoutButton: qs('#checkoutButton'), cartShopLink: qs('#cartShopLink'),
    chatWidget: qs('#chatWidget'), chatLauncher: qs('#chatLauncher'), chatPanel: qs('#chatPanel'), chatClose: qs('#chatClose'), chatMessages: qs('#chatMessages'), chatForm: qs('#chatForm'), chatInput: qs('#chatInput'),
    backToTop: qs('#backToTop')
  };

  function moeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function showToast(message) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove('is-visible'), 2400);
  }

  function bounce(el) {
    if (!el) return;
    el.classList.remove('bounce');
    void el.offsetWidth;
    el.classList.add('bounce');
  }

  /* ---------- AGE GATE ---------- */
  function bloquearConteudo() {
    document.body.classList.add('age-locked');
    els.site?.setAttribute('inert', '');
    els.drawer?.setAttribute('inert', '');
    els.cartDrawer?.setAttribute('inert', '');
    els.chatWidget?.setAttribute('inert', '');
  }

  function liberarConteudo() {
    document.body.classList.remove('age-locked', 'age-denied');
    els.site?.removeAttribute('inert');
    els.drawer?.removeAttribute('inert');
    els.cartDrawer?.removeAttribute('inert');
    els.chatWidget?.removeAttribute('inert');
  }

  function iniciarAgeGate() {
    if (!els.ageGate) return;
    const verificado = storageGet('esquinaMixAge18') === 'yes';
    const recusado = sessionGet('esquinaMixAgeDenied') === 'yes';

    if (verificado) {
      els.ageGate.hidden = true;
      liberarConteudo();
      return;
    }

    bloquearConteudo();
    els.ageGate.hidden = false;
    if (recusado) {
      els.ageGate.classList.add('is-denied');
      document.body.classList.add('age-denied');
    } else {
      setTimeout(() => els.ageConfirm?.focus(), 30);
    }
  }

  function confirmarIdade() {
    storageSet('esquinaMixAge18', 'yes');
    sessionRemove('esquinaMixAgeDenied');
    els.ageGate?.classList.add('is-leaving');
    setTimeout(() => {
      if (els.ageGate) els.ageGate.hidden = true;
      liberarConteudo();
      els.ageGate?.classList.remove('is-leaving');
      els.menuTrigger?.focus();
    }, 330);
  }

  function negarIdade() {
    sessionSet('esquinaMixAgeDenied', 'yes');
    storageRemove('esquinaMixAge18');
    els.ageGate?.classList.add('is-denied');
    document.body.classList.add('age-denied');
    setTimeout(() => els.ageDeniedBack?.focus(), 20);
  }

  function voltarAgeGate() {
    sessionRemove('esquinaMixAgeDenied');
    document.body.classList.remove('age-denied');
    els.ageGate?.classList.remove('is-denied');
    setTimeout(() => els.ageConfirm?.focus(), 20);
  }

  /* ---------- ACCESS / ACCOUNT ---------- */
  function verificarAcesso(nivelRequerido) {
    return (niveis[utilizadorAtual.perfil] ?? 0) >= (niveis[nivelRequerido] ?? 99);
  }

  function atualizarAcesso() {
    const rotulo = utilizadorAtual.perfil === 'GUEST' ? 'Visitante' : utilizadorAtual.perfil === 'CLIENTE' ? 'Cliente' : 'Administrador';
    if (els.accessLabel) els.accessLabel.textContent = rotulo;
    if (els.drawerRole) els.drawerRole.textContent = utilizadorAtual.perfil;
    if (els.demoLogin) els.demoLogin.hidden = verificarAcesso('CLIENTE');
    if (els.demoLogout) els.demoLogout.hidden = !verificarAcesso('CLIENTE');
    if (els.accountLogin) els.accountLogin.hidden = verificarAcesso('CLIENTE');
    if (els.accountLogout) els.accountLogout.hidden = !verificarAcesso('CLIENTE');
    if (els.accountTitle) els.accountTitle.textContent = verificarAcesso('CLIENTE') ? `Olá, ${utilizadorAtual.nome}` : 'Acesso de visitante';
    if (els.accountText) els.accountText.textContent = verificarAcesso('CLIENTE') ? `Perfil atual: ${utilizadorAtual.perfil}. Ações de compra estão liberadas.` : 'Entre para habilitar ações de compra no catálogo.';
    renderizarProdutos();
  }

  function loginDemo() {
    utilizadorAtual.nome = 'Cliente';
    utilizadorAtual.perfil = 'CLIENTE';
    storageSet('esquinaMixRole', 'CLIENTE');
    atualizarAcesso();
    fecharConta();
    showToast('Acesso de cliente ativado para demonstração.');
  }

  function logoutDemo() {
    utilizadorAtual.nome = 'Visitante';
    utilizadorAtual.perfil = 'GUEST';
    storageSet('esquinaMixRole', 'GUEST');
    atualizarAcesso();
    showToast('Sessão de demonstração encerrada.');
  }

  function abrirConta() {
    if (!els.accountDialog) return;
    if (typeof els.accountDialog.showModal === 'function') els.accountDialog.showModal();
    else els.accountDialog.setAttribute('open', '');
  }

  function fecharConta() {
    if (!els.accountDialog) return;
    if (els.accountDialog.open && typeof els.accountDialog.close === 'function') els.accountDialog.close();
    else els.accountDialog.removeAttribute('open');
  }

  /* ---------- NAV DRAWER ---------- */
  function abrirDrawer() {
    if (!els.drawer || !els.drawerBackdrop) return;
    fecharCarrinho({ restore: false });
    els.drawerBackdrop.hidden = false;
    requestAnimationFrame(() => els.drawerBackdrop.classList.add('is-visible'));
    els.drawer.classList.add('is-open');
    els.drawer.setAttribute('aria-hidden', 'false');
    els.menuTrigger?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
    els.drawerClose?.focus();
  }

  function fecharDrawer({ restore = true } = {}) {
    if (!els.drawer || !els.drawerBackdrop || !els.drawer.classList.contains('is-open')) return;
    els.drawer.classList.remove('is-open');
    els.drawer.setAttribute('aria-hidden', 'true');
    els.drawerBackdrop.classList.remove('is-visible');
    els.menuTrigger?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
    setTimeout(() => {
      els.drawerBackdrop.hidden = true;
      if (restore) els.menuTrigger?.focus();
    }, 270);
  }

  /* ---------- CATALOG ---------- */
  function categorias() {
    return ['Todos', ...new Set(produtos.map(p => p.categoria))];
  }

  function renderizarFiltros() {
    if (!els.categoryFilters) return;
    els.categoryFilters.innerHTML = categorias().map(cat => `<button class="filter-btn${cat === filtroAtual ? ' is-active' : ''}" type="button" data-category="${escapeHTML(cat)}">${escapeHTML(cat)}</button>`).join('');
  }

  function produtosFiltrados() {
    const termo = buscaAtual.trim().toLocaleLowerCase('pt-BR');
    const lista = produtos.filter(prod => {
      const categoriaOk = filtroAtual === 'Todos' || prod.categoria === filtroAtual;
      const buscaOk = !termo || `${prod.nome} ${prod.volume || ''} ${prod.categoria} ${prod.descricao}`.toLocaleLowerCase('pt-BR').includes(termo);
      return categoriaOk && buscaOk;
    });
    return lista.sort((a,b) => {
      if (ordenacaoAtual === 'menor-preco') return a.preco - b.preco;
      if (ordenacaoAtual === 'maior-preco') return b.preco - a.preco;
      if (ordenacaoAtual === 'nome') return a.nome.localeCompare(b.nome, 'pt-BR');
      return Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)) || Number(Boolean(b.promocao)) - Number(Boolean(a.promocao)) || a.id - b.id;
    });
  }

  function renderizarProdutos() {
    if (!els.productGrid) return;
    const lista = produtosFiltrados();
    if (els.catalogCount) els.catalogCount.textContent = String(lista.length);
    if (!lista.length) {
      els.productGrid.innerHTML = '<div class="empty-state">Nenhum produto encontrado para este filtro.</div>';
      return;
    }

    els.productGrid.innerHTML = lista.map(prod => {
      const podeComprar = verificarAcesso('CLIENTE');
      const admin = verificarAcesso('ADMIN');
      return `
        <article class="product-card" data-product-id="${prod.id}">
          ${admin ? '<span class="admin-badge">ADMIN</span>' : ''}
          ${prod.promocao && prod.precoDe > prod.preco ? `<span class="product-discount">-${Math.round((1-prod.preco/prod.precoDe)*100)}%</span>` : ''}
          <button class="product-favorite" type="button" data-favorite="${prod.id}" aria-label="Favoritar ${escapeHTML(prod.nome)}" aria-pressed="false">♡</button>
          <div class="product-media"><img src="${prod.imagem}" data-product-image="${prod.id}" alt="${escapeHTML(prod.nome)}" loading="lazy" decoding="async"></div>
          <div class="product-body">
            <span class="product-category">${escapeHTML(prod.categoria.toUpperCase())}</span>
            <h3>${escapeHTML(prod.nome)}</h3>
            <p class="product-volume">${escapeHTML(prod.volume || '')}</p>
            <p class="product-desc">${escapeHTML(prod.descricao)}</p>
            <div class="product-pricing">${prod.precoDe && prod.precoDe > prod.preco ? `<del>${moeda(prod.precoDe)}</del>` : ''}<strong class="product-price">${moeda(prod.preco)}</strong></div>
            <div class="stock-line ${prod.estoque <= 5 ? 'is-low' : ''}"><span></span>${prod.estoque <= 5 ? 'Últimas unidades' : 'Em estoque'}</div>
            <div class="product-footer">
              <div class="card-qty" aria-label="Quantidade de ${escapeHTML(prod.nome)}">
                <button type="button" data-card-dec="${prod.id}" aria-label="Diminuir quantidade">−</button>
                <span data-card-qty="${prod.id}" aria-live="polite">1</span>
                <button type="button" data-card-inc="${prod.id}" aria-label="Aumentar quantidade">+</button>
              </div>
              <button class="product-action${podeComprar ? '' : ' login-required'}" type="button" data-add="${prod.id}">
                <span>${podeComprar ? 'ADICIONAR' : 'ENTRAR'}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h-2l-1 2m3 0h13l-2 8H9L7 6Zm2 12a1.5 1.5 0 1 0 0 .01M17 18a1.5 1.5 0 1 0 0 .01M12 8v4m-2-2h4"/></svg>
              </button>
            </div>
          </div>
        </article>`;
    }).join('');
    atualizarFavoritosVisuais();
  }

  /* ---------- OFFERS CAROUSEL ---------- */
  function produtosPromocionais() {
    return produtos.filter(prod => {
      const atual = Number(prod.preco);
      const anterior = Number(prod.precoDe);
      return prod.promocao === true &&
        Number.isFinite(atual) &&
        Number.isFinite(anterior) &&
        atual > 0 &&
        anterior > atual &&
        prod.imagem &&
        prod.nome;
    });
  }

  function renderizarOfertas() {
    if (!els.offersTrack) return;
    const ofertas = produtosPromocionais();
    if (!ofertas.length) {
      els.offersTrack.innerHTML = '<div class="offers-empty" role="status">Nenhuma promoção ativa neste momento.</div>';
      if (els.offersUpdated) els.offersUpdated.textContent = 'Ofertas indisponíveis • tente novamente em instantes';
      if (els.offersPrev) els.offersPrev.disabled = true;
      if (els.offersNext) els.offersNext.disabled = true;
      return;
    }
    const ofertasVisiveis = ofertas.slice(0, 6);
    els.offersTrack.innerHTML = ofertasVisiveis.map(prod => {
      const desconto = Math.round((1 - prod.preco / prod.precoDe) * 100);
      const podeComprar = verificarAcesso('CLIENTE');
      return `
        <article class="offer-card" data-product-id="${prod.id}">
          <span class="offer-badge">-${desconto}%</span>
          <div class="offer-media"><img src="${prod.imagem}" alt="${escapeHTML(prod.nome)}" loading="lazy"></div>
          <div class="offer-copy">
            <span>${escapeHTML(prod.categoria.toUpperCase())}</span>
            <h3>${escapeHTML(prod.nome)}</h3>
            <div class="offer-price"><del>${moeda(prod.precoDe)}</del><strong>${moeda(prod.preco)}</strong></div>
            <button class="offer-add${podeComprar ? '' : ' login-required'}" type="button" data-add="${prod.id}">${podeComprar ? 'ADICIONAR' : 'ENTRAR'}</button>
          </div>
        </article>`;
    }).join('');
    if (els.offersUpdated) {
      els.offersUpdated.textContent = `Ofertas ativas • atualizado ${new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit'}).format(new Date())}`;
    }
    atualizarSetasOfertas();
  }

  function passoOfertas() {
    const card = els.offersTrack?.querySelector('.offer-card');
    if (!card || !els.offersViewport) return 320;
    const gap = parseFloat(getComputedStyle(els.offersTrack).gap) || 16;
    return card.getBoundingClientRect().width + gap;
  }

  function moverOfertas(direcao) {
    if (!els.offersViewport) return;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    els.offersViewport.scrollBy({ left: passoOfertas() * direcao, behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  function atualizarSetasOfertas() {
    if (!els.offersViewport) return;
    const max = Math.max(0, els.offersViewport.scrollWidth - els.offersViewport.clientWidth - 2);
    if (els.offersPrev) els.offersPrev.disabled = els.offersViewport.scrollLeft <= 2;
    if (els.offersNext) els.offersNext.disabled = els.offersViewport.scrollLeft >= max;
  }

  /* ---------- CART ---------- */
  function carregarCarrinho() {
    try {
      const parsed = JSON.parse(storageGet('esquinaMixCart') || '{}');
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
      return Object.fromEntries(Object.entries(parsed).filter(([id, qty]) => produtos.some(p => p.id === Number(id)) && Number.isInteger(qty) && qty > 0));
    } catch { return {}; }
  }

  function salvarCarrinho() {
    storageSet('esquinaMixCart', JSON.stringify(carrinho));
  }

  function quantidadeCarrinho() {
    return Object.values(carrinho).reduce((sum, qty) => sum + qty, 0);
  }

  function subtotalCarrinho() {
    return Object.entries(carrinho).reduce((sum, [id, qty]) => {
      const produto = produtos.find(p => p.id === Number(id));
      return sum + (produto ? produto.preco * qty : 0);
    }, 0);
  }

  function renderizarCarrinho({ animateBadge = false } = {}) {
    const totalQtd = quantidadeCarrinho();
    if (els.cartCount) {
      els.cartCount.textContent = String(totalQtd);
      if (animateBadge) bounce(els.cartCount);
    }
    els.cartButton?.setAttribute('aria-label', `Carrinho, ${totalQtd} ${totalQtd === 1 ? 'item' : 'itens'}`);
    if (els.cartSubtotal) els.cartSubtotal.textContent = moeda(subtotalCarrinho());
    if (els.checkoutButton) els.checkoutButton.disabled = totalQtd === 0;
    if (els.cartEmpty) els.cartEmpty.hidden = totalQtd > 0;
    if (!els.cartItems) return;

    const itens = Object.entries(carrinho).map(([id, qty]) => ({ produto: produtos.find(p => p.id === Number(id)), qty })).filter(item => item.produto);
    els.cartItems.hidden = !itens.length;
    els.cartItems.innerHTML = itens.map(({ produto, qty }) => `
      <article class="cart-item" data-cart-item="${produto.id}">
        <div class="cart-item-media"><img src="${produto.imagem}" alt=""></div>
        <div class="cart-item-info">
          <strong>${escapeHTML(produto.nome)}</strong>
          <small>${moeda(produto.preco)} cada</small>
          <div class="cart-item-controls" aria-label="Quantidade de ${escapeHTML(produto.nome)}">
            <button class="qty-button" type="button" data-cart-dec="${produto.id}" aria-label="Diminuir quantidade">−</button>
            <span class="qty-value">${qty}</span>
            <button class="qty-button" type="button" data-cart-inc="${produto.id}" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
        <div class="cart-item-price">${moeda(produto.preco * qty)}<button class="cart-remove" type="button" data-cart-remove="${produto.id}">remover</button></div>
      </article>`).join('');
  }

  function adicionarAoCarrinho(id, { abrir = true, quantidade = 1 } = {}) {
    const produto = produtos.find(p => p.id === Number(id));
    if (!produto) return;
    if (!verificarAcesso('CLIENTE')) {
      showToast('Efetue login para adicionar produtos.');
      abrirConta();
      return;
    }
    const qtd = Math.max(1, Math.min(Number(quantidade) || 1, produto.estoque || 99));
    carrinho[produto.id] = Math.min((carrinho[produto.id] || 0) + qtd, produto.estoque || 99);
    salvarCarrinho();
    renderizarCarrinho({ animateBadge: true });
    showToast(`${qtd}x ${produto.nome} adicionado ao carrinho ✨`);
    if (abrir) abrirCarrinho();
  }

  function alterarQuantidade(id, delta) {
    id = Number(id);
    if (!carrinho[id]) return;
    carrinho[id] += delta;
    if (carrinho[id] <= 0) delete carrinho[id];
    salvarCarrinho();
    renderizarCarrinho({ animateBadge: true });
  }

  function removerDoCarrinho(id) {
    delete carrinho[Number(id)];
    salvarCarrinho();
    renderizarCarrinho({ animateBadge: true });
  }

  function abrirCarrinho() {
    if (!els.cartDrawer || !els.cartBackdrop) return;
    fecharDrawer({ restore: false });
    els.cartBackdrop.hidden = false;
    requestAnimationFrame(() => els.cartBackdrop.classList.add('is-visible'));
    els.cartDrawer.classList.add('is-open');
    els.cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-open');
    els.cartClose?.focus();
  }

  function fecharCarrinho({ restore = true } = {}) {
    if (!els.cartDrawer || !els.cartBackdrop || !els.cartDrawer.classList.contains('is-open')) return;
    els.cartDrawer.classList.remove('is-open');
    els.cartDrawer.setAttribute('aria-hidden', 'true');
    els.cartBackdrop.classList.remove('is-visible');
    document.body.classList.remove('cart-open');
    setTimeout(() => {
      els.cartBackdrop.hidden = true;
      if (restore) els.cartButton?.focus();
    }, 270);
  }

  function finalizarPedido() {
    const itens = Object.entries(carrinho).map(([id, qty]) => ({ produto: produtos.find(p => p.id === Number(id)), qty })).filter(i => i.produto);
    if (!itens.length) return showToast('Adicione produtos antes de finalizar.');
    if (!verificarAcesso('CLIENTE')) return abrirConta();

    const linhas = [
      'Olá! Quero finalizar meu pedido na Esquina Mix:',
      '',
      ...itens.map(({ produto, qty }) => `• ${qty}x ${produto.nome} — ${moeda(produto.preco * qty)}`),
      '',
      `Subtotal: ${moeda(subtotalCarrinho())}`,
      '',
      'Pode confirmar disponibilidade, taxa de entrega e formas de pagamento?'
    ];
    const url = `https://wa.me/?text=${encodeURIComponent(linhas.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Resumo do pedido preparado para o WhatsApp.');
  }

  /* ---------- CHAT ---------- */
  const respostasChat = {
    taxa: 'A taxa de entrega depende do endereço e da distância. Envie seu bairro/endereço no atendimento para receber o valor correto.',
    pagamento: 'As formas de pagamento devem ser confirmadas no fechamento do pedido. Ao finalizar, o atendimento recebe seu resumo e pode informar as opções disponíveis.',
    horario: 'A Esquina Mix divulga atendimento 24h. A disponibilidade de itens pode variar; consulte o catálogo ou o atendimento para confirmar.',
    entrega: 'A entrega é organizada conforme sua região e disponibilidade. Informe seu bairro para confirmar prazo e taxa.',
    produto: 'Posso orientar pelo catálogo. Use a busca ou diga o nome/categoria do produto que procura.'
  };

  function abrirChat() {
    if (!els.chatPanel) return;
    els.chatPanel.hidden = false;
    els.chatLauncher?.setAttribute('aria-expanded', 'true');
    setTimeout(() => els.chatInput?.focus(), 10);
  }

  function fecharChat() {
    if (!els.chatPanel) return;
    els.chatPanel.hidden = true;
    els.chatLauncher?.setAttribute('aria-expanded', 'false');
  }

  function addChatBubble(text, type) {
    if (!els.chatMessages) return;
    const div = document.createElement('div');
    div.className = `chat-bubble ${type}`;
    div.textContent = text;
    els.chatMessages.appendChild(div);
    els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
  }

  function responderChat(text) {
    const t = text.toLocaleLowerCase('pt-BR');
    if (/taxa|frete|valor.*entrega/.test(t)) return respostasChat.taxa;
    if (/pagamento|pagar|pix|cart[aã]o|dinheiro/.test(t)) return respostasChat.pagamento;
    if (/hor[aá]rio|aberto|fecha|24h/.test(t)) return respostasChat.horario;
    if (/entrega|delivery|prazo|bairro/.test(t)) return respostasChat.entrega;
    if (/produto|estoque|tem|bebida|combo|gelo/.test(t)) return respostasChat.produto;
    return 'Posso ajudar com taxa de entrega, pagamento, horário e produtos. Escolha uma opção rápida ou escreva sua dúvida com mais detalhes.';
  }

  function enviarChat(text) {
    const value = String(text || '').trim();
    if (!value) return;
    addChatBubble(value, 'user');
    setTimeout(() => addChatBubble(responderChat(value), 'bot'), 260);
  }

  /* ---------- EVENTS ---------- */
  els.ageConfirm?.addEventListener('click', confirmarIdade);
  els.ageDeny?.addEventListener('click', negarIdade);
  els.ageDeniedBack?.addEventListener('click', voltarAgeGate);

  els.menuTrigger?.addEventListener('click', () => els.drawer?.classList.contains('is-open') ? fecharDrawer() : abrirDrawer());
  els.drawerClose?.addEventListener('click', () => fecharDrawer());
  els.drawerBackdrop?.addEventListener('click', () => fecharDrawer());
  qsa('.drawer nav a').forEach(link => link.addEventListener('click', () => fecharDrawer({ restore: false })));

  els.orderButton?.addEventListener('click', () => {
    const target = qs('#produtos') || qs('#ofertas');
    target?.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    showToast('Veja o catálogo e escolha seus produtos.');
  });
  els.cartButton?.addEventListener('click', abrirCarrinho);
  els.cartClose?.addEventListener('click', () => fecharCarrinho());
  els.cartBackdrop?.addEventListener('click', () => fecharCarrinho());
  els.cartShopLink?.addEventListener('click', () => fecharCarrinho({ restore: false }));
  els.checkoutButton?.addEventListener('click', finalizarPedido);
  els.cartItems?.addEventListener('click', event => {
    const inc = event.target.closest('[data-cart-inc]');
    const dec = event.target.closest('[data-cart-dec]');
    const remove = event.target.closest('[data-cart-remove]');
    if (inc) alterarQuantidade(inc.dataset.cartInc, 1);
    if (dec) alterarQuantidade(dec.dataset.cartDec, -1);
    if (remove) removerDoCarrinho(remove.dataset.cartRemove);
  });

  els.categoryFilters?.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    filtroAtual = button.dataset.category;
    renderizarFiltros();
    renderizarProdutos();
  });

  els.catalogSearch?.addEventListener('input', event => { buscaAtual = event.target.value || ''; renderizarProdutos(); });
  els.catalogSort?.addEventListener('change', event => { ordenacaoAtual = event.target.value; renderizarProdutos(); });

  const favoritos = new Set(JSON.parse(storageGet('esquinaMixFavorites') || '[]').map(Number));
  function salvarFavoritos(){ storageSet('esquinaMixFavorites', JSON.stringify([...favoritos])); }
  function atualizarFavoritosVisuais(){
    els.productGrid?.querySelectorAll('[data-favorite]').forEach(btn => {
      const ativo = favoritos.has(Number(btn.dataset.favorite));
      btn.classList.toggle('is-active', ativo);
      btn.setAttribute('aria-pressed', String(ativo));
      btn.textContent = ativo ? '♥' : '♡';
    });
  }
  function fallbackImagemProduto(img){
    const card = img.closest('[data-product-id]');
    const prod = produtos.find(p => p.id === Number(card?.dataset.productId));
    if (!prod || img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = '1';
    const mapa = {
      'Cervejas':'assets/products/beer.svg','Energéticos':'assets/products/energy.svg','Gelo':'assets/products/ice.svg',
      'Combos':'assets/products/combo.svg','Conveniência':'assets/products/snack.svg','Tabacaria':'assets/products/tabacaria.svg'
    };
    img.src = mapa[prod.categoria] || 'assets/products/party.svg';
  }

  els.productGrid?.addEventListener('error', event => {
    if (event.target?.matches('img[data-product-image]')) fallbackImagemProduto(event.target);
  }, true);

  els.productGrid?.addEventListener('click', event => {
    const fav = event.target.closest('[data-favorite]');
    if (fav) {
      const id = Number(fav.dataset.favorite);
      favoritos.has(id) ? favoritos.delete(id) : favoritos.add(id);
      salvarFavoritos();
      atualizarFavoritosVisuais();
      return;
    }
    const inc = event.target.closest('[data-card-inc]');
    const dec = event.target.closest('[data-card-dec]');
    const add = event.target.closest('[data-add]');
    const control = inc || dec;
    if (control) {
      const id = Number(control.dataset.cardInc || control.dataset.cardDec);
      const value = els.productGrid.querySelector(`[data-card-qty="${id}"]`);
      const produto = produtos.find(p => p.id === id);
      if (!value || !produto) return;
      const atual = Number(value.textContent) || 1;
      value.textContent = String(Math.max(1, Math.min(atual + (inc ? 1 : -1), produto.estoque || 99)));
      return;
    }
    if (!add) return;
    const qty = Number(els.productGrid.querySelector(`[data-card-qty="${add.dataset.add}"]`)?.textContent) || 1;
    adicionarAoCarrinho(add.dataset.add, { quantidade: qty });
  });

  els.offersTrack?.addEventListener('click', event => {
    const button = event.target.closest('[data-add]');
    if (!button) return;
    adicionarAoCarrinho(button.dataset.add);
  });
  els.offersPrev?.addEventListener('click', () => moverOfertas(-1));
  els.offersNext?.addEventListener('click', () => moverOfertas(1));
  let offersScrollFrame = 0;
  els.offersViewport?.addEventListener('scroll', () => {
    cancelAnimationFrame(offersScrollFrame);
    offersScrollFrame = requestAnimationFrame(atualizarSetasOfertas);
  }, { passive: true });
  let offersResizeFrame = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(offersResizeFrame);
    offersResizeFrame = requestAnimationFrame(atualizarSetasOfertas);
  }, { passive: true });

  if ('ResizeObserver' in window && els.offersViewport) {
    const offersResizeObserver = new ResizeObserver(() => atualizarSetasOfertas());
    offersResizeObserver.observe(els.offersViewport);
  }

  els.offersViewport?.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); moverOfertas(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); moverOfertas(1); }
    if (event.key === 'Home') { event.preventDefault(); els.offersViewport.scrollTo({ left: 0, behavior: 'smooth' }); }
    if (event.key === 'End') { event.preventDefault(); els.offersViewport.scrollTo({ left: els.offersViewport.scrollWidth, behavior: 'smooth' }); }
  });

  els.searchForm?.addEventListener('submit', event => {
    event.preventDefault();
    buscaAtual = els.searchInput?.value || '';
    filtroAtual = 'Todos';
    renderizarFiltros();
    renderizarProdutos();
    qs('#produtos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(buscaAtual.trim() ? `Resultados para “${buscaAtual.trim()}”.` : 'Catálogo completo exibido.');
  });

  els.profileButton?.addEventListener('click', abrirConta);
  els.accountClose?.addEventListener('click', fecharConta);
  els.accountDialog?.addEventListener('click', event => { if (event.target === els.accountDialog) fecharConta(); });
  els.demoLogin?.addEventListener('click', loginDemo);
  els.demoLogout?.addEventListener('click', logoutDemo);
  els.accountLogin?.addEventListener('click', loginDemo);
  els.accountLogout?.addEventListener('click', logoutDemo);

  els.chatLauncher?.addEventListener('click', () => els.chatPanel?.hidden ? abrirChat() : fecharChat());
  els.faqChatButton?.addEventListener('click', abrirChat);
  els.footerChatButton?.addEventListener('click', abrirChat);
  els.chatClose?.addEventListener('click', fecharChat);
  qsa('[data-chat-topic]').forEach(button => button.addEventListener('click', () => {
    const topic = button.dataset.chatTopic;
    addChatBubble(button.textContent, 'user');
    setTimeout(() => addChatBubble(respostasChat[topic] || respostasChat.produto, 'bot'), 220);
  }));
  els.chatForm?.addEventListener('submit', event => {
    event.preventDefault();
    const value = els.chatInput?.value || '';
    if (!value.trim()) return;
    enviarChat(value);
    if (els.chatInput) els.chatInput.value = '';
  });

  els.backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => els.backToTop?.classList.toggle('is-visible', window.scrollY > 520), { passive: true });

  qsa('.nav-link').forEach(link => link.addEventListener('click', () => {
    qsa('.nav-link').forEach(item => item.classList.remove('is-active'));
    link.classList.add('is-active');
  }));

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (els.ageGate && !els.ageGate.hidden) return;
    if (els.cartDrawer?.classList.contains('is-open')) return fecharCarrinho();
    if (els.drawer?.classList.contains('is-open')) return fecharDrawer();
    if (els.chatPanel && !els.chatPanel.hidden) fecharChat();
  });

  const revealItems = qsa('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    revealItems.forEach(item => io.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  window.EsquinaMix = Object.freeze({
    produtos: () => produtos.map(p => ({ ...p })),
    verificarAcesso,
    renderizarProdutos,
    renderizarOfertas,
    abrirCarrinho,
    setRole(role) {
      if (!Object.hasOwn(niveis, role)) return false;
      utilizadorAtual.perfil = role;
      utilizadorAtual.nome = role === 'GUEST' ? 'Visitante' : role === 'CLIENTE' ? 'Cliente' : 'Administrador';
      storageSet('esquinaMixRole', role);
      atualizarAcesso();
      return true;
    },
    resetAgeGate() {
      storageRemove('esquinaMixAge18');
      sessionRemove('esquinaMixAgeDenied');
      location.reload();
    }
  });

  if (els.footerYear) els.footerYear.textContent = String(new Date().getFullYear());
  renderizarFiltros();
  renderizarOfertas();
  requestAnimationFrame(atualizarSetasOfertas);
  atualizarAcesso();
  renderizarCarrinho();
  iniciarAgeGate();
})();
