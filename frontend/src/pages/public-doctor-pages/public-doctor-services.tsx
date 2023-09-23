import PublicDoctorCard from "src/components/public-doctor-card"
import ProvidedServices from "src/components/public-doctor/provided-services"

export default function ServiceSection() {
	return (
		<PublicDoctorCard
			title = "Provided Services"
			content = {<ProvidedServices />}
		/>
	)
}
