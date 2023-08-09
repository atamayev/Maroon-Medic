declare global {
  interface PatientDashboardDataType extends DashboardDataType {
    Doctor_FirstName: string
    Doctor_LastName: string
  }

  interface PatientAccountDetails {
    languages: LanguageItemType[]
  }

  interface PetPersonalInfo {
    Name: string
    Gender: string
    DOB: MysqlTimestamp
    pet_listID: number
  }

  type PetItemType = {
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
