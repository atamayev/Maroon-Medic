import dotenv from "dotenv"
dotenv.config()
import mysql from "mysql2/promise"

export const connection = await mysql.createConnection({
    host    : process.env.MYSQL_HOST,
    user    : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

export async function useDB (name_of_api, db_name, table_name){
    try{
      await connection.query(`use ${db_name}`)
      console.log(`used API: ${name_of_api}, DB: ${db_name}, and Table: ${table_name}`);
    } catch (err) {
      console.log('useDB ERROR',err);
  }
}
