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
		servicedPets.forEach(pet => {
			if (!categories[pet.petType]) categories[pet.petType] = []
			categories[pet.petType].push(pet)
		})
	}

	return (
		<>
			{Object.entries(categories).map(([petType, pets], outerIndex) => (
				<div key = {outerIndex} style = {{ marginBottom: "10px" }}>
					<h3>{petType}</h3>
					{pets.map((pet, innerIndex) => (
						<p key = {innerIndex}>
							{pet.pet}
						</p>
					))}
				</div>
			))}
		</>
	)
}
