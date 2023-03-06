import http from "../http-common"
// this is where all the api calls are coming from
export default new class PrivateDoctorDataService {
    async addingDoctorInfo(new_doctor_object){
        return await http.post(`private-doctor-data/new-doctor`, {new_doctor_object});
    }
    async newDoctorConfirmation(){
        return await http.get(`private-doctor-data/new-doctor-confirmation`);
    }
    async fillDoctorDashboard(){
        return await http.get('/private-doctor-data/fetch-dashboard-data')
    }
    async fillDoctorPersonalData(){
        return await http.get('/private-doctor-data/fetch-personal-data')
    }
    async saveDoctorPersonalData(personalInfo){
        return await http.post('/private-doctor-data/save-personal-data', {personalInfo})
    }
    async fillDoctorAccountDetails(){
        return await http.get('/private-doctor-data/fetch-account-details-data')
    }
    async saveDoctorDescriptionData(Description){
        return await http.post('/private-doctor-data/save-description-data', {Description})
    }
    async fillLanguages(){
        return await http.get('/private-doctor-data/fetch-all-languages')
    }
    async saveLanguages(Languages){
        return await http.post('/private-doctor-data/save-language-data', {Languages})
    }
    async fillSpecialties(){
        return await http.get('/private-doctor-data/fetch-all-specialties')
    }
    async fillServicesAndCategories(){
        return await http.get('/private-doctor-data/fetch-all-services-and-categories')
    }
    async fillSchools(){
        return await http.get('/private-doctor-data/fetch-all-schools')
    }
    async fillMajors(){
        return await http.get('/private-doctor-data/fetch-all-majors')
    }
    async fillInsurances(){
        return await http.get('/private-doctor-data/fetch-all-insurances')
    }
    async fillEducationTypes(){
        return await http.get('/private-doctor-data/fetch-all-education-types')
    }
}();
