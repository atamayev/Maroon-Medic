import { useEffect, useState } from "react"

export const useConfirmationMessage = (): [ConfirmationMessage, (conf: ConfirmationMessage) => void] => {
  const initialConfirmationState: ConfirmationMessage = {
    messageType: null, // initially set to null
    timeoutId: null
  }

  const [confirmation, setConfirmation] = useState(initialConfirmationState)

  useEffect(() => {
    if (confirmation.messageType) {
      const timeoutId = setTimeout(() => {
        setConfirmation(initialConfirmationState)
      }, 5000)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [confirmation.messageType])

  return [confirmation, setConfirmation]
}
