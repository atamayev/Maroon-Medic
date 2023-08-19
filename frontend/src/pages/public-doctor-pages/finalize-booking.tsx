import _ from "lodash"
import moment from "moment"
import { useEffect, useState } from "react"
import { Card, Button } from "react-bootstrap"
import { useNavigate, useLocation } from "react-router-dom"
import FormGroup from "../../components/form-group"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import { confirmBooking } from "../../custom-hooks/public-doctor-hooks/confirm-booking-hook"
import Header from "../../components/header/header"

export default function FinalizeBookingPage() {
  const [message, setMessage] = useState("")
  const [isMessageOverLimit, setIsMessageOverLimit] = useState(false)
  const browserLocation = useLocation()
  const navigate = useNavigate()
  const { userType } = useSimpleUserVerification(false)

  let selectedService: ServiceItem
  let selectedLocation: PublicAddressData
  let selectedDay: string
  let selectedTime: string
  let serviceMinutes: number
  let personalData: DoctorPersonalData
  let selectedPet: SavedPetItem

  const storedData = sessionStorage.getItem("bookingDetails")
  const parsedData = storedData && JSON.parse(storedData)
  const sessionBookingDetails = parsedData

  if (browserLocation.state) {
    ({ selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, personalData, selectedPet } = browserLocation.state)
  } else if (sessionBookingDetails) {
    ({ selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, personalData, selectedPet } = sessionBookingDetails)
  }

  useEffect(() => {
    if (!browserLocation.state  && !sessionBookingDetails) {
      window.location.href = "/"
    }
  }, [browserLocation])

  // Ensures that the user is not able to navigate back to finalize booking right after making an appointment
  useEffect(() => {
    if ((browserLocation.state && browserLocation.state.finalized) || !sessionBookingDetails) {
      navigate("/dashboard")
    }
  }, [browserLocation, navigate, sessionBookingDetails])

  useEffect(() => {
    if (message) setIsMessageOverLimit(message.length >= 100)
  }, [message])

  if (!browserLocation.state && !sessionBookingDetails) {
    //Or render some kind of loading spinner
    return null
  }

  if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

  const ConfirmOrRequestBook = () => {
    if (selectedLocation.instant_book) return <>Confirm</>
    return <>Request</>
  }

  const RenderMessageSection = () => {
    return (
      <FormGroup
        id = "Message"
        value = {message}
        onChange = {event => {
          const value = event.target.value
          setMessage(value)
        }}
        maxLength = {100}
        as = "textarea"
      />
    )
  }

  const counterStyleLimit = () => {
    if (isMessageOverLimit) return {color: "red"}
    return {color: "black"}
  }

  const RenderCharacterLimit = () => {
    return (
      <span style = {{ display: "block", ...counterStyleLimit() }}>
        Character Limit: {message.length} / 100
      </span>
    )
  }

  const RenderCardText = () => {
    return (
      <>
        <Card.Text>
          <span style = {{ display: "block" }}>
            <strong>Pet:</strong> {selectedPet.Name}
          </span>
          <span style = {{ display: "block" }}>
            <strong>Service:</strong> {selectedService.Service_name}
          </span>
          <span style = {{ display: "block" }}>
            <strong>
              Location:
            </strong>
            {selectedLocation.address_title}:  {selectedLocation.address_line_1} {selectedLocation.address_line_2}
          </span>
          <span style = {{ display: "block" }}>
            <strong>Day:</strong> {selectedDay}
          </span>
          <span style = {{ display: "block" }}>
            <strong>Time:</strong> {selectedTime} - {moment(selectedTime, "HH:mm").add(serviceMinutes, "minutes").format("h:mm A")}
          </span>
          <span style = {{ display: "block" }}>
            <strong>Price:</strong> ${selectedService.Service_price}
          </span>
        </Card.Text>
        <span style = {{ display: "block" }}>
          <strong>Write a message to Dr. {_.upperFirst(personalData.LastName || "")}:</strong>
          <RenderMessageSection />
        </span>
        <RenderCharacterLimit />
      </>
    )
  }

  const RenderConfirmBookingButton = () => {
    return (
      <>
        <Button
          variant = "primary"
          onClick = {() => {
            confirmBooking(
              navigate,
              selectedService,
              selectedLocation,
              selectedDay,
              selectedTime,
              serviceMinutes,
              personalData,
              selectedPet,
              message
            )
          }}
        >
          {ConfirmOrRequestBook()}
        </Button>
      </>
    )
  }

  const RenderPersonalInfo = () => {
    return (
      <>
        Dr. {""} {_.upperFirst(personalData.FirstName || "")} {""} {_.upperFirst(personalData.LastName || "")}
      </>
    )
  }

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <div className = "container mt-5">
        <Card>
          <Card.Header as = "h2">{ConfirmOrRequestBook()} an Appointment</Card.Header>
          <Card.Body>
            <Card.Title as = "h3">
              <RenderPersonalInfo />
            </Card.Title>
            <RenderCardText />
            <RenderConfirmBookingButton />
          </Card.Body>
        </Card>
      </div>
    </>
  )
}
