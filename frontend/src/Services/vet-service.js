import http from "../http-common"
// this is where all the api calls are coming from
export default new class VetDataService {
    // async getAll() { // Don't think this function is currently being used. it's lumped in with find. Might need to bring it back to solve double query problem
    //     return await http.get('users/fetchUsers');
    // }
    async getSingleVet(DoctorID) {
        return await http.get(`users/${DoctorID}`);
    }
    async find(query){
        return await http.get(`search/${query}`);
    }
    async addingDoctorInfo(firstName, lastName, gender, DOBmonth, DOBday, DOByear, DoctorID){
        return await http.post(`profile/new-vet`, {
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
    // async getProprietaryHomePageData(cookies){
    //     return await http.post('/users/proprietary-home-page-data', {cookies})
    // }
    async DoctorUUIDtoDoctorID(DoctorUUID){//Takes the DoctorUUID and returns DoctorID
        return await http.post('/users/DoctorUUID-to-doctorid', {DoctorUUID})
    }
    async fillDashboard(DoctorUUID){
        return await http.get('/profile/dashboard-data', {DoctorUUID: DoctorUUID})
    }
    // async fillHeader(DoctorUUID){
    //     return await http.get('/profile/header-data', {DoctorUUID: DoctorUUID})
    // }
}();
