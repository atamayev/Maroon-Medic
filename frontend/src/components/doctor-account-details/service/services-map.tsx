import ServiceCheckbox from "./service-checkbox"
import IsSelectedService from "./is-selected-service"

interface Props {
  category: string
  services: ServiceListItem[]
  expandedCategories: string[]
  selectedServices: ServiceItem[]
  setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>
  providedServices: ServiceItem[]
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>
  setServicesConfirmation: (conf: ConfirmationMessage) => void
}

const ServicesMap = (props: Props) => {
	const { category, services, expandedCategories, selectedServices, setSelectedServices,
		providedServices, setProvidedServices, setServicesConfirmation } = props

	if (!(services.length <= 1 || expandedCategories.includes(category))) return null

	return (
		<div>
			{services.map(service => {
				const selectedService = selectedServices.find(s => s.service_and_category_listID === service.service_and_category_listID)
				return (
					<div key = {service.service_and_category_listID} style = {{ paddingLeft: "20px" }}>
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

export default ServicesMap
