import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyServicesData from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-services-data"

export default async function updateServices(
	newServiceObject: ServiceItemNotNullablePrice,
	providedServices: ServiceItemNotNullablePrice[],
	setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemNotNullablePrice[]>>,
	setServicesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await useModifyServicesData(
		PrivateDoctorDataService.updateService,
		newServiceObject,
		providedServices,
		setProvidedServices,
		setServicesConfirmation
	)
}
