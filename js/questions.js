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
    enunciado: "Claude Code só funciona com projetos escritos em Python.",
    resposta: false,
    explicacao: "Claude Code é agnóstico de linguagem: funciona com SQL, Python, JavaScript, arquivos de configuração YAML/JSON, e praticamente qualquer tipo de arquivo de texto de um projeto."
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
    enunciado: "Claude Code funciona apenas em computadores com Windows.",
    resposta: false,
    explicacao: "Claude Code funciona em macOS, Linux e Windows (inclusive via WSL), não sendo restrito a um único sistema operacional."
  },
  {
    id: "iniciante-08",
    nivel: "iniciante",
    categoria: "boas-praticas",
    enunciado: "Usar Claude Code elimina completamente a necessidade de revisão humana do código gerado.",
    resposta: false,
    explicacao: "Mesmo com IA gerando código, a boa prática recomendada é sempre revisar as alterações antes de aplicá-las em produção, especialmente em pipelines de dados."
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
    enunciado: "Claude Code é instalado via npm, o gerenciador de pacotes do Node.js.",
    resposta: true,
    explicacao: "A instalação padrão do Claude Code é feita através do comando `npm install -g @anthropic-ai/claude-code`, exigindo Node.js instalado."
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
    enunciado: "Claude Code consegue executar comandos de git (criar commits, branches, fazer push) desde que receba permissão do usuário.",
    resposta: true,
    explicacao: "Claude Code pode executar comandos git (como commit, criar branch, fazer push, ver diffs) através da ferramenta bash, desde que o usuário conceda permissão."
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
    enunciado: "Por padrão, o Claude Code executa qualquer comando (como apagar arquivos) sem nunca pedir confirmação ao usuário.",
    resposta: false,
    explicacao: "Claude Code tem modos de permissão que pedem confirmação antes de ações potencialmente sensíveis, como editar arquivos ou rodar comandos no terminal."
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
    enunciado: "Claude Code não guarda nenhum contexto entre as mensagens trocadas dentro de uma mesma sessão.",
    resposta: false,
    explicacao: "Dentro de uma mesma sessão, o Claude Code mantém o histórico da conversa e das ações realizadas, usando esse contexto para decisões seguintes."
  },
  {
    id: "intermediario-10",
    nivel: "intermediario",
    categoria: "boas-praticas",
    enunciado: "Ao usar Claude Code em um pipeline de dados, é uma boa prática revisar o código gerado antes de rodá-lo em produção.",
    resposta: true,
    explicacao: "Mesmo com automações e permissões configuradas, revisar transformações de dados geradas por IA antes do deploy em produção evita erros custosos em relatórios e decisões de negócio."
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
    enunciado: "Hooks no Claude Code permitem executar comandos automaticamente em resposta a eventos, como antes ou depois do uso de uma ferramenta.",
    resposta: true,
    explicacao: "Hooks são configurações que disparam scripts/comandos em pontos específicos do ciclo de vida do agente (ex: antes de rodar uma tool, ao final de uma sessão), úteis para validações e automações."
  },
  {
    id: "avancado-04",
    nivel: "avancado",
    categoria: "arquitetura",
    enunciado: "Subagentes (subagents) no Claude Code são sempre idênticos entre si e não podem ter conjuntos de ferramentas diferentes.",
    resposta: false,
    explicacao: "Subagentes podem ser configurados com propósitos, instruções e conjuntos de ferramentas diferentes entre si, permitindo especialização (ex: um agente só para revisão de código)."
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
    enunciado: "Claude Code não oferece nenhum mecanismo de controle sobre quais ferramentas ou comandos podem ser executados automaticamente.",
    resposta: false,
    explicacao: "Claude Code possui modos e listas de permissão (allow/deny) configuráveis, permitindo restringir quais comandos e ferramentas podem rodar sem confirmação manual."
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
    enunciado: "O Claude Agent SDK permite construir agentes customizados usando a mesma base de tecnologia por trás do Claude Code.",
    resposta: true,
    explicacao: "O Claude Agent SDK expõe as capacidades usadas pelo Claude Code para que desenvolvedores construam seus próprios agentes e fluxos de trabalho customizados."
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
    enunciado: "Por padrão, o Claude Code salva automaticamente em texto plano, sem qualquer restrição, todas as credenciais de banco de dados que encontrar nos arquivos do projeto.",
    resposta: false,
    explicacao: "Isso não é um comportamento do Claude Code. Credenciais devem ser gerenciadas com boas práticas de segurança (variáveis de ambiente, secrets managers) independentemente da ferramenta, e o Claude Code não coleta ou persiste credenciais automaticamente."
  }
];
