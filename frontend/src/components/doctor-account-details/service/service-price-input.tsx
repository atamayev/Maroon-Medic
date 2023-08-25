import _ from "lodash"
import {
	handleNumericInput,
	preventNonNumericalInput,
	validateDropInput,
	validatePasteInput
} from "src/utils/input-validation"

interface Props {
	service: ServiceListItem
	selectedService: ServiceItemNullablePrice
	selectedServices: ServiceItemNullablePrice[]
	setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItemNullablePrice[]>>
}

const ServicePriceInput = (props: Props) => {
	const { service, selectedService, selectedServices, setSelectedServices } = props
	return (
		<span className = "ml-2" style={{ position: "relative" }}>
			<span
				style={{
					position: "absolute",
					left: "10px",
					top: "50%",
					transform: "translateY(-50%)",
				}}
			>
				$
			</span>
			<input
				type = "text"
				placeholder = "Service Price ($)"
				id = {`price-${service.service_and_category_listID}`}
				required
				value={_.isNumber(selectedService.Service_price) ? selectedService.Service_price : ""}
				onChange={(e) => handleNumericInput(
					e,
					(newVal) => {
						console.log(newVal)
						const updatedServices = selectedServices.map(s => {
							if (s.service_and_category_listID === service.service_and_category_listID) {
								console.log("Number(newVal)", parseFloat(newVal))
								return { ...s, Service_price: Number(newVal) }
							}
							return s
						})
						setSelectedServices(updatedServices)
					}
				)}

				onKeyUp = {preventNonNumericalInput}
				onPaste = {validatePasteInput}
				onDrop = {validateDropInput}
				style = {{
					paddingLeft: "20px",
				}}
			/>
		</span>
	)
}

export default ServicePriceInput
