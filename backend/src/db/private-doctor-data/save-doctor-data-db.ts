import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { ResultSetHeader, RowDataPacket } from "mysql2"

type PhoneData = {
  addressesId: number
  phone: string
}

export default new class SaveDoctorDataDB {
	async checkIfPersonalDataExists (doctorId: number): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.basic_user_info} WHERE user_id = ?) AS 'exists' `
		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesRecordExist = (results as RowDataPacket[])[0].exists
		return Boolean(doesRecordExist)
	}

	async updatePersonalData (personalInfo: DoctorPersonalInfoWithoutNVI, dateOfBirth: MysqlTimestamp, doctorId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.basic_user_info} SET first_name = ?, last_name = ?, gender = ?, date_of_birth = ?
			WHERE user_id = ?`
		const values = [personalInfo.firstName, personalInfo.lastName, personalInfo.gender, dateOfBirth, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addPersonalData (personalInfo: DoctorPersonalInfoWithoutNVI, dateOfBirth: MysqlTimestamp, doctorId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.basic_user_info} (first_name, last_name, gender, date_of_birth, user_id)
			VALUES (?, ?, ?, ?, ?)`
		const values = [personalInfo.firstName, personalInfo.lastName, personalInfo.gender, dateOfBirth, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async checkIfDescriptionExists (doctorId: number): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.descriptions} WHERE doctor_id = ?) AS 'exists' `
		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesRecordExist = (results as RowDataPacket[])[0].exists
		return Boolean(doesRecordExist)
	}

	async updateDescription (description: string, doctorId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.descriptions} SET description = ? WHERE doctor_id = ?`
		const values = [description, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addDescription (description: string, doctorId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.descriptions} (description, doctor_id) VALUES (?, ?)`
		const values = [description, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addLanguage (languageId: number, doctorId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.language_mapping} (language_id, user_id) VALUES (?, ?)`
		const values = [languageId, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteLanguage (languageId: number, doctorId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.language_mapping} WHERE language_id = ? AND user_id = ?`
		const values = [languageId, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addSpecialty (specialtyId: number, doctorId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.specialty_mapping} (specialty_id, doctor_id) VALUES (?, ?)`
		const values = [specialtyId, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteSpecialty (specialtyId: number, doctorId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.specialty_mapping} WHERE specialty_id = ? AND doctor_id = ?`
		const values = [specialtyId, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addServicedPet (petId: number, doctorId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.pet_mapping} (pet_id, doctor_id) VALUES (?, ?)`
		const values = [petId, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteServicedPet (petId: number, doctorId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.pet_mapping} WHERE pet_id = ? AND doctor_id = ?`
		const values = [petId, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addServicesData (addedData: ServiceItem, doctorId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.service_mapping}
    		(service_and_category_id, service_time, service_price, doctor_id) VALUES (?, ?, ?, ?)`
		const values = [addedData.serviceAndCategoryListId, addedData.serviceTime, addedData.servicePrice, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteServicesData (deletedDataId: number, doctorId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.service_mapping} WHERE service_and_category_id = ? AND doctor_id = ?`
		const values = [deletedDataId, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updateServicesData (updatedData: ServiceItem, doctorId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.service_mapping}
			SET service_time = ?, service_price = ? WHERE service_and_category_id = ? AND doctor_id = ?`
		const values = [updatedData.serviceTime, updatedData.servicePrice, updatedData.serviceAndCategoryListId, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addPreVetEducationData (preVetEducationObject: AddPreVetEducationItem, doctorId: number): Promise<number> {
		const sql = `INSERT INTO ${mysqlTables.pre_vet_education_mapping}
    		(school_id, major_id, education_type_id, start_date, end_date, doctor_id) VALUES (?, ?, ?, ?, ?, ?)`
		const values = [preVetEducationObject.schoolId, preVetEducationObject.majorId, preVetEducationObject.educationTypeId,
			preVetEducationObject.startDate, preVetEducationObject.endDate, doctorId]
		const connection = await connectDatabase()
		const [result] = await connection.execute(sql, values)
		return (result as ResultSetHeader).insertId
	}

	async addVetEducationData (vetEducationObject: AddEducationItem, doctorId: number): Promise<number> {
		const sql = `INSERT INTO ${mysqlTables.vet_education_mapping}
    (school_id, education_type_id, start_date, end_date, doctor_id) VALUES (?, ?, ?, ?, ?)`
		const values = [vetEducationObject.schoolId, vetEducationObject.educationTypeId,
			vetEducationObject.startDate, vetEducationObject.endDate, doctorId]
		const connection = await connectDatabase()
		const [result] = await connection.execute(sql, values)
		return (result as ResultSetHeader).insertId
	}

	async deletePreVetEducationData (preVetEducationId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.pre_vet_education_mapping} WHERE pre_vet_education_mapping_id = ?`
		const values = [preVetEducationId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteVetEducationData (vetEducationId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.vet_education_mapping} WHERE vet_education_mapping_id = ?`
		const values = [vetEducationId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteAddressRecord (addressId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.addresses} SET is_active = 0 WHERE addresses_id = ?`
		const values = [addressId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addAddressRecord (addressObject: PrivateDoctorAddressLessTimesAndPhone, doctorId: number): Promise<number> {
		const sql = `INSERT INTO ${mysqlTables.addresses}
          (address_title, address_line_1, address_line_2, city, state, zip, country,
            address_public_status, address_priority, instant_book, doctor_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
		const values = [addressObject.addressTitle, addressObject.addressLine1, addressObject.addressLine2,
			addressObject.city, addressObject.state, addressObject.zip, addressObject.country,
			addressObject.addressPublicStatus, addressObject.addressPriority, addressObject.instantBook, doctorId]
		const connection = await connectDatabase()
		const [result] = await connection.execute(sql, values)
		return (result as ResultSetHeader).insertId
	}

	async addPhoneRecord (phone: string, addressId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.doctor_phone_numbers} (phone, address_id) VALUES (?, ?)`
		const values = [phone, addressId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updateAddressRecord (updatedAddressObject: PrivateDoctorAddressLessTimesAndPhone): Promise<void> {
		const sql = `UPDATE ${mysqlTables.addresses}
          SET address_title = ?, address_line_1 = ?, address_line_2 = ?, city = ?,
          state = ?, zip = ?, country = ?, address_public_status = ?, instant_book = ?
          WHERE addresses_id = ?`
		const values = [updatedAddressObject.addressTitle, updatedAddressObject.addressLine1, updatedAddressObject.addressLine2,
			updatedAddressObject.city, updatedAddressObject.state, updatedAddressObject.zip, updatedAddressObject.country,
			updatedAddressObject.addressPublicStatus, updatedAddressObject.instantBook, updatedAddressObject.addressesId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async checkIfPhoneExists (addressId: number): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.doctor_phone_numbers} WHERE address_id = ?) AS 'exists' `
		const values = [addressId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesPhoneExist = (results as RowDataPacket[])[0].exists
		return doesPhoneExist
	}

	async updatePhoneRecord (updatedPhoneObject: PhoneData): Promise<void> {
		const sql = `UPDATE ${mysqlTables.doctor_phone_numbers} SET phone = ? WHERE address_id = ?`
		const values = [updatedPhoneObject.phone, updatedPhoneObject.addressesId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deletePhoneRecord (addressId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.doctor_phone_numbers} WHERE address_id = ?`
		const values = [addressId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addAvailbilityData (availbilityObject: DoctorAvailability, addressId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.booking_availability} (day_of_week, start_time, end_time, address_id) VALUES (?, ?, ?, ?)`
		const values = [availbilityObject.dayOfWeek, availbilityObject.startTime, availbilityObject.endTime, addressId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteAvailbilityData (addressId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.booking_availability} WHERE address_id = ?`
		const values = [addressId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteSpecificDayAvailbilityData (availbilityObject: DoctorAvailability, addressId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.booking_availability} WHERE address_id = ? AND day_of_week = ?`
		const values = [addressId, availbilityObject.dayOfWeek]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updateTimeAvailbilityData (availbilityObject: DoctorAvailability, addressId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.booking_availability} SET start_time = ?, end_time = ? WHERE day_of_week = ? AND address_id = ?`
		const values = [availbilityObject.startTime, availbilityObject.endTime, availbilityObject.dayOfWeek, addressId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updatePublicAvilability (newstatus: boolean, doctorId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.doctor_specific_info} SET publicly_available = ? WHERE doctor_id = ?`
		const values = [newstatus, doctorId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}
}()
