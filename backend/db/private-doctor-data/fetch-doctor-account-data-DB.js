import { mysqlTables } from "../../utils/table-names-list.js"
import { connection } from "../../setup-and-security/connect.js"

export default new class FetchDoctorAccountDataDB {
  async retrieveLanguages (DoctorID) {
    const sql = `SELECT ${mysqlTables.language_list}.Language_name, ${mysqlTables.language_list}.language_listID
      FROM ${mysqlTables.language_list}
          JOIN ${mysqlTables.language_mapping} ON ${mysqlTables.language_list}.language_listID = ${mysqlTables.language_mapping}.Language_ID
      WHERE
          ${mysqlTables.language_mapping}.User_ID = ?`

    const values = [DoctorID]
    const [languages] = await connection.execute(sql, values)
    return languages
  }

  async retrieveServices (DoctorID) {
    const sql = `SELECT ${mysqlTables.service_and_category_list}.Category_name, ${mysqlTables.service_and_category_list}.Service_name, ${mysqlTables.service_and_category_list}.service_and_category_listID, ${mysqlTables.service_mapping}.Service_time, ${mysqlTables.service_mapping}.Service_price
      FROM ${mysqlTables.service_and_category_list}
          JOIN ${mysqlTables.service_mapping} ON ${mysqlTables.service_and_category_list}.service_and_category_listID = ${mysqlTables.service_mapping}.Service_and_Category_ID
      WHERE
          ${mysqlTables.service_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const [services] = await connection.execute(sql, values)
    return services
  }

  async retrieveSpecialties (DoctorID) {
    const sql = `SELECT ${mysqlTables.specialties_list}.Organization_name, ${mysqlTables.specialties_list}.Specialty_name, ${mysqlTables.specialties_list}.specialties_listID
      FROM ${mysqlTables.specialties_list}
          JOIN ${mysqlTables.specialty_mapping} ON ${mysqlTables.specialties_list}.specialties_listID = ${mysqlTables.specialty_mapping}.specialty_ID
      WHERE
          ${mysqlTables.specialty_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const [specialties] = await connection.execute(sql, values)
    return specialties
  }

  async retrievePreVetEducation (DoctorID) {
    const sql = `SELECT ${mysqlTables.pre_vet_school_list}.School_name, ${mysqlTables.major_list}.Major_name, ${mysqlTables.pre_vet_education_type_list}.Education_type, ${mysqlTables.pre_vet_education_mapping}.Start_Date, ${mysqlTables.pre_vet_education_mapping}.End_Date, ${mysqlTables.pre_vet_education_mapping}.pre_vet_education_mappingID
      FROM ${mysqlTables.pre_vet_education_mapping}, ${mysqlTables.pre_vet_school_list}, ${mysqlTables.major_list}, ${mysqlTables.pre_vet_education_type_list}
      WHERE
          ${mysqlTables.pre_vet_education_mapping}.School_ID = ${mysqlTables.pre_vet_school_list}.pre_vet_school_listID
          AND ${mysqlTables.pre_vet_education_mapping}.Major_ID = ${mysqlTables.major_list}.major_listID
          AND ${mysqlTables.pre_vet_education_mapping}.Education_type_ID = ${mysqlTables.pre_vet_education_type_list}.pre_vet_education_typeID
          AND ${mysqlTables.pre_vet_education_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const [preVetEducation] = await connection.execute(sql, values)
    return preVetEducation
  }

  async retrieveVetEducation (DoctorID) {
    const sql = `SELECT ${mysqlTables.vet_school_list}.School_name, ${mysqlTables.vet_education_type_list}.Education_type, ${mysqlTables.vet_education_mapping}.Start_Date, ${mysqlTables.vet_education_mapping}.End_Date, ${mysqlTables.vet_education_mapping}.vet_education_mappingID
      FROM ${mysqlTables.vet_education_mapping}, ${mysqlTables.vet_school_list}, ${mysqlTables.vet_education_type_list}
      WHERE
          ${mysqlTables.vet_education_mapping}.School_ID = ${mysqlTables.vet_school_list}.vet_school_listID
          AND ${mysqlTables.vet_education_mapping}.Education_type_ID = ${mysqlTables.vet_education_type_list}.vet_education_typeID
          AND ${mysqlTables.vet_education_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const [vetEducation] = await connection.execute(sql, values)
    return vetEducation
  }

  async retrieveAddressData (DoctorID) {
    const sql = `SELECT ${mysqlTables.addresses}.addressesID, ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1,
      ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip,
      ${mysqlTables.addresses}.country, ${mysqlTables.addresses}.address_priority, ${mysqlTables.addresses}.address_public_status, ${mysqlTables.addresses}.instant_book
      FROM ${mysqlTables.addresses}
      WHERE
          ${mysqlTables.addresses}.isActive = 1 AND ${mysqlTables.addresses}.Doctor_ID = ? `

    const values = [DoctorID]

    const [addressData] = await connection.execute(sql, values)
    return addressData
  }

  async retrieveAvailabilityData (addressID) {
    const sql = `SELECT ${mysqlTables.booking_availability}.Day_of_week, ${mysqlTables.booking_availability}.Start_time, ${mysqlTables.booking_availability}.End_time
      FROM ${mysqlTables.booking_availability}
      WHERE ${mysqlTables.booking_availability}.address_ID = ?`

    const values = [addressID]

    const [availabilityData] = await connection.execute(sql, values)
    return availabilityData
  }

  async retrievePhoneData (addressID) {
    const sql = `SELECT ${mysqlTables.phone}.Phone, ${mysqlTables.phone}.phone_priority
      FROM ${mysqlTables.phone}
      WHERE ${mysqlTables.phone}.address_ID = ?`

    const values = [addressID]

    const [phones] = await connection.execute(sql, values)
    return phones
  }

  async retrieveDescriptionData (DoctorID) {
    const sql = `SELECT Description
      FROM ${mysqlTables.descriptions}
      WHERE Doctor_ID = ?`

    const values = [DoctorID]

    const [description] = await connection.execute(sql, values)
    return description
  }

  async retrieveServicedPets (DoctorID) {
    const sql = `SELECT ${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type, ${mysqlTables.pet_list}.pet_listID
      FROM ${mysqlTables.pet_list}
          JOIN ${mysqlTables.pet_mapping} ON ${mysqlTables.pet_list}.pet_listID = ${mysqlTables.pet_mapping}.pet_ID
      WHERE ${mysqlTables.pet_mapping}.Doctor_ID = ?`

    const values = [DoctorID]

    const [servicedPets] = await connection.execute(sql, values)
    return servicedPets
  }

  async retrieveVerifiedAndPubliclyAvailableStatus (DoctorID) {
    const sql = `SELECT publiclyAvailable, verified
      FROM ${mysqlTables.doctor_specific_info}
      WHERE Doctor_ID = ?`

    const values = [DoctorID]

    const [status] = await connection.execute(sql, values)
    return status
  }

  async retrievePictures (DoctorID) {
    const sql = `SELECT picture_link, picture_number
      FROM ${mysqlTables.pictures}
      WHERE Doctor_ID = ?`

    const values = [DoctorID]

    const [pictures] = await connection.execute(sql, values)
    return pictures
  }

}()
