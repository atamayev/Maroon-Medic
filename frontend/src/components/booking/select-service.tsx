import _ from "lodash"
import FormGroup from "../form-group"
import handleServiceChange from "src/helper-functions/public-doctor/booking-page/handle-service-change"

interface SelectServiceProps extends AppointmentBookingProps {
  providedServices: ServiceItemNotNullablePrice[]
}

export default function SelectService (props: SelectServiceProps) {
	const { providedServices, appointmentInformation, setAppointmentInformation } = props

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
						providedServices,
						setAppointmentInformation,
					)}
				value = {_.toString(appointmentInformation.selectedService?.serviceAndCategoryListId) || ""}
			>
				<option value = "" disabled>Select...</option>
				{providedServices.map((service, index) => (
					<option key={index} value={service.serviceAndCategoryListId}>
						{service.categoryName} - {service.serviceName}
					</option>
				))}
			</FormGroup>
		</div>
	)
}
