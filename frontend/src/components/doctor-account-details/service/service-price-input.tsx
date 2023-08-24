import {
	handleNumericInput,
	preventNonNumericalInput,
	validateDropInput,
	validatePasteInput
} from "src/utils/input-validation"

interface Props {
  service: ServiceListItem
  selectedService: ServiceItem
  selectedServices: ServiceItem[]
  setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>
}

const ServicePriceInput = (props: Props) => {
	const { service, selectedService, selectedServices, setSelectedServices } = props
	return (
		<input
			type = "text"
			placeholder = "Service Price ($)"
			id = {`price-${service.service_and_category_listID}`}
			required
			value = {selectedService.Service_price.toString() || ""}
			onChange = {(e) => handleNumericInput(
				e,
				(newVal) => {
					const updatedServices = selectedServices.map(s => {
						if (s.service_and_category_listID === service.service_and_category_listID) {
							return {...s, Service_price: parseFloat(newVal)}
						}
						return s
					})
					setSelectedServices(updatedServices)
				}
			)}
			onKeyUp = {preventNonNumericalInput}
			onPaste = {validatePasteInput}
			onDrop = {validateDropInput}
		/>
	)
}

export default ServicePriceInput
