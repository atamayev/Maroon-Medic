import moment from "moment"
import { AxiosError } from "axios"
import PrivateDoctorDataService from "../../services/private-doctor-data-service"
import { shouldSaveDescription } from "../../utils/save-account-details"
import { invalidUserAction } from "../user-verification-snippets"
import {
  modifyDoctorLanguages,
  modifyServicesData,
  modifyDoctorSpecialties,
  modifyServicedPets,
  modifyAddressData
} from "./save-doctor-account-details-helpers"

export function addDoctorLanguages(
  languageID: number,
  newSpokenLanguages: LanguageItemType[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  setLanguagesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  return modifyDoctorLanguages(
    PrivateDoctorDataService.addLanguage,
    languageID,
    newSpokenLanguages,
    setSpokenLanguages,
    setLanguagesConfirmation
  )
}

export function deleteDoctorLanguages(
  languageID: number,
  newSpokenLanguages: LanguageItemType[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  setLanguagesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  return modifyDoctorLanguages(
    PrivateDoctorDataService.deleteLanguage,
    languageID,
    newSpokenLanguages,
    setSpokenLanguages,
    setLanguagesConfirmation
  )
}

export function addServices(
  newServiceObject: ServiceItemType,
  providedServices: ServiceItemType[],
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemType[]>>,
  setServicesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  return modifyServicesData(
    PrivateDoctorDataService.addService,
    newServiceObject,
    providedServices,
    setProvidedServices,
    setServicesConfirmation
  )
}

export function updateServices(
  newServiceObject: ServiceItemType,
  providedServices: ServiceItemType[],
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemType[]>>,
  setServicesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  return modifyServicesData(
    PrivateDoctorDataService.updateService,
    newServiceObject,
    providedServices,
    setProvidedServices,
    setServicesConfirmation
  )
}

export function deleteServices(
  serviceObject: ServiceItemType,
  providedServices: ServiceItemType[],
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemType[]>>,
  setServicesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>,
  setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemType[]>> | null,
) {
  return modifyServicesData(
    PrivateDoctorDataService.deleteService,
    serviceObject,
    providedServices,
    setProvidedServices,
    setServicesConfirmation,
    setSelectedServices
  )
}

export function addSpecialties(
  specialtyID: number,
  newDoctorSpecialties: SpecialtyItemType[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItemType[]>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
  setSpecialtiesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  return modifyDoctorSpecialties(
    PrivateDoctorDataService.addSpecialty,
    specialtyID,
    newDoctorSpecialties,
    setDoctorSpecialties,
    setSpecialtiesConfirmation, () => setSelectedOrganization("")
  )
}

export function deleteSpecialties(
  specialtyID: number,
  newDoctorSpecialties: SpecialtyItemType[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItemType[]>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
  setSpecialtiesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  return modifyDoctorSpecialties(
    PrivateDoctorDataService.deleteSpecialty,
    specialtyID,
    newDoctorSpecialties,
    setDoctorSpecialties,
    setSpecialtiesConfirmation, () => setSelectedOrganization("")
  )
}

export async function addPreVetEducation(
  preVetEducationObject: PreVetEducationItemType,
  preVetEducation: PreVetEducationItemType[],
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItemType[]>>,
  listDetails: ListDetailsType,
  setPreVetEducationConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  try {
    const mappedPreVetEducationObject = {
      School_ID: listDetails.preVetSchools
        .find(school => school.School_name === preVetEducationObject.School_name)?.pre_vet_school_listID || null,
      Major_ID: listDetails.majors.find(major => major.Major_name === preVetEducationObject.Major_name)?.major_listID || null,
      Education_type_ID: listDetails.preVetEducationTypes.find(
        educationType => educationType.Education_type === preVetEducationObject.Education_type)?.pre_vet_education_typeID || null,
      Start_date: moment(preVetEducationObject.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
      End_date: moment(preVetEducationObject.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
    }
    const response = await PrivateDoctorDataService.addPreVetEducationData(mappedPreVetEducationObject)
    if (response.status === 200) {
      preVetEducationObject.pre_vet_education_mappingID = response.data
      const newPreVetEducation = [...preVetEducation, preVetEducationObject]
      setPreVetEducation(newPreVetEducation)
      const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
      DoctorAccountDetails.preVetEducation = newPreVetEducation
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setPreVetEducationConfirmation({messageType: "saved"})
    } else {
      setPreVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
    else setPreVetEducationConfirmation({messageType: "problem"})
    return
  }
}

export async function deletePreVetEducation(
  preVetEducationObject: PreVetEducationItemType,
  preVetEducation: PreVetEducationItemType[],
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItemType[]>>,
  setPreVetEducationConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  try {
    const response = await PrivateDoctorDataService.deletePreVetEducationData(preVetEducationObject)
    if (response.status === 200) {
      const newPreVetEducation = preVetEducation.filter(object => object.pre_vet_education_mappingID !== preVetEducationObject)
      setPreVetEducation(newPreVetEducation)
      const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
      DoctorAccountDetails.preVetEducation = newPreVetEducation
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setPreVetEducationConfirmation({messageType: "saved"})
    } else {
      setPreVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
    else setPreVetEducationConfirmation({messageType: "problem"})
    return
  }
}

export async function addVetEducation(
  vetEducationObject: VetEducationItemType,
  vetEducation: VetEducationItemType[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItemType[]>>,
  listDetails: ListDetailsType,
  setVetEducationConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  try {
    const mappedVetEducationObject = {
      School_ID: listDetails.vetSchools.find(school => school.School_name === vetEducationObject.School_name)?.vet_school_listID || null,
      Education_type_ID: listDetails.vetEducationTypes.find(
        educationType => educationType.Education_type === vetEducationObject.Education_type)?.vet_education_typeID || null,
      Start_date: moment(vetEducationObject.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
      End_date: moment(vetEducationObject.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
    }
    const response = await PrivateDoctorDataService.addVetEducationData(mappedVetEducationObject)
    if (response.status === 200) {
      vetEducationObject.vet_education_mappingID = response.data
      const newVetEducation = [...vetEducation, vetEducationObject]
      setVetEducation(newVetEducation)
      const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
      DoctorAccountDetails.vetEducation = newVetEducation
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setVetEducationConfirmation({messageType: "saved"})
    } else {
      setVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
    else setVetEducationConfirmation({messageType: "problem"})
    return
  }
}

export async function deleteVetEducation(
  vetEducationObject: VetEducationItemType,
  vetEducation: VetEducationItemType[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItemType[]>>,
  setVetEducationConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  try {
    const response = await PrivateDoctorDataService.deleteVetEducationData(vetEducationObject)
    if (response.status === 200) {
      const newVetEducation = vetEducation.filter(object => object.vet_education_mappingID !== vetEducationObject)
      setVetEducation(newVetEducation)
      const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
      DoctorAccountDetails.vetEducation = newVetEducation
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setVetEducationConfirmation({ messageType: "saved" })
    } else {
      setVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
    else setVetEducationConfirmation({messageType: "problem"})
    return
  }
}

export function addLocation(
  address: DoctorAddressDataType,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressDataType[]>>,
  setAddressesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  return modifyAddressData(PrivateDoctorDataService.addAddressData, address, setAddresses, setAddressesConfirmation)
}

export function updateLocation(
  address: DoctorAddressDataType,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressDataType[]>>,
  setAddressesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  return modifyAddressData(PrivateDoctorDataService.updateAddressData, address, setAddresses, setAddressesConfirmation)
}

export function deleteLocation(
  address: DoctorAddressDataType,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressDataType[]>>,
  setAddressesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  return modifyAddressData(PrivateDoctorDataService.deleteAddressData, address, setAddresses, setAddressesConfirmation)
}


export async function saveDescription(
  description: string,
  setDescriptionConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
  const savedDescriptionData = DoctorAccountDetails.description

  const shouldSave = shouldSaveDescription(savedDescriptionData, description)

  if (!shouldSave) {
    setDescriptionConfirmation({messageType: "same"})
    return
  }

  try {
    const response = await PrivateDoctorDataService.saveDescriptionData(description)
    if (response.status === 200) {
      DoctorAccountDetails.description = description
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setDescriptionConfirmation({messageType: "saved"})
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
    else setDescriptionConfirmation({messageType: "problem"})
  }
}

export function addServicedPets(
  petID: number,
  newServicedPets: ServicedPetItemType[],
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItemType[]>>,
  setPetsConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  return modifyServicedPets(PrivateDoctorDataService.addServicedPet, petID, newServicedPets, setServicedPets, setPetsConfirmation)
}

export function deleteServicedPets(
  petID: number,
  newServicedPets: ServicedPetItemType[],
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItemType[]>>,
  setPetsConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  return modifyServicedPets(PrivateDoctorDataService.deleteServicedPet, petID, newServicedPets, setServicedPets, setPetsConfirmation)
}

export async function handlePublicAvailibilityToggle (
  value: boolean,
  setPubliclyAvailable: React.Dispatch<React.SetStateAction<boolean>>,
  setPubliclyAvailableConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
  try {
    const response = await PrivateDoctorDataService.savePublicAvailibility(value)
    if (response.status === 200) {
      setPubliclyAvailable(value)
      DoctorAccountDetails.publiclyAvailable = value
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setPubliclyAvailableConfirmation({messageType: "saved"})
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
    else setPubliclyAvailableConfirmation({messageType: "problem"})
  }
}
