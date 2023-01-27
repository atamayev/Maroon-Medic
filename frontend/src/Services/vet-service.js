import http from "../http-common"
// this is where all the api calls are coming from
export default new class VetDataService {
    async getAll() { // Don't think this function is currently being used. it's lumped in with find
        return await http.get('users/fetchUsers');
    }
    // returns attributes of a certain vet
    async getSingleVet(DoctorID) {
        return await http.get(`users/${DoctorID}`);
    }
    async find(query){
        return await http.get(`search/${query}`);
    }
    async addingDoctorInfo(firstName, lastName, gender, DOBmonth, DOBday, DOByear){
        return await http.post(`profile/new-vet`, {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            DOBmonth: DOBmonth,
            DOBday: DOBday, 
            DOByear: DOByear
        });
    }
    async logout(){
        return await http.get(`auth/logout`); //is with credentials true necessary?:
        //return await http.get(`auth/logout`, {withCredentials: true}); //is with credentials true necessary?:
    }
    async verify(accessToken){
        return await http.get(`/auth/verify`, {accessToken})
    }
}()
