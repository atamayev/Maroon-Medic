import { shouldSaveServices, shouldSaveDescription, shouldSaveLocation } from "../../utils/save-account-details"
import PrivateDoctorDataService from "../../services/private-doctor-data-service"
import { invalidUserAction } from "../user-verification-snippets"
import { addSavePreVetEducation, deleteSavePreVetEducation, addSaveVetEducation, deleteSaveVetEducation } from "./save-doctor-helper-functions"

export async function saveDoctorLanguages(languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation, operationType) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
  let response
  try {
    response = await PrivateDoctorDataService.saveGeneralData(languageID, "Language", operationType)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setLanguagesConfirmation({messageType: "problem"})
    return
  }
  if (response.status === 200) {
    setSpokenLanguages(newSpokenLanguages)
    DoctorAccountDetails.languages = newSpokenLanguages
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
    setLanguagesConfirmation({messageType: "saved"})
  } else {
    setLanguagesConfirmation({messageType: "problem"})
  }
}

function createServiceKey(service) {
  return `${service.service_and_category_listID}-${service.Service_price}-${service.Service_time}`
}

export async function saveServices(providedServices, setServicesConfirmation) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
  const savedServices = DoctorAccountDetails?.services || []
  const savedServiceKeys = savedServices.map(createServiceKey).sort()
  const serviceKeys = providedServices.map(createServiceKey).sort()
  const shouldSave = shouldSaveServices(savedServiceKeys, serviceKeys)

  if (!shouldSave) {
    setServicesConfirmation({messageType: "same"})
    return
  }

  const updatedServices = providedServices.map(service => {
    // eslint-disable-next-line no-unused-vars
    const { Service_name, Category_name, ...rest } = service
    return rest
  })

  try {
    const response = await PrivateDoctorDataService.saveServiceData(updatedServices)
    if (response.status === 200) {
      DoctorAccountDetails.services = providedServices
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setServicesConfirmation({messageType: "saved"})
    }
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setServicesConfirmation({messageType: "problem"})
  }
}


export async function saveSpecialies(specialtyID, newDoctorSpecialties, setDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation, operationType) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
  let response
  try {
    response = await PrivateDoctorDataService.saveGeneralData(specialtyID, "Specialty", operationType)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setSpecialtiesConfirmation({messageType: "problem"})
    return
  }
  if (response.status === 200) {
    setDoctorSpecialties(newDoctorSpecialties)
    DoctorAccountDetails.specialties = newDoctorSpecialties
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
    setSpecialtiesConfirmation({messageType: "saved"})
  } else {
    setSpecialtiesConfirmation({messageType: "problem"})
    return
  }
  if (operationType === "add") setSelectedOrganization("")
}

export async function savePreVetEducation(preVetEducationObject, preVetEducation, setPreVetEducation, listDetails, setPreVetEducationConfirmation, operationType) {
  let newPreVetEducation
  if (operationType === "delete") {
    newPreVetEducation = await deleteSavePreVetEducation(preVetEducationObject, preVetEducation, setPreVetEducation, setPreVetEducationConfirmation, operationType)
  } else if (operationType === "add") {
    newPreVetEducation = await addSavePreVetEducation(preVetEducationObject, preVetEducation, setPreVetEducation, listDetails, setPreVetEducationConfirmation, operationType)
  }
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
  DoctorAccountDetails.preVetEducation = newPreVetEducation
  sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
  setPreVetEducationConfirmation({messageType: "saved"})
}

export async function saveVetEducation(vetEducationObject, vetEducation, setVetEducation, listDetails, setVetEducationConfirmation, operationType) {
  let newVetEducation
  if (operationType === "delete") {
    newVetEducation = await deleteSaveVetEducation(vetEducationObject, vetEducation, setVetEducation, setVetEducationConfirmation, operationType)
  } else if (operationType === "add") {
    newVetEducation = await addSaveVetEducation(vetEducationObject, vetEducation, setVetEducation, listDetails, setVetEducationConfirmation, operationType)
  }
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
  DoctorAccountDetails.vetEducation = newVetEducation
  sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
  setVetEducationConfirmation({ messageType: "saved" })
}

export async function saveLocation(addresses, setAddresses, setAddressesConfirmation) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
  const savedLocationData = DoctorAccountDetails?.addressData
  const savedTimes = savedLocationData.map(location => location.times)
  // eslint-disable-next-line no-unused-vars
  const savedAddresses = savedLocationData.map(({ times, ...rest }) => rest)
  const newTimes = addresses.map(location => location.times)
  // eslint-disable-next-line no-unused-vars
  const newAddresses = addresses.map(({ times, ...rest }) => rest)

  const shouldSave = shouldSaveLocation(savedLocationData, addresses, newAddresses, savedAddresses, newTimes, savedTimes)

  if (!shouldSave) {
    setAddressesConfirmation({messageType: "same"})
    return
  }

  try {
    const response = await PrivateDoctorDataService.saveAddressData(newAddresses, newTimes)
    if (response.status === 200) {
      const newAddressData = response.data
      newAddressData.sort((a, b) => a.address_priority - b.address_priority)
      for (let i = 0; i < newAddressData.length; i++) {
        newAddressData[i]["times"] = newTimes[i]
      }
      DoctorAccountDetails.addressData = newAddressData
      setAddresses(newAddressData)
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setAddressesConfirmation({messageType: "saved"})
    }
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setAddressesConfirmation({messageType: "problem"})
  }
}

export async function saveDescription(description, setDescriptionConfirmation) {
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
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setDescriptionConfirmation({messageType: "problem"})
  }
}

export async function savePets(petID, newServicedPets, setServicedPets, setPetsConfirmation, operationType) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
  let response
  try {
    response = await PrivateDoctorDataService.saveGeneralData(petID, "pet", operationType)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPetsConfirmation({messageType: "problem"})
    return
  }
  if (response.status === 200) {
    setServicedPets(newServicedPets)
    DoctorAccountDetails.servicedPets = newServicedPets
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
    setPetsConfirmation({messageType: "saved"})
  } else {
    setPetsConfirmation({messageType: "problem"})
    return
  }
}

export async function handlePublicAvailibilityToggle (value, setPubliclyAvailable, setPubliclyAvailableConfirmation) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
  try {
    const response = await PrivateDoctorDataService.savePublicAvailibility(value)
    if (response.status === 200) {
      setPubliclyAvailable(value)
      DoctorAccountDetails.publiclyAvailable = value
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setPubliclyAvailableConfirmation({messageType: "saved"})
    }
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPubliclyAvailableConfirmation({messageType: "problem"})
  }
}
