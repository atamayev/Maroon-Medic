import _ from "lodash"
import { useContext } from "react"
import { Link } from "react-router-dom"
import Button from "../button"
import handlePetChange from "src/helper-functions/public-doctor/booking-page/handle-pet-change"
import FormGroup from "../form-group"
import { AppContext } from "src/contexts/maroon-context"

interface ChoosePetProps {
	appointmentInformation: AppointmentInformation
	setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>
}

export default function ChoosePet (props: ChoosePetProps) {
	const { appointmentInformation, setAppointmentInformation } = props
	const appContext = useContext(AppContext)

	if (_.isEmpty(appContext.patientPetData)) {
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

	if (appContext.patientPetData.length === 1) {
		return (
			<div className="col-md-6">
				Selected Pet: {appointmentInformation.selectedPet?.name}
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
						appContext.patientPetData,
						setAppointmentInformation
					)
				}
				value = {_.toString(appointmentInformation.selectedPet?.petInfoId) || ""}
				required = {true}
			>
				<option value = "" disabled>Select...</option>
				{appContext.patientPetData.map((pet, index) => (
					<option key={index} value={pet.petInfoId}>
						{pet.name}
					</option>
				))}
			</FormGroup>
		</div>
	)
}
