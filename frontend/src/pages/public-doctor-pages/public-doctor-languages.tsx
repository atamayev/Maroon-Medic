import PublicDoctorCard from "src/components/public-doctor-card"
import SpokenLanguages from "src/components/public-doctor-locations/spoken-languages"

export default function LanguageSection() {
	return (
		<PublicDoctorCard
			title = "Languages"
			content = {<SpokenLanguages />}
		/>
	)
}
