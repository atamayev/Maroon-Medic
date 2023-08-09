import _ from "lodash"
import FetchPatientAccountDataDB from "../../db/private-patient-data/fetch-patient-account-data-DB"

export default new class FetchPatientAccountData {
  async languages (PatientID: number): Promise<LanguageItemType[]> {
    try {
      const languages = await FetchPatientAccountDataDB.languages(PatientID)
      return languages
    } catch (error: unknown) {
      return []
    }
  }

  async pets (PatientID: number): Promise<PetItemType[]> {
    try {
      const retrievePetData = await FetchPatientAccountDataDB.petData(PatientID)

      if (!_.isEmpty(retrievePetData)) {
        for (const pet of retrievePetData) {
          const insuranceResults = await FetchPatientAccountDataDB.petInsurances(pet.pet_infoID)
          pet.insuranceName = insuranceResults || ""
        }
      }
      return retrievePetData
    } catch (error: unknown) {
      return []
    }
  }
}()
