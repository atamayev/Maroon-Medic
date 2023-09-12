import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import ServicedPets from "src/components/doctor-account-details/serviced-pets/serviced-pets"
import AccountDetailsCard from "src/components/account-details-card"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
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
	const { servicedPets, expandedPetTypes, setServicedPets, setExpandedPetTypes } = props
	const { doctorLists } = useContext(AppContext)
	const [petsConfirmation, setPetsConfirmation] = useConfirmationMessage()

	type PetTypesType = {
		[key: string]: ServicedPetItem[]
	}

	if (
		_.isNull(doctorLists) ||
		_.isEmpty(_.uniq(doctorLists.pets.map((item) => item.petType)))
	) return <>Loading...</>

	const petTypes: PetTypesType = {}

	doctorLists.pets.forEach(petType => {
		if (!petTypes[petType.petType]) petTypes[petType.petType] = []
		petTypes[petType.petType].push(petType)
	})

	return (
		<>
			<ServicedPets
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

observer(PetsSection)
