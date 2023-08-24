import SelectMonth from "./select-month"
import SelectDay from "./select-day"
import SelectYear from "./select-year"

const DOBSection = ({ personalInfo, setPersonalInfo }: PersonalInfoProps) => {
	return (
		<div className = "row mt-3 mb-3">
			<div id="DOB" className="flex flex-col space-y-4">
				<SelectMonth personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
				<SelectDay personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
				<SelectYear personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
			</div>
		</div>
	)
}

export default DOBSection
