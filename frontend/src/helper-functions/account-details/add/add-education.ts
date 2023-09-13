import moment from "moment"

const addEducation = (
	selectedSchool: string,
	setSelectedSchool: React.Dispatch<React.SetStateAction<string>>,
	selectedEducationType: string,
	setSelectedEducationType: React.Dispatch<React.SetStateAction<string>>,
	timeState: TimeState,
	setTimeState: React.Dispatch<React.SetStateAction<TimeState>>,
	selectedMajor: string | null = null,
	setSelectedMajor: React.Dispatch<React.SetStateAction<string>> | null = null
): GeneralEducationItem => {
	const selectedEducationObj: GeneralEducationItem = {
		schoolName: selectedSchool,
		educationType: selectedEducationType,
		startDate: moment(`${timeState.startYear}-${timeState.startMonth}-1`,"YYYY-MMMM-D").format("MMMM D, YYYY"),
		endDate: moment(`${timeState.endYear}-${timeState.endMonth}-1`,"YYYY-MMMM-D").format("MMMM D, YYYY"),
	}
	if (selectedMajor) selectedEducationObj.majorName = selectedMajor

	setSelectedSchool("")
	setSelectedEducationType("")
	setTimeState({
		startMonth: "",
		endMonth: "",
		startYear: "",
		endYear: "",
	})

	if (setSelectedMajor) setSelectedMajor("")

	return selectedEducationObj
}

export default addEducation
