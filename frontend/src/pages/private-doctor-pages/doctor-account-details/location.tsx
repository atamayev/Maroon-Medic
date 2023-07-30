import _ from "lodash"
import "react-toggle/style.css"
import Toggle from "react-toggle"
import TimePicker from "react-time-picker"
import {Card, Accordion, Form, Button, Container, Row, Col} from "react-bootstrap"
import "../../../styles/location.css"
import { daysOfWeek } from "../../../utils/constants"
import { renderMessageSection } from "../../../components/saved-message-section"
import { handleAddAccordion } from "../../../custom-hooks/account-details-hooks/add"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import { addLocation, deleteLocation, updateLocation } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details"
import {
  renderAddressTitleInput,
  renderAddressLine1Input,
  renderAddressLine2Input,
  renderCityInput,
  renderCountryInput,
  renderPhoneNumberInput,
  renderStateInput,
  renderZipCodeInput,
  renderLocationMapData
} from "./location-fields"
import { areAllFieldsValid, areAllTimesValid } from "../../../utils/all-field-checks"

export default function RenderLocationSection(props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Locations
      </Card.Header>
      <Card.Body>
        {AddressForm(props)}
      </Card.Body>
    </Card>
  )
}

function AddressForm(props) {
  const { addresses, setAddresses } = props
  const [addressesConfirmation, setAddressesConfirmation] = useConfirmationMessage()

  const handleInputChange = (event, addressPriority) => {
    const newAddresses = addresses.map(address => {
      if (address.address_priority === addressPriority) return { ...address, [event.target.name]: event.target.value }
      return address
    })
    setAddresses(newAddresses)
  }

  const renderAddressAccordionItems = () => {
    return (
      <>
        {addresses.sort((a, b) => a.address_priority - b.address_priority).map((address, index) => (
          <AddressAccordionItem
            key = {address.address_priority} // do not change this to addressesID, or saving locations gets messed up when adding multiple locations at once
            index = {index}
            address = {address}
            handleInputChange = {(e) => handleInputChange(e, address.address_priority)}
            addresses = {addresses}
            setAddresses = {setAddresses}
            setAddressesConfirmation = {setAddressesConfirmation}
          />
        ))}
      </>
    )
  }

  const renderAddNewLocationButton = () => {
    return (
      <Button
        variant = "primary"
        onClick = {() => handleAddAccordion(addresses, setAddresses)}
        style = {{ marginRight: "10px" }}
      >
        Add New Location
      </Button>
    )
  }

  return (
    <>
      <Accordion >
        {renderAddressAccordionItems()}
      </Accordion>
      {renderAddNewLocationButton()}
      {renderMessageSection(addressesConfirmation, "Locations")}
    </>
  )
}

