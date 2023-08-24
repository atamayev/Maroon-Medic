import Button from "src/components/button"
import updateServices from "src/helper-functions/account-details/save/doctor-account-details/update-services"
import addServices from "src/helper-functions/account-details/save/doctor-account-details/add-services"
import deleteServices from "src/helper-functions/account-details/save/doctor-account-details/delete-services"

interface Props {
  service: ServiceListItem
  providedServices: ServiceItem[]
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>
  selectedServices: ServiceItem[]
  setServicesConfirmation: (conf: ConfirmationMessage) => void
  setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>
}

const ActionButton = (props: Props) => {
	const { service, providedServices, setProvidedServices, selectedServices, setServicesConfirmation, setSelectedServices } = props
	const selectedService = selectedServices.find(s => s.service_and_category_listID === service.service_and_category_listID)
	const providedService = providedServices.find(s => s.service_and_category_listID === service.service_and_category_listID)

	const isSelected = selectedService !== undefined
	const isProvided = providedService !== undefined

	// check if service time and price are filled
	const isFilled = isSelected && selectedService.Service_time && selectedService.Service_price

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
				className = "my-1"
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
			/>
		)
	}

	if (isSelected && isFilled) {
		if (isProvided) {
			if (providedService.Service_time === selectedService.Service_time &&
          providedService.Service_price === selectedService.Service_price) {
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

export default ActionButton
