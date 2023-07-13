import { mysqlTables } from "../../utils/table-names-list.js"
import { connection } from "../../setup-and-security/connect.js"

export default new class SaveDoctorDataDB {
  async checkIfPersonalDataExists (DoctorID) {
    const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?) as 'exists' `
    const values = [DoctorID]
    const [results] = await connection.execute(sql, values)
    const doesRecordExist = results[0].exists
    return doesRecordExist
  }

  async updatePersonalData (personalInfo, DOB, DoctorID) {
    const sql = `UPDATE ${mysqlTables.basic_user_info} SET FirstName = ?, LastName = ?, Gender = ?, DOB = ? WHERE User_ID = ?`
    const values = [personalInfo.FirstName, personalInfo.LastName, personalInfo.Gender, DOB, DoctorID]
    await connection.execute(sql, values)
  }

  async addPersonalData (personalInfo, DOB, DoctorID) {
    const sql = `INSERT INTO ${mysqlTables.basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?, ?, ?, ?, ?)`
    const values = [personalInfo.FirstName, personalInfo.LastName, personalInfo.Gender, DOB, DoctorID]
    await connection.execute(sql, values)
  }

  async checkIfDescriptionExists (DoctorID) {
    const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.descriptions} WHERE Doctor_ID = ?) as 'exists' `
    const values = [DoctorID]
    const [results] = await connection.execute(sql, values)
    const doesRecordExist = results[0].exists
    return doesRecordExist
  }

  async updateDescription (description, DoctorID) {
    const sql = `UPDATE ${mysqlTables.descriptions} SET Description = ? WHERE Doctor_ID = ?`
    const values = [description, DoctorID]
    await connection.execute(sql, values)
  }

  async addDescription (description, DoctorID) {
    const sql = `INSERT INTO ${mysqlTables.descriptions} (Description, Doctor_ID) VALUES (?, ?)`
    const values = [description, DoctorID]
    await connection.execute(sql, values)
  }

  async addGeneralData (generalDataID, DoctorID, UserIDorDoctorID, DataType, tableName) {
    const sql = `INSERT INTO ${tableName} (${DataType}_ID, ${UserIDorDoctorID}) VALUES (?, ?)`
    const values = [generalDataID, DoctorID]
    await connection.execute(sql, values)
  }

  async deleteGeneralData (generalDataID, DoctorID, UserIDorDoctorID, DataType, tableName) {
    const sql = `DELETE FROM ${tableName} WHERE ${DataType}_ID = ? AND ${UserIDorDoctorID} = ?`
    const values = [generalDataID, DoctorID]
    await connection.execute(sql, values)
  }

  // async addServicesData (serviceID, DoctorID) {

  // }

  // async deleteServicesData (serviceID, DoctorID) {

  // }

  async addPreVetEducationData (preVetEducationObject, DoctorID) {
    const sql = `INSERT INTO ${mysqlTables.pre_vet_education_mapping} (School_ID, Major_ID, Education_type_ID, Start_Date, End_Date, Doctor_ID) VALUES (?, ?, ?, ?, ?, ?)`
    const values = [preVetEducationObject.School_ID, preVetEducationObject.Major_ID, preVetEducationObject.Education_type_ID, preVetEducationObject.Start_date, preVetEducationObject.End_date, DoctorID]
    const [result] = await connection.execute(sql, values)
    return result.insertId
  }

  async addVetEducationData (vetEducationObject, DoctorID) {
    const sql = `INSERT INTO ${mysqlTables.vet_education_mapping} (School_ID, Education_type_ID, Start_Date, End_Date, Doctor_ID) VALUES (?, ?, ?, ?, ?)`
    const values = [vetEducationObject.School_ID, vetEducationObject.Education_type_ID, vetEducationObject.Start_date, vetEducationObject.End_date, DoctorID]
    const [result] = await connection.execute(sql, values)
    return result.insertId
  }

  async deletePreVetEducationData (preVetEducationID) {
    const sql = `DELETE FROM ${mysqlTables.pre_vet_education_mapping} WHERE pre_vet_education_mappingID = ?`
    const values = [preVetEducationID]
    await connection.execute(sql, values)
  }

  async deleteVetEducationData (vetEducationID) {
    const sql = `DELETE FROM ${mysqlTables.vet_education_mapping} WHERE vet_education_mappingID = ?`
    const values = [vetEducationID]
    await connection.execute(sql, values)
  }

  // async saveAddressMethods()

  async updatePublicAvilability (newstatus, DoctorID) {
    const sql = `UPDATE ${mysqlTables.doctor_specific_info} SET publiclyAvailable = ? WHERE Doctor_ID = ?`
    const values = [newstatus, DoctorID]
    await connection.execute(sql, values)
  }


}()
