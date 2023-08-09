import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { OkPacket, RowDataPacket } from "mysql2"

interface PersonalInfo {
  FirstName: string
  LastName: string
  Gender: string
}

export default new class SavePatientDataDB {
  async checkIfPersonalDataExists (PatientID: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?) as 'exists' `
    const values = [PatientID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values)
    const doesRecordExist = (results as RowDataPacket[])[0].exists
    return Boolean(doesRecordExist)
  }

  async updatePersonalData (personalInfo: PersonalInfo, DOB: MysqlTimestamp, PatientID: number): Promise<void> {
    const sql = `UPDATE ${mysqlTables.basic_user_info} SET FirstName = ?, LastName = ?, Gender = ?, DOB = ? WHERE User_ID = ?`
    const values = [personalInfo.FirstName, personalInfo.LastName, personalInfo.Gender, DOB, PatientID]
    const connection = await connectDatabase()
    await connection.execute(sql, values)
  }

  async addPersonalData (personalInfo: PersonalInfo, DOB: MysqlTimestamp, PatientID: number): Promise<void> {
    const sql = `INSERT INTO ${mysqlTables.basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?, ?, ?, ?, ?)`
    const values = [personalInfo.FirstName, personalInfo.LastName, personalInfo.Gender, DOB, PatientID]
    const connection = await connectDatabase()
    await connection.execute(sql, values)
  }

  async addLanguage(languageID: number, PatientID: number): Promise<void> {
    const sql = `INSERT INTO ${mysqlTables.language_mapping} (Language_ID, User_ID) VALUES (?, ?)`
    const values = [languageID, PatientID]
    const connection = await connectDatabase()
    await connection.execute(sql, values)
  }

  async deleteLanguage(languageID: number, PatientID: number): Promise<void> {
    const sql = `DELETE FROM ${mysqlTables.language_mapping} WHERE Language_ID = ? AND User_ID = ?`
    const values = [languageID, PatientID]
    const connection = await connectDatabase()
    await connection.execute(sql, values)
  }

  async addNewPet(petData: PetPersonalInfo, PatientID: number): Promise<number> {
    const sql = `INSERT INTO ${mysqlTables.pet_info} (Name, Gender, DOB, Patient_ID, pet_ID) VALUES (?, ?, ?, ?, ?)`
    const values = [petData.Name, petData.Gender, petData.DOB, PatientID, petData.pet_listID]
    const connection = await connectDatabase()
    const [result] = await connection.execute(sql, values)
    return (result as OkPacket).insertId
  }

  async addNewPetInsurance (insuranceListID: number, petInfoID: number): Promise<void> {
    const sql = `INSERT INTO ${mysqlTables.insurance_mapping} (Insurance_ID, pet_info_ID) VALUES (?, ?)`
    const values = [insuranceListID, petInfoID]
    const connection = await connectDatabase()
    await connection.execute(sql, values)
  }

  async deletePet(petID: number): Promise<void> {
    const sql = `UPDATE ${mysqlTables.pet_info} SET isActive = 0 WHERE pet_infoID = ?`
    const values = [petID]
    const connection = await connectDatabase()
    await connection.execute(sql, values)
  }
}()
