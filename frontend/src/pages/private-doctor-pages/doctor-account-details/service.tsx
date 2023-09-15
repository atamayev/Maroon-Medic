import { observer } from "mobx-react"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import ServiceList from "src/components/doctor-account-details/service/service-list"
import AccountDetailsCard from "src/components/account-details-card"

interface Props {
	expandedCategories: string[]
	setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ServiceSection (props: Props) {
	return (
		<AccountDetailsCard
			title = "Vet Services"
			content = {<VetServices {...props} />}
		/>
	)
}

function VetServices (props: Props) {
	const { expandedCategories, setExpandedCategories } = props
	const [servicesConfirmation, setServicesConfirmation] = useConfirmationMessage()

	return (
		<>
			<ServiceList
				expandedCategories = {expandedCategories}
				setExpandedCategories = {setExpandedCategories}
				setServicesConfirmation = {setServicesConfirmation}
			/>

			<SavedConfirmationMessage
				confirmationMessage = {servicesConfirmation}
				whatIsBeingSaved = "Services"
			/>
		</>
	)
}

observer(VetServices)
