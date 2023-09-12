import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState, useContext } from "react"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import ServiceList from "src/components/doctor-account-details/service/service-list"
import AccountDetailsCard from "src/components/account-details-card"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
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
	const { providedServices, setProvidedServices, expandedCategories, setExpandedCategories } = props
	const { doctorLists } = useContext(AppContext)
	const [servicesConfirmation, setServicesConfirmation] = useConfirmationMessage()
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

	if (_.isNull(doctorLists)) return null

	doctorLists.servicesAndCategories.forEach(service => {
		if (!categories[service.categoryName]) categories[service.categoryName] = []
		categories[service.categoryName].push(service)
	})

	if (
		_.isNull(doctorLists) ||
		_.isEmpty(_.uniq(doctorLists.servicesAndCategories.map((item) => item.categoryName)))
	) return <>Loading...</>

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

observer(VetServices)
