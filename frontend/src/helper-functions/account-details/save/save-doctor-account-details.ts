import moment from "moment"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import shouldSaveDescription from "src/utils/save-account-details"
import {
  modifyDoctorLanguages,
  modifyServicesData,
  modifyDoctorSpecialties,
  modifyServicedPets,
  modifyAddressData,
  deleteAddressData
} from "./save-doctor-account-details-helpers"
import { handle401AxiosErrorAndSetMessageType } from "src/utils/handle-errors"

export async function addDoctorLanguages(
  languageID: number,
  newSpokenLanguages: LanguageItem[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyDoctorLanguages(
    PrivateDoctorDataService.addLanguage,
    languageID,
    newSpokenLanguages,
    setSpokenLanguages,
    setLanguagesConfirmation
  )
}

export async function deleteDoctorLanguages(
  languageID: number,
  newSpokenLanguages: LanguageItem[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyDoctorLanguages(
    PrivateDoctorDataService.deleteLanguage,
    languageID,
    newSpokenLanguages,
    setSpokenLanguages,
    setLanguagesConfirmation
  )
}

export async function addServices(
  newServiceObject: ServiceItem,
  providedServices: ServiceItem[],
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>,
  setServicesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyServicesData(
    PrivateDoctorDataService.addService,
    newServiceObject,
    providedServices,
    setProvidedServices,
    setServicesConfirmation
  )
}

export async function updateServices(
  newServiceObject: ServiceItem,
  providedServices: ServiceItem[],
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>,
  setServicesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyServicesData(
    PrivateDoctorDataService.updateService,
    newServiceObject,
    providedServices,
    setProvidedServices,
    setServicesConfirmation
  )
}

export async function deleteServices(
  serviceObject: ServiceItem,
  providedServices: ServiceItem[],
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>,
  setServicesConfirmation: (conf: ConfirmationMessage) => void,
  setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>> | null,
): Promise<void> {
  return await modifyServicesData(
    PrivateDoctorDataService.deleteService,
    serviceObject,
    providedServices,
    setProvidedServices,
    setServicesConfirmation,
    setSelectedServices
  )
}

export async function addSpecialties(
  specialtyID: number,
  newDoctorSpecialties: SpecialtyItem[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyDoctorSpecialties(
    PrivateDoctorDataService.addSpecialty,
    specialtyID,
    newDoctorSpecialties,
    setDoctorSpecialties,
    setSpecialtiesConfirmation,
    () => setSelectedOrganization("")
  )
}

export async function deleteSpecialties(
  specialtyID: number,
  newDoctorSpecialties: SpecialtyItem[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyDoctorSpecialties(
    PrivateDoctorDataService.deleteSpecialty,
    specialtyID,
    newDoctorSpecialties,
    setDoctorSpecialties,
    setSpecialtiesConfirmation,
    () => setSelectedOrganization("")
  )
}

export async function addPreVetEducation(
  preVetGeneralEducationItem: PreVetEducationItem,
  preVetEducation: PreVetEducationItem[],
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
  listDetails: DoctorListDetails,
  setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  try {
    const mappedPreVetGeneralEducationItem = {
      School_ID: listDetails.preVetSchools
        .find(school => school.School_name === preVetGeneralEducationItem.School_name)!.pre_vet_school_listID,
      Major_ID: listDetails.majors.find(major => major.Major_name === preVetGeneralEducationItem.Major_name)!.major_listID,
      Education_type_ID: listDetails.preVetEducationTypes.find(
        educationType => educationType.Education_type === preVetGeneralEducationItem.Education_type)!.pre_vet_education_typeID,
      Start_date: moment(preVetGeneralEducationItem.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
      End_date: moment(preVetGeneralEducationItem.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
    }
    const response = await PrivateDoctorDataService.addPreVetEducationData(mappedPreVetGeneralEducationItem)
    if (response.status === 200) {
      preVetGeneralEducationItem.pre_vet_education_mappingID = response.data
      const newPreVetEducation = [...preVetEducation, preVetGeneralEducationItem]
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
  preVetEducation: PreVetEducationItem[],
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
  setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
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
  vetGeneralEducationItem: VetEducationItem,
  vetEducation: VetEducationItem[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
  listDetails: DoctorListDetails,
  setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  try {
    const mappedVetGeneralEducationItem = {
      School_ID: listDetails.vetSchools.find(school => school.School_name === vetGeneralEducationItem.School_name)!.vet_school_listID,
      Education_type_ID: listDetails.vetEducationTypes.find(
        educationType => educationType.Education_type === vetGeneralEducationItem.Education_type)!.vet_education_typeID,
      Start_date: moment(vetGeneralEducationItem.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
      End_date: moment(vetGeneralEducationItem.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
    }
    const response = await PrivateDoctorDataService.addVetEducationData(mappedVetGeneralEducationItem)
    if (response.status === 200) {
      vetGeneralEducationItem.vet_education_mappingID = response.data
      const newVetEducation = [...vetEducation, vetGeneralEducationItem]
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
  vetEducation: VetEducationItem[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
  setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
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

export async function addLocation(
  address: DoctorAddressData,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyAddressData(PrivateDoctorDataService.addAddressData, address, setAddresses, setAddressesConfirmation)
}

export async function updateLocation(
  address: DoctorAddressData,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyAddressData(PrivateDoctorDataService.updateAddressData, address, setAddresses, setAddressesConfirmation)
}

export async function deleteLocation(
  address: number,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  //Consider adding another modifyAddressData
  return await deleteAddressData(address, setAddresses, setAddressesConfirmation)
}

export async function saveDescription(
  description: string,
  setDescriptionConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
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

export async function addServicedPets(
  petID: number,
  newServicedPets: ServicedPetItem[],
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
  setPetsConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyServicedPets(PrivateDoctorDataService.addServicedPet, petID, newServicedPets, setServicedPets, setPetsConfirmation)
}

export async function deleteServicedPets(
  petID: number,
  newServicedPets: ServicedPetItem[],
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
  setPetsConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyServicedPets(PrivateDoctorDataService.deleteServicedPet, petID, newServicedPets, setServicedPets, setPetsConfirmation)
}

export async function handlePublicAvailibilityToggle (
  value: boolean,
  setPubliclyAvailable: React.Dispatch<React.SetStateAction<boolean>>,
  setPubliclyAvailableConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
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
