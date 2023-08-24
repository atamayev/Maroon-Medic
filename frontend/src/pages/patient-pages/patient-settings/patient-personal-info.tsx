import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import useSetPersonalInfo from "../../../custom-hooks/use-set-personal-info"
import savePersonalInfo from "src/helper-functions/shared/save-personal-info"
import FirstNameInput from "src/components/personal-info-inputs/first-name-input"
import LastNameInput from "src/components/personal-info-inputs/last-name-input"
import GenderSection from "src/components/personal-info-inputs/gender-input"
import DOBSection from "src/components/date-of-birth/dob-section"
import Header from "../../../components/header/header"
import PatientHeader from "../patient-header"
import Button from "src/components/button"

export default function PatientPersonalInfo() {
	const { userType } = useSimpleUserVerification()

	const {personalInfo, setPersonalInfo} = useSetPersonalInfo(userType, "Patient")
	const [personalInfoConfirmation, setPersonalInfoConfirmation] = useConfirmationMessage()

	if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	return (
		<div>
			<Header dropdown = {true} search = {true}/>
			<PatientHeader/>
			<div className="bg-yellow-100 border border-brown-400 rounded p-4 mb-4">
				<div className="p-4">
					<form
						onSubmit={(e) => {
							e.preventDefault()
							savePersonalInfo(personalInfo, setPersonalInfoConfirmation, userType)
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
