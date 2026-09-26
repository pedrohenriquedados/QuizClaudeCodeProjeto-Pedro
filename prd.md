# PRD — Quiz Web: Claude Code para Analytics Engineers

## 1. Visão Geral

### 1.1 Contexto
Claude Code é uma ferramenta de linha de comando (CLI) da Anthropic para desenvolvimento assistido por IA. Analytics Engineers — profissionais que vivem entre SQL, modelagem de dados, dbt e pipelines — são um público com alto potencial de adoção, mas que muitas vezes não conhece a ferramenta ou subestima onde ela pode ajudar no dia a dia de dados.

### 1.2 Problema
Falta um recurso leve, interativo e divertido que apresente o Claude Code para Analytics Engineers, cobrindo desde conceitos básicos de negócio até detalhes técnicos avançados, conectando a ferramenta com casos de uso reais de engenharia de dados.

### 1.3 Objetivo do Produto
Criar um **Quiz Web de Verdadeiro ou Falso** sobre Claude Code, com progressão de dificuldade (Iniciante → Intermediário → Avançado), que eduque o público de Analytics Engineers tanto sobre a ferramenta em si quanto sobre como aplicá-la em fluxos de trabalho de dados (SQL, dbt, pipelines, documentação).

### 1.4 Público-alvo
- **Persona primária:** Analytics Engineer / Analista de Dados com conhecimento de SQL e modelagem de dados, mas pouco ou nenhum contato com Claude Code.
- **Persona secundária:** Analytics Engineer que já usa Claude Code e quer testar/aprofundar conhecimento técnico (perguntas de nível avançado).

### 1.5 Proposta de Valor
Aprender sobre Claude Code de forma gamificada e rápida (~10-15 minutos), com perguntas que conectam conceitos da ferramenta a situações reais do dia a dia de dados, reforçando aprendizado com explicações após cada resposta, e competir num ranking global com outros jogadores.

## 2. Objetivos e Métricas de Sucesso
- Usuário consegue completar o quiz do início ao fim sem fricção.
- Usuário sai do quiz entendendo pelo menos 3 conceitos novos sobre Claude Code (via explicações pós-resposta).
- Experiência funciona bem em desktop e mobile.
- Deploy simples e gratuito (camadas free de Vercel + Supabase).
- Resultado de cada partida é salvo com sucesso no ranking global (taxa de erro de gravação próxima de zero).

## 3. Escopo do MVP

### Incluído
- Quiz de perguntas Verdadeiro/Falso sobre Claude Code.
- 3 níveis fixos de dificuldade: Iniciante, Intermediário, Avançado.
- Mistura de perguntas gerais sobre a ferramenta e perguntas com pegada de Analytics Engineering (SQL, dbt, pipelines, documentação de dados, exploração de dados).
- Captura de nome (obrigatório) e e-mail (opcional) do jogador antes de iniciar o quiz.
- Pontuação e tela de resultado final.
- Timer por pergunta.
- Explicação exibida após cada resposta (correta ou incorreta).
- **Ranking/leaderboard global** persistido no Supabase, exibindo os melhores resultados de todos os jogadores.
- Tema visual escuro, estilo terminal/dev.
- Responsivo (desktop e mobile).
- Deploy na Vercel (hosting estático) com Supabase como backend/banco de dados.

### Fora de escopo (v2 / ideias futuras)
- Autenticação de usuários (login/senha, OAuth).
- Banco de perguntas administrável via CRUD/UI (perguntas continuam em arquivo estático no MVP — ver seção 7.3).
- Multiplayer ou modo competitivo em tempo real entre usuários.
- Internacionalização (i18n) — MVP é 100% em português (pt-BR).
- Analytics/telemetria de uso de produto (ex: Google Analytics, Posthog).
- Compartilhamento social do resultado.

## 4. Fluxo do Usuário (UX)

