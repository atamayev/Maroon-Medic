import { mysqlTables } from "../utils/table-names-list.js"
import redisClient from "../setup-and-security/redis.js"
import { connection } from "../setup-and-security/connect.js"

/** FetchAllListsDB is fairly self-explanatory
 *  These lists are fetched from the DB for each doctor/patient to fill in their respective information.
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export default new class FetchAllListsDB {
  async fetchAllInsurances() {
    const cachedData = await redisClient.get(mysqlTables.insurance_list)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${mysqlTables.insurance_list}`

    try {
      const [results] = await connection.execute(sql)
      redisClient.set(mysqlTables.insurance_list, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }

  async fetchAllLanguages() {
    const cachedData = await redisClient.get(mysqlTables.language_list)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${mysqlTables.language_list}`

    try {
      const [results] = await connection.execute(sql)
      redisClient.set(mysqlTables.language_list, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }

  async fetchAllServicesAndCategories() {
    const cachedData = await redisClient.get(mysqlTables.service_and_category_list)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${mysqlTables.service_and_category_list}`

    try {
      const [results] = await connection.execute(sql)
      redisClient.set(mysqlTables.service_and_category_list, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }

  async fetchAllSpecialties() {
    const cachedData = await redisClient.get(mysqlTables.specialties_list)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${mysqlTables.specialties_list}`

    try {
      const [results] = await connection.execute(sql)
      redisClient.set(mysqlTables.specialties_list, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }

  async fetchAllPreVetSchools() {
    const cachedData = await redisClient.get(mysqlTables.vet_school_list)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${mysqlTables.vet_school_list}`

    try {
      const [results] = await connection.execute(sql)
      redisClient.set(mysqlTables.vet_school_list, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }

  async fetchAllPreVetEducationTypes() {
    const cachedData = await redisClient.get(mysqlTables.vet_education_type_list)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${mysqlTables.vet_education_type_list}`

    try {
      const [results] = await connection.execute(sql)
      redisClient.set(mysqlTables.vet_education_type_list, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }

  async fetchAllMajors() {
    const cachedData = await redisClient.get(mysqlTables.major_list)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${mysqlTables.major_list}`

    try {
      const [results] = await connection.execute(sql)
      redisClient.set(mysqlTables.major_list, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }

  async fetchAllVetSchools() {
    const cachedData = await redisClient.get(mysqlTables.vet_school_list)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${mysqlTables.vet_school_list}`

    try {
      const [results] = await connection.execute(sql)
      redisClient.set(mysqlTables.vet_school_list, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }

  async fetchAllVetEducationTypes() {
    const cachedData = await redisClient.get(mysqlTables.vet_education_type_list)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${mysqlTables.vet_education_type_list}`

    try {
      const [results] = await connection.execute(sql)
      redisClient.set(mysqlTables.vet_education_type_list, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }
  async fetchAllPets() {
    const cachedData = await redisClient.get(mysqlTables.pet_list)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${mysqlTables.pet_list}`

    try {
      const [results] = await connection.execute(sql)
      redisClient.set(mysqlTables.pet_list, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }
}()
