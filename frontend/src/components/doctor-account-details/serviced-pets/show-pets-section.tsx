import usePetsCheckboxChange from "src/custom-hooks/account-details/callbacks/use-pets-checkbox-change"

interface Props {
	pets: ServicedPetItem[]
	petType: string
	servicedPets: ServicedPetItem[]
	setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>
	setPetsConfirmation: (conf: ConfirmationMessage) => void
	expandedPetTypes: string[]
}

export default function ShowPetsSection (props: Props) {
	const { pets, petType, servicedPets, setServicedPets, setPetsConfirmation, expandedPetTypes } = props

	const handleCheckboxChange = usePetsCheckboxChange(servicedPets, setServicedPets, setPetsConfirmation)

	if (pets.length > 1 && !expandedPetTypes.includes(petType)) return null

	return (
		<div>
			{pets.map((pet) => (
				<div key = {pet.petListId} style = {{ paddingLeft: "20px" }}>
					<input
						type = "checkbox"
						id = {`${petType}-${pet.petListId}`}
						name = "pet"
						value = {pet.petListId}
						checked = {servicedPets.find((serviced) => serviced.petListId === pet.petListId) !== undefined}
						onChange = {(event) => {handleCheckboxChange(event, pet)}}
					/>
					<label htmlFor = {`${petType}-${pet.petListId}`}>{pet.pet}</label>
				</div>
			))}
		</div>
	)
}
