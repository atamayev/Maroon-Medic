import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { RowDataPacket } from "mysql2"

export default new class PrivateDoctorDataDB {
	async addNewDoctorInfo (doctorInfo: UserInfo, dateOfBirth: MysqlTimestamp, UserID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?, ?, ?, ?, ?)`
		const values = [doctorInfo.FirstName, doctorInfo.LastName, doctorInfo.Gender, dateOfBirth, UserID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async retrieveDoctorDashboard (DoctorID: number): Promise<DoctorDashboardData[]> {
		const sql = `SELECT
          ${mysqlTables.appointments}.appointmentsID, ${mysqlTables.appointments}.appointment_date,
		  ${mysqlTables.appointments}.appointment_price, ${mysqlTables.appointments}.appointment_timespan,
		  ${mysqlTables.appointments}.patient_message, ${mysqlTables.appointments}.Doctor_confirmation_status,
           ${mysqlTables.appointments}.Created_at,
          ${mysqlTables.service_and_category_list}.Category_name, ${mysqlTables.service_and_category_list}.Service_name,
          ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1, ${mysqlTables.addresses}.address_line_2,
          ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country,
          ${mysqlTables.basic_user_info}.FirstName AS Patient_FirstName, ${mysqlTables.basic_user_info}.LastName AS Patient_LastName
      FROM ${mysqlTables.appointments}
          INNER JOIN ${mysqlTables.service_and_category_list} ON
			${mysqlTables.appointments}.${mysqlTables.service_and_category_list}_ID =
			${mysqlTables.service_and_category_list}.${mysqlTables.service_and_category_list}ID
          INNER JOIN ${mysqlTables.addresses} ON
          	${mysqlTables.appointments}.${mysqlTables.addresses}_ID = ${mysqlTables.addresses}.${mysqlTables.addresses}ID
          	AND ${mysqlTables.addresses}.Doctor_ID = ${mysqlTables.appointments}.Doctor_ID
          INNER JOIN ${mysqlTables.basic_user_info} ON ${mysqlTables.appointments}.Patient_ID = ${mysqlTables.basic_user_info}.User_ID
		  INNER JOIN ${mysqlTables.pet_info} ON ${mysqlTables.appointments}.pet_info_ID = ${mysqlTables.pet_info}.pet_infoID
      WHERE
          ${mysqlTables.appointments}.Doctor_ID = ?`

		const values = [DoctorID]
		const connection = await connectDatabase()
		const [dashboardData] = await connection.execute(sql, values) as RowDataPacket[]
		return dashboardData as DoctorDashboardData[]
	}

	async retrievePersonalDoctorData (DoctorID: number): Promise<UserInfo> {
		const sql = `SELECT FirstName, LastName, Gender, DOB FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?`
		const values = [DoctorID]
		const connection = await connectDatabase()
		const [personalDataResults] = await connection.execute(sql, values) as RowDataPacket[]
		const personalData = personalDataResults[0]
		return personalData
	}
}()
