import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import modifyServicesData from "../doctor-account-details-helpers/modify-services-data"

export default async function addServices(
	newServiceObject: ServiceItemNotNullablePrice,
	providedServices: ServiceItemNotNullablePrice[],
	setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemNotNullablePrice[]>>,
	setServicesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await modifyServicesData(
		PrivateDoctorDataService.addService,
		newServiceObject,
		providedServices,
		setProvidedServices,
		setServicesConfirmation
	)
}
