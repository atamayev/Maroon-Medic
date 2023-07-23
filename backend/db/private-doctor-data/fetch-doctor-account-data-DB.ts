import { mysqlTables } from "../../utils/table-names-list.js"
import { connectDatabase } from "../../setup-and-security/connect.ts"
import { RowDataPacket } from "mysql2"

type LanguageItem = {
  language_listID: number
  Language_name: string
}

type ServiceItem = {
  service_and_category_listID: number
  Category_name: string
  Service_name: string
  Service_time: string
  Service_price: number
}

type SpecialtyItem = {
  specialties_listID: number
  Organization_name: string
  Specialty_name: string
}

type SchoolItem = {
  education_mappingID: number
  School_name: string
  Major_name?: string
  Education_type: string
  Start_Date: string
  End_Date: string
}

type AddressData = {
  addressesID: number
  address_title: string
  address_line_1: string
  address_line_2: string
  city: string
  state: string
  zip: string
  country: string
  address_priority: number
  instant_book: boolean
  address_public_status: boolean
  phones: PhoneData[]
  times: AvailabilityData[]
}

type PhoneData = {
  Phone: string
  phone_priority: number
}

interface AvailabilityData {
  Day_of_week: string
  Start_time: string
  End_time: string
}

interface DescriptionData {
  Description: string
}

type PetItem = {
  pet_listID: number
  Pet: string
  Pet_type: string
}

type DoctorStatus = {
  PubliclyAvailable: boolean
  Verified: boolean
}

type PicturesData = {
  picture_link: string
  picture_number: number
}

