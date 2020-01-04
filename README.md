# Projeto Gympoint

Projeto de conclusão do curso GoStack da RockeatSeat. 

O Gympoint é um sistema de gerenciamento de academia. Possui uma API que mantém os dados, um módulo web para administração, cadastro de planos, alunos e resposta aos pedidos de ajuda dos alunos; e um aplicativo para acesso dos alunos da academia onde podem ser feitos os check-ins e realização de pedidos de ajuda.


Para fins de compatibilidade e assertividade do guia abaixo, recomendo utilizar o yarn.
https://yarnpkg.com/en/docs/install


# API Gympoint

Após baixar o projeto, deve ser criado um arquivo chamado ".env" na pasta gympointAPI contendo as variáveis de ambiente necessárias pra funcionamento do projeto. O conteúdo do arquivo deve ser conforme exemplo abaixo:

### Variáveis de Ambiente da API

```
# Base url - Porta em que API usará em sua máquina. 
APP_URL=http://localhost:3333
APP_DEV_PORT=3333
NODE_ENV=development 

#Auth - Hash para criação da sessão do usuário. Pode ser gerado em https://www.md5online.org/.
APP_SECRET=7fu3hr9gh3b3mkg

#Admin_User - Usuário administrador padrão. É utilizado para acessar o módulo web.
ADMIN_EMAIL=admin@gympooint.com
ADMIN_PASS=123456

#Database - Informações sobre o banco que será utilizado pelo projeto.
DB_HOST=localhost
DB_USER=admin
DB_PASS=admin123
DB_NAME=gympoint

#Redis - Informações de acesso ao Redis, serviço que armazenará os e-mails em fila para realização de envios aos alunos. 
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

#Mail - Informações de acesso à plataforma de envio de e-mail utilizada. Durante o desenvolvimento, foi utilizado o mailtrap. Acesse https://mailtrap.io/.
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=8890a13d916e10
MAIL_PASS=dp7h3f3b10eed8

#Sentry - Serviço online de geração de logs de erro. Acesse https://sentry.io/ e faça seu cadastro para obter a url necessária.
DSN=
```

#### Iniciando o projeto

Para rodar a API, instale as dependências do projeto, abra o terminal nas pasta da API e execute o comando:

``` yarn ```

Inicie seu banco local e o Redis. 

Popule o banco rodando as migrations e os seeds. Para isso, execute os comandos:

```
yarn sequelize db:migrate

yarn sequelize db:seed:all
```

Para iniciar a API. Execute:

```
yarn dev
```

Inicie a fila de envio de e-mails, abra uma nova aba de seu terminal na mesma pasta (gympointAPI) e digite:

```
yarn queue 
```

## Módulo Web.

O módulo web é o acesso de administrador. A única variável de ambiente deste módulo é o caminho até a API, iniciada no passo anterior. 


### Variáveis de ambiente do módulo Web

Na pasta gympointWeb, crie um arquivo .env e preencha conforme exemplo abaixo: 

```
#API - Porta em que a API está rodando.
REACT_APP_BASE_URL=http://localhost:3333
```

### Iniciando o projeto

Para iniciar o módulo web, abra o terminal na pasta raíz (gympointWeb), instale as dependências e dê início a aplicação.
```
yarn 

yarn start
```
Para acessar o sistema, utilize o login de administrador definido nas variáveis de ambiente da API.


## Aplicativo Gympoint

Durante o desenvolvimento dessa aplicação utilizei apenas dispositivos Android, portanto, não posso garantir que o aplicativo funcione corretamente em dispositivos IOS. O guia abaixo é apenas para Android

Para rodar o app, é preciso ter o ambiente o Android instalado em sua máquina. Acesse o tutorial a seguir se necessário. https://docs.rocketseat.dev/ambiente-react-native/introducao


### Variáveis de ambiente do app

Defina as variáveis de ambiente criando um novo arquivo .env na pasta do módulo mobile. Este, conforme exemplo abaixo, deve possuir o ip local, para funcionamento do Reactotron e o endereço da API Gympoint, conforme exemplo abaixo:

```
#API_URL
BASE_URL=192.168.1.12

#BASE_URL
API_URL=http://192.168.1.12:3333
```

### Iniciando o App 

Instale as dependências acessando a pasta GympointMobile e executando:
```
yarn
```

Com o dispositivo conectado via USB ou máquina virtual ativada, execute os comandos:
```
sudo react-native run-android

sudo react-native start
```









