import dotenv from "dotenv";
dotenv.config();
import format from "pg-format";

import { pool } from "../database/database.js";

const getAllJoyasLimit = async ({
  limits = 3,
  order_by = "id_ASC",
  page = 0,
}) => {
  const [campo, direccion] = order_by.split("_");
  const offset = page * limits;

  const queryFormat = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    campo,
    direccion,
    limits,
    offset,
  );

  try {
    const { rows: joyas } = await pool.query(queryFormat);

    if (joyas.length === 0) {
      throw new Error({ message: error.message });
    }
    return joyas;
  } catch (error) {
    throw new Error({ message: error.message });
  }
};

const getFilteredJoyas = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  let filtros = [];
  let values = [];
  try {
    const addFilter = (campo, comparador, valor) => {
      values.push(valor);
      const { length } = filtros;
      filtros.push(`${campo} ${comparador} $${length + 1}`);

      if (precio_max) addFilter("precio", "<=", precio_max);
      if (precio_min) addFilter("precio", ">=", precio_min);
      if (categoria) addFilter("categoria", "=", categoria);
      if (metal) addFilter("metal", "=", metal);
    };

    const { rows: joyas } = await pool.query(consulta, values);
    return joyas;
  } catch (error) {
    throw new Error({
      message: error.message,
    });
  }
};

const prepareHATEOAS = (joyas) => {
  const results = joyas
    .map((item) => {
      return {
        name: item.nombre,
        href: `http://localhost:3001/joyas/${item.id}`,
      };
    })
    .slice(0, 3);
  const total = joyas.length;
  const HATEOAS = {
    total,
    results,
  };
  return HATEOAS;
};




const inventarioModel = {
  getAllJoyasLimit,
  getFilteredJoyas,
  prepareHATEOAS,
};

export default inventarioModel