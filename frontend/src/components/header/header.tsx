import Logo from "./header-logo"
import HeaderSearch from "./header-search"
import HeaderDropdown from "./dropdown/header-dropdown"

interface HeaderProps {
	dropdown: boolean
	search: boolean
}

export default function Header (props: HeaderProps) {
	const { dropdown, search } = props

	return (
		<>
			<header className="bg-white">
				<nav className="container mx-auto px-4 py-2 flex justify-between items-center">
					<Logo />
					<HeaderSearch search = {search} />
					<HeaderDropdown dropdown = {dropdown} />
				</nav>
			</header>
			<div className="border-t border-gray-200"></div>
		</>
	)
}
