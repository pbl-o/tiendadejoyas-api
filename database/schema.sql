-- Active: 1769730037726@@127.0.0.1@5432@joyas
CREATE DATABASE joyas;
DROP DATABASE joyas;
-- Acceso a la base de datos en la terminal psql:
--\c joyas

-- Antes de crear la tabla, para borrar otra con el mismo nombre.
DROP TABLE IF EXISTS inventario;

CREATE TABLE inventario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    categoria VARCHAR(50),
    metal VARCHAR(50),
    precio INT,
    stock INT
)

INSERT INTO
    inventario
values (
        DEFAULT,
        'Collar Heart',
        'collar',
        'oro',
        20000,
        2
    ),
    (
        DEFAULT,
        'Collar History',
        'collar',
        'plata',
        15000,
        5
    ),
    (
        DEFAULT,
        'Aros Berry',
        'aros',
        'oro',
        12000,
        10
    ),
    (
        DEFAULT,
        'Aros Hook Blue',
        'aros',
        'oro',
        25000,
        4
    ),
    (
        DEFAULT,
        'Anillo Wish',
        'aros',
        'plata',
        30000,
        4
    ),
    (
        DEFAULT,
        'Anillo Cuarzo Greece',
        'anillo',
        'oro',
        40000,
        2
    );

-- Para vigilar la tabla sin levantar capa cliente temporalmente.
SELECT * FROM inventario;