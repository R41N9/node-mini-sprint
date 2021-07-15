DROP DATABASE IF EXISTS quotes_generator;
CREATE DATABASE quotes_generator;
USE quotes_generator;


CREATE TABLE quotes (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(100) NOT NULL);