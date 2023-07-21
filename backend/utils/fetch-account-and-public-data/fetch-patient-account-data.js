import _ from "lodash"
import FetchPatientAccountDataDB from "../../db/private-patient-data/fetch-patient-account-data-DB.js"

export default new class FetchPatientAccountData {
  async fetchPatientLanguages (PatientID) {
    try {
      const languages = await FetchPatientAccountDataDB.retrievePatientLanguages(PatientID)
      return languages
    } catch (error) {
      return []
    }
  }

  async fetchPetData (PatientID) {
    try {
      const retrievePetData = await FetchPatientAccountDataDB.retrievePetData(PatientID)

      if (!_.isEmpty(retrievePetData)) {
        for (const pet of retrievePetData) {
          const insuranceResults = await FetchPatientAccountDataDB.retrievePetInsurances(pet.pet_infoID)
          if (_.isEmpty(insuranceResults)) pet.insuranceName = ""
          else pet.insuranceName = insuranceResults[0].Insurance_name
        }
      }
      return retrievePetData
    } catch (error) {
      return []
    }
  }
}()
