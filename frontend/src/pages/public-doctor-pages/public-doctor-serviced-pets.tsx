import PublicDoctorCard from "src/components/public-doctor-card"
import ServicedPets from "src/components/public-doctor/serviced-pets"

export default function ServicedPetsSection() {
	return (
		<PublicDoctorCard
			title = "Serviced Pets"
			content = {<ServicedPets />}
		/>
	)
}
