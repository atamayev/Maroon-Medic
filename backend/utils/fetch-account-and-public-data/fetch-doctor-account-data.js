import _ from "lodash"
import DataFormatter from "../data-formatter.js"
import FetchDoctorAccountDataDB from "../../db/private-doctor-data/fetch-doctor-account-data-DB.js"

/** FetchDoctorAccountDataDB is fairly self-explanatory
 *  Here, each Doctor's particular data is fetched from the DB.
 *  For the functions with multiple table names, joins are used to match a particular doctor's records with the actual name.
 *  For example, a table might have: {Bob, 3}, {Bob, 7}, and then a mapping table shows that 3 and 7 are actually English and French. This is done to keep the data in the mapping tables as small as possible
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export default new class FetchDoctorAccountData {
  async #fetchDoctorAccountData(DoctorID, retrievalFunction) {
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
    return this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveLanguages)
  }

  async fetchDoctorServices (DoctorID) {
    return this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveServices)
  }

  async fetchDoctorSpecialties (DoctorID) {
    return this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveSpecialties)
  }

  async fetchPreVetEducation(DoctorID) {
    return this.#fetchDoctorEducationData(DoctorID, FetchDoctorAccountDataDB.retrievePreVetEducation)
  }

  async fetchVetEducation(DoctorID) {
    return this.#fetchDoctorEducationData(DoctorID, FetchDoctorAccountDataDB.retrieveVetEducation)
  }

  //Fetch Address Data first finds the addresses associated with a DoctorID, and then finds all of the times/days of week associated with each address.
  async fetchDoctorAddressData (DoctorID) {
    try {
      const addressData = await FetchDoctorAccountDataDB.retrieveAddressData(DoctorID)

      if (!_.isEmpty(addressData)) {
        for (const address of addressData) {
          const times = await FetchDoctorAccountDataDB.retrieveAvailabilityData(address.addressesID)
          address.times = times

          const phoneData = await FetchDoctorAccountDataDB.retrievePhoneData(address.addressesID)

          if (_.isEmpty(phoneData)) address.phone = ""
          else {
            address.phone = phoneData[0].Phone
            address.phone_priority = phoneData[0].phone_priority
          }
        }
      }
      return addressData
    } catch (error) {
      return []
    }
  }

  async fetchDescriptionData (DoctorID) {
    try {
      const description = await FetchDoctorAccountDataDB.retrieveDescriptionData(DoctorID)
      if (_.isEmpty(description)) return ("")
      else {
        const Description = description[0].Description
        return (Description)
      }
    } catch (error) {
      return ("")
    }
  }

  async fetchServicedPets (DoctorID) {
    return this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrieveServicedPets)
  }

  async fetchVerifiedAndPubliclyAvailable (DoctorID) {
    try {
      const results = await FetchDoctorAccountDataDB.retrieveVerifiedAndPubliclyAvailableStatus(DoctorID)
      if (_.isEmpty(results)) return {PubliclyAvailable: false, Verified: false}
      return {PubliclyAvailable: results[0].publiclyAvailable, Verified: results[0].publiclyAvailable}
    } catch (error) {
      return {PubliclyAvailable: false, Verified: false}
    }
  }

  async fetchDoctorPictures (DoctorID) {
    return this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.retrievePictures)
  }
}()
