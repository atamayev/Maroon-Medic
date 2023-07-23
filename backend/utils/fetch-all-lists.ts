import redisClient from "../setup-and-security/redis.js"
import { mysqlTables } from "./table-names-list.js"
import { connectDatabase } from "../setup-and-security/connect.js"

type InsuranceListItem = {
  insurance_listID: number
  Insurance_name: string
}

type LanguageListItem = {
  language_listID: number
  Language_name: string
}

type ServiceListItem = {
  service_and_category_listID: number
  Category_name: string
  Service_name: string
}

type SpecialtyListItem = {
  specialties_listID: number
  Organization_name: string
  Specialty_name: string
}

type PreVetSchoolListItem = {
  pre_vet_school_listID: number
  School_name: string
}

type MajorListItem = {
  major_listID: number
  Major_name: string
}

type PreVetEducationListItem = {
  pre_vet_education_typeID: number
  Education_type: string
}

type VetSchoolListItem = {
  vet_school_listID: number
  School_name: string
}

type VetEducationListItem = {
  vet_education_typeID: number
  Education_type: string
}

type PetListItem = {
  pet_listID: number
  Pet: string
  Pet_type: string
}

type MysqlTableName = keyof typeof mysqlTables;

export default new class FetchAllLists {
  async #fetchAll(tableName: MysqlTableName) {
    const cachedData = await redisClient.get(tableName)
    if (cachedData) return JSON.parse(cachedData)

    const sql = `SELECT * FROM ${tableName}`

    try {
      const connection = await connectDatabase()
      const [results] = await connection.execute(sql)
      redisClient.set(tableName, JSON.stringify(results)).catch(error => console.error(error))
      return results
    } catch (error) {
      return []
    }
  }

  async fetchAllInsurances(): Promise<InsuranceListItem[]> {
    return await this.#fetchAll(mysqlTables.insurance_list as MysqlTableName)
  }

  async fetchAllLanguages(): Promise<LanguageListItem[]> {
    return await this.#fetchAll(mysqlTables.language_list as MysqlTableName)
  }

  async fetchAllServicesAndCategories(): Promise<ServiceListItem[]> {
    return await this.#fetchAll(mysqlTables.service_and_category_list as MysqlTableName)
  }

  async fetchAllSpecialties(): Promise<SpecialtyListItem[]> {
    return await this.#fetchAll(mysqlTables.specialties_list as MysqlTableName)
  }

  async fetchAllPreVetSchools(): Promise<PreVetSchoolListItem[]> {
    return await this.#fetchAll(mysqlTables.pre_vet_school_list as MysqlTableName)
  }

  async fetchAllPreVetEducationTypes(): Promise<PreVetEducationListItem[]> {
    return await this.#fetchAll(mysqlTables.pre_vet_education_type_list as MysqlTableName)
  }

  async fetchAllMajors(): Promise<MajorListItem[]> {
    return await this.#fetchAll(mysqlTables.major_list as MysqlTableName)
  }

  async fetchAllVetSchools(): Promise<VetSchoolListItem[]> {
    return await this.#fetchAll(mysqlTables.vet_school_list as MysqlTableName)
  }

  async fetchAllVetEducationTypes(): Promise<VetEducationListItem[]> {
    return await this.#fetchAll(mysqlTables.vet_education_type_list as MysqlTableName)
  }
  async fetchAllPets(): Promise<PetListItem[]> {
    return await this.#fetchAll(mysqlTables.pet_list as MysqlTableName)
  }
}()
