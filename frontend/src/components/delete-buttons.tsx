import { Button } from "react-bootstrap"

interface NevermindAndInitialDeleteButtonProps {
  status: DeleteStatusesType,
  setStatus: (status: DeleteStatusesType) => void
}

export const RenderNevermindButton = ({status, setStatus}: NevermindAndInitialDeleteButtonProps) => {
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

export const RenderInitialDeleteButton = ({status, setStatus}: NevermindAndInitialDeleteButtonProps) => {
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

export const RenderConfirmDeleteButton = ({status, dataType, handleDeleteOnClick}: ConfirmDeleteButtonProps) => {
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
      <RenderInitialDeleteButton status = {status} setStatus = {setStatus}/>
      <RenderNevermindButton status = {status} setStatus = {setStatus}/>
      <RenderConfirmDeleteButton status = {status} dataType = {dataType} handleDeleteOnClick = {handleDeleteOnClick}/>
    </>
  )
}
