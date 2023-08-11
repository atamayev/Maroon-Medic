/* eslint-disable complexity */
import _ from "lodash"
import { useEffect } from "react"
import ListsDataService from "src/services/lists-data-service"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

async function FillLists(setListDetails: React.Dispatch<React.SetStateAction<DoctorListDetails>>): Promise<void> {
  try {
    const response = await ListsDataService.fillDoctorLists()
    setListDetails(response.data)
    sessionStorage.setItem("ListDetails", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

async function FillDoctorAccountDetails(
  dispatchers: DoctorAccountDispatchers
): Promise<void> {
  try {
    const response = await PrivateDoctorDataService.fillAccountDetails()
    if (response.data) {
      if (response.data.languages) dispatchers.setSpokenLanguages(response.data.languages)
      if (response.data.services) {
        dispatchers.setProvidedServices(response.data.services)
        dispatchers.setExpandedCategories(response.data.services.map((service: ServiceItem) => service.Category_name))
      }
      if (response.data.specialties) dispatchers.setDoctorSpecialties(response.data.specialties)
      if (response.data.preVetEducation) dispatchers.setPreVetEducation(response.data.preVetEducation)
      if (response.data.vetEducation) dispatchers.setVetEducation(response.data.vetEducation)
      if (response.data.addressData) dispatchers.setAddresses(response.data.addressData)
      if (response.data.description) dispatchers.setDescription(response.data.description)
      if (response.data.servicedPets) {
        dispatchers.setServicedPets(response.data.servicedPets)
        dispatchers.setExpandedPetTypes(response.data.servicedPets.map((pet: ServicedPetItem) => pet.Pet_type))
      }
      if (_.has(response.data, "publiclyAvailable")) dispatchers.setPubliclyAvailable(response.data.publiclyAvailable)
      // if (response.data.pictures) ; //set pictures
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

export function useDoctorAccountDetails(
  setListDetails: React.Dispatch<React.SetStateAction<DoctorListDetails>>,
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>,
  dispatchers: DoctorAccountDispatchers
): void {
  const getDoctorAccountDetails: () => void = async () => {
    try {
      const storedAccountDetails = sessionStorage.getItem("DoctorAccountDetails")
      if (!storedAccountDetails) {
        await FillDoctorAccountDetails(dispatchers)
      } else setExpandedCategories(JSON.parse(storedAccountDetails).services?.map((service: ServiceItem) => service.Category_name))

      const storedListDetails = sessionStorage.getItem("ListDetails")
      if (storedListDetails) setListDetails(JSON.parse(storedListDetails))
      else await FillLists(setListDetails)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDoctorAccountDetails()
  }, [])
}
