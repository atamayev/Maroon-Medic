import FirstNameInput from "./personal-info-inputs/first-name-input"
import LastNameInput from "./personal-info-inputs/last-name-input"
import GenderSection from "./personal-info-inputs/gender-input"
import DOBSection from "./date-of-birth/dob-section"
import Button from "./button"

interface Props {
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
	error: string,
	newInfo: BirthDateInfo,
	setNewInfo: (newInfo: BirthDateInfo) => void,
	loading: boolean
}

export default function NewAccountForm(props: Props) {
	const { handleSubmit, error, newInfo, setNewInfo, loading } = props

	function ErrorMessage () {
		if (!error) return null
		return (
			<div className="bg-red-600 text-white p-3 rounded-md mb-4">
				{error}
			</div>
		)
	}

	return (
		<div className="bg-white border rounded-lg shadow-md p-6">
			<div>
				<ErrorMessage />
				<form onSubmit={handleSubmit}>
					<FirstNameInput personalInfo={newInfo} setPersonalInfo={setNewInfo} />
					<LastNameInput personalInfo={newInfo} setPersonalInfo={setNewInfo} />
					<GenderSection personalInfo={newInfo} setPersonalInfo={setNewInfo} />
					<DOBSection personalInfo={newInfo} setPersonalInfo={setNewInfo} />
					<Button
						className="w-100"
						colorClass="bg-green-600"
						hoverClass="hover:bg-green-700"
						title="Submit"
						disabled={loading}
						textColor = "text-white"
					/>
				</form>
			</div>
		</div>
	)
}
