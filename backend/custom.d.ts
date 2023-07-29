declare global {
  namespace Express {
    interface Request {
      DoctorID: number;
      PatientID: number;
      cookies: {
        DoctorUUID?: string;
        PatientUUID?: string;
        DoctorAccessToken?: string;
        PatientAccessToken?: string;
        DoctorNewUser?: string;
        PatientNewUser?: string;
      };
      params: {
        languageID?: number;
        serviceID?: number;
        specialtyID?: number;
        preVetEducationID?: number;
        vetEducationID?: number;
        addressID?: number;
        servicedPetID?: number;
        query?: string;
      };
    }
  }
}

export {}
