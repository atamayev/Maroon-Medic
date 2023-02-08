import http from "../http-common"
// this is where all the api calls are coming from
export default new class DataService {
    async getSingleDoctor(DoctorID) {
        return await http.get(`public-doctor-data/${DoctorID}`);
    }
    async find(query){
        console.log('query in VDS', query)
        return await http.get(`search/${query}`);
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
    async logout(){
        return await http.get(`auth/logout`);
    }
    async verify(DoctorAccessToken){
        return await http.get(`/auth/verify`, {DoctorAccessToken})
    }
    async login(username, password, login_type){
        return await http.post("/auth/login", {email: username, password: password, login_type: login_type}, 
        {withCredentials: true})
    }
    async register(username, password, register_type){
        return await http.post("/auth/register", {email: username, password: password, register_type: register_type}, 
        {withCredentials: true})
    }
    async DoctorUUIDtoDoctorID(DoctorUUID){//Takes the DoctorUUID and returns DoctorID - for entering data
        return await http.post('/public-doctor-data/DoctorUUID-to-doctorid', {DoctorUUID})
    }
    async fillDashboard(DoctorUUID){
        return await http.get('/private-doctor-data/dashboard-data', {DoctorUUID: DoctorUUID})
    }
}();
