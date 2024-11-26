<img src="https://github.com/user-attachments/assets/c6fb3686-082b-49fd-87cd-e5f737add6b6" alt="image" width="350" height="200">

# BBTS - Sistema de Gerenciamento de Tickets

Projeto que consistiu no desenvolvimento de um sistema integrado de gerenciamento de tickets, projetado para centralizar, em uma única plataforma, dados provenientes de diversos sistemas de help desk. A solução foi criada com o objetivo de unificar informações, facilitando o acompanhamento e a gestão eficiente de demandas. 

## Etapas para rodar o projeto:

### 1. Clonar o Repositório

Clone o repositório do projeto para o seu ambiente local:

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Instalar as Dependências

Instale as dependências do projeto:

```bash
npm i
```

### 3. Definir o .env.local

configure as variaveis de ambiente:

```bash
NEXTAUTH_URL=XXXXX
NEXTAUTH_SECRET=XXXXX

NEXT_PUBLIC_TICKET_API_URL=XXXXX/api/tickets
NEXT_PUBLIC_USER_API_URL=XXXXX/api/users

AZURE_AD_TENANT_NAME=XXXXX
AZURE_AD_CLIENT_ID=XXXXX
AZURE_AD_CLIENT_SECRET=XXXXX

GITHUB_ID=XXXXX
GITHUB_SECRET=XXXXX
```

### 4. Rodar o Servidor

Utilize python manage.py runserver para rodar o servidor:

```bash
npm run server
```
