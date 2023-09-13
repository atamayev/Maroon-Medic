import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyServicesData from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-services-data"

export default async function addServices(
	newServiceObject: ServiceItemNotNullablePrice,
	setServicesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await useModifyServicesData(
		PrivateDoctorDataService.addService,
		newServiceObject,
		setServicesConfirmation
	)
}
