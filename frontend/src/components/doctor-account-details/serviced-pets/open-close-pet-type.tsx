import { observer } from "mobx-react"
import Button from "src/components/button"
import togglePetType from "src/helper-functions/account-details/toggle/toggle-pet-type"

interface Props {
	pets: ServicedPetItem[]
	petType: string
	expandedPetTypes: string[]
	setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>
}

function OpenClosePetType (props: Props) {
	const { pets, petType, expandedPetTypes, setExpandedPetTypes } = props
	if (pets.length <= 1) return null

	const isOpen = expandedPetTypes.includes(petType)

	function IsOpen () {
		if (isOpen) return "^"
		return "v"
	}

	return (
		<Button
			className = "ml-2"
			colorClass = "bg-blue-600"
			hoverClass = "hover:bg-blue-700"
			title = {IsOpen()}
			onClick={() => togglePetType(petType, setExpandedPetTypes)}
			textColor = "text-white"
		/>
	)
}

export default observer(OpenClosePetType)
