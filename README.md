# Sexta é Nóis - Backend
Esta é a API do projeto Sexta é Nóis. Utiliza JS e MySQL no Docker.

*Requisitos*
[Node.js](https://nodejs.org/en/) - versão testada: 16.10.0<br>
[Docker](https://www.docker.com/) com Docker Compose - versão testada: 20.10.17; caso esteja desenvolvendo no Windows, baixe o Docker Desktop, que inclui o Docker Compose por padrão.
Algum gerenciador de pacotes - recomendo o [Yarn Classic](https://classic.yarnpkg.com/lang/en/) - versão testada: 1.22.17, ou o NPM, que vem com a instalação do Node.

*Bibliotecas utilizadas*
[ESLint](https://eslint.org/) e [Prettier](https://prettier.io/) - plugins usados para padronização e correção de código.<br>
[Knex.js](https://knexjs.org/) - responsável pela conexão com o banco de dados.<br>

*Instruções*
Após clonar o projeto, na branch main, rodar o seguinte comando:<br>

  *npm i* ou *yarn* (dependendo do gerenciador de pacotes utilizado)
  
isso irá baixar as dependências necessárias.

Agora, acesse o arquivo *.env.example*, na raiz do projeto, e perceba que há variáveis de ambiente nele. Copie esse arquivo com o nome *.env*, na mesma pasta, e coloque as variáveis apontando para o seu banco de dados.

Após isso, executar os scripts:

  *yarn database*

  *yarn migrate*
  
que irão, respectivamente, criar o container do banco de dados usando Docker Compose, com as configurações colocadas no *.env*, e criar as tabelas do banco de acordo com as migrations que estão na pasta *src/data/migrations*.

Para rodar a aplicação, rodar:
  
  *yarn start*
