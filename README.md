# Adega e Tabacaria Esquina Mix

Cardapio digital responsivo, sem framework e sem dependencias de build.

## Estrutura
- `index.html`: interface, estilos responsivos e interacoes do catalogo/sacola.
- `assets/esquina-mix-hero.webp`: banner panoramico aprovado (2170 x 725). Adicionar este arquivo para ativar a arte oficial do hero.

## Configuracoes pendentes
1. Substituir os itens demonstrativos em `products` pelos produtos, descricoes e precos reais.
2. Configurar `WHATSAPP_NUMBER` com DDI + DDD + numero oficial, somente digitos.
3. Adicionar o arquivo `assets/esquina-mix-hero.webp` com o banner aprovado.

O catalogo atual e demonstrativo; os valores e a disponibilidade devem ser confirmados com a loja. O carrinho persiste no navegador. A finalizacao abre o WhatsApp apos configurar o numero.

## Publicacao
Projeto estatico. Basta conectar a branch `main` na Vercel; nao requer comando de build nem instalacao de pacotes.
