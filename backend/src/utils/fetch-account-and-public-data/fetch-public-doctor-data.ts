import _ from "lodash"
import DataFormatter from "../data-formatter"
import FetchPublicDoctorDataDB from "../../db/fetch-public-doctor-data-DB"

export default new class FetchPublicDoctorData {
  async #fetchDoctorData<T>(DoctorID: number, retrievalFunction: (id: number) => Promise<T | T[]>): Promise<T | T[]> {
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
      const newResults = educationData.map((object: T) => ({
        ...object,
        Start_Date: DataFormatter.formatEducationDates(object.Start_Date),
        End_Date: DataFormatter.formatEducationDates(object.End_Date)
      }))
      return newResults
    } catch (error: unknown) {
      return []
    }
  }

  async fetchDoctorLanguages (DoctorID: number): Promise<LanguagesData[]> {
    const result = await this.#fetchDoctorData(DoctorID, FetchPublicDoctorDataDB.retrieveDoctorLanguages)
    return result as LanguagesData[]
  }

  async fetchDoctorSpecialties (DoctorID: number): Promise<SpecialtiesData[]> {
    const result = await this.#fetchDoctorData(DoctorID, FetchPublicDoctorDataDB.retrieveDoctorSpecialties)
    return result as SpecialtiesData[]
  }

  async fetchPreVetEducation(DoctorID: number): Promise<PreVetEducationItemType[]> {
    return await this.#fetchEducationData<PreVetEducationItemType>(DoctorID, FetchPublicDoctorDataDB.retrievePreVetEducation)
  }

  async fetchVetEducation(DoctorID: number): Promise<VetEducationItemType[]> {
    return await this.#fetchEducationData<VetEducationItemType>(DoctorID, FetchPublicDoctorDataDB.retrieveVetEducation)
  }

  async fetchServicedPets (DoctorID: number): Promise<ServicedPetData[]> {
    const result = await this.#fetchDoctorData(DoctorID, FetchPublicDoctorDataDB.retrieveServicedPets)
    return result as ServicedPetData[]
  }

  async fetchDoctorAddressData (DoctorID: number): Promise<PublicAddressData[]> {
    let addressData

    try {
      addressData = await FetchPublicDoctorDataDB.retrieveAddressData(DoctorID)
    } catch (error: unknown) {
      return []
    }

    if (!_.isEmpty(addressData)) {
      // Create a new array of modified addressData objects
      addressData = await Promise.all(addressData.map(async address => {
        try {
          const availabilityData = await FetchPublicDoctorDataDB.retrieveAvailabilityData(address.addressesID)
          return { ...address, times: availabilityData }
        } catch (error: unknown) {
          console.error(error)
          return { ...address, times: [] } // fallback in case of an error
        }
      }))
    }
    return addressData as PublicAddressData[]
  }

  async fetchDoctorPersonalInfo (DoctorID: number): Promise<DoctorPersonalInfo> {
    const result = await this.#fetchDoctorData<DoctorPersonalInfo>(DoctorID, FetchPublicDoctorDataDB.retrievePersonalData)
    return result as DoctorPersonalInfo
  }
}()
