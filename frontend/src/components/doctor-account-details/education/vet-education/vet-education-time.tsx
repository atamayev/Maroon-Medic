import EducationTime from "../education-time/education-time"

interface Props {
	selectedVetEducationType: string
	timeState: TimeState
	setTimeState: (value: React.SetStateAction<TimeState>) => void
}

export default function VetEducationTime (props: Props) {
	const { selectedVetEducationType, timeState, setTimeState } = props

	if (!selectedVetEducationType) return null
	return (
		<EducationTime
			timeState = {timeState}
			setTimeState = {setTimeState}
		/>
	)
}
