import ServicePriceInput from "./service-price-input"
import ServiceTimeInput from "./service-time-input"

interface Props {
	service: ServiceListItem
	selectedService: ServiceItemNullablePrice | undefined
	selectedServices: ServiceItemNullablePrice[]
	setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>>
}

export default function IsSelectedService (props: Props) {
	const { service, selectedService, selectedServices, setSelectedServices } = props

	if (!selectedService) return null

	return (
		<>
			<ServiceTimeInput
				service = {service}
				selectedService = {selectedService}
				selectedServices = {selectedServices}
				setSelectedServices = {setSelectedServices}
			/>
			<ServicePriceInput
				service = {service}
				selectedService = {selectedService}
				selectedServices = {selectedServices}
				setSelectedServices = {setSelectedServices}
			/>
		</>
	)
}
