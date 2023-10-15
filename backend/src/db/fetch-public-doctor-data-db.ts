import { RowDataPacket } from "mysql2"
import { mysqlTables } from "../utils/table-names-list"
import { connectDatabase } from "../setup-and-security/connect"
import { transformArrayOfObjectsToCamelCase, transformKeysToCamelCase } from "../utils/transform-keys-to-camel-case"

export default new class FetchPublicDoctorDataDB {
	async languages (doctorId: number): Promise<LanguageName[]> {
		const sql = `SELECT ${mysqlTables.language_list}.language_name
      FROM ${mysqlTables.language_list}
          JOIN ${mysqlTables.language_mapping}
		  ON ${mysqlTables.language_list}.language_list_id = ${mysqlTables.language_mapping}.language_id
      WHERE ${mysqlTables.language_mapping}.user_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const languages = results.map((row: RowDataPacket) => row as LanguageName)
		const camelCasedLanguages = transformArrayOfObjectsToCamelCase(languages)
		return camelCasedLanguages as LanguageName[]
	}

	async specialties (doctorId: number): Promise<OrganizationSpecialtyName[]> {
		const sql = `SELECT ${mysqlTables.specialty_list}.organization_name, ${mysqlTables.specialty_list}.specialty_name
		FROM ${mysqlTables.specialty_list}
			JOIN ${mysqlTables.specialty_mapping}
			ON ${mysqlTables.specialty_list}.specialty_list_id = ${mysqlTables.specialty_mapping}.specialty_id
		WHERE ${mysqlTables.specialty_mapping}.doctor_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const specialties = results.map((row: RowDataPacket) => row as OrganizationSpecialtyName)
		const camelCasedSpecialties = transformArrayOfObjectsToCamelCase(specialties)
		return camelCasedSpecialties as OrganizationSpecialtyName[]
	}

	async preVetEducation (doctorId: number): Promise<PublicPreVetEducation[]> {
		const sql = `SELECT ${mysqlTables.pre_vet_school_list}.school_name, ${mysqlTables.major_list}.major_name,
			${mysqlTables.pre_vet_education_type_list}.education_type, ${mysqlTables.pre_vet_education_mapping}.start_date,
			${mysqlTables.pre_vet_education_mapping}.end_date
		FROM ${mysqlTables.pre_vet_education_mapping}, ${mysqlTables.pre_vet_school_list},
			${mysqlTables.major_list}, ${mysqlTables.pre_vet_education_type_list}
		WHERE ${mysqlTables.pre_vet_education_mapping}.school_id = ${mysqlTables.pre_vet_school_list}.pre_vet_school_list_id
		AND ${mysqlTables.pre_vet_education_mapping}.major_id = ${mysqlTables.major_list}.major_list_id
		AND ${mysqlTables.pre_vet_education_mapping}.education_type_id =
			${mysqlTables.pre_vet_education_type_list}.pre_vet_education_type_id
		AND ${mysqlTables.pre_vet_education_mapping}.doctor_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const preVetEducation = results.map((row: RowDataPacket) => row as PublicPreVetEducation)
		const camelCasedPreVetEducation = transformArrayOfObjectsToCamelCase(preVetEducation)
		return camelCasedPreVetEducation as PublicPreVetEducation[]
	}

	async vetEducation (doctorId: number): Promise<EducationItem[]> {
		const sql = `SELECT ${mysqlTables.vet_school_list}.school_name, ${mysqlTables.vet_education_type_list}.education_type,
			${mysqlTables.vet_education_mapping}.start_date, ${mysqlTables.vet_education_mapping}.end_date
			FROM ${mysqlTables.vet_education_mapping}, ${mysqlTables.vet_school_list}, ${mysqlTables.vet_education_type_list}
			WHERE
				${mysqlTables.vet_education_mapping}.school_id = ${mysqlTables.vet_school_list}.vet_school_list_id
				AND ${mysqlTables.vet_education_mapping}.education_type_id = ${mysqlTables.vet_education_type_list}.vet_education_type_id
				AND ${mysqlTables.vet_education_mapping}.doctor_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const vetEducation = results.map((row: RowDataPacket) => row as EducationItem)
		const camelCasedVetEducation = transformArrayOfObjectsToCamelCase(vetEducation)
		return camelCasedVetEducation as EducationItem[]
	}

	async servicedPets (doctorId: number): Promise<ServicedPetData[]> {
		const sql = `SELECT ${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type
        FROM ${mysqlTables.pet_list}
            JOIN ${mysqlTables.pet_mapping} ON ${mysqlTables.pet_list}.pet_list_id = ${mysqlTables.pet_mapping}.pet_id
        WHERE
            ${mysqlTables.pet_mapping}.doctor_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const servicedPets = results.map((row: RowDataPacket) => row as ServicedPetData)
		const camelCasedServicedPets = transformArrayOfObjectsToCamelCase(servicedPets)
		return camelCasedServicedPets as ServicedPetData[]
	}

	async addressData (doctorId: number): Promise<PublicAddressData[]> {
		const sql = `SELECT
          ${mysqlTables.addresses}.addresses_id, ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1,
          ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state,
          ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country, ${mysqlTables.addresses}.address_priority,
          ${mysqlTables.addresses}.instant_book,
          ${mysqlTables.doctor_phone_numbers}.phone
      FROM ${mysqlTables.addresses}, ${mysqlTables.doctor_phone_numbers}
      WHERE
          ${mysqlTables.addresses}.addresses_id = ${mysqlTables.doctor_phone_numbers}.address_id AND ${mysqlTables.addresses}.doctor_id = ?
          AND ${mysqlTables.addresses}.address_public_status = 1 AND ${mysqlTables.addresses}.is_active = 1`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const addressData = results.map((row: RowDataPacket) => row as PublicAddressData)
		const camelCasedAddressData = transformArrayOfObjectsToCamelCase(addressData)
		return camelCasedAddressData as PublicAddressData[]
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

	async personalData (doctorId: number): Promise<DoctorPersonalInfo> {
		const sql = `SELECT first_name, last_name, gender FROM ${mysqlTables.basic_user_info} WHERE user_id = ?`
		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const personalData = results[0] as DoctorPersonalInfo
		personalData.nvi = 0
		const camelCasedPersonalData = transformKeysToCamelCase(personalData)
		return camelCasedPersonalData as DoctorPersonalInfo
	}
}()
