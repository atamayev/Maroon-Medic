import _ from "lodash"
import { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import Button from "../button"
import handlePetChange from "src/helper-functions/public-doctor/booking-page/handle-pet-change"
import FormGroup from "../form-group"
import AppContext from "src/contexts/maroon-context"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import PatientHasNoServicablePets from "./patient-has-no-servicable-pets"

interface ChoosePetProps {
	appointmentInformation: AppointmentInformation
	setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>
}

// eslint-disable-next-line max-lines-per-function
function ChoosePet (props: ChoosePetProps) {
	const { appointmentInformation, setAppointmentInformation } = props
	const doctorID = useRetrieveDoctorIDFromParams()
	const appContext = useContext(AppContext)
	const [anyPetsServiced, setAnyPetsServiced] = useState<boolean | undefined>(undefined)
	const patientPetData = appContext.patientData?.patientPetData
	const doctorData = appContext.publicDoctorData.retrieveSinglePublicDoctorData(doctorID)

	useEffect(() => {
		if (_.isUndefined(patientPetData)) return
		for (const pet of patientPetData) {
			if (isServicedByDoctor(pet.pet) === true) {
				setAnyPetsServiced(true)
				return
			}
		}
		setAnyPetsServiced(false)
	}, [patientPetData])

	if (_.isNull(doctorData)) return null

	const isServicedByDoctor = (pet: string) => {
		return doctorData.servicedPets.some(servicedPet => servicedPet.pet === pet)
	}

	const showPetName = (pet: SavedPetItem) => {
		if (isServicedByDoctor(pet.pet)) return pet.name
		return `${pet.name} (Dr. ${doctorData.doctorPersonalInfo.lastName} does not service ${pet.pet}s)`
	}

	if (_.isNil(patientPetData) || _.isEmpty(patientPetData) || _.isUndefined(anyPetsServiced)) {
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

	if (anyPetsServiced === false) return <PatientHasNoServicablePets doctorData = {doctorData}/>

	if (_.size(patientPetData) === 1) {
		setAppointmentInformation({
			...appointmentInformation,
			selectedPet: patientPetData[0]
		})
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
						patientPetData,
						setAppointmentInformation
					)
				}
				value = {_.toString(appointmentInformation.selectedPet?.petInfoId) || ""}
				required = {true}
			>
				<option value = "" disabled>Select...</option>
				{patientPetData.map((pet, index) => (
					<option
						key = {index}
						value = {pet.petInfoId}
						disabled = {!isServicedByDoctor(pet.pet)}
					>
						{showPetName(pet)}
					</option>
				))}
			</FormGroup>
		</div>
	)
}

export default observer(ChoosePet)
