-- Criar banco de dados se não existir
CREATE DATABASE IF NOT EXISTS green_mind;

-- Usar o banco de dados
USE green_mind;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  level INT DEFAULT 1,
  xp INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criar tabela de trilhas
CREATE TABLE IF NOT EXISTS trails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de níveis
CREATE TABLE IF NOT EXISTS levels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trail_id INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_number INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trail_id) REFERENCES trails(id)
);

-- Criar tabela de questões
CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  level_id INT,
  question TEXT NOT NULL,
  correct_answer INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (level_id) REFERENCES levels(id)
);

-- Criar tabela de opções
CREATE TABLE IF NOT EXISTS options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Criar tabela de progresso do usuário
CREATE TABLE IF NOT EXISTS user_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  trail_id INT,
  level_id INT,
  completed BOOLEAN DEFAULT FALSE,
  score INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (trail_id) REFERENCES trails(id),
  FOREIGN KEY (level_id) REFERENCES levels(id)
);

-- Inserir trilhas iniciais
INSERT INTO trails (title, description, icon, color) VALUES
('Água', 'Aprenda sobre conservação de água', 'water', '#2196F3'),
('Energia', 'Descubra sobre energia renovável', 'energy', '#FFC107'),
('Clima', 'Entenda sobre mudanças climáticas', 'climate', '#4CAF50'),
('Reciclagem', 'Aprenda sobre reciclagem', 'recycling', '#9C27B0'); 