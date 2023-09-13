import Button from "src/components/button"
import updateServices from "src/helper-functions/account-details/save/doctor-account-details/update-services"
import addServices from "src/helper-functions/account-details/save/doctor-account-details/add-services"
import deleteServices from "src/helper-functions/account-details/save/doctor-account-details/delete-services"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	service: ServiceListItem
	selectedServices: ServiceItemNullablePrice[]
	setServicesConfirmation: (conf: ConfirmationMessage) => void
	setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>>
}

export default function ServiceActionButton (props: Props) {
	const { service, selectedServices, setServicesConfirmation, setSelectedServices } = props
	const { doctorAccountDetails } = useContext(AppContext)

	const selectedService =
		selectedServices.find(
			s => s.serviceAndCategoryListId === service.serviceAndCategoryListId
		) as ServiceItemNotNullablePrice | undefined
	const providedService = doctorAccountDetails?.services.find(s => s.serviceAndCategoryListId === service.serviceAndCategoryListId)

	const isSelected = selectedService !== undefined
	const isProvided = providedService !== undefined

	// check if service time and price are filled
	const isFilled = isSelected && selectedService.serviceTime && selectedService.servicePrice

	function DeleteServiceButton () {
		return (
			<Button
				onClick = {() => deleteServices(
					selectedService!,
					setServicesConfirmation,
					setSelectedServices
				)}
				title = "Delete"
				colorClass = "bg-red-600"
				hoverClass = "hover:bg-red-700"
				textColor = "text-white"
				className = "my-1 mr-1"
			/>
		)
	}

	function UpdateServiceButton () {
		return (
			<Button
				onClick = {() => updateServices(selectedService!, setServicesConfirmation)}
				title = "Update"
				colorClass = "bg-amber-600"
				hoverClass = "hover:bg-amber-700"
				textColor = "text-white"
				className = "my-1 mr-1"
			/>
		)
	}

	function AddServiceButton () {
		return (
			<Button
				onClick = {() => addServices(selectedService!, setServicesConfirmation)}
				title = "Add"
				colorClass = "bg-green-600"
				hoverClass = "hover:bg-green-700"
				textColor = "text-white"
				className = "my-1 mr-1"
			/>
		)
	}

	if (isSelected && isFilled) {
		if (isProvided) {
			if (providedService.serviceTime === selectedService.serviceTime &&
          providedService.servicePrice === selectedService.servicePrice) {
				return <DeleteServiceButton/>
			} else {
				return <UpdateServiceButton />
			}
		} else {
			return <AddServiceButton />
		}
	}

	return null
}
