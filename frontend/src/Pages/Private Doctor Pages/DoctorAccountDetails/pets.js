import React from "react";
import { Card, Button} from "react-bootstrap";
//import { handleCategoryChange } from "../../../Custom Hooks/Hooks for Account Details/select";
import { handleTogglePetType } from "../../../Custom Hooks/Hooks for Account Details/select";
import { savePets } from "../../../Custom Hooks/Hooks for Account Details/DoctorAccountDetails/saveDoctorAccountDetails";
import { handleAddPet } from "../../../Custom Hooks/Hooks for Account Details/add";
import { handleDeletePet } from "../../../Custom Hooks/Hooks for Account Details/delete";

export default function RenderPetsSection (props){
  return(
    <Card className="mb-3">
      <Card.Header>
        Services Pets
      </Card.Header>
      <Card.Body>
        {renderIsPets(props)}
      </Card.Body>
    </Card>
  );
};

//Does not work as intended
function renderIsPets (props) {
  const pet_types = {};
  if (props.listDetails[8]) {
    props.listDetails[8].forEach(pet_type => {
      if (!pet_types[pet_type.Pet_type]) {
        pet_types[pet_type.Pet_type] = [];
      }
      pet_types[pet_type.Pet_type].push(pet_type);
    });
  }
  
  if (Array.from(new Set(props.listDetails[8]?.map((item) => item.Category_name))).length) {
    return (
      <>
        {Object.entries(pet_types).map(([pet_type, pets]) => (
          <div key={pet_type} style={{ marginBottom: '10px' }}>
            {/* <input
              type="checkbox"
              id={category}
              name="category"
              checked={props.selectedpet_types.includes(category)}
              onChange={event => handleCategoryChange(event, category, services, props.selectedpet_types, props.setSelectedpet_types, props.servicedPets, props.setServicedPets, props.expandedpet_types, props.setExpandedpet_types)}
            /> */}
            <label htmlFor={pet_type}>{pet_type}</label>
            {pets.length > 1 && (
              <Button onClick={() => handleTogglePetType(pet_type, props.setExpandedPetTypes)}>Toggle</Button>
            )}
            {(pets.length <= 1 || props.expandedPetTypes.includes(pet_type)) && (
              <div>
                {pets.map(pet => {
                  return (
                    <div key={pet.pet_listID} style={{ paddingLeft: '20px' }}>
                      <input
                        type="checkbox"
                        id={`${pet_type}-${pet?.pet_listID}`}
                        name="pet"
                        value={pet?.pet_listID}
                        checked={props.servicedPets.find((serviced) => serviced.pet_listID === pet.pet_listID) !== undefined}
                        onChange={(event) => {
                          if(event.target.checked){
                            handleAddPet(pet, props.servicedPets, props.setServicedPets);
                          }else{
                            handleDeletePet(pet, props.servicedPets, props.setServicedPets)
                          }
                        }}
                        />
                      <label htmlFor={`${pet_type}-${pet.pet_listID}`}>{pet.Pet}</label>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
        <Button 
          variant="success" 
          onClick={() => savePets(props.servicedPets, props.setPetsConfirmation)}
        >
          Save
        </Button>
        <span className={`fade ${props.petsConfirmation.messageType ? 'show' : ''}`}>
          {props.petsConfirmation.messageType === 'saved' && 'Pets saved!'}
          {props.petsConfirmation.messageType === 'same' && 'Same Pet data!'}
          {props.petsConfirmation.messageType === 'problem' && 'Problem Saving Pets!'}
          {props.petsConfirmation.messageType === 'none' && 'No pets selected'}
        </span>
        </>
    )
  }else{
    return(
      <>
      Loading...
      </>
    )
  }
};
