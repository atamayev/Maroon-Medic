import { mysqlTables } from "../utils/table-names-list.js"
import { connectDatabase } from "../setup-and-security/connect.js"
import { RowDataPacket } from 'mysql2';

type MysqlTimestamp = string

export default new class UUIDDB {
  async createNewUUID (UUID: string, createdAt: MysqlTimestamp, UserID: number) {
    const sql = `INSERT INTO ${mysqlTables.uuid_reference} (UUID, Created_at, User_ID) VALUES (?, ?, ?)`
    const values = [UUID, createdAt, UserID]
    const connection = await connectDatabase()
    await connection.execute(sql, values)
  }

  async retrieveUUID (UUID: string): Promise<number | undefined> {
    const sql = `SELECT User_ID FROM ${mysqlTables.uuid_reference} WHERE UUID = ?`;
    const values = [UUID];
    const connection = await connectDatabase();
    const [results] = await connection.execute(sql, values);
    const userID = (results as RowDataPacket).User_ID;
    return userID;
  }
}()
