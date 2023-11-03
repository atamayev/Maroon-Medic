import Reviews from "src/components/public-doctor/reviews"
import PublicDoctorCard from "src/components/public-doctor-card"

export default function ReviewsSection() {
	return (
		<PublicDoctorCard
			title = "Reviews"
			content = {<Reviews />}
		/>
	)
}
