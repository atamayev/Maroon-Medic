import Button from "src/components/button"
import updateServices from "src/helper-functions/account-details/save/doctor-account-details/update-services"
import addServices from "src/helper-functions/account-details/save/doctor-account-details/add-services"
import deleteServices from "src/helper-functions/account-details/save/doctor-account-details/delete-services"

interface Props {
  service: ServiceListItem
  providedServices: ServiceItemNotNullablePrice[]
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemNotNullablePrice[]>>
  selectedServices: ServiceItemNullablePrice[]
  setServicesConfirmation: (conf: ConfirmationMessage) => void
  setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>>
}

const ServiceActionButton = (props: Props) => {
	const { service, providedServices, setProvidedServices, selectedServices, setServicesConfirmation, setSelectedServices } = props
	const selectedService =
		selectedServices.find(
			s => s.serviceAndCategoryListId === service.serviceAndCategoryListId
		) as ServiceItemNotNullablePrice | undefined
	const providedService = providedServices.find(s => s.serviceAndCategoryListId === service.serviceAndCategoryListId)

	const isSelected = selectedService !== undefined
	const isProvided = providedService !== undefined

	// check if service time and price are filled
	const isFilled = isSelected && selectedService.serviceTime && selectedService.servicePrice

	const DeleteServiceButton = () => {
		return (
			<Button
				onClick = {() => deleteServices(
					selectedService!,
					providedServices,
					setProvidedServices,
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

	const UpdateServiceButton = () => {
		return (
			<Button
				onClick = {() => updateServices(selectedService!, providedServices, setProvidedServices, setServicesConfirmation)}
				title = "Update"
				colorClass = "bg-amber-600"
				hoverClass = "hover:bg-amber-700"
				textColor = "text-white"
				className = "my-1 mr-1"
			/>
		)
	}

	const AddServiceButton = () => {
		return (
			<Button
				onClick = {() => addServices(selectedService!, providedServices, setProvidedServices, setServicesConfirmation)}
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

export default ServiceActionButton
