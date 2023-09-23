import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../form-group"
import handleLocationChange from "src/helper-functions/public-doctor/booking-page/handle-location-change"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"

interface SelectLocationProps extends AppointmentBookingProps {
	setNoAvailableTimesMessage: React.Dispatch<React.SetStateAction<boolean>>
}

function SelectLocation (props: SelectLocationProps) {
	const { appointmentInformation, setAppointmentInformation, setNoAvailableTimesMessage } = props
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNull(doctorData)) return null

	if (!appointmentInformation.selectedService) return null

	return (
		<div className="col-md-6">
			<FormGroup
				as="select"
				id="locationSelect"
				label="Select a location"
				onChange={(e) =>
					handleLocationChange(
						e,
						doctorData.doctorAddressData,
						setAppointmentInformation,
						setNoAvailableTimesMessage
					)}
				value = {_.toString(appointmentInformation.selectedLocation?.addressesId) || ""}
			>
				<option value = "" disabled>Select...</option>
				{doctorData.doctorAddressData.map((address) => (
					<option key={address.addressesId} value={address.addressesId}>
						{address.addressTitle}: ({address.addressLine1} {address.addressLine2}, {" "}
						{address.city}, {" "} {address.state}, {" "} {address.zip})
					</option>
				))}
			</FormGroup>
		</div>
	)
}

export default observer(SelectLocation)
