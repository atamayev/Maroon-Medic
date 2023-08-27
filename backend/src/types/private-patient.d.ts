declare global {
  interface PatientDashboardData extends DashboardDataType {
    Doctor_FirstName: string
    Doctor_LastName: string
  }

  interface PatientAccountDetails {
    languages: LanguageItem[]
  }

  interface PetDetails {
    name: string
    gender: string
    dateOfBirth: MysqlTimestamp
    pet_listID: number
  }

  interface CompletePetInfo {
    name: string
    gender: string
    dateOfBirth: string
    pet: string
    petType: string
    pet_infoID: number
    insuranceName: string
  }
}

export {}
