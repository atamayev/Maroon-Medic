import _ from "lodash"
import { observer } from "mobx-react"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"

interface CategoriesType {
	[key: string]: ServicedPetData[]
}

function ServicedPets() {
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNull(doctorData)) return null

	const categories: CategoriesType = {}
	doctorData.servicedPets.forEach(pet => {
		if (!categories[pet.petType]) categories[pet.petType] = []
		categories[pet.petType].push(pet)
	})

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

export default observer(ServicedPets)
