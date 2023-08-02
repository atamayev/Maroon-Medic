import { useCallback } from "react"
import { handleDeleteLanguage, handleDeleteSpecialty } from "./delete"
import { handleAddLanguage, handleAddSpecialty, handleAddEducation } from "./add"
import {
  addPreVetEducation,
  addServicedPets,
  addVetEducation,
  deletePreVetEducation,
  deleteServicedPets,
  deleteVetEducation
} from "./save-doctor-account-details"

export const useHandleDeleteLanguage = (
  spokenLanguages: LanguageItemType[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  setLanguagesConfirmation,
  doctorOrPatient
) => {
  return useCallback(
    (language) => {
      handleDeleteLanguage(
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
  spokenLanguages: LanguageItemType[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  listDetails,
  setLanguagesConfirmation,
  doctorOrPatient
) => {
  return useCallback((e) => {
    handleAddLanguage(
      e.target.value,
      spokenLanguages,
      setSpokenLanguages,
      listDetails,
      setLanguagesConfirmation,
      doctorOrPatient
    )
  }, [spokenLanguages, listDetails, setSpokenLanguages, setLanguagesConfirmation])
}

export const useHandleDeleteSpecialty = (
  doctorSpecialties: SpecialtyItemType[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItemType[]>>,
  setSpecialtiesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>
) => {
  return useCallback(
    (specialty: SpecialtyItemType) => {
      handleDeleteSpecialty(
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
  doctorSpecialties: SpecialtyItemType[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItemType[]>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
  listDetails: DoctorListDetailsType,
  setSpecialtiesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) => {
  return useCallback((e) => {
    handleAddSpecialty(
      e.target.value,
      doctorSpecialties,
      setDoctorSpecialties,
      setSelectedOrganization,
      listDetails,
      setSpecialtiesConfirmation
    )
  }, [doctorSpecialties, listDetails, setSelectedOrganization, setDoctorSpecialties, setSpecialtiesConfirmation])
}

export const useHandleCheckboxChange = (
  servicedPets: ServicedPetItemType[],
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItemType[]>>,
  setPetsConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) => {
  return useCallback((event: React.ChangeEvent<HTMLInputElement>, pet: ServicedPetItemType) => {
    if (event.target.checked) {
      const newServicedPets = [...servicedPets, pet]
      setServicedPets(newServicedPets)
      addServicedPets(pet.pet_listID, newServicedPets, setServicedPets, setPetsConfirmation)
    } else {
      const newServicedPets = servicedPets.filter(p => p.pet_listID !== pet.pet_listID)
      setServicedPets(newServicedPets)
      deleteServicedPets(pet.pet_listID, newServicedPets, setServicedPets, setPetsConfirmation)
    }
  }, [servicedPets, setServicedPets, setPetsConfirmation])
}

export const useHandleDeletePreVetEducation = (
  preVetEducation: PreVetEducationItemType[],
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItemType[]>>,
  setPreVetEducationConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) => {
  return useCallback((PreVetEducation: PreVetEducationItemType) => {
    deletePreVetEducation(
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
  timeState: TimeStateType,
  setTimeState: React.Dispatch<React.SetStateAction<TimeStateType>>,
  selectedMajor: string,
  setSelectedMajor: React.Dispatch<React.SetStateAction<string>>
) => {
  return useCallback(() => {
    return handleAddEducation(
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
  preVetEducation: PreVetEducationItemType[],
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItemType[]>>,
  listDetails: DoctorListDetailsType,
  setPreVetEducationConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) => {
  return useCallback((selectedEducationObj: PreVetEducationItemType) => {
    addPreVetEducation(
      selectedEducationObj,
      preVetEducation,
      setPreVetEducation,
      listDetails,
      setPreVetEducationConfirmation
    )
  }, [preVetEducation, setPreVetEducation, listDetails, setPreVetEducationConfirmation])
}

export const useHandleDeleteVetEducation = (
  vetEducation: VetEducationItemType[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItemType[]>>,
  setVetEducationConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) => {
  return useCallback((VetEducation: VetEducationItemType) => {
    deleteVetEducation(
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
  timeState: TimeStateType,
  setTimeState: React.Dispatch<React.SetStateAction<TimeStateType>>
) => {
  return useCallback(() => {
    return handleAddEducation(
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
  vetEducation: VetEducationItemType[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItemType[]>>,
  listDetails: DoctorListDetailsType,
  setVetEducationConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) => {
  return useCallback((selectedEducationObj: VetEducationItemType) => {
    addVetEducation(
      selectedEducationObj,
      vetEducation,
      setVetEducation,
      listDetails,
      setVetEducationConfirmation
    )
  }, [vetEducation, setVetEducation, listDetails, setVetEducationConfirmation])
}
