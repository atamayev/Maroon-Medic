import { useState } from "react"
import { Card } from "react-bootstrap"
import { RenderMessageSection } from "../../../components/saved-message-section"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import { RenderSelectLanguageSection, RenderSavedLanguageList } from "../../../components/language"
import { useLanguageOptions, useUpdateDeleteStatuses } from "../../../custom-hooks/account-details-hooks/language"
import { useHandleAddLanguage, useHandleDeleteLanguage } from "../../../custom-hooks/account-details-hooks/callbacks"

interface Props {
  listDetails: PatientListDetailsType
  spokenLanguages: LanguageItemType[]
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>
}

export default function RenderLanguageSection(props: Props) {
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

function RenderIsPatientLanguages(props: Props) {
  const {listDetails, spokenLanguages, setSpokenLanguages} = props
  const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
  const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage()

  useUpdateDeleteStatuses(deleteStatuses, setDeleteStatuses, spokenLanguages)

  const languageOptions = useLanguageOptions(listDetails.LanguagesList, spokenLanguages)

  const handleLanguageChange = useHandleAddLanguage(spokenLanguages, setSpokenLanguages, listDetails, setLanguagesConfirmation, "patient")

  const handleDeleteLanguage = useHandleDeleteLanguage(spokenLanguages, setSpokenLanguages, setLanguagesConfirmation, "patient")

  return (
    <>
      <RenderSelectLanguageSection handleLanguageChange = {handleLanguageChange} languageOptions = {languageOptions} />
      <RenderSavedLanguageList
        spokenLanguages = {spokenLanguages}
        deleteStatuses = {deleteStatuses}
        setDeleteStatuses = {setDeleteStatuses}
        handleDeleteLanguage = {handleDeleteLanguage}
      />
      <RenderMessageSection
        confirmationMessage = {languagesConfirmation}
        whatIsBeingSaved = "Languages"
      />
    </>
  )
}
