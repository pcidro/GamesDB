# Games DB

**GAMES DB** O Games DB é uma aplicação de gerenciamento e catalogação de jogos, desenvolvida para permitir que entusiastas organizem sua biblioteca pessoal e atribuam notas aos títulos jogados.

### 🔗 [Deploy do projeto](https://gamesdeb.netlify.app/)

---

## 📌 Sobre o projeto

Esse projeto foi criado pensando em fornecer um espaço para fãns de jogos poderem de forma simples e fácil pesquisarem qualquer jogo, podendo adicionarem aos seus favoritos e também dar nota a eles.

---

## Tecnologias

- **React + Javascript**
- **Firebase**
  - Authentication (login)
- **Context API**

---

## Funcionalidades

### Autenticação

- Cadastro e login de usuários via Firebase

### Rotas protegidas

- Só é possivel acessar a área de _Meus Jogos_ se o usuário estiver autenticado

### Adicionar Jogos aos Favoritos

- Adicionar e remover jogos
- Interface responsiva e moderna
- Persistência com **Local Storage**

### Dar nota aos jogos

- É possivel ver a nota geral dos usuários referente a qualquer jogo
- Você também pode atribuir nota ao jogo e a sua nota ficará salva.

## ▶️ Como rodar o projeto localmente

### 1. Clonar e instalar

```bash
git clone https://github.com/pcidro/GamesDB
cd GamesDB
npm install
```

---

### 2. Configurar Firebase

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

---

### 2. Configurar API KEY

Este projeto consome dados da RAWG Video Games Database. Para rodar a aplicação, você precisará de uma chave de API gratuita.

Passo 1: Obter a Chave
Acesse o site RAWG.io API Docs.

Crie uma conta ou faça login.

Clique no botão "Get API key" (ou vá em Settings > API Key).

Preencha o formulário com o nome do seu projeto e sua URL (pode usar http://localhost).

Copie a chave gerada.

Passo 2: Configurar Variáveis de Ambiente
Na raiz do projeto, crie um arquivo chamado .env e adicione sua chave seguindo o modelo abaixo:

VITE_RAWG_KEY=SUA_CHAVE_AQUI

### 4.Rodar o projeto

```bash
npm run dev
```

### Aprendizados

O principal foi aprender a lidar melhor com estados globais usando Context API — principalmente carrinho, busca e pedidos. Foi extremamente gratificante conseguir implementar tais funcionalidades de forma correta e assertiva, da forma como o mercado utiliza, e me sinto muito mais preparado para fazer novos projetos com estados cada vez mais complexos e desafiadores.

Outra parte que deu trabalho foi a responsividade, principalmente o header. Tive que ajustar bastante grid, tamanhos e comportamento em telas menores.

No geral, foi um projeto que me deixou bem mais confortável pra construir coisas mais complexas.
