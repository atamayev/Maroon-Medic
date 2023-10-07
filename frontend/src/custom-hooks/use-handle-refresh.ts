import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function useHandleRefresh (): () => void {
	const location = useLocation()
	const navigate = useNavigate()

	return useCallback(() => {
		if (location.pathname === "/") navigate(0)
		else navigate("/")
	}, [location])
}
