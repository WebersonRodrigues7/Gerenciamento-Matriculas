🎓 MariSchool — Sistema de Gerenciamento de Matrículas
Sistema fullstack para gerenciamento de cursos e matrículas, com autenticação JWT, desenvolvido com NestJS no backend e React no frontend.

🛠️ Pré-requisitos
Antes de tudo, certifique-se de ter instalado na sua máquina:

Node.js v20 ou superior
npm v9 ou superior
PostgreSQL v14 ou superior
Git


📦 Tecnologias utilizadas
Backend
PacoteVersãoDescrição@nestjs/common^11.0.1Framework principal@nestjs/core^11.0.1Núcleo do NestJS@nestjs/typeorm^11.0.0Integração com TypeORM@nestjs/jwt^11.0.2Autenticação JWT@nestjs/passport^11.0.5Estratégias de autenticação@nestjs/config^4.0.3Variáveis de ambientetypeorm^0.3.28ORM para banco de dadospg^8.20.0Driver PostgreSQLpassport-jwt^4.0.1Estratégia JWTbcrypt^6.0.0Hash de senhasclass-validator^0.14.4Validação de DTOsclass-transformer^0.5.1Transformação de objetos
Frontend
PacoteVersãoDescriçãoreact^19.2.4Biblioteca de UIreact-dom^19.2.4Renderização no DOMreact-router-dom^7.13.1Navegação entre páginas@tanstack/react-query^5.90.21Gerenciamento de dados e cachereact-hook-form^7.71.2Gerenciamento de formulários@hookform/resolvers^5.2.2Integração do Zod com RHFzod^4.3.6Validação de schemasaxios^1.13.6Cliente HTTP

⚙️ Como rodar o projeto
1. Clone o repositório
bashgit clone https://github.com/WebersonRodrigues7/marischool
cd marischool

2. Configurar e rodar o Backend
bashcd api-matriculas
npm install
Crie um arquivo .env na raiz da pasta api-matriculas:
env# Banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=sua_senha_aqui
DB_NAME=marischool

# JWT
JWT_SECRET=sua_chave_secreta_aqui

⚠️ Atenção: Antes de rodar, certifique-se de que o PostgreSQL está rodando e que o banco marischool existe. Você pode criá-lo com:
sqlCREATE DATABASE marischool;

Rode as migrations e inicie o servidor:
bashnpm run migration:run
npm run start:dev
O backend estará disponível em http://localhost:3000

3. Configurar e rodar o Frontend
Em outro terminal:
bashcd frontend
npm install
npm run dev
O frontend estará disponível em http://localhost:5173

4. Criar um usuário administrador
Para fazer login no sistema, insira um colaborador diretamente no banco via Beekeeper ou psql:
sqlINSERT INTO collaborator (email, password)
VALUES ('seu@email.com', 'suasenha');

🔐 Autenticação
O sistema usa JWT Bearer Token. Faça login em /auth/login para receber o token. Rotas protegidas exigem o header:
Authorization: Bearer <token>

📡 Rotas da API
Auth
MétodoRotaAutenticaçãoDescriçãoPOST/auth/login❌Realiza login e retorna JWTGET/auth/profile✅Retorna dados do usuário logado
Body do login:
json{
  "email": "seu@email.com",
  "password": "suasenha"
}
Resposta:
json{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Cursos
MétodoRotaAutenticaçãoDescriçãoGET/courses❌Lista todos os cursosGET/courses/:id/enrollments✅Lista matrículas de um cursoPOST/courses✅Cria um novo cursoPUT/courses/:id✅Atualiza um cursoDELETE/courses/:id✅Remove um curso
Body para criar/atualizar curso:
json{
  "name": "Curso de Desenvolvimento Backend",
  "price": 299.90,
  "active": true
}

Matrículas
MétodoRotaAutenticaçãoDescriçãoGET/enrollments❌Lista todas as matrículasPOST/enrollments❌Cria uma nova matrículaDELETE/enrollments/:id✅Remove uma matrícula
Body para criar matrícula:
json{
  "studentName": "João Silva",
  "studentEmail": "joao@email.com",
  "studentPhone": "11999999999",
  "birthDate": "2000-01-15",
  "studentCpf": "12345678900",
  "courseId": 1
}

⚠️ Atenção: O curso precisa estar com active: true para aceitar matrículas.


🖥️ Funcionalidades do Frontend

✅ Login com validação de formulário (Zod + React Hook Form)
✅ Rotas protegidas por JWT
✅ Listagem de cursos
✅ Criação de curso via modal
✅ Remoção de curso
✅ Visualização de matrículas por curso em modal
✅ Criação de matrícula
✅ Atualização automática após operações (React Query)
✅ Navbar com logout


Autor
Weberson Giovani Rodrigues Junior
