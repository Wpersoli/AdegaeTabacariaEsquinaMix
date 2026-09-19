# Auditoria V4 — Esquina Mix Delivery

## Resultado técnico

Status: **APROVADO para entrega frontend**.

### Integridade

- `index.html`, `styles.css` e `app.js` presentes.
- `app.js` aprovado em `node --check`.
- Nenhum ID HTML duplicado.
- Nenhuma referência local de asset quebrada.
- Camada V4 foi adicionada de forma incremental, sem alterar IDs, handlers ou a arquitetura dos componentes funcionais previamente auditados.

### Age Gate 18+

- Abre antes da navegação.
- Usa `backdrop-filter` e modal central neon.
- “Sim, tenho 18+” persiste em `localStorage` (`esquinaMixAge18=yes`).
- “Não” mantém o conteúdo bloqueado e mostra aviso de acesso não permitido.
- Conteúdo principal fica `inert` enquanto o gate está ativo.

### Carrinho / Checkout

- Drawer lateral independente do drawer de navegação.
- Itens com imagem, preço unitário, quantidade `- / +`, remoção e subtotal.
- Carrinho persistido em `localStorage`.
- Badge do header sincronizado com quantidades.
- Checkout cria resumo estruturado e encaminha para WhatsApp.

### Chat

- Launcher flutuante com indicador online.
- Painel “Esquina Mix IA — resposta rápida”.
- Chips Taxa / Pagamento / Horário.
- Campo livre com respostas predefinidas por intenção.

### Navegação

- Botão de voltar ao topo aparece após scroll.
- Drawer de menu original preservado.
- Busca, filtros e permissões existentes preservados.

### Responsividade

- Regras específicas adicionadas para <= 760px e <= 420px.
- Carrinho ocupa até 100vw em telas pequenas.
- Chat adapta largura ao viewport.
- Age Gate empilha botões em mobile.

## Limitação da auditoria automatizada

Nesta execução, o navegador headless do ambiente bloqueou navegação local por política administrativa. Por isso, a validação final foi feita por auditoria estática, sintática e de integridade de assets. As imagens de baseline incluídas no pacote pertencem à versão visual imediatamente anterior e servem como referência de geometria preservada.


### Refinamento visual V4

- Letreiro superior: loop contínuo infinito, velocidade reduzida e máscara de borda para transição limpa.
- Logo do header: asset dedicado com transparência recortada, dimensionamento responsivo e área de exibição ampliada sem esticar a arte.
- Hero: refinamento de traço, contraste e glow; “Sua Bebida” foi trazido para a frente visual de “GELADA” sem alterar o HTML funcional dos CTAs.
- Fundo: WebP é usado quando suportado, com PNG como fallback.

### Validação

- `python audit_static.py`: aprovado.
- `node --check app.js`: aprovado.
- IDs duplicados: nenhum.
- Referências locais do HTML: válidas.
- A renderização Chromium local não pôde ser executada neste ambiente por bloqueio administrativo de navegação local; portanto, não foi usada para declarar validação visual automatizada.
