import Toggle from "react-toggle"
import TimePicker from "react-time-picker"
import { daysOfWeek } from "src/utils/constants"

interface WeekDaysProps {
  times: DoctorAvailability[]
  setTimes: React.Dispatch<React.SetStateAction<DoctorAvailability[]>>
}

const WeekDays = (props: WeekDaysProps) => {
	const { times, setTimes } = props

	const handleDayToggle = (day: DayOfWeek) => {
		if (times.some(time => time.Day_of_week === day)) setTimes(times.filter(time => time.Day_of_week !== day))
		else setTimes([...times, { Day_of_week: day, Start_time: "", End_time: "" }])
	}

	const handleTimeChange = (day: DayOfWeek, timeType: "Start_time" | "End_time" | "", newTime: string) => {
		setTimes(times.map(time =>
			time.Day_of_week === day ? { ...time, [timeType]: newTime } : time
		))
	}

	interface DayProp {
		day: DayOfWeek
	}

	const PickStartTime: React.FC<DayProp> = ({ day }) => {
		return (
			<TimePicker
				className = "ml-3"
				onChange = {(value) => value && handleTimeChange(day, "Start_time", value)}
				value = {times.find(time => time.Day_of_week === day)?.Start_time}
			/>
		)
	}

	const PickEndTime: React.FC<DayProp> = ({ day }) => {
		return (
			<TimePicker
				className = "ml-3"
				onChange = {(value) => value && handleTimeChange(day, "End_time", value)}
				value = {times.find(time => time.Day_of_week === day)?.End_time}
			/>
		)
	}

	const PickTime = ({ doctorTimes, day }: {doctorTimes: DoctorAvailability[], day: DayOfWeek}) => {
		const matchedTime = doctorTimes.find(time => time.Day_of_week === day)

		if (!matchedTime) return null

		return (
			<>
				<PickStartTime day = {day}/>
			-
				<PickEndTime day = {day} />
			</>
		)
	}

	return (
		<div className = "w-full md:w-3/4 px-2 mb-3 ml-10">
			{daysOfWeek.map((day) => (
				<div key = {day} className = "mb-3 d-flex align-items-center">
					<label className = "mr-3">{day}</label>
					<Toggle
						id = {day}
						checked = {times.some(time => time.Day_of_week === day)}
						onChange = {() => handleDayToggle(day)}
					/>
					<PickTime doctorTimes = {times} day = {day} />
				</div>
			))}
		</div>
	)
}

export default WeekDays
