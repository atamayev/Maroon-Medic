import PublicDoctorCard from "src/components/public-doctor-card"
import ServicedPets from "src/components/public-doctor-locations/serviced-pets"

export default function ServicedPetsSection() {
	return (
		<PublicDoctorCard
			title = "Serviced Pets"
			content = {<ServicedPets />}
		/>
	)
}
