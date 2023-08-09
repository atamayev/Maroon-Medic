import { Request, Response, NextFunction } from "express"
import { UUID_to_ID } from "../setup-and-security/UUID"
import Cookie from "./cookie-operations"

export default new class GetIDFromUUID {
  async doctor(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    const DoctorUUID = req.cookies.DoctorUUID
    let DoctorID: number
    try {
      DoctorID = await UUID_to_ID(DoctorUUID)
      req.DoctorID = DoctorID
      next()
    } catch (error: unknown) {
      Cookie.clearAll(res, "Doctor")
      return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
    }
  }

  async patient(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    const PatientUUID = req.cookies.PatientUUID
    let PatientID: number
    try {
      PatientID = await UUID_to_ID(PatientUUID)
      req.PatientID = PatientID
      next()
    } catch (error: unknown) {
      Cookie.clearAll(res, "Patient")
      return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
    }
  }
}()
