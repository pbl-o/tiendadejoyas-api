# Tienda Joyas API 

API REST para gestionar consultas parametrizadas a una base de datos. Permite filtrar, paginar, ordenar resultados y estructurar respuestas bajo el modelo HATEOAS.

## Tecnologías Empleadas

- Node.js, express.js, SQL

## Instalación y uso.

Instrucciones des instalación y configuración del proyecto:

1. Clonar repositorio:

```bash
git clone https://github.com/pbl-o/tiendadejoyas-api.git
```

\*Pasos 2 y 5 aplican tanto a la capa cliente como a la capa de negocios (servidor)

2. Instalar dependencias:

```bash
npm install
```

3. Crear la base de datos en el servidor local usando el archivo
   'schema.sql' o copiándola directamente de aquí:

```bash

CREATE DATABASE joyas;
\c joyas;
CREATE TABLE inventario (id SERIAL, nombre VARCHAR(50), categoria
VARCHAR(50), metal VARCHAR(50), precio INT, stock INT);
INSERT INTO inventario values
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);

```

\* Es importante crear la base de datos, de lo contrario la aplicación no funcionará correctamente.

4. Para un correcto funcionamiento, también será necesario colocar las propias credenciales para acceder a pqsl en variables ambientales (.env) de la forma indicada en el archivo 'env.example'.

5. Para Levantar el servidor:

```bash
npm run dev
```

Para consultar datos por medio de un api tester:

Rutas: 
http://localhost:3001/joyas
http://localhost:3001/joyas/filtros

Consultas:

(EJEMPLOS)

http://localhost:3001/joyas?limits=4&order_by=id_ASC&page=1 
(Para ver la primera página de una consulta limitada a 4 elementos ordenadsa por id ascendente, página 1)
http://localhost:3001/joyas/filtros?precio_max=300000
(Ver joyas cuyo precio sea 30000 como máximo)

Posibles filtros :
{
?precio_max=<numero>
?precio_min=<numero>
?categoria=<tipo de joya>
?metal=<oro o plata>
}

\* Para revisar si la aplicación está funcionando vía browser:

http://localhost:3001 ó http://localhost:3001/joyas

Pablo E. Díaz. A.
