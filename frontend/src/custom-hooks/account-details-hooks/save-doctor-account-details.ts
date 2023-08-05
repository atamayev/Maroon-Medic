import moment from "moment"
import PrivateDoctorDataService from "../../services/private-doctor-data-service"
import { shouldSaveDescription } from "../../utils/save-account-details"
import {
  modifyDoctorLanguages,
  modifyServicesData,
  modifyDoctorSpecialties,
  modifyServicedPets,
  modifyAddressData,
  deleteAddressData
} from "./save-doctor-account-details-helpers"
import { handle401AxiosErrorAndSetMessageType } from "src/utils/handle-errors"

export function addDoctorLanguages(
  languageID: number,
  newSpokenLanguages: LanguageItemType[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void
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
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void
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
  setServicesConfirmation: (conf: ConfirmationMessage) => void
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
  setServicesConfirmation: (conf: ConfirmationMessage) => void
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
  setServicesConfirmation: (conf: ConfirmationMessage) => void,
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
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
) {
  return modifyDoctorSpecialties(
    PrivateDoctorDataService.addSpecialty,
    specialtyID,
    newDoctorSpecialties,
    setDoctorSpecialties,
    setSpecialtiesConfirmation,
    () => setSelectedOrganization("")
  )
}

export function deleteSpecialties(
  specialtyID: number,
  newDoctorSpecialties: SpecialtyItemType[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItemType[]>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
) {
  return modifyDoctorSpecialties(
    PrivateDoctorDataService.deleteSpecialty,
    specialtyID,
    newDoctorSpecialties,
    setDoctorSpecialties,
    setSpecialtiesConfirmation,
    () => setSelectedOrganization("")
  )
}

export async function addPreVetEducation(
  preVetEducationObject: PreVetEducationItemType,
  preVetEducation: PreVetEducationItemType[],
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItemType[]>>,
  listDetails: DoctorListDetailsType,
  setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
) {
  try {
    const mappedPreVetEducationObject = {
      School_ID: listDetails.preVetSchools
        .find(school => school.School_name === preVetEducationObject.School_name)!.pre_vet_school_listID,
      Major_ID: listDetails.majors.find(major => major.Major_name === preVetEducationObject.Major_name)!.major_listID,
      Education_type_ID: listDetails.preVetEducationTypes.find(
        educationType => educationType.Education_type === preVetEducationObject.Education_type)!.pre_vet_education_typeID,
      Start_date: moment(preVetEducationObject.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
      End_date: moment(preVetEducationObject.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
    }
    const response = await PrivateDoctorDataService.addPreVetEducationData(mappedPreVetEducationObject)
    if (response.status === 200) {
      preVetEducationObject.pre_vet_education_mappingID = response.data
      const newPreVetEducation = [...preVetEducation, preVetEducationObject]
      setPreVetEducation(newPreVetEducation)
      const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") || "{}")
      DoctorAccountDetails.preVetEducation = newPreVetEducation
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setPreVetEducationConfirmation({messageType: "saved"})
    } else {
      setPreVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setPreVetEducationConfirmation)
  }
}

export async function deletePreVetEducation(
  preVetEducationMappingID: number,
  preVetEducation: PreVetEducationItemType[],
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItemType[]>>,
  setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
) {
  try {
    const response = await PrivateDoctorDataService.deletePreVetEducationData(preVetEducationMappingID)
    if (response.status === 200) {
      const newPreVetEducation = preVetEducation.filter(object => object.pre_vet_education_mappingID !== preVetEducationMappingID)
      setPreVetEducation(newPreVetEducation)
      const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") || "{}")
      DoctorAccountDetails.preVetEducation = newPreVetEducation
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setPreVetEducationConfirmation({messageType: "saved"})
    } else {
      setPreVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setPreVetEducationConfirmation)
  }
}

export async function addVetEducation(
  vetEducationObject: VetEducationItemType,
  vetEducation: VetEducationItemType[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItemType[]>>,
  listDetails: DoctorListDetailsType,
  setVetEducationConfirmation: (conf: ConfirmationMessage) => void
) {
  try {
    const mappedVetEducationObject = {
      School_ID: listDetails.vetSchools.find(school => school.School_name === vetEducationObject.School_name)!.vet_school_listID,
      Education_type_ID: listDetails.vetEducationTypes.find(
        educationType => educationType.Education_type === vetEducationObject.Education_type)!.vet_education_typeID,
      Start_date: moment(vetEducationObject.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
      End_date: moment(vetEducationObject.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
    }
    const response = await PrivateDoctorDataService.addVetEducationData(mappedVetEducationObject)
    if (response.status === 200) {
      vetEducationObject.vet_education_mappingID = response.data
      const newVetEducation = [...vetEducation, vetEducationObject]
      setVetEducation(newVetEducation)
      const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") || "{}")
      DoctorAccountDetails.vetEducation = newVetEducation
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setVetEducationConfirmation({messageType: "saved"})
    } else {
      setVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setVetEducationConfirmation)
  }
}

export async function deleteVetEducation(
  vetEducationMappingID: number,
  vetEducation: VetEducationItemType[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItemType[]>>,
  setVetEducationConfirmation: (conf: ConfirmationMessage) => void
) {
  try {
    const response = await PrivateDoctorDataService.deleteVetEducationData(vetEducationMappingID)
    if (response.status === 200) {
      const newVetEducation = vetEducation.filter(object => object.vet_education_mappingID !== vetEducationMappingID)
      setVetEducation(newVetEducation)
      const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") || "{}")
      DoctorAccountDetails.vetEducation = newVetEducation
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setVetEducationConfirmation({ messageType: "saved" })
    } else {
      setVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setVetEducationConfirmation)
  }
}

export function addLocation(
  address: DoctorAddressDataType,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressDataType[]>>,
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
) {
  return modifyAddressData(PrivateDoctorDataService.addAddressData, address, setAddresses, setAddressesConfirmation)
}

export function updateLocation(
  address: DoctorAddressDataType,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressDataType[]>>,
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
) {
  return modifyAddressData(PrivateDoctorDataService.updateAddressData, address, setAddresses, setAddressesConfirmation)
}

export function deleteLocation(
  address: number,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressDataType[]>>,
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
) {
  //Consider adding another modifyAddressData
  return deleteAddressData(address, setAddresses, setAddressesConfirmation)
}

export async function saveDescription(
  description: string,
  setDescriptionConfirmation: (conf: ConfirmationMessage) => void
) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") || "{}")
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
    handle401AxiosErrorAndSetMessageType(error, setDescriptionConfirmation)
  }
}

export function addServicedPets(
  petID: number,
  newServicedPets: ServicedPetItemType[],
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItemType[]>>,
  setPetsConfirmation: (conf: ConfirmationMessage) => void
) {
  return modifyServicedPets(PrivateDoctorDataService.addServicedPet, petID, newServicedPets, setServicedPets, setPetsConfirmation)
}

export function deleteServicedPets(
  petID: number,
  newServicedPets: ServicedPetItemType[],
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItemType[]>>,
  setPetsConfirmation: (conf: ConfirmationMessage) => void
) {
  return modifyServicedPets(PrivateDoctorDataService.deleteServicedPet, petID, newServicedPets, setServicedPets, setPetsConfirmation)
}

export async function handlePublicAvailibilityToggle (
  value: boolean,
  setPubliclyAvailable: React.Dispatch<React.SetStateAction<boolean>>,
  setPubliclyAvailableConfirmation: (conf: ConfirmationMessage) => void
) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") || "{}")
  try {
    const response = await PrivateDoctorDataService.savePublicAvailibility(value)
    if (response.status === 200) {
      setPubliclyAvailable(value)
      DoctorAccountDetails.publiclyAvailable = value
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setPubliclyAvailableConfirmation({messageType: "saved"})
    }
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setPubliclyAvailableConfirmation)
  }
}
