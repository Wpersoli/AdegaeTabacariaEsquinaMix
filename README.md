# Adega e Tabacaria Esquina Mix

Cardapio digital responsivo, sem framework e sem dependencias de build.

## Estrutura
- `index.html`: estrutura da pagina; `styles.css`: estilos; `app.js`: catalogo, busca, sacola e envio por WhatsApp.
- `assets/hero-desktop.webp` / `hero-mobile.webp`: banners do hero. `assets/og-image.jpg`: imagem de compartilhamento (1200x630).
- `design-src/`: artes-fonte (logo HD etc.). Fica no Git, mas NAO vai para o site (`.vercelignore`).
- `assets/marcas/`: logos da secao "Frota oficial" (letreiro borda a borda, loop para a esquerda). Para incluir/remover marca, edite o array `brands` em `app.js` e adicione o `.webp` nessa pasta.
- Animacao dos logos da frota: flutuacao escalonada, brilho que atravessa o bloco e destaque no hover, tudo em CSS (final do `styles.css`). Desativa sozinha com "reduzir movimento" do sistema.
- Botoes flutuantes (canto direito): WhatsApp fixo e "voltar ao topo" logo acima (aparece apos rolar 400px). O numero do WhatsApp do botao vem da meta `esquina-whatsapp`. Os dois letreiros (barra "Retira no balcao" e "Frota oficial") correm em loop continuo para a esquerda, inclusive com "reduzir movimento" ativo.
- `assets/favicon.ico`, `favicon-48.png`, `apple-touch-icon.png`: icones gerados a partir da logo oficial.

## Identidade visual
- Tipografia: `DM Sans` (Google Fonts) para titulos e corpo de texto, substituindo a combinacao anterior Barlow Condensed + Inter, alinhando o estilo de fonte ao site de referencia informado pelo cliente.
- Paleta de cores (rosa/dourado/ciano sobre fundo escuro) mantida conforme o manual da marca Esquina Mix.
- Elementos funcionais adicionados: barra de avisos com ticker animado, botao flutuante do WhatsApp, barra fixa de sacola no mobile, favoritos (coracao) por produto e microanimacao de "Adicionado" no botao de compra.

## Configuracoes pendentes
1. Substituir os itens demonstrativos em `catalog` (`app.js`) pelos produtos, descricoes e precos reais.
2. Numero do WhatsApp: fica na tag `<meta name="esquina-whatsapp">` do `index.html` (DDI + DDD + numero, so digitos) e nos links `wa.me` da pagina.
3. Revisar os textos de `Atendimento` no rodape e no ticker (horario de funcionamento, bairro/regiao de entrega).

O catalogo atual e demonstrativo; os valores e a disponibilidade devem ser confirmados com a loja. O carrinho e os favoritos persistem no navegador (localStorage). A finalizacao abre o WhatsApp apos configurar o numero.

## Publicacao
Projeto estatico. Basta conectar a branch `main` na Vercel; nao requer comando de build nem instalacao de pacotes.

## Seguranca e deploy
- `vercel.json`: CSP restritiva, HSTS, Permissions-Policy, COOP, nosniff. Se adicionar qualquer dominio externo (analytics, fontes, iframes), inclua-o na CSP.
- `robots.txt` e `sitemap.xml` na raiz; ao trocar para dominio proprio, atualize canonical, og:url, sitemap e JSON-LD.
- Horario de funcionamento: constantes `OPEN`/`CLOSE` no bloco "Status da loja" de `app.js` e no JSON-LD do `index.html`.

## Mapa e rota
- Ao rolar até a seção do mapa, a localização do visitante é solicitada automaticamente (o botão "Traçar/Atualizar rota" fica como alternativa); ao permitir, o site traça o trajeto no mapa com o tempo de viagem e atualiza ao se deslocar. Modos: carro, a pé, bike, ônibus.
- Sem chave, usa o embed do Google sem API key. Para a rota oficial com trânsito, crie uma chave da **Maps Embed API** no Google Cloud, restrinja por referrer (seu domínio) e cole em `MAPS_KEY` no bloco "Rota até a loja" de `app.js`.
- A CSP já permite os iframes do Google; `geolocation=(self)` está liberado no `vercel.json`.

## Barra do topo
- Cabeçalho + categorias ficam num bloco `.bar` (sticky): somem ao rolar para baixo e reaparecem ao rolar para cima, no desktop e no celular. Não esconde com a sacola aberta, com a busca em foco, logo após clicar numa categoria ou adicionar um item (a barra reaparece para mostrar a sacola). Respeita "reduzir movimento".

## Fotos de produtos
- `assets/produtos/`: fotos padronizadas (800x800, fundo branco, WebP). No `catalog` do `app.js`, use `img:'assets/produtos/arquivo.webp'`.
- `tools/coletar_imagens.py`: coleta e padroniza novas fotos (requer Pillow). Confirme os direitos de uso das imagens antes de publicar.
- Os precos dos itens com foto (ids 12+) sao EXEMPLO e precisam ser substituidos pelos reais.

## App instalável (PWA)
- `manifest.webmanifest` + `sw.js` + `assets/icon-*.png`: o site pode ser instalado como app/atalho.
- O convite aparece depois da confirmação +18 (Android/Chrome/Edge: botão nativo; iPhone/iPad: passo a passo). "Agora não" silencia por 7 dias.
- Ao publicar mudanças grandes, aumente `VERSAO` no `sw.js` para renovar o cache dos visitantes.

## Cabeçalho responsivo (baseado no exemplo de referência)
- Ponto de quebra: **1025px**. Desktop: marca | busca (56px) | conta e sacola (caixas 48px) + barra de categorias centralizada.
- Celular/tablet (≤1024px): hambúrguer 44px | marca centralizada 78px | lupa, conta e sacola 44px sem caixa. A barra horizontal vira um menu em tela cheia (hambúrguer), com subcategorias em sanfona. A lupa abre o campo de busca (com auto-preenchimento) em linha própria.
- **Validar:** `npm i -D playwright && npx playwright install chromium`, depois `python -m http.server 8080` e `node tools/validar_responsivo.js http://localhost:8080` (11 larguras, de 320 a 1920px).
