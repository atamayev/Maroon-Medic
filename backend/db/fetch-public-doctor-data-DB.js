import _ from "lodash"
import { mysqlTables } from "../utils/table-names-list.js"
import { connection } from "../db-setup-and-security/connect.js"

/**
 * FetchPublicDoctorDataDB fetches all of a specific Doctor's data, concatenating all results as arrays to an array
 */
export default new class FetchPublicDoctorDataDB {
  async fetchDoctorLanguages (User_ID) {
    const sql = `SELECT ${mysqlTables.language_list}.Language_name
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

  async fetchDoctorSpecialties (Doctor_ID) {
    const sql = `SELECT ${mysqlTables.specialties_list}.Organization_name, ${mysqlTables.specialties_list}.Specialty_name
      FROM ${mysqlTables.specialties_list} JOIN ${mysqlTables.specialty_mapping} ON ${mysqlTables.specialties_list}.specialties_listID = ${mysqlTables.specialty_mapping}.specialty_ID
      WHERE ${mysqlTables.specialty_mapping}.Doctor_ID = ?`

    const values = [Doctor_ID]

    try {
      const [results] = await connection.execute(sql, values)
      return results
    } catch (error) {
      return []
    }
  }

  async fetchPreVetEducation (Doctor_ID) {
    const sql = `SELECT ${mysqlTables.pre_vet_school_list}.School_name, ${mysqlTables.major_list}.Major_name, ${mysqlTables.pre_vet_education_type_list}.Education_type, ${mysqlTables.pre_vet_education_mapping}.Start_Date, ${mysqlTables.pre_vet_education_mapping}.End_Date
      FROM ${mysqlTables.pre_vet_education_mapping}, ${mysqlTables.pre_vet_school_list}, ${mysqlTables.major_list}, ${mysqlTables.pre_vet_education_type_list}
      WHERE ${mysqlTables.pre_vet_education_mapping}.School_ID = ${mysqlTables.pre_vet_school_list}.pre_vet_school_listID AND ${mysqlTables.pre_vet_education_mapping}.Major_ID = ${mysqlTables.major_list}.major_listID
      AND ${mysqlTables.pre_vet_education_mapping}.Education_type_ID = ${mysqlTables.pre_vet_education_type_list}.pre_vet_education_typeID AND ${mysqlTables.pre_vet_education_mapping}.Doctor_ID = ?`

    const values = [Doctor_ID]

    try {
      const [results] = await connection.execute(sql, values)
      const newResults = results.map(obj => ({
        ...obj,
        Start_Date: new Date(obj.Start_Date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        End_Date: new Date(obj.End_Date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      }))//Converts the dates to a proper format.
      return newResults
    } catch (error) {
      return []
    }
  }

  async fetchVetEducation (Doctor_ID) {
    const sql = `SELECT ${mysqlTables.vet_school_list}.School_name, ${mysqlTables.vet_education_type_list}.Education_type, ${mysqlTables.vet_education_mapping}.Start_Date, ${mysqlTables.vet_education_mapping}.End_Date
        FROM ${mysqlTables.vet_education_mapping}, ${mysqlTables.vet_school_list}, ${mysqlTables.vet_education_type_list}
        WHERE ${mysqlTables.vet_education_mapping}.School_ID = ${mysqlTables.vet_school_list}.vet_school_listID
        AND ${mysqlTables.vet_education_mapping}.Education_type_ID = ${mysqlTables.vet_education_type_list}.vet_education_typeID
        AND ${mysqlTables.vet_education_mapping}.Doctor_ID = ?`

    const values = [Doctor_ID]

    try {
      const [results] = await connection.execute(sql, values)
      const newResults = results.map(obj => ({
        ...obj,
        Start_Date: new Date(obj.Start_Date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        End_Date: new Date(obj.End_Date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      }))//Converts the dates to a proper format.
      return newResults
    } catch (error) {
      return []
    }
  }

  async fetchServicedPets (Doctor_ID) {
    const sql = `SELECT ${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type
        FROM ${mysqlTables.pet_list} JOIN ${mysqlTables.pet_mapping} ON ${mysqlTables.pet_list}.pet_listID = ${mysqlTables.pet_mapping}.pet_ID
        WHERE ${mysqlTables.pet_mapping}.Doctor_ID = ?`

    const values = [Doctor_ID]

    try {
      const [results] = await connection.execute(sql, values)
      return results
    } catch (error) {
      return []
    }
  }


  async fetchDoctorAddressData (DoctorID) {
    const sql = `SELECT ${mysqlTables.addresses}.addressesID, ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1, ${mysqlTables.addresses}.address_line_2,
        ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country, ${mysqlTables.addresses}.address_priority, ${mysqlTables.addresses}.instant_book,
        ${mysqlTables.phone}.Phone, ${mysqlTables.phone}.phone_priority
        FROM ${mysqlTables.addresses}, ${mysqlTables.phone}
        WHERE ${mysqlTables.addresses}.addressesID = ${mysqlTables.phone}.address_ID AND ${mysqlTables.addresses}.Doctor_ID = ? AND ${mysqlTables.addresses}.address_public_status = 1 AND ${mysqlTables.addresses}.isActive = 1`

    const values = [DoctorID]
    let results

    try {
      [results] = await connection.execute(sql, values)
    } catch (error) {
      return []
    }

    if (!_.isEmpty(results)) {
      for (let i = 0; i < results.length; i++) {
        const sql = `SELECT ${mysqlTables.booking_availability}.Day_of_week, ${mysqlTables.booking_availability}.Start_time, ${mysqlTables.booking_availability}.End_time FROM ${mysqlTables.booking_availability} WHERE ${mysqlTables.booking_availability}.address_ID = ?`
        const values = [results[i].addressesID]
        try {
          const [results1] = await connection.execute(sql, values)
          results[i].times = results1
        } catch (error) {
          return []
        }
      }
    }
    return results
  }

  async fetchDoctorPersonalInfo (User_ID) {
    const sql = `SELECT FirstName, LastName, Gender FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?`
    const values = [User_ID]

    try {
      const [results] = await connection.execute(sql, values)
      const DoctorPersonalInfo = results[0]
      return (DoctorPersonalInfo)
    } catch (error) {
      return []
    }
  }
}()
