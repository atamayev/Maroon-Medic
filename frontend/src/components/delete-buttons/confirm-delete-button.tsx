import Button from "../button"

interface Props<T> {
  status: DeleteStatuses,
  dataType: T,
  handleDeleteOnClick: (dataType: T) => void
}

const ConfirmDeleteButton = <T,>(props: Props<T>) => {
  const { status, dataType, handleDeleteOnClick } = props
  if (status !== "deleting") return null

  return (
    <Button
      className = "mt-3"
      colorClass = "bg-red-600"
      hoverClass = "hover:bg-red-700"
      title = "Confirm Delete"
      onClick={() => handleDeleteOnClick(dataType)}
    />
  )
}

export default ConfirmDeleteButton