1. **Tela inicial (Home)**
   - Título do quiz, breve descrição do objetivo.
   - Campo "Nome" (obrigatório) e "E-mail" (opcional).
   - Seleção de nível: Iniciante / Intermediário / Avançado (ou "Jogar todos os níveis em sequência" — decisão de implementação, ver seção 6.3).
   - Botão "Começar" (desabilitado até nome ser preenchido).
   - Link/botão secundário "Ver ranking" que leva à Tela de Ranking sem precisar jogar.

2. **Tela de Pergunta**
   - Exibe número da pergunta atual (ex: "Pergunta 3 de 10").
   - Exibe nível atual e categoria (se aplicável).
   - Enunciado da pergunta (afirmação a ser julgada Verdadeira ou Falsa).
   - Dois botões grandes: "Verdadeiro" / "Falso".
   - Timer visível (contagem regressiva) por pergunta.
   - Se o tempo esgotar sem resposta, conta como erro automaticamente.

3. **Tela/Estado de Feedback (após responder)**
   - Indica se a resposta foi Certa ou Errada (feedback visual imediato: verde/vermelho).
   - Exibe explicação da resposta correta (texto curto, didático).
   - Botão "Próxima pergunta".

4. **Tela de Resultado Final**
   - Pontuação final (acertos / total).
   - Mensagem de feedback conforme desempenho (ex: faixas de pontuação com mensagens diferentes).
   - Indicação da posição do jogador no ranking global (ex: "Você ficou em #7º lugar!"), se o envio ao Supabase for bem-sucedido.
   - Botão "Jogar novamente".
   - Botão "Ver ranking completo".

5. **Tela de Ranking (Leaderboard)**
   - Lista dos melhores resultados (ex: top 20), com nome do jogador, pontuação, nível jogado e tempo total.
   - Ordenação: maior pontuação primeiro; em empate, menor tempo total primeiro.
   - Botão "Voltar" / "Jogar novamente".
   - Estado de carregamento e estado de erro (ex: "Não foi possível carregar o ranking agora") caso a consulta ao Supabase falhe.

## 5. Regras de Negócio

### 5.1 Pontuação
- +1 ponto por resposta correta.
- 0 pontos por resposta incorreta ou tempo esgotado.
- Pontuação exibida como "X acertos de Y perguntas" e opcionalmente percentual.

### 5.2 Timer
- Cada pergunta tem um tempo limite (sugestão: 20 segundos, configurável em código).
- Timer visual (barra de progresso ou contador numérico regressivo).
- Ao esgotar o tempo, resposta é automaticamente marcada como incorreta e o fluxo segue para a tela de feedback/explicação.

### 5.3 Explicação
- Toda pergunta do banco de dados deve ter um campo de explicação, exibido independentemente de acerto ou erro, para reforçar o aprendizado.

### 5.4 Ranking / Leaderboard
- Ao final de cada partida, o resultado é enviado ao Supabase: nome, e-mail (se informado), pontuação, total de perguntas, nível(is) jogado(s) e tempo total gasto.
- Falha no envio (ex: sem internet, Supabase fora do ar) **não pode travar a experiência**: exibir a tela de resultado normalmente, apenas sem a posição no ranking, com mensagem discreta de aviso.
- Ranking exibe publicamente apenas **nome, pontuação, nível e tempo** — o e-mail nunca é exibido publicamente (ver regras de privacidade em 7.3).
- Critério de ordenação: pontuação decrescente; empate resolvido por menor tempo total.

## 6. Banco de Perguntas

### 6.1 Volume
- **30 perguntas no total**, distribuídas em:
  - 10 perguntas — Iniciante
  - 10 perguntas — Intermediário
  - 10 perguntas — Avançado

### 6.2 Distribuição de Conteúdo por Nível

**Iniciante (conceitos de negócio / visão geral)**
- O que é Claude Code, para que serve, proposta de valor.
- Diferença entre Claude Code e o chat comum do Claude.
- Conceitos gerais de IA aplicada a produtividade de desenvolvedores/analistas.
- Casos de uso simples de dados (ex: "Claude Code pode ajudar a explicar uma query SQL complexa").

