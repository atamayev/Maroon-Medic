declare global {
  interface PatientDashboardDataType extends DashboardDataType {
    Doctor_FirstName: string
    Doctor_LastName: string
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
