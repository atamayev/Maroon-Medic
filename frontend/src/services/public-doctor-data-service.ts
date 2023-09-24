import { AxiosResponse } from "axios"
import http from "../http-common"

export default new class PublicDoctorDataService {
	async getSingleDoctor(doctorId: number): Promise<AxiosResponse<PublicDoctorAccountDetails | ErrorResponse>> {
		return await http.get<PublicDoctorAccountDetails | ErrorResponse>(`public-doctor-data/${doctorId}`)
	}
}()
