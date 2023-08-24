const handleServiceChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	providedServices: ServiceItem[],
	setSelectedService: React.Dispatch<React.SetStateAction<ServiceItem | null>>,
	setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressData | null>>,
	setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>,
	setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
): void => {
	const value = event.target.value
	const selectedServiceObject = providedServices.find(service => service.service_and_category_listID.toString() === value)
	setSelectedService(selectedServiceObject || null)
	if (value === "Select...") {
		setSelectedLocation(null)
		setSelectedDay(null)
		setSelectedTime(null)
	}
}

export default handleServiceChange
