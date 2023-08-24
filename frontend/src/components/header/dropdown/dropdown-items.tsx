import AuthDataService from "src/services/auth-data-service"
import { useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import useSimpleUserVerification from "src/custom-hooks/use-simple-user-verification"

const useHandleRefresh = () => {
	const location = useLocation()

	return useCallback(() => {
		if (location.pathname === "/") window.location.reload()
		else window.location.href = "/"
	}, [location])
}

interface Props {
  dropdown?: boolean
}

const DropdownItems = ({ dropdown } : Props) => {
	const { userType } = useSimpleUserVerification(false)

	const handleRefresh = useHandleRefresh()
	const unboldedDropdownItemCSS = "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
	const boldedDropdownItemCSS = "font-bold text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"

	const handleLogout = async () => {
		try {
			const response = await AuthDataService.logout()
			if (response.status === 200) sessionStorage.clear()
		} catch (error) {
		}
		handleRefresh()
	}

	if (dropdown === false) return null
	if (userType === "Doctor" || userType === "Patient") {
		return (
			<>
				<Link to="/dashboard" className={unboldedDropdownItemCSS} role="menuitem">Dashboard</Link>
				<Link to="/account-details" className={unboldedDropdownItemCSS} role="menuitem">Account Details</Link>
				<div className = "block">
					<button
						onClick={handleLogout}
						className={unboldedDropdownItemCSS + " w-full text-left"} role="menuitem"
					>
						Sign out
					</button>
				</div>
			</>
		)
	}
	return (
		<>
			<Link to="/vet-register" className={boldedDropdownItemCSS} role="menuitem">Vet Sign up</Link>
			<Link to="/vet-login" className={unboldedDropdownItemCSS} role="menuitem">Vet Log In</Link>
			<Link to="/patient-register" className={boldedDropdownItemCSS} role="menuitem">Patient Sign up</Link>
			<Link to="/patient-login" className={unboldedDropdownItemCSS} role="menuitem">Patient Log In</Link>
			<div className="border-t border-gray-100"></div>
			<Link to="/help" className={unboldedDropdownItemCSS} role="menuitem">Help</Link>
		</>
	)
}

export default DropdownItems
