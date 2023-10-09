import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../form-group"
import handleServiceChange from "src/helper-functions/public-doctor/booking-page/handle-service-change"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"

function SelectService (props: AppointmentBookingProps) {
	const { appointmentInformation, setAppointmentInformation } = props
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNil(doctorData)) return null
	if (_.isNil(appointmentInformation.selectedPet)) return null

	return (
		<div className="col-md-6">
			<FormGroup
				as="select"
				id="serviceSelect"
				label="Select a service"
				onChange={(e) =>
					handleServiceChange(
						e,
						doctorData.doctorServices,
						setAppointmentInformation,
					)}
				value = {_.toString(appointmentInformation.selectedService?.serviceAndCategoryListId) || ""}
			>
				<option value = "" disabled>Select...</option>
				{doctorData.doctorServices.map((service, index) => (
					<option key={index} value={service.serviceAndCategoryListId}>
						{service.categoryName} - {service.serviceName}
					</option>
				))}
			</FormGroup>
		</div>
	)
}

export default observer(SelectService)
