import Button from "src/components/button"
import useAddAccordion from "src/helper-functions/account-details/add/use-add-accordion"

export default function AddNewLocationButton () {
	return (
		<Button
			className = "mr-3"
			colorClass = "bg-green-700"
			hoverClass = "hover:bg-green-800"
			title = "Add New Location"
			onClick = {() => useAddAccordion()}
			textColor = "text-white"
		/>
	)
}
