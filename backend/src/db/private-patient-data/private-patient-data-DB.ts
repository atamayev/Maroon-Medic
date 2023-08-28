import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { RowDataPacket } from "mysql2"
import { transformArrayOfObjectsToCamelCase, transformKeysToCamelCase } from "../../utils/transform-keys-to-camel-case"

export default new class PrivatePatientDataDB {
	async addNewPatientInfo (patientInfo: UserInfo, dateOfBirth: MysqlTimestamp, UserID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.basic_user_info} (first_name, last_name, gender, date_of_birth, User_ID)
			VALUES (?, ?, ?, ?, ?)`
		const values = [patientInfo.firstName, patientInfo.lastName, patientInfo.gender, dateOfBirth, UserID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async retrievePatientDashboard (PatientID: number): Promise<PatientDashboardData[]> {
		const sql = `SELECT
          ${mysqlTables.appointments}.appointmentsID, ${mysqlTables.appointments}.appointment_date,
          ${mysqlTables.appointments}.appointment_price, ${mysqlTables.appointments}.patient_message,
          ${mysqlTables.appointments}.doctor_confirmation_status,
		  ${mysqlTables.appointments}.created_at,
          ${mysqlTables.service_and_category_list}.category_name,
		  ${mysqlTables.service_and_category_list}.service_name,
          ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1, ${mysqlTables.addresses}.address_line_2,
          ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country,
          ${mysqlTables.basic_user_info}.first_name AS doctorFirstName, ${mysqlTables.basic_user_info}.last_name AS doctorLastName
      FROM ${mysqlTables.appointments}
          INNER JOIN ${mysqlTables.service_and_category_list} ON
			${mysqlTables.appointments}.service_and_category_list_ID = ${mysqlTables.service_and_category_list}.service_and_category_listID
          INNER JOIN ${mysqlTables.addresses}
			ON ${mysqlTables.appointments}.addresses_ID = ${mysqlTables.addresses}.addressesID
			AND ${mysqlTables.addresses}.Doctor_ID = ${mysqlTables.appointments}.Doctor_ID
          INNER JOIN ${mysqlTables.basic_user_info} ON ${mysqlTables.appointments}.Doctor_ID = ${mysqlTables.basic_user_info}.User_ID
      WHERE
          ${mysqlTables.appointments}.Patient_ID = ?`

		const values = [PatientID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const dashboardData = results.map((row: RowDataPacket) => row as DoctorDashboardData)
		const camelCasedDashboardData = transformArrayOfObjectsToCamelCase(dashboardData)
		return camelCasedDashboardData as PatientDashboardData[]
	}

	async retrievePersonalPatientData (PatientID: number): Promise<UserInfo> {
		const sql = `SELECT first_name, last_name, gender, date_of_birth FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?`
		const values = [PatientID]
		const connection = await connectDatabase()
		const [personalDataResults] = await connection.execute(sql, values) as RowDataPacket[]
		const personalData = personalDataResults[0]
		const camelCasedPersonalData = transformKeysToCamelCase(personalData)
		return camelCasedPersonalData as UserInfo
	}
}()
