const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'seu_jwt_secret_aqui'; // Em produção, use variáveis de ambiente

app.use(cors());
app.use(express.json());

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Rota de registro
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se o email já existe
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir novo usuário
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // Gerar token
    const token = jwt.sign(
      { id: result.insertId, email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: result.insertId,
        name,
        email
      }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota de login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const user = users[0];

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Gerar token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// Rota de verificação de token
app.get('/api/auth/verify', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT id, name, email FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error('Erro na verificação:', error);
    res.status(500).json({ message: 'Erro ao verificar token' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 