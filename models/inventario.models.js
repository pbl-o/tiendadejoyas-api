import dotenv from "dotenv";
dotenv.config();
import format from "pg-format";

import { pool } from "../database/database.js";

const getAllJoyasLimit = async ({
  limits = 6,
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
      throw new Error("No Elements Found");
    }
    return joyas;
  } catch (error) {
    throw error;
  }
};

const getFilteredJoyas = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  try {
    let filtros = [];
    let values = [];
    const addFilter = (campo, comparador, valor) => {
      values.push(valor);
      const { length } = filtros;
      filtros.push(`${campo} ${comparador} $${length + 1}`);
    };

    if (precio_max) addFilter("precio", "<=", precio_max);
    if (precio_min) addFilter("precio", ">=", precio_min);
    if (categoria) addFilter("categoria", "=", categoria);
    if (metal) addFilter("metal", "=", metal);

    if (values.length === 0) {
      throw new Error("No filters found");
    }

    let consulta = "SELECT * from inventario";
    if (filtros.length > 0) {
      filtros = filtros.join(" AND ");
      consulta += ` WHERE ${filtros}`;
    }

    const { rows: joyas } = await pool.query(consulta, values);
    return joyas;
  } catch (error) {
    throw error;
  }
};

const prepareHATEOAS = (joyas) => {
  const results = joyas.map((item) => {
    return {
      name: item.nombre,
      href: `http://localhost:${process.env.API_PORT}/joyas/${item.id}`,
    };
  })
  //.slice(0, joyas.length);  
  const total = joyas.length;
  const totalStock = joyas.reduce((sum, item) => sum + item.stock, 0 )
  const HATEOAS = {
    total,
    totalStock,
    results,
  };
  return HATEOAS;
};

const inventarioModel = {
  getAllJoyasLimit,
  getFilteredJoyas,
  prepareHATEOAS,
};

export default inventarioModel;
