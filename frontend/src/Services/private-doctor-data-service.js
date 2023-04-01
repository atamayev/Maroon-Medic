import http from "../http-common"
// this is where all the api calls are coming from
export default new class PrivateDoctorDataService {
    async addingDoctorInfo(new_doctor_object){
        return await http.post(`private-doctor-data/new-doctor`, {new_doctor_object});
    }
    async newDoctorConfirmation(){
        return await http.get(`private-doctor-data/new-doctor-confirmation`);
    }
    async fillDashboard(){
        return await http.get('/private-doctor-data/fetch-dashboard-data')
    }
    async fillPersonalData(){
        return await http.get('/private-doctor-data/fetch-personal-data')
    }
    async savePersonalData(personalInfo){
        return await http.post('/private-doctor-data/save-personal-data', {personalInfo})
    }
    async fillAccountDetails(){
        return await http.get('/private-doctor-data/fetch-account-details-data')
    }
    async saveDescriptionData(Description){
        return await http.post('/private-doctor-data/save-description-data', {Description})
    }
    // async saveLanguages(Languages){
    //     return await http.post('/private-doctor-data/save-language-data', {Languages})
    // }
    // async saveSpecialties(Specialties){
    //     return await http.post('/private-doctor-data/save-specialty-data', {Specialties})
    // }
    // async saveInsurances(Insurances){
    //     return await http.post('/private-doctor-data/save-insurance-data', {Insurances})
    // }
    async saveGeneralData(Data, DataType){
        return await http.post('/private-doctor-data/save-general-data', {Data: Data, DataType: DataType})
    }
    async fillLists(){
        return await http.get('/private-doctor-data/fetch-all-lists')
    }
    async savePublicAvailibility(PublicAvailibility){
        return await http.post('/private-doctor-data/save-public-availibility-data', {PublicAvailibility})
    }
}();
