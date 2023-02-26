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
    async addingDoctorInfo(new_doctor_object, DoctorID){
        return await http.post(`private-doctor-data/new-doctor`, {new_doctor_object, DoctorID});
    }
    async addingPatientInfo(firstName, lastName, gender, DOBmonth, DOBday, DOByear, PatientID){
        return await http.post(`private-patient-data/new-patient`, {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            DOBmonth: DOBmonth,
            DOBday: DOBday, 
            DOByear: DOByear, 
            PatientID: PatientID
        });
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
    async UUIDtoID(){//Takes the UUID and returns ID - for entering data (new pt, doctor)
        return await http.post('/common-data/uuid-to-id')
    }
    async fillDoctorDashboard(){
        return await http.get('/private-doctor-data/dashboard-data')
    }
    async fillPatientDashboard(){
        return await http.get('/private-patient-data/dashboard-data')
    }
    async fillDoctorPersonalData(){
        return await http.get('/private-doctor-data/personal-data')
    }
    async saveDoctorPersonalData(personalInfo){
        return await http.post('/private-doctor-data/save-personal-data', {personalInfo})
    }
}();
