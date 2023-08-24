import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import modifyServicesData from "../doctor-account-details-helpers/modify-services-data"

export default async function deleteServices(
	serviceObject: ServiceItem,
	providedServices: ServiceItem[],
	setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>,
	setServicesConfirmation: (conf: ConfirmationMessage) => void,
	setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>> | null,
): Promise<void> {
	return await modifyServicesData(
		PrivateDoctorDataService.deleteService,
		serviceObject,
		providedServices,
		setProvidedServices,
		setServicesConfirmation,
		setSelectedServices
	)
}
