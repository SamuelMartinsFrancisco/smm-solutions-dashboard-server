CREATE TABLE IF NOT EXISTS courses
(
    id VARCHAR(8) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    img VARCHAR(60),
    link VARCHAR(200) NOT NULL,
    tags VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS projects
(
    id VARCHAR(8) NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    img VARCHAR(60),
    tags VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS secrets_place
(
    id VARCHAR(8) NOT NULL,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
);