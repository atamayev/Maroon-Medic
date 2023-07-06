import http from "../http-common"

export default new class PublicDoctorDataService {
	async getSingleDoctor(DoctorID) {
		return await http.get(`public-doctor-data/${DoctorID}`);
	}
}();
