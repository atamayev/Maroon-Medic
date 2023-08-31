import http from "../http-common"

interface EducationData {
  schoolId: number
  majorId?: number
  educationTypeId: number
  startDate: string
  endDate: string
}

export default new class PrivateDoctorDataService {
	async addingDoctorInfo(newDoctorObject: BirthDateInfo) {
		return await http.post("private-doctor-data/new-doctor", {newDoctorObject})
	}
	async fillDashboard() {
		return await http.get("/private-doctor-data/fetch-dashboard-data")
	}
	async fillPersonalData() {
		return await http.get("/private-doctor-data/fetch-personal-data")
	}
	async savePersonalData(personalInfo: BirthDateInfo) {
		return await http.post("/private-doctor-data/save-personal-data", {personalInfo})
	}
	async fillAccountDetails() {
		return await http.get("/private-doctor-data/fetch-account-details-data")
	}
	async saveDescriptionData(description: string) {
		return await http.post("/private-doctor-data/save-description-data", {description})
	}
	async addLanguage(languageId: number) {
		return await http.post("/private-doctor-data/add-language", {languageId})
	}
	async deleteLanguage(languageId: number) {
		return await http.delete(`/private-doctor-data/delete-language/${languageId}`)
	}
	async addSpecialty(specialtyId: number) {
		return await http.post("/private-doctor-data/add-specialty", {specialtyId: specialtyId})
	}
	async deleteSpecialty(specialtyId: number) {
		return await http.delete(`/private-doctor-data/delete-specialty/${specialtyId}`)
	}
	async addServicedPet(petId: number) {
		return await http.post("/private-doctor-data/add-serviced-pet", {petId: petId})
	}
	async deleteServicedPet(petId: number) {
		return await http.delete(`/private-doctor-data/delete-serviced-pet/${petId}`)
	}
	async savePublicAvailibility(publicAvailibility: boolean) {
		return await http.post("/private-doctor-data/save-public-availibility-data", {publicAvailibility})
	}
	async addPreVetEducationData(preVetEducationData: EducationData) {
		return await http.post("/private-doctor-data/add-pre-vet-education-data", {preVetEducationData})
	}
	async deletePreVetEducationData(preVetEducationId: number) {
		return await http.delete(`/private-doctor-data/delete-pre-vet-education-data/${preVetEducationId}`)
	}
	async addVetEducationData(vetEducationData: EducationData) {
		return await http.post("/private-doctor-data/add-vet-education-data", {vetEducationData})
	}
	async deleteVetEducationData(vetEducationId: number) {
		return await http.delete(`/private-doctor-data/delete-vet-education-data/${vetEducationId}`)
	}
	async addService(serviceObject: ServiceItemNotNullablePrice) {
		return await http.post("/private-doctor-data/add-service", {serviceObject})
	}
	async updateService(serviceObject: ServiceItemNotNullablePrice) {
		return await http.patch("/private-doctor-data/update-service", {serviceObject})
	}
	async deleteService(serviceObject: ServiceItemNotNullablePrice) {
		return await http.delete(`/private-doctor-data/delete-service/${serviceObject.serviceAndCategoryListId}`)
	}
	async addAddressData(addressData: BaseAddressData, times: DoctorAvailability[]) {
		return await http.post("/private-doctor-data/add-address", {addressData, times})
	}
	async updateAddressData(addressData: BaseAddressData, times: DoctorAvailability[]) {
		return await http.patch("/private-doctor-data/update-address", {addressData, times})
	}
	async deleteAddressData(addressId: number) {
		return await http.delete(`/private-doctor-data/delete-address/${addressId}`)
	}
}()
