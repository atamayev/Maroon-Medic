import { Button } from "react-bootstrap"

interface Props{
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
  setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteButton = (props: Props) => {
  const { setNewPetData, setShowAddPet } = props
  return (
    <Button
      variant = "danger"
      onClick = {() =>
      {
        setNewPetData({} as PetItemForCreation)
        setShowAddPet(false)
      }}
    >
      X
    </Button>
  )
}

export default DeleteButton
