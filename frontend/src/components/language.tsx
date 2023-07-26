import _ from "lodash"
import { DeleteButtonOptions } from "./delete-buttons"

interface SelectLanguageProps {
  languageOptions: Language[],
  handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

type Language = {
  language_listID: number,
  Language_name: string
}

export const renderSelectLanguageSection = ({handleLanguageChange, languageOptions}: SelectLanguageProps) => {
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

interface RenderSingleLanguageProps {
  language: Language,
  deleteStatuses: object,
  setDeleteStatuses: (deleteStatuses: object) => void,
  handleDeleteLanguage: (language: Language) => void
}

const RenderSingleSavedLanguage = ({language, deleteStatuses, setDeleteStatuses, handleDeleteLanguage}: RenderSingleLanguageProps) => {
  const status = deleteStatuses[language.language_listID] || "initial"

  const setStatus = (newStatus) => {
    setDeleteStatuses((prevStatuses) => ({
      ...prevStatuses,
      [language.language_listID]: newStatus,
    }))
  }

  return (
    <li>
      {language.Language_name}
      <DeleteButtonOptions
        status = {status}
        setStatus = {setStatus}
        dataType = {language}
        handleDeleteOnClick = {handleDeleteLanguage}
      />
    </li>
  )
}

export const renderSavedLanguageList = (spokenLanguages, deleteStatuses, setDeleteStatuses,handleDeleteLanguage) => {
  if (!_.isArray(spokenLanguages) || _.isEmpty(spokenLanguages)) return null
  return (
    <ul>
      {spokenLanguages.map((language) => (
        <RenderSingleSavedLanguage
          key = {language.language_listID}
          language = {language}
          deleteStatuses = {deleteStatuses}
          setDeleteStatuses = {setDeleteStatuses}
          handleDeleteLanguage = {handleDeleteLanguage}
        />
      ))}
    </ul>
  )
}
