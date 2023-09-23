import PublicDoctorCard from "src/components/public-doctor-card"
import SpokenLanguages from "src/components/public-doctor/spoken-languages"

export default function LanguageSection() {
	return (
		<PublicDoctorCard
			title = "Languages"
			content = {<SpokenLanguages />}
		/>
	)
}
