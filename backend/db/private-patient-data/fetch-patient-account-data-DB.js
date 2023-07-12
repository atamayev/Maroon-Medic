import _ from "lodash"
import { mysqlTables } from "../../utils/table-names-list.js"
import { connection } from "../../db-setup-and-security/connect.js"

/** FetchPatientAccountDataDB is fairly self-explanatory
 *  Here, each Patient's particular data is fetched from the DB.
 *  For the functions with multiple table names, joins are performed to match a specific ID to the name of the actual insurance/language
 *  For example, a table might have: {Bob, 3}, {Bob, 7}, and then a mapping table shows that 3 and 7 are actually English and French. This is done to keep the data in the mapping tables as small as possible
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export default new class FetchPatientAccountDataDB {
  async fetchPatientInsurances (Pet_info_ID) {
    const sql = `SELECT ${mysqlTables.insurance_list}.Insurance_name, ${mysqlTables.insurance_list}.insurance_listID
        FROM ${mysqlTables.insurance_list} JOIN ${mysqlTables.insurance_mapping} ON ${mysqlTables.insurance_list}.insurance_listID = ${mysqlTables.insurance_mapping}.Insurance_ID
        WHERE ${mysqlTables.insurance_mapping}.pet_info_ID = ?`

    const values = [Pet_info_ID]

    try {
      const [results] = await connection.execute(sql, values)
      return results
    } catch (error) {
      return []
    }
  }

  async fetchPatientLanguages (User_ID) {
    const sql = `SELECT ${mysqlTables.language_list}.Language_name, ${mysqlTables.language_list}.language_listID
        FROM ${mysqlTables.language_list} JOIN ${mysqlTables.language_mapping} ON ${mysqlTables.language_list}.language_listID = ${mysqlTables.language_mapping}.Language_ID
        WHERE ${mysqlTables.language_mapping}.User_ID = ?`

    const values = [User_ID]

    try {
      const [results] = await connection.execute(sql, values)
      return results
    } catch (error) {
      return []
    }
  }

  async fetchPetData (User_ID) {
    const sql = `SELECT ${mysqlTables.pet_info}.Name, ${mysqlTables.pet_info}.Gender, ${mysqlTables.pet_info}.DOB, ${mysqlTables.pet_list}.Pet, ${mysqlTables.pet_list}.Pet_type, ${mysqlTables.pet_info}.pet_infoID
        FROM ${mysqlTables.pet_info}
        JOIN ${mysqlTables.pet_list} ON ${mysqlTables.pet_info}.pet_ID = ${mysqlTables.pet_list}.pet_listID
        WHERE ${mysqlTables.pet_info}.isActive = 1 AND ${mysqlTables.pet_info}.Patient_ID = ?`

    const values = [User_ID]

    try {
      const [petResults] = await connection.execute(sql, values)

      if (!_.isEmpty(petResults)) {
        for (let pet of petResults) {
          const sql = `SELECT ${mysqlTables.insurance_list}.Insurance_name
              FROM ${mysqlTables.insurance_list} JOIN ${mysqlTables.insurance_mapping} ON ${mysqlTables.insurance_list}.insurance_listID = ${mysqlTables.insurance_mapping}.Insurance_ID
              WHERE ${mysqlTables.insurance_mapping}.pet_info_ID = ?`

          const [insuranceResults] = await connection.execute(sql, [pet.pet_infoID])
          if (_.isEmpty(insuranceResults)) pet.insuranceName = ""
          else pet.insuranceName = insuranceResults[0].Insurance_name
        }
      }
      return petResults
    } catch (error) {
      return []
    }
  }
}()
