import { AxiosResponse } from "axios"
import http from "../http-common"

export default new class PublicDoctorDataService {
	async getSingleDoctor(doctorId: number): Promise<AxiosResponse<PublicDoctorAccountDetails>> {
		return await http.get<PublicDoctorAccountDetails>(`public-doctor-data/${doctorId}`)
	}
}()
