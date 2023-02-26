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
    async addingDoctorInfo(firstName, lastName, gender, DOBmonth, DOBday, DOByear, DoctorID){
        return await http.post(`private-doctor-data/new-doctor`, {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            DOBmonth: DOBmonth,
            DOBday: DOBday, 
            DOByear: DOByear, 
            DoctorID: DoctorID
        });
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
    async login(username, password, login_type){
        return await http.post("/auth/login", {email: username, password: password, login_type: login_type}, 
        {withCredentials: true})
    }
    async register(username, password, register_type){
        return await http.post("/auth/register", {email: username, password: password, register_type: register_type}, 
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
