import redisClient from "../setup-and-security/redis.js"
import { mysqlTables } from "../utils/table-names-list.js"
import { connection } from "../setup-and-security/connect.js"

export default new class FetchAllLists {
  async #fetchAll(tableName) {
    const cachedData = await redisClient.get(tableName)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${tableName}`

    try {
      const [results] = await connection.execute(sql)
      redisClient.set(tableName, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }

  async fetchAllInsurances() {
    return await this.#fetchAll(mysqlTables.insurance_list)
  }

  async fetchAllLanguages() {
    return await this.#fetchAll(mysqlTables.language_list)
  }

  async fetchAllServicesAndCategories() {
    return await this.#fetchAll(mysqlTables.service_and_category_list)
  }

  async fetchAllSpecialties() {
    return await this.#fetchAll(mysqlTables.specialties_list)
  }

  async fetchAllPreVetSchools() {
    return await this.#fetchAll(mysqlTables.pre_vet_school_list)
  }

  async fetchAllPreVetEducationTypes() {
    return await this.#fetchAll(mysqlTables.vet_education_type_list)
  }

  async fetchAllMajors() {
    return await this.#fetchAll(mysqlTables.major_list)
  }

  async fetchAllVetSchools() {
    return await this.#fetchAll(mysqlTables.vet_school_list)
  }

  async fetchAllVetEducationTypes() {
    return await this.#fetchAll(mysqlTables.vet_education_type_list)
  }
  async fetchAllPets() {
    return await this.#fetchAll(mysqlTables.pet_list)
  }
}()
