import http from "../http-common"

export default new class PrivateDoctorDataService {
  async addingDoctorInfo(newDoctorObject) {
    return await http.post("private-doctor-data/new-doctor", {newDoctorObject})
  }
  async fillDashboard() {
    return await http.get("/private-doctor-data/fetch-dashboard-data")
  }
  async fillPersonalData() {
    return await http.get("/private-doctor-data/fetch-personal-data")
  }
  async savePersonalData(personalInfo) {
    return await http.post("/private-doctor-data/save-personal-data", {personalInfo})
  }
  async fillAccountDetails() {
    return await http.get("/private-doctor-data/fetch-account-details-data")
  }
  async saveDescriptionData(Description) {
    return await http.post("/private-doctor-data/save-description-data", {Description})
  }
  async addLanguage(languageID) {
    return await http.post("/private-doctor-data/add-language", {languageID: languageID})
  }
  async deleteLanguage(languageID) {
    return await http.delete(`/private-doctor-data/delete-language/${languageID}`)
  }
  async addSpecialty(specialtyID) {
    return await http.post("/private-doctor-data/add-specialty", {specialtyID: specialtyID})
  }
  async deleteSpecialty(specialtyID) {
    return await http.delete("/private-doctor-data/delete-specialty", {specialtyID: specialtyID})
  }
  async addServicedPet(petID) {
    return await http.post("/private-doctor-data/add-serviced-pet", {petID: petID})
  }
  async deleteServicedPet(petID) {
    return await http.delete("/private-doctor-data/delete-serviced-pet", {petID: petID})
  }
  async savePublicAvailibility(PublicAvailibility) {
    return await http.post("/private-doctor-data/save-public-availibility-data", {PublicAvailibility})
  }
  async saveEducationData(EducationData, EducationType, operationType) {
    return await http.post("/private-doctor-data/save-education-data", {EducationData: EducationData, EducationType: EducationType, operationType: operationType})
  }
  async saveServiceData(ServicesData) {
    return await http.post("/private-doctor-data/save-services-data", {ServicesData: ServicesData})
  }
  async saveAddressData(AddressData, times) {
    return await http.post("/private-doctor-data/save-address-data", {AddressData: AddressData, Times: times})
  }
}()
