# 🎓 MariSchool — Sistema de Gerenciamento de Matrículas

Sistema fullstack para gerenciamento de cursos e matrículas, com autenticação JWT, desenvolvido com **NestJS** no backend e **React** no frontend.

---

## 🛠️ Pré-requisitos

Antes de tudo, certifique-se de ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) v20 ou superior
- [npm](https://www.npmjs.com/) v9 ou superior
- [PostgreSQL](https://www.postgresql.org/download/) v14 ou superior
- [Git](https://git-scm.com/)

---

## 📦 Tecnologias utilizadas

### Backend
| Pacote | Versão | Descrição |
|--------|--------|-----------|
| `@nestjs/common` | ^11.0.1 | Framework principal |
| `@nestjs/core` | ^11.0.1 | Núcleo do NestJS |
| `@nestjs/typeorm` | ^11.0.0 | Integração com TypeORM |
| `@nestjs/jwt` | ^11.0.2 | Autenticação JWT |
| `@nestjs/passport` | ^11.0.5 | Estratégias de autenticação |
| `@nestjs/config` | ^4.0.3 | Variáveis de ambiente |
| `typeorm` | ^0.3.28 | ORM para banco de dados |
| `pg` | ^8.20.0 | Driver PostgreSQL |
| `passport-jwt` | ^4.0.1 | Estratégia JWT |
| `bcrypt` | ^6.0.0 | Hash de senhas |
| `class-validator` | ^0.14.4 | Validação de DTOs |
| `class-transformer` | ^0.5.1 | Transformação de objetos |

### Frontend
| Pacote | Versão | Descrição |
|--------|--------|-----------|
| `react` | ^19.2.4 | Biblioteca de UI |
| `react-dom` | ^19.2.4 | Renderização no DOM |
| `react-router-dom` | ^7.13.1 | Navegação entre páginas |
| `@tanstack/react-query` | ^5.90.21 | Gerenciamento de dados e cache |
| `react-hook-form` | ^7.71.2 | Gerenciamento de formulários |
| `@hookform/resolvers` | ^5.2.2 | Integração do Zod com RHF |
| `zod` | ^4.3.6 | Validação de schemas |
| `axios` | ^1.13.6 | Cliente HTTP |

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/WebersonRodrigues7/marischool
cd marischool
```

---

### 2. Configurar e rodar o Backend

```bash
cd api-matriculas
npm install
```

Crie um arquivo `.env` na raiz da pasta `api-matriculas`:

```env
# Banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=sua_senha_aqui
DB_NAME=marischool

# JWT
JWT_SECRET=sua_chave_secreta_aqui
```

> ⚠️ **Atenção:** Antes de rodar, certifique-se de que o PostgreSQL está rodando e que o banco `marischool` existe. Você pode criá-lo com:
> ```sql
> CREATE DATABASE marischool;
> ```

Rode as migrations e inicie o servidor:

```bash
npm run migration:run
npm run start:dev
```

O backend estará disponível em `http://localhost:3000`

---

### 3. Configurar e rodar o Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

---

### 4. Criar um usuário administrador

Para fazer login no sistema, insira um colaborador diretamente no banco via Beekeeper ou psql:

```sql
INSERT INTO collaborator (email, password)
VALUES ('seu@email.com', 'suasenha');
```

---

## 🔐 Autenticação

O sistema usa **JWT Bearer Token**. Faça login em `/auth/login` para receber o token. Rotas protegidas exigem o header:

```
Authorization: Bearer <token>
```

---

## 📡 Rotas da API

### Auth

| Método | Rota | Autenticação | Descrição |
|--------|------|:------------:|-----------|
| `POST` | `/auth/login` | ❌ | Realiza login e retorna JWT |
| `GET` | `/auth/profile` | ✅ | Retorna dados do usuário logado |

**Body do login:**
```json
{
  "email": "seu@email.com",
  "password": "suasenha"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Cursos

| Método | Rota | Autenticação | Descrição |
|--------|------|:------------:|-----------|
| `GET` | `/courses` | ❌ | Lista todos os cursos |
| `GET` | `/courses/:id/enrollments` | ✅ | Lista matrículas de um curso |
| `POST` | `/courses` | ✅ | Cria um novo curso |
| `PUT` | `/courses/:id` | ✅ | Atualiza um curso |
| `DELETE` | `/courses/:id` | ✅ | Remove um curso |

**Body para criar/atualizar curso:**
```json
{
  "name": "Curso de Desenvolvimento Backend",
  "price": 299.90,
  "active": true
}
```

---

### Matrículas

| Método | Rota | Autenticação | Descrição |
|--------|------|:------------:|-----------|
| `GET` | `/enrollments` | ❌ | Lista todas as matrículas |
| `POST` | `/enrollments` | ❌ | Cria uma nova matrícula |
| `DELETE` | `/enrollments/:id` | ✅ | Remove uma matrícula |

**Body para criar matrícula:**
```json
{
  "studentName": "João Silva",
  "studentEmail": "joao@email.com",
  "studentPhone": "11999999999",
  "birthDate": "2000-01-15",
  "studentCpf": "12345678900",
  "courseId": 1
}
```

> ⚠️ **Atenção:** O curso precisa estar com `active: true` para aceitar matrículas.

---

## 🖥️ Funcionalidades do Frontend

- ✅ Login com validação de formulário (Zod + React Hook Form)
- ✅ Rotas protegidas por JWT
- ✅ Listagem de cursos
- ✅ Criação de curso via modal
- ✅ Remoção de curso
- ✅ Visualização de matrículas por curso em modal
- ✅ Criação de matrícula
- ✅ Atualização automática após operações (React Query)
- ✅ Navbar com logout

---

## 👨‍💻 Autor

**Weberson Giovani Rodrigues Junior**

[![GitHub](https://img.shields.io/badge/GitHub-WebersonRodrigues7-181717?style=flat&logo=github)](https://github.com/WebersonRodrigues7)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Weberson_Giovani-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/weberson-giovani-226792377/)
