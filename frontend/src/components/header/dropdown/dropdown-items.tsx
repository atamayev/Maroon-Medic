import AuthDataService from "src/services/auth-data-service"
import { useCallback } from "react"
import { useLocation, Link } from "react-router-dom"

const useHandleRefresh = () => {
	const location = useLocation()

	return useCallback(() => {
		if (location.pathname === "/") window.location.reload()
		else window.location.href = "/"
	}, [location])
}

interface Props {
  dropdown?: boolean
  userType: DoctorOrPatientOrNull
}

const DropdownItems = ({ dropdown, userType } : Props) => {
	const handleRefresh = useHandleRefresh()

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
				<Link to="/dashboard" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Dashboard</Link>
				<Link to="/account-details" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Account Details</Link>
				<button onClick={handleLogout} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Sign out</button>
			</>
		)
	}
	return (
		<>
			<Link to="/vet-register" className="font-bold text-gray-700 block px-4 py-2 text-sm" role="menuitem">Vet Sign up</Link>
			<Link to="/vet-login" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Vet Log In</Link>
			<Link to="/patient-register" className="font-bold text-gray-700 block px-4 py-2 text-sm" role="menuitem">Patient Sign up</Link>
			<Link to="/patient-login" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Patient Log In</Link>
			<div className="border-t border-gray-100"></div>
			<Link to="/help" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Help</Link>
		</>
	)
}

export default DropdownItems
