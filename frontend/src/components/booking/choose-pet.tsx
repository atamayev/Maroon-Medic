import _ from "lodash"
import { Link } from "react-router-dom"
import Button from "../button"
import handlePetChange from "src/helper-functions/public-doctor/booking-page/handle-pet-change"
import FormGroup from "../form-group"

interface ChoosePetProps extends AppointmentBookingProps {
	savedPetData: SavedPetItem[]
}

const ChoosePet = (props: ChoosePetProps) => {
	const { savedPetData, appointmentInformation, setAppointmentInformation } = props

	if (_.isEmpty(savedPetData)) {
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

	if (savedPetData.length === 1) return <div className="col-md-6">Selected Pet: {appointmentInformation.selectedPet?.name}</div>

	return (
		<div className="col-md-6">
			<FormGroup
				as = "select"
				id = "petSelect"
				label = "Select a pet"
				onChange = {(e) =>
					handlePetChange(
						e,
						savedPetData,
						setAppointmentInformation
					)
				}
				value = {_.toString(appointmentInformation.selectedPet?.petInfoId) || ""}
				required = {true}
			>
				<option value = "" disabled>Select...</option>
				{savedPetData.map((pet, index) => (
					<option key={index} value={pet.petInfoId}>
						{pet.name}
					</option>
				))}
			</FormGroup>
		</div>
	)
}

export default ChoosePet
