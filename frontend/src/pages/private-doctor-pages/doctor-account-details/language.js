import _ from "lodash"
import { useState } from "react";
import { Card, Button} from "react-bootstrap";
import { handleAddLanguage } from "../../../custom-hooks/account-details-hooks/add";
import { handleDeleteLanguage } from "../../../custom-hooks/account-details-hooks/delete";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";

export default function RenderLanguageSection(props) {
  return(
    <Card className = "mb-3">
      <Card.Header>
        Languages
      </Card.Header>
      <Card.Body>
        {RenderIsVetLanguages(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsVetLanguages(props) {
  const {listDetails, spokenLanguages, setSpokenLanguages} = props;
  const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage();

  const renderMessageSection = () => {
    return (
      <div className = {`fade ${languagesConfirmation.messageType ? 'show' : ''}`}>
        {languagesConfirmation.messageType === 'saved' && 'Languages saved!'}
        {languagesConfirmation.messageType === 'same' && 'Same Language data!'}
        {languagesConfirmation.messageType === 'problem' && 'Problem Saving Languages!'}
        {languagesConfirmation.messageType === 'none' && 'No languages selected'}
      </div>
    )
  }

  const renderChooseLanguage = () => {
    if (!(_.isArray(listDetails.languages) && !_.isEmpty(listDetails.languages))) return null;

    return (
      <>
        {
          listDetails.languages
          .filter((language) => !spokenLanguages.find((spoken) => spoken.language_listID === language.language_listID))
          .map((language) => (
            <option key = {language?.language_listID} value = {language?.language_listID}>
              {language?.Language_name}
            </option>
          ))
        }
      </>
    );
  };


  const renderSelectLanguageSection = () => {
    return (
      <select
        id = "language"
        name = "language"
        value = {""}
        onChange = {(e) =>
          handleAddLanguage(
            e.target.value,
            spokenLanguages,
            setSpokenLanguages,
            listDetails,
            setLanguagesConfirmation,
            'doctor'
          )
        }
      >
        <option value = "" disabled>Choose a language</option>
        {renderChooseLanguage()}
      </select>
    )
  }

  const renderNevermindButton = (status, setStatus) => {
    if (status !== 'deleting') return null

    return (
      <Button
        variant = "secondary"
        onClick = {() => setStatus('initial')}
      >
        Nevermind
      </Button>
    )
  }

  const renderConfirmDeleteButton = (status, language) => {
    if (status !== 'deleting') return null

    return (
      <Button
        variant = "danger"
        onClick = {() =>
          handleDeleteLanguage(
            language,
            spokenLanguages,
            setSpokenLanguages,
            setLanguagesConfirmation,
            'doctor'
        )}
      >
        Confirm Delete
      </Button>
    )
  }

  const renderInitialDeleteButton = (status, setStatus) => {
    if (status !== 'initial') return null

    return (
      <Button
        variant = "danger"
        onClick = {() => setStatus('deleting')}
      >
        X
      </Button>
    )
  }

  const renderDeleteButtonOptions = (status, setStatus, language) => {
    return (
      <>
        {renderInitialDeleteButton(status, setStatus)}
        {renderNevermindButton(status, setStatus)}
        {renderConfirmDeleteButton(status, language)}
      </>
    )
  }

  const RenderSingleSavedLanguage = (language) => {
    const [status, setStatus] = useState('initial');
    return (
      <li>
        {language.Language_name}
        {renderDeleteButtonOptions(status, setStatus, language)}
      </li>
    )
  }

  const renderSavedLanguageList = () => {
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

  return(
    <>
      {renderSelectLanguageSection()}
      {renderSavedLanguageList()}
      {renderMessageSection()}
    </>
  );
};
