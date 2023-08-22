import { Button } from "react-bootstrap"
import toggleServiceCategory from "src/helper-functions/account-details/toggle/toggle-service-category"

interface Props {
  category: string
  services: ServiceListItem[]
  expandedCategories: string[]
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>
}

const ToggleCategory = (props: Props) => {
  const { category, services, expandedCategories, setExpandedCategories } = props
  if (services.length <= 1) return null

  const isOpen = expandedCategories.includes(category)
  const RenderIsOpen = () => {
    if (isOpen) return <>^</>
    return <>v</>
  }

  return (
    <Button onClick = {() => toggleServiceCategory(category, setExpandedCategories)}>
      <RenderIsOpen />
    </Button>
  )
}

export default ToggleCategory
