import { Button } from "react-bootstrap"

interface NevermindAndInitialDeleteButtonProps {
  status: DeleteStatuses,
  setStatus: (status: DeleteStatuses) => void
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

interface ConfirmDeleteButtonProps<T> {
  status: DeleteStatuses,
  dataType: T,
  handleDeleteOnClick: (dataType: T) => void
}

export const RenderConfirmDeleteButton = <T,>({status, dataType, handleDeleteOnClick}: ConfirmDeleteButtonProps<T>) => {
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

interface DeleteButtonOptionsProps<T> {
  status: DeleteStatuses,
  setStatus: (status: DeleteStatuses) => void,
  dataType: T,
  handleDeleteOnClick: (dataType: T) => void
}

export const DeleteButtonOptions = <T,>({status, setStatus, dataType, handleDeleteOnClick}: DeleteButtonOptionsProps<T>) => {
  return (
    <>
      <RenderInitialDeleteButton status = {status} setStatus = {setStatus}/>
      <RenderNevermindButton status={status} setStatus={setStatus}/>
      <RenderConfirmDeleteButton<T>
        status = {status}
        dataType={dataType}
        handleDeleteOnClick={handleDeleteOnClick}
      />
    </>
  )
}

