// Function to handle numeric and single decimal point input
export const handleNumericInput = (event, callback) => {
    const re = /^[0-9]*[.,]?[0-9]*$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      callback(event.target.value);
    }
};

// Function to prevent non numerical input
export const preventNonNumericalInput = event => {
  const valid =
    (event.key >= 0 && event.key <= 9) || // Allow numbers
    event.key === '.' || // Allow decimal point
    event.key === 'Backspace' || // Allow backspaces
    event.key === 'Delete'; // Allow deletes
  if (!valid) {
    event.preventDefault();
  }
};


// Function to validate pasted content
export const validatePasteInput = event => {
  const clipboardData = event.clipboardData.getData('text');
  if (!isNaN(clipboardData)) {
    event.preventDefault();
  }
};

// Function to validate dropped content
export const validateDropInput = event => {
  const droppedData = event.dataTransfer.getData('text');
  if (!isNaN(droppedData)) {
    event.preventDefault();
  }
};
