import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import modifyServicesData from "../doctor-account-details-helpers/modify-services-data"

export default async function addServices(
	newServiceObject: ServiceItem,
	providedServices: ServiceItem[],
	setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>,
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
