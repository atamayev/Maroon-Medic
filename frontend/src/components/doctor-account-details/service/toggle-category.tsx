import Button from "src/components/button"
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
	const IsOpen = () => {
		if (isOpen) return "^"
		return "v"
	}

	return (
		<Button
			className = "mr-3"
			colorClass = "bg-blue-600"
			hoverClass = "hover:bg-blue-700"
			title = {IsOpen()}
			onClick = {() => toggleServiceCategory(category, setExpandedCategories)}
		/>
	)
}

export default ToggleCategory
