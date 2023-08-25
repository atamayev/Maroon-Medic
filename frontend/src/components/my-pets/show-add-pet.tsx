import Button from "../button"

interface Props {
  showAddPet: boolean
  setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowAddPet = (props: Props) => {
	const { showAddPet, setShowAddPet } = props

	if (showAddPet) return null

	return (
		<Button
			colorClass = "bg-green-600"
			hoverClass = "hover:bg-green-700"
			onClick = {() => {setShowAddPet(true)}}
			title = "Add a Pet"
			textColor = "text-white"
		/>
	)
}

export default ShowAddPet
