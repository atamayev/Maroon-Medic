/* eslint-disable no-inline-comments */
// Function to handle numeric and single decimal point input
export const handleNumericInput = (event: React.ChangeEvent<HTMLInputElement>, callback: (value: string) => void): void => {
  const re = /^[0-9]*[.,]?[0-9]*$/
  if (event.target.value === "" || re.test(event.target.value)) {
    callback(event.target.value)
  }
}

// Function to prevent non numerical input
export const preventNonNumericalInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
  const valid =
    (event.key >= "0" && event.key <= "9") || // Allow numbers
    event.key === "." || // Allow decimal point
    event.key === "Backspace" || // Allow backspaces
    event.key === "Delete" // Allow deletes
  if (!valid) event.preventDefault()
}

// Function to validate pasted content
export const validatePasteInput = (event: React.ClipboardEvent<HTMLInputElement>): void => {
  const clipboardData = event.clipboardData.getData("text")
  if (isNaN(parseFloat(clipboardData))) event.preventDefault()
}

// Function to validate dropped content
export const validateDropInput = (event: React.DragEvent<HTMLInputElement>): void => {
  const droppedData = event.dataTransfer.getData("text")
  if (isNaN(parseFloat(droppedData))) event.preventDefault()
}
