function checkPetDataFields(petData: PetItemForCreation): boolean {
	if (
		!petData.name ||
		!petData.gender ||
		!petData.dateOfBirth ||
		!petData.petType ||
		!petData.insuranceName
	) {
		return false
	}

	return true
}

function checkMedicationFields(medications: NewPetMedicationItem[]): boolean {
	for (const medication of medications) {
		if (!medication.frequencyPeriod) {
			return false
		}
	}
	return true
}

function checkProcedureFields(procedures: NewPetProcedureItem[]): boolean {
	for (const procedure of procedures) {
		if (!procedure.procedureDate) {
			return false
		}
	}
	return true
}

export default function areAllNewPetFieldsValid(
	petData: PetItemForCreation,
	medications: NewPetMedicationItem[],
	procedures: NewPetProcedureItem[]
): boolean {

	if (checkPetDataFields(petData) === false) return false

	if (checkMedicationFields(medications) === false) return false

	if (checkProcedureFields(procedures) === false) return false

	return true
}
