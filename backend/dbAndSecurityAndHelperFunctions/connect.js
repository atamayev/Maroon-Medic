import dotenv from "dotenv"
dotenv.config()
import mysql from "mysql2/promise"

/**
 * connection establishes an asynchronus MYSQL connection using keys in .env
 */
export const connection = await mysql.createConnection({
  host    : process.env.MYSQL_HOST,
  user    : process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE, 
  multipleStatements: true
});

/**
 * useDB selects the database to work with. useful when there are multiple databases being read from
 * Only DB name has a practical function. The other 2 are to know which function is calling useDB, and which table is being modified/read from
 * @param {string} name_of_api Name of API is always the name of the function that is calling useDB (non-functional, just for visibility)
 * @param {string} table_name Which table is being accessed (non-functional, just for visibility)
 */
export async function DB_Operation (name_of_api, table_name) {
  try {
    //await connection.query(`use ${DB_NAME}`)
    console.log(`used API: ${name_of_api} and Table: ${table_name}`);
  } catch (err) {
    console.log('useDB ERROR', err);
  }
};