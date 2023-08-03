import _ from "lodash"
import FetchPatientAccountDataDB from "../../db/private-patient-data/fetch-patient-account-data-DB"

export default new class FetchPatientAccountData {
  async fetchPatientLanguages (PatientID: number): Promise<LanguageItemType[]> {
    try {
      const languages = await FetchPatientAccountDataDB.retrievePatientLanguages(PatientID)
      return languages
    } catch (error: unknown) {
      return []
    }
  }

  async fetchPetData (PatientID: number): Promise<PetItemType[]> {
    try {
      const retrievePetData = await FetchPatientAccountDataDB.retrievePetData(PatientID)

      if (!_.isEmpty(retrievePetData)) {
        for (const pet of retrievePetData) {
          const insuranceResults = await FetchPatientAccountDataDB.retrievePetInsurances(pet.pet_infoID)
          pet.insuranceName = insuranceResults || ""
        }
      }
      return retrievePetData
    } catch (error: unknown) {
      return []
    }
  }
}()
