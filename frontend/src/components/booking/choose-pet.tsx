import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import Button from "../button"
import handlePetChange from "src/helper-functions/public-doctor/booking-page/handle-pet-change"
import FormGroup from "../form-group"
import AppContext from "src/contexts/maroon-context"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"

interface ChoosePetProps {
	appointmentInformation: AppointmentInformation
	setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>
}

function ChoosePet (props: ChoosePetProps) {
	const { appointmentInformation, setAppointmentInformation } = props
	const doctorID = useRetrieveDoctorIDFromParams()
	const appContext = useContext(AppContext)
	const patientPetData = appContext.patientData?.patientPetData
	const doctorData = appContext.publicDoctorData.retrieveSinglePublicDoctorData(doctorID)

	if (_.isNil(patientPetData) || _.isEmpty(patientPetData)) {
		return (
			<div className="col-md-6">
			You need to add a pet to make an appointment
				<Link to = "/my-pets">
					<Button
						className = "w-100"
						colorClass = "bg-amber-400"
						hoverClass = "hover:bg-amber-600"
						title = "Add a Pet"
					/>
				</Link>
			</div>
		)
	}

	return (
		<div className="col-md-6">
			<FormGroup
				as = "select"
				id = "petSelect"
				label = "Select a pet"
				onChange = {(e) =>
					handlePetChange(
						e,
						patientPetData,
						setAppointmentInformation
					)
				}
				value = {_.toString(appointmentInformation.selectedPet?.petInfoId) || ""}
				required = {true}
			>
				<option value = "" disabled>Select...</option>
				{patientPetData.map((pet, index) => {
					const isServicedByDoctor = doctorData!.servicedPets.some(servicedPet => servicedPet.pet === pet.pet)
					return (
						<option
							key = {index}
							value = {pet.petInfoId}
							disabled = {!isServicedByDoctor}
						>
							{isServicedByDoctor ? pet.name : `${pet.name} (Doctor does not service ${pet.pet}s})`}
						</option>
					)
				})}
			</FormGroup>
		</div>

	)
}

export default observer(ChoosePet)
