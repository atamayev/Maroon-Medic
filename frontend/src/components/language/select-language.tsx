import { observer } from "mobx-react"
import useGenerateLanguageOptions from "src/custom-hooks/account-details/use-generate-language-options"

interface SelectLanguageProps {
	handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function SelectLanguage (props: SelectLanguageProps) {
	const { handleLanguageChange } = props
	const languageOptions = useGenerateLanguageOptions()

	return (
		<select
			id="language"
			name="language"
			value=""
			onChange={(e) => handleLanguageChange(e)}
			className = "text-brown-800 bg-yellow-100 border border-brown-400 \
				rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500"
		>
			<option value="" disabled className="text-brown-600">
				Choose a language
			</option>
			{languageOptions}
		</select>
	)
}

export default observer(SelectLanguage)
