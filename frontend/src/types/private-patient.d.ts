declare global {
  interface PatientDashboardDataType extends DashboardDataType {
    Doctor_FirstName: string
    Doctor_LastName: string
  }

  interface BasePetItem {
    Name: string
    Gender: string
    DOB: string
    Pet: string
    Pet_type: string
    insuranceName: string
  }

  //This is the type for the pet data when it is being 'created' (not saved)
  type PetItemType = BasePetItem & {
    pet_listID: number
    insurance_listID: number
  }

  //This is the type for the pet data when it already saved
  type PetItemTypeWithID = BasePetItem & {
    pet_infoID: number
  }
}

export {}
