declare namespace Express {
  export interface Request {
    DoctorID?: number; // Use the appropriate type here
    PatientID?: number; // Use the appropriate type here
    cookies?: {
      DoctorUUID?: string; // And here
      PatientUUID?: string; // And here
      // You can define other cookies here as well
      // [key: string]: string;
    }
  }
}
