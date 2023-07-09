import _ from "lodash"
import { useState, useEffect, useMemo } from "react"
import { Card } from "react-bootstrap"
import { DeleteButtonOptions } from "../../../components/delete-buttons"
import { renderMessageSection } from "../../../components/saved-message-section"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import { useHandleDeleteLanguage, useHandleAddLanguage } from "../../../custom-hooks/account-details-hooks/callbacks"

export default function RenderLanguageSection(props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Languages
      </Card.Header>
      <Card.Body>
        {RenderIsVetLanguages(props)}
      </Card.Body>
    </Card>
  )
}

function RenderIsVetLanguages(props) {
  const {listDetails, spokenLanguages, setSpokenLanguages} = props
  const [deleteStatuses, setDeleteStatuses] = useState({})
  const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage()

  useEffect(() => {
    const newDeleteStatuses = { ...deleteStatuses }

    // Go through each status
    for (const languageListID in newDeleteStatuses) {
      // If the language ID does not exist in the spokenLanguages list, delete the status
      if (!spokenLanguages.some((language) => language.language_listID === languageListID)) {
        delete newDeleteStatuses[languageListID]
      }
    }

    setDeleteStatuses(newDeleteStatuses)
  }, [spokenLanguages])

  const languageOptions = useMemo(() => {
    if (!(_.isArray(listDetails.languages) && !_.isEmpty(listDetails.languages))) return null

    return listDetails.languages
      .filter((language) => !spokenLanguages.find((spoken) => spoken.language_listID === language.language_listID))
      .map((language) => (
        <option key = {language?.language_listID} value = {language?.language_listID}>
          {language?.Language_name}
        </option>
      ))
  }, [listDetails.languages, spokenLanguages])

  const handleLanguageChange = useHandleAddLanguage(spokenLanguages, setSpokenLanguages, listDetails, setLanguagesConfirmation, "doctor")

  const renderSelectLanguageSection = () => {
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

  const handleDeleteLanguage = useHandleDeleteLanguage(spokenLanguages, setSpokenLanguages, setLanguagesConfirmation, "doctor")

  const RenderSingleSavedLanguage = (language) => {
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

  const renderSavedLanguageList = () => {
    if (!_.isArray(spokenLanguages) || _.isEmpty(spokenLanguages)) return null
    return (
      <ul>
        {spokenLanguages.map((language) => (
          <RenderSingleSavedLanguage
            key = {language.language_listID}
            {...language}
          />
        ))}
      </ul>
    )
  }

  return (
    <>
      {renderSelectLanguageSection()}
      {renderSavedLanguageList()}
      {renderMessageSection(languagesConfirmation, "Languages")}
    </>
  )
}
