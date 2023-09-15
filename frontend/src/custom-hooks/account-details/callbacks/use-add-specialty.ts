import _ from "lodash"
import { useCallback, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import useModifyDoctorSpecialties from "../save/doctor-account-details-helpers/use-modify-doctor-specialties"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"

const useAddSpecialty = (
	doctorSpecialties: SpecialtyItem[],
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void> => {
	const { doctorLists } = useContext(AppContext)
	const modifyDoctorSpecialties = useModifyDoctorSpecialties()

	return useCallback(
		async (e: React.ChangeEvent<HTMLSelectElement>) => {
			const selectedSpecialtyId = Number(e.target.value)
			const selectedSpecialty = doctorLists!.specialties.find((spec) => spec.specialtiesListId === selectedSpecialtyId)
			if (_.isUndefined(selectedSpecialty)) return
			const newDoctorSpecialties = [...doctorSpecialties, selectedSpecialty]
			await modifyDoctorSpecialties(
				PrivateDoctorDataService.addSpecialty,
				selectedSpecialty.specialtiesListId,
				newDoctorSpecialties,
				setSpecialtiesConfirmation,
				() => setSelectedOrganization("")
			)
		}, [doctorSpecialties, modifyDoctorSpecialties])
}

export default useAddSpecialty
