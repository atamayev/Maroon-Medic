import dotenv from "dotenv"
dotenv.config()
import mysql from "mysql2/promise"

let connection: mysql.Connection | undefined

export async function connectDatabase(): Promise<mysql.Connection> {
	if (!connection) {
		console.log("Connecting to MYSQL...")
		connection = await mysql.createConnection({
			host: process.env.MYSQL_HOST as string,
			user: process.env.MYSQL_USER as string,
			password: process.env.MYSQL_PASSWORD as string,
			database: process.env.MYSQL_DATABASE as string,
			multipleStatements: true
		})
	}
	return connection
}
