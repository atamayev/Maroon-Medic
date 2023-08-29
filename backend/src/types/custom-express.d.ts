declare global {
  namespace Express {
    interface Request {
      doctorId: number
      patientId: number
      cookies: {
        DoctorUUID?: string
        PatientUUID?: string
        DoctorAccessToken?: string
        PatientAccessToken?: string
        DoctorNewUser?: string
        PatientNewUser?: string
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
