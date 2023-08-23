import Button from "src/components/button"
import togglePetType from "src/helper-functions/account-details/toggle/toggle-pet-type"

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
    if (isOpen) return "^"
    return "v"
  }

  return (
    <Button
      className = "mr-3"
      colorClass = "bg-blue-600"
      hoverClass = "hover:bg-blue-700"
      title = {RenderIsOpen()}
      onClick={() => togglePetType(petType, setExpandedPetTypes)}
    />
  )
}

export default IsTogglePetType
