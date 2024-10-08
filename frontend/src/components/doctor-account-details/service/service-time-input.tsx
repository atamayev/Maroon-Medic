interface Props {
  service: ServiceListItem
  selectedService: ServiceItemNullablePrice
  selectedServices: ServiceItemNullablePrice[]
  setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>>
}

const timeOptions = [
	...Array.from({ length: 11 }, (x, i) => ((i + 1) * 5) + " minutes"),
	"1 hour",
	"2 hours",
	"3 hours",
	"4 hours",
	"1 day",
	"2 days",
	"3 days",
]

export default function ServiceTimeInput (props: Props) {
	const { service, selectedService, selectedServices, setSelectedServices } = props
	return (
		<select
			id = {`time-${service.serviceAndCategoryListId}`}
			required
			value = {selectedService.serviceTime || ""}
			onChange = {(e) => {
				const updatedServices = selectedServices.map((s) => {
					if (s.serviceAndCategoryListId === service.serviceAndCategoryListId) {
						return { ...s, serviceTime: e.target.value }
					}
					return s
				})
				setSelectedServices(updatedServices)
			}}
		>
			<option value = "" disabled>
				Service Time
			</option>
			{timeOptions.map((time) => (
				<option key = {time} value = {time}>
					{time}
				</option>
			))}
		</select>
	)
}
