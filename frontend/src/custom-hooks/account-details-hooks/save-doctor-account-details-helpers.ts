import PrivateDoctorDataService from "../../services/private-doctor-data-service"
import { handle401AxiosErrorAndSetMessageType } from "src/utils/handle-errors"

type LanguageOperationsType = typeof PrivateDoctorDataService.deleteLanguage |
                              typeof PrivateDoctorDataService.addLanguage

export async function modifyDoctorLanguages(
  operation: LanguageOperationsType,
  languageID: number,
  newSpokenLanguages: LanguageItem[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  let response
  try {
    response = await operation(languageID)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setLanguagesConfirmation)
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

type SpecialtyOperationsType = typeof PrivateDoctorDataService.deleteSpecialty |
                               typeof PrivateDoctorDataService.addSpecialty

export async function modifyDoctorSpecialties(
  operation: SpecialtyOperationsType,
  specialtyID: number,
  newDoctorSpecialties: SpecialtyItem[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void,
  callback: () => void
): Promise<void> {
  let response
  try {
    response = await operation(specialtyID)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setSpecialtiesConfirmation)
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
type ServicedPetsOperationsType = typeof PrivateDoctorDataService.deleteServicedPet |
                                   typeof PrivateDoctorDataService.addServicedPet

export async function modifyServicedPets(
  operation: ServicedPetsOperationsType,
  petID: number,
  newServicedPets: ServicedPetItem[],
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
  setPetsConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  let response
  try {
    response = await operation(petID)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setPetsConfirmation)
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

type AddressOperationsType = typeof PrivateDoctorDataService.updateAddressData |
                             typeof PrivateDoctorDataService.addAddressData

export async function modifyAddressData(
  operation: AddressOperationsType,
  address: DoctorAddressData,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
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
        newAddressData = DoctorAccountDetails.addressData.map(
          (addr: DoctorAddressData) => addr.addressesID === address.addressesID ? address : addr)
      } else {
        throw new Error("Unknown operation")
      }

      DoctorAccountDetails.addressData = newAddressData
      setAddresses(newAddressData)
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setAddressesConfirmation({messageType: "saved"})
    }
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setAddressesConfirmation)
  }
}

export async function deleteAddressData(
  addressID: number,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await PrivateDoctorDataService.deleteAddressData(addressID)

    if (response.status === 200) {
      const newAddressData = DoctorAccountDetails.addressData.filter(
        (addr: DoctorAddressData) => addr.addressesID !== addressID)

      DoctorAccountDetails.addressData = newAddressData
      setAddresses(newAddressData)
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setAddressesConfirmation({messageType: "saved"})
    }
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setAddressesConfirmation)
  }
}

type ServiceOperationsType = typeof PrivateDoctorDataService.deleteService |
                             typeof PrivateDoctorDataService.updateService |
                             typeof PrivateDoctorDataService.addService

export async function modifyServicesData(
  operation: ServiceOperationsType,
  serviceObject: ServiceItem,
  providedServices: ServiceItem[],
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>,
  setServicesConfirmation: (conf: ConfirmationMessage) => void,
  setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>> | null = null
): Promise<void> {
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
        // eslint-disable-next-line max-depth
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
    handle401AxiosErrorAndSetMessageType(error, setServicesConfirmation)
  }
}

