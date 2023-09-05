declare global {
	namespace Express {
		interface Request {
			doctorId: number
			patientId: number
			headers: {
				"uuid": string
				"user-type": "Doctor" | "Patient"
				"authorization": string
			}
			params: {
				languageId?: number
				serviceId?: number
				specialtyId?: number
				preVetEducationId?: number
				vetEducationId?: number
				addressId?: number
				servicedPetId?: number
				query?: string
			}
		}
	}
}

export {}
