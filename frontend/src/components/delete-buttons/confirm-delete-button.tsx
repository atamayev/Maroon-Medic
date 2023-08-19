import { Button } from "react-bootstrap"

interface Props<T> {
  status: DeleteStatuses,
  dataType: T,
  handleDeleteOnClick: (dataType: T) => void
}

const ConfirmDeleteButton = <T,>({status, dataType, handleDeleteOnClick}: Props<T>) => {
  if (status !== "deleting") return null

  return (
    <Button
      variant="danger"
      onClick={() => handleDeleteOnClick(dataType)}
    >
      Confirm Delete
    </Button>
  )
}

export default ConfirmDeleteButton
