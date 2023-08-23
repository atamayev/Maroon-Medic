import { useCallback } from "react"
import deleteVetEducation from "src/helper-functions/account-details/save/doctor-account-details/delete-vet-education"

export const useDeleteVetEducation = (
  vetEducation: VetEducationItem[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
  setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((VetEducation: VetEducationItem) => void) => {
  return useCallback(
    async (VetEducation: VetEducationItem) => {
      await deleteVetEducation(
        VetEducation.vet_education_mappingID,
        vetEducation,
        setVetEducation,
        setVetEducationConfirmation
      )
    }, [vetEducation, setVetEducation, setVetEducationConfirmation])
}

export default useDeleteVetEducation
