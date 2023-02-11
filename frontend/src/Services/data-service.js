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
    async logout(type){
        console.log(type)
        return await http.post(`auth/logout`, {type: type});
    }
    async verify(AccessToken){
        return await http.get(`/auth/verify`, {AccessToken})
    }
    async login(username, password, login_type){
        return await http.post("/auth/login", {email: username, password: password, login_type: login_type}, 
        {withCredentials: true})
    }
    async register(username, password, register_type){
        return await http.post("/auth/register", {email: username, password: password, register_type: register_type}, 
        {withCredentials: true})
    }
    async UUIDtoID(UUID, type){//Takes the DoctorUUID and returns DoctorID - for entering data (new pt, doctor)
        return await http.post('/private-common-data/uuid-to-id', {UUID:UUID, type:type})
    }
    async fillDoctorDashboard(DoctorUUID){
        return await http.get('/private-doctor-data/dashboard-data', {DoctorUUID: DoctorUUID})
    }
    async fillPatientDashboard(PatientUUID){
        return await http.get('/private-patient-data/dashboard-data', {PatientUUID: PatientUUID})
    }
    async fillHeader(UUID, type){
        return await http.get('/private-common-data/header-data', {UUID: UUID, type: type})
    }
}();
