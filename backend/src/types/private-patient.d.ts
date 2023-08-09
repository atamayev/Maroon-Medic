declare global {
  interface PatientDashboardData extends DashboardDataType {
    Doctor_FirstName: string
    Doctor_LastName: string
  }

  interface PatientAccountDetails {
    languages: LanguageItem[]
  }

  interface PetDetails {
    Name: string
    Gender: string
    DOB: MysqlTimestamp
    pet_listID: number
  }

  interface CompletePetInfo {
    Name: string
    Gender: string
    DOB: string
    Pet: string
    Pet_type: string
    pet_infoID: number
    insuranceName: string
  }
}

export {}
