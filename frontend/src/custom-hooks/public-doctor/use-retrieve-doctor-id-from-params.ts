import _ from "lodash"
import { useParams } from "react-router-dom"

export default function useRetrieveDoctorIDFromParams(): number | null {
	const { id } = useParams()
	if (_.isUndefined(id)) return null
	const doctorID = Number(id)
	return doctorID
}
