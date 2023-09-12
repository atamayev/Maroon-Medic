import { useCallback, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import addSpecialty from "src/helper-functions/account-details/add/add-sepcialty"

export const useAddSpecialty = (
	doctorSpecialties: SpecialtyItem[],
	setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void> => {
	const { doctorLists } = useContext(AppContext)

	return useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
		await addSpecialty(
			Number(e.target.value),
			doctorSpecialties,
			setDoctorSpecialties,
			setSelectedOrganization,
			doctorLists!,
			setSpecialtiesConfirmation
		)
	}, [doctorSpecialties])
}

export default useAddSpecialty
