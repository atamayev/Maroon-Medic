import redisClient from "../setup-and-security/redis"
import { mysqlTables } from "./table-names-list"
import { connectDatabase } from "../setup-and-security/connect"

export default new class FetchAllLists {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async #fetchAll(tableName: string) {
    const cachedData = await redisClient.get(tableName)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${tableName}`

    try {
      const connection = await connectDatabase()
      const [results] = await connection.execute(sql)
      redisClient.set(tableName, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error: unknown) {
      return []
    }
  }

  async fetchAllInsurances(): Promise<InsuranceItemType[]> {
    return await this.#fetchAll(mysqlTables.insurance_list)
  }

  async fetchAllLanguages(): Promise<LanguageItemType[]> {
    return await this.#fetchAll(mysqlTables.language_list)
  }

  async fetchAllServicesAndCategories(): Promise<ServiceListItemType[]> {
    return await this.#fetchAll(mysqlTables.service_and_category_list)
  }

  async fetchAllSpecialties(): Promise<SpecialtyItemType[]> {
    return await this.#fetchAll(mysqlTables.specialties_list)
  }

  async fetchAllPreVetSchools(): Promise<PreVetSchoolType[]> {
    return await this.#fetchAll(mysqlTables.pre_vet_school_list)
  }

  async fetchAllPreVetEducationTypes(): Promise<PreVetEducationTypeType[]> {
    return await this.#fetchAll(mysqlTables.pre_vet_education_type_list)
  }

  async fetchAllMajors(): Promise<MajorType[]> {
    return await this.#fetchAll(mysqlTables.major_list)
  }

  async fetchAllVetSchools(): Promise<VetSchoolListType[]> {
    return await this.#fetchAll(mysqlTables.vet_school_list)
  }

  async fetchAllVetEducationTypes(): Promise<VetEducationTypeType[]> {
    return await this.#fetchAll(mysqlTables.vet_education_type_list)
  }

  async fetchAllPetTypes(): Promise<ServicedPetItemType[]> {
    return await this.#fetchAll(mysqlTables.pet_list)
  }
}()
