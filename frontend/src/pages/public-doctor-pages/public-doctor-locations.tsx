import PublicDoctorCard from "src/components/public-doctor-card"
import Locations from "src/components/public-doctor-locations/locations"

export default function LocationsSection() {
	return (
		<PublicDoctorCard
			title = "Locations"
			content = {<Locations />}
		/>
	)
}
