import { useContext } from "react"
import { SearchContext } from "../../contexts/search-context"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import { observer } from "mobx-react"
import Logo from "./header-logo"
import HeaderSearch from "./header-search"
import HeaderDropdown from "./dropdown/header-dropdown"

interface HeaderProps {
  dropdown?: boolean,
  search?: boolean
}

const Header = (props: HeaderProps) => {
  const { dropdown, search } = props
  const { userType } = useSimpleUserVerification(false)
  const { searchTerm, setSearchTerm } = useContext(SearchContext)

  return (
    <header className="bg-white shadow rounded-b-md">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Logo />
        <HeaderSearch search = {search} searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
        <HeaderDropdown dropdown = {dropdown} userType = {userType} />
      </nav>
    </header>
  )
}

export default observer(Header)
