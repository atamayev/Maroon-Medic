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
  const handleInputChange = (event, id) => {
    const newAddresses = props.addresses.map(address => {
      if (address.id === id) {
        return { ...address, [event.target.name]: event.target.value }
      }
      return address;
    });
    props.setAddresses(newAddresses);
  };

  function areAllFieldsValid(addresses) {
    for (let address of addresses) {
      if (
        !address.addressTitle || 
        !address.addressLine1 || 
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
      <Accordion defaultActiveKey={0}>
        {props.addresses.map((address, index) => (
          <AddressAccordionItem 
          key={index} 
          address={address} 
          handleInputChange={(e) => handleInputChange(e, address.id)}
          handleDeleteAccordion={() => handleDeleteAccordion(address.id, props.addresses, props.setAddresses)}
          />
        ))}
      </Accordion>
      <Button variant="primary" onClick={()=> handleAddAccordion(props.addresses, props.setAddresses)}>Add Address</Button>
      <Button 
        variant="success" 
        onClick={()=> saveLocation(props.addresses, props.setShowSavedLocationMessage)}
        disabled={!areAllFieldsValid(props.addresses)} // Disable button if not all fields are valid
      >
        Save
      </Button>
      <span className={`fade ${props.showSavedLocationMessage ? 'show' : ''}`}> Locations saved!</span>
    </>
  );
};

const AddressAccordionItem = ({ address, handleInputChange, handleDeleteAccordion, addresses, setAddresses }) => (
  <Accordion.Item eventKey={address.id}>
    <Accordion.Header>
      {address.addressTitle ? (address.addressTitle): ('Address #' + (address.id + 1))}
      <Button variant="danger" size="sm" onClick={() => handleDeleteAccordion(address.id, addresses, setAddresses)} style={{ float: 'right' }}>X</Button>
    </Accordion.Header>
    <Accordion.Body>
      <Form>
        <FormGroup
            className="mb-3"
            label = "Address Title"
            type = "text"
            placeholder="Address Title" 
            required
            value={address.addressTitle}
            onChange={handleInputChange}
            name="addressTitle"  // add this line
        />
        <FormGroup
          className="mb-3"
          label = "Address line 1"
          type = "text"
          placeholder="Address line 1" 
          required
          value={address.addressLine1}
          onChange={handleInputChange}
          name="addressLine1"  // add this line
        />
        <FormGroup
          className="mb-3"
          label = "Address line 2"
          type = "text"
          placeholder="Address line 2" 
          value={address.addressLine2}
          onChange={handleInputChange}
          name="addressLine2"
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
