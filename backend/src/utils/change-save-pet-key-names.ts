const changeSavePetKeyNames = (petData: PetItemForCreationPreProcessed): PetItemForCreationPostProcessed => {
	const newPetMedications = petData.petMedications.map((medication: PetMedicationsPreProcessed) => {
		const { petMedicationsListId, ...rest } = medication
		return { petMedicationsId: petMedicationsListId, ...rest }
	})

	const newPetProcedures = petData.petProcedures.map((procedure: PetProceduresPreProcessed) => {
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
