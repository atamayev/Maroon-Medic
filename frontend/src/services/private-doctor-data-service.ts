import http from "../http-common"

interface EducationData {
  School_ID: number
  Major_ID?: number
  Education_type_ID: number
  Start_date: string
  End_date: string
}

interface ServiceData {
  service_and_category_listID: number
  Service_time: string
  Service_price: number
}

type AddressData = {
  addressesID: number
  address_title: string
  address_line_1: string
  address_line_2: string
  city: string
  state: string
  zip: string
  country: string
  address_priority: number
  instant_book: boolean
  address_public_status: boolean
  phone: string
}

export default new class PrivateDoctorDataService {
  async addingDoctorInfo(newDoctorObject: PersonalInfoType) {
    return await http.post("private-doctor-data/new-doctor", {newDoctorObject})
  }
  async fillDashboard() {
    return await http.get("/private-doctor-data/fetch-dashboard-data")
  }
  async fillPersonalData() {
    return await http.get("/private-doctor-data/fetch-personal-data")
  }
  async savePersonalData(personalInfo: PersonalInfoType) {
    return await http.post("/private-doctor-data/save-personal-data", {personalInfo})
  }
  async fillAccountDetails() {
    return await http.get("/private-doctor-data/fetch-account-details-data")
  }
  async saveDescriptionData(Description: string) {
    return await http.post("/private-doctor-data/save-description-data", {Description})
  }
  async addLanguage(languageID: number) {
    return await http.post("/private-doctor-data/add-language", {languageID})
  }
  async deleteLanguage(languageID: number) {
    return await http.delete(`/private-doctor-data/delete-language/${languageID}`)
  }
  async addSpecialty(specialtyID: number) {
    return await http.post("/private-doctor-data/add-specialty", {specialtyID: specialtyID})
  }
  async deleteSpecialty(specialtyID: number) {
    return await http.delete(`/private-doctor-data/delete-specialty/${specialtyID}`)
  }
  async addServicedPet(petID: number) {
    return await http.post("/private-doctor-data/add-serviced-pet", {petID: petID})
  }
  async deleteServicedPet(petID: number) {
    return await http.delete(`/private-doctor-data/delete-serviced-pet/${petID}`)
  }
  async savePublicAvailibility(PublicAvailibility: boolean) {
    return await http.post("/private-doctor-data/save-public-availibility-data", {PublicAvailibility})
  }
  async addPreVetEducationData(preVetEducationData: EducationData) {
    return await http.post("/private-doctor-data/add-pre-vet-education-data", {preVetEducationData})
  }
  async deletePreVetEducationData(preVetEducationID: number) {
    return await http.delete(`/private-doctor-data/delete-pre-vet-education-data/${preVetEducationID}`)
  }
  async addVetEducationData(vetEducationData: EducationData) {
    return await http.post("/private-doctor-data/add-vet-education-data", {vetEducationData})
  }
  async deleteVetEducationData(vetEducationID: number) {
    return await http.delete(`/private-doctor-data/delete-vet-education-data/${vetEducationID}`)
  }
  async addService(serviceObject: ServiceData) {
    return await http.post("/private-doctor-data/add-service", {serviceObject})
  }
  async updateService(serviceObject: ServiceData) {
    return await http.patch("/private-doctor-data/update-service", {serviceObject})
  }
  async deleteService(serviceID: number) {
    return await http.delete(`/private-doctor-data/delete-service/${serviceID}`)
  }
  async addAddressData(AddressData: AddressData, Times: AvailabilityDataType[]) {
    return await http.post("/private-doctor-data/add-address", {AddressData, Times})
  }
  async updateAddressData(AddressData: AddressData, Times: AvailabilityDataType[]) {
    return await http.post("/private-doctor-data/update-address", {AddressData, Times})
  }
  async deleteAddressData(addressID: number) {
    return await http.delete(`/private-doctor-data/delete-address/${addressID}`)
  }
}()
