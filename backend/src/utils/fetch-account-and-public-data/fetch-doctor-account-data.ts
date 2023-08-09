import _ from "lodash"
import Format from "../data-formatter"
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

  async #fetchEducationData<T extends EducationItemType>(
    DoctorID: number,
    retrievalFunction: (id: number) => Promise<T[]>
  ): Promise<T[]> {
    try {
      const educationData = await retrievalFunction(DoctorID)
      const newResults = educationData.map((obj: T) => ({
        ...obj,
        Start_Date: Format.educationDates(obj.Start_Date),
        End_Date: Format.educationDates(obj.End_Date)
      }))
      return newResults
    } catch (error: unknown) {
      return []
    }
  }

  async languages (DoctorID: number): Promise<LanguageItemType[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.languages)
    return result as LanguageItemType[]
  }

  async services (DoctorID: number): Promise<ServiceItemType[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.services)
    return result as ServiceItemType[]
  }

  async specialties (DoctorID: number): Promise<SpecialtyItemType[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.specialties)
    return result as SpecialtyItemType[]
  }

  async preVetEducation(DoctorID: number): Promise<PreVetEducationItemType[]> {
    const result = await this.#fetchEducationData<PreVetEducationItemType>(DoctorID, FetchDoctorAccountDataDB.preVetEducation)
    return result as PreVetEducationItemType[]
  }

  async vetEducation(DoctorID: number): Promise<VetEducationItemType[]> {
    const result = await this.#fetchEducationData<VetEducationItemType>(DoctorID, FetchDoctorAccountDataDB.vetEducation)
    return result as VetEducationItemType[]
  }

  async addresses (DoctorID: number): Promise<PrivateDoctorAddressData[]> {
    try {
      const addressData = await FetchDoctorAccountDataDB.addressData(DoctorID)

      if (!_.isEmpty(addressData)) {
        for (const address of addressData) {
          const times = await FetchDoctorAccountDataDB.availabilityData(address.addressesID)
          address.times = times

          const phoneData = await FetchDoctorAccountDataDB.phoneData(address.addressesID)
          address.Phone = phoneData
        }
      }
      return addressData
    } catch (error: unknown) {
      return []
    }
  }

  async description (DoctorID: number): Promise<string> {
    try {
      const description = await FetchDoctorAccountDataDB.descriptionData(DoctorID)
      return description || ""
    } catch (error: unknown) {
      return ""
    }
  }

  async servicedPets (DoctorID: number): Promise<ServicedPetItemType[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.servicedPets)
    return result as ServicedPetItemType[]
  }

  async verifiedAndPubliclyAvailable (DoctorID: number): Promise<DoctorStatusType> {
    try {
      const status = await FetchDoctorAccountDataDB.verifiedAndPubliclyAvailableStatus(DoctorID)
      return status || {PubliclyAvailable: false, Verified: false}
    } catch (error: unknown) {
      return {PubliclyAvailable: false, Verified: false}
    }
  }

  async pictures (DoctorID: number): Promise<PicturesItemType[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.pictures)
    return result as PicturesItemType[]
  }
}()
