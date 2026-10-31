# Esquina Mix Delivery

Frontend estático da Adega & Tabacaria Esquina Mix, com identidade neon, catálogo, ofertas, carrinho e atendimento.

## Recursos atuais

- Age Gate de 18+ na entrada, com persistência local e bloqueio da interface até a confirmação.
- Catálogo com 48 itens, filtros por categoria, busca sem distinção de acentos e ordenação.
- Ofertas em carrossel, imagens com fallback local e respeito a `prefers-reduced-motion`.
- Favoritos e carrinho persistidos no dispositivo; quantidades limitadas ao estoque cadastrado no catálogo.
- Menu responsivo, drawer do carrinho, chat de respostas rápidas e onboarding opcional por GPS/CEP.
- Checkout que gera um resumo do pedido e abre o WhatsApp.

## Configuração do WhatsApp comercial

No `index.html`, preencha o atributo `content` da meta abaixo com o número comercial em formato internacional, somente dígitos (DDI + DDD + número), sem `+`, espaços ou pontuação:

```html
<meta name="esquina-whatsapp" content="5511999999999">
```

Sem essa configuração, o site abre o WhatsApp sem destinatário pré-selecionado e o cliente precisa escolher manualmente o contato correto. Não use um número de exemplo em produção.

## Validação automatizada

O workflow `.github/workflows/quality.yml` executa:

1. Verificação de sintaxe JavaScript com Node.js.
2. Auditoria de IDs, referências locais de assets e recursos obrigatórios.
3. Testes de navegador Chromium/Playwright para Age Gate, persistência corrompida, papel de visitante, catálogo, busca sem acentos, filtros, carrinho, limite de estoque, menu e chat.
4. Verificação de overflow horizontal em 320, 360, 375, 390, 430, 768, 1024, 1366 e 1920 pixels.
5. Emulação mobile Chromium com toque (perfil Android) e WebKit mobile com toque (aproximação do motor Safari/iOS).
6. Upload do relatório JSON e capturas de tela como artefatos do workflow.

Os testes automatizados de Chromium não substituem validação física em Safari/iOS, Chrome/Android, dispositivos reais, leitor de tela ou testes de compra com o número comercial.

## Limites de produção que exigem serviços externos

Este repositório é um frontend estático. O Age Gate é uma confirmação de interface, não uma verificação legal de idade. Perfis CLIENTE/ADMIN são demonstrações locais, não autenticação segura. Estoque e preços no JavaScript não são fonte transacional confiável. Para operação comercial real com controle de acesso, inventário, pedidos, pagamentos e validação de idade, é necessário backend/API e persistência segura.

## Arquivos principais

- `index.html` — estrutura, metadados e configuração de canal comercial.
- `styles.css` — identidade visual e responsividade.
- `app.js` — catálogo, filtros, carrinho, onboarding e interações.
- `assets/` — logos, fundos e imagens de fallback.
- `audit_static.py` / `audit_browser.py` — verificações automatizadas.
