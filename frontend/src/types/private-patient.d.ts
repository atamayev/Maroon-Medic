declare global {
  interface PatientDashboardData extends DashboardDataType {
    Doctor_FirstName: string
    Doctor_LastName: string
  }

  interface BasePetInfo {
    name: string
    gender: string
    dateOfBirth: string
    pet: string
    petType: string
    insuranceName: string
  }

  //This is the type for the pet data when it is being 'created' (not saved)
  type PetItemForCreation = BasePetInfo & {
    petListId: number
    insurance_listID: number
  }

  //This is the type for the pet data when it already saved
  type SavedPetItem = BasePetInfo & {
    pet_infoID: number
  }
}

export {}
