import _ from "lodash"
import moment from "moment"
import { useState, useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import FormGroup from "../../components/form-group"
import { capitalizeFirstLetter } from "../../utils/capitalization"
import { finalizeBookingClick } from "../../custom-hooks/public-doctor-hooks/booking-page-hooks"
import { handleServiceChange, handleLocationChange, handleDayChange, handleTimeChange } from "../../custom-hooks/public-doctor-hooks/booking-page-hooks"

const handleBookingClick = (e, navigate, selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, personalData) => {
  e.preventDefault()
  finalizeBookingClick(navigate, selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, personalData)
}

export default function RenderBookingSection(props) {
  const { providedServices, addresses, personalData } = props
  const [selectedService, setSelectedService] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [noAvailableTimesMessage, setNoAvailableTimesMessage] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [availableTimes, setAvailableTimes] = useState([])
  const navigate = useNavigate()
  const [availableDates, setAvailableDates] = useState([])
  const [serviceMinutes, setServiceMinutes] = useState(0)

  // Get selected service object
  const selectedServiceObject = providedServices.find(service => service.service_and_category_listID === selectedService?.service_and_category_listID)

  // Get selected location object
  const selectedLocationObject = addresses.find(location => location.addressesID === selectedLocation?.addressesID)

  function convertToMinutes(input) {
    if (typeof input === "string") {
      let value = parseInt(input.split(" ")[0])
      if (input.includes("hour")) return moment.duration(value, "hours").asMinutes()
      else if (input.includes("day")) return moment.duration(value, "days").asMinutes()
      else return value
    }
  }

  useEffect(() => {
    if (selectedDay && selectedLocationObject && selectedServiceObject) {
      // Get the working hours for the selected day
      const selectedDayOfWeek = moment(selectedDay, "dddd, MMMM Do, YYYY").format("dddd")
      const workingHours = selectedLocationObject?.times.find(time => time.Day_of_week === selectedDayOfWeek)

      if (workingHours) {
        let times = []
        let start = workingHours.Start_time.split(":")
        let end = workingHours.End_time.split(":")

        let currentTime = moment().hour(start[0]).minute(start[1])
        let endTime = moment().hour(end[0]).minute(end[1])

        const serviceMinutes = convertToMinutes(selectedServiceObject.Service_time)  // Converts the time to minutes
        setServiceMinutes(serviceMinutes)

        while (currentTime.isBefore(endTime)) {
          times.push(currentTime.format("h:mm A")) // Change "HH:mm" to "h:mm A"
          currentTime = currentTime.clone().add(serviceMinutes, "minutes")
        }
        setAvailableTimes(times)
      }
    }
  }, [selectedDay, selectedLocationObject, selectedServiceObject])

  useEffect(() => {
    if (!selectedLocationObject) return

    const daysOfWeek = selectedLocationObject?.times.map(time => {
      switch (time.Day_of_week) {
      case "Sunday": return 0
      case "Monday": return 1
      case "Tuesday": return 2
      case "Wednesday": return 3
      case "Thursday": return 4
      case "Friday": return 5
      case "Saturday": return 6
      default: return null
      }
    })
    let dates = []
    let date = moment()
    while (dates.length < 10) {
      if (daysOfWeek.includes(date.day())) dates.push(date.format("dddd, MMMM Do, YYYY"))
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
          Dr. {capitalizeFirstLetter(personalData.LastName)} does not currently have any open time slots for appointments.
        </Card.Body>
      </Card>
    )
  }

  const renderAvailableDates = () => {
    if (selectedDay === `Dr. ${capitalizeFirstLetter(personalData.LastName)} does not currently have any open appointments at this location`) {
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

  const renderInstantBook = () => {
    if (selectedLocation.instant_book) return <>Confirm</>
    return <>Request</>
  }

  const renderSelectService = () => {
    return (
      <div className = "col-md-6">
        <FormGroup
          as = "select"
          id = "serviceSelect"
          label = "Select a service"
          onChange = {(e) => handleServiceChange(e, providedServices, setSelectedService, setSelectedLocation, setSelectedDay, setSelectedTime)}
        >
          <option>Select...</option>
          {providedServices.map((service) => (
            <option key = {service.service_and_category_listID} value = {service.service_and_category_listID}>
              {service.Category_name} - {service.Service_name}
            </option>
          ))}
        </FormGroup>
      </div>
    )
  }

  const renderSelectLocation = () => {
    if (!selectedService) return null

    return (
      <div className = "col-md-6">
        <FormGroup
          as = "select"
          id = "locationSelect"
          label = "Select a location"
          onChange = {(e) => handleLocationChange(e, addresses, setSelectedLocation, setSelectedDay, setSelectedTime, setNoAvailableTimesMessage)}
        >
          <option>Select...</option>
          {addresses.map((address) => (
            <option key = {address.addressesID} value = {address.addressesID}>
              {address.address_title}: ({address.address_line_1} {address.address_line_2}, {address.city}, {address.state}, {address.zip})
            </option>
          ))}
        </FormGroup>
      </div>
    )
  }

  const renderSelectDay = () => {
    if (!(selectedService && selectedLocation)) return null

    return (
      <div className = "col-md-6">
        <FormGroup
          as = "select"
          id = "daySelect"
          label = "Select a date"
          onChange = {(e) => handleDayChange(e, setSelectedDay, setSelectedTime)}
        >
          <option>Select...</option>
          {renderAvailableDates()}
        </FormGroup>
      </div>
    )
  }

  const renderNoAvailableTimes = () => {
    if (!noAvailableTimesMessage) return null
    return <>Dr. {capitalizeFirstLetter(personalData.LastName)} does not currently have any open appointments at this location</>
  }

  const renderSelectTime = () => {
    if (!(selectedService && selectedLocation && selectedDay)) return null
    return (
      <div className = "col-md-6">
        <FormGroup
          as = "select"
          id = "timeSelect"
          label = "Select a time"
          onChange = {(e) => handleTimeChange(e, setSelectedTime)}
        >
          <option>Select...</option>
          {availableTimes.map((time) => (
            <option key = {time} value = {time}>
              {time} - {moment(time, "h:mm A").add(serviceMinutes, "minutes").format("h:mm A")}
            </option>
          ))}
        </FormGroup>
      </div>
    )
  }

  const renderFinalizeBookingButton = () => {
    if (!(selectedService && selectedLocation && selectedDay && selectedTime)) return null

    return (
      <Button
        className = "mt-3"
        onClick = {(e) => handleBookingClick(
          e,
          navigate,
          selectedService,
          selectedLocation,
          selectedDay,
          selectedTime,
          serviceMinutes,
          personalData
        )}
        variant = "primary"
      >
        Click to {renderInstantBook()} an appointment
      </Button>
    )
  }

  const renderMakeBooking = () => {
    if (_.isEmpty(providedServices) || _.isEmpty(addresses)) {
      return (
        <Card className = "card-bottom-margin">
          <Card.Header>Ready to make a booking?</Card.Header>
          <Card.Body>Dr. {capitalizeFirstLetter(personalData.LastName)} does not currently offer any services.</Card.Body>
        </Card>
      )
    }

    return (
      <Card className = "card-bottom-margin">
        <Card.Header>Ready to make a booking?</Card.Header>
        <Card.Body>
          <div className = "row">
            {renderSelectService()}

            {renderSelectLocation()}
          </div>

          {renderNoAvailableTimes()}

          <div className = "row">
            {renderSelectDay()}

            {renderSelectTime()}
          </div>

          {renderFinalizeBookingButton()}
        </Card.Body>
      </Card>
    )
  }

  return renderMakeBooking()
}
