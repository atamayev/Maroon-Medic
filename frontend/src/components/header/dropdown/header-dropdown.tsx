import { useState, useEffect, useRef } from "react"
import pic from "../../../images/ProfileImage.jpg"
import { useSetHeaderData } from "src/custom-hooks/use-set-header-data"
import { DropdownItemsContainer } from "./dropdown-items-container"
import { observer } from "mobx-react"
import { useLocation } from "react-router-dom"

interface Props {
  dropdown?: boolean
}

const HeaderDropdown = ({ dropdown } : Props) => {
	const location = useLocation()
	const { headerData } = useSetHeaderData()
	const [isOpen, setIsOpen] = useState(false)

	const dropdownRef = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	useEffect(() => {
		setIsOpen(false)
	}, [location])

	if (dropdown === false) return null

	return (
		<div className="w-1/4 flex justify-end position: relative z-10">
			<div className="flex items-center">
				<div className="relative inline-block text-left" ref = {dropdownRef}>
					<button
						type="button"
						className="bg-gray-800 text-white rounded px-4 py-2 flex items-center text-sm hover:shadow-lg"
						id="menu-button"
						aria-expanded="false"
						aria-haspopup="true"
						onClick={() => setIsOpen(!isOpen)}
					>
						<span className="max-w-xs truncate">
							{headerData}
						</span>
						<img src = {pic} alt="profile" className="ml-2 h-5 w-5" />
					</button>
					<DropdownItemsContainer isOpen = {isOpen} dropdown = {dropdown} />
				</div>
			</div>
		</div>
	)
}

export default observer(HeaderDropdown)
