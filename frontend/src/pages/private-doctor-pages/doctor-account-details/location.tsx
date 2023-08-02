import _ from "lodash"
import "react-toggle/style.css"
import Toggle from "react-toggle"
import TimePicker from "react-time-picker"
import {Card, Accordion, Form, Button, Container, Row, Col} from "react-bootstrap"
import "../../../styles/location.css"
import { daysOfWeek } from "../../../utils/constants"
import { RenderMessageSection } from "../../../components/saved-message-section"
import { handleAddAccordion } from "../../../custom-hooks/account-details-hooks/add"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import { addLocation, deleteLocation, updateLocation } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details"
import {
  RenderAddressTitleInput,
  RenderAddressLine1Input,
  RenderAddressLine2Input,
  RenderCityInput,
  RenderCountryInput,
  RenderPhoneNumberInput,
  RenderStateInput,
  RenderZipCodeInput,
  RenderLocationMapData
} from "./location-fields"
import { areAllFieldsValid, areAllTimesValid } from "../../../utils/all-field-checks"

interface Props {
  addresses: DoctorAddressDataType[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressDataType[]>>
}

export default function RenderLocationSection(props: Props) {
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

function AddressForm(props: Props) {
  const { addresses, setAddresses } = props
  const [addressesConfirmation, setAddressesConfirmation] = useConfirmationMessage()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => {
    const newAddresses = addresses.map(address => {
      if (address.address_priority === addressPriority) return { ...address, [event.target.name]: event.target.value }
      return address
    })
    setAddresses(newAddresses)
  }

  const RenderAddressAccordionItems = () => {
    return (
      <>
        {addresses.sort((a, b) => a.address_priority - b.address_priority).map((address, index) => (
          <AddressAccordionItem
            // do not change the key to addressesID, or saving locations gets messed up when adding multiple locations at once
            key = {address.address_priority}
            index = {index}
            address = {address}
            handleInputChange = {(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, address.address_priority)}
            addresses = {addresses}
            setAddresses = {setAddresses}
            setAddressesConfirmation = {setAddressesConfirmation}
          />
        ))}
      </>
    )
  }

  const RenderAddNewLocationButton = () => {
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
        <RenderAddressAccordionItems />
      </Accordion>
      <RenderAddNewLocationButton />
      <RenderMessageSection
        confirmationMessage = {addressesConfirmation}
        whatIsBeingSaved = "Locations"
      />
    </>
  )
}

interface AddressAccordionProps {
  index: number
  address: DoctorAddressDataType
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
  addresses: DoctorAddressDataType[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressDataType[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

const AddressAccordionItem = (props: AddressAccordionProps) => {
  const { index, address, handleInputChange, addresses, setAddresses, setAddressesConfirmation } = props
  const handleToggleChange = (
    addressPriority: number,
    field: keyof Pick<DoctorAddressDataType, "address_public_status" | "instant_book">
  ) => {
    // Create a copy of the addresses state
    const updatedAddresses = [...addresses]
    // Find the index of the address object with the matching priority
    const addressIndex = updatedAddresses.findIndex(addr => addr.address_priority === addressPriority)

    if (field in updatedAddresses[addressIndex]) {
      updatedAddresses[addressIndex][field] = !updatedAddresses[addressIndex][field]
    } else {
      return
    }
    setAddresses(updatedAddresses)
  }

  const handleTimesChange = (newTimesFn: React.SetStateAction<AvailabilityDataType[]>, addressPriority: number) => {
    const newAddresses = addresses.map(address => {
      if (address.address_priority === addressPriority) {
        const newTimes = typeof newTimesFn === "function" ? newTimesFn(address.times) : newTimesFn
        return { ...address, times: newTimes }
      }
      return address
    })
    setAddresses(newAddresses)
  }

  const RenderAddressTitleSection = () => {
    if (address.address_title) return <>{address.address_title}</>
    return <>{("Address #" + (index + 1))}</>
  }

  const RenderPublicStatus = () => {
    return (
      <>
        <span>Public Status:</span>
        <div onClick = {(event) => event.stopPropagation()}>
          <Toggle
            id = {`${address.address_priority}`}
            checked = {address.address_public_status}
            onChange = {() => handleToggleChange(address.address_priority, "address_public_status")}
          />
        </div>
      </>
    )
  }

  const RenderInstantBook = () => {
    return (
      <>
        <span>Instant book:</span>
        <div onClick = {(event) => event.stopPropagation()}>
          <Toggle
            id = {`${address.address_priority}`}
            checked = {address.instant_book}
            onChange = {() => handleToggleChange(address.address_priority, "instant_book")}
          />
        </div>
      </>
    )
  }

  const RenderAddLocationButton = () => {
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

  const RenderUpdateLocationButton = () => {
    const storedData = sessionStorage.getItem("DoctorAccountDetails")
    const parsedData = storedData && JSON.parse(storedData)
    const DoctorAccountDetails = JSON.parse(parsedData)
    const originalAddress = DoctorAccountDetails.addressData.find((addr: DoctorAddressDataType) => addr.addressesID === address.addressesID)
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

  const RenderSaveOrUpdateButton = () => {
    if (address.addressesID !== 0) return <RenderUpdateLocationButton/>  // If addressID exists, Render update button
    return <RenderAddLocationButton/> // If addressID doesn't exist, Render save button
  }

  const handleDeleteAddress = () => {
    if (address.addressesID === 0) setAddresses(addresses.filter(addressf => addressf.address_priority !== address.address_priority))
    else deleteLocation(address.addressesID, setAddresses, setAddressesConfirmation)
  }

  const RenderDeleteLocationButton = () => {
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

  const RenderAccordionHeader = () => {
    return (
      <Accordion.Header>
        <Container>
          <Row>
            <Col xs = {4} className = "d-flex align-items-center">
              <RenderPublicStatus/>
              <RenderInstantBook/>
            </Col>
            <Col xs = {4} className = "text-center font-weight-bold">
              <RenderAddressTitleSection/>
            </Col>
            <Col xs = {4} className = "text-right">
              <div className = "align-items-left">
                <RenderSaveOrUpdateButton/>
              </div>
              <RenderDeleteLocationButton/>
            </Col>
          </Row>
        </Container>
      </Accordion.Header>
    )
  }

  const RenderFirstAccordionBodyRow = () => {
    return (
      <div className = "row">
        <RenderAddressTitleInput address = {address} handleInputChange = {handleInputChange} />
        <RenderAddressLine1Input address = {address} handleInputChange = {handleInputChange} />
        <RenderAddressLine2Input address = {address} handleInputChange = {handleInputChange} />
        <RenderCityInput address = {address} handleInputChange = {handleInputChange} />
      </div>
    )
  }

  const RenderSecondAccordionBodyRow = () => {
    return (
      <div className = "row">
        <RenderStateInput address = {address} handleInputChange = {handleInputChange} />
        <RenderZipCodeInput address = {address} handleInputChange = {handleInputChange} />
        <RenderCountryInput address = {address} handleInputChange = {handleInputChange} />
        <RenderPhoneNumberInput address = {address} handleInputChange = {handleInputChange} />
      </div>
    )
  }

  const RenderMapsDataAndWeekDays = () => {
    return (
      <div className = "row">
        <RenderLocationMapData />
        <div className = "col-md-6">
          <WeekDays
            times = {address.times}
            setTimes = {newTimes => handleTimesChange(newTimes, address.address_priority)}
          />
        </div>
      </div>
    )
  }

  const RenderAccordionBody = () => {
    return (
      <Accordion.Body>
        <Form>
          <RenderFirstAccordionBodyRow/>
          <RenderSecondAccordionBodyRow/>
          <RenderMapsDataAndWeekDays/>
        </Form>
      </Accordion.Body>
    )
  }

  return (
    <Accordion.Item eventKey = {address.address_priority.toString()} style = {{ marginBottom: "10px" }}>
      <RenderAccordionHeader />
      <RenderAccordionBody />
    </Accordion.Item>
  )
}

interface WeekDaysProps {
  times: AvailabilityDataType[]
  setTimes: React.Dispatch<React.SetStateAction<AvailabilityDataType[]>>
}

const WeekDays = (props: WeekDaysProps) => {
  const { times, setTimes } = props

  const handleDayToggle = (day: DayOfWeekType) => {
    if (times.some(time => time.Day_of_week === day)) setTimes(times.filter(time => time.Day_of_week !== day))
    else setTimes([...times, { Day_of_week: day, Start_time: "", End_time: "" }])
  }

  const handleTimeChange = (day: DayOfWeekType, timeType: "Start_time" | "End_time" | "", newTime: string) => {
    setTimes(times.map(time =>
      time.Day_of_week === day ? { ...time, [timeType]: newTime } : time
    ))
  }

  interface DayProp {
    day: DayOfWeekType
  }

  const RenderPickStartTime: React.FC<DayProp> = ({ day }) => {
    return (
      <TimePicker
        className = "ml-3"
        onChange = {(value) => value && handleTimeChange(day, "Start_time", value)}
        value = {times.find(time => time.Day_of_week === day)?.Start_time}
      />
    )
  }

  const RenderPickEndTime: React.FC<DayProp> = ({ day }) => {
    return (
      <TimePicker
        className = "ml-3"
        onChange = {(value) => value && handleTimeChange(day, "End_time", value)}
        value = {times.find(time => time.Day_of_week === day)?.End_time}
      />
    )
  }

  const RenderPickTime = ({ times, day }: {times: AvailabilityDataType[], day: DayOfWeekType}) => {
    const matchedTime = times.find(time => time.Day_of_week === day)

    if (!matchedTime) return null

    return (
      <>
        <RenderPickStartTime day = {day}/>
        -
        <RenderPickEndTime day = {day} />
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
