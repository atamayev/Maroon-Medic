import { useCallback, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import addSpecialties from "src/helper-functions/account-details/save/doctor-account-details/add-specialties"

const useAddSpecialty = (
	doctorSpecialties: SpecialtyItem[],
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void> => {
	const { doctorLists } = useContext(AppContext)

	return useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedSpecialtyId = Number(e.target.value)
		const selectedSpecialty = doctorLists!.specialties.find((spec) => spec.specialtiesListId === selectedSpecialtyId)
		await addSpecialties(
			selectedSpecialty,
			doctorSpecialties,
			setSelectedOrganization,
			setSpecialtiesConfirmation
		)
	}, [doctorSpecialties])
}

export default useAddSpecialty
