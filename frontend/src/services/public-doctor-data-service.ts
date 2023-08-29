import http from "../http-common"

class PublicDoctorDataService {
	async getSingleDoctor(doctorId: number) {
		return await http.get(`public-doctor-data/${doctorId}`)
	}
}

export default new PublicDoctorDataService()
