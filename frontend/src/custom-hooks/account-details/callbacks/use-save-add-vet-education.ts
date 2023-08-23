import { useCallback } from "react"
import addVetEducation from "src/helper-functions/account-details/save/doctor-account-details/add-vet-education"

const useSaveAddVetEducation = (
  vetEducation: VetEducationItem[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
  listDetails: DoctorListDetails,
  setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((selectedEducationObj: VetEducationItem) => void) => {
  return useCallback(
    async (selectedEducationObj: VetEducationItem) => {
      await addVetEducation(
        selectedEducationObj,
        vetEducation,
        setVetEducation,
        listDetails,
        setVetEducationConfirmation
      )
    }, [vetEducation, setVetEducation, listDetails, setVetEducationConfirmation])
}

export default useSaveAddVetEducation
