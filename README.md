# Prova SMART NX

## Funcionalidades

-   CRUD de Posts
-   CRUD de Comentários
-   Sistema de Sessões

Para rodar o código você precisa do seguinte:

## Requisitos

-   Docker
-   Node.JS
-   Arquivo `.env`

## Execução

git clone https://github.com/GabrielDomLacerda/prova-smart-nx.git
cd prova-smart-nx

### Variáveis de Ambiente

Você precisa de um arquivo `.env` na raiz do projeto.
Copie a `.env.example`, renomeando-a para `.env` e preencha seus campos adequadamente.

Execute o Docker Compose:

docker-compose up
Acesse a aplicação em http://localhost:PORTA_ESCOLHIDA.

## Endpoints da API

### Sessão

#### Login

POST /login
Corpo: { "email": "email", "password": "password" }
Resposta: { "token": "session_token" }
(O Token gerado expira em 10 horas)

### Usuário

#### Criar Usuário

POST /users
Corpo: { "name": "name", "password": "password", "email": "user@example.com" }
Resposta: { "id": "id", "name": "name", "email": "user@example.com", "password": "passwordHash" }

#### Obter Usuário por ID

GET /users/:id
Cabeçalho: Authorization: Bearer session_token
Resposta: { "id": "id", "name": "existinguser","password": "passwordHash", "email": "user@example.com" }

### Posts

#### Criar Post

    POST /posts
    Corpo: { "content": "Post Content" }
    Cabeçalho: Authorization: Bearer session_token
    Resposta: { "id": 1, "content": "Post Content", "created_at": "2024-07-24T00:00:00Z" }

#### Obter Todos os posts

    GET /posts
    Resposta: [ { "id": 1, "content": "Post Content", "created_at": "2024-07-24T00:00:00Z" }, comments: [] ]

#### Obter Post por id

    GET /posts/:id
    Resposta: { "id": 1, "content": "Post Content", "created_at": "2024-07-24T00:00:00Z", comments: [] }

#### Atualizar post

    PUT /posts/:id
    Corpo: { "content": "Updated Content" }
    Cabeçalho: Authorization: Bearer session_token
    Resposta: { "id": 1, "content": "Updated Content", comments: [] }

#### Excluir post

    DELETE /posts/:id
    Cabeçalho: Authorization: Bearer session_token
    Resposta: { "message": "Post deleted successfully" }

### Comentários

#### Criar Comentário

POST /comments
Corpo: { "content": "Comment Content" }
Cabeçalho: Authorization: Bearer session_token
Resposta: { "id": 1, "post": postId, "content": "Comment Content", "user", userId, "created_at": "2024-07-24T00:00:00Z" }

#### Excluir comentário

    DELETE /comments/:id
    Cabeçalho: Authorization: Bearer session_token
    Resposta: { "message": "Comment deleted successfully" }

### Observações

    A funcionalidade de deletar e editar posts só pode ser feita pelo dono do post.
    A funcionalidade de deletar comentário só pode ser feita pelo dono do comentário ou do post.
