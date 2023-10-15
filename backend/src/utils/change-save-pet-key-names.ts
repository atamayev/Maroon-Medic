const changeSavePetKeyNames = (petData: PetItemForCreationPreProcessed): PetItemForCreationPostProcessed => {
	const newPetMedications = petData.petMedications.map((medication: PetMedicationPreProcessed) => {
		const { petMedicationListId, ...rest } = medication
		return { petMedicationId: petMedicationListId, ...rest }
	})

	const newPetProcedures = petData.petProcedures.map((procedure: PetProcedurePreProcessed) => {
		const { petProcedureListId, ...rest } = procedure
		return { petProcedureId: petProcedureListId, ...rest }
	})

	return {
		...petData,
		petMedications: newPetMedications,
		petProcedures: newPetProcedures
	}
}

export default changeSavePetKeyNames
