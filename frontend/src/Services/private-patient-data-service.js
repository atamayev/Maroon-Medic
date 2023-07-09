import http from "../http-common"

export default new class PrivatePatientDataService {
	async addingPatientInfo(new_patient_object) {
		return await http.post(`private-patient-data/new-patient`, {new_patient_object})
	}
	async fillDashboard() {
		return await http.get("/private-patient-data/fetch-dashboard-data")
	}
	async newPatientConfirmation() {
		return await http.get(`private-patient-data/new-patient-confirmation`)
	}
	async fillPersonalData() {
		return await http.get("/private-patient-data/fetch-personal-data")
	}
	async savePersonalData(personalInfo) {
		return await http.post("/private-patient-data/save-personal-data", {personalInfo})
	}
	async fillLists() {
		return await http.get("/private-patient-data/fetch-patient-lists")
	}
	async fillAccountDetails() {
		return await http.get("/private-patient-data/fetch-account-details-data")
	}
	async saveLanguageData(Data, operationType) { // for languages, and insurances
		return await http.post("/private-patient-data/save-language-data", {Data: Data, operationType: operationType})
	}
	async fetchPetData() {
		return await http.get("/private-patient-data/fetch-pet-data")
	}
	async fillPetTypes() {
		return await http.get("/private-patient-data/fetch-pet-types")
	}
	async fillInsurances() {
		return await http.get("/private-patient-data/fetch-insurances")
	}
	async savePetData(PetData, operationType) {
		return await http.post("/private-patient-data/save-pet-data", {PetData: PetData, operationType: operationType})
	}
}();
