import _ from "lodash"
import PublicDoctorCard from "src/components/public-doctor-card"

interface CategoriesType {
  [key: string]: ServicedPetData[]
}

export default function ServicedPetsSection({ servicedPets } : { servicedPets: ServicedPetData[] }) {
	if (_.isEmpty(servicedPets)) return null
	return (
		<PublicDoctorCard
			title = "Serviced Pets"
			content = {<ServicedPets servicedPets = {servicedPets} />}
		/>
	)
}

function ServicedPets({ servicedPets } : { servicedPets: ServicedPetData[] }) {
	const categories: CategoriesType = {}
	if (servicedPets) {
		servicedPets.forEach(Pet => {
			if (!categories[Pet.petType]) categories[Pet.petType] = []
			categories[Pet.petType].push(Pet)
		})
	}

	return (
		<>
			{Object.entries(categories).map(([petType, pets], outerIndex) => (
				<div key = {outerIndex} style = {{ marginBottom: "10px" }}>
					<h3>{petType}</h3>
					{pets.map((Pet, innerIndex) => (
						<p key = {innerIndex}>
							{Pet.pet}
						</p>
					))}
				</div>
			))}
		</>
	)
}
