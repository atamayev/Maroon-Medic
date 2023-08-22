const handleTimeChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  const value = event.target.value
  setSelectedTime(value === "Select..." ? null : value)
}

export default handleTimeChange
