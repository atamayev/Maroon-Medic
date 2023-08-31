interface SelectLanguageProps {
  languageOptions: JSX.Element[],
  handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectLanguage ({handleLanguageChange, languageOptions}: SelectLanguageProps) {
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
