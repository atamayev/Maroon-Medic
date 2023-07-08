import _ from "lodash"
import { useCallback } from "react";
import { Card, Button} from "react-bootstrap";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handleTogglePetType } from "../../../custom-hooks/account-details-hooks/select";
import { savePets } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";
import { renderMessageSection } from "../../../components/saved-message-section";

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

  const isTogglePetType = (pets, pet_type) => {
    if (pets.length <= 1) return null;

    const isOpen = expandedPetTypes.includes(pet_type);
    const renderIsOpen = () => {
      if (isOpen) return '^';
      return 'v';
    }

    return (
      <Button onClick={() => handleTogglePetType(pet_type, setExpandedPetTypes)}>
        {renderIsOpen()}
      </Button>
    );
  }

  const handleCheckboxChange = useCallback((event, pet) => {
    if (event.target.checked) {
      const newServicedPets = [...servicedPets, pet]
      setServicedPets(newServicedPets)
      savePets(pet.pet_listID, newServicedPets, setServicedPets, setPetsConfirmation, 'add')
    }
    else {
      const newServicedPets = servicedPets.filter(p => p.pet_listID !== pet.pet_listID);
      setServicedPets(newServicedPets);
      savePets(pet.pet_listID, newServicedPets, setServicedPets, setPetsConfirmation, 'delete')
    }
  }, [servicedPets, setServicedPets, setPetsConfirmation]);

  const renderShowPetsSection = (pets, pet_type) => {
    if (pets.length > 1 && !expandedPetTypes.includes(pet_type)) return null;

    return (
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
                onChange = {(event) => {handleCheckboxChange(event, pet)}}
              />
              <label htmlFor = {`${pet_type}-${pet.pet_listID}`}>{pet.Pet}</label>
            </div>
          )
        })}
      </div>
    )
  }

  if (_.isEmpty(_.uniq(listDetails.pets?.map((item) => item.Category_name)))) return <>Loading...</>

  return (
    <>
      {Object.entries(petTypes).map(([pet_type, pets]) => (
        <div key = {pet_type} style = {{ marginBottom: '10px' }}>
          <label htmlFor = {pet_type}>{pet_type}</label>
          {isTogglePetType(pets, pet_type)}
          {renderShowPetsSection(pets, pet_type)}
        </div>
      ))}
      {renderMessageSection(petsConfirmation, 'Pets')}
    </>
  )
};
