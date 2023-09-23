import _ from "lodash"
import { useContext } from "react"
import { PublicDoctorDataClass } from "src/classes/public-doctor-data-class"
import { AppContext } from "src/contexts/maroon-context"

export default function useRetrieveSinglePublicDoctorData(doctorID: number | null): PublicDoctorDataClass | null {
	const appContext = useContext(AppContext)
	if (_.isNull(doctorID)) return null
	const doctorData = appContext.retrieveSinglePublicDoctorData(doctorID)
	return doctorData
}
