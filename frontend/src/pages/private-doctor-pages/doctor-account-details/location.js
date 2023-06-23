import React, {useEffect, useState} from "react";
import {Card, Accordion, Form, Button, Container, Row, Col} from 'react-bootstrap';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import "../../../styles/location.css"
import TimePicker from 'react-time-picker'
import FormGroup from "../../../components/form-group";
import { handleAddAccordion } from "../../../custom-hooks/account-details-hooks/add";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
// import { handleDeleteAccordion } from "../../../Custom Hooks/Hooks for Account Details/delete";
import { saveLocation } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";

export default function RenderLocationSection(props) {
  return(
    <Card className="mb-3">
      <Card.Header>
        Locations
      </Card.Header>
      <Card.Body>
        {AddressForm(props)}
      </Card.Body>
    </Card>
  );
};

function AddressForm(props) {
  const [addressesConfirmation, setAddressesConfirmation] = useConfirmationMessage();

  const handleInputChange = (event, address_priority) => {
    const newAddresses = props.addresses.map(address => {
      if (address.address_priority === address_priority) return { ...address, [event.target.name]: event.target.value } 
      return address;
    });
    props.setAddresses(newAddresses);
  };

  function areAllFieldsValid(addresses) {
    for (let address of addresses) {
      if (
        !address.address_title || 
        !address.address_line_1 || 
        !address.city ||
        !address.state ||
        !address.zip ||
        !address.country
      ) {
        return false;
      }
  
      // Check for days that are checked off (exist in times array)
      for (let time of address.times) {
        if (!time.Start_time || !time.End_time) return false;
      }
    }
    return true;
  }

  function areAllTimesValid(addresses) {
    for (let address of addresses) {
      for (let time of address.times) {
        if (new Date(`1970-01-01T${time.End_time}:00`) <= new Date(`1970-01-01T${time.Start_time}:00`)) return false;
      }
    }
    return true;
  }

  const renderMessageSection = () => {
    return (
      <span className={`fade ${addressesConfirmation.messageType ? 'show' : ''}`}>
        {addressesConfirmation.messageType === 'saved' && 'Locations saved!'}
        {addressesConfirmation.messageType === 'same' && 'Same Location data!'}
        {addressesConfirmation.messageType === 'problem' && 'Problem Saving Locations!'}
        {addressesConfirmation.messageType === 'none' && 'No locations selected'}
      </span>
    )
  }

  const renderAddressAccordionItems = () => {
    return (
      <>
        {props.addresses.sort((a, b) => a.address_priority - b.address_priority).map((address, index) => (
          <AddressAccordionItem 
            key={index} 
            index = {index}
            address={address} 
            handleInputChange={(e) => handleInputChange(e, address.address_priority)}
            handleDeleteAccordion={() => props.setAddresses(props.addresses.filter(addressf => addressf.address_priority !== address.address_priority))}
            addresses = {props.addresses}
            setAddresses = {props.setAddresses}
          />
        ))}
      </>
    )
  }

  const renderAddNewLocationButton = () => {
    return (
      <Button 
        variant="primary" 
        onClick={()=> handleAddAccordion(props.addresses, props.setAddresses)} 
        style={{ marginRight: '10px' }}
      >
        Add New Location
      </Button>
    )
  }

  const renderSaveLocationsButton = () => {
    return (
      <Button 
        variant="success" 
        disabled={!areAllFieldsValid(props.addresses) || !areAllTimesValid(props.addresses)} // Check for both field and time validity
        onClick={()=> saveLocation(props.addresses, props.setAddresses, setAddressesConfirmation)}
      >
        Save
      </Button>
    )
  }

  return (
    <>
      <Accordion >
        {renderAddressAccordionItems()}
      </Accordion>
      {renderAddNewLocationButton()}
      {renderSaveLocationsButton()}
      {renderMessageSection()}
    </>
  );
};

