import { mysqlTables } from "../utils/table-names-list"
import { connectDatabase } from "../setup-and-security/connect"
import { RowDataPacket } from "mysql2"

export default new class FetchPublicDoctorDataDB {
  async retrieveDoctorLanguages (DoctorID: number): Promise<LanguagesData[]> {
    const sql = `SELECT ${mysqlTables.language_list}.Language_name
      FROM ${mysqlTables.language_list}
          JOIN ${mysqlTables.language_mapping} ON ${mysqlTables.language_list}.language_listID = ${mysqlTables.language_mapping}.Language_ID
      WHERE ${mysqlTables.language_mapping}.User_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const languages = results.map((row: RowDataPacket) => row as LanguagesData)
    return languages
  }

  async retrieveDoctorSpecialties (DoctorID: number): Promise<SpecialtiesData[]> {
    const sql = `SELECT ${mysqlTables.specialties_list}.Organization_name, ${mysqlTables.specialties_list}.Specialty_name
      FROM ${mysqlTables.specialties_list}
          JOIN ${mysqlTables.specialty_mapping}
          ON ${mysqlTables.specialties_list}.specialties_listID = ${mysqlTables.specialty_mapping}.specialty_ID
      WHERE ${mysqlTables.specialty_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const specialties = results.map((row: RowDataPacket) => row as SpecialtiesData)
    return specialties
  }

  async retrievePreVetEducation (DoctorID: number): Promise<PreVetEducationItemType[]> {
    const sql = `SELECT ${mysqlTables.pre_vet_school_list}.School_name, ${mysqlTables.major_list}.Major_name,
    ${mysqlTables.pre_vet_education_type_list}.Education_type, ${mysqlTables.pre_vet_education_mapping}.Start_Date,
    ${mysqlTables.pre_vet_education_mapping}.End_Date
      FROM ${mysqlTables.pre_vet_education_mapping}, ${mysqlTables.pre_vet_school_list},
      ${mysqlTables.major_list}, ${mysqlTables.pre_vet_education_type_list}
      WHERE ${mysqlTables.pre_vet_education_mapping}.School_ID = ${mysqlTables.pre_vet_school_list}.pre_vet_school_listID
      AND ${mysqlTables.pre_vet_education_mapping}.Major_ID = ${mysqlTables.major_list}.major_listID
      AND ${mysqlTables.pre_vet_education_mapping}.Education_type_ID = ${mysqlTables.pre_vet_education_type_list}.pre_vet_education_typeID
      AND ${mysqlTables.pre_vet_education_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const preVetEducation = results.map((row: RowDataPacket) => row as PreVetEducationItemType)
    return preVetEducation
  }

  async retrieveVetEducation (DoctorID: number): Promise<VetEducationItemType[]> {
    const sql = `SELECT ${mysqlTables.vet_school_list}.School_name, ${mysqlTables.vet_education_type_list}.Education_type,
    ${mysqlTables.vet_education_mapping}.Start_Date, ${mysqlTables.vet_education_mapping}.End_Date
      FROM ${mysqlTables.vet_education_mapping}, ${mysqlTables.vet_school_list}, ${mysqlTables.vet_education_type_list}
      WHERE
          ${mysqlTables.vet_education_mapping}.School_ID = ${mysqlTables.vet_school_list}.vet_school_listID
          AND ${mysqlTables.vet_education_mapping}.Education_type_ID = ${mysqlTables.vet_education_type_list}.vet_education_typeID
          AND ${mysqlTables.vet_education_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const vetEducation = results.map((row: RowDataPacket) => row as VetEducationItemType)
    return vetEducation
  }

  async retrieveServicedPets (DoctorID: number): Promise<ServicedPetData[]> {
    const sql = `SELECT ${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type
        FROM ${mysqlTables.pet_list}
            JOIN ${mysqlTables.pet_mapping} ON ${mysqlTables.pet_list}.pet_listID = ${mysqlTables.pet_mapping}.pet_ID
        WHERE
            ${mysqlTables.pet_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const servicedPets = results.map((row: RowDataPacket) => row as ServicedPetData)
    return servicedPets
  }

  async retrieveAddressData (DoctorID: number): Promise<PublicAddressData[]> {
    const sql = `SELECT
          ${mysqlTables.addresses}.addressesID, ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1,
          ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state,
          ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country, ${mysqlTables.addresses}.address_priority,
          ${mysqlTables.addresses}.instant_book,
          ${mysqlTables.phone}.Phone
      FROM ${mysqlTables.addresses}, ${mysqlTables.phone}
      WHERE
          ${mysqlTables.addresses}.addressesID = ${mysqlTables.phone}.address_ID AND ${mysqlTables.addresses}.Doctor_ID = ?
          AND ${mysqlTables.addresses}.address_public_status = 1 AND ${mysqlTables.addresses}.isActive = 1`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const addressData = results.map((row: RowDataPacket) => row as PublicAddressData)
    return addressData
  }

  async retrieveAvailabilityData (addressID: number): Promise<AvailabilityDataType[]> {
    const sql = `SELECT ${mysqlTables.booking_availability}.Day_of_week, ${mysqlTables.booking_availability}.Start_time,
      ${mysqlTables.booking_availability}.End_time FROM ${mysqlTables.booking_availability}
      WHERE ${mysqlTables.booking_availability}.address_ID = ?`
    const values = [addressID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const availabilityData = results.map((row: RowDataPacket) => row as AvailabilityDataType)
    return availabilityData
  }

  async retrievePersonalData (DoctorID: number): Promise<DoctorPersonalInfo> {
    const sql = `SELECT FirstName, LastName, Gender FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?`
    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const personalData = results[0] as DoctorPersonalInfo
    personalData.NVI = 0
    return personalData
  }
}()
