import { mysqlTables } from "../utils/table-names-list"
import { connectDatabase } from "../setup-and-security/connect"
import { RowDataPacket } from 'mysql2';

type MysqlTimestamp = string

export default new class UUIDDB {
  async createNewUUID (UUID: string, createdAt: MysqlTimestamp, UserID: number): Promise<void> {
    const sql = `INSERT INTO ${mysqlTables.uuid_reference} (UUID, Created_at, User_ID) VALUES (?, ?, ?)`
    const values = [UUID, createdAt, UserID]
    const connection = await connectDatabase()
    await connection.execute(sql, values)
  }

  async retrieveUUID (UUID: string): Promise<number> {
    const sql = `SELECT User_ID FROM ${mysqlTables.uuid_reference} WHERE UUID = ?`;
    const values = [UUID];
    const connection = await connectDatabase();
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const userID = (results as RowDataPacket)[0].User_ID;
    if (!userID) throw new Error("UUID not found")
    return userID;
  }
}()