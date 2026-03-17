MariSchool – Sistema de Matrículas

API RESTful desenvolvida em NestJS + TypeORM + JWT para gerenciar cursos e matrículas de forma digitalizada.

O sistema permite que qualquer pessoa realize matrículas e que colaboradores autenticados administrem os cursos.

🚀 Tecnologias Utilizadas

NestJS

TypeScript

TypeORM

MySQL

JWT (Passport / AuthGuard)

Class-validator

📦 Requisitos

Antes de rodar o projeto, você precisa ter instalado:

Node.js 18+

NPM ou Yarn

Banco MYSQL

Nest CLI

Instalar Nest CLI:

npm i -g @nestjs/cli

🔧 Instalação

Clone o repositório:

git clone https://github.com/WebersonRodrigues7/Projeto-Matriculas.git
cd projetoMatricula


Instale as dependências:

npm install

⚙️ Configuração do Banco de Dados

Edite o arquivo .env ou diretamente no app.module.ts:

Exemplo:

DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASS=senha
DB_NAME=marischool
JWT_SECRET=supersecretkey
JWT_EXPIRES=1d

▶️ Rodando o Projeto

Execute em modo desenvolvimento:

npm run start:dev


O servidor subirá em:

http://localhost:3000

🔐 Autenticação

O sistema usa JWT.

Faça login:

POST /auth/login

Body:

{
  "email": "colaborador@escola.com",
  "password": "123456"
}


Retorno:

{
  "access_token": "token_aqui"
}


Para rotas protegidas, enviar:

Authorization: Bearer TOKEN_AQUI

📚 ENDPOINTS
📘 1. Cursos
✔️ GET /courses (PÚBLICO)

Lista todos os cursos ativos.

🔒 POST /courses (PROTEGIDO)

Cria um curso.

{
  "name": "Informática Básica",
  "description": "Curso introdutório",
  "price": 500
}

🔒 PUT /courses/:id

Atualiza dados de um curso.

🔒 DELETE /courses/:id

Exclusão lógica (active = false)

Resposta:

{
  "message": "Curso desativado!"
}

🔒 GET /courses/:id/enrollments

Retorna as matrículas do curso.

🎓 2. Matrículas
✔️ POST /enrollments (PÚBLICO)
{
  "studentName": "João da Silva",
  "studentEmail": "joao@gmail.com",
  "studentCpf": "123.456.789-10",
  "studentPhone": "11 99999-0000",
  "birthDate": "2008-03-12",
  "courseId": 1
}


Validações:

Curso deve existir

Curso deve estar ativo

✔️ GET /enrollments (PÚBLICO)

Retorna todas as matrículas.

🔒 DELETE /enrollments/:id

Remove uma matrícula.

🗂️ Estrutura do Projeto
src/
 ├── auth/
 ├── course/
 ├── enrollment/
 ├── app.module.ts
 ├── main.ts

🧪 Testes com Insomnia/Postman

Criar curso (com JWT)

Criar matrícula (público)

Listar cursos

Listar matrículas do curso

Desativar curso

Tentar matricular novamente → deve falhar

📝 Observações Importantes

Cursos inativos não aparecem para matrícula.

Matrícula só pode ser feita se o curso estiver ativo.

Exclusão lógica = active = false

Apenas GET de cursos é público; o resto é protegido.

Colaboradores são cadastrados manualmente no banco.

Autores

Weberson Giovani Rodrigues
Henrique Coelho Fidalgo