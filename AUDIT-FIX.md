# Auditoria — hotfix responsivo V5

Ajustes aplicados sobre o projeto enviado pelo cliente, sem alterar os IDs/handlers funcionais.

## Correções

1. **Logo do header x ticker**
   - O logo agora respeita `--header-h`, não usa deslocamento vertical animado e fica recortado dentro do header.
   - `topbar` volta a controlar overflow para impedir invasão visual sobre o letreiro.

2. **`right-neon-copy` ilegível/esfumaçado**
   - Removido o `drop-shadow` aplicado ao grupo inteiro.
   - Glow passou a ser aplicado por caractere/texto com núcleo nítido, stroke fino e halo curto.
   - Fundo translúcido mínimo melhora contraste sem mudar a composição.

3. **`#orderButton` e `VER PROMOÇÕES` cortados/invisíveis**
   - A linha exagerada do título principal foi corrigida (`line-height`).
   - `.hero-actions` usa grade responsiva ancorada ao `.hero-copy`, com larguras fluidas e `min-width: 0`.
   - Em <= 1030 px os CTAs passam para uma coluna, evitando corte/overflow.

## Validação geométrica automatizada

Testado por Chromium/Playwright com DOM/CSS inline e assets neutralizados apenas para a medição geométrica.

- 1920×1080: logo não invade ticker; ambos CTAs dentro do hero; sem overflow horizontal.
- 1366×768: logo não invade ticker; ambos CTAs dentro do hero; sem overflow horizontal.
- 1024×768: CTAs empilhados e visíveis; sem overflow horizontal.
- 390×844: CTAs empilhados e visíveis; sem overflow horizontal.

Detalhes: `AUDIT-FIX.json`.

Observação: o ambiente bloqueou navegação `file://` e `localhost` no Chromium por política administrativa, portanto a auditoria visual com assets reais não pôde ser reexecutada. A geometria/responsividade, integridade dos assets e sintaxe JavaScript foram validadas.
