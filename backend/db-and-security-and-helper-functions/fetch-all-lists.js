import { connection, DB_Operation } from "./connect.js"

/** FetchAllLists is fairly self-explanatory
 *  These lists are fetched from the DB for each doctor/patient to fill in their respective information.
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export default new class FetchAllLists {
    async fetchAllInsurances() {
        const functionName = this.fetchAllInsurances.bind(this).name
        const insurances = "insurance_list"
        const sql = `SELECT * FROM ${insurances}`
        await DB_Operation(functionName, insurances)

        try {
            const [results] = await connection.execute(sql)
            return results
        } catch (error) {
            return []
        }
    }

    async fetchAllLanguages() {
        const functionName = this.fetchAllLanguages.bind(this).name
        const language_list = "language_list"
        const sql = `SELECT * FROM ${language_list}`
        await DB_Operation(functionName, language_list)

        try {
            const [results] = await connection.execute(sql)
            return results
        } catch (error) {
            return []
        }
    }

    async fetchAllServicesAndCategories() {
        const functionName = this.fetchAllServicesAndCategories.bind(this).name
        const service_and_category_list = "service_and_category_list"
        const sql = `SELECT * FROM ${service_and_category_list}`
        await DB_Operation(functionName, service_and_category_list)

        try {
            const [results] = await connection.execute(sql)
            return results
        } catch (error) {
            return []
        }
    }

    async fetchAllSpecialties() {
        const functionName = this.fetchAllSpecialties.bind(this).name
        const specialties_list = "specialties_list"
        const sql = `SELECT * FROM ${specialties_list}`
        await DB_Operation(functionName, specialties_list)

        try {
            const [results] = await connection.execute(sql)
            return results
        } catch (error) {
            return []
        }
    }

    async fetchAllPreVetSchools() {
        const functionName = this.fetchAllPreVetSchools.bind(this).name
        const pre_vet_school_list = "pre_vet_school_list"
        const sql = `SELECT * FROM ${pre_vet_school_list}`
        await DB_Operation(functionName, pre_vet_school_list)

        try {
            const [results] = await connection.execute(sql)
            return results
        } catch (error) {
            return []
        }
    }

    async fetchAllPreVetEducationTypes() {
        const functionName = this.fetchAllPreVetEducationTypes.bind(this).name
        const pre_vet_education_type_list = "pre_vet_education_type_list"
        const sql = `SELECT * FROM ${pre_vet_education_type_list}`
        await DB_Operation(functionName, pre_vet_education_type_list)

        try {
            const [results] = await connection.execute(sql)
            return results
        } catch (error) {
            return []
        }
    }

    async fetchAllMajors() {
        const functionName = this.fetchAllMajors.bind(this).name
        const major_list = "major_list"
        const sql = `SELECT * FROM ${major_list}`
        await DB_Operation(functionName, major_list)

        try {
            const [results] = await connection.execute(sql)
            return results
        } catch (error) {
            return []
        }
    }

    async fetchAllVetSchools() {
        const functionName = this.fetchAllVetSchools.bind(this).name
        const vet_school_list = "vet_school_list"
        const sql = `SELECT * FROM ${vet_school_list}`
        await DB_Operation(functionName, vet_school_list)

        try {
            const [results] = await connection.execute(sql)
            return results
        } catch (error) {
            return []
        }
    }

    async fetchAllVetEducationTypes() {
        const functionName = this.fetchAllVetEducationTypes.bind(this).name
        const vet_education_type_list = "vet_education_type_list"
        const sql = `SELECT * FROM ${vet_education_type_list}`
        await DB_Operation(functionName, vet_education_type_list)

        try {
            const [results] = await connection.execute(sql)
            return results
        } catch (error) {
            return []
        }
    }
    async fetchAllPets() {
        const functionName = this.fetchAllPets.bind(this).name
        const pet_list = "pet_list"
        const sql = `SELECT * FROM ${pet_list}`
        await DB_Operation(functionName, pet_list)

        try {
            const [results] = await connection.execute(sql)
            return results
        } catch (error) {
            return []
        }
    }
}()
