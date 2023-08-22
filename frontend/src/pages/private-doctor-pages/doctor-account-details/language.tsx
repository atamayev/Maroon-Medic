import { useState } from "react"
import { Card } from "react-bootstrap"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedLanguageList from "src/components/language/saved-languages-list"
import useUpdateDeleteLanguageStatuses from "src/custom-hooks/account-details/use-update-delete-language-statuses"
import useGenerateLanguageOptions from "src/custom-hooks/account-details/use-generate-language-options"
import { useHandleAddLanguage, useHandleDeleteLanguage } from "../../../custom-hooks/account-details/callbacks/callbacks"
import SelectLanguage from "src/components/language/select-language"

interface Props {
  listDetails: DoctorListDetails
  spokenLanguages: LanguageItem[]
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>
}

export default function RenderLanguageSection(props: Props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Languages
      </Card.Header>
      <Card.Body>
        <RenderIsVetLanguages {...props} />
      </Card.Body>
    </Card>
  )
}

function RenderIsVetLanguages(props: Props) {
  const {listDetails, spokenLanguages, setSpokenLanguages} = props
  const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
  const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage()

  useUpdateDeleteLanguageStatuses(deleteStatuses, setDeleteStatuses, spokenLanguages)

  const languageOptions = useGenerateLanguageOptions(listDetails.languages, spokenLanguages)

  const handleLanguageChange = useHandleAddLanguage(spokenLanguages, setSpokenLanguages, listDetails, setLanguagesConfirmation, "doctor")

  const handleDeleteLanguage = useHandleDeleteLanguage(spokenLanguages, setSpokenLanguages, setLanguagesConfirmation, "doctor")

  return (
    <>
      <SelectLanguage
        handleLanguageChange = {handleLanguageChange}
        languageOptions = {languageOptions}
      />
      <SavedLanguageList
        spokenLanguages = {spokenLanguages}
        deleteStatuses = {deleteStatuses}
        setDeleteStatuses = {setDeleteStatuses}
        handleDeleteLanguage = {handleDeleteLanguage}
      />
      <SavedConfirmationMessage
        confirmationMessage = {languagesConfirmation}
        whatIsBeingSaved = "Languages"
      />
    </>
  )
}
