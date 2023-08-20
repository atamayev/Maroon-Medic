import { Button } from "react-bootstrap"

interface Props {
  showAddPet: boolean
  setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowAddPet = (props: Props) => {
  const { showAddPet, setShowAddPet } = props

  if (showAddPet) return null

  return (
    <>
      <Button
        variant = "primary"
        onClick = {() => {setShowAddPet(true)}}
      >
        Add a Pet
      </Button>
    </>
  )
}

export default ShowAddPet
