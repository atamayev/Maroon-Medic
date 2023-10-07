import { observer } from "mobx-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import AppContext from "src/contexts/maroon-context"
import useHandleLogout from "src/custom-hooks/auth/use-handle-logout"

interface Props {
	dropdown?: boolean
}

function DropdownItems ({ dropdown } : Props) {
	const appContext = useContext(AppContext)

	const handleLogout = useHandleLogout()
	const unboldedDropdownItemCSS = "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 transition-all duration-100"
	const boldedDropdownItemCSS = "font-bold text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 transition-all duration-100"

	if (dropdown === false) return null
	else if (appContext.auth.isAuthenticated === false) {
		return (
			<>
				<Link to="/vet-register" className={boldedDropdownItemCSS} role="menuitem">Vet Sign up</Link>
				<Link to="/vet-login" className={unboldedDropdownItemCSS} role="menuitem">Vet Log In</Link>
				<Link to="/patient-register" className={boldedDropdownItemCSS} role="menuitem">Patient Sign up</Link>
				<Link to="/patient-login" className={unboldedDropdownItemCSS} role="menuitem">Patient Log In</Link>
				<div className="border-t border-gray-300"></div>
				<Link to="/help" className={unboldedDropdownItemCSS} role="menuitem">Help</Link>
			</>
		)
	}
	return (
		<>
			<Link to="/dashboard" className={unboldedDropdownItemCSS} role="menuitem">Dashboard</Link>
			<Link to="/account-details" className={unboldedDropdownItemCSS} role="menuitem">Account Details</Link>
			<div className = "block">
				<button
					onClick = {handleLogout}
					className = {unboldedDropdownItemCSS + " w-full text-left"}
					role = "menuitem"
				>
					Sign out
				</button>
			</div>
		</>
	)
}

export default observer(DropdownItems)
