# Green Mind - Plataforma de Educação Ambiental

Green Mind é uma plataforma gamificada de educação ambiental, inspirada no Duolingo, que oferece trilhas de aprendizado sobre temas ambientais como Água, Energia, Clima e Reciclagem.

## Funcionalidades

- Sistema de autenticação (login/registro)
- Trilhas de aprendizado com diferentes níveis
- Perguntas e respostas de múltipla escolha
- Sistema de progresso e conquistas
- Interface moderna e responsiva
- Gamificação com feedback imediato

## Tecnologias Utilizadas

### Frontend
- React
- Material-UI
- React Router
- Axios
- Framer Motion

### Backend
- Node.js
- Express
- MySQL
- JWT para autenticação
- Bcrypt para hash de senhas

## Requisitos

- Node.js (v14 ou superior)
- MySQL (v8 ou superior)
- XAMPP (ou similar) para ambiente de desenvolvimento

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/green-mind.git
cd green-mind
```

2. Configure o banco de dados:
- Inicie o XAMPP e ative o MySQL
- Importe o arquivo `db.sql` no phpMyAdmin

3. Instale as dependências do backend:
```bash
cd backend
npm install
```

4. Instale as dependências do frontend:
```bash
cd ../frontend
npm install
```

5. Configure as variáveis de ambiente:
- No arquivo `backend/config/database.js`, ajuste as credenciais do banco de dados se necessário
- No arquivo `backend/server.js`, defina uma chave secreta para o JWT

## Executando o Projeto

1. Inicie o backend:
```bash
cd backend
npm run dev
```

2. Em outro terminal, inicie o frontend:
```bash
cd frontend
npm start
```

3. Acesse a aplicação em `http://localhost:3000`

## Estrutura do Projeto

```
green-mind/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
├── backend/
│   ├── config/
│   ├── routes/
│   └── server.js
└── db.sql
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 