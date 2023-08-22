import _ from "lodash"
import moment from "moment"
import { useEffect, useState } from "react"
import { NavigateFunction } from "react-router-dom"
import fetchPetData from "src/helper-functions/patient/my-pets/fetch-pet-data"
import { convertToMinutes } from "src/utils/time"

export function usePetData(userType: DoctorOrPatientOrNull): { savedPetData: SavedPetItem[] } {
  const storedData = sessionStorage.getItem("PatientPetData")
  const parsedData = storedData && JSON.parse(storedData)
  const [savedPetData, setSavedPetData] = useState<SavedPetItem[]>(parsedData || [])

  useEffect(() => {
    const fetchAndSetPetData: () => void = async () => {
      if (userType === "Patient") {
        try {
          const storedPetData = sessionStorage.getItem("PatientPetData")
          if (storedPetData) setSavedPetData(JSON.parse(storedPetData))
          else await fetchPetData(setSavedPetData)
        } catch (error) {
        }
      }
    }

    fetchAndSetPetData()
  }, [userType])

  return { savedPetData }
}

export const generateTimeSlots = (
  selectedDay: string,
  selectedLocationObject: PublicAddressData,
  selectedServiceObject: ServiceItem,
  setAvailableTimes: React.Dispatch<React.SetStateAction<string[]>>,
  setServiceMinutes: React.Dispatch<React.SetStateAction<number>>
): void => {
  // Get the working hours for the selected day
  const selectedDayOfWeek = moment(selectedDay, "dddd, MMMM Do, YYYY").format("dddd")
  const workingHours = selectedLocationObject.times.find(time => time.Day_of_week === selectedDayOfWeek)

  if (workingHours) {
    const times = []
    const start = workingHours.Start_time.split(":")
    const end = workingHours.End_time.split(":")

    let currentTime = moment().hour(Number(start[0])).minute(Number(start[1]))
    const endTime = moment().hour(Number(end[0])).minute(Number(end[1]))

    const ServiceMinutes = convertToMinutes(selectedServiceObject.Service_time)
    setServiceMinutes(ServiceMinutes)

    while (currentTime.isBefore(endTime)) {
      // Change "HH:mm" to "h:mm A":
      times.push(currentTime.format("h:mm A"))
      currentTime = currentTime.clone().add(ServiceMinutes, "minutes")
    }
    setAvailableTimes(times)
  }
}

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
