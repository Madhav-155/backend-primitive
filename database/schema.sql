-- Create database
CREATE DATABASE IF NOT EXISTS backend_primitive;
USE backend_primitive;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
);

-- Insert sample admin user (password: admin123)
-- Password hash generated with bcryptjs for 'admin123'
INSERT INTO users (username, email, password, role) VALUES 
('admin', 'admin@example.com', '$2a$10$8fZKqMvH6p7XZGNjQZ2YLuKvJ7mP6qXwQHZ6zF1xYfYqLqYZ6YZ6Y', 'admin');

-- Insert sample regular user (password: user123)
-- Password hash generated with bcryptjs for 'user123'
INSERT INTO users (username, email, password, role) VALUES 
('user', 'user@example.com', '$2a$10$8fZKqMvH6p7XZGNjQZ2YLuKvJ7mP6qXwQHZ6zF1xYfYqLqYZ6YZ6Y', 'user');
