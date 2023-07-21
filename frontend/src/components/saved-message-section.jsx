export const renderMessageSection = (confirmationMessage, whatIsBeingSaved) => {
  const messageType = confirmationMessage.messageType
  let messageContent = ""

  if (messageType === "saved") messageContent = `${whatIsBeingSaved} saved!`
  else if (messageType === "same") messageContent = `Same ${whatIsBeingSaved} data!`
  else if (messageType === "problem") messageContent = `Problem Saving ${whatIsBeingSaved}!`
  else if (messageType === "none") messageContent = `No ${whatIsBeingSaved} selected`

  const messageClass = messageType ? "show" : ""

  return (
    <span className = {`fade ${messageClass}`}>
      <b>
        {messageContent}
      </b>
    </span>
  )
}
