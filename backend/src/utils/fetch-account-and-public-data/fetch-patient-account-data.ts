import _ from "lodash"
import FetchPatientAccountDataDB from "../../db/private-patient-data/fetch-patient-account-data-db"

export default new class FetchPatientAccountData {
	async languages (patientId: number): Promise<LanguageItem[]> {
		try {
			const languages = await FetchPatientAccountDataDB.languages(patientId)
			return languages
		} catch (error: unknown) {
			return []
		}
	}

	async pets (patientId: number): Promise<CompletePetInfo[]> {
		try {
			const retrievePetData = await FetchPatientAccountDataDB.petData(patientId)

			if (!_.isEmpty(retrievePetData)) {
				for (const pet of retrievePetData) {
					const insuranceResults = await FetchPatientAccountDataDB.petInsurances(pet.petInfoId)
					pet.insuranceName = insuranceResults || ""
				}
			}
			return retrievePetData
		} catch (error: unknown) {
			return []
		}
	}
}()
