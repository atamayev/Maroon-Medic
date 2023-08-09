import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { RowDataPacket } from "mysql2"
import _ from "lodash"

interface DescriptionData {
  Description: string
}

export default new class FetchDoctorAccountDataDB {
  async retrieveLanguages (DoctorID: number): Promise<LanguageItemType[]> {
    const sql = `SELECT ${mysqlTables.language_list}.Language_name, ${mysqlTables.language_list}.language_listID
      FROM ${mysqlTables.language_list}
          JOIN ${mysqlTables.language_mapping} ON ${mysqlTables.language_list}.language_listID = ${mysqlTables.language_mapping}.Language_ID
      WHERE
          ${mysqlTables.language_mapping}.User_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const languages = results.map((row: RowDataPacket) => row as LanguageItemType)
    return languages
  }

  async retrieveServices (DoctorID: number): Promise<ServiceItemType[]> {
    const sql = `SELECT ${mysqlTables.service_and_category_list}.Category_name, ${mysqlTables.service_and_category_list}.Service_name,
      ${mysqlTables.service_and_category_list}.service_and_category_listID, ${mysqlTables.service_mapping}.Service_time,
      ${mysqlTables.service_mapping}.Service_price
      FROM ${mysqlTables.service_and_category_list}
          JOIN ${mysqlTables.service_mapping} ON
          ${mysqlTables.service_and_category_list}.service_and_category_listID = ${mysqlTables.service_mapping}.Service_and_Category_ID
      WHERE
          ${mysqlTables.service_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const services = results.map((row: RowDataPacket) => row as ServiceItemType)
    return services
  }

  async retrieveSpecialties (DoctorID: number): Promise<SpecialtyItemType[]> {
    const sql = `SELECT ${mysqlTables.specialties_list}.Organization_name, ${mysqlTables.specialties_list}.Specialty_name,
      ${mysqlTables.specialties_list}.specialties_listID
      FROM ${mysqlTables.specialties_list}
          JOIN ${mysqlTables.specialty_mapping}
          ON ${mysqlTables.specialties_list}.specialties_listID = ${mysqlTables.specialty_mapping}.specialty_ID
      WHERE
          ${mysqlTables.specialty_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const specialties = results.map((row: RowDataPacket) => row as SpecialtyItemType)
    return specialties
  }

  async retrievePreVetEducation (DoctorID: number): Promise<PreVetEducationItemType[]> {
    const sql = `SELECT ${mysqlTables.pre_vet_school_list}.School_name, ${mysqlTables.major_list}.Major_name,
    ${mysqlTables.pre_vet_education_type_list}.Education_type, ${mysqlTables.pre_vet_education_mapping}.Start_Date,
    ${mysqlTables.pre_vet_education_mapping}.End_Date, ${mysqlTables.pre_vet_education_mapping}.pre_vet_education_mappingID
      FROM ${mysqlTables.pre_vet_education_mapping}, ${mysqlTables.pre_vet_school_list},
      ${mysqlTables.major_list}, ${mysqlTables.pre_vet_education_type_list}
      WHERE
          ${mysqlTables.pre_vet_education_mapping}.School_ID = ${mysqlTables.pre_vet_school_list}.pre_vet_school_listID
          AND ${mysqlTables.pre_vet_education_mapping}.Major_ID = ${mysqlTables.major_list}.major_listID
          AND ${mysqlTables.pre_vet_education_mapping}.Education_type_ID =
            ${mysqlTables.pre_vet_education_type_list}.pre_vet_education_typeID
          AND ${mysqlTables.pre_vet_education_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const preVetEducation = results.map((row: RowDataPacket) => row as PreVetEducationItemType)
    return preVetEducation
  }

  async retrieveVetEducation (DoctorID: number): Promise<VetEducationItemType[]> {
    const sql = `SELECT ${mysqlTables.vet_school_list}.School_name, ${mysqlTables.vet_education_type_list}.Education_type,
    ${mysqlTables.vet_education_mapping}.Start_Date, ${mysqlTables.vet_education_mapping}.End_Date,
    ${mysqlTables.vet_education_mapping}.vet_education_mappingID
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

  async retrieveAddressData (DoctorID: number): Promise<PrivateDoctorAddressData[]> {
    const sql = `SELECT ${mysqlTables.addresses}.addressesID, ${mysqlTables.addresses}.address_title,
    ${mysqlTables.addresses}.address_line_1, ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city,
    ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip,
      ${mysqlTables.addresses}.country, ${mysqlTables.addresses}.address_priority, ${mysqlTables.addresses}.address_public_status,
      ${mysqlTables.addresses}.instant_book
      FROM ${mysqlTables.addresses}
      WHERE
          ${mysqlTables.addresses}.isActive = 1 AND ${mysqlTables.addresses}.Doctor_ID = ? `

    const values = [DoctorID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const addressData = results.map((row: RowDataPacket) => row as PrivateDoctorAddressData)
    return addressData
  }

  async retrieveAvailabilityData (addressID: number): Promise<AvailabilityDataType[]> {
    const sql = `SELECT ${mysqlTables.booking_availability}.Day_of_week, ${mysqlTables.booking_availability}.Start_time,
     ${mysqlTables.booking_availability}.End_time
      FROM ${mysqlTables.booking_availability}
      WHERE ${mysqlTables.booking_availability}.address_ID = ?`

    const values = [addressID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const availabilityData = results.map((row: RowDataPacket) => row as AvailabilityDataType)
    return availabilityData
  }

  async retrievePhoneData (addressID: number): Promise<string> {
    const sql = `SELECT ${mysqlTables.phone}.Phone
      FROM ${mysqlTables.phone}
      WHERE ${mysqlTables.phone}.address_ID = ?`

    const values = [addressID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    let phone = ""
    if (!_.isEmpty(results)) phone = results[0].Phone
    return phone
  }

  async retrieveDescriptionData (DoctorID: number): Promise<string> {
    const sql = `SELECT Description
      FROM ${mysqlTables.descriptions}
      WHERE Doctor_ID = ?`

    const values = [DoctorID]

    const connection = await connectDatabase()
    const [descriptionResults] = await connection.execute(sql, values) as RowDataPacket[]
    const description = descriptionResults[0] as DescriptionData

    return description.Description
  }

  async retrieveServicedPets (DoctorID: number): Promise<ServicedPetItemType[]> {
    const sql = `SELECT ${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type, ${mysqlTables.pet_list}.pet_listID
      FROM ${mysqlTables.pet_list}
          JOIN ${mysqlTables.pet_mapping} ON ${mysqlTables.pet_list}.pet_listID = ${mysqlTables.pet_mapping}.pet_ID
      WHERE ${mysqlTables.pet_mapping}.Doctor_ID = ?`

    const values = [DoctorID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const servicedPets = results.map((row: RowDataPacket) => row as ServicedPetItemType)
    return servicedPets
  }

  async retrieveVerifiedAndPubliclyAvailableStatus (DoctorID: number): Promise<DoctorStatusType> {
    const sql = `SELECT publiclyAvailable, verified
      FROM ${mysqlTables.doctor_specific_info}
      WHERE Doctor_ID = ?`

    const values = [DoctorID]

    const connection = await connectDatabase()
    const [statusResults] = await connection.execute(sql, values) as RowDataPacket[]
    const status = {PubliclyAvailable: statusResults[0].publiclyAvailable, Verified: statusResults[0].verified} as DoctorStatusType

    return status
  }

  async retrievePictures (DoctorID: number): Promise<PicturesItemType[]> {
    const sql = `SELECT picture_link, picture_number
      FROM ${mysqlTables.pictures}
      WHERE Doctor_ID = ?`

    const values = [DoctorID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const pictures = results.map((row: RowDataPacket) => row as PicturesItemType)
    return pictures
  }
}()
