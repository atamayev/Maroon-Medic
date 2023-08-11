import http from "../http-common"

class PublicDoctorDataService {
  async getSingleDoctor(DoctorID: number) {
    return await http.get(`public-doctor-data/${DoctorID}`)
  }
}

export default new PublicDoctorDataService()
