import { AxiosResponse } from "axios"
import http from "../http-common"

export default new class AuthDataService {
	async logout(): Promise<AxiosResponse<EmptyResponse | RedirectResponse>> {
		return await http.post<EmptyResponse | RedirectResponse>("auth/logout")
	}
	async verify(): Promise<AxiosResponse<JWTResponse | RedirectResponse>> {
		return await http.post<JWTResponse | RedirectResponse>("/auth/verify")
	}
	async login(loginInformationObject: AuthCredentials): Promise<AxiosResponse<EmptyResponse | ErrorResponse>> {
		return await http.post<EmptyResponse | ErrorResponse>("/auth/login",
			{loginInformationObject},
			{withCredentials: true}
		)
	}
	async register(registerInformationObject: AuthCredentials): Promise<AxiosResponse<EmptyResponse | ErrorResponse>> {
		return await http.post<EmptyResponse | ErrorResponse>("/auth/register",
			{registerInformationObject},
			{withCredentials: true}
		)
	}
	async newDoctorConfirmation(): Promise<AxiosResponse<boolean>> {
		return await http.get<boolean>("/auth/new-doctor-confirmation")
	}
	async newPatientConfirmation(): Promise<AxiosResponse<boolean>> {
		return await http.get<boolean>("/auth/new-patient-confirmation")
	}
	async fetchLoginHistry(): Promise<AxiosResponse<LoginHistoryItem[] | RedirectResponse>> {
		return await http.get<LoginHistoryItem[] | RedirectResponse>("/auth/fetch-login-history")
	}
	async changePassword(changePasswordObject: ChangePasswordObject):
		Promise<AxiosResponse<EmptyResponse | ErrorResponse | RedirectResponse>> {
		return await http.post<EmptyResponse | ErrorResponse | RedirectResponse>("/auth/change-password",
			{changePasswordObject}
		)
	}
}()
