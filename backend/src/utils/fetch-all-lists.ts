import redisClient from "../setup-and-security/redis"
import { mysqlTables } from "./table-names-list"
import { connectDatabase } from "../setup-and-security/connect"
import { RowDataPacket } from "mysql2"
import { transformArrayOfObjectsToCamelCase } from "./transform-keys-to-camel-case"

export default new class FetchAll {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	async #fetchAll(tableName: string) {
		const cachedData = await redisClient.get(tableName)
		if (cachedData) return JSON.parse(cachedData)

		const sql = `SELECT * FROM ${tableName}`

		try {
			const connection = await connectDatabase()
			const [results] = await connection.execute(sql) as RowDataPacket[]
			const formattedResults = results.map((row: RowDataPacket) => row)
			const camelCasedResults = transformArrayOfObjectsToCamelCase(formattedResults)
			redisClient.set(tableName, JSON.stringify(camelCasedResults)).catch(error => console.error(error))
			return camelCasedResults
		} catch (error: unknown) {
			return []
		}
	}

	async insurances(): Promise<InsuranceItem[]> {
		return await this.#fetchAll(mysqlTables.insurance_list)
	}

	async petMedications(): Promise<PetMedicationItem[]> {
		return await this.#fetchAll(mysqlTables.pet_medication_list)
	}

	async petProcedures(): Promise<PetProceduresItem[]> {
		return await this.#fetchAll(mysqlTables.pet_procedure_list)
	}

	async languages(): Promise<LanguageItem[]> {
		return await this.#fetchAll(mysqlTables.language_list)
	}

	async servicesAndCategories(): Promise<ServiceListItem[]> {
		return await this.#fetchAll(mysqlTables.service_and_category_list)
	}

	async specialties(): Promise<OrganizationSpecialty[]> {
		return await this.#fetchAll(mysqlTables.specialty_list)
	}

	async preVetSchools(): Promise<PreVetSchool[]> {
		return await this.#fetchAll(mysqlTables.pre_vet_school_list)
	}

	async preVetEducationTypes(): Promise<PreVetEducationType[]> {
		return await this.#fetchAll(mysqlTables.pre_vet_education_type_list)
	}

	async majors(): Promise<Major[]> {
		return await this.#fetchAll(mysqlTables.major_list)
	}

	async vetSchools(): Promise<VetSchool[]> {
		return await this.#fetchAll(mysqlTables.vet_school_list)
	}

	async vetEducationTypes(): Promise<VetEducationType[]> {
		return await this.#fetchAll(mysqlTables.vet_education_type_list)
	}

	async petTypes(): Promise<ServicedPetItem[]> {
		return await this.#fetchAll(mysqlTables.pet_list)
	}
}()
