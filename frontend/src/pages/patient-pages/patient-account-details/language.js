import _ from "lodash"
import { useState, useCallback, useMemo, useEffect } from "react";
import { Card } from "react-bootstrap";
import { renderMessageSection } from "../../../components/saved-message-section";
import { handleAddLanguage } from "../../../custom-hooks/account-details-hooks/add";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handleDeleteLanguage } from "../../../custom-hooks/account-details-hooks/delete";
import { renderConfirmDeleteButton, renderInitialDeleteButton, renderNevermindButton } from "../../../components/delete-buttons";

export default function RenderLanguageSection(props) {
  return(
    <Card className = "mb-3">
      <Card.Header>
        Languages
      </Card.Header>
      <Card.Body>
        {RenderIsPatientLanguages(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsPatientLanguages(props) {
  const {listDetails, spokenLanguages, setSpokenLanguages} = props;
  const [deleteStatuses, setDeleteStatuses] = useState({});
  const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage();

  useEffect(() => {
    const newDeleteStatuses = { ...deleteStatuses };

    // Go through each status
    for (const language_listID in newDeleteStatuses) {
      // If the language ID does not exist in the spokenLanguages list, delete the status
      if (!spokenLanguages.some((language) => language.language_listID === language_listID)) {
        delete newDeleteStatuses[language_listID];
      }
    }

    setDeleteStatuses(newDeleteStatuses);
  }, [spokenLanguages]);

  const languageOptions = useMemo(() => {
    if (!(_.isArray(listDetails.languages) && !_.isEmpty(listDetails.languages))) return null;

    return listDetails.languages
      .filter((language) => !spokenLanguages.find((spoken) => spoken.language_listID === language.language_listID))
      .map((language) => (
        <option key = {language?.language_listID} value = {language?.language_listID}>
          {language?.Language_name}
        </option>
      ));
  }, [listDetails.languages, spokenLanguages]);

  const handleLanguageChange = useCallback((e) => {
    handleAddLanguage(
      e.target.value,
      spokenLanguages,
      setSpokenLanguages,
      listDetails,
      setLanguagesConfirmation,
      'patient'
    );
  }, [spokenLanguages, listDetails, setSpokenLanguages, setLanguagesConfirmation]);

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

  const handleDeleteOnClick = useCallback(
    (language) => {
      handleDeleteLanguage(
        language,
        spokenLanguages,
        setSpokenLanguages,
        setLanguagesConfirmation,
        'patient'
      );
    },
    [spokenLanguages, setSpokenLanguages, setLanguagesConfirmation]
  );

  const renderDeleteButtonOptions = (status, setStatus, language) => {
    return (
      <>
        {renderInitialDeleteButton(status, setStatus)}
        {renderNevermindButton(status, setStatus)}
        {renderConfirmDeleteButton(status, language, handleDeleteOnClick)}
      </>
    )
  }

  const RenderSingleSavedLanguage = (language) => {
    const status = deleteStatuses[language.language_listID] || 'initial';

    const setStatus = (newStatus) => {
      setDeleteStatuses((prevStatuses) => ({
        ...prevStatuses,
        [language.language_listID]: newStatus,
      }));
    };

    return (
      <li>
        {language.Language_name}
        {renderDeleteButtonOptions(status, setStatus, language)}
      </li>
    )
  }

  const renderSavedLanguageList = () => {
    if (!_.isArray(spokenLanguages) || _.isEmpty(spokenLanguages)) return null
    return (
      <ul>
        {spokenLanguages.map((language) => (
          <RenderSingleSavedLanguage {...language} />
        ))}
      </ul>
    )
  }

  return(
    <>
      {renderSelectLanguageSection()}
      {renderSavedLanguageList()}
      {renderMessageSection(languagesConfirmation, 'Languages')}
    </>
  );
};
