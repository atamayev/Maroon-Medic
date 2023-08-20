import { Button } from "react-bootstrap"
import { handleTogglePetType } from "src/custom-hooks/account-details-hooks/select"

interface Props {
  pets: ServicedPetItem[]
  petType: string
  expandedPetTypes: string[]
  setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>
}

const IsTogglePetType = (props: Props) => {
  const { pets, petType, expandedPetTypes, setExpandedPetTypes } = props
  if (pets.length <= 1) return null

  const isOpen = expandedPetTypes.includes(petType)

  const RenderIsOpen = () => {
    if (isOpen) return <>^</>
    return <>v</>
  }

  return (
    <Button onClick={() => handleTogglePetType(petType, setExpandedPetTypes)}>
      <RenderIsOpen />
    </Button>
  )
}

export default IsTogglePetType
