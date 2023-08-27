import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { RowDataPacket } from "mysql2"

export default new class PrivatePatientDataDB {
	async addNewPatientInfo (patientInfo: UserInfo, dateOfBirth: MysqlTimestamp, UserID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.basic_user_info} (first_name, last_name, gender, date_of_birth, User_ID)
			VALUES (?, ?, ?, ?, ?)`
		const values = [patientInfo.FirstName, patientInfo.LastName, patientInfo.gender, dateOfBirth, UserID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async retrievePatientDashboard (PatientID: number): Promise<PatientDashboardData[]> {
		const sql = `SELECT
          ${mysqlTables.appointments}.appointmentsID, ${mysqlTables.appointments}.appointment_date,
          ${mysqlTables.appointments}.appointment_price, ${mysqlTables.appointments}.patient_message,
          ${mysqlTables.appointments}.doctor_confirmation_status AS doctorConfirmationStatus, ${mysqlTables.appointments}.created_at,
          ${mysqlTables.service_and_category_list}.category_name AS categoryName,
		  ${mysqlTables.service_and_category_list}.service_name AS serviceName,
          ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1, ${mysqlTables.addresses}.address_line_2,
          ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country,
          ${mysqlTables.basic_user_info}.first_name AS Doctor_FirstName, ${mysqlTables.basic_user_info}.last_name AS Doctor_LastName
      FROM ${mysqlTables.appointments}
          INNER JOIN ${mysqlTables.service_and_category_list} ON
			${mysqlTables.appointments}.${mysqlTables.service_and_category_list}_ID =
			${mysqlTables.service_and_category_list}.${mysqlTables.service_and_category_list}ID
          INNER JOIN ${mysqlTables.addresses}
			ON ${mysqlTables.appointments}.${mysqlTables.addresses}_ID = ${mysqlTables.addresses}.${mysqlTables.addresses}ID
			AND ${mysqlTables.addresses}.Doctor_ID = ${mysqlTables.appointments}.Doctor_ID
          INNER JOIN ${mysqlTables.basic_user_info} ON ${mysqlTables.appointments}.Doctor_ID = ${mysqlTables.basic_user_info}.User_ID
      WHERE
          ${mysqlTables.appointments}.Patient_ID = ?`

		const values = [PatientID]
		const connection = await connectDatabase()
		const [dashboardData] = await connection.execute(sql, values) as RowDataPacket[]
		return dashboardData as PatientDashboardData[]
	}

	async retrievePersonalPatientData (PatientID: number): Promise<UserInfo> {
		const sql = `SELECT first_name AS FirstName, last_name AS LastName, gender, date_of_birth as dateOfBirth
			FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?`
		const values = [PatientID]
		const connection = await connectDatabase()
		const [personalDataResults] = await connection.execute(sql, values) as RowDataPacket[]
		const personalData = personalDataResults[0]
		return personalData
	}
}()
