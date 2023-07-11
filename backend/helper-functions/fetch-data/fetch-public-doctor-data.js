import _ from "lodash"
import { connection, DB_Operation } from "../../db-and-security/connect.js"

/**
 * FetchPublicDoctorData fetches all of a specific Doctor's data, concatenating all results as arrays to an array
 */
export default new class FetchPublicDoctorData {
  async fetchDoctorLanguages (User_ID) {
    const functionName = this.fetchDoctorLanguages.bind(this).name
    const [language_mapping, language_list] = ["language_mapping", "language_list"]

    const sql = `SELECT ${language_list}.Language_name
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

  async fetchDoctorSpecialties (Doctor_ID) {
    const functionName = this.fetchDoctorSpecialties.bind(this).name
    const [specialty_mapping, specialties_list] = ["specialty_mapping", "specialties_list"]

    const sql = `SELECT ${specialties_list}.Organization_name, ${specialties_list}.Specialty_name
      FROM ${specialties_list} JOIN ${specialty_mapping} ON ${specialties_list}.specialties_listID = ${specialty_mapping}.specialty_ID
      WHERE ${specialty_mapping}.Doctor_ID = ?`

    const values = [Doctor_ID]
    await DB_Operation(functionName, specialty_mapping)

    try {
      const [results] = await connection.execute(sql, values)
      return results
    } catch (error) {
      return []
    }
  }

  async fetchPreVetEducation (Doctor_ID) {
    const functionName = this.fetchPreVetEducation.bind(this).name
    const [pre_vet_education_mapping, pre_vet_school_list, major_list, pre_vet_education_type_list] = ["pre_vet_education_mapping", "pre_vet_school_list", "major_list", "pre_vet_education_type_list" ]

    const sql = `SELECT ${pre_vet_school_list}.School_name, ${major_list}.Major_name, ${pre_vet_education_type_list}.Education_type, ${pre_vet_education_mapping}.Start_Date, ${pre_vet_education_mapping}.End_Date
      FROM ${pre_vet_education_mapping}, ${pre_vet_school_list}, ${major_list}, ${pre_vet_education_type_list}
      WHERE ${pre_vet_education_mapping}.School_ID = ${pre_vet_school_list}.pre_vet_school_listID AND ${pre_vet_education_mapping}.Major_ID = ${major_list}.major_listID
      AND ${pre_vet_education_mapping}.Education_type_ID = ${pre_vet_education_type_list}.pre_vet_education_typeID AND ${pre_vet_education_mapping}.Doctor_ID = ?`

    const values = [Doctor_ID]
    await DB_Operation(functionName, pre_vet_education_mapping)

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
    const functionName = this.fetchVetEducation.bind(this).name

    const [vet_education_mapping, vet_school_list, vet_education_type_list] = ["vet_education_mapping", "vet_school_list", "vet_education_type_list"]

    const sql = `SELECT ${vet_school_list}.School_name, ${vet_education_type_list}.Education_type, ${vet_education_mapping}.Start_Date, ${vet_education_mapping}.End_Date
        FROM ${vet_education_mapping}, ${vet_school_list}, ${vet_education_type_list}
        WHERE ${vet_education_mapping}.School_ID = ${vet_school_list}.vet_school_listID
        AND ${vet_education_mapping}.Education_type_ID = ${vet_education_type_list}.vet_education_typeID
        AND ${vet_education_mapping}.Doctor_ID = ?`

    const values = [Doctor_ID]
    await DB_Operation(functionName, vet_education_mapping)

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
    const functionName = this.fetchServicedPets.bind(this).name

    const [pet_mapping, pet_list] = ["pet_mapping", "pet_list"]

    const sql = `SELECT ${pet_list}.pet, ${pet_list}.pet_type
        FROM ${pet_list} JOIN ${pet_mapping} ON ${pet_list}.pet_listID = ${pet_mapping}.pet_ID
        WHERE ${pet_mapping}.Doctor_ID = ?`

    const values = [Doctor_ID]
    await DB_Operation(functionName, pet_mapping)

    try {
      const [results] = await connection.execute(sql, values)
      return results
    } catch (error) {
      return []
    }
  }


  async fetchDoctorAddressData (DoctorID) {
    const functionName = this.fetchDoctorAddressData.bind(this).name
    const [phone, addresses, booking_availability] =  ["phone", "addresses", "booking_availability"]

    const sql = `SELECT ${addresses}.addressesID, ${addresses}.address_title, ${addresses}.address_line_1, ${addresses}.address_line_2,
        ${addresses}.city, ${addresses}.state, ${addresses}.zip, ${addresses}.country, ${addresses}.address_priority, ${addresses}.instant_book,
        ${phone}.Phone, ${phone}.phone_priority
        FROM ${addresses}, ${phone}
        WHERE ${addresses}.addressesID = ${phone}.address_ID AND ${addresses}.Doctor_ID = ? AND ${addresses}.address_public_status = 1 AND ${addresses}.isActive = 1`

    const values = [DoctorID]
    await DB_Operation(functionName, addresses)
    let results

    try {
      [results] = await connection.execute(sql, values)
    } catch (error) {
      return []
    }

    if (!_.isEmpty(results)) {
      for (let i = 0; i < results.length; i++) {
        const sql = `SELECT ${booking_availability}.Day_of_week, ${booking_availability}.Start_time, ${booking_availability}.End_time FROM ${booking_availability} WHERE ${booking_availability}.address_ID = ?`
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
    const functionName = this.fetchDoctorPersonalInfo.bind(this).name

    const basic_user_info = "basic_user_info"
    const sql = `SELECT FirstName, LastName, Gender FROM ${basic_user_info} WHERE User_ID = ?`
    const values = [User_ID]
    await DB_Operation(functionName, basic_user_info)

    try {
      const [results] = await connection.execute(sql, values)
      const DoctorPersonalInfo = results[0]
      return (DoctorPersonalInfo)
    } catch (error) {
      return []
    }
  }
}()
