import { useEffect, useState } from "react"

export const useConfirmationMessage = () => {
  const initialConfirmationState = {
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
