import React from "react";
import { Card, Button} from "react-bootstrap";
import { handleTogglePetType } from "../../../Custom Hooks/Hooks for Account Details/select";
import { savePets } from "../../../Custom Hooks/Hooks for Account Details/DoctorAccountDetails/saveDoctorAccountDetails";
import { useConfirmationMessage } from "../../../Custom Hooks/useConfirmationMessage";

export default function RenderPetsSection (props) {
  return(
    <Card className="mb-3">
      <Card.Header>
        Services Pets
      </Card.Header>
      <Card.Body>
        {RenderIsPets(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsPets (props) {
  const [petsConfirmation, setPetsConfirmation] = useConfirmationMessage();

  const pet_types = {};
  if (props.listDetails[8]) {
    props.listDetails[8].forEach(pet_type => {
      if (!pet_types[pet_type.Pet_type]) pet_types[pet_type.Pet_type] = [];
      pet_types[pet_type.Pet_type].push(pet_type);
    });
  }
  
  if (!Array.from(new Set(props.listDetails[8]?.map((item) => item.Category_name))).length) return <>Loading...</>

  return (
    <>
      {Object.entries(pet_types).map(([pet_type, pets]) => (
        <div key={pet_type} style={{ marginBottom: '10px' }}>
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
                        if (event.target.checked) {
                          const newServicedPets = [...props.servicedPets, pet]
                          props.setServicedPets([...props.servicedPets, pet])
                          savePets(pet.pet_listID, newServicedPets, setPetsConfirmation, 'add')
                        }
                        else {
                          const newServicedPets = props.servicedPets.filter(p => p.pet_listID !== pet.pet_listID);
                          props.setServicedPets(newServicedPets);
                          savePets(pet.pet_listID, newServicedPets, setPetsConfirmation, 'delete')                        
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
      <span className={`fade ${petsConfirmation.messageType ? 'show' : ''}`}>
        {petsConfirmation.messageType === 'saved' && 'Pets saved!'}
        {petsConfirmation.messageType === 'same' && 'Same Pet data!'}
        {petsConfirmation.messageType === 'problem' && 'Problem Saving Pets!'}
        {petsConfirmation.messageType === 'none' && 'No pets selected'}
      </span>
    </>
  )
};
