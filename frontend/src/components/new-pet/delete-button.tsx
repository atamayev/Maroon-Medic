import Button from "../button"

interface Props{
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
  setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteButton = (props: Props) => {
	const { setNewPetData, setShowAddPet } = props
	return (
		<Button
			colorClass = "bg-red-500"
			hoverClass = "hover:bg-red-600"
			title = "X"
			onClick = {() =>
			{
				setNewPetData({} as PetItemForCreation)
				setShowAddPet(false)
			}}
		/>
	)
}

export default DeleteButton
