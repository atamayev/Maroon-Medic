import moment from "moment"
import { useEffect, useState } from "react"
import { Card, Button } from "react-bootstrap"
import { useNavigate, useLocation } from "react-router-dom"
import FormGroup from "../../components/form-group"
import { capitalizeFirstLetter } from "../../utils/capitalization"
import { UnauthorizedUser } from "../../components/user-type-unauth"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import { confirmBooking } from "../../custom-hooks/public-doctor-hooks/confirm-booking-hook"
import Header from "../header"

const handleConfirmBooking = (e, navigate, selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, personalData, selectedPet, message) => {
  e.preventDefault()
  confirmBooking(navigate, selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, personalData, selectedPet, message)
}

export function FinalizeBookingPage() {
  const [message, setMessage] = useState("")
  const [isMessageOverLimit, setIsMessageOverLimit] = useState(false)
  const browserLocation = useLocation()
  const navigate = useNavigate()
  const { userType } = useSimpleUserVerification(false)

  let selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, personalData, selectedPet
  const sessionBookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails"))

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
      navigate("/patient-dashboard")
    }
  }, [browserLocation, navigate, sessionBookingDetails])

  useEffect(() => {
    if (message) setIsMessageOverLimit(message.length >= 100)
  }, [message])

  if (!browserLocation.state && !sessionBookingDetails) {
    return null // or render some kind of loading spinner
  }

  if (userType !== "Patient") return <UnauthorizedUser patientOrDoctor = {"patient"}/>

  const renderConfirmOrRequestBook = () => {
    if (selectedLocation.instant_book) return <>Confirm</>
    return <>Request</>
  }

  const renderMessageSection = () => {
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

  const renderCharacterLimit = () => {
    return (
      <span style = {{ display: "block", ...counterStyleLimit() }}>
        Character Limit: {message.length} / 100
      </span>
    )
  }

  const renderCardText = () => {
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
            <strong>Location:</strong> {selectedLocation.address_title}:  {selectedLocation.address_line_1} {selectedLocation.address_line_2}
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
          <strong>Write a message to Dr. {capitalizeFirstLetter(personalData.LastName)}:</strong>
          {renderMessageSection()}
        </span>
        {renderCharacterLimit()}
      </>
    )
  }

  const renderConfirmBookingButton = () => {
    return (
      <>
        <Button
          variant = "primary"
          onClick = {(e) => {
            handleConfirmBooking(
              e,
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
          {renderConfirmOrRequestBook()}
        </Button>
      </>
    )
  }

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <div className = "container mt-5">
        <Card>
          <Card.Header as = "h2">{renderConfirmOrRequestBook()} an Appointment</Card.Header>
          <Card.Body>
            <Card.Title as = "h3">Dr. {""} {capitalizeFirstLetter(personalData.FirstName)} {""} {capitalizeFirstLetter(personalData.LastName)}</Card.Title>
            {renderCardText()}
            {renderConfirmBookingButton()}
          </Card.Body>
        </Card>
      </div>
    </>
  )
}
