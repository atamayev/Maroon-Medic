import { Button } from "react-bootstrap"

export const renderNevermindButton = (status, setStatus) => {
  if (status !== 'deleting') return null

  return (
    <Button
      variant = "secondary"
      onClick = {() => setStatus('initial')}
    >
      Nevermind
    </Button>
  )
}

export const renderInitialDeleteButton = (status, setStatus) => {
  if (status !== 'initial') return null

  return (
    <Button
      variant = "danger"
      onClick = {() => setStatus('deleting')}
    >
      Delete
    </Button>
  )
}

export const renderConfirmDeleteButton = (status, data_type, handleDeleteOnClick) => {
  if (status !== 'deleting') return null

  return (
    <Button
      variant = "danger"
      onClick = {() => handleDeleteOnClick(data_type)}
    >
      Confirm Delete
    </Button>
  );
}
