import _ from "lodash"
import { observer } from "mobx-react"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"

function Reviews() {
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNil(doctorData)) return null

	return (
		<>
			{doctorData.reviews.map((review: PublicDoctorReview) => (
				<div key = {review.reviewId}>
					<div className = "row">
						<div className = "col-md-6">
							{"Review Rating:" + review.patientReviewRating}
						</div>
					</div>
				</div>
			))}
		</>
	)
}

export default observer(Reviews)
