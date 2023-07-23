import _ from "lodash"
import FetchPatientAccountDataDB from "../../db/private-patient-data/fetch-patient-account-data-DB.js"

type LanguageItem = {
  language_listID: number
  Language_name: string
}

type PetItem = {
  Name: string
  Gender: string
  DOB: string
  Pet: string
  Pet_type: string
  pet_infoID: number
  insuranceName: InsuranceItem
}

type InsuranceItem = {
  Insurance_name: string
}

export default new class FetchPatientAccountData {
  async fetchPatientLanguages (PatientID: number): Promise<LanguageItem[]> {
    try {
      const languages = await FetchPatientAccountDataDB.retrievePatientLanguages(PatientID)
      return languages
    } catch (error) {
      return []
    }
  }

  async fetchPetData (PatientID: number): Promise<PetItem[]> {
    try {
      const retrievePetData = await FetchPatientAccountDataDB.retrievePetData(PatientID)

      if (!_.isEmpty(retrievePetData)) {
        for (const pet of retrievePetData) {
          const insuranceResults = await FetchPatientAccountDataDB.retrievePetInsurances(pet.pet_infoID)
          pet.insuranceName = insuranceResults || ""
        }
      }
      return retrievePetData
    } catch (error) {
      return []
    }
  }
}()
