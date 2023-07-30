import { useState } from "react"
import { Card } from "react-bootstrap"
import { renderMessageSection } from "../../../components/saved-message-section"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import { renderSelectLanguageSection, renderSavedLanguageList } from "../../../components/language"
import { useLanguageOptions, useUpdateDeleteStatuses } from "../../../custom-hooks/account-details-hooks/language"
import { useHandleAddLanguage, useHandleDeleteLanguage } from "../../../custom-hooks/account-details-hooks/callbacks"

export default function RenderLanguageSection(props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Languages
      </Card.Header>
      <Card.Body>
        {RenderIsPatientLanguages(props)}
      </Card.Body>
    </Card>
  )
}

function RenderIsPatientLanguages(props) {
  const {listDetails, spokenLanguages, setSpokenLanguages} = props
  const [deleteStatuses, setDeleteStatuses] = useState({})
  const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage()

  useUpdateDeleteStatuses(deleteStatuses, setDeleteStatuses, spokenLanguages)

  const languageOptions = useLanguageOptions(listDetails.languages, spokenLanguages)

  const handleLanguageChange = useHandleAddLanguage(spokenLanguages, setSpokenLanguages, listDetails, setLanguagesConfirmation, "patient")

  const handleDeleteLanguage = useHandleDeleteLanguage(spokenLanguages, setSpokenLanguages, setLanguagesConfirmation, "patient")

  return (
    <>
      {renderSelectLanguageSection(handleLanguageChange, languageOptions)}
      {renderSavedLanguageList(spokenLanguages, deleteStatuses, setDeleteStatuses,handleDeleteLanguage)}
      {renderMessageSection(languagesConfirmation, "Languages")}
    </>
  )
}
