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
				id = {`${category}-${service.service_and_category_listID}`}
				name = "service"
				value = {service.service_and_category_listID}
				checked = {
					selectedServices.find(
						(provided) => provided.service_and_category_listID === service.service_and_category_listID
					) !== undefined
				}
				onChange = {(event) => {
					if (event.target.checked) {
						setSelectedServices([...selectedServices, {...service, Service_price: null, Service_time: ""}])
					}
					else {
						setSelectedServices(
							selectedServices.filter(
								_service => _service.service_and_category_listID !== service.service_and_category_listID
							)
						)
					}
				}}
			/>
			<label htmlFor = {`${category}-${service.service_and_category_listID}`}>{service.Service_name}</label>
		</>
	)
}

export default ServiceCheckbox
