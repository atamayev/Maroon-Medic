import { useCallback } from "react"
import { handleDeleteLanguage, handleDeleteSpecialty } from "./delete"
import { handleAddLanguage, handleAddSpecialty, handleAddEducation } from "./add"
import { addPreVetEducation, addServicedPets, addVetEducation, deletePreVetEducation, deleteServicedPets, deleteVetEducation } from "./save-doctor-account-details"

export const useHandleDeleteLanguage = (spokenLanguages, setSpokenLanguages, setLanguagesConfirmation, doctorOrPatient) => {
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

export const useHandleAddLanguage = (spokenLanguages, setSpokenLanguages, listDetails, setLanguagesConfirmation, doctorOrPatient) => {
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

export const useHandleDeleteSpecialty = (doctorSpecialties, setDoctorSpecialties, setSpecialtiesConfirmation) => {
  return useCallback(
    (specialty) => {
      handleDeleteSpecialty(
        specialty,
        doctorSpecialties,
        setDoctorSpecialties,
        setSpecialtiesConfirmation
      )
    },
    [doctorSpecialties, setDoctorSpecialties, setSpecialtiesConfirmation]
  )
}

export const useHandleAddSpecialty = (doctorSpecialties, setDoctorSpecialties, setSelectedOrganization, listDetails, setSpecialtiesConfirmation) => {
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

export const useHandleCheckboxChange = (servicedPets, setServicedPets, setPetsConfirmation) => {
  return useCallback((event, pet) => {
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

export const useHandleDeletePreVetEducation = (preVetEducation, setPreVetEducation, setPreVetEducationConfirmation) => {
  return useCallback((PreVetEducation) => {
    deletePreVetEducation(
      PreVetEducation.pre_vet_education_mappingID,
      preVetEducation,
      setPreVetEducation,
      setPreVetEducationConfirmation
    )
  }, [preVetEducation, setPreVetEducation, setPreVetEducationConfirmation])
}

export const useHandleAddPreVetEducation = (
  selectedPreVetSchool, setSelectedPreVetSchool,
  selectedPreVetEducationType, setSelectedPreVetEducationType,
  timeState, setTimeState,
  selectedMajor, setSelectedMajor
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
  preVetEducation, setPreVetEducation,
  listDetails, setPreVetEducationConfirmation
) => {
  return useCallback((selectedEducationObj) => {
    addPreVetEducation(
      selectedEducationObj,
      preVetEducation,
      setPreVetEducation,
      listDetails,
      setPreVetEducationConfirmation
    )
  }, [preVetEducation, setPreVetEducation, listDetails, setPreVetEducationConfirmation])
}

export const useHandleDeleteVetEducation = (vetEducation, setVetEducation, setVetEducationConfirmation) => {
  return useCallback((VetEducation) => {
    deleteVetEducation(
      VetEducation.vet_education_mappingID,
      vetEducation,
      setVetEducation,
      setVetEducationConfirmation
    )
  }, [vetEducation, setVetEducation, setVetEducationConfirmation])
}

export const useHandleAddVetEducation = (
  selectedVetSchool, setSelectedVetSchool,
  selectedVetEducationType, setSelectedVetEducationType,
  timeState, setTimeState,
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
  vetEducation, setVetEducation,
  listDetails, setVetEducationConfirmation
) => {
  return useCallback((selectedEducationObj) => {
    addVetEducation(
      selectedEducationObj,
      vetEducation,
      setVetEducation,
      listDetails,
      setVetEducationConfirmation
    )
  }, [vetEducation, setVetEducation, listDetails, setVetEducationConfirmation])
}
