import _ from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import usePetsCheckboxChange from "src/custom-hooks/account-details/callbacks/use-pets-checkbox-change"

interface Props {
	pets: ServicedPetItem[]
	petType: string
	setPetsConfirmation: (conf: ConfirmationMessage) => void
	expandedPetTypes: string[]
}

function ShowPetsSection (props: Props) {
	const { pets, petType, setPetsConfirmation, expandedPetTypes } = props
	const { doctorAccountDetails } = useContext(AppContext)

	const handleCheckboxChange = usePetsCheckboxChange(doctorAccountDetails?.servicedPets, setPetsConfirmation)

	if (
		_.isNull(doctorAccountDetails) ||
		(pets.length > 1 && !expandedPetTypes.includes(petType))
	) return null

	return (
		<div>
			{pets.map((pet) => (
				<div key = {pet.petListId} style = {{ paddingLeft: "20px" }}>
					<input
						type = "checkbox"
						id = {`${petType}-${pet.petListId}`}
						name = "pet"
						value = {pet.petListId}
						checked = {doctorAccountDetails.servicedPets.find((serviced) => serviced.petListId === pet.petListId) !== undefined}
						onChange = {(event) => {handleCheckboxChange(event, pet)}}
					/>
					<label htmlFor = {`${petType}-${pet.petListId}`}>{pet.pet}</label>
				</div>
			))}
		</div>
	)
}

export default observer(ShowPetsSection)
