import { Request } from "express";

export interface MaroonDoctorRequest extends Request {
  DoctorID: number
  cookies: {
    DoctorUUID: string
    DoctorAccessToken: string
    DoctorNewUser?: string
  }
  params: {
    languageID?: number
    serviceID?: number
    specialtyID?: number
    preVetEducationID?: number
    vetEducationID?: number
    addressID?: number
    servicedPetID?: number
  }
}

export interface MaroonPatientRequest extends Request {
  PatientID: number
  cookies: {
    PatientUUID: string
    PatientAccessToken: string
    PatientNewUser: string
  }
}

export interface MaroonAmbiguousRequest extends Request {
  PatientID?: number
  DoctorID?: number
  cookies: {
    DoctorUUID?: string
    PatientUUID?: string
    DoctorNewUser?: string
    PatientNewUser?: string
  }
  params: {
    id?: number
    query: string
  }
}
