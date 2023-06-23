import http from "../http-common"

export default new class PrivateDoctorDataService {
    async addingDoctorInfo(newDoctorObject) {
        return await http.post(`private-doctor-data/new-doctor`, {newDoctorObject});
    }
    async newDoctorConfirmation() {
        return await http.get(`private-doctor-data/new-doctor-confirmation`);
    }
    async fillDashboard() {
        return await http.get('/private-doctor-data/fetch-dashboard-data')
    }
    async fillPersonalData() {
        return await http.get('/private-doctor-data/fetch-personal-data')
    }
    async savePersonalData(personalInfo) {
        return await http.post('/private-doctor-data/save-personal-data', {personalInfo})
    }
    async fillAccountDetails() {
        return await http.get('/private-doctor-data/fetch-account-details-data')
    }
    async saveDescriptionData(Description) {
        return await http.post('/private-doctor-data/save-description-data', {Description})
    }
    async saveGeneralData(Data, DataType, operationType) { // for languages, and specialties, pets
        return await http.post('/private-doctor-data/save-general-data', {Data: Data, DataType: DataType, operationType: operationType})
    }
    async fillLists() {
        return await http.get('/private-doctor-data/fetch-doctor-lists')
    }
    async savePublicAvailibility(PublicAvailibility) {
        return await http.post('/private-doctor-data/save-public-availibility-data', {PublicAvailibility})
    }
    async saveEducationData(EducationData, EducationType, operationType) {
        return await http.post('/private-doctor-data/save-education-data', {EducationData: EducationData, EducationType: EducationType, operationType: operationType})
    }
    async saveServiceData(ServicesData) {
        return await http.post('/private-doctor-data/save-services-data', {ServicesData: ServicesData})
    }
    async saveAddressData(AddressData, times) {
        return await http.post('/private-doctor-data/save-address-data', {AddressData: AddressData, Times: times})
    }
    async confirmAppointment(AppointmentID) {
        return await http.post('/private-doctor-data/confirm-appointment', {AppointmentID: AppointmentID})
    }
}();
