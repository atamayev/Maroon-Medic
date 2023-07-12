import _ from "lodash"
import { mysqlTables } from "../../utils/table-names-list.js"
import { connection } from "../../db-setup-and-security/connect.js"

/** FetchDoctorAccountDataDB is fairly self-explanatory
 *  Here, each Doctor's particular data is fetched from the DB.
 *  For the functions with multiple table names, joins are used to match a particular doctor's records with the actual name.
 *  For example, a table might have: {Bob, 3}, {Bob, 7}, and then a mapping table shows that 3 and 7 are actually English and French. This is done to keep the data in the mapping tables as small as possible
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export default new class FetchDoctorAccountDataDB {
  async fetchDoctorLanguages (User_ID) {
    const sql = `SELECT ${mysqlTables.language_mapping}.Language_name, ${mysqlTables.language_mapping}.language_listID
      FROM ${mysqlTables.language_mapping} JOIN ${mysqlTables.language_mapping} ON ${mysqlTables.language_mapping}.language_listID = ${mysqlTables.language_mapping}.Language_ID
      WHERE ${mysqlTables.language_mapping}.User_ID = ?`

    const values = [User_ID]

    try {
      const [results] = await connection.execute(sql, values)
      return results
    } catch (error) {
      return []
    }
  }

  async fetchDoctorServices (Doctor_ID) {
    const sql = `SELECT ${mysqlTables.service_and_category_list}.Category_name, ${mysqlTables.service_and_category_list}.Service_name, ${mysqlTables.service_and_category_list}.service_and_category_listID, ${mysqlTables.service_mapping}.Service_time, ${mysqlTables.service_mapping}.Service_price
      FROM ${mysqlTables.service_and_category_list} JOIN ${mysqlTables.service_mapping} ON ${mysqlTables.service_and_category_list}.service_and_category_listID = ${mysqlTables.service_mapping}.Service_and_Category_ID
      WHERE ${mysqlTables.service_mapping}.Doctor_ID = ?`

    const values = [Doctor_ID]

    try {
      const [results] = await connection.execute(sql, values)
      return results
    } catch (error) {
      return []
    }
  }

  async fetchDoctorSpecialties (Doctor_ID) {
    const sql = `SELECT ${mysqlTables.specialties_list}.Organization_name, ${mysqlTables.specialties_list}.Specialty_name, ${mysqlTables.specialties_list}.specialties_listID
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
    const sql = `SELECT ${mysqlTables.pre_vet_school_list}.School_name, ${mysqlTables.major_list}.Major_name, ${mysqlTables.pre_vet_education_type_list}.Education_type, ${mysqlTables.pre_vet_education_mapping}.Start_Date, ${mysqlTables.pre_vet_education_mapping}.End_Date, ${mysqlTables.pre_vet_education_mapping}.pre_vet_education_mappingID
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
    const sql = `SELECT ${mysqlTables.vet_school_list}.School_name, ${mysqlTables.vet_education_type_list}.Education_type, ${mysqlTables.vet_education_mapping}.Start_Date, ${mysqlTables.vet_education_mapping}.End_Date, ${mysqlTables.vet_education_mapping}.vet_education_mappingID
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

  //Fetch Address Data first finds the addresses associated with a Doctor_ID, and then finds all of the times/days of week associated with each address.
  async fetchDoctorAddressData (Doctor_ID) {
    const sql = `SELECT ${mysqlTables.addresses}.addressesID, ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1,
      ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip,
      ${mysqlTables.addresses}.country, ${mysqlTables.addresses}.address_priority, ${mysqlTables.addresses}.address_public_status, ${mysqlTables.addresses}.instant_book
      FROM ${mysqlTables.addresses}
      WHERE ${mysqlTables.addresses}.isActive = 1 AND ${mysqlTables.addresses}.Doctor_ID = ? `

    const values = [Doctor_ID]

    try {
      const [results] = await connection.execute(sql, values)

      if (!_.isEmpty(results)) {
        for (let result of results) {
          const sql1 = `SELECT ${mysqlTables.booking_availability}.Day_of_week, ${mysqlTables.booking_availability}.Start_time, ${mysqlTables.booking_availability}.End_time
            FROM ${mysqlTables.booking_availability}
            WHERE ${mysqlTables.booking_availability}.address_ID = ?`

          const [times] = await connection.execute(sql1, [result.addressesID])
          result.times = times

          const sql2 = `SELECT ${mysqlTables.phone}.Phone, ${mysqlTables.phone}.phone_priority
            FROM ${mysqlTables.phone}
            WHERE ${mysqlTables.phone}.address_ID = ?`

          const [phones] = await connection.execute(sql2, [result.addressesID])
          if (_.isEmpty(phones)) result.phone = ""
          else {
            result.phone = phones[0].phone
            result.phone_priority = phones[0].phone_priority
          }
        }
      }
      return results
    } catch (error) {
      return []
    }
  }

  async fetchDescriptionData (Doctor_ID) {
    const sql = `SELECT Description
        FROM ${mysqlTables.descriptions}
        WHERE Doctor_ID = ?`

    const values = [Doctor_ID]

    try {
      const [results] = await connection.execute(sql, values)
      if (_.isEmpty(results)) return ("")
      else {
        const Description = results[0].Description
        return (Description)
      }
    } catch (error) {
      return ("")
    }
  }

  async fetchServicedPets (Doctor_ID) {
    const sql = `SELECT ${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type, ${mysqlTables.pet_list}.pet_listID
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

  async fetchVerifiedAndPubliclyAvailable (Doctor_ID) {
    const sql = `SELECT publiclyAvailable, verified
        FROM ${mysqlTables.Doctor_specific_info}
        WHERE Doctor_ID = ?`

    const values = [Doctor_ID]

    try {
      const [results] = await connection.execute(sql, values)
      if (_.isEmpty(results)) return {PubliclyAvailable: false, Verified: false}
      else return {PubliclyAvailable: results[0].publiclyAvailable, Verified: results[0].publiclyAvailable}
    } catch (error) {
      return {PubliclyAvailable: false, Verified: false}
    }
  }

  async fetchDoctorPictures (Doctor_ID) {
    const sql = `SELECT picture_link, picture_number
      FROM ${mysqlTables.pictures}
      WHERE Doctor_ID = ?`

    const values = [Doctor_ID]

    try {
      const [results] = await connection.execute(sql, values)
      return results
    } catch (error) {
      return []
    }
  }
}()
