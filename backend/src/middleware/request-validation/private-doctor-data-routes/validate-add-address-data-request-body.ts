import { Request, Response, NextFunction } from "express"

export default function validateAddAddressDataRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { addressData } = req.body as { addressData?: PrivateDoctorAddressLessTimes }

	if (!addressData || typeof addressData !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid AddressData" })
	}

	const { timesData } = req.body as { timesData?: DoctorAvailability[] }

	if (!timesData || !Array.isArray(timesData)) {
		return res.status(400).json({ error: "Bad Request: Missing or invalid timesData" })
	}

	next()
}
