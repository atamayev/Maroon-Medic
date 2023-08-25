import ServicesMap from "./services-map"
import OpenCloseServiceCategory from "./open-close-service-category"

type CategoriesType = {
  [key: string]: ServiceListItem[]
}

interface Props {
	categories: CategoriesType
	expandedCategories: string[]
	setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>
	selectedServices: ServiceItemNullablePrice[]
	setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>>
	providedServices: ServiceItemNotNullablePrice[]
	setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemNotNullablePrice[]>>
	setServicesConfirmation: (conf: ConfirmationMessage) => void
}

const ServiceList = (props: Props) => {
	const { categories, expandedCategories, setExpandedCategories,
		selectedServices, setSelectedServices, providedServices, setProvidedServices, setServicesConfirmation } = props

	return (
		<>
			{Object.entries(categories).map(([category, services]) => (
				<div key = {category} style = {{ marginBottom: "10px" }}>
					<label htmlFor = {category}>{category}</label>
					<OpenCloseServiceCategory
						category = {category}
						services = {services}
						expandedCategories = {expandedCategories}
						setExpandedCategories = {setExpandedCategories}
					/>
					<ServicesMap
						category = {category}
						services = {services}
						expandedCategories = {expandedCategories}
						selectedServices = {selectedServices}
						setSelectedServices = {setSelectedServices}
						providedServices = {providedServices}
						setProvidedServices = {setProvidedServices}
						setServicesConfirmation = {setServicesConfirmation}
					/>
				</div>
			))}
		</>
	)
}

export default ServiceList
