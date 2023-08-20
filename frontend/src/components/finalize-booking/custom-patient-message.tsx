import _ from "lodash"
import FormGroup from "../form-group"

const CharacterLimit = ({ message, isMessageOverLimit } : { message: string, isMessageOverLimit: boolean }) => {
  const counterStyleLimit = () => {
    if (isMessageOverLimit) return {color: "red"}
    return {color: "black"}
  }

  return (
    <span style = {{ display: "block", ...counterStyleLimit() }}>
      Character Limit: {message.length} / 100
    </span>
  )
}

const CustomPatientMessage = ({ message, setMessage, isMessageOverLimit, personalData } :
  { message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    isMessageOverLimit: boolean,
    personalData: DoctorPersonalData
  }
) => {
  return (
    <>
      <span style = {{ display: "block" }}>
        <strong>Write a message to Dr. {_.upperFirst(personalData.LastName || "")}:</strong>
        <FormGroup
          id = "Message"
          value = {message}
          onChange = {event => {
            const value = event.target.value
            setMessage(value)
          }}
          maxLength = {100}
          as = "textarea"
        />
      </span>
      <CharacterLimit
        message = {message}
        isMessageOverLimit = {isMessageOverLimit}
      />
    </>
  )
}

export default CustomPatientMessage
