import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { RowDataPacket } from "mysql2"
import { transformArrayOfObjectsToCamelCase, transformKeysToCamelCase } from "../../utils/transform-keys-to-camel-case"

export default new class PrivateDoctorDataDB {
	async addNewDoctorInfo (doctorInfo: UserInfo, dateOfBirth: MysqlTimestamp, userId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.basic_user_info} (first_name, last_name, gender, date_of_birth, user_id)
			VALUES (?, ?, ?, ?, ?)`
		const values = [doctorInfo.firstName, doctorInfo.lastName, doctorInfo.gender, dateOfBirth, userId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async retrieveDoctorDashboard (doctorId: number): Promise<DoctorDashboardData[]> {
		const sql = `SELECT
          ${mysqlTables.appointments}.appointments_id, ${mysqlTables.appointments}.appointment_date,
		  ${mysqlTables.appointments}.appointment_price,
		  ${mysqlTables.appointments}.appointment_timespan,
		  ${mysqlTables.appointments}.patient_message,
		  ${mysqlTables.appointments}.doctor_confirmation_status,
          ${mysqlTables.appointments}.created_at,
          ${mysqlTables.service_and_category_list}.category_name,
		  ${mysqlTables.service_and_category_list}.service_name,
          ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1, ${mysqlTables.addresses}.address_line_2,
          ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country,
          ${mysqlTables.basic_user_info}.first_name AS patientFirstName, ${mysqlTables.basic_user_info}.last_name AS patientLastName
      FROM ${mysqlTables.appointments}
          INNER JOIN ${mysqlTables.service_and_category_list} ON
			${mysqlTables.appointments}.service_and_category_list_ID =
			${mysqlTables.service_and_category_list}.service_and_category_listID
          INNER JOIN ${mysqlTables.addresses} ON
          	${mysqlTables.appointments}.addresses_ID = ${mysqlTables.addresses}.addressesID
          	AND ${mysqlTables.addresses}.doctor_id = ${mysqlTables.appointments}.doctor_id
          INNER JOIN ${mysqlTables.basic_user_info} ON ${mysqlTables.appointments}.patient_id = ${mysqlTables.basic_user_info}.user_id
		  INNER JOIN ${mysqlTables.pet_info} ON ${mysqlTables.appointments}.pet_info_ID = ${mysqlTables.pet_info}.pet_infoID
      WHERE
          ${mysqlTables.appointments}.doctor_id = ?`

		const values = [doctorId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const dashboardData = results.map((row: RowDataPacket) => row as DoctorDashboardData)
		const camelCasedDashboardData = transformArrayOfObjectsToCamelCase(dashboardData)
		return camelCasedDashboardData as DoctorDashboardData[]
	}

	async retrievePersonalDoctorData (doctorId: number): Promise<UserInfo> {
		const sql = `SELECT first_name, last_name, gender, date_of_birth FROM ${mysqlTables.basic_user_info} WHERE user_id = ?`
		const values = [doctorId]
		const connection = await connectDatabase()
		const [personalDataResults] = await connection.execute(sql, values) as RowDataPacket[]
		const personalData = personalDataResults[0]
		const camelCasedPersonalData = transformKeysToCamelCase(personalData)
		return camelCasedPersonalData as UserInfo
	}
}()
