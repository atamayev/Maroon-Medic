import { useCallback } from "react"
import addEducation from "src/helper-functions/account-details/add/add-education"

export const useAddPreVetEducation = (
	selectedPreVetSchool: string,
	setSelectedPreVetSchool: React.Dispatch<React.SetStateAction<string>>,
	selectedPreVetEducationType: string,
	setSelectedPreVetEducationType: React.Dispatch<React.SetStateAction<string>>,
	timeState: TimeState,
	setTimeState: React.Dispatch<React.SetStateAction<TimeState>>,
	selectedMajor: string,
	setSelectedMajor: React.Dispatch<React.SetStateAction<string>>
): () => GeneralEducationItem => {
	return useCallback(() => {
		return addEducation(
			selectedPreVetSchool, setSelectedPreVetSchool,
			selectedPreVetEducationType, setSelectedPreVetEducationType,
			timeState, setTimeState,
			selectedMajor, setSelectedMajor
		)
	}, [
		selectedPreVetSchool, setSelectedPreVetSchool,
		selectedPreVetEducationType, setSelectedPreVetEducationType,
		timeState, setTimeState,
		selectedMajor, setSelectedMajor
	])
}

export default useAddPreVetEducation
