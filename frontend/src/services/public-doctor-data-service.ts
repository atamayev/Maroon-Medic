import http from "../http-common"

export default new class PublicDoctorDataService {
  async getSingleDoctor(DoctorID: number) {
    return await http.get(`public-doctor-data/${DoctorID}`)
  }
}()
