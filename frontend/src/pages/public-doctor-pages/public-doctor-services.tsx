import _ from "lodash"
import PublicDoctorCard from "src/components/public-doctor-card"

interface CategoriesType {
  [key: string]: ServiceItem[]
}

export default function ServiceSection({ providedServices } : { providedServices: ServiceItem[] }) {
	if (_.isEmpty(providedServices)) return null
	return (
		<PublicDoctorCard
			title = "Provided Services"
			content = {<ProvidedServices providedServices = {providedServices} />}
		/>
	)
}

function ProvidedServices({ providedServices } : { providedServices: ServiceItem[] }) {
	const categories: CategoriesType = {}
	if (providedServices) {
		providedServices.forEach(service => {
			if (!categories[service.Category_name]) categories[service.Category_name] = []
			categories[service.Category_name].push(service)
		})
	}

	return (
		<>
			{Object.entries(categories).map(([category, services], outerIndex) => (
				<div key = {outerIndex} style = {{ marginBottom: "10px" }}>
					<h3>{category}</h3>
					{services.map((service, innerIndex) => (
						<p key = {innerIndex}>
							{service.Service_name} - {service.Service_time}, ${service.Service_price}
						</p>
					))}
				</div>
			))}
		</>
	)
}
