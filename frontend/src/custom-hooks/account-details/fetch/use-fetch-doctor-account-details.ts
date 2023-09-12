/* eslint-disable complexity */
import _ from "lodash"
import { useContext, useCallback } from "react"
import { AppContext } from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchDoctorAccountDetails(dispatchers: DoctorAccountDispatchers): () => Promise<void> {
	const { initializeDoctorAccountDetails } = useContext(AppContext)

	const fetchDoctorAccountDetails = useCallback(async () => {
		try {
			const response = await PrivateDoctorDataService.fillAccountDetails()

			if (response.data) {
			// Consider structuring this part to avoid repetitive code
				if (response.data.languages) dispatchers.setSpokenLanguages(response.data.languages)
				if (response.data.services) {
					dispatchers.setProvidedServices(response.data.services)
					dispatchers.setExpandedCategories(
						response.data.services.map((service: ServiceItemNotNullablePrice) => service.categoryName)
					)
				}
				if (response.data.specialties) dispatchers.setDoctorSpecialties(response.data.specialties)
				if (response.data.preVetEducation) dispatchers.setPreVetEducation(response.data.preVetEducation)
				if (response.data.vetEducation) dispatchers.setVetEducation(response.data.vetEducation)
				if (response.data.addressData) dispatchers.setAddresses(response.data.addressData)
				if (response.data.description) dispatchers.setDescription(response.data.description)
				if (response.data.servicedPets) {
					dispatchers.setServicedPets(response.data.servicedPets)
					dispatchers.setExpandedPetTypes(response.data.servicedPets.map((pet: ServicedPetItem) => pet.petType))
				}
				if (_.has(response.data, "publiclyAvailable")) dispatchers.setPubliclyAvailable(response.data.publiclyAvailable)
				// if (response.data.pictures) ; //set pictures
				initializeDoctorAccountDetails(response.data)
			}
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}, [initializeDoctorAccountDetails, dispatchers])

	return fetchDoctorAccountDetails
}
