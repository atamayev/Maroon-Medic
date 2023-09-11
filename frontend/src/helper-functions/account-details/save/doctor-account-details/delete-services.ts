import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyServicesData from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-services-data"

export default async function deleteServices(
	serviceObject: ServiceItemNotNullablePrice,
	providedServices: ServiceItemNotNullablePrice[],
	setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemNotNullablePrice[]>>,
	setServicesConfirmation: (conf: ConfirmationMessage) => void,
	setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>> | null,
): Promise<void> {
	return await useModifyServicesData(
		PrivateDoctorDataService.deleteService,
		serviceObject,
		providedServices,
		setProvidedServices,
		setServicesConfirmation,
		setSelectedServices
	)
}