**Intermediário (uso prático / comandos / fluxo de trabalho)**
- Instalação e primeiros passos.
- Comandos e funcionalidades principais (ex: sessões, contexto, arquivos).
- Uso em fluxos de dados: gerar/revisar queries SQL, documentar modelos dbt, explorar datasets.
- Boas práticas de uso (ex: dar contexto, revisar código gerado).

**Avançado (técnico / arquitetura / integrações)**
- Configurações avançadas, permissões, hooks, MCP (Model Context Protocol).
- Integrações com ferramentas de dados (ex: MCP servers para bancos de dados, dbt, warehouses).
- Casos de uso avançados de Analytics Engineering: automação de testes de dados, geração de documentação técnica, refatoração de pipelines.
- Limitações e considerações de segurança/governança ao usar IA com dados sensíveis.

> **Nota para implementação:** o Claude Code (ferramenta) deve pesquisar e redigir o conteúdo real das 30 perguntas com base em documentação oficial do Claude Code, garantindo precisão técnica. Este PRD define a estrutura e distribuição, não o conteúdo literal das perguntas.

### 6.3 Estrutura de Dados (schema sugerido)

Cada pergunta deve seguir este formato (ex: `questions.js` como módulo JS ou objeto embutido, ver seção 7.3):

```json
{
  "id": "iniciante-01",
  "nivel": "iniciante",
  "categoria": "conceitos-gerais",
  "enunciado": "Claude Code é uma extensão de navegador para editar código.",
  "resposta": false,
  "explicacao": "Claude Code é uma ferramenta de linha de comando (CLI) que roda no terminal, não uma extensão de navegador."
}
```

Campos:
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Identificador único da pergunta |
| `nivel` | enum: `iniciante`, `intermediario`, `avancado` | Nível de dificuldade |
| `categoria` | string | Tag livre (ex: `conceitos-gerais`, `sql-dbt`, `mcp`, `configuracao`) |
| `enunciado` | string | Afirmação a ser julgada V ou F |
| `resposta` | boolean | `true` (Verdadeiro) ou `false` (Falso) |
| `explicacao` | string | Texto explicativo exibido após a resposta |

## 7. Especificação Técnica

