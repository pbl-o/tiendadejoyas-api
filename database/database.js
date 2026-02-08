import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

export const getDate = async () => {
  const { rows } = await pool.query("SELECT NOW()");
  try {
    console.log(`Bases de datos conectada con éxito (Time: ${rows[0].now})`);
  } catch (error) {
    throw new Error({
      message: error.message,
    });
  }
};
