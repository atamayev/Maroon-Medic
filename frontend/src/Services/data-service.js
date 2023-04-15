import http from "../http-common"
// this is where all the api calls are coming from
export default new class DataService {
    async getSingleDoctor(DoctorID) {
        return await http.get(`public-doctor-data/${DoctorID}`);
    }
    async find(query){
        return await http.get(`search/s/${query}`);
    }
    async fetchAllUsers(){
        return await http.get('search/fetchAllUsers');
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
    async fillPatientDashboard(){
        return await http.get('/private-patient-data/fetch-dashboard-data')
    }   
    async fillPatientPersonalData(){
        return await http.get('/private-patient-data/fetch-personal-data')
    }
    //UNTESTED:
    // async savePatientPersonalData(personalInfo){
    //     return await http.post('/private-patient-data/save-personal-data', {personalInfo})
    // }
}();
