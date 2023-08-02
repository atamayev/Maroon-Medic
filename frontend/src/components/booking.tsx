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
import { UnauthorizedUserBodyText } from "./user-type-unauth"

interface BaseProps {
  selectedPet: PetItemType | undefined
  setSelectedService: (value: string) => void
  setSelectedLocation: (value: string) => void
  setSelectedDay: (value: string) => void
  setSelectedTime: (value: string) => void
}

interface ChoosePetProps extends BaseProps {
  savedPetData: PetItemType[]
  setSelectedPet: (value: PetItemType | undefined) => void
}

export const RenderChoosePet = (props: ChoosePetProps) => {
  if (_.isEmpty(props.savedPetData)) {
    return (
      <div className = "col-md-6">
        You need to add a pet to make an appointment
        <Link to = {"/my-pets"}>
          <Button variant = "primary">
            <p>Add a Pet</p>
          </Button>
        </Link>
      </div>
    )
  }

  if (props.savedPetData.length === 1) return <div className = "col-md-6">Selected Pet: {props.selectedPet?.Name}</div>

  return (
    <div className = "col-md-6">
      <FormGroup
        as = "select"
        id = "petSelect"
        label = "Select a pet"
        onChange = {(e) =>
          handlePetChange(
            e,
            props.savedPetData,
            props.setSelectedPet,
            props.setSelectedService,
            props.setSelectedLocation,
            props.setSelectedDay,
            props.setSelectedTime
          )
        }
      >
        <option>Select...</option>
        {props.savedPetData.map((pet, index) => (
          <option key = {index} value = {pet.pet_infoID}>
            {pet.Name}
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

interface SelectServiceProps extends BaseProps {
  providedServices: ServiceData[]
}

export const RenderSelectService = (props: SelectServiceProps) => {
  if (!props.selectedPet) return null

  return (
    <div className = "col-md-6">
      <FormGroup
        as = "select"
        id = "serviceSelect"
        label = "Select a service"
        onChange = {(e) =>
          handleServiceChange(
            e,
            props.providedServices,
            props.setSelectedService,
            props.setSelectedLocation,
            props.setSelectedDay,
            props.setSelectedTime
          )}
      >
        <option>Select...</option>
        {props.providedServices.map((service, index) => (
          <option key = {index} value = {service.service_and_category_listID}>
            {service.Category_name} - {service.Service_name}
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

interface SelectLocationProps extends BaseProps {
  addresses: AddressData[]
  selectedService: ServiceData | undefined
  setNoAvailableTimesMessage: (value: string) => void
}

export const RenderSelectLocation = (props: SelectLocationProps) => {
  if (!props.selectedService) return null

  return (
    <div className = "col-md-6">
      <FormGroup
        as = "select"
        id = "locationSelect"
        label = "Select a location"
        onChange = {(e) =>
          handleLocationChange(
            e,
            props.addresses,
            props.setSelectedLocation,
            props.setSelectedDay,
            props.setSelectedTime,
            props.setNoAvailableTimesMessage
          )}
      >
        <option>Select...</option>
        {props.addresses.map((address) => (
          <option key = {address.addressesID} value = {address.addressesID}>
            {address.address_title}: ({address.address_line_1} {address.address_line_2}, {address.city}, {address.state}, {address.zip})
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

interface NoAvailableTimesProps {
  noAvailableTimesMessage: boolean
  personalData: PersonalDataType
}

export const RenderNoAvailableTimes = (props: NoAvailableTimesProps) => {
  if (!props.noAvailableTimesMessage) return null
  return <>
    Dr. {_.upperFirst(props.personalData.LastName || "")} does not currently have any open appointments at this location
  </>
}

interface SelectDayProps {
  selectedService: ServiceData | undefined
  selectedLocation: AddressData | undefined
  setSelectedDay: (value: string) => void
  setSelectedTime: (value: string) => void
  selectedDay: string
  personalData: PersonalDataType
  availableDates: string[]
}

export const RenderSelectDay = (props: SelectDayProps) => {
  if (!(props.selectedService && props.selectedLocation)) return null

  return (
    <div className = "col-md-6">
      <FormGroup
        as = "select"
        id = "daySelect"
        label = "Select a date"
        onChange = {(e) => handleDayChange(e, props.setSelectedDay, props.setSelectedTime)}
      >
        <option>Select...</option>
        {RenderAvailableDates(props.selectedDay, props.personalData, props.availableDates)}
      </FormGroup>
    </div>
  )
}

interface SelectTimeProps {
  selectedService: ServiceData | undefined
  selectedLocation: AddressData | undefined
  selectedDay: string
  setSelectedTime: (value: string) => void
  availableTimes: string[]
  serviceMinutes: number
}

export const RenderSelectTime = (props: SelectTimeProps) => {
  if (!(props.selectedService && props.selectedLocation && props.selectedDay)) return null
  return (
    <div className = "col-md-6">
      <FormGroup
        as = "select"
        id = "timeSelect"
        label = "Select a time"
        onChange = {(e) => handleTimeChange(e, props.setSelectedTime)}
      >
        <option>Select...</option>
        {props.availableTimes.map((time) => (
          <option key = {time} value = {time}>
            {time} - {moment(time, "h:mm A").add(props.serviceMinutes, "minutes").format("h:mm A")}
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

interface FinalizeBookingProps {
  selectedService: ServiceData | undefined
  selectedLocation: AddressData | undefined
  selectedDay: string
  selectedTime: string
  serviceMinutes: number
  personalData: PersonalDataType
  selectedPet: PetData | undefined
  navigate: NavigateFunction
}

export const RenderFinalizeBookingButton = (props: FinalizeBookingProps) => {
  if (!(props.selectedService && props.selectedLocation && props.selectedDay && props.selectedTime)) return null

  return (
    <Button
      className = "mt-3"
      onClick = {() => finalizeBookingClick(
        props.navigate,
        props.selectedService,
        props.selectedLocation,
        props.selectedDay,
        props.selectedTime,
        props.serviceMinutes,
        props.personalData,
        props.selectedPet
      )}
      variant = "primary"
    >
      Click to {RenderInstantBook(props.selectedLocation)} an appointment
    </Button>
  )
}

export const RenderPatientNotLoggedIn = () => {
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>Ready to make a booking?</Card.Header>
      <UnauthorizedUserBodyText patientOrDoctor = {"patient"} />
    </Card>
  )
}

export const RenderDoctorDoesNotOfferServices = (personalData: PersonalDataType) => {
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>Ready to make a booking?</Card.Header>
      <Card.Body>Dr. {_.upperFirst(personalData.LastName || "")} does not currently offer any services.</Card.Body>
    </Card>
  )
}

export const RenderDoctorDoesNotHaveLocations = (personalData: PersonalDataType) => {
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>Ready to make a booking?</Card.Header>
      <Card.Body>Dr. {_.upperFirst(personalData.LastName || "")} does not currently have any open locations.</Card.Body>
    </Card>
  )
}

const RenderAvailableDates = (selectedDay: string, personalData: PersonalDataType, availableDates: string[]) => {
  if (selectedDay === `Dr. ${_.upperFirst(personalData.LastName || "")} does not currently have any open appointments at this location`) {
    return <option disabled>{selectedDay}</option>
  }

  return (
    availableDates.map((date) => (
      <option key = {date} value = {date}>
        {date}
      </option>
    ))
  )
}

const RenderInstantBook = (selectedLocation: PublicAddressType) => {
  if (selectedLocation.instant_book) return <>Confirm</>
  return <>Request</>
}
