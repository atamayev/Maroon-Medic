import React from 'react';
import { Form, Button, Card,Container, Row, Col } from 'react-bootstrap';
import FormGroup from '../../../components/form-group';
import { addMyPets } from '../../../custom-hooks/my-pets-hooks/save-my-pets';

export const AddPet = (props) => {
  const handleInputChange = (event) => {
    let value = event.target.value;
  
    if (event.target.name === "petType") {
      // Find the selected pet type by its ID
      let selectedPetType = props.petTypes.find(petType => petType.pet_listID === JSON.parse(value));
      let newPet = {
        ...props.newPetData, 
        petType: selectedPetType.Pet, 
        pet_listID: selectedPetType.pet_listID 
      };
  
      props.setNewPetData(newPet);
    } else if (event.target.name === "insurance") {
      // Find the selected pet type by its ID
      let selectedInsurance = props.insurances.find(insurance => insurance.insurance_listID === JSON.parse(value));
      let newPet = {
        ...props.newPetData, 
        insuranceName: selectedInsurance.Insurance_name, 
        insurance_listID: selectedInsurance.insurance_listID 
      };
  
      props.setNewPetData(newPet);
    } 
    else {
      let newPet = { ...props.newPetData, [event.target.name]: value };
      props.setNewPetData(newPet);
    }
  };
  
  function areAllFieldsValid(petData) {
    if (
      !petData.Name || 
      !petData.Gender || 
      !petData.DOB ||
      !petData.petType ||
      !petData.insuranceName
    ) {
      return false;
    }
    return true;
  }

  const renderNewPetName = () => {
    if (!props.newPetData.Name) return <>Pet</>
    return <>{props.newPetData.Name}</>
  }

  const renderDeleteButton = () => {
    return (
      <Button variant="danger" onClick={() => 
        {
          props.setNewPetData({})
          props.setShowAddPet(false)
        }}
      >
        X
      </Button>
    )
  }

  const renderNameSection = () => {
    return (
      <FormGroup
        id="formPetName"
        className={'mb-3'}
        label = "Pet Name:"
        type="text"
        onChange={handleInputChange}
        name="Name"
      />
    )
  }

  const renderGenderSection = () => {
    return (
      <Form.Group id="formPetGender">
        <Form.Label>Gender</Form.Label>
        <Form.Check type="radio" label="Male" name="Gender" value="Male" onChange={handleInputChange} />
        <Form.Check type="radio" label="Female" name="Gender" value="Female" onChange={handleInputChange} />
      </Form.Group>
    )
  }

  const renderDOBSection = () => {
    return (
      <FormGroup
        id="formPetDob"
        className={'mb-3'}
        label = "Date of Birth"
        type="date"
        onChange={handleInputChange}
        name="DOB"
      />
    )
  }

  const renderPetTypeSection = () => {
    return (
      <Form.Group id="formPetType">
        <Form.Label>Type of Pet</Form.Label>
        <Form.Control
          as="select"
          defaultValue={""}
          onChange={handleInputChange}
          name="petType"
          required
        >
          <option value="" disabled>Select</option>
          {props.petTypes.map((petType, index) => (
            <option
              key={index}
              value={petType.pet_listID}
            >
              {petType.Pet}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    )
  }

  const renderInsuranceSection = () => {
    return (
      <Form.Group id="formInsurance">
        <Form.Label>Insurance</Form.Label>
        <Form.Control
          as = "select"
          defaultValue = {""}
          onChange = {handleInputChange}
          name = "insurance"
          required
        >
          <option value="" disabled>Select</option>
          {props.insurances.map((insurance, index) => (
            <option
              key = {index}
              value = {insurance.insurance_listID}
            >
              {insurance.Insurance_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    )
  }

  const renderAddButton = () => {
    return (
      <div>
        <Button 
          variant="primary" 
          type="submit"
          disabled={!areAllFieldsValid(props.newPetData)} // Check for both field validity
          onClick={(e) => {
            e.preventDefault();
            addMyPets(props.newPetData, props.setNewPetData, props.setPetConfirmation, props.savedPetData, props.setSavedPetData, props.setShowAddPet);
          }}
        > 
          Add {renderNewPetName()}
        </Button>
      </div>
    )
  }

  const renderMessageSection = () => {
    return (
      <span className={`fade ${props.petConfirmation.messageType ? 'show' : ''}`}>
        {props.petConfirmation.messageType === 'saved' && 'Pet Data saved!'}
        {props.petConfirmation.messageType === 'same' && 'Same Pet Data!'}
        {props.petConfirmation.messageType === 'problem' && 'Problem Saving Pet Data!'}
        {props.petConfirmation.messageType === 'none' && 'No Pet Data Entered'}
      </span>
    )
  }

  return (
    <>
      <Card>
        <Container>
          <Row>
            <Col xs={8}></Col>
            <Col xs={4} className=''>
              {renderDeleteButton()}
            </Col>
          </Row>
        </Container>
        <Card.Body>
          <Form>
            {renderNameSection()}

            {renderGenderSection()}

            {renderDOBSection()}
            
            {renderPetTypeSection()}

            {renderInsuranceSection()}
            
            Upload image area
            {renderAddButton()}
          </Form>
          {renderMessageSection()}
        </Card.Body>
      </Card>
    </>
  );
};
