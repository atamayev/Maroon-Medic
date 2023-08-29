import { Request, Response, NextFunction } from "express"
import { UUID_to_ID } from "../setup-and-security/UUID"
import Cookie from "./cookie-operations"

export default new class GetIDFromUUID {
	async doctor(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
		const doctorUUID = req.cookies.DoctorUUID
		let doctorId: number
		try {
			doctorId = await UUID_to_ID(doctorUUID)
			req.doctorId = doctorId
			next()
		} catch (error: unknown) {
			Cookie.clearAll(res, "Doctor")
			return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
		}
	}

	async patient(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
		const patientUUID = req.cookies.PatientUUID
		let patientId: number
		try {
			patientId = await UUID_to_ID(patientUUID)
			req.patientId = patientId
			next()
		} catch (error: unknown) {
			Cookie.clearAll(res, "Patient")
			return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
		}
	}
}()
