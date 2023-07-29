import http from "../http-common"

interface LoginAndRegistrationInformation {
  email: string
  password: string
  loginType?: "Doctor" | "Patient"
  registrationType?: "Doctor" | "Patient"
}

interface ChangePasswordObject {
  userType: "Doctor" | "Patient"
  currentPassword: string
  newPassword: string
  newConfirmPassword: string
}

export default new class AuthDataService {
  async logout() {
    return await http.post("auth/logout")
  }
  async verify() {
    return await http.post("/auth/verify")
  }
  async login(loginInformationObject: LoginAndRegistrationInformation) {
    return await http.post("/auth/login", {loginInformationObject},
      {withCredentials: true})
  }
  async register(registerInformationObject: LoginAndRegistrationInformation) {
    return await http.post("/auth/register", {registerInformationObject},
      {withCredentials: true})
  }
  async newDoctorConfirmation() {
    return await http.get("/auth/new-doctor-confirmation")
  }
  async newPatientConfirmation() {
    return await http.get("/auth/new-patient-confirmation")
  }
  async fetchLoginHistry() {
    return await http.get("/auth/fetch-login-history")
  }
  async changePassword(changePasswordObject: ChangePasswordObject) {
    return await http.post("/auth/change-password", {changePasswordObject})
  }
}()
