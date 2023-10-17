import { useContext } from "react"
import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"
import AppContext from "src/contexts/maroon-context"
import _ from "lodash"

type ServiceOperationsType = typeof PrivateDoctorDataService.deleteService |
                             typeof PrivateDoctorDataService.updateService |
                             typeof PrivateDoctorDataService.addService
type ModifyServicesFunction = (
	operation: ServiceOperationsType,
	serviceObject: ServiceItemNotNullablePrice,
	setServicesConfirmation: (conf: ConfirmationMessage) => void,
	setSelectedServices?: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>>
) => Promise<void>

export default function useModifyServicesData() : ModifyServicesFunction {
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	return async (
		operation: ServiceOperationsType,
		serviceObject: ServiceItemNotNullablePrice,
		setServicesConfirmation: (conf: ConfirmationMessage) => void,
		setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>> | null = null
	): Promise<void> => {
		try {
			if (_.isNil(doctorAccountDetails)) return

			const response = await operation(serviceObject)

			if (response.status === 200) {
				let newProvidedServices
				if (operation === PrivateDoctorDataService.addService) {
					newProvidedServices = [...doctorAccountDetails.services, serviceObject]
				} else if (operation === PrivateDoctorDataService.updateService) {
					newProvidedServices = doctorAccountDetails.services.map(service =>
						service.serviceAndCategoryListId === serviceObject.serviceAndCategoryListId ? serviceObject : service
					)
				} else if (operation === PrivateDoctorDataService.deleteService) {
					newProvidedServices = doctorAccountDetails.services.filter(service =>
						service.serviceAndCategoryListId !== serviceObject.serviceAndCategoryListId
					)
					// eslint-disable-next-line max-depth
					if (setSelectedServices) setSelectedServices(newProvidedServices)
				} else {
					throw new Error("Unknown operation")
				}

				doctorAccountDetails.services = newProvidedServices
				setServicesConfirmation({messageType: "saved"})
			}
		} catch (error: unknown) {
			handle401AxiosErrorAndSetMessageType(error, setServicesConfirmation)
		}
	}
}
