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

  async retrieveExistingServicesIDs (DoctorID) {
    const sql = `SELECT Service_and_Category_ID FROM  ${mysqlTables.service_mapping} WHERE Doctor_ID = ?`
    const values = [DoctorID]
    const [existingServicesIDs] = await connection.execute(sql, values)
    return existingServicesIDs
  }

  async addServicesData (addedData, DoctorID) {
    const sql = `INSERT INTO ${mysqlTables.service_mapping} (Service_and_Category_ID, Service_time, Service_price, Doctor_ID) VALUES (?, ?, ?, ?)`
    const values = [addedData.service_and_category_listID, addedData.Service_time, addedData.Service_price, DoctorID]
    await connection.execute(sql, values)
  }

  async deleteServicesData (deletedDataID, DoctorID) {
    const sql = `DELETE FROM ${mysqlTables.service_mapping} WHERE Service_and_Category_ID = ? AND Doctor_ID = ?`
    const values = [deletedDataID, DoctorID]
    await connection.execute(sql, values)
  }

  async updateServicesData (updatedData, DoctorID) {
    const sql = `UPDATE ${mysqlTables.service_mapping} SET Service_time = ?, Service_price = ? WHERE Service_and_Category_ID = ? AND Doctor_ID = ?`
    const values = [updatedData.Service_time, updatedData.Service_price, updatedData.service_and_category_listID, DoctorID]
    await connection.execute(sql, values)
  }

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

  async retrieveExistingAddressIDs (DoctorID) {
    const sql = `SELECT addressesID FROM ${mysqlTables.addresses} WHERE ${mysqlTables.addresses}.isActive = 1 AND ${mysqlTables.addresses}.Doctor_ID = ?`
    const values = [DoctorID]
    const [existingAddressIDs] = await connection.execute(sql, values)
    return existingAddressIDs
  }

  async retrievePhoneData (addressID) {
    const sql = `SELECT ${mysqlTables.phone}.Phone, ${mysqlTables.phone}.phone_priority
        FROM ${mysqlTables.phone}
        WHERE ${mysqlTables.phone}.address_ID = ?`
    const values = [addressID]
    const [phoneData] = await connection.execute(sql, values)
    return phoneData
  }

  async deleteAddressRecord (addressID) {
    const sql = `UPDATE ${mysqlTables.addresses} SET isActive = 0 WHERE addressesID = ?`
    const values = [addressID]
    await connection.execute(sql, values)
  }

  async addAddressRecord (addressObject, DoctorID) {
    const sql = `INSERT INTO ${mysqlTables.addresses}
          (address_title, address_line_1, address_line_2, city, state, zip, country, address_public_status, address_priority, instant_book, Doctor_ID)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [addressObject.address_title, addressObject.address_line_1, addressObject.address_line_2, addressObject.city, addressObject.state, addressObject.zip, addressObject.country, addressObject.address_public_status, addressObject.address_priority, addressObject.instant_book, DoctorID]
    const [result] = await connection.execute(sql, values)
    return result.insertId
  }

  async addPhoneRecord (phone, addressID) {
    const sql = `INSERT INTO ${mysqlTables.phone} (Phone, address_ID) VALUES (?, ?)`
    const values = [phone, addressID]
    await connection.execute(sql, values)
  }

  async updateAddressRecord (updatedAddressObject) {
    const sql = `UPDATE ${mysqlTables.addresses}
          SET address_title = ?, address_line_1 = ?, address_line_2 = ?, city = ?, state = ?, zip = ?, country = ?, address_public_status = ?, instant_book = ?
          WHERE addressesID = ?`
    const values = [updatedAddressObject.address_title, updatedAddressObject.address_line_1, updatedAddressObject.address_line_2, updatedAddressObject.city, updatedAddressObject.state, updatedAddressObject.zip, updatedAddressObject.country, updatedAddressObject.address_public_status, updatedAddressObject.instant_book, updatedAddressObject.addressesID]
    await connection.execute(sql, values)
  }

  async checkIfPhoneExists (addressID) {
    const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.phone} WHERE address_ID = ?) as 'exists' `
    const values = [addressID]
    const [results] = await connection.execute(sql, values)
    const doesPhoneExist = results[0].exists
    return doesPhoneExist
  }

  async updatePhoneRecord (updatedPhoneObject) {
    const sql = `UPDATE ${mysqlTables.phone} SET phone = ? WHERE address_ID = ?`
    const values = [updatedPhoneObject.phone, updatedPhoneObject.addressesID]
    await connection.execute(sql, values)
  }

  async retrieveExistingAvailbilityData (addressID) {
    const sql = `SELECT Day_of_week, Start_time, End_time FROM ${mysqlTables.booking_availability} WHERE ${mysqlTables.booking_availability}.address_ID = ?`
    const values = [addressID]
    const [existingAvailbilityData] = await connection.execute(sql, values)
    return existingAvailbilityData
  }

  async addAvailbilityData (availbilityObject, addressID) {
    const sql = `INSERT INTO ${mysqlTables.booking_availability} (Day_of_week, Start_time, End_time, address_ID) VALUES (?, ?, ?, ?)`
    const values = [availbilityObject.Day_of_week, availbilityObject.Start_time, availbilityObject.End_time, addressID]
    await connection.execute(sql, values)
  }

  async deleteAvailbilityData (availbilityObject, addressID) {
    const sql = `DELETE FROM ${mysqlTables.booking_availability} WHERE Day_of_week = ? AND Start_time = ? AND End_time = ? AND address_ID = ?`
    const values = [availbilityObject.Day_of_week, availbilityObject.Start_time, availbilityObject.End_time, addressID]
    await connection.execute(sql, values)
  }

  async updateTimeAvailbilityData (availbilityObject, addressID) {
    const sql = `UPDATE ${mysqlTables.booking_availability} SET Start_time = ?, End_time = ? WHERE Day_of_week = ? AND address_ID = ?`
    const values = [availbilityObject.Day_of_week, availbilityObject.Start_time, availbilityObject.End_time, addressID]
    await connection.execute(sql, values)
  }

  async updatePublicAvilability (newstatus, DoctorID) {
    const sql = `UPDATE ${mysqlTables.doctor_specific_info} SET publiclyAvailable = ? WHERE Doctor_ID = ?`
    const values = [newstatus, DoctorID]
    await connection.execute(sql, values)
  }
}()
