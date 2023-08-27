import _ from "lodash"
import { RowDataPacket } from "mysql2"
import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import Format from "../../utils/data-formatter"

interface DescriptionData {
  description: string
}

export default new class FetchDoctorAccountDataDB {
	async languages (DoctorID: number): Promise<LanguageItem[]> {
		const sql = `SELECT ${mysqlTables.language_list}.language_name AS languageName, ${mysqlTables.language_list}.language_listID
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

	async services (DoctorID: number): Promise<DetailedServiceItem[]> {
		const sql = `SELECT ${mysqlTables.service_and_category_list}.category_name AS categoryName,
			${mysqlTables.service_and_category_list}.service_name AS serviceName,
			${mysqlTables.service_and_category_list}.service_and_category_listID,
			${mysqlTables.service_mapping}.service_time AS serviceTime,
			${mysqlTables.service_mapping}.service_price AS servicePrice
		FROM ${mysqlTables.service_and_category_list}
			JOIN ${mysqlTables.service_mapping} ON
			${mysqlTables.service_and_category_list}.service_and_category_listID = ${mysqlTables.service_mapping}.Service_and_Category_ID
		WHERE
			${mysqlTables.service_mapping}.Doctor_ID = ?`

		const values = [DoctorID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const services = results.map((row: RowDataPacket) => row as DetailedServiceItem)
		return services
	}

	async specialties (DoctorID: number): Promise<OrganizationSpecialty[]> {
		const sql = `SELECT ${mysqlTables.specialties_list}.organization_name as organizationName,
		${mysqlTables.specialties_list}.specialty_name AS specialtyName, ${mysqlTables.specialties_list}.specialties_listID
      FROM ${mysqlTables.specialties_list}
          JOIN ${mysqlTables.specialty_mapping}
          ON ${mysqlTables.specialties_list}.specialties_listID = ${mysqlTables.specialty_mapping}.specialty_ID
      WHERE
          ${mysqlTables.specialty_mapping}.Doctor_ID = ?`

		const values = [DoctorID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const specialties = results.map((row: RowDataPacket) => row as OrganizationSpecialty)
		return specialties
	}

	async preVetEducation (DoctorID: number): Promise<PreVetEducation[]> {
		const sql = `SELECT ${mysqlTables.pre_vet_school_list}.school_name AS schoolName, ${mysqlTables.major_list}.major_name AS majorName,
			${mysqlTables.pre_vet_education_type_list}.education_type as educationType, ${mysqlTables.pre_vet_education_mapping}.Start_Date,
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
		const preVetEducation = results.map((row: RowDataPacket) => row as PreVetEducation)
		return preVetEducation
	}

	async vetEducation (DoctorID: number): Promise<VetEducation[]> {
		const sql = `SELECT ${mysqlTables.vet_school_list}.school_name AS schoolName,
		${mysqlTables.vet_education_type_list}.education_type as educationType,
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
		const vetEducation = results.map((row: RowDataPacket) => row as VetEducation)
		return vetEducation
	}

	async addressData (DoctorID: number): Promise<PrivateDoctorAddressData[]> {
		const sql = `SELECT ${mysqlTables.addresses}.addressesID, ${mysqlTables.addresses}.address_title,
    ${mysqlTables.addresses}.address_line_1, ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city,
    ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip,
      ${mysqlTables.addresses}.country, ${mysqlTables.addresses}.address_priority, ${mysqlTables.addresses}.address_public_status,
      ${mysqlTables.addresses}.instant_book
      FROM ${mysqlTables.addresses}
      WHERE
          ${mysqlTables.addresses}.is_active = 1 AND ${mysqlTables.addresses}.Doctor_ID = ? `

		const values = [DoctorID]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const addressData = results.map((row: RowDataPacket) => row as PrivateDoctorAddressData)
		const newAddressData = Format.addressDataToBoolean(addressData)
		return newAddressData
	}

	async availabilityData (addressID: number): Promise<DoctorAvailability[]> {
		const sql = `SELECT ${mysqlTables.booking_availability}.day_of_week as dayOfWeek,
		${mysqlTables.booking_availability}.start_time AS startTime, ${mysqlTables.booking_availability}.end_time AS endTime
		FROM ${mysqlTables.booking_availability}
		WHERE ${mysqlTables.booking_availability}.address_ID = ?`

		const values = [addressID]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const availabilityData = results.map((row: RowDataPacket) => row as DoctorAvailability)
		return availabilityData
	}

	async phoneData (addressID: number): Promise<string> {
		const sql = `SELECT ${mysqlTables.doctor_phone_numbers}.phone
      FROM ${mysqlTables.doctor_phone_numbers}
      WHERE ${mysqlTables.doctor_phone_numbers}.address_ID = ?`

		const values = [addressID]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		let phone = ""
		if (!_.isEmpty(results)) phone = results[0].phone
		return phone
	}

	async descriptionData (DoctorID: number): Promise<string> {
		const sql = `SELECT description
      FROM ${mysqlTables.descriptions}
      WHERE Doctor_ID = ?`

		const values = [DoctorID]

		const connection = await connectDatabase()
		const [descriptionResults] = await connection.execute(sql, values) as RowDataPacket[]
		const description = descriptionResults[0] as DescriptionData

		return description.description
	}

	async servicedPets (DoctorID: number): Promise<ServicedPetItem[]> {
		const sql = `SELECT ${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type AS petType, ${mysqlTables.pet_list}.pet_listID
      FROM ${mysqlTables.pet_list}
          JOIN ${mysqlTables.pet_mapping} ON ${mysqlTables.pet_list}.pet_listID = ${mysqlTables.pet_mapping}.pet_ID
      WHERE ${mysqlTables.pet_mapping}.Doctor_ID = ?`

		const values = [DoctorID]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const servicedPets = results.map((row: RowDataPacket) => row as ServicedPetItem)
		return servicedPets
	}

	async verifiedAndPubliclyAvailableStatus (DoctorID: number): Promise<DoctorStatus> {
		const sql = `SELECT publicly_available, verified
      FROM ${mysqlTables.doctor_specific_info}
      WHERE Doctor_ID = ?`

		const values = [DoctorID]

		const connection = await connectDatabase()
		const [statusResults] = await connection.execute(sql, values) as RowDataPacket[]
		const status = {PubliclyAvailable: statusResults[0].publicly_available, Verified: statusResults[0].verified} as DoctorStatus

		return status
	}

	async pictures (DoctorID: number): Promise<PicturesItem[]> {
		const sql = `SELECT picture_link, picture_number
      FROM ${mysqlTables.pictures}
      WHERE Doctor_ID = ?`

		const values = [DoctorID]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const pictures = results.map((row: RowDataPacket) => row as PicturesItem)
		return pictures
	}
}()
