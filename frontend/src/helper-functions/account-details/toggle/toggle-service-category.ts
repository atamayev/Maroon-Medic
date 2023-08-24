export const toggleServiceCategory = (
	category: string,
	setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>
): void => {
	setExpandedCategories(prevState => {
		if (prevState.includes(category)) {
			return prevState.filter(cat => cat !== category)
		} else {
			return [...prevState, category]
		}
	})
}

export default toggleServiceCategory
