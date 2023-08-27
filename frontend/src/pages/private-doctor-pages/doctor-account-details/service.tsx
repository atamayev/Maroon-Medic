import _ from "lodash"
import { useEffect, useState } from "react"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import ServiceList from "src/components/doctor-account-details/service/service-list"
import AccountDetailsCard from "src/components/account-details-card"

interface Props {
  listDetails: DoctorListDetails
  providedServices: ServiceItemNotNullablePrice[]
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemNotNullablePrice[]>>
  expandedCategories: string[]
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ServiceSection (props: Props) {
	return (
		<AccountDetailsCard
			title = "Vet Services"
			content = {<VetServices {...props} />}
		/>
	)
}

function VetServices (props: Props) {
	const [servicesConfirmation, setServicesConfirmation] = useConfirmationMessage()
	const { listDetails, providedServices, setProvidedServices, expandedCategories, setExpandedCategories } = props
	const [selectedServices, setSelectedServices] = useState<ServiceItemNullablePrice[]>([])

	useEffect(() => {
		//Initialize selectedServices to providedServices
		if (providedServices) {
			setSelectedServices(providedServices)
		}
	}, [providedServices])

	type CategoriesType = {
	[key: string]: ServiceListItem[]
	}

	const categories: CategoriesType = {}

	if (listDetails.servicesAndCategories) {
		listDetails.servicesAndCategories.forEach(service => {
			if (!categories[service.categoryName]) categories[service.categoryName] = []
			categories[service.categoryName].push(service)
		})
	}

	if (_.isEmpty(_.uniq(listDetails.servicesAndCategories.map((item) => item.categoryName)))) return <>Loading...</>

	return (
		<>
			<ServiceList
				categories = {categories}
				expandedCategories = {expandedCategories}
				setExpandedCategories = {setExpandedCategories}
				selectedServices = {selectedServices}
				setSelectedServices = {setSelectedServices}
				providedServices = {providedServices}
				setProvidedServices = {setProvidedServices}
				setServicesConfirmation = {setServicesConfirmation}
			/>

			<SavedConfirmationMessage
				confirmationMessage = {servicesConfirmation}
				whatIsBeingSaved = "Services"
			/>
		</>
	)
}
