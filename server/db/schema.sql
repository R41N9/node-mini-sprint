DROP DATABASE quotes_generator IF EXISTS;
CREATE DATABASE quotes_generator;
USE quotes_generator;


CREATE TABLE quotes (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(100) NOT NULL);