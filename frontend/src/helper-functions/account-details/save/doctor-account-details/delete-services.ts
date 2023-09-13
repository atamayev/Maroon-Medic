import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyServicesData from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-services-data"

export default async function deleteServices(
	serviceObject: ServiceItemNotNullablePrice,
	setServicesConfirmation: (conf: ConfirmationMessage) => void,
	setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>> | null,
): Promise<void> {
	return await useModifyServicesData(
		PrivateDoctorDataService.deleteService,
		serviceObject,
		setServicesConfirmation,
		setSelectedServices
	)
}
