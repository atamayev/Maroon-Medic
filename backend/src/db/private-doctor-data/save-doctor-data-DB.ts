import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { OkPacket, RowDataPacket } from "mysql2"

type PhoneData = {
  addressesId: number
  phone: string
}

export default new class SaveDoctorDataDB {
	async checkIfPersonalDataExists (DoctorID: number): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?) AS 'exists' `
		const values = [DoctorID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesRecordExist = (results as RowDataPacket[])[0].exists
		return Boolean(doesRecordExist)
	}

	async updatePersonalData (personalInfo: DoctorPersonalInfoWithoutNVI, dateOfBirth: MysqlTimestamp, DoctorID: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.basic_user_info} SET first_name = ?, last_name = ?, gender = ?, date_of_birth = ?
			WHERE User_ID = ?`
		const values = [personalInfo.firstName, personalInfo.lastName, personalInfo.gender, dateOfBirth, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addPersonalData (personalInfo: DoctorPersonalInfoWithoutNVI, dateOfBirth: MysqlTimestamp, DoctorID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.basic_user_info} (first_name, last_name, gender, date_of_birth, User_ID)
			VALUES (?, ?, ?, ?, ?)`
		const values = [personalInfo.firstName, personalInfo.lastName, personalInfo.gender, dateOfBirth, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async checkIfDescriptionExists (DoctorID: number): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.descriptions} WHERE Doctor_ID = ?) AS 'exists' `
		const values = [DoctorID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesRecordExist = (results as RowDataPacket[])[0].exists
		return Boolean(doesRecordExist)
	}

	async updateDescription (description: string, DoctorID: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.descriptions} SET description = ? WHERE Doctor_ID = ?`
		const values = [description, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addDescription (description: string, DoctorID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.descriptions} (description, Doctor_ID) VALUES (?, ?)`
		const values = [description, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addLanguage (languageID: number, DoctorID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.language_mapping} (Language_ID, User_ID) VALUES (?, ?)`
		const values = [languageID, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteLanguage (languageID: number, DoctorID: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.language_mapping} WHERE Language_ID = ? AND User_ID = ?`
		const values = [languageID, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addSpecialty (specialtyID: number, DoctorID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.specialty_mapping} (Specialty_ID, Doctor_ID) VALUES (?, ?)`
		const values = [specialtyID, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteSpecialty (specialtyID: number, DoctorID: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.specialty_mapping} WHERE Specialty_ID = ? AND Doctor_ID = ?`
		const values = [specialtyID, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addServicedPet (petID: number, DoctorID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.pet_mapping} (pet_ID, Doctor_ID) VALUES (?, ?)`
		const values = [petID, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteServicedPet (petID: number, DoctorID: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.pet_mapping} WHERE pet_ID = ? AND Doctor_ID = ?`
		const values = [petID, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addServicesData (addedData: ServiceItem, DoctorID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.service_mapping}
    		(Service_and_Category_ID, service_time, service_price, Doctor_ID) VALUES (?, ?, ?, ?)`
		const values = [addedData.serviceAndCategoryListId, addedData.serviceTime, addedData.servicePrice, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteServicesData (deletedDataID: number, DoctorID: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.service_mapping} WHERE Service_and_Category_ID = ? AND Doctor_ID = ?`
		const values = [deletedDataID, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updateServicesData (updatedData: ServiceItem, DoctorID: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.service_mapping}
			SET service_time = ?, service_price = ? WHERE Service_and_Category_ID = ? AND Doctor_ID = ?`
		const values = [updatedData.serviceTime, updatedData.servicePrice, updatedData.serviceAndCategoryListId, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addPreVetEducationData (preVetEducationObject: AddPreVetEducationItem, DoctorID: number): Promise<number> {
		const sql = `INSERT INTO ${mysqlTables.pre_vet_education_mapping}
    		(School_ID, Major_ID, Education_type_ID, start_date, end_date, Doctor_ID) VALUES (?, ?, ?, ?, ?, ?)`
		const values = [preVetEducationObject.schoolId, preVetEducationObject.majorId, preVetEducationObject.educationTypeId,
			preVetEducationObject.startDate, preVetEducationObject.endDate, DoctorID]
		const connection = await connectDatabase()
		const [result] = await connection.execute(sql, values)
		return (result as OkPacket).insertId
	}

	async addVetEducationData (vetEducationObject: AddEducationItem, DoctorID: number): Promise<number> {
		const sql = `INSERT INTO ${mysqlTables.vet_education_mapping}
    (School_ID, Education_type_ID, start_date, end_date, Doctor_ID) VALUES (?, ?, ?, ?, ?)`
		const values = [vetEducationObject.schoolId, vetEducationObject.educationTypeId,
			vetEducationObject.startDate, vetEducationObject.endDate, DoctorID]
		const connection = await connectDatabase()
		const [result] = await connection.execute(sql, values)
		return (result as OkPacket).insertId
	}

	async deletePreVetEducationData (preVetEducationID: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.pre_vet_education_mapping} WHERE pre_vet_education_mappingID = ?`
		const values = [preVetEducationID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteVetEducationData (vetEducationID: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.vet_education_mapping} WHERE vet_education_mappingID = ?`
		const values = [vetEducationID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteAddressRecord (addressID: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.addresses} SET is_active = 0 WHERE addressesID = ?`
		const values = [addressID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addAddressRecord (addressObject: PrivateDoctorAddressLessTimesAndPhone, DoctorID: number): Promise<number> {
		const sql = `INSERT INTO ${mysqlTables.addresses}
          (address_title, address_line_1, address_line_2, city, state, zip, country,
            address_public_status, address_priority, instant_book, Doctor_ID)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
		const values = [addressObject.addressTitle, addressObject.addressLine1, addressObject.addressLine2,
			addressObject.city, addressObject.state, addressObject.zip, addressObject.country,
			addressObject.addressPublicStatus, addressObject.addressPriority, addressObject.instantBook, DoctorID]
		const connection = await connectDatabase()
		const [result] = await connection.execute(sql, values)
		return (result as OkPacket).insertId
	}

	async addPhoneRecord (phone: string, addressID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.doctor_phone_numbers} (phone, address_ID) VALUES (?, ?)`
		const values = [phone, addressID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updateAddressRecord (updatedAddressObject: PrivateDoctorAddressLessTimesAndPhone): Promise<void> {
		const sql = `UPDATE ${mysqlTables.addresses}
          SET address_title = ?, address_line_1 = ?, address_line_2 = ?, city = ?,
          state = ?, zip = ?, country = ?, address_public_status = ?, instant_book = ?
          WHERE addressesID = ?`
		const values = [updatedAddressObject.addressTitle, updatedAddressObject.addressLine1, updatedAddressObject.addressLine2,
			updatedAddressObject.city, updatedAddressObject.state, updatedAddressObject.zip, updatedAddressObject.country,
			updatedAddressObject.addressPublicStatus, updatedAddressObject.instantBook, updatedAddressObject.addressesId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async checkIfPhoneExists (addressID: number): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.doctor_phone_numbers} WHERE address_ID = ?) AS 'exists' `
		const values = [addressID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesPhoneExist = (results as RowDataPacket[])[0].exists
		return doesPhoneExist
	}

	async updatePhoneRecord (updatedPhoneObject: PhoneData): Promise<void> {
		const sql = `UPDATE ${mysqlTables.doctor_phone_numbers} SET phone = ? WHERE address_ID = ?`
		const values = [updatedPhoneObject.phone, updatedPhoneObject.addressesId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deletePhoneRecord (addressID: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.doctor_phone_numbers} WHERE address_ID = ?`
		const values = [addressID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addAvailbilityData (availbilityObject: DoctorAvailability, addressID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.booking_availability} (day_of_week, start_time, end_time, address_ID) VALUES (?, ?, ?, ?)`
		const values = [availbilityObject.dayOfWeek, availbilityObject.startTime, availbilityObject.endTime, addressID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteAvailbilityData (addressID: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.booking_availability} WHERE address_ID = ?`
		const values = [addressID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteSpecificDayAvailbilityData (availbilityObject: DoctorAvailability, addressID: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.booking_availability} WHERE address_ID = ? AND day_of_week = ?`
		const values = [addressID, availbilityObject.dayOfWeek]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updateTimeAvailbilityData (availbilityObject: DoctorAvailability, addressID: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.booking_availability} SET start_time = ?, end_time = ? WHERE day_of_week = ? AND address_ID = ?`
		const values = [availbilityObject.startTime, availbilityObject.endTime, availbilityObject.dayOfWeek, addressID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updatePublicAvilability (newstatus: boolean, DoctorID: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.doctor_specific_info} SET publicly_available = ? WHERE Doctor_ID = ?`
		const values = [newstatus, DoctorID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}
}()
