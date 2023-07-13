import { mysqlTables } from "../utils/table-names-list.js"
import { connection } from "../setup-and-security/connect.js"

export default new class UUIDDB {
  async createNewUUID (UUID, createdAt, UserID) {
    const sql = `INSERT INTO ${mysqlTables.uuid_reference} (UUID, Created_at, User_ID) VALUES (?, ?, ?)`
    const values = [UUID, createdAt, UserID]
    await connection.execute(sql, values)
  }

  async retrieveUUID (UUID) {
    const sql = `SELECT User_ID FROM ${mysqlTables.uuid_reference} WHERE UUID = ?`
    const values = [UUID]
    const [incompleteID] = await connection.execute(sql, values)
    return incompleteID
  }
}()