export default new class FetchDoctorAccountDataDB {
  async retrieveLanguages (DoctorID: number): Promise<LanguageItem[]> {
    const sql = `SELECT ${mysqlTables.language_list}.Language_name, ${mysqlTables.language_list}.language_listID
      FROM ${mysqlTables.language_list}
          JOIN ${mysqlTables.language_mapping} ON ${mysqlTables.language_list}.language_listID = ${mysqlTables.language_mapping}.Language_ID
      WHERE
          ${mysqlTables.language_mapping}.User_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const languages = results.map((row: RowDataPacket) => row as LanguageItem)
    return languages
  }

  async retrieveServices (DoctorID: number): Promise<ServiceItem[]> {
    const sql = `SELECT ${mysqlTables.service_and_category_list}.Category_name, ${mysqlTables.service_and_category_list}.Service_name, ${mysqlTables.service_and_category_list}.service_and_category_listID, ${mysqlTables.service_mapping}.Service_time, ${mysqlTables.service_mapping}.Service_price
      FROM ${mysqlTables.service_and_category_list}
          JOIN ${mysqlTables.service_mapping} ON ${mysqlTables.service_and_category_list}.service_and_category_listID = ${mysqlTables.service_mapping}.Service_and_Category_ID
      WHERE
          ${mysqlTables.service_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const services = results.map((row: RowDataPacket) => row as ServiceItem)
    return services
  }

  async retrieveSpecialties (DoctorID: number): Promise<SpecialtyItem[]> {
    const sql = `SELECT ${mysqlTables.specialties_list}.Organization_name, ${mysqlTables.specialties_list}.Specialty_name, ${mysqlTables.specialties_list}.specialties_listID
      FROM ${mysqlTables.specialties_list}
          JOIN ${mysqlTables.specialty_mapping} ON ${mysqlTables.specialties_list}.specialties_listID = ${mysqlTables.specialty_mapping}.specialty_ID
      WHERE
          ${mysqlTables.specialty_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const specialties = results.map((row: RowDataPacket) => row as SpecialtyItem)
    return specialties
  }

  async retrievePreVetEducation (DoctorID: number): Promise<SchoolItem[]> {
    const sql = `SELECT ${mysqlTables.pre_vet_school_list}.School_name, ${mysqlTables.major_list}.Major_name, ${mysqlTables.pre_vet_education_type_list}.Education_type, ${mysqlTables.pre_vet_education_mapping}.Start_Date, ${mysqlTables.pre_vet_education_mapping}.End_Date, ${mysqlTables.pre_vet_education_mapping}.pre_vet_education_mappingID
      FROM ${mysqlTables.pre_vet_education_mapping}, ${mysqlTables.pre_vet_school_list}, ${mysqlTables.major_list}, ${mysqlTables.pre_vet_education_type_list}
      WHERE
          ${mysqlTables.pre_vet_education_mapping}.School_ID = ${mysqlTables.pre_vet_school_list}.pre_vet_school_listID
          AND ${mysqlTables.pre_vet_education_mapping}.Major_ID = ${mysqlTables.major_list}.major_listID
          AND ${mysqlTables.pre_vet_education_mapping}.Education_type_ID = ${mysqlTables.pre_vet_education_type_list}.pre_vet_education_typeID
          AND ${mysqlTables.pre_vet_education_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const preVetEducation = results.map((row: RowDataPacket) => row as SchoolItem)
    return preVetEducation
  }

  async retrieveVetEducation (DoctorID: number): Promise<SchoolItem[]> {
    const sql = `SELECT ${mysqlTables.vet_school_list}.School_name, ${mysqlTables.vet_education_type_list}.Education_type, ${mysqlTables.vet_education_mapping}.Start_Date, ${mysqlTables.vet_education_mapping}.End_Date, ${mysqlTables.vet_education_mapping}.vet_education_mappingID
      FROM ${mysqlTables.vet_education_mapping}, ${mysqlTables.vet_school_list}, ${mysqlTables.vet_education_type_list}
      WHERE
          ${mysqlTables.vet_education_mapping}.School_ID = ${mysqlTables.vet_school_list}.vet_school_listID
          AND ${mysqlTables.vet_education_mapping}.Education_type_ID = ${mysqlTables.vet_education_type_list}.vet_education_typeID
          AND ${mysqlTables.vet_education_mapping}.Doctor_ID = ?`

    const values = [DoctorID]
    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const vetEducation = results.map((row: RowDataPacket) => row as SchoolItem)
    return vetEducation
  }

  async retrieveAddressData (DoctorID: number): Promise<AddressData[]> {
    const sql = `SELECT ${mysqlTables.addresses}.addressesID, ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1,
      ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip,
      ${mysqlTables.addresses}.country, ${mysqlTables.addresses}.address_priority, ${mysqlTables.addresses}.address_public_status, ${mysqlTables.addresses}.instant_book
      FROM ${mysqlTables.addresses}
      WHERE
          ${mysqlTables.addresses}.isActive = 1 AND ${mysqlTables.addresses}.Doctor_ID = ? `

    const values = [DoctorID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const addressData = results.map((row: RowDataPacket) => row as AddressData)
    return addressData
  }

  async retrieveAvailabilityData (addressID: number): Promise<AvailabilityData[]> {
    const sql = `SELECT ${mysqlTables.booking_availability}.Day_of_week, ${mysqlTables.booking_availability}.Start_time, ${mysqlTables.booking_availability}.End_time
      FROM ${mysqlTables.booking_availability}
      WHERE ${mysqlTables.booking_availability}.address_ID = ?`

    const values = [addressID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const availabilityData = results.map((row: RowDataPacket) => row as AvailabilityData)
    return availabilityData
  }

  async retrievePhoneData (addressID: number): Promise<PhoneData[]> {
    const sql = `SELECT ${mysqlTables.phone}.Phone, ${mysqlTables.phone}.phone_priority
      FROM ${mysqlTables.phone}
      WHERE ${mysqlTables.phone}.address_ID = ?`

    const values = [addressID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const phones = results.map((row: RowDataPacket) => row as PhoneData)
    return phones
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

  async retrieveServicedPets (DoctorID: number): Promise<PetItem[]> {
    const sql = `SELECT ${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type, ${mysqlTables.pet_list}.pet_listID
      FROM ${mysqlTables.pet_list}
          JOIN ${mysqlTables.pet_mapping} ON ${mysqlTables.pet_list}.pet_listID = ${mysqlTables.pet_mapping}.pet_ID
      WHERE ${mysqlTables.pet_mapping}.Doctor_ID = ?`

    const values = [DoctorID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const servicedPets = results.map((row: RowDataPacket) => row as PetItem)
    return servicedPets
  }

  async retrieveVerifiedAndPubliclyAvailableStatus (DoctorID: number): Promise<DoctorStatus> {
    const sql = `SELECT publiclyAvailable, verified
      FROM ${mysqlTables.doctor_specific_info}
      WHERE Doctor_ID = ?`

    const values = [DoctorID]

    const connection = await connectDatabase()
    const [statusResults] = await connection.execute(sql, values) as RowDataPacket[]
    const status = {PubliclyAvailable: statusResults[0].publiclyAvailable, Verified: statusResults[0].verified} as DoctorStatus

    return status
  }

  async retrievePictures (DoctorID: number): Promise<PicturesData[]> {
    const sql = `SELECT picture_link, picture_number
      FROM ${mysqlTables.pictures}
      WHERE Doctor_ID = ?`

    const values = [DoctorID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const pictures = results.map((row: RowDataPacket) => row as PicturesData)
    return pictures
  }
}()
