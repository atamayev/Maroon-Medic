import _ from "lodash"

interface NoAvailableTimesProps {
	noAvailableTimesMessage: boolean
	personalData: DoctorPersonalData
}

export default function NoAvailableTimes (props: NoAvailableTimesProps) {
	const { noAvailableTimesMessage, personalData } = props
	if (!noAvailableTimesMessage) return null
	return (
		<>
			Dr. {_.upperFirst(personalData.lastName || "")} does not currently have any open appointments at this location
		</>
	)
}
