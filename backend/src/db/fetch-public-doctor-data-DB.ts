import { RowDataPacket } from "mysql2"
import { mysqlTables } from "../utils/table-names-list"
import { connectDatabase } from "../setup-and-security/connect"
import { transformArrayOfObjectsToCamelCase, transformKeysToCamelCase } from "../utils/transform-keys-to-camel-case"

export default new class FetchPublicDoctorDataDB {
	async languages (DoctorID: number): Promise<LanguageName[]> {
		const sql = `SELECT ${mysqlTables.language_list}.language_name
      FROM ${mysqlTables.language_list}
          JOIN ${mysqlTables.language_mapping} ON ${mysqlTables.language_list}.language_listID = ${mysqlTables.language_mapping}.Language_ID
      WHERE ${mysqlTables.language_mapping}.User_ID = ?`

		const values = [DoctorID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const languages = results.map((row: RowDataPacket) => row as LanguageName)
		const camelCasedLanguages = transformArrayOfObjectsToCamelCase(languages)
		return camelCasedLanguages as LanguageName[]
	}

	async specialties (DoctorID: number): Promise<OrganizationSpecialtyName[]> {
		const sql = `SELECT ${mysqlTables.specialties_list}.organization_name, ${mysqlTables.specialties_list}.specialty_name
		FROM ${mysqlTables.specialties_list}
			JOIN ${mysqlTables.specialty_mapping}
			ON ${mysqlTables.specialties_list}.specialties_listID = ${mysqlTables.specialty_mapping}.specialty_ID
		WHERE ${mysqlTables.specialty_mapping}.Doctor_ID = ?`

		const values = [DoctorID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const specialties = results.map((row: RowDataPacket) => row as OrganizationSpecialtyName)
		const camelCasedSpecialties = transformArrayOfObjectsToCamelCase(specialties)
		return camelCasedSpecialties as OrganizationSpecialtyName[]
	}

	async preVetEducation (DoctorID: number): Promise<PreVetEducation[]> {
		const sql = `SELECT ${mysqlTables.pre_vet_school_list}.school_name, ${mysqlTables.major_list}.major_name,
		${mysqlTables.pre_vet_education_type_list}.education_type, ${mysqlTables.pre_vet_education_mapping}.start_date,
		${mysqlTables.pre_vet_education_mapping}.end_date
		FROM ${mysqlTables.pre_vet_education_mapping}, ${mysqlTables.pre_vet_school_list},
		${mysqlTables.major_list}, ${mysqlTables.pre_vet_education_type_list}
		WHERE ${mysqlTables.pre_vet_education_mapping}.School_ID = ${mysqlTables.pre_vet_school_list}.pre_vet_school_listID
		AND ${mysqlTables.pre_vet_education_mapping}.Major_ID = ${mysqlTables.major_list}.major_listID
		AND ${mysqlTables.pre_vet_education_mapping}.Education_type_ID = ${mysqlTables.pre_vet_education_type_list}.pre_vet_education_typeID
		AND ${mysqlTables.pre_vet_education_mapping}.Doctor_ID = ?`

		const values = [DoctorID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const preVetEducation = results.map((row: RowDataPacket) => row as PreVetEducation)
		const camelCasedPreVetEducation = transformArrayOfObjectsToCamelCase(preVetEducation)
		return camelCasedPreVetEducation as PreVetEducation[]
	}

	async vetEducation (DoctorID: number): Promise<VetEducation[]> {
		const sql = `SELECT ${mysqlTables.vet_school_list}.school_name, ${mysqlTables.vet_education_type_list}.education_type,
			${mysqlTables.vet_education_mapping}.start_date, ${mysqlTables.vet_education_mapping}.end_date
			FROM ${mysqlTables.vet_education_mapping}, ${mysqlTables.vet_school_list}, ${mysqlTables.vet_education_type_list}
			WHERE
				${mysqlTables.vet_education_mapping}.School_ID = ${mysqlTables.vet_school_list}.vet_school_listID
				AND ${mysqlTables.vet_education_mapping}.Education_type_ID = ${mysqlTables.vet_education_type_list}.vet_education_typeID
				AND ${mysqlTables.vet_education_mapping}.Doctor_ID = ?`

		const values = [DoctorID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const vetEducation = results.map((row: RowDataPacket) => row as VetEducation)
		const camelCasedVetEducation = transformArrayOfObjectsToCamelCase(vetEducation)
		return camelCasedVetEducation as VetEducation[]
	}

	async servicedPets (DoctorID: number): Promise<ServicedPetData[]> {
		const sql = `SELECT ${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type
        FROM ${mysqlTables.pet_list}
            JOIN ${mysqlTables.pet_mapping} ON ${mysqlTables.pet_list}.pet_listID = ${mysqlTables.pet_mapping}.pet_ID
        WHERE
            ${mysqlTables.pet_mapping}.Doctor_ID = ?`

		const values = [DoctorID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const servicedPets = results.map((row: RowDataPacket) => row as ServicedPetData)
		const camelCasedServicedPets = transformArrayOfObjectsToCamelCase(servicedPets)
		return camelCasedServicedPets as ServicedPetData[]
	}

	async addressData (DoctorID: number): Promise<PublicAddressData[]> {
		const sql = `SELECT
          ${mysqlTables.addresses}.addressesID, ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1,
          ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state,
          ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country, ${mysqlTables.addresses}.address_priority,
          ${mysqlTables.addresses}.instant_book,
          ${mysqlTables.doctor_phone_numbers}.phone
      FROM ${mysqlTables.addresses}, ${mysqlTables.doctor_phone_numbers}
      WHERE
          ${mysqlTables.addresses}.addressesID = ${mysqlTables.doctor_phone_numbers}.address_ID AND ${mysqlTables.addresses}.Doctor_ID = ?
          AND ${mysqlTables.addresses}.address_public_status = 1 AND ${mysqlTables.addresses}.is_active = 1`

		const values = [DoctorID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const addressData = results.map((row: RowDataPacket) => row as PublicAddressData)
		const camelCasedAddressData = transformArrayOfObjectsToCamelCase(addressData)
		return camelCasedAddressData as PublicAddressData[]
	}

	async availabilityData (addressID: number): Promise<DoctorAvailability[]> {
		const sql = `SELECT ${mysqlTables.booking_availability}.day_of_week,
		${mysqlTables.booking_availability}.start_time, ${mysqlTables.booking_availability}.end_time
		FROM ${mysqlTables.booking_availability}
		WHERE ${mysqlTables.booking_availability}.address_ID = ?`

		const values = [addressID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const availabilityData = results.map((row: RowDataPacket) => row as DoctorAvailability)
		const camelCasedAvailabilityData = transformArrayOfObjectsToCamelCase(availabilityData)
		return camelCasedAvailabilityData as DoctorAvailability[]
	}

	async personalData (DoctorID: number): Promise<DoctorPersonalInfo> {
		const sql = `SELECT first_name, last_name, gender FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?`
		const values = [DoctorID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const personalData = results[0] as DoctorPersonalInfo
		personalData.NVI = 0
		const camelCasedPersonalData = transformKeysToCamelCase(personalData)
		return camelCasedPersonalData as DoctorPersonalInfo
	}
}()
