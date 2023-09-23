import PublicDoctorCard from "src/components/public-doctor-card"
import Specialties from "src/components/public-doctor-locations/specialties"

export default function SpecialtiesSection() {
	return (
		<PublicDoctorCard
			title = "Specialties"
			content = {<Specialties />}
		/>
	)
}
