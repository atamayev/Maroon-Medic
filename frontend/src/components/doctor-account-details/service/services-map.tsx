import ServiceCheckbox from "./service-checkbox"
import IsSelectedService from "./is-selected-service"

interface Props {
	category: string
	services: ServiceListItem[]
	expandedCategories: string[]
	selectedServices: ServiceItemNullablePrice[]
	setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>>
	providedServices: ServiceItemNotNullablePrice[]
	setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemNotNullablePrice[]>>
	setServicesConfirmation: (conf: ConfirmationMessage) => void
}

export default function ServicesMap (props: Props) {
	const { category, services, expandedCategories, selectedServices, setSelectedServices,
		providedServices, setProvidedServices, setServicesConfirmation } = props

	if (!(services.length <= 1 || expandedCategories.includes(category))) return null

	return (
		<div>
			{services.map(service => {
				const selectedService = selectedServices.find(s => s.serviceAndCategoryListId === service.serviceAndCategoryListId)
				return (
					<div key = {service.serviceAndCategoryListId} style = {{ paddingLeft: "20px" }}>
						<ServiceCheckbox
							service = {service}
							category = {category}
							selectedServices = {selectedServices}
							setSelectedServices = {setSelectedServices}
							providedServices = {providedServices}
							setProvidedServices = {setProvidedServices}
							setServicesConfirmation = {setServicesConfirmation}
						/>
						<IsSelectedService
							service = {service}
							selectedService = {selectedService}
							selectedServices = {selectedServices}
							setSelectedServices = {setSelectedServices}
						/>
					</div>
				)
			})}
		</div>
	)
}
