import { useContext } from "react"
import { observer } from "mobx-react"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import useSetPersonalInfo from "../../../custom-hooks/use-set-personal-info"
import useSavePersonalInfo from "src/custom-hooks/use-save-personal-info"
import FirstNameInput from "src/components/personal-info-inputs/first-name-input"
import LastNameInput from "src/components/personal-info-inputs/last-name-input"
import GenderSection from "src/components/personal-info-inputs/gender-input"
import DOBSection from "src/components/date-of-birth/dob-section"
import PatientHeader from "../patient-header"
import Button from "src/components/button"
import { AppContext } from "src/contexts/maroon-context"

function PatientPersonalInfo() {
	const appContext = useContext(AppContext)
	const { personalInfo, setPersonalInfo } = useSetPersonalInfo(appContext.userType, "Patient")
	const [personalInfoConfirmation, setPersonalInfoConfirmation] = useConfirmationMessage()

	if (appContext.userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	return (
		<div>
			<PatientHeader/>
			<div className="bg-yellow-100 border border-brown-400 rounded p-4 mb-4">
				<div className="p-4">
					<form
						onSubmit={(e) => {
							e.preventDefault()
							useSavePersonalInfo(personalInfo, setPersonalInfoConfirmation, appContext.userType!)
						}}
						className="space-y-4"
					>
						<FirstNameInput personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
						<LastNameInput personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
						<GenderSection personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
						<DOBSection personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
						<Button
							title="Save"
							className="w-full"
							colorClass="bg-green-600"
							hoverClass="hover:bg-green-700"
							textColor = "text-white"
						/>
						<SavedConfirmationMessage
							confirmationMessage={personalInfoConfirmation}
							whatIsBeingSaved="Personal Info"
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

export default observer(PatientPersonalInfo)
