import _ from "lodash"
import DataFormatter from "../data-formatter.js"
import FetchPublicDoctorDataDB from "../../db/fetch-public-doctor-data-DB.js"

/**
 * FetchPublicDoctorDataDB fetches all of a specific Doctor's data, concatenating all results as arrays to an array
 */
export default new class FetchPublicDoctorData {
  async fetchDoctorLanguages (User_ID) {
    try {
      const languages = await FetchPublicDoctorDataDB.retrieveDoctorLanguages(User_ID)
      return languages
    } catch (error) {
      return []
    }
  }

  async fetchDoctorSpecialties (Doctor_ID) {
    try {
      const specialties = await FetchPublicDoctorDataDB.retrieveDoctorSpecialties(Doctor_ID)
      return specialties
    } catch (error) {
      return []
    }
  }

  async fetchPreVetEducation (Doctor_ID) {
    try {
      const preVetEducation = await FetchPublicDoctorDataDB.retrievePreVetEducation(Doctor_ID)
      const newResults = preVetEducation.map(obj => ({
        ...obj,
        Start_Date: DataFormatter.formatEducationDates(obj.Start_Date),
        End_Date: DataFormatter.formatEducationDates(obj.End_Date)
      }))
      return newResults
    } catch (error) {
      return []
    }
  }

  async fetchVetEducation (Doctor_ID) {
    try {
      const vetEducation = await FetchPublicDoctorDataDB.retrieveVetEducation(Doctor_ID)
      const newResults = vetEducation.map(obj => ({
        ...obj,
        Start_Date: DataFormatter.formatEducationDates(obj.Start_Date),
        End_Date: DataFormatter.formatEducationDates(obj.End_Date)
      }))
      return newResults
    } catch (error) {
      return []
    }
  }

  async fetchServicedPets (Doctor_ID) {
    try {
      const servicedPets = await FetchPublicDoctorDataDB.retrieveServicedPets(Doctor_ID)
      return servicedPets
    } catch (error) {
      return []
    }
  }


  async fetchDoctorAddressData (DoctorID) {
    let addressData

    try {
      addressData = await FetchPublicDoctorDataDB.retrieveDoctorAddressData(DoctorID)
    } catch (error) {
      return []
    }

    if (!_.isEmpty(addressData)) {
      for (let i = 0; i < addressData.length; i++) {
        try {
          const availabilityData = await FetchPublicDoctorDataDB.retrieveAvailabilityData(addressData[i].addressesID)
          addressData[i].times = availabilityData
        } catch (error) {
          return []
        }
      }
    }
    return addressData
  }

  async fetchDoctorPersonalInfo (User_ID) {
    try {
      const DoctorPersonalInfo = await FetchPublicDoctorDataDB.retrieveDoctorPersonalInfo(User_ID)
      return (DoctorPersonalInfo)
    } catch (error) {
      return []
    }
  }
}()
