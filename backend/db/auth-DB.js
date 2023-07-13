import { mysqlTables } from "../utils/table-names-list.js"
import { connection } from "../setup-and-security/connect.js"

export default new class AuthDB {
  async checkIfUUIDExists (UUID) {
    const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.uuid_reference} WHERE UUID = ?) as 'exists' `
    const values = [UUID]
    const [results] = await connection.execute(sql, values)
    const doesRecordExist = results[0].exists
    return doesRecordExist
  }

  async checkIfUsernameExists (username, loginType) {
    const sql = `SELECT UserID, password FROM ${mysqlTables.credentials} WHERE email = ? AND User_type = ? AND isActive = 1`
    const values = [username, loginType]
    const [results] = await connection.execute(sql, values)
    return results
  }

  async checkIfAccountExists (username, registrationType) {
    //Consider adding isActive as a search parameter. If a user deletes their account, should they be allowed to create a new one with the same email?
    const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.credentials} WHERE email = ? AND User_type = ?) as 'exists' `
    const values = [username, registrationType]
    const [results] = await connection.execute(sql, values)
    const doesAccountExist = results[0].exists
    return doesAccountExist
  }

  async addNewUserCredentials (username, password, createdAt, registrationType) {
    const sql = `INSERT INTO ${mysqlTables.credentials} (email, password, Created_at, User_type, isActive) VALUES (?, ?, ?, ?, ?)`
    const values = [username, password, createdAt, registrationType, 1]
    const [results] = await connection.execute(sql, values)
    const UserID = results.insertId
    return UserID
  }

  async addDoctorSpecificDetails (UserID) {
    const sql = `INSERT INTO ${mysqlTables.doctor_specific_info} (verified, publiclyAvailable, Doctor_ID) VALUES (?, ?, ?)`
    const values = [true, true, UserID]
    await connection.execute(sql, values)
  }

  async updatePassword (password, UserID) {
    const sql = `UPDATE ${mysqlTables.credentials} SET password = ? WHERE UserID = ?`
    const values = [password, UserID]
    await connection.execute(sql, values)
  }

  async retrieveUserPassword (UserID) {
    const sql = `SELECT password FROM ${mysqlTables.credentials} WHERE UserID = ?`
    const values = [UserID]
    const [results] = await connection.execute(sql, values)
    const password = results[0].password
    return password
  }

  async retrieveLoginHistory (User_ID) {
    const sql = `SELECT login_historyID, Login_at FROM ${mysqlTables.login_history} WHERE User_ID = ? ORDER BY Login_at DESC`
    const values = [User_ID]
    const [results] = await connection.execute(sql, values)
    return results
  }

  async addLoginHistory (User_ID, loginTime) {
    const sql = `INSERT INTO ${mysqlTables.login_history} (Login_at, IP_Address, User_ID) VALUES (?, ?, ?)`
    const values = [loginTime, null, User_ID]
    await connection.execute(sql, values)
  }

  async deleteUUIDUponLogout (UUID) {
    const sql = `DELETE FROM ${mysqlTables.uuid_reference} WHERE UUID = ?`
    const values = [UUID]
    await connection.execute(sql, values)
  }

}()
