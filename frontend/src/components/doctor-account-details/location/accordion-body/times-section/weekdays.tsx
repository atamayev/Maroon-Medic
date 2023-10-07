import Toggle from "react-toggle"
import TimePicker from "react-time-picker"
import { daysOfWeek } from "src/utils/constants"

interface WeekDaysProps {
	times: DoctorAvailability[]
	setTimes: React.Dispatch<React.SetStateAction<DoctorAvailability[]>>
}

export default function WeekDays (props: WeekDaysProps) {
	const { times, setTimes } = props

	const handleDayToggle = (day: DayOfWeek) => {
		if (times.some(time => time.dayOfWeek === day)) {
			setTimes(times.filter(time => time.dayOfWeek !== day))
		} else {
			setTimes([...times, { dayOfWeek: day, startTime: "", endTime: "" }])
		}
	}

	const handleTimeChange = (day: DayOfWeek, timeType: "startTime" | "endTime" | "", newTime: string) => {
		setTimes(times.map(time =>
			time.dayOfWeek === day ? { ...time, [timeType]: newTime } : time
		))
	}

	interface DayProp {
		day: DayOfWeek
	}

	function PickStartTime ({ day } : DayProp) {
		return (
			<TimePicker
				className = "ml-3"
				onChange = {(value) => value && handleTimeChange(day, "startTime", value)}
				value = {times.find(time => time.dayOfWeek === day)?.startTime}
			/>
		)
	}

	function PickEndTime ({ day } : DayProp) {
		return (
			<TimePicker
				className = "ml-3"
				onChange = {(value) => value && handleTimeChange(day, "endTime", value)}
				value = {times.find(time => time.dayOfWeek === day)?.endTime}
			/>
		)
	}

	function PickTime ({ doctorTimes, day }: {doctorTimes: DoctorAvailability[], day: DayOfWeek}) {
		const matchedTime = doctorTimes.find(time => time.dayOfWeek === day)

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
						checked = {times.some(time => time.dayOfWeek === day)}
						onChange = {() => handleDayToggle(day)}
					/>
					<PickTime doctorTimes = {times} day = {day} />
				</div>
			))}
		</div>
	)
}
