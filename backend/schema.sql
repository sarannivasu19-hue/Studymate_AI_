-- StudyMateAI - Phase 1 schema
-- Run this once against your MySQL server, or let SQLAlchemy auto-create it
-- (the FastAPI app calls Base.metadata.create_all on startup, so this file
-- is mainly for reference / manual setup / your ER diagram writeup).

CREATE DATABASE IF NOT EXISTS studymateai
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE studymateai;

CREATE TABLE IF NOT EXISTS users (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(120)    NOT NULL,
    email           VARCHAR(190)    NOT NULL UNIQUE,
    hashed_password VARCHAR(255)    NOT NULL,
    role            ENUM('student', 'admin') NOT NULL DEFAULT 'student',
    is_active       BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                     ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tables below are stubs for upcoming phases (kept here so your ER diagram
-- for the final report can show the full intended schema early).

CREATE TABLE IF NOT EXISTS documents (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    user_id      INT NOT NULL,
    title        VARCHAR(255) NOT NULL,
    file_path    VARCHAR(500) NOT NULL,
    summary      MEDIUMTEXT,
    uploaded_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS quizzes (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    user_id      INT NOT NULL,
    document_id  INT,
    title        VARCHAR(255) NOT NULL,
    questions_json MEDIUMTEXT NOT NULL,
    created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS chat_history (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    user_id      INT NOT NULL,
    role         ENUM('user','assistant') NOT NULL,
    message      MEDIUMTEXT NOT NULL,
    created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
