import _ from "lodash"
import { NavigateFunction } from "react-router-dom"

export const handlePetChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  savedPetData: PetItemTypeWithID[],
  setSelectedPet: React.Dispatch<React.SetStateAction<PetItemTypeWithID | null>>,
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceItemType | null>>,
  setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressType | null>>,
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  const value = event.target.value
  const selectedPetObject = savedPetData.find(pet => pet.pet_infoID.toString() === value)
  setSelectedPet(selectedPetObject || null)
  if (value === "Select...") {
    setSelectedService(null)
    setSelectedLocation(null)
    setSelectedDay(null)
    setSelectedTime(null)
  }
}

export const handleServiceChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  providedServices: ServiceItemType[],
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceItemType | null>>,
  setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressType | null>>,
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  const value = event.target.value
  const selectedServiceObject = providedServices.find(service => service.service_and_category_listID.toString() === value)
  setSelectedService(selectedServiceObject || null)
  if (value === "Select...") {
    setSelectedLocation(null)
    setSelectedDay(null)
    setSelectedTime(null)
  }
}

export const handleLocationChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  addresses: PublicAddressType[],
  setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressType | null>>,
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>,
  setNoAvailableTimesMessage: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const value = event.target.value
  const selectedLocationObject = addresses.find(location => location.addressesID.toString() === value)

  if (value === "Select...") {
    setSelectedLocation(null)
    setNoAvailableTimesMessage(false)
    setSelectedDay(null)
    setSelectedTime(null)
  } else if (_.isEmpty(selectedLocationObject?.times)) {
    setNoAvailableTimesMessage(true)
    setSelectedLocation(null)
    setSelectedTime(null)
  } else {
    setNoAvailableTimesMessage(false)
    setSelectedLocation(selectedLocationObject!)
  }
}

export const handleDayChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  const value = event.target.value
  setSelectedDay(value === "Select..." ? null : value)
  if (value === "Select...") setSelectedTime(null)
}

export const handleTimeChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  const value = event.target.value
  setSelectedTime(value === "Select..." ? null : value)
}

export function finalizeBookingClick(
  navigate: NavigateFunction,
  selectedService: ServiceItemType,
  selectedLocation: PublicAddressType,
  selectedDay: string,
  selectedTime: string,
  serviceMinutes: number,
  personalData: PersonalDataType,
  selectedPet: PetItemTypeWithID
): void {
  const bookingDetails = {
    selectedService: selectedService ? selectedService : null,
    selectedLocation: selectedLocation ? selectedLocation : null,
    selectedDay,
    selectedTime,
    serviceMinutes,
    personalData,
    selectedPet
  }

  // Store the current state into sessionStorage
  sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails))

  // Navigate to the finalize-booking page with the state
  navigate("/finalize-booking", { state: bookingDetails })
}
