import _ from "lodash"
import moment from "moment"
import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { generateTimeSlots, usePetData } from "src/custom-hooks/public-doctor-hooks/booking-page-hooks"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import {
  RenderChoosePet,
  RenderSelectService,
  RenderSelectLocation,
  RenderNoAvailableTimes,
  RenderSelectDay,
  RenderSelectTime,
  RenderFinalizeBookingButton,
  RenderPatientNotLoggedIn,
  RenderDoctorDoesNotHaveLocations,
  RenderDoctorDoesNotOfferServices,

} from "src/components/booking"
import { getDayIndex } from "src/utils/time"

interface Props {
  providedServices: ServiceItem[]
  addresses: PublicAddressData[]
  personalData: DoctorPersonalData
}

export default function RenderBookingSection(props: Props) {
  const { userType } = useSimpleUserVerification(false)
  const { savedPetData } = usePetData(userType)
  const { providedServices, addresses, personalData } = props
  const [selectedPet, setSelectedPet] = useState<SavedPetItem | null>(null)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<PublicAddressData |null>(null)
  const [noAvailableTimesMessage, setNoAvailableTimesMessage] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [serviceMinutes, setServiceMinutes] = useState<number>(0)
  const navigate = useNavigate()

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

  if (!anyLocationHasTimes) {
    return (
      <Card className = "card-bottom-margin">
        <Card.Header>Ready to make a booking?</Card.Header>
        <Card.Body>
          Dr. {_.upperFirst(personalData.LastName || "")} does not currently have any open time slots for appointments.
        </Card.Body>
      </Card>
    )
  }

  const RenderMakeBooking = () => {
    if (userType !== "Patient") return RenderPatientNotLoggedIn()
    if ( _.isEmpty(addresses)) return RenderDoctorDoesNotHaveLocations(personalData)
    if ( _.isEmpty(providedServices)) return RenderDoctorDoesNotOfferServices(personalData)

    return (
      <Card className = "card-bottom-margin">
        <Card.Header>Ready to make a booking?</Card.Header>
        <Card.Body>
          <div className = "row">
            <RenderChoosePet
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
            <RenderSelectService
              providedServices = {providedServices}
              selectedPet = {selectedPet}
              setSelectedService = {setSelectedService}
              setSelectedLocation = {setSelectedLocation}
              setSelectedDay = {setSelectedDay}
              setSelectedTime = {setSelectedTime}
            />

            <RenderSelectLocation
              addresses = {addresses}
              selectedService = {selectedService}
              setNoAvailableTimesMessage = {setNoAvailableTimesMessage}
              setSelectedLocation = {setSelectedLocation}
              setSelectedDay = {setSelectedDay}
              setSelectedTime = {setSelectedTime}
            />
          </div>

          <RenderNoAvailableTimes
            noAvailableTimesMessage = {noAvailableTimesMessage}
            personalData = {personalData}
          />

          <div className = "row">
            <RenderSelectDay
              selectedService = {selectedService}
              selectedLocation = {selectedLocation}
              setSelectedDay = {setSelectedDay}
              setSelectedTime = {setSelectedTime}
              selectedDay = {selectedDay}
              personalData = {personalData}
              availableDates = {availableDates}
            />

            <RenderSelectTime
              selectedService = {selectedService}
              selectedLocation = {selectedLocation}
              selectedDay = {selectedDay}
              setSelectedTime = {setSelectedTime}
              availableTimes = {availableTimes}
              serviceMinutes = {serviceMinutes}
            />
          </div>

          <RenderFinalizeBookingButton
            selectedService = {selectedService}
            selectedLocation = {selectedLocation}
            selectedDay = {selectedDay}
            selectedTime = {selectedTime}
            serviceMinutes = {serviceMinutes}
            personalData = {personalData}
            selectedPet = {selectedPet}
            navigate = {navigate}
          />
        </Card.Body>
      </Card>
    )
  }

  return <RenderMakeBooking />
}
