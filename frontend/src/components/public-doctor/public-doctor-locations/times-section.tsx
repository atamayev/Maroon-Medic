function TimesSection ({ address }: {address: PublicAddressData}) {
	return (
		<div className = "col-md-6">
			<h5>Working hours:</h5>
			{address.times.map((time, index) => (
				<p key = {index}>
					{time.dayOfWeek}: {time.startTime} - {time.endTime}
				</p>
			))}
		</div>
	)
}

export default TimesSection
