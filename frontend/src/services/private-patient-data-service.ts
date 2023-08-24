import http from "../http-common"

export default new class PrivatePatientDataService {
	async addingPatientInfo(newPatientObject: BirthDateInfo) {
		return await http.post("private-patient-data/new-patient", {newPatientObject})
	}
	async fillDashboard() {
		return await http.get("/private-patient-data/fetch-dashboard-data")
	}
	async fillPersonalData() {
		return await http.get("/private-patient-data/fetch-personal-data")
	}
	async savePersonalData(personalInfo: BirthDateInfo) {
		return await http.post("/private-patient-data/save-personal-data", {personalInfo})
	}
	async fillAccountDetails() {
		return await http.get("/private-patient-data/fetch-account-details-data")
	}
	async addLanguage(languageID: number) {
		return await http.post("/private-patient-data/add-language", {languageID})
	}
	async deleteLanguage(languageID: number) {
		return await http.delete(`/private-patient-data/delete-language/${languageID}`)
	}
	async fetchPetData() {
		return await http.get("/private-patient-data/fetch-pet-data")
	}
	async addPetData(PetData: PetItemForCreation) {
		return await http.post("/private-patient-data/add-pet-data", {PetData})
	}
	async deletePetData(petID: number) {
		return await http.delete(`/private-patient-data/delete-pet-data/${petID}`)
	}
}()
