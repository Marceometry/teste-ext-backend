## Stack

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en)
- [NestJS](https://github.com/nestjs/nest)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)

Este projeto foi construído com `Node` + o framework `NestJS`, devido à sua robustez e escalabilidade, utilizando `MySQL` como banco de dados.

## Instalação

```bash
$ npm install
```

## Rodando o app

Crie um arquivo `.env` na raiz do projeto.

Antes de rodar, é necessário ter uma instância do MySQL rodando. Algumas opções são o [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) e o [Xampp](https://www.apachefriends.org/download.html).

Assim que seu banco de dados estiver configurado, crie um schema com o nome que preferir e insira o nome na variável ambiente `DB_DATABASE`. Popule também as variáveis ambientes com o prefixo `DB_` com as respectivas informações do seu banco de dados.

Para a autenticação, adicione uma string segura na variável `JWT_SECRET.`

No envio de e-mails, foi utilizada a biblioteca [Nodemailer](https://nodemailer.com/about/). Para que seja possível realizar de fato o envio de e-mails, será necessário configurar um serviço de entrega de e-mails, como o [Mailgun](https://www.mailgun.com/), e popular as variáveis ambiente com o prefixo `MAIL_` com seus respectivos valores.

Feito isso, basta rodar um dos comandos abaixo e o app estará pronto para executar em http://localhost:8000.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
