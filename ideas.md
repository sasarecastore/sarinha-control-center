# Direção visual — Sarinha Control Center

## Abordagens consideradas

### Tema: Neon Operacional
**Very Brief Intro:** Um painel escuro, técnico e energético, com magenta elétrico e ciano como sinais de estado. A interface transmite controle imediato sem parecer um template genérico.
**Probability:** 0.04

### Tema: Terminal Editorial
**Very Brief Intro:** Uma leitura inspirada em terminais clássicos, com tipografia monoespaciada, verde fosforescente e camadas de informação densas. Mais utilitária e hacker, menos expressiva.
**Probability:** 0.07

### Tema: Chrome Club
**Very Brief Intro:** Uma estética de hardware premium com prata, preto e vermelho-laser, usando superfícies metálicas e cartões compactos. Sofisticada, mas menos fiel ao impacto neon do HTML original.
**Probability:** 0.02

## Abordagem escolhida: Neon Operacional

### Design Movement
Neo-brutalismo digital combinado com interfaces de controle de ficção científica dos anos 1980: alto contraste, bordas precisas, sinais luminosos e composição assimétrica.

### Core Principles
1. **Estado antes da decoração:** cada toggle, indicador e métrica deve comunicar claramente se o sistema está ativo, em espera ou desligado.
2. **Tensão cromática controlada:** o magenta é a assinatura; o ciano confirma e orienta; o preto cria foco e profundidade.
3. **Geometria técnica:** cantos parcialmente retos, linhas de varredura, micro-rótulos e divisões editoriais substituem cartões arredondados genéricos.
4. **Densidade com respiro:** o painel concentra informação em módulos bem hierarquizados, preservando áreas de silêncio visual.

### Color Philosophy
O preto azulado cria a sensação de uma sala de controle noturna. O magenta elétrico representa potência e ação deliberada, enquanto o ciano funciona como sinal de telemetria e confiança. Cinzas azulados evitam que o neon domine tudo e garantem legibilidade, foco visível e contraste.

### Layout Paradigm
Composição de painel assimétrica: uma barra lateral estreita de identidade e navegação, uma área principal com cabeçalho de status, um bloco de destaque para a sessão atual e uma coluna de telemetria. No mobile, a barra lateral se converte em faixa superior compacta.

### Signature Elements
- Filetes de varredura e uma malha pontilhada quase imperceptível no fundo.
- Chips de estado com tipografia monoespaciada e pequenos pontos luminosos.
- Molduras com cantos chanfrados e uma linha magenta/ciano de acento.

### Interaction Philosophy
Toda ação deve devolver confirmação imediata e discreta: o switch muda de estado, o módulo recebe uma pulsação curta e o feed de atividade registra a alteração. A interface nunca finge integração com proxy ou API; os estados são locais e o status explica isso com honestidade.

### Animation
Entradas com fade e deslocamento vertical de 180–240ms, escalonadas por módulo. Hover deve elevar o contraste e mover no máximo 2px. Toggles usam transições de 160ms e um brilho breve no knob. A animação é desativada para quem prefere movimento reduzido.

### Typography System
- **Display:** Space Grotesk, 600–700, para títulos e números principais.
- **Interface:** IBM Plex Sans, 400–600, para labels e textos auxiliares.
- **Telemetry:** IBM Plex Mono, 500, para IDs, estados, versão e timestamps.

### Brand Essence
Um centro de controle visual para quem quer operar recursos com clareza, personalidade e resposta instantânea — sem esconder o que é configuração local. Personalidade: **precisa, elétrica, direta**.

### Brand Voice
Headlines são curtas e afirmativas; CTAs usam verbos de operação; microcopy explica o estado sem exageros ou promessas de integração.

Exemplos:
- “Controle o sinal. Leia o estado.”
- “Ative quando estiver pronto.”

### Wordmark & Logo
Um símbolo abstrato sem texto formado por duas barras orbitais que se cruzam em um ponto central, lembrando um radar compacto e a letra S por sugestão. O wordmark usa “SARINHA” em caixa alta com espaçamento amplo e “CONTROL CENTER” em monoespaçada menor.

### Signature Brand Color
**Magenta Pulso — #F20D82**, usado como assinatura própria em estados ativos, linhas de foco e o símbolo da marca.

## Decisões de implementação

O site será uma única tela responsiva, com estados dos recursos mantidos no navegador durante a sessão. Os toggles “Auto Headshot (Rage)” e “Antena Longa” serão apresentados como controles locais de interface; nenhuma integração externa ou execução de recurso será simulada. A entrega será feita em um repositório GitHub privado, conforme a configuração padrão de proteção do projeto.
