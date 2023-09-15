import { observer } from "mobx-react"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import ServicedPets from "src/components/doctor-account-details/serviced-pets/serviced-pets"
import AccountDetailsCard from "src/components/account-details-card"

interface Props {
	expandedPetTypes: string[]
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
	const { expandedPetTypes, setExpandedPetTypes } = props
	const [petsConfirmation, setPetsConfirmation] = useConfirmationMessage()

	return (
		<>
			<ServicedPets
				expandedPetTypes = {expandedPetTypes}
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
