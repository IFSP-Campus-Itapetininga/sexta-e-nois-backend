# Sexta é Nóis - Backend
Esta é a API do projeto Sexta é Nóis. Utiliza JS e MySQL no Docker.

# Requisitos
[Node.js](https://nodejs.org/en/) - versão testada: 16.10.0<br>
[Docker](https://www.docker.com/) com Docker Compose - versão testada: 20.10.17; caso esteja desenvolvendo no Windows, baixe o Docker Desktop, que inclui o Docker Compose por padrão.
Algum gerenciador de pacotes - recomendo o [Yarn Classic](https://classic.yarnpkg.com/lang/en/) - versão testada: 1.22.17, ou o NPM, que vem com a instalação do Node.

# Bibliotecas utilizadas
[ESLint](https://eslint.org/) e [Prettier](https://prettier.io/) - plugins usados para padronização e correção de código.<br>
[Knex.js](https://knexjs.org/) - responsável pela conexão com o banco de dados.

# Instruções
Após clonar o projeto, na branch main, rodar o seguinte comando:

  *npm i* ou *yarn* (dependendo do gerenciador de pacotes utilizado)

isso irá baixar as dependências necessárias.

Agora, acesse o arquivo *.env.example*, na raiz do projeto, e perceba que há variáveis de ambiente nele. Copie esse arquivo com o nome *.env*, na mesma pasta, e coloque as variáveis apontando para o seu banco de dados.

Após isso, pode-se executar os scripts:

  *yarn database*

  *yarn migrate*

que irão, respectivamente, criar o container do banco de dados usando Docker Compose, com as configurações colocadas no *.env*, e criar as tabelas do banco de acordo com as migrations que estão na pasta *src/data/migrations*.

Caso não deseje ou não possa usar o Docker para rodar o banco de dados, pode-se utilizar outros meios para acessá-lo, como o [WAMP](https://www.wampserver.com/en/), [XAMPP](https://www.apachefriends.org/pt_br/index.html) ou instalação local ou remota do [MySQL](https://www.mysql.com/); apenas lembre-se de colocar as variáveis de apontamento corretas no *.env*.

Para testar a aplicação, rodar:

  *yarn start*

caso tudo esteja correto, estará disponível em http://localhost:3333/v1 (ou a outra porta que tenha sido definida no *.env*).

# Migrations
Independente se for usado o Docker ou outra forma de acessar o banco, será necessário rodar as migrations para criar as tabelas na ordem correta. Sendo assim, também é necessário gerar as migrations corretamente.
O comando a seguir mostra como:

  *yarn migration createTestTable*

ele irá criar, na pasta *src/data/migrations*, um arquivo com o nome *2022XXYYZZZZZ_createTestTable.js*, onde as letras representam o timestamp do momento em que o comando foi executado.

Cada migration é criada com uma função *exports.up* e *exports.down*, onde irão, respectivamente, os comandos para criar/alterar sua tabela, e para desfazê-lo.

Para um exemplo de como criar tabelas com a migration, olhar o arquivo *createEventsTable.js*.

# Módulos, Controllers e Models
Para gerar um módulo, com a estrutura de pastas pré-definida pelo modelo, executar:

  *yarn generate:module*

onde o nome do módulo será solicitaddo, e resultará na criação do mesmo em *src/modules*. OLhar o módulo *events* para exemplos de como organizar as funções de um CRUD nas controllers e nas models.

# Organização de branches e commits
Procurar criar as features a partir da branch *main*, mantendo-a sempre atualizada rodando periodicamente *git pull*; o padrão de nomenclatura pode ser *feature/your-scope*, onde "your-scope" equivale ao que será mexido. Pode ser o nome de um módulo (ex.: *feature/events*), ou de uma função (*feature/list-events*), ou até de uma implementação na infraestrutura (*feature/docker*).

Para os commits, procurar utilizar o padrão descrito [neste tutorial](https://github.com/pvdlg/conventional-changelog-metahub); as 'tags' mais utilizadas provavelmente serão *feat*, *fix*, *refactor* e *docs*.

# Comandos extra
Há também comandos para auxiliar na formatação e correção do código:

  *yarn lint*

  *yarn format*

O primeiro é executado automaticamente pelo GitHub quando um commit é feito na branch main.
