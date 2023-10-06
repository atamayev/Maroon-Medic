import _ from "lodash"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "src/contexts/maroon-context"

const useRedirectNullUser = (vetOrpatient: vetOrpatient): void => {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (_.isNil(appContext.auth.userType)) {
			navigate(`/${vetOrpatient}-register`)
		}
	}, [])
}

export default useRedirectNullUser
