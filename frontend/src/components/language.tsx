import _ from "lodash"
import { DeleteButtonOptions } from "./delete-buttons"

interface SelectLanguageProps {
  languageOptions: JSX.Element[],
  handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const RenderSelectLanguageSection = ({handleLanguageChange, languageOptions}: SelectLanguageProps) => {
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

interface SingleLanguageProps {
  language: LanguageItem,
  deleteStatuses: DeleteStatusesDictionary,
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  handleDeleteLanguage: (language: LanguageItem) => void
}

const RenderSingleSavedLanguage = ({language, deleteStatuses, setDeleteStatuses, handleDeleteLanguage}: SingleLanguageProps) => {
  const status = deleteStatuses[language.language_listID] || "initial"

  const setStatus = (newStatus: DeleteStatuses) => {
    setDeleteStatuses((prevStatuses) => ({
      ...prevStatuses,
      [language.language_listID]: newStatus,
    }))
  }

  return (
    <li>
      {language.Language_name}
      <DeleteButtonOptions<LanguageItem>
        status = {status}
        setStatus = {setStatus}
        dataType = {language}
        handleDeleteOnClick = {handleDeleteLanguage}
      />
    </li>
  )
}

interface SavedLanguageList {
  spokenLanguages: LanguageItem[],
  deleteStatuses: DeleteStatusesDictionary,
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  handleDeleteLanguage: (language: LanguageItem) => void
}

export const RenderSavedLanguageList = ({spokenLanguages, deleteStatuses, setDeleteStatuses, handleDeleteLanguage}: SavedLanguageList) => {
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
