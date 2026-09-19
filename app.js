(() => {
  'use strict';

  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => [...root.querySelectorAll(s)];

  const produtos = [
    { id: 1, nome: 'Whisky Premium', preco: 89.90, categoria: 'Bebidas', imagem: 'assets/products/whisky.svg', descricao: 'Seleção de destilados para pedidos e combos.' },
    { id: 2, nome: 'Cerveja Long Neck', preco: 9.90, categoria: 'Bebidas', imagem: 'assets/products/beer.svg', descricao: 'Long neck gelada pronta para entrega.' },
    { id: 3, nome: 'Energético Gelado', preco: 12.90, categoria: 'Energéticos', imagem: 'assets/products/energy.svg', descricao: 'Lata gelada para completar seu combo.' },
    { id: 4, nome: 'Gelo Premium', preco: 14.90, categoria: 'Gelo', imagem: 'assets/products/ice.svg', descricao: 'Gelo para bebidas e festas, entrega rápida.' },
    { id: 5, nome: 'Combo Esquina', preco: 59.90, categoria: 'Combos', imagem: 'assets/products/combo.svg', descricao: 'Combo especial pronto para personalização.' },
    { id: 6, nome: 'Kit Festa', preco: 99.90, categoria: 'Combos', imagem: 'assets/products/party.svg', descricao: 'Seleção para encontros e comemorações.' },
    { id: 7, nome: 'Conveniência 24h', preco: 19.90, categoria: 'Conveniência', imagem: 'assets/products/snack.svg', descricao: 'Itens rápidos para complementar o pedido.' },
    { id: 8, nome: 'Artigos de Tabacaria', preco: 24.90, categoria: 'Tabacaria', imagem: 'assets/products/tabacaria.svg', descricao: 'Linha de conveniência da tabacaria.' }
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
  let toastTimer = null;
  let carrinho = carregarCarrinho();

  const els = {
    site: qs('.site-shell'),
    ageGate: qs('#ageGate'), ageConfirm: qs('#ageConfirm'), ageDeny: qs('#ageDeny'), ageDeniedPanel: qs('#ageDeniedPanel'), ageDeniedBack: qs('#ageDeniedBack'),
    drawer: qs('#drawer'), drawerBackdrop: qs('#drawerBackdrop'), drawerClose: qs('#drawerClose'), menuTrigger: qs('#menuTrigger'),
    cartCount: qs('#cartCount'), cartButton: qs('#cartButton'), orderButton: qs('#orderButton'), toast: qs('#toast'),
    searchForm: qs('#searchForm'), searchInput: qs('#searchInput'), productGrid: qs('#lista-produtos'), categoryFilters: qs('#categoryFilters'),
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
    return produtos.filter(prod => {
      const categoriaOk = filtroAtual === 'Todos' || prod.categoria === filtroAtual;
      const buscaOk = !termo || `${prod.nome} ${prod.categoria} ${prod.descricao}`.toLocaleLowerCase('pt-BR').includes(termo);
      return categoriaOk && buscaOk;
    });
  }

  function renderizarProdutos() {
    if (!els.productGrid) return;
    const lista = produtosFiltrados();
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
          <div class="product-media"><img src="${prod.imagem}" alt="${escapeHTML(prod.nome)}" loading="lazy"></div>
          <div class="product-body">
            <span class="product-category">${escapeHTML(prod.categoria.toUpperCase())}</span>
            <h3>${escapeHTML(prod.nome)}</h3>
            <p class="product-desc">${escapeHTML(prod.descricao)}</p>
            <div class="product-footer">
              <strong class="product-price">${moeda(prod.preco)}</strong>
              <button class="product-action${podeComprar ? '' : ' login-required'}" type="button" data-add="${prod.id}">${podeComprar ? 'ADICIONAR' : 'ENTRAR'}</button>
            </div>
          </div>
        </article>`;
    }).join('');
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

  function adicionarAoCarrinho(id, { abrir = true } = {}) {
    const produto = produtos.find(p => p.id === Number(id));
    if (!produto) return;
    if (!verificarAcesso('CLIENTE')) {
      showToast('Efetue login para adicionar produtos.');
      abrirConta();
      return;
    }
    carrinho[produto.id] = (carrinho[produto.id] || 0) + 1;
    salvarCarrinho();
    renderizarCarrinho({ animateBadge: true });
    showToast(`${produto.nome} adicionado ao carrinho ✨`);
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

  els.orderButton?.addEventListener('click', () => adicionarAoCarrinho(5));
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

  els.productGrid?.addEventListener('click', event => {
    const button = event.target.closest('[data-add]');
    if (!button) return;
    adicionarAoCarrinho(button.dataset.add);
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

  renderizarFiltros();
  atualizarAcesso();
  renderizarCarrinho();
  iniciarAgeGate();
})();
