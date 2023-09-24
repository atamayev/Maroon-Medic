import Button from "src/components/button"
import useAddAccordion from "src/custom-hooks/account-details/use-add-accordion"

export default function AddNewLocationButton () {
	const addAccordion = useAddAccordion()

	return (
		<Button
			className = "mr-3"
			colorClass = "bg-green-700"
			hoverClass = "hover:bg-green-800"
			title = "Add New Location"
			onClick = {() => addAccordion()}
			textColor = "text-white"
		/>
	)
}
