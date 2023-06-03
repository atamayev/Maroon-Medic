import React from 'react';
import { Form, Button, Card,Container, Row, Col } from 'react-bootstrap';
import FormGroup from '../../../Components/form-group';
import { saveMyPets } from '../../../Custom Hooks/Hooks for My Pets/saveMyPets';
import { handleDeletePet } from '../../../Custom Hooks/Hooks for My Pets/delete';

const AddPet = (props) => {
  const handleInputChange = (event) => {
    let value = event.target.value;
  
    if(event.target.name === "petType") {
      let parsedValue = JSON.parse(value);
      let newPet = { 
        ...props.petData[0], 
        petType: parsedValue.petType, 
        pet_listID: parsedValue.pet_listID 
      };
      props.setPetData([newPet]);
    } else {
      let newPet = { ...props.petData[0], [event.target.name]: value };
      props.setPetData([newPet]);
    }
  };
  
  function areAllFieldsValid(petData) {
    //console.log(petData)
    if(!petData.length) return false
    for (let pet of petData) {
      if (
        !pet.Name || 
        !pet.Gender || 
        !pet.DOB ||
        !pet.petType
      ) {
        return false;
      }
    }
    return true;
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
                  handleDeletePet(props.petData[props.petData.length - 1].pet_infoID, props.petData, props.setPetData)
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
              //value={props.petData[0].name}
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
              //value={props.petData[0].DOB}
              name="DOB"
            />
              
              <Form.Group id="formPetType">
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" value={JSON.stringify({ pet_listID: props.petData[0]?.pet_listID, petType: props.petData[0]?.petType })} onChange={handleInputChange} name="petType">
                  {props.petTypes.map((petType, index) => (
                    <option key={index} value={JSON.stringify({ pet_listID: petType.pet_listID, petType: petType.Pet })}>{petType.Pet}</option>
                  ))}
                </Form.Control>

              </Form.Group>
              
              Upload image area <br/>

              <Button 
                variant="primary" 
                type="submit"
                disabled={!areAllFieldsValid(props.petData)} // Check for both field validity
                onClick={(e) => {
                  e.preventDefault();
                  saveMyPets(props.petData, props.setPetData, props.setServicesConfirmation, 'add');
                }}
              >
                Add {props.petData[0].Name ? (<>{props.petData[0].Name}</>) : (<>Pet</>)}
              </Button>
          </Form>
          <span className={`fade ${props.servicesConfirmation.messageType ? 'show' : ''}`}>
            {props.servicesConfirmation.messageType === 'saved' && 'Pet Data saved!'}
            {props.servicesConfirmation.messageType === 'same' && 'Same Pet Data!'}
            {props.servicesConfirmation.messageType === 'problem' && 'Problem Saving Pet Data!'}
            {props.servicesConfirmation.messageType === 'none' && 'No Pet Data Entered'}
          </span>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddPet;
