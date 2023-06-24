import _ from "lodash"
import { Card, Button} from "react-bootstrap";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handleTogglePetType } from "../../../custom-hooks/account-details-hooks/select";
import { savePets } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";

export default function RenderPetsSection (props) {
  return(
    <Card className = "mb-3">
      <Card.Header>
        Serviced Pets
      </Card.Header>
      <Card.Body>
        {RenderIsPets(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsPets (props) {
  const { listDetails, servicedPets, expandedPetTypes, setServicedPets, setExpandedPetTypes } = props;
  const [petsConfirmation, setPetsConfirmation] = useConfirmationMessage();

  const petTypes = {};
  if (listDetails.pets) {
    listDetails.pets.forEach(pet_type => {
      if (!petTypes[pet_type.Pet_type]) petTypes[pet_type.Pet_type] = [];
      petTypes[pet_type.Pet_type].push(pet_type);
    });
  }
  
  if (_.isEmpty(_.uniq(listDetails.pets?.map((item) => item.Category_name)))) return <>Loading...</>

  const renderMessageSection = () => {
    return (
      <span className = {`fade ${petsConfirmation.messageType ? 'show' : ''}`}>
        {petsConfirmation.messageType === 'saved' && 'Pets saved!'}
        {petsConfirmation.messageType === 'same' && 'Same Pet data!'}
        {petsConfirmation.messageType === 'problem' && 'Problem Saving Pets!'}
        {petsConfirmation.messageType === 'none' && 'No pets selected'}
      </span>
    )
  }

  const renderShowPetsSection = (pet_type, pets) => {
    return (
      <>
        {(pets.length <= 1 || expandedPetTypes.includes(pet_type)) && (
          <div>
            {pets.map(pet => {
              return (
                <div key = {pet.pet_listID} style = {{ paddingLeft: '20px' }}>
                  <input
                    type = "checkbox"
                    id = {`${pet_type}-${pet?.pet_listID}`}
                    name = "pet"
                    value = {pet?.pet_listID}
                    checked = {servicedPets.find((serviced) => serviced.pet_listID === pet.pet_listID) !== undefined}
                    onChange = {(event) => {
                      if (event.target.checked) {
                        const newServicedPets = [...servicedPets, pet]
                        setServicedPets([...servicedPets, pet])
                        savePets(pet.pet_listID, newServicedPets, setPetsConfirmation, 'add')
                      }
                      else {
                        const newServicedPets = servicedPets.filter(p => p.pet_listID !== pet.pet_listID);
                        setServicedPets(newServicedPets);
                        savePets(pet.pet_listID, newServicedPets, setPetsConfirmation, 'delete')                        
                      }
                    }}
                    />
                  <label htmlFor = {`${pet_type}-${pet.pet_listID}`}>{pet.Pet}</label>
                </div>
              )
            })}
          </div>
        )}
      </>
    )
  }

  return (
    <>
      {Object.entries(petTypes).map(([pet_type, pets]) => (
        <div key = {pet_type} style = {{ marginBottom: '10px' }}>
          <label htmlFor = {pet_type}>{pet_type}</label>
          {pets.length > 1 && (
            <Button onClick = {() => handleTogglePetType(pet_type, setExpandedPetTypes)}>Toggle</Button>
          )}
      {renderShowPetsSection(pet_type, pets)}
        </div>
      ))}
      {renderMessageSection()}
    </>
  )
};
