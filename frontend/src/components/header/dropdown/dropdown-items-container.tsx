import DropdownItems from "./dropdown-items"

interface Props {
	isOpen: boolean
	dropdown?: boolean
}

export default function DropdownItemsContainer (props: Props) {
	const { isOpen, dropdown } = props

	if (!isOpen) return null

	return (
		<div
			className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
		>
			<div className="py-1" role="none">
				<DropdownItems dropdown = {dropdown} />
			</div>
		</div>
	)
}
