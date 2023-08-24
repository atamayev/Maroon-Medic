import EducationTime from "../education-time/education-time"

interface Props {
  selectedPreVetEducationType: string
  timeState: TimeState
  setTimeState: (value: React.SetStateAction<TimeState>) => void
}

const PreVetEducationTime = (props: Props) => {
	const { selectedPreVetEducationType, timeState, setTimeState } = props
	if (!selectedPreVetEducationType) return null

	return (
		<EducationTime
			timeState = {timeState}
			setTimeState = {setTimeState}
		/>
	)
}

export default PreVetEducationTime
