import { useCallback } from "react"
import addEducation from "src/helper-functions/account-details/add/add-education"

export const useAddVetEducation = (
  selectedVetSchool: string,
  setSelectedVetSchool: React.Dispatch<React.SetStateAction<string>>,
  selectedVetEducationType: string,
  setSelectedVetEducationType: React.Dispatch<React.SetStateAction<string>>,
  timeState: TimeState,
  setTimeState: React.Dispatch<React.SetStateAction<TimeState>>
): () => GeneralEducationItem => {
  return useCallback(() => {
    return addEducation(
      selectedVetSchool, setSelectedVetSchool,
      selectedVetEducationType, setSelectedVetEducationType,
      timeState, setTimeState,
    )
  }, [
    selectedVetSchool, setSelectedVetSchool,
    selectedVetEducationType, setSelectedVetEducationType,
    timeState, setTimeState,
  ])
}

export default useAddVetEducation
