import _ from "lodash"
import { observer } from "mobx-react"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"

interface CategoriesType {
	[key: string]: ServiceItemNotNullablePrice[]
}

function ProvidedServices() {
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNull(doctorData)) return null

	const categories: CategoriesType = {}
	doctorData.doctorServices.forEach(service => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!categories[service.categoryName]) {
			categories[service.categoryName] = []
		}
		categories[service.categoryName].push(service)
	})

	return (
		<>
			{Object.entries(categories).map(([category, services], outerIndex) => (
				<div key = {outerIndex} style = {{ marginBottom: "10px" }}>
					<h3>{category}</h3>
					{services.map((service, innerIndex) => (
						<p key = {innerIndex}>
							{service.serviceName} - {service.serviceTime}, ${service.servicePrice}
						</p>
					))}
				</div>
			))}
		</>
	)
}

export default observer(ProvidedServices)
