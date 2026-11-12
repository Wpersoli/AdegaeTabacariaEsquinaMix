# Adega e Tabacaria Esquina Mix

Cardapio digital responsivo, sem framework e sem dependencias de build.

## Estrutura
- `index.html`: estrutura da pagina; `styles.css`: estilos; `app.js`: catalogo, busca, sacola e envio por WhatsApp.
- `assets/esquina-mix-hero.webp`: banner panoramico oficial do hero (2048 x 684).
- `assets/esquina-mix-logo.webp` + `@2x`: logo otimizada usada no cabecalho e rodape.
- `assets/esquina-mix-logo-hd.png`: arquivo-fonte em alta resolucao da logo (nao e carregado diretamente pelo site; usar para reimpressao/novas artes).
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
