# Projeto_MVC_-FullStack_Toughts
Projeto FullStack! desenvolvido juntamente com o Prof° Matheus Battist no curso de "Node.js do Zero a Maestria com diversos Projetos".

## O que temos aqui:
Um projeto FullStack, com BackEndv (APIRestfull) e FrontEnd separados. Site para cadastro e adoção de pets.

## Suas funcionalidades são: 
* Cadastro e login de Usuários;
* Cadastro de Pets;
* Dashboard para gerenciar adoção de pets, ver detalhes dos pets;
* Criação de sessão ao logar;
* Utilização de critografia para proteção de senha;
* Utilização de Flash Messages;
* Cors para permissão de acesso entre back e front;
* Upload de arquivos de imagens dos pets e usuários;

## Tecnologias: 
* BackEnd: *Node.js*
* FrontEnd: *React com React-Router*
* Estilo: *CSS3*
* Linguagem: *JavaScript*
* DataBase: *MongoDB*
* DataBase framework: *mongoose*

## Dependências:
### Critografia
* bcrypt

### Permanência de sessão
* cookie-parser

### DataBase
* mongoDB
* mongoose 

### Servidor (BackEnd)
* express
* nodemon

### Comunicação FrontEnd <> BackEnd
* axios

### Permissão de acesso FrontEnd <> BackEnd
* cors

### Gerenciamento de rotas (FrontEnd)
* react-router-dom

### Criação de Token de acesso para authenticação
* jsonwebtoken

### Gerenciar o upload de Arquivos
* multer

## End-Points:

### BackEnd (APIRest)
Rotas para pets:
* /pets/create - post - Cadastrar o pet
* /pets - get - Retornar todos os pets cadastrados no db
* /pets/mypets - get - Retornar todos os pets de um usuário específico
* /pets/myadoptions - get - Retornar os pets adotados pelo usuário
* /pets/id - get - Retornar um pet pelo seu id
* /pets/id - delete - Exclui pet do db pelo seu id
* /pets/id - patch - Atualiza dados do pet pelo seu id
* /pets/schedule/id - patch - Atualiza o dado de agendamento de um usuário para ver o pet
* /pets/conclude/id - patch - Atualiza o dado de adotato de um pet pelo seu id

Rotas para users:
* /users/register - post - Cadastrar usuário no db, criação de conta do usuário
* /users/login - post - Fazer login na conta do usuário
* /users/checkuser - get - Verificar e retornar usuário atual
* /users/id - get - Retornar um usuário pelo id
* /users/edit/id - patch - Atualizar dados de um usuário pelo seu id

### FrontEnd (React.js )
Rotas de páginas: 
* /register - Registro de usuário
* /user/profile - Perfil de usuário
* /pet/mypets - Pets do usuário
* /pet/add - Cadastrar um pet
* /pet/edit/id - Editar um pet 
* /pets/id - Detalhes de um pet
* /pet/myadoptions - Pets adotados pelo usuário
* / - pagina do home, mostra todos os pets cadastrados 