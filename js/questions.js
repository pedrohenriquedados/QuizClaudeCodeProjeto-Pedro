/* Banco de perguntas do quiz — Claude Code para Analytics Engineers.
   Ver schema em prd.md, seção 6.3. */

const QUESTIONS = [
  // ==================== INICIANTE ====================
  {
    id: "iniciante-01",
    nivel: "iniciante",
    categoria: "conceitos-gerais",
    enunciado: "Claude Code é uma ferramenta de linha de comando (CLI) que roda no terminal.",
    resposta: true,
    explicacao: "Claude Code é um agente de codificação que roda no terminal, ajudando a ler, escrever e executar código diretamente no seu projeto."
  },
  {
    id: "iniciante-02",
    nivel: "iniciante",
    categoria: "conceitos-gerais",
    enunciado: "Claude Code é uma extensão de navegador para editar código.",
    resposta: false,
    explicacao: "Claude Code não é uma extensão de navegador: é uma ferramenta de linha de comando (CLI) instalada e executada no terminal."
  },
  {
    id: "iniciante-03",
    nivel: "iniciante",
    categoria: "conceitos-gerais",
    enunciado: "Claude Code foi desenvolvido pela Anthropic, a mesma empresa por trás do modelo Claude.",
    resposta: true,
    explicacao: "Claude Code é um produto oficial da Anthropic, construído para dar acesso agentic ao modelo Claude direto no fluxo de desenvolvimento."
  },
  {
    id: "iniciante-04",
    nivel: "iniciante",
    categoria: "conceitos-gerais",
    enunciado: "Para usar o Claude Code, o projeto precisa estar escrito em Python.",
    resposta: false,
    explicacao: "Claude Code é agnóstico de linguagem: funciona com SQL, Python, JavaScript, arquivos de configuração YAML/JSON e praticamente qualquer arquivo de texto do projeto."
  },
  {
    id: "iniciante-05",
    nivel: "iniciante",
    categoria: "conceitos-gerais",
    enunciado: "Claude Code pode ler e editar arquivos do seu projeto diretamente, com sua permissão.",
    resposta: true,
    explicacao: "Uma das capacidades centrais do Claude Code é ler, criar e editar arquivos do projeto, sempre respeitando as permissões configuradas pelo usuário."
  },
  {
    id: "iniciante-06",
    nivel: "iniciante",
    categoria: "sql-dbt",
    enunciado: "Claude Code pode ajudar a explicar, em linguagem natural, o que uma query SQL complexa está fazendo.",
    resposta: true,
    explicacao: "Além de escrever código, o Claude Code consegue analisar arquivos SQL existentes e explicar sua lógica, o que ajuda analistas a entender queries legadas."
  },
  {
    id: "iniciante-07",
    nivel: "iniciante",
    categoria: "conceitos-gerais",
    enunciado: "Claude Code roda em Windows, mas não em macOS nem em Linux.",
    resposta: false,
    explicacao: "Claude Code funciona em macOS, Linux e Windows (inclusive via WSL), sem ficar restrito a um único sistema operacional."
  },
  {
    id: "iniciante-08",
    nivel: "iniciante",
    categoria: "boas-praticas",
    enunciado: "Com o Claude Code, não é mais necessário revisar o código gerado antes de aplicá-lo em produção.",
    resposta: false,
    explicacao: "Mesmo com IA gerando código, a boa prática é revisar as alterações antes de aplicá-las em produção, especialmente em pipelines de dados."
  },
  {
    id: "iniciante-09",
    nivel: "iniciante",
    categoria: "conceitos-gerais",
    enunciado: "Claude Code é essencialmente o mesmo chat de conversa do Claude, só que com um fundo escuro.",
    resposta: false,
    explicacao: "Claude Code vai além de um chat: ele pode executar comandos, navegar em bases de código inteiras, editar múltiplos arquivos e rodar ferramentas — um chat comum não faz isso."
  },
  {
    id: "iniciante-10",
    nivel: "iniciante",
    categoria: "sql-dbt",
    enunciado: "Claude Code pode ser usado para ajudar a entender rapidamente a estrutura de um projeto de dados desconhecido (ex: um repositório dbt que você acabou de herdar).",
    resposta: true,
    explicacao: "Claude Code consegue explorar arquivos e pastas de um projeto e resumir sua estrutura, o que é muito útil ao assumir um projeto de dados já existente."
  },

  // ==================== INTERMEDIÁRIO ====================
  {
    id: "intermediario-01",
    nivel: "intermediario",
    categoria: "instalacao",
    enunciado: "Para instalar o Claude Code, é obrigatório ter o Node.js e usar o npm.",
    resposta: false,
    explicacao: "O npm (npm install -g @anthropic-ai/claude-code, com Node.js 18+) continua sendo uma opção, mas a Anthropic recomenda o instalador nativo, que não depende de Node.js."
  },
  {
    id: "intermediario-02",
    nivel: "intermediario",
    categoria: "comandos",
    enunciado: "Comandos que começam com \"/\" dentro do Claude Code são chamados de slash commands.",
    resposta: true,
    explicacao: "Slash commands (como /init, /clear, /help) são atalhos especiais dentro da sessão do Claude Code para executar ações específicas."
  },
  {
    id: "intermediario-03",
    nivel: "intermediario",
    categoria: "comandos",
    enunciado: "O comando /init cria ou atualiza um arquivo CLAUDE.md com contexto sobre o projeto.",
    resposta: true,
    explicacao: "O /init analisa o repositório e gera um CLAUDE.md com informações relevantes (estrutura, comandos, convenções) para orientar sessões futuras."
  },
  {
    id: "intermediario-04",
    nivel: "intermediario",
    categoria: "comandos",
    enunciado: "Claude Code precisa de uma extensão à parte para conseguir executar comandos git, como criar commits.",
    resposta: false,
    explicacao: "Claude Code executa comandos git (commit, branch, push, diff) pela sua ferramenta de shell (Bash) nativa, desde que o usuário conceda a permissão."
  },
  {
    id: "intermediario-05",
    nivel: "intermediario",
    categoria: "configuracao",
    enunciado: "Um arquivo CLAUDE.md serve para dar contexto persistente ao Claude Code sobre convenções e particularidades do projeto.",
    resposta: true,
    explicacao: "O CLAUDE.md funciona como uma 'memória' do projeto, sendo lido automaticamente no início das sessões para orientar o comportamento do Claude Code."
  },
  {
    id: "intermediario-06",
    nivel: "intermediario",
    categoria: "sql-dbt",
    enunciado: "Claude Code pode ser usado para gerar e revisar queries SQL, além de ajudar a documentar modelos dbt.",
    resposta: true,
    explicacao: "Um caso de uso comum para Analytics Engineers é pedir ao Claude Code para escrever, revisar ou documentar modelos SQL/dbt, incluindo descrições de colunas e testes."
  },
  {
    id: "intermediario-07",
    nivel: "intermediario",
    categoria: "seguranca",
    enunciado: "Por padrão, o Claude Code roda comandos que alteram arquivos ou o sistema sem pedir confirmação ao usuário.",
    resposta: false,
    explicacao: "Claude Code tem modos de permissão que pedem confirmação antes de ações sensíveis, como editar arquivos ou rodar comandos no terminal."
  },
  {
    id: "intermediario-08",
    nivel: "intermediario",
    categoria: "automacao",
    enunciado: "É possível rodar o Claude Code em modo não interativo (headless), útil para scripts e automações.",
    resposta: true,
    explicacao: "O Claude Code oferece um modo não interativo (flag -p / print mode) que permite integrá-lo a scripts, pipelines e automações sem interface interativa."
  },
  {
    id: "intermediario-09",
    nivel: "intermediario",
    categoria: "conceitos-gerais",
    enunciado: "Dentro de uma mesma sessão, cada mensagem enviada ao Claude Code é tratada de forma isolada, sem lembrar do que foi conversado antes.",
    resposta: false,
    explicacao: "Dentro de uma mesma sessão, o Claude Code mantém o histórico da conversa e das ações realizadas, usando esse contexto nas decisões seguintes."
  },
  {
    id: "intermediario-10",
    nivel: "intermediario",
    categoria: "boas-praticas",
    enunciado: "Se o código gerado pelo Claude Code passa nos testes automatizados, revisá-lo antes de ir para produção deixa de ser necessário.",
    resposta: false,
    explicacao: "Testes não cobrem tudo. Em transformações de dados, erros como joins que duplicam linhas ou regras de negócio mal interpretadas podem passar despercebidos, então a revisão humana continua importante."
  },

  // ==================== AVANÇADO ====================
  {
    id: "avancado-01",
    nivel: "avancado",
    categoria: "mcp",
    enunciado: "MCP (Model Context Protocol) é um padrão aberto que permite conectar o Claude Code a ferramentas e fontes de dados externas.",
    resposta: true,
    explicacao: "O MCP define uma forma padronizada de conectar modelos como o Claude a sistemas externos (bancos de dados, APIs, ferramentas internas), expandindo o que o Claude Code pode acessar."
  },
  {
    id: "avancado-02",
    nivel: "avancado",
    categoria: "mcp",
    enunciado: "É possível conectar o Claude Code a um servidor MCP para interagir com um banco de dados ou data warehouse.",
    resposta: true,
    explicacao: "Existem servidores MCP para bancos de dados e warehouses, permitindo que o Claude Code consulte schemas, execute queries ou explore dados via esse protocolo."
  },
  {
    id: "avancado-03",
    nivel: "avancado",
    categoria: "arquitetura",
    enunciado: "Hooks no Claude Code são usados para trocar o modelo de IA em uso, e não para executar comandos em resposta a eventos.",
    resposta: false,
    explicacao: "Hooks disparam comandos ou scripts em pontos do ciclo de vida do agente (ex: PreToolUse, PostToolUse). São úteis para formatar código, rodar lint, bloquear comandos perigosos e registrar auditoria."
  },
  {
    id: "avancado-04",
    nivel: "avancado",
    categoria: "arquitetura",
    enunciado: "Cada subagente do Claude Code é criado com o mesmo conjunto fixo de ferramentas, sem possibilidade de personalização.",
    resposta: false,
    explicacao: "Subagentes podem ter instruções e ferramentas próprias (ex: um agente somente-leitura para revisão de código e outro com permissão de edição), o que permite especialização."
  },
  {
    id: "avancado-05",
    nivel: "avancado",
    categoria: "fluxo-de-trabalho",
    enunciado: "O \"plan mode\" do Claude Code permite que ele explore o problema e proponha um plano antes de fazer alterações no código.",
    resposta: true,
    explicacao: "O plan mode é pensado para tarefas mais complexas: o Claude Code primeiro investiga e apresenta um plano de ação, que pode ser revisado antes de qualquer alteração real."
  },
  {
    id: "avancado-06",
    nivel: "avancado",
    categoria: "seguranca",
    enunciado: "Não é possível restringir quais comandos o Claude Code executa automaticamente: só existe a opção de liberar tudo ou confirmar tudo.",
    resposta: false,
    explicacao: "Claude Code permite regras de permissão allow, ask e deny configuráveis em settings.json. Uma regra deny sempre prevalece sobre uma regra allow."
  },
  {
    id: "avancado-07",
    nivel: "avancado",
    categoria: "automacao",
    enunciado: "É possível configurar o Claude Code para rodar de forma autônoma em pipelines de CI/CD, sem necessidade de aprovação manual a cada passo.",
    resposta: true,
    explicacao: "Combinando modo não interativo com configurações de permissão adequadas, o Claude Code pode ser integrado a pipelines de CI/CD para tarefas automatizadas."
  },
  {
    id: "avancado-08",
    nivel: "avancado",
    categoria: "arquitetura",
    enunciado: "O Claude Agent SDK foi criado para treinar novos modelos Claude com os dados do usuário.",
    resposta: false,
    explicacao: "O Claude Agent SDK (Python e TypeScript) serve para construir agentes próprios usando o mesmo loop de agente, ferramentas, sistema de permissões e subagentes do Claude Code."
  },
  {
    id: "avancado-09",
    nivel: "avancado",
    categoria: "seguranca",
    enunciado: "Ao lidar com dados sensíveis, é recomendável nunca dar ao Claude Code acesso irrestrito a ambientes de produção sem revisar as permissões configuradas.",
    resposta: true,
    explicacao: "Boas práticas de governança recomendam restringir o acesso do agente (via permissões, allow/deny lists e ambientes isolados) especialmente quando dados sensíveis ou produção estão envolvidos."
  },
  {
    id: "avancado-10",
    nivel: "avancado",
    categoria: "seguranca",
    enunciado: "O Claude Code guarda automaticamente, num arquivo do projeto, as credenciais de banco de dados que encontra nos seus arquivos.",
    resposta: false,
    explicacao: "Esse não é um comportamento do Claude Code. Segredos devem ficar em variáveis de ambiente ou secrets managers, e regras de deny podem impedir que o Claude Code leia arquivos sensíveis como .env."
  }
];
