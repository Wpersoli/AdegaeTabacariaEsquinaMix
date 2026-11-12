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
