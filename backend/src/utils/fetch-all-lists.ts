import redisClient from "../setup-and-security/redis"
import { mysqlTables } from "./table-names-list"
import { connectDatabase } from "../setup-and-security/connect"

export default new class FetchAll {
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

  async insurances(): Promise<InsuranceItemType[]> {
    return await this.#fetchAll(mysqlTables.insurance_list)
  }

  async languages(): Promise<LanguageItemType[]> {
    return await this.#fetchAll(mysqlTables.language_list)
  }

  async servicesAndCategories(): Promise<ServiceListItemType[]> {
    return await this.#fetchAll(mysqlTables.service_and_category_list)
  }

  async specialties(): Promise<SpecialtyItemType[]> {
    return await this.#fetchAll(mysqlTables.specialties_list)
  }

  async preVetSchools(): Promise<PreVetSchoolType[]> {
    return await this.#fetchAll(mysqlTables.pre_vet_school_list)
  }

  async preVetEducationTypes(): Promise<PreVetEducationTypeType[]> {
    return await this.#fetchAll(mysqlTables.pre_vet_education_type_list)
  }

  async majors(): Promise<MajorType[]> {
    return await this.#fetchAll(mysqlTables.major_list)
  }

  async vetSchools(): Promise<VetSchoolListType[]> {
    return await this.#fetchAll(mysqlTables.vet_school_list)
  }

  async vetEducationTypes(): Promise<VetEducationTypeType[]> {
    return await this.#fetchAll(mysqlTables.vet_education_type_list)
  }

  async petTypes(): Promise<ServicedPetItemType[]> {
    return await this.#fetchAll(mysqlTables.pet_list)
  }
}()
