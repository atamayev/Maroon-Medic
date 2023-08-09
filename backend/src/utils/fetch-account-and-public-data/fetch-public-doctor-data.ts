import _ from "lodash"
import Format from "../data-formatter"
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
        Start_Date: Format.educationDates(object.Start_Date),
        End_Date: Format.educationDates(object.End_Date)
      }))
      return newResults
    } catch (error: unknown) {
      return []
    }
  }

  async languages (DoctorID: number): Promise<LanguagesData[]> {
    const result = await this.#fetchDoctorData(DoctorID, FetchPublicDoctorDataDB.languages)
    return result as LanguagesData[]
  }

  async specialties (DoctorID: number): Promise<SpecialtiesData[]> {
    const result = await this.#fetchDoctorData(DoctorID, FetchPublicDoctorDataDB.specialties)
    return result as SpecialtiesData[]
  }

  async preVetEducation(DoctorID: number): Promise<PreVetEducationItemType[]> {
    return await this.#fetchEducationData<PreVetEducationItemType>(DoctorID, FetchPublicDoctorDataDB.preVetEducation)
  }

  async vetEducation(DoctorID: number): Promise<VetEducationItemType[]> {
    return await this.#fetchEducationData<VetEducationItemType>(DoctorID, FetchPublicDoctorDataDB.vetEducation)
  }

  async servicedPets (DoctorID: number): Promise<ServicedPetData[]> {
    const result = await this.#fetchDoctorData(DoctorID, FetchPublicDoctorDataDB.servicedPets)
    return result as ServicedPetData[]
  }

  async addresses (DoctorID: number): Promise<PublicAddressData[]> {
    let addressData

    try {
      addressData = await FetchPublicDoctorDataDB.addressData(DoctorID)
    } catch (error: unknown) {
      return []
    }

    if (!_.isEmpty(addressData)) {
      // Create a new array of modified addressData objects
      addressData = await Promise.all(addressData.map(async address => {
        try {
          const availabilityData = await FetchPublicDoctorDataDB.availabilityData(address.addressesID)
          return { ...address, times: availabilityData }
        } catch (error: unknown) {
          console.error(error)
          return { ...address, times: [] }
        }
      }))
    }
    return addressData as PublicAddressData[]
  }

  async personalInfo (DoctorID: number): Promise<DoctorPersonalInfo> {
    const result = await this.#fetchDoctorData<DoctorPersonalInfo>(DoctorID, FetchPublicDoctorDataDB.personalData)
    return result as DoctorPersonalInfo
  }
}()
