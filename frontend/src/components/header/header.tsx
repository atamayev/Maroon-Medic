import { useContext } from "react"
import { SearchContext } from "../../contexts/search-context"
import { observer } from "mobx-react"
import Logo from "./header-logo"
import HeaderSearch from "./header-search"
import HeaderDropdown from "./dropdown/header-dropdown"

interface HeaderProps {
  dropdown: boolean,
  search: boolean
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Header = (props: HeaderProps) => {
	const { dropdown, search } = props
	const { searchTerm, setSearchTerm } = useContext(SearchContext)

	return (
		<>
			<header className="bg-white">
				<nav className="container mx-auto px-4 py-2 flex justify-between items-center">
					<Logo />
					<HeaderSearch search = {search} searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
					<HeaderDropdown dropdown = {dropdown} />
				</nav>
			</header>
			<div className="border-t border-gray-200"></div>
		</>
	)
}

export default observer(Header)
