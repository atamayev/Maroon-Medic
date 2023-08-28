import _ from "lodash"

interface NoAvailableTimesProps {
  noAvailableTimesMessage: boolean
  personalData: DoctorPersonalData
}

const NoAvailableTimes = (props: NoAvailableTimesProps) => {
	const { noAvailableTimesMessage, personalData } = props
	if (!noAvailableTimesMessage) return null
	return (
		<>
			Dr. {_.upperFirst(personalData.lastName || "")} does not currently have any open appointments at this location
		</>
	)
}

export default NoAvailableTimes
