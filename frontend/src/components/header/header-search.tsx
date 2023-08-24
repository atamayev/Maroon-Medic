import { useLocation } from "react-router-dom"
import Button from "../button"

const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
	if (event.key === "Enter") {
		const value = (event.target as HTMLInputElement).value
		if (!value) {
			sessionStorage.setItem("searchTerm", "")
			window.location.href = "/"
		} else {
			sessionStorage.setItem("searchTerm", value)
			window.location.href = `/s/${value}`
		}
	}
}

const handleSearch = (value: string, setSearchTerm: (value: string) => void) => {
	if (!value) {
		sessionStorage.setItem("searchTerm", "")
		window.location.href = "/"
	} else {
		setSearchTerm(value)
		window.location.href = `/s/${value}`
	}
}

const searchDefaultValue = (searchTerm: string, pathname: string) => {
	if (pathname === "/") return ""
	return searchTerm || ""
}

interface Props {
  search?: boolean
  searchTerm: string
  setSearchTerm: (value: string) => void
}

const HeaderSearch = (props: Props) => {
	const { search = true, searchTerm, setSearchTerm } = props

	const location = useLocation()

	if (search === false) return null
	return (
		<div className="w-1/2">
			<div className="flex items-center justify-center space-x-2 w-full">
				<input
					type="search"
					id="search-input"
					className="border border-gray-500 bg-white rounded py-2 px-4 w-1/2 "
					placeholder="Search"
					aria-label="Search"
					defaultValue={searchDefaultValue(searchTerm, location.pathname)}
					onKeyUp={handleKeyUp}
				/>
				<Button
					colorClass = "bg-blue-500"
					hoverClass = "hover:bg-blue-600"
					className = "text-white py-2 px-4 rounded focus:ring focus:ring-opacity-50"
					title = "Search"
					onClick = {() => {
						const inputElement = document.getElementById("search-input")
						if (inputElement) {
							handleSearch((inputElement as HTMLInputElement).value, setSearchTerm)
						}
					}}
				/>
			</div>
		</div>
	)
}

export default HeaderSearch
