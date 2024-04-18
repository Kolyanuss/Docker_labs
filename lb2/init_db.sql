CREATE DATABASE IF NOT EXISTS test_db_node;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'admin'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON test_db_node.* TO 'admin'@'localhost';
GRANT ALL PRIVILEGES ON test_db_node.* TO 'admin'@'%';
FLUSH PRIVILEGES;
USE test_db_node;
CREATE TABLE IF NOT EXISTS Car (id INT PRIMARY KEY, model TEXT, year INT, price REAL);
INSERT INTO Car (id, model, year, price) VALUES (1, "TESLA", 2077, 10999) ON DUPLICATE KEY UPDATE model="TESLA";