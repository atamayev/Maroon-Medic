import NevermindButton from "./nevermind-button"
import InitialDeleteButton from "./initial-delete-button"
import ConfirmDeleteButton from "./confirm-delete-button"

interface DeleteButtonOptionsProps<T> {
  status: DeleteStatuses,
  setStatus: (status: DeleteStatuses) => void,
  dataType: T,
  handleDeleteOnClick: (dataType: T) => void
}

export const DeleteButtonOptions = <T,>({status, setStatus, dataType, handleDeleteOnClick}: DeleteButtonOptionsProps<T>) => {
  return (
    <>
      <InitialDeleteButton status = {status} setStatus = {setStatus}/>
      <NevermindButton status={status} setStatus={setStatus}/>
      <ConfirmDeleteButton<T>
        status = {status}
        dataType={dataType}
        handleDeleteOnClick={handleDeleteOnClick}
      />
    </>
  )
}
