import moment from "moment"
import PrivateDoctorDataService from "../../services/private-doctor-data-service"
import { shouldSaveServices, shouldSaveDescription, shouldSaveLocation } from "../../utils/save-account-details"
import { invalidUserAction } from "../user-verification-snippets"

export async function addDoctorLanguages(languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation) {
  let response
  try {
    response = await PrivateDoctorDataService.addLanguage(languageID)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setLanguagesConfirmation({messageType: "problem"})
    return
  }
  if (response.status === 200) {
    setSpokenLanguages(newSpokenLanguages)
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
    DoctorAccountDetails.languages = newSpokenLanguages
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
    setLanguagesConfirmation({messageType: "saved"})
  } else {
    setLanguagesConfirmation({messageType: "problem"})
  }
}

export async function deleteDoctorLanguages(languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation) {
  let response
  try {
    response = await PrivateDoctorDataService.deleteLanguage(languageID)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setLanguagesConfirmation({messageType: "problem"})
    return
  }
  if (response.status === 200) {
    setSpokenLanguages(newSpokenLanguages)
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
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

export async function addSpecialties(specialtyID, newDoctorSpecialties, setDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation) {
  let response
  try {
    response = await PrivateDoctorDataService.addSpecialty(specialtyID)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setSpecialtiesConfirmation({messageType: "problem"})
    return
  }
  if (response.status === 200) {
    setDoctorSpecialties(newDoctorSpecialties)
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
    DoctorAccountDetails.specialties = newDoctorSpecialties
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
    setSpecialtiesConfirmation({messageType: "saved"})
  } else {
    setSpecialtiesConfirmation({messageType: "problem"})
    return
  }
  setSelectedOrganization("")
}

export async function deleteSpecialties(specialtyID, newDoctorSpecialties, setDoctorSpecialties, setSpecialtiesConfirmation) {
  let response
  try {
    response = await PrivateDoctorDataService.deleteSpecialty(specialtyID)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setSpecialtiesConfirmation({messageType: "problem"})
    return
  }
  if (response.status === 200) {
    setDoctorSpecialties(newDoctorSpecialties)
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
    DoctorAccountDetails.specialties = newDoctorSpecialties
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
    setSpecialtiesConfirmation({messageType: "saved"})
  } else {
    setSpecialtiesConfirmation({messageType: "problem"})
    return
  }
}

export async function addPreVetEducation(preVetEducationObject, preVetEducation, setPreVetEducation, listDetails, setPreVetEducationConfirmation) {
  try {
    const mappedPreVetEducationObject = {
      School_ID: listDetails.preVetSchools.find(school => school.School_name === preVetEducationObject.School_name)?.pre_vet_school_listID || null,
      Major_ID: listDetails.majors.find(major => major.Major_name === preVetEducationObject.Major_name)?.major_listID || null,
      Education_type_ID: listDetails.preVetEducationTypes.find(educationType => educationType.Education_type === preVetEducationObject.Education_type)?.pre_vet_education_typeID || null,
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
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPreVetEducationConfirmation({messageType: "problem"})
    return
  }
}

export async function deletePreVetEducation(preVetEducationObject, preVetEducation, setPreVetEducation, setPreVetEducationConfirmation) {
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
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPreVetEducationConfirmation({messageType: "problem"})
    return
  }
}

export async function addVetEducation(vetEducationObject, vetEducation, setVetEducation, listDetails, setVetEducationConfirmation) {
  try {
    const mappedVetEducationObject = {
      School_ID: listDetails.vetSchools.find(school => school.School_name === vetEducationObject.School_name)?.vet_school_listID || null,
      Education_type_ID: listDetails.vetEducationTypes.find(educationType => educationType.Education_type === vetEducationObject.Education_type)?.vet_education_typeID || null,
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
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setVetEducationConfirmation({messageType: "problem"})
    return
  }
}

export async function deleteVetEducation(vetEducationObject, vetEducation, setVetEducation, setVetEducationConfirmation) {
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
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setVetEducationConfirmation({messageType: "problem"})
    return
  }
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

export async function addServicedPets(petID, newServicedPets, setServicedPets, setPetsConfirmation) {
  let response
  try {
    response = await PrivateDoctorDataService.addServicedPet(petID)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPetsConfirmation({messageType: "problem"})
    return
  }
  if (response.status === 200) {
    setServicedPets(newServicedPets)
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
    DoctorAccountDetails.servicedPets = newServicedPets
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
    setPetsConfirmation({messageType: "saved"})
  } else {
    setPetsConfirmation({messageType: "problem"})
    return
  }
}

export async function deleteServicedPets(petID, newServicedPets, setServicedPets, setPetsConfirmation) {
  let response
  try {
    response = await PrivateDoctorDataService.deleteServicedPet(petID)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPetsConfirmation({messageType: "problem"})
    return
  }
  if (response.status === 200) {
    setServicedPets(newServicedPets)
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
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
