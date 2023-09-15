import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState, useContext } from "react"
import ServiceCheckboxAndActionButton from "./service-checkbox-and-action-button"
import IsSelectedService from "./is-selected-service"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	category: string
	services: ServiceListItem[]
	expandedCategories: string[]
	setServicesConfirmation: (conf: ConfirmationMessage) => void
}

function ServicesMap (props: Props) {
	const { category, services, expandedCategories, setServicesConfirmation } = props
	const { doctorAccountDetails } = useContext(AppContext)
	const [selectedServices, setSelectedServices] = useState<ServiceItemNullablePrice[]>([])

	useEffect(() => {
		if (_.isNull(doctorAccountDetails) || _.isEmpty(doctorAccountDetails.services)) return
		setSelectedServices(doctorAccountDetails.services)
	}, [doctorAccountDetails?.services])

	if (!(services.length <= 1 || expandedCategories.includes(category))) return null

	return (
		<div>
			{services.map(service => {
				const selectedService = selectedServices.find(s => s.serviceAndCategoryListId === service.serviceAndCategoryListId)
				return (
					<div key = {service.serviceAndCategoryListId} style = {{ paddingLeft: "20px" }}>
						<ServiceCheckboxAndActionButton
							service = {service}
							category = {category}
							selectedServices = {selectedServices}
							setSelectedServices = {setSelectedServices}
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

export default observer(ServicesMap)
