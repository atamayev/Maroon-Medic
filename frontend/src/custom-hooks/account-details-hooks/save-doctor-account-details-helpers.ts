import PrivateDoctorDataService from "../../services/private-doctor-data-service"
import { handle401AxiosErrorAndSetError } from "src/utils/handle-errors"

export async function modifyDoctorLanguages(
  operation,
  languageID: number,
  newSpokenLanguages: LanguageItemType[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  setLanguagesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  let response
  try {
    response = await operation(languageID)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetError(error, setLanguagesConfirmation)
    return
  }
  if (response.status === 200) {
    setSpokenLanguages(newSpokenLanguages)
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")
    DoctorAccountDetails.languages = newSpokenLanguages
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
    setLanguagesConfirmation({messageType: "saved"})
  } else {
    setLanguagesConfirmation({messageType: "problem"})
  }
}

export async function modifyDoctorSpecialties(
  operation,
  specialtyID: number,
  newDoctorSpecialties: SpecialtyItemType[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItemType[]>>,
  setSpecialtiesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>,
  callback
) {
  let response
  try {
    response = await operation(specialtyID)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetError(error, setSpecialtiesConfirmation)
    return
  }
  if (response.status === 200) {
    setDoctorSpecialties(newDoctorSpecialties)
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")
    DoctorAccountDetails.specialties = newDoctorSpecialties
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
    setSpecialtiesConfirmation({messageType: "saved"})
  } else {
    setSpecialtiesConfirmation({messageType: "problem"})
    return
  }
  if (callback) callback()
}

export async function modifyServicedPets(
  operation,
  petID: number,
  newServicedPets,
  setServicedPets,
  setPetsConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  let response
  try {
    response = await operation(petID)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetError(error, setPetsConfirmation)
    return
  }
  if (response.status === 200) {
    setServicedPets(newServicedPets)
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")
    DoctorAccountDetails.servicedPets = newServicedPets
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
    setPetsConfirmation({messageType: "saved"})
  } else {
    setPetsConfirmation({messageType: "problem"})
    return
  }
}

export async function modifyAddressData(
  operation,
  address,
  setAddresses,
  setAddressesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")

  try {
    const { times, ...addressData } = address || {}
    const response = await operation(addressData, times)

    if (response.status === 200) {
      let newAddressData

      if (operation === PrivateDoctorDataService.addAddressData) {
        address.addressesID = response.data
        newAddressData = [...DoctorAccountDetails.addressData, address]
      } else if (operation === PrivateDoctorDataService.updateAddressData) {
        newAddressData = DoctorAccountDetails.addressData.map(addr => addr.addressesID === address.addressesID ? address : addr)
      } else if (operation === PrivateDoctorDataService.deleteAddressData) {
        newAddressData = DoctorAccountDetails.addressData.filter(addr => addr.addressesID !== address.addressesID)
      } else {
        throw new Error("Unknown operation")
      }

      DoctorAccountDetails.addressData = newAddressData
      setAddresses(newAddressData)
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setAddressesConfirmation({messageType: "saved"})
    }
  } catch (error: unknown) {
    handle401AxiosErrorAndSetError(error, setAddressesConfirmation)
  }
}

export async function modifyServicesData(
  operation,
  serviceObject: ServiceItemType,
  providedServices: ServiceItemType[],
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemType[]>>,
  setServicesConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>,
  setSelectedServices = null
) {
  try {
    const response = await operation(serviceObject)

    if (response.status === 200) {
      let newProvidedServices
      if (operation === PrivateDoctorDataService.addService) {
        newProvidedServices = [...providedServices, serviceObject]
      } else if (operation === PrivateDoctorDataService.updateService) {
        newProvidedServices = providedServices.map(service =>
          service.service_and_category_listID === serviceObject.service_and_category_listID ? serviceObject : service
        )
      } else if (operation === PrivateDoctorDataService.deleteService) {
        newProvidedServices = providedServices.filter(service =>
          service.service_and_category_listID !== serviceObject.service_and_category_listID
        )
        if (setSelectedServices) setSelectedServices(newProvidedServices)
      } else {
        throw new Error("Unknown operation")
      }

      setProvidedServices(newProvidedServices)
      const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")
      DoctorAccountDetails.services = newProvidedServices
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setServicesConfirmation({messageType: "saved"})
    }
  } catch (error: unknown) {
    handle401AxiosErrorAndSetError(error, setServicesConfirmation)
  }
}

