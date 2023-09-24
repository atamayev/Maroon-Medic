import { AxiosResponse } from "axios"
import http from "../http-common"

export default new class SearchDataService {
	async searchByQuery(query: string): Promise<AxiosResponse<DoctorData[]>> {
		return await http.get<DoctorData[]>(`search/s/${query}`)
	}
	async fetchAllUsers(): Promise<AxiosResponse<DoctorData[]>> {
		return await http.get<DoctorData[]>("search/fetch-all-users")
	}
}()
