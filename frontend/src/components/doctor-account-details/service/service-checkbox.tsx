import ServiceActionButton from "./service-action-button"

interface Props {
  service: ServiceListItem
  category: string
  selectedServices: ServiceItemNullablePrice[]
  setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>>
  providedServices: ServiceItemNotNullablePrice[]
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemNotNullablePrice[]>>
  setServicesConfirmation: (conf: ConfirmationMessage) => void
}

const ServiceCheckbox = (props: Props) => {
	const { service, category, selectedServices, setSelectedServices,
		providedServices, setProvidedServices, setServicesConfirmation } = props

	return (
		<>
			<ServiceActionButton
				service = {service}
				providedServices = {providedServices}
				setProvidedServices = {setProvidedServices}
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
								_service => _service.serviceAndCategoryListId !== service.serviceAndCategoryListId
							)
						)
					}
				}}
			/>
			<label htmlFor = {`${category}-${service.serviceAndCategoryListId}`}>{service.serviceName}</label>
		</>
	)
}

export default ServiceCheckbox
