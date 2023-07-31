import { Button } from "react-bootstrap"

interface NevermindAndInitialDeleteButtonProps {
  status: DeleteStatusesType,
  setStatus: (status: DeleteStatusesType) => void
}

export const renderNevermindButton = ({status, setStatus}: NevermindAndInitialDeleteButtonProps) => {
  if (status !== "deleting") return null

  return (
    <Button
      variant = "secondary"
      onClick = {() => setStatus("initial")}
    >
      Nevermind
    </Button>
  )
}

export const renderInitialDeleteButton = ({status, setStatus}: NevermindAndInitialDeleteButtonProps) => {
  if (status !== "initial") return null

  return (
    <Button
      variant = "danger"
      onClick = {() => setStatus("deleting")}
    >
      Delete
    </Button>
  )
}

interface ConfirmDeleteButtonProps {
  status: DeleteStatusesType,
  dataType: DeleteButtonDataTypes,
  handleDeleteOnClick: (dataType: DeleteButtonDataTypes) => void
}

export const renderConfirmDeleteButton = ({status, dataType, handleDeleteOnClick}: ConfirmDeleteButtonProps) => {
  if (status !== "deleting") return null

  return (
    <Button
      variant = "danger"
      onClick = {() => handleDeleteOnClick(dataType)}
    >
      Confirm Delete
    </Button>
  )
}

interface DeleteButtonOptionsProps {
  status: DeleteStatusesType,
  setStatus: (status: DeleteStatusesType) => void,
  dataType: DeleteButtonDataTypes,
  handleDeleteOnClick: (dataType: DeleteButtonDataTypes) => void
}

export const DeleteButtonOptions = ({status, setStatus, dataType, handleDeleteOnClick}: DeleteButtonOptionsProps) => {
  return (
    <>
      {renderInitialDeleteButton({status, setStatus})}
      {renderNevermindButton({status, setStatus})}
      {renderConfirmDeleteButton({status, dataType, handleDeleteOnClick})}
    </>
  )
}
