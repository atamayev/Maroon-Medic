import dayjs from "dayjs"
import FormGroup from "./form-group"

export default function DateOfBirth ({ personalInfo, setPersonalInfo }: PersonalInfoProps) {
	const today = dayjs().format("YYYY-MM-DD")

	return (
		<div className = "row mt-3 mb-3">
			<div id="DOB" className="flex flex-col space-y-4">
				<FormGroup
					id = "formPetDob"
					className = "mb-3"
					label = "Date of Birth"
					type = "date"
					onChange = {(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
					name = "dateOfBirth"
					max = {today}
					value = {personalInfo.dateOfBirth || ""}
					required
				/>
			</div>
		</div>
	)
}
