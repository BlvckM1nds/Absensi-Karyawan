CREATE DATABASE IF NOT EXISTS tech_dexa;

USE tech_dexa;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    full_name VARCHAR(75) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(75) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('1', '2') NOT NULL DEFAULT '1',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_modified DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role) REFERENCES roles(id)
);

CREATE TABLE attendances (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    evidence VARCHAR(500) NOT NULL,
    status ENUM('running', 'attended') NOT NULL DEFAULT 'running',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_modified DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE roles (
	id ENUM('1', '2') PRIMARY KEY DEFAULT '1' NOT NULL,
    definition ENUM('user', 'administrator') NOT NULL
);

INSERT INTO roles VALUES ('1', 'user');
INSERT INTO roles VALUES ('2', 'administrator');

DROP TABLE attendances;
DROP TABLE users;
DROP TABLE roles;

SELECT * FROM users;
SELECT * FROM attendances ORDER BY created_at DESC;

-- JOIN TABLE FOR MONITORING
SELECT a.id, u.id AS user_id, u.full_name, a.evidence, a.created_at, a.last_modified, a.status
FROM users u INNER JOIN attendances a ON u.id = a.user_id;

UPDATE users
SET 
    full_name = 'Daphne Andrea'
WHERE
    id = '2';

UPDATE attendances 
SET 
    created_at = '2024-05-28 00:14:40'
WHERE
    user_id = 1;
    
DELETE FROM attendances WHERE id = '4';
    
DELIMITER //

CREATE TRIGGER update_user_last_modified
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
	SET NEW.last_modified = CURRENT_TIMESTAMP;
END //

CREATE TRIGGER update_attendance_last_modified
BEFORE UPDATE ON attendances
FOR EACH ROW
BEGIN
	SET NEW.last_modified = CURRENT_TIMESTAMP;
END //

DELIMITER ;

SHOW TRIGGERS;