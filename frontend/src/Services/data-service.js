import http from "../http-common"
// this is where all the api calls are coming from
export default new class DataService {
    async getSingleDoctor(DoctorID) {
        return await http.get(`public-doctor-data/${DoctorID}`);
    }
    async find(query){
        console.log('query in VDS', query)
        return await http.get(`search/s/${query}`);
    }
    async fetchAllUsers(){
        return await http.get('search/fetchAllUsers');
    }
    async addingDoctorInfo(new_doctor_object){
        return await http.post(`private-doctor-data/new-doctor`, {new_doctor_object});
    }
    async newDoctorConfirmation(){
        return await http.get(`private-doctor-data/new-doctor-confirmation`);
    }
    async addingPatientInfo(new_patient_object){
        return await http.post(`private-patient-data/new-patient`, {new_patient_object});
    }
    async newPatientConfirmation(){
        return await http.get(`private-patient-data/new-patient-confirmation`);
    }
    async logout(){
        return await http.post('auth/logout');
    }
    async verify(){
        return await http.post('/auth/verify')
    }
    async login(login_information_object){
        return await http.post("/auth/login", {login_information_object}, 
        {withCredentials: true})
    }
    async register(register_information_object){
        return await http.post("/auth/register", {register_information_object}, 
        {withCredentials: true})
    }
    async fillDoctorDashboard(){
        return await http.get('/private-doctor-data/fetch-dashboard-data')
    }
    async fillPatientDashboard(){
        return await http.get('/private-patient-data/fetch-dashboard-data')
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
    async fillPatientPersonalData(){
        return await http.get('/private-patient-data/fetch-personal-data')
    }
    async fillLanguages(){
        return await http.get('/private-doctor-data/fetch-all-languages')
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

    // async savePatientPersonalData(personalInfo){
    //     return await http.post('/private-patient-data/save-personal-data', {personalInfo})
    // }
}();
