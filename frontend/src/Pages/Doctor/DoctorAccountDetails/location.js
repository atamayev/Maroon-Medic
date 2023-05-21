import React from "react";
import {Card, Accordion, Form, Button} from 'react-bootstrap';
import FormGroup from "../../../Components/form-group";
import { handleDeleteAccordion } from "../../../Custom Hooks/Hooks for Doctor Account Details/delete";
import { handleAddAccordion } from "../../../Custom Hooks/Hooks for Doctor Account Details/add";
import { saveLocation } from "../../../Custom Hooks/Hooks for Doctor Account Details/save";

export default function RenderLocationSection(props){
  return(
    <Card>
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
  const handleInputChange = (event, address_priority) => {
    const newAddresses = props.addresses.map(address => {
      if (address.address_priority === address_priority) {
        return { ...address, [event.target.name]: event.target.value }
      }
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
    }
    return true;
  }

  return (
    <>
      <Accordion>
        {props.addresses.map((address, index) => (
          <AddressAccordionItem 
          key={index} 
          address={address} 
          handleInputChange={(e) => handleInputChange(e, address.address_priority)}
          handleDeleteAccordion={() => handleDeleteAccordion(address.address_priority, props.addresses, props.setAddresses)}
          />
        ))}
      </Accordion>
      <Button variant="primary" onClick={()=> handleAddAccordion(props.addresses, props.setAddresses)}>Add Address</Button>
      <Button 
        variant="success" 
        disabled = {!areAllFieldsValid(props.addresses)}
        onClick={()=> saveLocation(props.addresses, props.setAddresses, props.setShowSavedLocationsMessage, props.setShowSameLocationsMessage, props.setShowSaveLocationsProblemMessage)}
        >
        Save</Button>
      <span className={`fade ${props.showSavedLocationsMessage ? 'show' : ''}`}>Locations saved!</span>
      <span className={`fade ${props.showSameLocationsMessage ? 'show' : ''}`}>Same Location data!</span>
      <span className={`fade ${props.showSaveLocationsProblemMessage ? 'show' : ''}`}>Problem Saving Locations!</span>
    </>
  );
};

const AddressAccordionItem = ({ address, handleInputChange, handleDeleteAccordion, addresses, setAddresses }) => (
  <Accordion.Item eventKey={address.address_priority}>
    <Accordion.Header>
      {address.address_title ? (address.address_title): ('Address #' + (address.address_priority + 1))}
      <Button variant="danger" size="sm" onClick={() => handleDeleteAccordion(address.address_priority, addresses, setAddresses)} style={{ float: 'right' }}>X</Button>
    </Accordion.Header>
    <Accordion.Body>
      <Form>
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
        <FormGroup
          className="mb-3"
          label = "Address line 2"
          type = "text"
          placeholder="Address line 2" 
          value={address.address_line_2}
          onChange={handleInputChange}
          name="address_line_2"
        />
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
      </Form>
    </Accordion.Body>
  </Accordion.Item>
);
