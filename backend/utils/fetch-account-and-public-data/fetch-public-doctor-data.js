import _ from "lodash"
import DataFormatter from "../data-formatter.js"
import FetchPublicDoctorDataDB from "../../db/fetch-public-doctor-data-DB.js"

export default new class FetchPublicDoctorData {
  async #fetchDoctorData(DoctorID, retrievalFunction) {
    try {
      const data = await retrievalFunction(DoctorID)
      return data
    } catch (error) {
      return []
    }
  }

  async #fetchDoctorEducationData(DoctorID, retrievalFunction) {
    try {
      const educationData = await retrievalFunction(DoctorID)
      const newResults = educationData.map(obj => ({
        ...obj,
        Start_Date: DataFormatter.formatEducationDates(obj.Start_Date),
        End_Date: DataFormatter.formatEducationDates(obj.End_Date)
      }))
      return newResults
    } catch (error) {
      return []
    }
  }

  async fetchDoctorLanguages (DoctorID) {
    return this.#fetchDoctorData(DoctorID, FetchPublicDoctorDataDB.retrieveDoctorLanguages)
  }

  async fetchDoctorSpecialties (DoctorID) {
    return this.#fetchDoctorData(DoctorID, FetchPublicDoctorDataDB.retrieveDoctorSpecialties)

  }

  async fetchPreVetEducation(DoctorID) {
    return this.#fetchDoctorEducationData(DoctorID, FetchPublicDoctorDataDB.retrievePreVetEducation)
  }

  async fetchVetEducation(DoctorID) {
    return this.#fetchDoctorEducationData(DoctorID, FetchPublicDoctorDataDB.retrieveVetEducation)
  }

  async fetchServicedPets (DoctorID) {
    return this.#fetchDoctorData(DoctorID, FetchPublicDoctorDataDB.retrieveServicedPets)
  }

  async fetchDoctorAddressData (DoctorID) {
    let addressData

    try {
      addressData = await FetchPublicDoctorDataDB.retrieveAddressData(DoctorID)
    } catch (error) {
      return []
    }

    if (!_.isEmpty(addressData)) {
      for (const address of addressData) {
        try {
          const availabilityData = await FetchPublicDoctorDataDB.retrieveAvailabilityData(address.addressesID)
          address.times = availabilityData
        } catch (error) {
          return []
        }
      }
    }
    return addressData
  }

  async fetchDoctorPersonalInfo (DoctorID) {
    return this.#fetchDoctorData(DoctorID, FetchPublicDoctorDataDB.retrievePersonalData)
  }
}()
