declare global {
  interface PatientDashboardData extends DashboardDataType {
    Doctor_FirstName: string
    Doctor_LastName: string
  }

  interface BasePetInfo {
    Name: string
    Gender: string
    DOB: string
    Pet: string
    Pet_type: string
    insuranceName: string
  }

  //This is the type for the pet data when it is being 'created' (not saved)
  type PetItemForCreation = BasePetInfo & {
    pet_listID: number
    insurance_listID: number
  }

  //This is the type for the pet data when it already saved
  type SavedPetItem = BasePetInfo & {
    pet_infoID: number
  }
}

export {}
