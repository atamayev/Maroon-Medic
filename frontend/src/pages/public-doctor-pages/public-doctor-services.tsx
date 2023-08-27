import _ from "lodash"
import PublicDoctorCard from "src/components/public-doctor-card"

interface CategoriesType {
	[key: string]: ServiceItemNotNullablePrice[]
}

export default function ServiceSection({ providedServices } : { providedServices: ServiceItemNotNullablePrice[] }) {
	if (_.isEmpty(providedServices)) return null
	return (
		<PublicDoctorCard
			title = "Provided Services"
			content = {<ProvidedServices providedServices = {providedServices} />}
		/>
	)
}

function ProvidedServices({ providedServices } : { providedServices: ServiceItemNotNullablePrice[] }) {
	const categories: CategoriesType = {}
	if (providedServices) {
		providedServices.forEach(service => {
			if (!categories[service.categoryName]) categories[service.categoryName] = []
			categories[service.categoryName].push(service)
		})
	}

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