const AddressAccordionItem = ({ index, address, handleInputChange, addresses, setAddresses, setAddressesConfirmation }) => {
  const handleToggleChange = (addressPriority, field) => {
    // Create a copy of the addresses state
    const updatedAddresses = [...addresses]
    // Find the index of the address object with the matching priority
    const addressIndex = updatedAddresses.findIndex(addr => addr.address_priority === addressPriority)

    // Check if the field exists in the address object
    // eslint-disable-next-line no-prototype-builtins
    if (updatedAddresses[addressIndex].hasOwnProperty(field)) {
      // Toggle the field's value
      updatedAddresses[addressIndex][field] = updatedAddresses[addressIndex][field] === 1 ? 0 : 1
    } else {
      return
    }
    setAddresses(updatedAddresses)
  }

  const renderAddressTitleSection = () => {
    if (address.address_title) return address.address_title
    return ("Address #" + (index + 1))
  }

  const renderPublicStatus = () => {
    return (
      <>
        <span>Public Status:</span>
        <div onClick = {(event) => event.stopPropagation()}>
          <Toggle
            id = {`${address.address_priority}`}
            checked = {address.address_public_status === 1}
            onChange = {() => handleToggleChange(address.address_priority, "address_public_status")}
          />
        </div>
      </>
    )
  }

  const renderInstantBook = () => {
    return (
      <>
        <span>Instant book:</span>
        <div onClick = {(event) => event.stopPropagation()}>
          <Toggle
            id = {`${address.address_priority}`}
            checked = {address.instant_book === 1}
            onChange = {() => handleToggleChange(address.address_priority, "instant_book")}
          />
        </div>
      </>
    )
  }

  const renderAddLocationButton = () => {
    return (
      <Button
        variant = "success"
        disabled = {!areAllFieldsValid(address) || !areAllTimesValid(address)} // Check for both field and time validity
        onClick = {() => addLocation(address, setAddresses, setAddressesConfirmation)}
      >
        Add Location
      </Button>
    )
  }

  const renderUpdateLocationButton = () => {
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))
    const originalAddress = DoctorAccountDetails.addressData.find(addr => addr.addressesID === address.addressesID)
    const isAddressSame = _.isEqual(originalAddress, address)
    if (isAddressSame) return null

    return (
      <Button
        variant = "secondary"
        disabled = {!areAllFieldsValid(address) || !areAllTimesValid(address)} // Check for both field and time validity
        onClick = {() => updateLocation(address, setAddresses, setAddressesConfirmation)}
      >
        Update Location
      </Button>
    )
  }

  const renderSaveOrUpdateButton = () => {
    if (address.addressesID !== 0) return renderUpdateLocationButton()  // If addressID exists, render update button
    return renderAddLocationButton() // If addressID doesn't exist, render save button
  }

  const handleDeleteAddress = () => {
    if (address.addressesID === 0) setAddresses(addresses.filter(addressf => addressf.address_priority !== address.address_priority))
    else deleteLocation(address.addressesID, setAddresses, setAddressesConfirmation)
  }

  const renderDeleteLocationButton = () => {
    return (
      <Button
        variant = "danger"
        size = "sm"
        onClick = {() => handleDeleteAddress()} style = {{ float: "right" }}
      >
        Delete Location
      </Button>
    )
  }

  const renderAccordionHeader = () => {
    return (
      <Accordion.Header>
        <Container>
          <Row>
            <Col xs = {4} className = "d-flex align-items-center">
              {renderPublicStatus()}
              {renderInstantBook()}
            </Col>
            <Col xs = {4} className = "text-center font-weight-bold">
              {renderAddressTitleSection()}
            </Col>
            <Col xs = {4} className = "text-right">
              <div className = "align-items-left">
                {renderSaveOrUpdateButton()}
              </div>
              {renderDeleteLocationButton()}
            </Col>
          </Row>
        </Container>
      </Accordion.Header>
    )
  }

  const renderFirstAccordionBodyRow = () => {
    return (
      <div className = "row">
        {renderAddressTitleInput(address, handleInputChange)}
        {renderAddressLine1Input(address, handleInputChange)}
        {renderAddressLine2Input(address, handleInputChange)}
        {renderCityInput(address, handleInputChange)}
      </div>
    )
  }

  const renderSecondAccordionBodyRow = () => {
    return (
      <div className = "row">
        {renderStateInput(address, handleInputChange)}
        {renderZipCodeInput(address, handleInputChange)}
        {renderCountryInput(address, handleInputChange)}
        {renderPhoneNumberInput(address, handleInputChange)}
      </div>
    )
  }

  const renerMapsDataAndWeekDays = () => {
    return (
      <div className = "row">
        {renderLocationMapData()}
        <div className = "col-md-6">
          <WeekDays times = {address.times} setTimes = {(newTimes) => handleInputChange({ target: { name: "times", value: newTimes } }, address.address_priority)} />
        </div>
      </div>
    )
  }

  const renderAccordionBody = () => {
    return (
      <Accordion.Body>
        <Form>
          {renderFirstAccordionBodyRow()}
          {renderSecondAccordionBodyRow()}
          {renerMapsDataAndWeekDays()}
        </Form>
      </Accordion.Body>
    )
  }

  return (
    <Accordion.Item eventKey = {address.address_priority} style = {{ marginBottom: "10px" }}>
      {renderAccordionHeader()}
      {renderAccordionBody()}
    </Accordion.Item>
  )
}

const WeekDays = ({ times, setTimes}) => {
  const handleDayToggle = (day) => {
    if (times.some(time => time.Day_of_week === day)) setTimes(times.filter(time => time.Day_of_week !== day))
    else setTimes([...times, { Day_of_week: day, Start_time: "", End_time: "" }])
  }

  const handleTimeChange = (day, timeType, newTime) => {
    setTimes(times.map(time =>
      time.Day_of_week === day ? { ...time, [timeType]: newTime } : time
    ))
  }

  const renderPickStartTime = (day) => {
    return (
      <TimePicker
        className = "ml-3"
        onChange = {(value) => handleTimeChange(day, "Start_time", value)}
        value = {times.find(time => time.Day_of_week === day).Start_time}
      />
    )
  }

  const renderPickEndTime = (day) => {
    return (
      <TimePicker
        className = "ml-3"
        onChange = {(value) => handleTimeChange(day, "End_time", value)}
        value = {times.find(time => time.Day_of_week === day).End_time}
      />
    )
  }

  const RenderPickTime = ({ times, day }) => {
    const matchedTime = times.find(time => time.Day_of_week === day)

    if (!matchedTime) return null

    return (
      <>
        {renderPickStartTime(day)}
        -
        {renderPickEndTime(day)}
      </>
    )
  }

  return (
    <div>
      {daysOfWeek.map((day) => (
        <div key = {day} className = "mb-3 d-flex align-items-center">
          <label className = "mr-3">{day}</label>
          <Toggle
            id = {day}
            checked = {times.some(time => time.Day_of_week === day)}
            onChange = {() => handleDayToggle(day)}
          />
          <RenderPickTime times = {times} day = {day} />
        </div>
      ))}
    </div>
  )
}
