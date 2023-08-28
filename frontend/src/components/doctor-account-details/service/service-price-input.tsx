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
				id = {`price-${service.serviceAndCategoryListId}`}
				required
				value={_.isNumber(selectedService.servicePrice) ? selectedService.servicePrice : ""}
				onChange={(e) => handleNumericInput(
					e,
					(newVal) => {
						const updatedServices = selectedServices.map(s => {
							if (s.serviceAndCategoryListId === service.serviceAndCategoryListId) {
								return { ...s, servicePrice: Number(newVal) }
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
