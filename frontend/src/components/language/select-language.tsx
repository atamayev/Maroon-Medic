interface SelectLanguageProps {
  languageOptions: JSX.Element[],
  handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectLanguage = ({handleLanguageChange, languageOptions}: SelectLanguageProps) => {
  return (
    <select
      id = "language"
      name = "language"
      value = {""}
      onChange = {(e) => handleLanguageChange(e)}
    >
      <option value = "" disabled>Choose a language</option>
      {languageOptions}
    </select>
  )
}

export default SelectLanguage
