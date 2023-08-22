import { useCallback } from "react"
import deleteLanguage from "src/helper-functions/account-details/delete/delete-language"
import deleteSpecialty from "src/helper-functions/account-details/delete/delete-specialty"
import addLanguage from "src/helper-functions/account-details/add/add-language"
import addSpecialty from "src/helper-functions/account-details/add/add-sepcialty"
import addEducation from "src/helper-functions/account-details/add/add-education"
import {
  addPreVetEducation,
  addServicedPets,
  addVetEducation,
  deletePreVetEducation,
  deleteServicedPets,
  deleteVetEducation
} from "./save-doctor-account-details"

export const useHandleDeleteLanguage = (
  spokenLanguages: LanguageItem[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
  doctorOrPatient: doctorOrpatient
): ((language: LanguageItem) => void) => {
  return useCallback(
    async (language: LanguageItem) => {
      await deleteLanguage(
        language,
        spokenLanguages,
        setSpokenLanguages,
        setLanguagesConfirmation,
        doctorOrPatient
      )
    },
    [spokenLanguages, setSpokenLanguages, setLanguagesConfirmation]
  )
}

export const useHandleAddLanguage = (
  spokenLanguages: LanguageItem[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  listDetails: DoctorListDetails | PatientListDetails,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
  doctorOrPatient: doctorOrpatient
): (e: React.ChangeEvent<HTMLSelectElement>) => void => {
  return useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      await addLanguage(
        Number(e.target.value),
        spokenLanguages,
        setSpokenLanguages,
        listDetails,
        setLanguagesConfirmation,
        doctorOrPatient
      )
    }, [spokenLanguages, listDetails, setSpokenLanguages, setLanguagesConfirmation])
}

export const useHandleDeleteSpecialty = (
  doctorSpecialties: SpecialtyItem[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>
): ((specialty: SpecialtyItem) => void) => {
  return useCallback(
    async (specialty: SpecialtyItem) => {
      await deleteSpecialty(
        specialty,
        doctorSpecialties,
        setDoctorSpecialties,
        setSelectedOrganization,
        setSpecialtiesConfirmation
      )
    },
    [doctorSpecialties, setDoctorSpecialties, setSpecialtiesConfirmation]
  )
}

export const useHandleAddSpecialty = (
  doctorSpecialties: SpecialtyItem[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
  listDetails: DoctorListDetails,
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void> => {
  return useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await addSpecialty(
      Number(e.target.value),
      doctorSpecialties,
      setDoctorSpecialties,
      setSelectedOrganization,
      listDetails,
      setSpecialtiesConfirmation
    )
  }, [doctorSpecialties, listDetails, setSelectedOrganization, setDoctorSpecialties, setSpecialtiesConfirmation])
}

export const useHandleCheckboxChange = (
  servicedPets: ServicedPetItem[],
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
  setPetsConfirmation: (conf: ConfirmationMessage) => void
): (e: React.ChangeEvent<HTMLInputElement>, pet: ServicedPetItem) => void => {
  return useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, pet: ServicedPetItem) => {
      if (event.target.checked) {
        const newServicedPets = [...servicedPets, pet]
        setServicedPets(newServicedPets)
        await addServicedPets(pet.pet_listID, newServicedPets, setServicedPets, setPetsConfirmation)
      } else {
        const newServicedPets = servicedPets.filter(p => p.pet_listID !== pet.pet_listID)
        setServicedPets(newServicedPets)
        await deleteServicedPets(pet.pet_listID, newServicedPets, setServicedPets, setPetsConfirmation)
      }
    }, [servicedPets, setServicedPets, setPetsConfirmation])
}

export const useHandleDeletePreVetEducation = (
  preVetEducation: PreVetEducationItem[],
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
  setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): (PreVetEducation: PreVetEducationItem) => void => {
  return useCallback(
    async (PreVetEducation: PreVetEducationItem) => {
      await deletePreVetEducation(
        PreVetEducation.pre_vet_education_mappingID,
        preVetEducation,
        setPreVetEducation,
        setPreVetEducationConfirmation
      )
    }, [preVetEducation, setPreVetEducation, setPreVetEducationConfirmation])
}

export const useHandleAddPreVetEducation = (
  selectedPreVetSchool: string,
  setSelectedPreVetSchool: React.Dispatch<React.SetStateAction<string>>,
  selectedPreVetEducationType: string,
  setSelectedPreVetEducationType: React.Dispatch<React.SetStateAction<string>>,
  timeState: TimeState,
  setTimeState: React.Dispatch<React.SetStateAction<TimeState>>,
  selectedMajor: string,
  setSelectedMajor: React.Dispatch<React.SetStateAction<string>>
): () => GeneralEducationItem => {
  return useCallback(() => {
    return addEducation(
      selectedPreVetSchool, setSelectedPreVetSchool,
      selectedPreVetEducationType, setSelectedPreVetEducationType,
      timeState, setTimeState,
      selectedMajor, setSelectedMajor
    )
  }, [
    selectedPreVetSchool, setSelectedPreVetSchool,
    selectedPreVetEducationType, setSelectedPreVetEducationType,
    timeState, setTimeState,
    selectedMajor, setSelectedMajor
  ])
}

export const useSaveAddPreVetEducation = (
  preVetEducation: PreVetEducationItem[],
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
  listDetails: DoctorListDetails,
  setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((selectedEducationObj: PreVetEducationItem) => void) => {
  return useCallback(
    async (selectedEducationObj: PreVetEducationItem) => {
      await addPreVetEducation(
        selectedEducationObj,
        preVetEducation,
        setPreVetEducation,
        listDetails,
        setPreVetEducationConfirmation
      )
    }, [preVetEducation, setPreVetEducation, listDetails, setPreVetEducationConfirmation])
}

export const useHandleDeleteVetEducation = (
  vetEducation: VetEducationItem[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
  setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((VetEducation: VetEducationItem) => void) => {
  return useCallback(
    async (VetEducation: VetEducationItem) => {
      await deleteVetEducation(
        VetEducation.vet_education_mappingID,
        vetEducation,
        setVetEducation,
        setVetEducationConfirmation
      )
    }, [vetEducation, setVetEducation, setVetEducationConfirmation])
}

export const useHandleAddVetEducation = (
  selectedVetSchool: string,
  setSelectedVetSchool: React.Dispatch<React.SetStateAction<string>>,
  selectedVetEducationType: string,
  setSelectedVetEducationType: React.Dispatch<React.SetStateAction<string>>,
  timeState: TimeState,
  setTimeState: React.Dispatch<React.SetStateAction<TimeState>>
): () => GeneralEducationItem => {
  return useCallback(() => {
    return addEducation(
      selectedVetSchool, setSelectedVetSchool,
      selectedVetEducationType, setSelectedVetEducationType,
      timeState, setTimeState,
    )
  }, [
    selectedVetSchool, setSelectedVetSchool,
    selectedVetEducationType, setSelectedVetEducationType,
    timeState, setTimeState,
  ])
}

export const useSaveAddVetEducation = (
  vetEducation: VetEducationItem[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
  listDetails: DoctorListDetails,
  setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((selectedEducationObj: VetEducationItem) => void) => {
  return useCallback(
    async (selectedEducationObj: VetEducationItem) => {
      await addVetEducation(
        selectedEducationObj,
        vetEducation,
        setVetEducation,
        listDetails,
        setVetEducationConfirmation
      )
    }, [vetEducation, setVetEducation, listDetails, setVetEducationConfirmation])
}
