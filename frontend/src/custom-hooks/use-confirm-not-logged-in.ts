import _ from "lodash"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "src/contexts/maroon-context"

const useConfirmNotLoggedIn = (): void => {
	const { userType } = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!_.isNil(userType)) navigate("/dashboard")
	}, [userType])
}

export default useConfirmNotLoggedIn
