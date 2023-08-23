import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import updatePublicAvailability from "../../../helper-functions/account-details/save/doctor-account-details/update-public-availability"
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
      <p>Would you like your profile to be available through search results?</p>
      {/* All of this logic must be kept in this component, or else the toggle button will not work: */}
      <div className="flex">
        <button
          value={0}
          onClick={() => updatePublicAvailability(false, setPubliclyAvailable, setPubliclyAvailableConfirmation)}
          className={`border-black p-2 ${!publiclyAvailable ? "bg-red-500 text-white" : "bg-white text-black"}`}
        >
          No
        </button>

        <button
          value={1}
          onClick={() => updatePublicAvailability(true, setPubliclyAvailable, setPubliclyAvailableConfirmation)}
          className={`border-black p-2 ${publiclyAvailable ? "bg-green-500 text-white" : "bg-white text-black"}`}
        >
          Yes
        </button>
      </div>
      <SavedConfirmationMessage
        confirmationMessage={publiclyAvailableConfirmation}
        whatIsBeingSaved="Public Availability Status"
      />
    </div>
  )
}
