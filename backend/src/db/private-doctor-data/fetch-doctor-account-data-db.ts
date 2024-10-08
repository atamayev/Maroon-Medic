import _ from "lodash"
import { RowDataPacket } from "mysql2"
import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import Format from "../../utils/data-formatter"
import { transformArrayOfObjectsToCamelCase } from "../../utils/transform-keys-to-camel-case"

interface DescriptionData {
  description: string
}

export default new class FetchDoctorAccountDataDB {
	async languages (doctorId: number): Promise<LanguageItem[]> {
		const sql = `SELECT ${mysqlTables.language_list}.language_name, ${mysqlTables.language_list}.language_list_id
      FROM ${mysqlTables.language_list}
          JOIN ${mysqlTables.language_mapping}
		  ON ${mysqlTables.language_list}.language_list_id = ${mysqlTables.language_mapping}.language_id
      WHERE
          ${mysqlTables.language_mapping}.user_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const languages = results.map((row: RowDataPacket) => row as LanguageItem)
		const camelCasedLanguages = transformArrayOfObjectsToCamelCase(languages)
		return camelCasedLanguages as LanguageItem[]
	}

	async services (doctorId: number): Promise<DetailedServiceItem[]> {
		const sql = `SELECT ${mysqlTables.service_and_category_list}.category_name, ${mysqlTables.service_and_category_list}.service_name,
			${mysqlTables.service_and_category_list}.service_and_category_list_id, ${mysqlTables.service_mapping}.service_time,
			${mysqlTables.service_mapping}.service_price
		FROM ${mysqlTables.service_and_category_list}
			JOIN ${mysqlTables.service_mapping} ON
			${mysqlTables.service_and_category_list}.service_and_category_list_id = ${mysqlTables.service_mapping}.service_and_category_id
		WHERE
			${mysqlTables.service_mapping}.doctor_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const services = results.map((row: RowDataPacket) => row as DetailedServiceItem)
		const camelCasedServices = transformArrayOfObjectsToCamelCase(services)
		return camelCasedServices as DetailedServiceItem[]
	}

	async specialties (doctorId: number): Promise<OrganizationSpecialty[]> {
		const sql = `SELECT ${mysqlTables.specialty_list}.organization_name, ${mysqlTables.specialty_list}.specialty_name,
		${mysqlTables.specialty_list}.specialty_list_id
      FROM ${mysqlTables.specialty_list}
          JOIN ${mysqlTables.specialty_mapping}
          ON ${mysqlTables.specialty_list}.specialty_list_id = ${mysqlTables.specialty_mapping}.specialty_id
      WHERE
          ${mysqlTables.specialty_mapping}.doctor_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const specialties = results.map((row: RowDataPacket) => row as OrganizationSpecialty)
		const camelCasedSpecialties = transformArrayOfObjectsToCamelCase(specialties)
		return camelCasedSpecialties as OrganizationSpecialty[]
	}

	async preVetEducation (doctorId: number): Promise<PreVetEducation[]> {
		const sql = `SELECT ${mysqlTables.pre_vet_school_list}.school_name, ${mysqlTables.major_list}.major_name,
		${mysqlTables.pre_vet_education_type_list}.education_type, ${mysqlTables.pre_vet_education_mapping}.start_date,
		${mysqlTables.pre_vet_education_mapping}.end_date, ${mysqlTables.pre_vet_education_mapping}.pre_vet_education_mapping_id
		FROM ${mysqlTables.pre_vet_education_mapping}, ${mysqlTables.pre_vet_school_list},
		${mysqlTables.major_list}, ${mysqlTables.pre_vet_education_type_list}
		WHERE
		${mysqlTables.pre_vet_education_mapping}.school_id = ${mysqlTables.pre_vet_school_list}.pre_vet_school_list_id
		AND ${mysqlTables.pre_vet_education_mapping}.major_id = ${mysqlTables.major_list}.major_list_id
		AND ${mysqlTables.pre_vet_education_mapping}.education_type_id =
			${mysqlTables.pre_vet_education_type_list}.pre_vet_education_type_id
		AND ${mysqlTables.pre_vet_education_mapping}.doctor_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const preVetEducation = results.map((row: RowDataPacket) => row as PreVetEducation)
		const camelCasedPreVetEducation = transformArrayOfObjectsToCamelCase(preVetEducation)
		return camelCasedPreVetEducation as PreVetEducation[]
	}

	async vetEducation (doctorId: number): Promise<VetEducation[]> {
		const sql = `SELECT ${mysqlTables.vet_school_list}.school_name,
		${mysqlTables.vet_education_type_list}.education_type,
		${mysqlTables.vet_education_mapping}.start_date, ${mysqlTables.vet_education_mapping}.end_date,
		${mysqlTables.vet_education_mapping}.vet_education_mapping_id
		FROM ${mysqlTables.vet_education_mapping}, ${mysqlTables.vet_school_list}, ${mysqlTables.vet_education_type_list}
		WHERE
			${mysqlTables.vet_education_mapping}.school_id = ${mysqlTables.vet_school_list}.vet_school_list_id
			AND ${mysqlTables.vet_education_mapping}.education_type_id = ${mysqlTables.vet_education_type_list}.vet_education_type_id
			AND ${mysqlTables.vet_education_mapping}.doctor_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const vetEducation = results.map((row: RowDataPacket) => row as VetEducation)
		const camelCasedVetEducation = transformArrayOfObjectsToCamelCase(vetEducation)
		return camelCasedVetEducation as VetEducation[]
	}

	async addressData (doctorId: number): Promise<PrivateDoctorAddressData[]> {
		const sql = `SELECT ${mysqlTables.addresses}.addresses_id, ${mysqlTables.addresses}.address_title,
    ${mysqlTables.addresses}.address_line_1, ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city,
    ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip,
      ${mysqlTables.addresses}.country, ${mysqlTables.addresses}.address_priority, ${mysqlTables.addresses}.address_public_status,
      ${mysqlTables.addresses}.instant_book
      FROM ${mysqlTables.addresses}
      WHERE
          ${mysqlTables.addresses}.is_active = 1 AND ${mysqlTables.addresses}.doctor_id = ? `

		const values = [doctorId]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const addressData = results.map((row: RowDataPacket) => row as PrivateDoctorAddressData)
		const camelCasedAddressData = transformArrayOfObjectsToCamelCase(addressData)
		const formattedAddressData = Format.addressDataToBoolean(camelCasedAddressData as PrivateDoctorAddressData[])
		return formattedAddressData as PrivateDoctorAddressData[]
	}

	async availabilityData (addressId: number): Promise<DoctorAvailability[]> {
		const sql = `SELECT ${mysqlTables.booking_availability}.day_of_week,
		${mysqlTables.booking_availability}.start_time, ${mysqlTables.booking_availability}.end_time
		FROM ${mysqlTables.booking_availability}
		WHERE ${mysqlTables.booking_availability}.address_id = ?`

		const values = [addressId]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const availabilityData = results.map((row: RowDataPacket) => row as DoctorAvailability)
		const camelCasedAvailabilityData = transformArrayOfObjectsToCamelCase(availabilityData)
		return camelCasedAvailabilityData as DoctorAvailability[]
	}

	async phoneData (addressId: number): Promise<string> {
		const sql = `SELECT ${mysqlTables.doctor_phone_numbers}.phone
      FROM ${mysqlTables.doctor_phone_numbers}
      WHERE ${mysqlTables.doctor_phone_numbers}.address_id = ?`

		const values = [addressId]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		let phone = ""
		if (!_.isEmpty(results)) phone = results[0].phone
		return phone
	}

	async descriptionData (doctorId: number): Promise<string> {
		const sql = `SELECT description
      FROM ${mysqlTables.descriptions}
      WHERE doctor_id = ?`

		const values = [doctorId]

		const connection = await connectDatabase()
		const [descriptionResults] = await connection.execute(sql, values) as RowDataPacket[]
		const description = descriptionResults[0] as DescriptionData
		return description.description
	}

	async servicedPets (doctorId: number): Promise<ServicedPetItem[]> {
		const sql = `SELECT ${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type, ${mysqlTables.pet_list}.pet_list_id
      FROM ${mysqlTables.pet_list}
          JOIN ${mysqlTables.pet_mapping} ON ${mysqlTables.pet_list}.pet_list_id = ${mysqlTables.pet_mapping}.pet_id
      WHERE ${mysqlTables.pet_mapping}.doctor_id = ?`

		const values = [doctorId]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const servicedPets = results.map((row: RowDataPacket) => row as ServicedPetItem)
		const camelCasedServicedPets = transformArrayOfObjectsToCamelCase(servicedPets)
		return camelCasedServicedPets as ServicedPetItem[]
	}

	async verifiedAndPubliclyAvailableStatus (doctorId: number): Promise<DoctorStatus> {
		const sql = `SELECT publicly_available, verified
      FROM ${mysqlTables.doctor_specific_info}
      WHERE doctor_id = ?`

		const values = [doctorId]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const statusResults = results.map((row: RowDataPacket) => row as DoctorStatus)
		const camelCasedverifiedAndPubliclyAvailableStatus = transformArrayOfObjectsToCamelCase(statusResults)
		const status = {
			publiclyAvailable: camelCasedverifiedAndPubliclyAvailableStatus[0].publiclyAvailable,
			verified: camelCasedverifiedAndPubliclyAvailableStatus[0].verified
		} as DoctorStatus

		return status
	}
}()
