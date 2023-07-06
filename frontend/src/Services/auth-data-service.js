import http from "../http-common"

export default new class AuthDataService {
	async logout() {
		return await http.post('auth/logout');
	}
	async verify() {
		return await http.post('/auth/verify')
	}
	async login(loginInformationObject) {
		return await http.post("/auth/login", {loginInformationObject},
		{withCredentials: true})
	}
	async register(registerInformationObject) {
		return await http.post("/auth/register", {registerInformationObject},
		{withCredentials: true})
	}
	async fetchLoginHistry() {
		return await http.get('/auth/fetch-login-history')
	}
	async changePassword(changePasswordObject) {
		return await http.post('/auth/change-password', {changePasswordObject})
	}
}();
