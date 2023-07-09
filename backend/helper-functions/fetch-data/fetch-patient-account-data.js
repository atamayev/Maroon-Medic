import _ from "lodash"
import { connection, DB_Operation } from "../../db-and-security/connect.js"

/** FetchPatientAccountData is fairly self-explanatory
 *  Here, each Patient's particular data is fetched from the DB.
 *  For the functions with multiple table names, joins are performed to match a specific ID to the name of the actual insurance/language
 *  For example, a table might have: {Bob, 3}, {Bob, 7}, and then a mapping table shows that 3 and 7 are actually English and French. This is done to keep the data in the mapping tables as small as possible
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export default new class FetchPatientAccountData {
  async fetchPatientInsurances (Pet_info_ID) {
    const functionName = this.fetchPatientInsurances.bind(this).name

    const [insurance_mapping, insurance_list] = ["insurance_mapping", "insurance_list"]

    const sql = `SELECT ${insurance_list}.Insurance_name, ${insurance_list}.insurance_listID
        FROM ${insurance_list} JOIN ${insurance_mapping} ON ${insurance_list}.insurance_listID = ${insurance_mapping}.Insurance_ID
        WHERE ${insurance_mapping}.pet_info_ID = ?`

    const values = [Pet_info_ID]
    await DB_Operation(functionName, insurance_mapping)

    try {
      const [results] = await connection.execute(sql, values)
      return results
    } catch (error) {
      return []
    }
  }

  async fetchPatientLanguages (User_ID) {
    const functionName = this.fetchPatientLanguages.bind(this).name
    const [language_mapping, language_list] = ["language_mapping", "language_list"]

    const sql = `SELECT ${language_list}.Language_name, ${language_list}.language_listID
        FROM ${language_list} JOIN ${language_mapping} ON ${language_list}.language_listID = ${language_mapping}.Language_ID
        WHERE ${language_mapping}.User_ID = ?`

    const values = [User_ID]
    await DB_Operation(functionName, language_mapping)

    try {
      const [results] = await connection.execute(sql, values)
      return results
    } catch (error) {
      return []
    }
  }

  async fetchPetData (User_ID) {
    const functionName = this.fetchPetData.bind(this).name
    const [pet_info, pet_list] = ["pet_info", "pet_list"]

    const sql = `SELECT ${pet_info}.Name, ${pet_info}.Gender, ${pet_info}.DOB, ${pet_list}.Pet, ${pet_list}.Pet_type, ${pet_info}.pet_infoID
        FROM ${pet_info}
        JOIN ${pet_list} ON ${pet_info}.pet_ID = ${pet_list}.pet_listID
        WHERE ${pet_info}.isActive = 1 AND ${pet_info}.Patient_ID = ?`

    const values = [User_ID]
    await DB_Operation(functionName, pet_info)

    try {
      const [petResults] = await connection.execute(sql, values)

      if (!_.isEmpty(petResults)) {
        for (let pet of petResults) {
          const [insurance_mapping, insurance_list] = ["insurance_mapping", "insurance_list"]

          const sql = `SELECT ${insurance_list}.Insurance_name
              FROM ${insurance_list} JOIN ${insurance_mapping} ON ${insurance_list}.insurance_listID = ${insurance_mapping}.Insurance_ID
              WHERE ${insurance_mapping}.pet_info_ID = ?`

          await DB_Operation(functionName, insurance_mapping)
          const [insuranceResults] = await connection.execute(sql, [pet.pet_infoID])
          if (!_.isEmpty(insuranceResults)) pet.insuranceName = insuranceResults[0].Insurance_name
          else pet.insuranceName = ""
        }
      }
      return petResults
    } catch (error) {
      return []
    }
  }
}()
