import { Link } from "react-router-dom"
import Button from "../button"
import SinglePublicDoctorDataClass from "src/classes/public-doctor/single-public-doctor-data-class"

interface Props {
	doctorData: SinglePublicDoctorDataClass
}

export default function PatientHasNoServicablePets(props: Props) {
	const { doctorData } = props
	return (
		<>
			<div className="col-md-6">
				You do not have any pets that are serviced by Dr. {doctorData.doctorPersonalInfo.lastName}
			</div>
			<div className="col-md-6">
				<Link to = "/my-pets">
					<Button
						className = "w-100"
						colorClass = "bg-amber-400"
						hoverClass = "hover:bg-amber-600"
						title = "Add a Pet"
					/>
				</Link>
			</div>
		</>
	)
}
