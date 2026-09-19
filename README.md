# Esquina Mix Delivery — V4

Atualização incremental sobre o visual neon responsivo já auditado, preservando os elementos funcionais, IDs, navegação, carrinho, chat, Age Gate e checkout.

## Novos componentes

- Age Gate 18+ obrigatório na entrada, com confirmação persistida em `localStorage`.
- Recusa de idade bloqueia o conteúdo durante a sessão até o usuário voltar à pergunta.
- Carrinho lateral com itens, quantidade, remoção, subtotal e persistência local.
- Checkout prepara resumo estruturado e abre o WhatsApp (`wa.me`) para continuidade do pedido.
- Chat “Esquina Mix IA” com respostas rápidas para taxa, pagamento e horário, além de entrada livre.
- Botão de voltar ao topo com coroa e glow da marca.
- Refinos de copy/glow sem alterar a geometria principal do banner.

## Arquivos principais

- `index.html`
- `styles.css`
- `app.js`
- `assets/`

## Observações de produção

O Age Gate é uma barreira de UX e não substitui validações jurídicas, de idade, pagamento, estoque ou autorização no backend. Perfis CLIENTE/ADMIN no projeto continuam sendo demonstrações frontend e devem ser validados no servidor em produção.

Para WhatsApp com número fixo, altere a função `finalizarPedido()` em `app.js` para usar `https://wa.me/SEU_NUMERO?text=...`.

## V4 — refinamento visual

- Letreiro superior em marquee contínuo e lento, com loop infinito e suporte a `prefers-reduced-motion`.
- Logo do header utiliza recorte transparente dedicado para eliminar margem vazia e evitar aparência cortada.
- Hero recebeu refinamento de contraste, traço, glow e composição de “Sua Bebida” sobre “GELADA”, sem alterar os gatilhos funcionais.
- Fundo neon usa derivativo WebP de alta qualidade com fallback estrutural já preservado no projeto.
