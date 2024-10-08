// eslint-disable-next-line filenames/match-regex
import { mysqlTables } from "../utils/table-names-list"
import { connectDatabase } from "../setup-and-security/connect"
import { RowDataPacket } from "mysql2"

export default new class UUIDDB {
	async createNewUUID (UUID: string, userId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.uuid_reference} (UUID, user_id) VALUES (?, ?)`
		const values = [UUID, userId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async retrieveUUID (UUID: string): Promise<number> {
		const sql = `SELECT user_id FROM ${mysqlTables.uuid_reference} WHERE UUID = ?`
		const values = [UUID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const userId = (results as RowDataPacket)[0].user_id
		if (!userId) throw new Error("UUID not found")
		return userId
	}
}()
