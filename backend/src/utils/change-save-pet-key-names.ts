const changeSavePetKeyNames = (petData: PetItemForCreationPreProcessed): PetItemForCreationPostProcessed => {
	const newPetMedications = petData.petMedications.map((medication: PetMedicationPreProcessed) => {
		const { petMedicationsListId, ...rest } = medication
		return { petMedicationsId: petMedicationsListId, ...rest }
	})

	const newPetProcedures = petData.petProcedures.map((procedure: PetProcedurePreProcessed) => {
		const { petProceduresListId, ...rest } = procedure
		return { petProcedureId: petProceduresListId, ...rest }
	})

	return {
		...petData,
		petMedications: newPetMedications,
		petProcedures: newPetProcedures
	}
}

export default changeSavePetKeyNames
