import moment from "moment"

export const addEducation = (
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
    School_name: selectedSchool,
    Education_type: selectedEducationType,
    Start_Date: moment(`${timeState.startYear}-${timeState.startMonth}-1`,"YYYY-MMMM-D").format("MMMM D, YYYY"),
    End_Date: moment(`${timeState.endYear}-${timeState.endMonth}-1`,"YYYY-MMMM-D").format("MMMM D, YYYY"),
  }
  if (selectedMajor) selectedEducationObj.Major_name = selectedMajor

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
