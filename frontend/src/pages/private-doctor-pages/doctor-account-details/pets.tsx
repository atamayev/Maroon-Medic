import _ from "lodash"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import Pets from "src/components/doctor-account-details/pets/pets"
import AccountDetailsCard from "src/components/account-details-card"

interface Props {
  listDetails: DoctorListDetails
  servicedPets: ServicedPetItem[]
  expandedPetTypes: string[]
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>
  setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>
}

export default function PetsSection (props: Props) {
	return (
		<AccountDetailsCard
			title = "Serviced Pets"
			content = {<PetsServiced {...props} />}
		/>
	)
}

function PetsServiced (props: Props) {
	const { listDetails, servicedPets, expandedPetTypes, setServicedPets, setExpandedPetTypes } = props
	const [petsConfirmation, setPetsConfirmation] = useConfirmationMessage()

  type PetTypesType = {
    [key: string]: ServicedPetItem[]
  }

  const petTypes: PetTypesType = {}
  if (listDetails.pets) {
  	listDetails.pets.forEach(petType => {
  		if (!petTypes[petType.Pet_type]) petTypes[petType.Pet_type] = []
  		petTypes[petType.Pet_type].push(petType)
  	})
  }

  if (_.isEmpty(_.uniq(listDetails.pets.map((item) => item.Pet_type)))) return <>Loading...</>

  return (
  	<>
  		<Pets
  			petTypes = {petTypes}
  			servicedPets = {servicedPets}
  			expandedPetTypes = {expandedPetTypes}
  			setServicedPets = {setServicedPets}
  			setExpandedPetTypes = {setExpandedPetTypes}
  			setPetsConfirmation = {setPetsConfirmation}
  		/>
  		<SavedConfirmationMessage
  			confirmationMessage = {petsConfirmation}
  			whatIsBeingSaved = "Pets Serviced"
  		/>
  	</>
  )
}
