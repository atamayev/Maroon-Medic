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
	setServicesConfirmation: (conf: ConfirmationMessage) => void
}

export default function ServiceList (props: Props) {
	const { categories, expandedCategories, setExpandedCategories,
		selectedServices, setSelectedServices, setServicesConfirmation } = props

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
						setServicesConfirmation = {setServicesConfirmation}
					/>
				</div>
			))}
		</>
	)
}
