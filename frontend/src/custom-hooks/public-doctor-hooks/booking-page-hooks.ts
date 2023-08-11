import _ from "lodash"
import { NavigateFunction } from "react-router-dom"

export const handlePetChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  savedPetData: SavedPetItem[],
  setSelectedPet: React.Dispatch<React.SetStateAction<SavedPetItem | null>>,
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceItem | null>>,
  setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressData | null>>,
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
  providedServices: ServiceItem[],
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceItem | null>>,
  setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressData | null>>,
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
  addresses: PublicAddressData[],
  setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressData | null>>,
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
  selectedService: ServiceItem,
  selectedLocation: PublicAddressData,
  selectedDay: string,
  selectedTime: string,
  serviceMinutes: number,
  personalData: DoctorPersonalData,
  selectedPet: SavedPetItem
): void {
  const bookingDetails = {
    selectedService: selectedService,
    selectedLocation: selectedLocation,
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
