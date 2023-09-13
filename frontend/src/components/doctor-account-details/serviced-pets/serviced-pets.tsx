import OpenClosePetType from "./open-close-pet-type"
import ShowPetsSection from "./show-pets-section"

type PetTypesType = {
  [key: string]: ServicedPetItem[]
}

interface Props {
  petTypes: PetTypesType
  expandedPetTypes: string[]
  setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>
  setPetsConfirmation: (conf: ConfirmationMessage) => void
}

export default function ServicedPets (props: Props) {
	const { petTypes, expandedPetTypes, setExpandedPetTypes, setPetsConfirmation } = props

	return (
		<>
			{Object.entries(petTypes).map(([petType, pets]) => (
				<div key = {petType} style = {{ marginBottom: "10px" }}>
					<label htmlFor = {petType}>{petType}</label>
					<OpenClosePetType
						pets = {pets}
						petType = {petType}
						expandedPetTypes = {expandedPetTypes}
						setExpandedPetTypes = {setExpandedPetTypes}
					/>
					<ShowPetsSection
						pets = {pets}
						petType = {petType}
						setPetsConfirmation = {setPetsConfirmation}
						expandedPetTypes = {expandedPetTypes}
					/>
				</div>
			))}
		</>
	)
}
