import React from 'react';
import { Form, Button, Card,Container, Row, Col } from 'react-bootstrap';
import FormGroup from '../../../Components/form-group';
import { addMyPets } from '../../../Custom Hooks/Hooks for My Pets/saveMyPets';

const AddPet = (props) => {
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
    } else {
      let newPet = { ...props.newPetData, [event.target.name]: value };
      props.setNewPetData(newPet);
    }
  };
  
  function areAllFieldsValid(petData) {
    if (
      !petData.Name || 
      !petData.Gender || 
      !petData.DOB ||
      !petData.petType
    ) {
      return false;
    }
    return true;
  }

  const renderNewPetName = () => {
    if (!props.newPetData.Name) return <>Pet</>
    return <>{props.newPetData.Name}</>
  }

  return (
    <>
      <Card>
        <Container>
          <Row>
            <Col xs={8}></Col>
            <Col xs={4} className=''>
              <Button variant="danger" onClick={() => 
                {
                  props.setNewPetData({})
                  props.setShowAddPet(false)
                }}
              >X</Button>
            </Col>
          </Row>
        </Container>
        <Card.Body>
          <Form>
            <FormGroup
              id="formPetName"
              className={'mb-3'}
              label = "Pet Name:"
              type="text"
              onChange={handleInputChange}
              name="Name"
            />

            <Form.Group id="formPetGender">
              <Form.Label>Gender</Form.Label>
              <Form.Check type="radio" label="Male" name="Gender" value="Male" onChange={handleInputChange} />
              <Form.Check type="radio" label="Female" name="Gender" value="Female" onChange={handleInputChange} />
            </Form.Group>

            <FormGroup
              id="formPetDob"
              className={'mb-3'}
              label = "Date of Birth"
              type="date"
              onChange={handleInputChange}
              name="DOB"
            />
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
            Upload image area 
            <br/>
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
          </Form>
          <span className={`fade ${props.petConfirmation.messageType ? 'show' : ''}`}>
            {props.petConfirmation.messageType === 'saved' && 'Pet Data saved!'}
            {props.petConfirmation.messageType === 'same' && 'Same Pet Data!'}
            {props.petConfirmation.messageType === 'problem' && 'Problem Saving Pet Data!'}
            {props.petConfirmation.messageType === 'none' && 'No Pet Data Entered'}
          </span>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddPet;
