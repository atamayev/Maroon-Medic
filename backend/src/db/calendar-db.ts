import _ from "lodash"
import { mysqlTables } from "../utils/table-names-list"
import { connectDatabase } from "../setup-and-security/connect"
import { RowDataPacket } from "mysql2"
import { transformArrayOfObjectsToCamelCase } from "../utils/transform-keys-to-camel-case"

export default new class CalendarDB {
	async retrieveDoctorIdFromNVI (NVI: number): Promise<number | null> {
		const sql = `SELECT doctor_id FROM ${mysqlTables.doctor_specific_info} WHERE NVI = ?`
		const values = [NVI]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		if (_.isEmpty(results)) return null
		const doctorId = (results)[0].doctor_id
		return doctorId
	}

	async addAppointment (
		dateTime: MysqlTimestamp,
		appointmentObject: AppointmentObject,
		doctorId: number,
		patientId: number,
	): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.appointments}
      (appointment_date, appointment_price, appointment_timespan, patient_message, doctor_confirmation_status,
        service_and_category_list_id, pet_info_id, patient_id, doctor_id, addresses_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

		const values = [dateTime, appointmentObject.appointmentPrice, appointmentObject.appointmentTimespan, appointmentObject.message,
			appointmentObject.instantBook, appointmentObject.serviceAndCategoryListId,
			appointmentObject.selectedPetId, patientId, doctorId, appointmentObject.addressesId
		]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async retrieveDoctorCalendarDetails (doctorId: number): Promise<CalendarData[]> {
		const sql = `SELECT
        ${mysqlTables.appointments}.appointments_id, ${mysqlTables.appointments}.appointment_date,
        ${mysqlTables.appointments}.appointment_price,
		${mysqlTables.appointments}.appointment_timespan,
		${mysqlTables.appointments}.patient_message,
		${mysqlTables.appointments}.doctor_confirmation_status,
		${mysqlTables.appointments}.created_at,
        ${mysqlTables.service_and_category_list}.category_name,
		${mysqlTables.service_and_category_list}.service_name,
        ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1,
        ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city,
        ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country,
        ${mysqlTables.basic_user_info}.first_name AS patientFirstName, ${mysqlTables.basic_user_info}.last_name AS patientLastName,
        ${mysqlTables.pet_info}.name AS petName
      FROM ${mysqlTables.appointments}
        INNER JOIN ${mysqlTables.service_and_category_list} ON
          ${mysqlTables.appointments}.service_and_category_list_id = ${mysqlTables.service_and_category_list}.service_and_category_list_id
        INNER JOIN ${mysqlTables.addresses} ON
          ${mysqlTables.appointments}.addresses_id = ${mysqlTables.addresses}.addresses_id
          AND ${mysqlTables.addresses}.doctor_id = ${mysqlTables.appointments}.doctor_id
        INNER JOIN ${mysqlTables.pet_info} ON
        ${mysqlTables.appointments}.pet_info_id = ${mysqlTables.pet_info}.pet_info_id
        INNER JOIN ${mysqlTables.basic_user_info} ON ${mysqlTables.pet_info}.patient_id = ${mysqlTables.basic_user_info}.user_id
      WHERE
        ${mysqlTables.appointments}.doctor_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const calendarData = results.map((row: RowDataPacket) => row as CalendarData)
		const camelCasedCalendarData = transformArrayOfObjectsToCamelCase(calendarData)
		return camelCasedCalendarData as CalendarData[]
	}

	async confirmAppointmentStatus (appointmentId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.appointments} SET doctor_confirmation_status = 1 WHERE appointments_id = ?`
		const values = [appointmentId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}
}()
