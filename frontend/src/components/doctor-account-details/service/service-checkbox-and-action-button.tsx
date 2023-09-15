import ServiceActionButton from "./service-action-button"

interface Props {
	service: ServiceListItem
	category: string
	selectedServices: ServiceItemNullablePrice[]
	setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>>
	setServicesConfirmation: (conf: ConfirmationMessage) => void
}

export default function ServiceCheckboxAndActionButton (props: Props) {
	const { service, category, selectedServices, setSelectedServices, setServicesConfirmation } = props

	return (
		<>
			<ServiceActionButton
				service = {service}
				selectedServices = {selectedServices}
				setSelectedServices = {setSelectedServices}
				setServicesConfirmation = {setServicesConfirmation}
			/>
			<input
				type = "checkbox"
				id = {`${category}-${service.serviceAndCategoryListId}`}
				name = "service"
				value = {service.serviceAndCategoryListId}
				checked = {
					selectedServices.find(
						(provided) => provided.serviceAndCategoryListId === service.serviceAndCategoryListId
					) !== undefined
				}
				onChange = {(event) => {
					if (event.target.checked) {
						setSelectedServices([...selectedServices, {...service, servicePrice: null, serviceTime: ""}])
					}
					else {
						setSelectedServices(
							selectedServices.filter(
								serviceItem => serviceItem.serviceAndCategoryListId !== service.serviceAndCategoryListId
							)
						)
					}
				}}
			/>
			<label htmlFor = {`${category}-${service.serviceAndCategoryListId}`}>{service.serviceName}</label>
		</>
	)
}
