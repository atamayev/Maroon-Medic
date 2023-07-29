import _ from "lodash"
import DataFormatter from "../data-formatter"
import FetchDoctorAccountDataDB from "../../db/private-doctor-data/fetch-doctor-account-data-DB"

export default new class FetchDoctorAccountData {
  async #fetchDoctorAccountData<T>(DoctorID: number, retrievalFunction: (id: number) => Promise<T | T[]>): Promise<T | T[]> {
    try {
      const data = await retrievalFunction(DoctorID)
      return data
    } catch (error: unknown) {
      return []
    }
  }

  async #fetchDoctorEducationData(
    DoctorID: number,
    retrievalFunction: (id: number) => Promise<EducationItemType[]>
  ): Promise<EducationItemType[]> {
    try {
      const educationData = await retrievalFunction(DoctorID)
      const newResults = educationData.map((obj: EducationItemType) => ({
        ...obj,
        Start_Date: DataFormatter.formatEducationDates(obj.Start_Date),
        End_Date: DataFormatter.formatEducationDates(obj.End_Date)
      }))
      return newResults
    } catch (error: unknown) {
      return []
    }
  }

  async fetchDoctorLanguages (DoctorID: number): Promise<LanguageItemType[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveLanguages)
    return result as LanguageItemType[]
  }

  async fetchDoctorServices (DoctorID: number): Promise<ServiceItemType[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveServices)
    return result as ServiceItemType[]
  }

  async fetchDoctorSpecialties (DoctorID: number): Promise<SpecialtyItemType[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveSpecialties)
    return result as SpecialtyItemType[]
  }

  async fetchPreVetEducation(DoctorID: number): Promise<EducationItemType[]> {
    const result = await this.#fetchDoctorEducationData(DoctorID, FetchDoctorAccountDataDB.retrievePreVetEducation)
    return result as EducationItemType[]
  }

  async fetchVetEducation(DoctorID: number): Promise<EducationItemType[]> {
    const result = await this.#fetchDoctorEducationData(DoctorID, FetchDoctorAccountDataDB.retrieveVetEducation)
    return result as EducationItemType[]
  }

  async fetchDoctorAddressData (DoctorID: number): Promise<DoctorAddressDataType[]> {
    try {
      const addressData = await FetchDoctorAccountDataDB.retrieveAddressData(DoctorID)

      if (!_.isEmpty(addressData)) {
        for (const address of addressData) {
          const times = await FetchDoctorAccountDataDB.retrieveAvailabilityData(address.addressesID)
          address.times = times

          const phoneData = await FetchDoctorAccountDataDB.retrievePhoneData(address.addressesID)

          if (_.isEmpty(phoneData)) address.phones = []
          else {
            address.phones = [{Phone: phoneData[0].Phone, phone_priority: phoneData[0].phone_priority}]
          }
        }
      }
      return addressData
    } catch (error: unknown) {
      return []
    }
  }

  async fetchDescriptionData (DoctorID: number): Promise<string> {
    try {
      const description = await FetchDoctorAccountDataDB.retrieveDescriptionData(DoctorID)
      return description || ""
    } catch (error: unknown) {
      return ""
    }
  }

  async fetchServicedPets (DoctorID: number): Promise<ServicedPetItemType[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveServicedPets)
    return result as ServicedPetItemType[]
  }

  async fetchVerifiedAndPubliclyAvailable (DoctorID: number): Promise<DoctorStatusType> {
    try {
      const status = await FetchDoctorAccountDataDB.retrieveVerifiedAndPubliclyAvailableStatus(DoctorID)
      return status || {PubliclyAvailable: false, Verified: false}
    } catch (error: unknown) {
      return {PubliclyAvailable: false, Verified: false}
    }
  }

  async fetchDoctorPictures (DoctorID: number): Promise<PicturesItemType[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrievePictures)
    return result as PicturesItemType[]
  }
}()