const AddressAccordionItem = ({ index, address, handleInputChange, handleDeleteAccordion, addresses, setAddresses }) => {
  const handlePublicStatusToggleChange = (addressPriority) => {
    // Create a copy of the addresses state
    const updatedAddresses = [...addresses];
    // Find the index of the address object with the matching priority
    const addressIndex = updatedAddresses.findIndex(addr => addr.address_priority === addressPriority);
    // Toggle the public status
    updatedAddresses[addressIndex].address_public_status = updatedAddresses[addressIndex].address_public_status === 1 ? 0 : 1;
    // Update the state
    setAddresses(updatedAddresses);
  };

  const handleInstantBookToggleChange = (addressPriority) => {
    // Create a copy of the addresses state
    const updatedAddresses = [...addresses];
    // Find the index of the address object with the matching priority
    const addressIndex = updatedAddresses.findIndex(addr => addr.address_priority === addressPriority);
    // Toggle the public status
    updatedAddresses[addressIndex].instant_book = updatedAddresses[addressIndex].instant_book === 1 ? 0 : 1;
    // Update the state
    setAddresses(updatedAddresses);
  };

  const renderAddressTitleSection = () => {
    if (address.address_title) return address.address_title
    return ('Address #' + (index + 1))
  }

  const renderPublicStatus = () => {
    return (
      <>
        <span>Public Status:</span>
        <div onClick={(event) => event.stopPropagation()}>
          <Toggle 
            id={address.address_priority} 
            checked={address.address_public_status === 1} 
            onChange={() => handlePublicStatusToggleChange(address.address_priority)} 
          />
        </div>
      </>
    )
  }

  const renderInstantBook = () => {
    return (
      <>
        <span>Instant book:</span>
        <div onClick={(event) => event.stopPropagation()}>
          <Toggle 
            id={address.address_priority} 
            checked={address.instant_book === 1} 
            onChange={() => handleInstantBookToggleChange(address.address_priority)} 
          />
        </div>
      </>
    )
  }

  const renderAccordionHeader = () => {
    return (
      <Accordion.Header>
        <Container>
          <Row>
            <Col xs={4} className="d-flex align-items-center">
              {renderPublicStatus()}
              {renderInstantBook()}
            </Col>
            <Col xs={4} className="text-center font-weight-bold">
                {renderAddressTitleSection()}
            </Col>
            <Col xs={4} className="text-right">
                <Button variant="danger" size="sm" onClick={() => handleDeleteAccordion(address.address_priority, addresses, setAddresses)} style={{ float: 'right' }}>Delete Location</Button>
            </Col>
          </Row>
        </Container>
      </Accordion.Header>
    )
  }

  const renderAddressTitleInput = () => {
    return (
      <div className="col-md-3">
        <FormGroup
          className="mb-3"
          label = "Address Title"
          type = "text"
          placeholder="Address Title" 
          required
          value={address.address_title}
          onChange={handleInputChange}
          name="address_title"
        />
      </div>
    )
  }

  const renderAddressLine1Input = () => {
    return (
      <div className="col-md-3">
        <FormGroup
          className="mb-3"
          label = "Address line 1"
          type = "text"
          placeholder="Address line 1" 
          required
          value={address.address_line_1}
          onChange={handleInputChange}
          name="address_line_1"
        />
      </div>
    )
  }

  const renderAddressLine2Input = () => {
    return (
      <div className="col-md-3">
        <FormGroup
          className="mb-3"
          label = "Address line 2"
          type = "text"
          placeholder="Address line 2" 
          value={address.address_line_2}
          onChange={handleInputChange}
          name="address_line_2"
        />
      </div>
    )
  }

  const renderCityInput = () => {
    return (
      <div className="col-md-3">
        <FormGroup
          className="mb-3"
          label = "City"
          type = "text"
          placeholder="City" 
          required
          value={address.city}
          onChange={handleInputChange}
          name="city"
        />
      </div>
    )
  }

  const renderStateInput = () => {
    return (
      <div className="col-md-3">
        <FormGroup
          className="mb-3"
          label = "State"
          type = "text"
          placeholder="State" 
          required
          value={address.state}
          onChange={handleInputChange}
          name="state"
        />
      </div>
    )
  }

  const renderZipCodeInput = () => {
    return (
      <div className="col-md-3">
        <FormGroup
        className="mb-3"
        label = "Zip Code"
        type = "number"
        placeholder="Zip Code" 
        required
        value={address.zip}
        onChange={handleInputChange}
        name="zip"
      />
      </div>
    )
  }

  const renderCountryInput = () => {
    return (
      <div className="col-md-3">
        <FormGroup
          className="mb-3"
          label = "Country"
          type = "text"
          placeholder="Country" 
          required
          value={address.country}
          onChange={handleInputChange}
          name="country"
        />  
      </div>
    )
  }

  const renderPhoneNumberInput = () => {
    return (
      <div className="col-md-3">
        <FormGroup
          className="mb-3"
          label = "Phone Number"
          type = "number"
          placeholder="Phone Number" 
          required
          value={address.phone}
          onChange={handleInputChange}
          name="phone"
        />
      </div>
    )
  }

  const renderLocationMapData = () => {
    return (
      <div className="col-md-6">
        Google Maps Placeholder
      </div>
    )
  }

  return(
    <Accordion.Item eventKey={address.address_priority} style={{ marginBottom: '10px' }}>
      {renderAccordionHeader()}
      <Accordion.Body>
        <Form>
          <div className="row">
            {renderAddressTitleInput()}
            {renderAddressLine1Input()}
            {renderAddressLine2Input()}
            {renderCityInput()}
          </div>

          <div className="row">
            {renderStateInput()}
            {renderZipCodeInput()}
            {renderCountryInput()}
            {renderPhoneNumberInput()}
          </div>

          <div className="row">
            {renderLocationMapData()}
            <div className="col-md-6">
            <WeekDays times={address.times} setTimes={(newTimes) => handleInputChange({ target: { name: 'times', value: newTimes } }, address.address_priority)} />
            </div>
          </div>

        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const WeekDays = ({ times, setTimes}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!times)
  }, [times])

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayToggle = (day) => {
    if (times.some(time => time.Day_of_week === day)) setTimes(times.filter(time => time.Day_of_week !== day));
    else setTimes([...times, { Day_of_week: day, Start_time: '', End_time: '' }]);
  };

  const handleTimeChange = (day, timeType, newTime) => {
    setTimes(times.map(time =>
      time.Day_of_week === day ? { ...time, [timeType]: newTime } : time
    ));
  }

  if (loading) return <div>Loading...</div>

  const renderPickStartTime = (day) => {
    return (
      <TimePicker
        className = "ml-3"
        onChange={(value) => handleTimeChange(day, 'Start_time', value)}
        value={times.find(time => time.Day_of_week === day).Start_time}
      />
    )
  }

  const renderPickEndTime = (day) => {
    return (
      <TimePicker
        className = "ml-3"
        onChange={(value) => handleTimeChange(day, 'End_time', value)}
        value={times.find(time => time.Day_of_week === day).End_time}
      />
    )
  }
  
  return (
    <div>
      {daysOfWeek.map((day) => (
        <div key={day} className="mb-3 d-flex align-items-center">
          <label className="mr-3">{day}</label>
          <Toggle id={day} checked={times.some(time => time.Day_of_week === day)} onChange={() => handleDayToggle(day)} />
          {times.find(time => time.Day_of_week === day) && (
            <>
            {renderPickStartTime(day)}
              -
            {renderPickEndTime(day)}
            </>
          )}
        </div>
      ))}
    </div>
  )
};
