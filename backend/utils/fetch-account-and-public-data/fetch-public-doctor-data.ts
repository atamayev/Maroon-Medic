import _ from "lodash"
import DataFormatter from "../data-formatter.js"
import FetchPublicDoctorDataDB from "../../db/fetch-public-doctor-data-DB.js"

type LanguagesData = {
  Language_name: string
}

type SpecialtiesData = {
  Organization_name: string
  Specialty_name: string
}

type EducationData = {
  School_name: string
  Major_name?: string
  Education_type: string
  Start_Date: string
  End_Date: string
}

type PetData = {
  pet: number
  pet_type: string
}

type AddressData = {
  addressesID: number
  address_title: string
  address_line_1: string
  address_line_2: string
  city: string
  state: string
  zip: string
  country: string
  address_priority: number
  instant_book: boolean
  Phone: string
  phone_priority: number
  times: AvailabilityData[]
}

interface AvailabilityData {
  Day_of_week: string
  Start_time: string
  End_time: string
}

interface PersonalData {
  FirstName: string
  LastName: string
  Gender: string
}

export default new class FetchPublicDoctorData {
  async #fetchDoctorData<T>(DoctorID: number, retrievalFunction: (id: number) => Promise<T | T[]>): Promise<T | T[]> {
    try {
      const data = await retrievalFunction(DoctorID)
      return data
    } catch (error) {
      return []
    }
  }

  async #fetchDoctorEducationData<T>(DoctorID: number, retrievalFunction: (id: number) => Promise<T[]>): Promise<T[]> {
    try {
      const educationData = await retrievalFunction(DoctorID)
      const newResults = educationData.map((obj: any) => ({
        ...obj,
        Start_Date: DataFormatter.formatEducationDates(obj.Start_Date),
        End_Date: DataFormatter.formatEducationDates(obj.End_Date)
      }))
      return newResults
    } catch (error) {
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

  async fetchPreVetEducation(DoctorID: number): Promise<EducationData[]> {
    return this.#fetchDoctorEducationData(DoctorID, FetchPublicDoctorDataDB.retrievePreVetEducation)
  }

  async fetchVetEducation(DoctorID: number): Promise<EducationData[]> {
    return this.#fetchDoctorEducationData(DoctorID, FetchPublicDoctorDataDB.retrieveVetEducation)
  }

  async fetchServicedPets (DoctorID: number): Promise<PetData[]> {
    const result = await this.#fetchDoctorData(DoctorID, FetchPublicDoctorDataDB.retrieveServicedPets)
    return result as PetData[]
  }

  async fetchDoctorAddressData (DoctorID: number): Promise<AddressData[]> {
    let addressData

    try {
      addressData = await FetchPublicDoctorDataDB.retrieveAddressData(DoctorID)
    } catch (error) {
      return []
    }

    if (!_.isEmpty(addressData)) {
      // Create a new array of modified addressData objects
      addressData = await Promise.all(addressData.map(async address => {
        try {
          const availabilityData = await FetchPublicDoctorDataDB.retrieveAvailabilityData(address.addressesID)
          return { ...address, times: availabilityData }
        } catch (error) {
          console.error(error)
          return { ...address, times: [] } // fallback in case of an error
        }
      }))
    }
    return addressData as AddressData[]
  }

  async fetchDoctorPersonalInfo (DoctorID: number): Promise<PersonalData> {
    const result = await this.#fetchDoctorData<PersonalData>(DoctorID, FetchPublicDoctorDataDB.retrievePersonalData)
    return result as PersonalData
  }
}()
