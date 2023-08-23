import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import updatePublicAvailibility from "../../../helper-functions/account-details/save/doctor-account-details/update-public-availibility"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import AccountDetailsCard from "src/components/account-details-card"

interface Props {
  publiclyAvailable: boolean
  setPubliclyAvailable: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RenderPublicStatusSection (props: Props) {
  return (
    <AccountDetailsCard
      title = "Public Availbility Status"
      content = {<RenderIsPubliclyAvailable {...props} />}
    />
  )
}

function RenderIsPubliclyAvailable (props: Props) {
  const { publiclyAvailable, setPubliclyAvailable } = props
  const [publiclyAvailableConfirmation, setPubliclyAvailableConfirmation] = useConfirmationMessage()

  return (
    <div>
      Would you like your profile to be available through search results?
      {/* All of this logic must be kept in this component, or else the toggle button will not work: */}
      <ToggleButtonGroup type = "radio" name = "options"
        value = {publiclyAvailable}
        onChange = {(value) => updatePublicAvailibility(value, setPubliclyAvailable, setPubliclyAvailableConfirmation)}
      >
        <ToggleButton
          id = "tbg-radio-1"
          value = {0}
          style = {{
            backgroundColor: !publiclyAvailable ? "red" : "white",
            color: !publiclyAvailable ? "white" : "black",
            borderColor: "black"
          }}
        >
          No
        </ToggleButton>

        <ToggleButton
          id = "tbg-radio-2"
          value = {1}
          style =
            {{
              backgroundColor: publiclyAvailable ? "green" : "white",
              color: publiclyAvailable ? "white" : "black",
              borderColor: "black"
            }}
        >
          Yes
        </ToggleButton>
      </ToggleButtonGroup>
      <SavedConfirmationMessage
        confirmationMessage = {publiclyAvailableConfirmation}
        whatIsBeingSaved = "Public Availability Status"
      />
    </div>
  )
}
