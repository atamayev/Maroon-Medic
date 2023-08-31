import { mysqlTables } from "../utils/table-names-list"
import { connectDatabase } from "../setup-and-security/connect"
import { RowDataPacket } from "mysql2"
import { transformArrayOfObjectsToCamelCase } from "../utils/transform-keys-to-camel-case"

export default new class SearchDB {
	async retrieveDoctorsFromSearchTerm (searchTerm: string): Promise<DoctorPersonalInfo[]> {
		const sql = `SELECT NVI, first_name, last_name FROM ${mysqlTables.basic_user_info}
        LEFT JOIN ${mysqlTables.doctor_specific_info} ON
          ${mysqlTables.basic_user_info}.user_id = ${mysqlTables.doctor_specific_info}.doctor_id
        LEFT JOIN ${mysqlTables.credentials} ON ${mysqlTables.basic_user_info}.user_id = ${mysqlTables.credentials}.user_id
      WHERE ${mysqlTables.doctor_specific_info}.verified = TRUE
        AND ${mysqlTables.doctor_specific_info}.publicly_available = TRUE
        AND ${mysqlTables.credentials}.is_active = 1
        AND ${mysqlTables.basic_user_info}.first_name LIKE ?`

		const values = [`${searchTerm}%`]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const doctorsList = results.map((row: RowDataPacket) => row as DoctorPersonalInfo)
		const camelCasedDoctorsList = transformArrayOfObjectsToCamelCase(doctorsList)
		return camelCasedDoctorsList as DoctorPersonalInfo[]
	}

	async retrieveAllDoctors (): Promise<DoctorPersonalInfo[]> {
		const sql = `SELECT NVI, first_name, last_name FROM ${mysqlTables.basic_user_info}
              LEFT JOIN ${mysqlTables.doctor_specific_info}
                ON ${mysqlTables.basic_user_info}.user_id = ${mysqlTables.doctor_specific_info}.doctor_id
              LEFT JOIN ${mysqlTables.credentials}
                ON ${mysqlTables.basic_user_info}.user_id = ${mysqlTables.credentials}.user_id
          WHERE
              ${mysqlTables.doctor_specific_info}.verified = TRUE
              AND ${mysqlTables.doctor_specific_info}.publicly_available = TRUE
              AND ${mysqlTables.credentials}.is_active = 1`

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql) as RowDataPacket[]
		const doctorsList = results.map((row: RowDataPacket) => row as DoctorPersonalInfo)
		const camelCasedDoctorsList = transformArrayOfObjectsToCamelCase(doctorsList)
		return camelCasedDoctorsList as DoctorPersonalInfo[]
	}
}()