### 7.1 Stack
- **Frontend:** HTML5 + CSS3 + JavaScript puro (vanilla) — sem frameworks, sem bundler, sem build step.
- **Backend/Dados:** [Supabase](https://supabase.com) (Postgres gerenciado) usado exclusivamente para o leaderboard — perguntas continuam estáticas no frontend (ver 7.3).
- **Hosting/Deploy:** [Vercel](https://vercel.com) servindo o projeto como site estático (sem Serverless Functions no MVP — chamadas ao Supabase feitas direto do navegador via `supabase-js`).
- Compatível também com abrir localmente (`index.html` direto no navegador), desde que as credenciais públicas do Supabase estejam configuradas no código (ver 7.3).

### 7.2 Estrutura de Arquivos Sugerida
```
/
├── index.html
├── /css
│   └── style.css
├── /js
│   ├── app.js            # lógica principal (estado, fluxo de telas)
│   ├── questions.js      # banco de perguntas (array JS exportado ou global)
│   ├── timer.js          # lógica do timer (opcional, pode ficar em app.js)
│   └── supabaseClient.js # inicialização do client supabase-js + funções de leaderboard
├── /supabase
│   └── schema.sql        # DDL: tabela, view pública e políticas RLS (ver 7.3)
├── vercel.json            # (opcional) configuração de deploy estático na Vercel
└── prd.md
```

### 7.3 Considerações Técnicas Importantes

**Banco de perguntas**
- Continua estático em `questions.js` (`const QUESTIONS = [...]`), **não** fica no Supabase no MVP — evita round-trip de rede para carregar perguntas e mantém o app funcionando mesmo se o Supabase estiver fora do ar. Migrar perguntas para o banco fica como ideia de v2 (seção 10).

**Supabase — schema sugerido (`supabase/schema.sql`)**
```sql
create table leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  player_name text not null check (char_length(player_name) between 1 and 40),
  player_email text,
  score int not null check (score >= 0),
  total_questions int not null check (total_questions > 0),
  level_played text not null, -- 'iniciante' | 'intermediario' | 'avancado' | 'todos'
  total_time_seconds int not null check (total_time_seconds >= 0),
  created_at timestamptz not null default now()
);

alter table leaderboard_entries enable row level security;

-- Qualquer pessoa (chave anon) pode inserir seu próprio resultado
create policy "public can insert results"
  on leaderboard_entries for insert
  to anon
  with check (true);

-- NENHUMA policy de SELECT na tabela base para "anon" -> e-mail nunca é lido publicamente

-- View pública sem a coluna de e-mail, usada pelo frontend para exibir o ranking
create view public_leaderboard as
  select id, player_name, score, total_questions, level_played, total_time_seconds, created_at
  from leaderboard_entries
  order by score desc, total_time_seconds asc;

grant select on public_leaderboard to anon;
```
- **Privacidade do e-mail:** a tabela base não tem policy de `SELECT` para o papel `anon`; apenas `INSERT`. O ranking público é lido através da view `public_leaderboard`, que não expõe a coluna `player_email`. Isso impede que qualquer usuário consiga ler e-mails de outros jogadores via API pública do Supabase.
- **Chave usada no frontend:** apenas a **anon/public key** do Supabase (nunca a `service_role key`, que tem acesso total e deve ficar só no backend/dashboard).
- **Configuração de credenciais:** URL do projeto e anon key ficam em `js/supabaseClient.js` (são chaves públicas por design do Supabase, protegidas pelas policies de RLS acima — não são segredos). Se preferir não hardcodar, usar variáveis de ambiente da Vercel injetadas em build simples, mas isso é opcional no MVP dado que não há build step.
- **Biblioteca cliente:** importar `@supabase/supabase-js` via CDN (ex: `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`) para manter a stack sem bundler/build.

**Estado e fluxo**
- Estado da aplicação (nome, e-mail, nível, respostas, pontuação, tempo) gerenciado em memória via JavaScript durante a partida.
- **Sorteio de perguntas:** dentro de cada nível, embaralhar a ordem das 10 perguntas a cada partida (Fisher-Yates) para dar variedade.
- **Timer:** implementado com `setInterval`/`setTimeout`, com limpeza correta ao trocar de tela para evitar timers "fantasmas" rodando em paralelo; tempo total da partida é acumulado para desempate no ranking.
- **Chamadas ao Supabase são assíncronas e não bloqueantes:** salvar resultado e buscar ranking usam `async/await` com `try/catch`; falha de rede não deve impedir o usuário de ver sua pontuação final (ver 5.4).

**Qualidade geral**
- **Responsividade:** CSS com media queries ou layout flexível (Flexbox/Grid) garantindo boa experiência em telas de celular (breakpoint sugerido: 600px).
- **Acessibilidade básica:** contraste adequado no tema escuro, botões com área de toque adequada (mínimo 44x44px), uso de elementos semânticos (`<button>`, `<main>`, `<section>`), `<label>` associado aos campos de nome/e-mail.
- **Sem dependências externas pesadas:** único CDN externo é o `supabase-js`; fontes podem ser system-fonts ou uma fonte monoespaçada via Google Fonts (opcional, com fallback).

### 7.4 Deploy
- **Vercel:** projeto estático (framework preset "Other"/"Static"), sem etapa de build — a Vercel apenas publica os arquivos da raiz. Deploy contínuo via integração com repositório Git (push na branch principal = deploy automático).
- **Supabase:** projeto criado no dashboard do Supabase; o `schema.sql` da seção 7.3 é executado uma vez via SQL Editor do Supabase (ou CLI) para provisionar tabela, view e policies.

### 7.5 Identidade Visual
- **Tema escuro estilo terminal/dev**, remetendo à experiência de usar o Claude Code no terminal.
- Sugestões de paleta: fundo quase preto (`#0d0d0d` / `#1a1a1a`), texto em tons claros (`#e0e0e0`), acentos em laranja (referência à marca Claude/Anthropic, ex: `#d97757` ou similar) para botões e destaques, verde para acerto e vermelho para erro.
- Fonte monoespaçada (ex: `"Fira Code"`, `"JetBrains Mono"`, ou fallback `monospace`) para reforçar a estética de terminal, especialmente no enunciado das perguntas.
- Elementos visuais opcionais: cursor piscante, prompt estilo `$ ` antes de textos, bordas com leve efeito de "janela de terminal".

### 7.6 Compatibilidade
- Navegadores modernos (Chrome, Edge, Firefox, Safari — últimas 2 versões).
- Não é necessário suportar Internet Explorer.

## 8. Critérios de Aceite (Definition of Done)

- [ ] Usuário informa nome (obrigatório) e e-mail (opcional) antes de iniciar.
- [ ] Usuário consegue escolher um nível e iniciar o quiz.
- [ ] As 30 perguntas (10 por nível) estão implementadas com enunciado, resposta e explicação.
- [ ] Cada pergunta exibe timer regressivo funcional; tempo esgotado conta como erro.
- [ ] Após responder (ou tempo esgotar), o sistema exibe feedback (certo/errado) + explicação antes de avançar.
- [ ] Ao final do nível/quiz, é exibida a pontuação final, com envio do resultado ao Supabase e opção de jogar novamente.
- [ ] Tela de ranking exibe os melhores resultados vindos do Supabase (via view `public_leaderboard`), sem expor e-mails.
- [ ] Falha ao salvar/carregar do Supabase não quebra a experiência (degrada graciosamente com aviso).
- [ ] Layout funciona corretamente em resolução desktop (≥1024px) e mobile (≤600px).
- [ ] Projeto publicado na Vercel e acessível publicamente via URL.
- [ ] Tema visual escuro estilo terminal aplicado de forma consistente em todas as telas.

## 9. Riscos e Considerações

- **Precisão do conteúdo:** as perguntas técnicas sobre Claude Code precisam ser verificadas contra documentação oficial atualizada para evitar informações desatualizadas ou incorretas — especialmente nos níveis Intermediário e Avançado.
- **Equilíbrio de dificuldade:** garantir que a curva entre Iniciante → Avançado seja perceptível e justa, evitando perguntas ambíguas (comuns em formatos V/F).
- **Escopo do "ângulo de dados":** balancear perguntas genéricas sobre Claude Code com perguntas de caso de uso em Analytics Engineering, sem forçar conexões artificiais.
- **Privacidade de dados pessoais:** mesmo sendo apenas nome/e-mail opcionais, é preciso deixar claro na UI que os dados podem ser exibidos publicamente no ranking (nome) ou armazenados (e-mail), e garantir via RLS/view que o e-mail nunca vaza pela API pública (ver 7.3).
- **Abuso do endpoint de insert público:** como a policy de `INSERT` é aberta a qualquer chave anon, é possível enviar resultados falsos/spam via API diretamente (sem passar pelo quiz). Aceitável para o MVP (sem dados sensíveis de terceiros em jogo), mas é um risco conhecido — mitigação futura: rate limiting, validação server-side via Edge Function, ou captcha.
- **Chave anon exposta no frontend:** é o modelo padrão do Supabase (chave pública protegida por RLS), mas reforça a importância de nunca usar a `service_role key` no código do cliente.

## 10. Ideias para Versões Futuras (fora do MVP)
- Migrar banco de perguntas para o Supabase com painel administrativo simples.
- Modo "desafio diário" com perguntas rotativas.
- Compartilhamento de resultado (imagem/texto para redes sociais).
- Categorias filtráveis (ex: jogar só perguntas de "MCP" ou "SQL/dbt").
- Banco de perguntas maior com sorteio sem repetição entre partidas.
- Autenticação real (para editar/remover o próprio resultado do ranking).
- Validação server-side (Vercel Edge Function) antes de gravar no Supabase, para reduzir spam/resultados forjados.
