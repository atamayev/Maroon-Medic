import { UUID_to_ID } from "../setup-and-security/UUID.js"
import { clearCookies } from "./cookie-operations.js"

export default new class GetIDFromUUID {
  async getDoctorIDFromUUID(req, res, next) {
    const DoctorUUID = req.cookies.DoctorUUID
    let DoctorID
    try {
      DoctorID = await UUID_to_ID(DoctorUUID)
      req.DoctorID = DoctorID // attach DoctorID to the request object
      next()
    } catch (error) {
      console.log("error",error)
      clearCookies(res, "Doctor")
      return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
    }
  }

  async getPatientIDFromUUID(req, res, next) {
    const PatientUUID = req.cookies.PatientUUID
    let PatientID
    try {
      PatientID = await UUID_to_ID(PatientUUID)
      req.PatientID = PatientID // attach PatientID to the request object
      next()
    } catch (error) {
      clearCookies(res, "Patient")
      return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
    }
  }
}()
