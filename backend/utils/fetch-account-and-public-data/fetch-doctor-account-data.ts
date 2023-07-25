import _ from "lodash"
import DataFormatter from "../data-formatter.ts"
import FetchDoctorAccountDataDB from "../../db/private-doctor-data/fetch-doctor-account-data-DB.ts"

type LanguageItem = {
  language_listID: number
  Language_name: string
}

type ServiceItem = {
  service_and_category_listID: number
  Category_name: string
  Service_name: string
  Service_time: string
  Service_price: number
}

type SpecialtyItem = {
  specialties_listID: number
  Organization_name: string
  Specialty_name: string
}

type EducationItem = {
  education_mappingID: number
  School_name: string
  Major_name?: string
  Education_type: string
  Start_Date: string
  End_Date: string
}

type DoctorAddressData = {
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
  address_public_status: boolean
  phones: PhoneData[]
  times: AvailabilityData[]
}

type PhoneData = {
  Phone: string
  phone_priority: number
}

interface AvailabilityData {
  Day_of_week: string
  Start_time: string
  End_time: string
}

type PetItem = {
  pet_listID: number
  Pet: string
  Pet_type: string
}

type DoctorStatus = {
  PubliclyAvailable: boolean
  Verified: boolean
}

type PicturesData = {
  picture_link: string
  picture_number: number
}

export default new class FetchDoctorAccountData {
  async #fetchDoctorAccountData<T>(DoctorID: number, retrievalFunction: (id: number) => Promise<T | T[]>): Promise<T | T[]> {
    try {
      const data = await retrievalFunction(DoctorID)
      return data
    } catch (error: any) {
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
    } catch (error: any) {
      return []
    }
  }

  async fetchDoctorLanguages (DoctorID: number): Promise<LanguageItem[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveLanguages)
    return result as LanguageItem[]
  }

  async fetchDoctorServices (DoctorID: number): Promise<ServiceItem[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveServices)
    return result as ServiceItem[]
  }

  async fetchDoctorSpecialties (DoctorID: number): Promise<SpecialtyItem[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveSpecialties)
    return result as SpecialtyItem[]
  }

  async fetchPreVetEducation(DoctorID: number): Promise<EducationItem[]> {
    const result = await this.#fetchDoctorEducationData(DoctorID, FetchDoctorAccountDataDB.retrievePreVetEducation)
    return result as EducationItem[]
  }

  async fetchVetEducation(DoctorID: number): Promise<EducationItem[]> {
    const result = await this.#fetchDoctorEducationData(DoctorID, FetchDoctorAccountDataDB.retrieveVetEducation)
    return result as EducationItem[]
  }

  async fetchDoctorAddressData (DoctorID: number): Promise<DoctorAddressData[]> {
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
    } catch (error: any) {
      return []
    }
  }

  async fetchDescriptionData (DoctorID: number): Promise<string> {
    try {
      const description = await FetchDoctorAccountDataDB.retrieveDescriptionData(DoctorID)
      return description || ""
    } catch (error: any) {
      return ""
    }
  }

  async fetchServicedPets (DoctorID: number): Promise<PetItem[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveServicedPets)
    return result as PetItem[]
  }

  async fetchVerifiedAndPubliclyAvailable (DoctorID: number): Promise<DoctorStatus> {
    try {
      const status = await FetchDoctorAccountDataDB.retrieveVerifiedAndPubliclyAvailableStatus(DoctorID)
      return status || {PubliclyAvailable: false, Verified: false}
    } catch (error: any) {
      return {PubliclyAvailable: false, Verified: false}
    }
  }

  async fetchDoctorPictures (DoctorID: number): Promise<PicturesData[]> {
    const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrievePictures)
    return result as PicturesData[]
  }
}()
