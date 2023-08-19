import _ from "lodash"
import moment from "moment"
import { Link, NavigateFunction } from "react-router-dom"
import { Button, Card } from "react-bootstrap"
import {
  handlePetChange,
  handleServiceChange,
  handleDayChange,
  handleLocationChange,
  handleTimeChange,
  finalizeBookingClick
} from "src/custom-hooks/public-doctor-hooks/booking-page-hooks"
import FormGroup from "./form-group"
import UnauthorizedUserBodyText from "./unauthorized-user/unauthorized-user-body-text"

interface BaseProps {
  selectedPet: SavedPetItem | null
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceItem | null>>
  setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressData | null>>
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
}

interface ChoosePetProps extends BaseProps {
  savedPetData: SavedPetItem[]
  setSelectedPet: React.Dispatch<React.SetStateAction<SavedPetItem | null>>
}

export const RenderChoosePet = (props: ChoosePetProps) => {
  const { savedPetData, setSelectedPet, selectedPet, setSelectedService, setSelectedLocation, setSelectedDay, setSelectedTime } = props

  if (_.isEmpty(savedPetData)) {
    return (
      <div className="col-md-6">
        You need to add a pet to make an appointment
        <Link to = {"/my-pets"}>
          <Button variant="primary">
            <p>Add a Pet</p>
          </Button>
        </Link>
      </div>
    )
  }

  if (savedPetData.length === 1) return <div className="col-md-6">Selected Pet: {selectedPet?.Name}</div>

  return (
    <div className="col-md-6">
      <FormGroup
        as = "select"
        id = "petSelect"
        label = "Select a pet"
        onChange ={(e) =>
          handlePetChange(
            e,
            savedPetData,
            setSelectedPet,
            setSelectedService,
            setSelectedLocation,
            setSelectedDay,
            setSelectedTime
          )
        }
      >
        <option>Select...</option>
        {savedPetData.map((pet, index) => (
          <option key={index} value={pet.pet_infoID}>
            {pet.Name}
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

interface SelectServiceProps extends BaseProps {
  providedServices: ServiceItem[]
}

export const RenderSelectService = (props: SelectServiceProps) => {
  const { providedServices, selectedPet, setSelectedService, setSelectedLocation, setSelectedDay, setSelectedTime } = props

  if (!selectedPet) return null

  return (
    <div className="col-md-6">
      <FormGroup
        as="select"
        id="serviceSelect"
        label="Select a service"
        onChange={(e) =>
          handleServiceChange(
            e,
            providedServices,
            setSelectedService,
            setSelectedLocation,
            setSelectedDay,
            setSelectedTime
          )}
      >
        <option>Select...</option>
        {providedServices.map((service, index) => (
          <option key={index} value={service.service_and_category_listID}>
            {service.Category_name} - {service.Service_name}
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

interface SelectLocationProps {
  addresses: PublicAddressData[]
  selectedService: ServiceItem | null
  setNoAvailableTimesMessage: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressData | null>>
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
}

export const RenderSelectLocation = (props: SelectLocationProps) => {
  const { addresses, selectedService, setNoAvailableTimesMessage,
    setSelectedLocation, setSelectedDay, setSelectedTime } = props

  if (!selectedService) return null

  return (
    <div className="col-md-6">
      <FormGroup
        as="select"
        id="locationSelect"
        label="Select a location"
        onChange={(e) =>
          handleLocationChange(
            e,
            addresses,
            setSelectedLocation,
            setSelectedDay,
            setSelectedTime,
            setNoAvailableTimesMessage
          )}
      >
        <option>Select...</option>
        {addresses.map((address) => (
          <option key={address.addressesID} value={address.addressesID}>
            {address.address_title}: ({address.address_line_1} {address.address_line_2}, {address.city}, {address.state}, {address.zip})
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

interface NoAvailableTimesProps {
  noAvailableTimesMessage: boolean
  personalData: DoctorPersonalData
}

export const RenderNoAvailableTimes = (props: NoAvailableTimesProps) => {
  const { noAvailableTimesMessage, personalData } = props
  if (!noAvailableTimesMessage) return null
  return <>
    Dr. {_.upperFirst(personalData.LastName || "")} does not currently have any open appointments at this location
  </>
}

interface SelectDayProps {
  selectedService: ServiceItem | null
  selectedLocation: PublicAddressData | null
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
  selectedDay: string | null
  personalData: DoctorPersonalData
  availableDates: string[]
}

export const RenderSelectDay = (props: SelectDayProps) => {
  const { selectedService, selectedLocation, setSelectedDay, setSelectedTime, selectedDay, personalData, availableDates } = props
  if (!(selectedService && selectedLocation && selectedDay)) return null

  return (
    <div className="col-md-6">
      <FormGroup
        as="select"
        id="daySelect"
        label="Select a date"
        onChange={(e) => handleDayChange(e, setSelectedDay, setSelectedTime)}
      >
        <option>Select...</option>
        <RenderAvailableDates
          selectedDay = {selectedDay}
          personalData = {personalData}
          availableDates = {availableDates}
        />
      </FormGroup>
    </div>
  )
}

interface SelectTimeProps {
  selectedService: ServiceItem | null
  selectedLocation: PublicAddressData | null
  selectedDay: string | null
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
  availableTimes: string[]
  serviceMinutes: number
}

export const RenderSelectTime = (props: SelectTimeProps) => {
  const { selectedService, selectedLocation, selectedDay, setSelectedTime, availableTimes, serviceMinutes } = props
  if (!(selectedService && selectedLocation && selectedDay)) return null
  return (
    <div className="col-md-6">
      <FormGroup
        as="select"
        id="timeSelect"
        label="Select a time"
        onChange={(e) => handleTimeChange(e, setSelectedTime)}
      >
        <option>Select...</option>
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time} - {moment(time, "h:mm A").add(serviceMinutes, "minutes").format("h:mm A")}
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

interface FinalizeBookingProps {
  selectedService: ServiceItem | null
  selectedLocation: PublicAddressData | null
  selectedDay: string | null
  selectedTime: string | null
  serviceMinutes: number
  personalData: DoctorPersonalData
  selectedPet: SavedPetItem | null
  navigate: NavigateFunction
}

export const RenderFinalizeBookingButton = (props: FinalizeBookingProps) => {
  const { selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, personalData, selectedPet, navigate } = props
  if (!(selectedService && selectedLocation && selectedDay && selectedTime)) return null

  return (
    <Button
      className="mt-3"
      onClick={() => finalizeBookingClick(
        navigate,
        selectedService,
        selectedLocation,
        selectedDay,
        selectedTime,
        serviceMinutes,
        personalData,
        selectedPet!
      )}
      variant="primary"
    >
      Click to {ConfirmOrRequestMessage(selectedLocation)} an appointment
    </Button>
  )
}

export const RenderPatientNotLoggedIn = () => {
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>Ready to make a booking?</Card.Header>
      <UnauthorizedUserBodyText vetOrpatient = {"patient"} />
    </Card>
  )
}

export const RenderDoctorDoesNotOfferServices = (personalData: DoctorPersonalData) => {
  return (
    <Card className="card-bottom-margin">
      <Card.Header>Ready to make a booking?</Card.Header>
      <Card.Body>Dr. {_.upperFirst(personalData.LastName || "")} does not currently offer any services.</Card.Body>
    </Card>
  )
}

export const RenderDoctorDoesNotHaveLocations = (personalData: DoctorPersonalData) => {
  return (
    <Card className="card-bottom-margin">
      <Card.Header>Ready to make a booking?</Card.Header>
      <Card.Body>Dr. {_.upperFirst(personalData.LastName || "")} does not currently have any open locations.</Card.Body>
    </Card>
  )
}

interface RenderAvailableDatesProps {
  selectedDay: string;
  personalData: DoctorPersonalData;
  availableDates: string[];
}

const RenderAvailableDates = ({
  selectedDay,
  personalData,
  availableDates,
}: RenderAvailableDatesProps) => {
  if (selectedDay === `Dr. ${_.upperFirst(personalData.LastName || "")} does not currently have any open appointments at this location`) {
    return <option disabled>{selectedDay}</option>
  }

  return (
    <>
      {availableDates.map((date) => (
        <option key={date} value={date}>
          {date}
        </option>
      ))}
    </>
  )
}

const ConfirmOrRequestMessage = (selectedLocation: PublicAddressData) => {
  if (selectedLocation.instant_book) return <>Confirm</>
  return <>Request</>
}
