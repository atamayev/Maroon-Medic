import IsTogglePetType from "./is-toggle-pet-type"
import ShowPetsSection from "./show-pets-section"

type PetTypesType = {
  [key: string]: ServicedPetItem[]
}

interface Props {
  petTypes: PetTypesType
  servicedPets: ServicedPetItem[]
  expandedPetTypes: string[]
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>
  setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>
  setPetsConfirmation: (conf: ConfirmationMessage) => void
}

const Pets = (props: Props) => {
	const { petTypes, servicedPets, expandedPetTypes, setServicedPets,
		setExpandedPetTypes, setPetsConfirmation } = props

	return (
		<>
			{Object.entries(petTypes).map(([petType, pets]) => (
				<div key = {petType} style = {{ marginBottom: "10px" }}>
					<label htmlFor = {petType}>{petType}</label>
					<IsTogglePetType
						pets = {pets}
						petType = {petType}
						expandedPetTypes = {expandedPetTypes}
						setExpandedPetTypes = {setExpandedPetTypes}
					/>
					<ShowPetsSection
						pets = {pets}
						petType = {petType}
						servicedPets = {servicedPets}
						setServicedPets = {setServicedPets}
						setPetsConfirmation = {setPetsConfirmation}
						expandedPetTypes = {expandedPetTypes}
					/>
				</div>
			))}
		</>
	)
}

export default Pets
