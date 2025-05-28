-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS green_mind;
USE green_mind;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de trilhas
CREATE TABLE IF NOT EXISTS trails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de níveis
CREATE TABLE IF NOT EXISTS levels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trail_id INT NOT NULL,
  level_number INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trail_id) REFERENCES trails(id)
);

-- Tabela de perguntas
CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  level_id INT NOT NULL,
  question TEXT NOT NULL,
  correct_answer INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (level_id) REFERENCES levels(id)
);

-- Tabela de opções de resposta
CREATE TABLE IF NOT EXISTS options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  option_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Tabela de progresso do usuário
CREATE TABLE IF NOT EXISTS user_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  trail_id INT NOT NULL,
  level_id INT NOT NULL,
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
('Água', 'Aprenda sobre conservação de água, ciclo hidrológico e práticas sustentáveis.', 'water', '#2196F3'),
('Energia', 'Descubra sobre fontes de energia renovável, eficiência energética e consumo consciente.', 'energy', '#FFC107'),
('Clima', 'Entenda sobre mudanças climáticas, efeito estufa e ações para mitigação.', 'climate', '#4CAF50'),
('Reciclagem', 'Aprenda sobre separação de resíduos, compostagem e redução de lixo.', 'recycling', '#9C27B0');

-- Adicionar índices
ALTER TABLE user_progress ADD INDEX idx_user_trail (user_id, trail_id);
ALTER TABLE questions ADD INDEX idx_level (level_id);
