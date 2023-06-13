import http from "../http-common"

export default new class AuthDataService {
    async logout() {
        return await http.post('auth/logout');
    }
    async verify() {
        return await http.post('/auth/verify')
    }
    async login(login_information_object) {
        return await http.post("/auth/login", {login_information_object}, 
        {withCredentials: true})
    }
    async register(register_information_object) {
        return await http.post("/auth/register", {register_information_object}, 
        {withCredentials: true})
    }
    async fetchLoginHistry() {
        return await http.get('/auth/fetch-login-history')
    }
}();
