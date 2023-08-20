const TimesSection = ({ address }: {address: PublicAddressData}) => {
  return (
    <div className = "col-md-6">
      <h5>Working hours:</h5>
      {address.times.map((time, index) => (
        <p key = {index}>
          {time.Day_of_week}: {time.Start_time} - {time.End_time}
        </p>
      ))}
    </div>
  )
}

export default TimesSection
