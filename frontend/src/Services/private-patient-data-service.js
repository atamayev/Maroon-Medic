import http from "../http-common"

export default new class PrivatePatientDataService {
  async addingPatientInfo(newPatientObject) {
    return await http.post("private-patient-data/new-patient", {newPatientObject})
  }
  async fillDashboard() {
    return await http.get("/private-patient-data/fetch-dashboard-data")
  }
  async fillPersonalData() {
    return await http.get("/private-patient-data/fetch-personal-data")
  }
  async savePersonalData(personalInfo) {
    return await http.post("/private-patient-data/save-personal-data", {personalInfo})
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
  async savePetData(PetData, operationType) {
    return await http.post("/private-patient-data/save-pet-data", {PetData: PetData, operationType: operationType})
  }
}()
