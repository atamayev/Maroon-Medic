import { Request, Response, NextFunction } from "express"
import { UUID_to_ID } from "../setup-and-security/UUID"
import Cookie from "../utils/cookie-operations"

export default new class GetIDFromUUID {
	async doctor(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
		try {
			const doctorUUID = req.headers.uuid as string
			const doctorId = await UUID_to_ID(doctorUUID)
			req.doctorId = doctorId
			next()
		} catch (error: unknown) {
			Cookie.clearAll(res)
			return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
		}
	}

	async patient(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
		try {
			const patientUUID = req.headers.uuid as string
			const patientId = await UUID_to_ID(patientUUID)
			req.patientId = patientId
			next()
		} catch (error: unknown) {
			Cookie.clearAll(res)
			return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
		}
	}
}()
