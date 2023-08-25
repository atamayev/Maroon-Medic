import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

type ServiceOperationsType = typeof PrivateDoctorDataService.deleteService |
                             typeof PrivateDoctorDataService.updateService |
                             typeof PrivateDoctorDataService.addService

export default async function modifyServicesData(
	operation: ServiceOperationsType,
	serviceObject: ServiceItemNotNullablePrice,
	providedServices: ServiceItemNotNullablePrice[],
	setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemNotNullablePrice[]>>,
	setServicesConfirmation: (conf: ConfirmationMessage) => void,
	setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>> | null = null
): Promise<void> {
	try {
		const response = await operation(serviceObject)

		if (response.status === 200) {
			let newProvidedServices
			if (operation === PrivateDoctorDataService.addService) {
				newProvidedServices = [...providedServices, serviceObject]
			} else if (operation === PrivateDoctorDataService.updateService) {
				newProvidedServices = providedServices.map(service =>
					service.service_and_category_listID === serviceObject.service_and_category_listID ? serviceObject : service
				)
			} else if (operation === PrivateDoctorDataService.deleteService) {
				newProvidedServices = providedServices.filter(service =>
					service.service_and_category_listID !== serviceObject.service_and_category_listID
				)
				// eslint-disable-next-line max-depth
				if (setSelectedServices) setSelectedServices(newProvidedServices)
			} else {
				throw new Error("Unknown operation")
			}

			setProvidedServices(newProvidedServices)
			const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")
			DoctorAccountDetails.services = newProvidedServices
			sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
			setServicesConfirmation({messageType: "saved"})
		}
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setServicesConfirmation)
	}
}
