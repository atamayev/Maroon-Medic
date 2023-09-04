import { AxiosResponse } from "axios"
import http from "../http-common"

export default new class SearchDataService {
	async searchByQuery(query: string): Promise<AxiosResponse<DoctorPersonalData[]>> {
		return await http.get<DoctorPersonalData[]>(`search/s/${query}`)
	}
	async fetchAllUsers(): Promise<AxiosResponse<DoctorPersonalData[]>> {
		return await http.get<DoctorPersonalData[]>("search/fetch-all-users")
	}
}()
