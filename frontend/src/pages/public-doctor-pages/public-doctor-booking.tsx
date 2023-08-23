import _ from "lodash"
import moment from "moment"
import { useState, useEffect } from "react"
import useFetchAndSetPetData from "src/custom-hooks/public-doctor/use-fetch-and-set-pet-data"
import generateTimeSlots from "src/helper-functions/public-doctor/booking-page/generate-time-slots"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import NoAvailableTimes from "src/components/booking/no-available-times"
import PatientNotLoggedIn from "src/components/booking/patient-not-logged-in"
import SelectLocation from "src/components/booking/select-location"
import ChoosePet from "src/components/booking/choose-pet"
import SelectService from "src/components/booking/select-service"
import SelectDay from "src/components/booking/select-day"
import SelectTime from "src/components/booking/select-time"
import FinalizeBookingButton from "src/components/booking/finalize-booking-button"
import DoctorDoesNotHaveLocations from "src/components/booking/doctor-does-not-have-locations"
import DoctorDoesNotOfferServices from "src/components/booking/doctor-does-not-offer-services"
import { getDayIndex } from "src/utils/time"
import NoLocationHasTimes from "src/components/booking/no-location-has-times"

interface Props {
  providedServices: ServiceItem[]
  addresses: PublicAddressData[]
  personalData: DoctorPersonalData
}

export default function BookingSection(props: Props) {
  const { providedServices, addresses, personalData } = props
  const { userType } = useSimpleUserVerification(false)
  const { savedPetData } = useFetchAndSetPetData(userType)
  const [selectedPet, setSelectedPet] = useState<SavedPetItem | null>(null)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<PublicAddressData |null>(null)
  const [noAvailableTimesMessage, setNoAvailableTimesMessage] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [serviceMinutes, setServiceMinutes] = useState<number>(0)

  // Get selected service object
  const selectedServiceObject = providedServices.find(
    service => service.service_and_category_listID === selectedService?.service_and_category_listID)

  // Get selected location object
  const selectedLocationObject = addresses.find(location => location.addressesID === selectedLocation?.addressesID)

  const selectedPetObject = savedPetData.find(pet => pet.pet_infoID === selectedPet?.pet_infoID)

  useEffect(() => {
    if (savedPetData.length === 1) {
      setSelectedPet(savedPetData[0])
    }
  }, [savedPetData])

  useEffect(() => {
    if (selectedDay && selectedLocationObject && selectedServiceObject && selectedPetObject) {
      generateTimeSlots(selectedDay, selectedLocationObject, selectedServiceObject, setAvailableTimes, setServiceMinutes)
    }
  }, [selectedDay, selectedLocationObject, selectedServiceObject, selectedPetObject])

  useEffect(() => {
    if (!selectedLocationObject) return

    const daysOfWeek = selectedLocationObject.times.map(time => getDayIndex(time.Day_of_week))
    const dates = []
    let date = moment()
    while (dates.length < 10) {
      const dayIndex = date.day() as DayIndeces
      if (daysOfWeek.includes(dayIndex)) dates.push(date.format("dddd, MMMM Do, YYYY"))
      date = date.clone().add(1, "days")
    }
    setAvailableDates(dates)
  }, [selectedLocationObject])

  const anyLocationHasTimes = addresses.some(location => location.times && !_.isEmpty(location.times))

  const MakeBooking = () => {
    if (userType !== "Patient") return <PatientNotLoggedIn />
    if (!anyLocationHasTimes) return <NoLocationHasTimes personalData = {personalData} />
    if (_.isEmpty(addresses)) return <DoctorDoesNotHaveLocations personalData = {personalData} />
    if (_.isEmpty(providedServices)) return <DoctorDoesNotOfferServices personalData = {personalData} />

    return (
      <div className="bg-white border border-gray-300 rounded p-4 mb-4 card-bottom-margin">
        <div className="border-b pb-2 mb-4">
          <h2>Ready to make a booking?</h2>
        </div>
        <div className = "row">
          <ChoosePet
            savedPetData = {savedPetData}
            selectedPet = {selectedPet}
            setSelectedPet = {setSelectedPet}
            setSelectedService = {setSelectedService}
            setSelectedLocation = {setSelectedLocation}
            setSelectedDay = {setSelectedDay}
            setSelectedTime = {setSelectedTime}
          />
        </div>

        <div className = "row">
          <SelectService
            providedServices = {providedServices}
            selectedPet = {selectedPet}
            setSelectedService = {setSelectedService}
            setSelectedLocation = {setSelectedLocation}
            setSelectedDay = {setSelectedDay}
            setSelectedTime = {setSelectedTime}
          />

          <SelectLocation
            addresses = {addresses}
            selectedService = {selectedService}
            setNoAvailableTimesMessage = {setNoAvailableTimesMessage}
            setSelectedLocation = {setSelectedLocation}
            setSelectedDay = {setSelectedDay}
            setSelectedTime = {setSelectedTime}
          />
        </div>

        <NoAvailableTimes
          noAvailableTimesMessage = {noAvailableTimesMessage}
          personalData = {personalData}
        />

        <div className = "row">
          <SelectDay
            selectedService = {selectedService}
            selectedLocation = {selectedLocation}
            setSelectedDay = {setSelectedDay}
            setSelectedTime = {setSelectedTime}
            selectedDay = {selectedDay}
            personalData = {personalData}
            availableDates = {availableDates}
          />

          <SelectTime
            selectedService = {selectedService}
            selectedLocation = {selectedLocation}
            selectedDay = {selectedDay}
            setSelectedTime = {setSelectedTime}
            availableTimes = {availableTimes}
            serviceMinutes = {serviceMinutes}
          />
        </div>

        <FinalizeBookingButton
          selectedService = {selectedService}
          selectedLocation = {selectedLocation}
          selectedDay = {selectedDay}
          selectedTime = {selectedTime}
          serviceMinutes = {serviceMinutes}
          personalData = {personalData}
          selectedPet = {selectedPet}
        />
      </div>
    )
  }

  return <MakeBooking />
}
