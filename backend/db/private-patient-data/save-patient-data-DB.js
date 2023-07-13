import { mysqlTables } from "../../utils/table-names-list.js"
import { connection } from "../../setup-and-security/connect.js"

export default new class SavePatientDataDB {
  async checkIfPersonalDataExists (PatientID) {
    const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?) as 'exists' `
    const values = [PatientID]
    const [results] = await connection.execute(sql, values)
    const doesRecordExist = results[0].exists
    return doesRecordExist
  }

  async updatePersonalData (personalInfo, DOB, PatientID) {
    const sql = `UPDATE ${mysqlTables.basic_user_info} SET FirstName = ?, LastName = ?, Gender = ?, DOB = ? WHERE User_ID = ?`
    const values = [personalInfo.FirstName, personalInfo.LastName, personalInfo.Gender, DOB, PatientID]
    await connection.execute(sql, values)
  }

  async addPersonalData (personalInfo, DOB, PatientID) {
    const sql = `INSERT INTO ${mysqlTables.basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?, ?, ?, ?, ?)`
    const values = [personalInfo.FirstName, personalInfo.LastName, personalInfo.Gender, DOB, PatientID]
    await connection.execute(sql, values)
  }

  async addLanguage(languageID, PatientID) {
    const sql = `INSERT INTO ${mysqlTables.language_mapping} (Language_ID, User_ID) VALUES (?, ?)`
    const values = [languageID, PatientID]
    await connection.execute(sql, values)
  }

  async deleteLanguage(languageID, PatientID) {
    const sql = `DELETE FROM ${mysqlTables.language_mapping} WHERE Language_ID = ? AND User_ID = ?`
    const values = [languageID, PatientID]
    await connection.execute(sql, values)
  }

  async addNewPet(petData, PatientID) {
    const sql = `INSERT INTO ${mysqlTables.pet_info} (Name, Gender, DOB, Patient_ID, pet_ID, isActive) VALUES (?, ?, ?, ?, ?, ?)`
    const values = [petData.Name, petData.Gender, petData.DOB, PatientID, petData.pet_listID, 1]
    const [result] = await connection.execute(sql, values)
    return result.insertId
  }

  async addNewPetInsurance (insuranceListID, petInfoID) {
    const sql = `INSERT INTO ${mysqlTables.insurance_mapping} (Insurance_ID, pet_info_ID) VALUES (?, ?)`
    const values = [insuranceListID, petInfoID]
    await connection.execute(sql, values)
  }

  async deletePet(petID) {
    const sql = `UPDATE ${mysqlTables.pet_info} SET isActive = 0 WHERE pet_ID = ?`
    const values = [petID]
    await connection.execute(sql, values)
  }
}()
