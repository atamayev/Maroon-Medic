import React from "react";
import { Card, Button} from "react-bootstrap";
import { handleAddLanguage } from "../../../Custom Hooks/Hooks for Account Details/add";
import { handleDeleteLanguage } from "../../../Custom Hooks/Hooks for Account Details/delete";
import { saveLanguages } from "../../../Custom Hooks/Hooks for Account Details/DoctorAccountDetails/saveDoctorAccountDetails";
import { handleLanguageChange } from "../../../Custom Hooks/Hooks for Account Details/select";

export default function RenderLanguageSection(props){
  return(
    <Card className="mb-3">
      <Card.Header>
      Languages
      </Card.Header>
      <Card.Body>
        {renderIsVetLanguages(props)}
      </Card.Body>
    </Card>
  );
};

function renderIsVetLanguages(props){
  return(
    <div>
      <select
        id="language"
        name="language"
        value={props.selectedLanguage?.language_listID || ""}
        // Change the select's onChange event to this:
        onChange={(e) => {
          const selectedLanguageID = e.target.value;
          const selectedLanguage = props.listDetails[0].find(
            (lang) => lang.language_listID === JSON.parse(selectedLanguageID)
          );
          props.setSelectedLanguage(selectedLanguage);
          const newSpokenLanguages = handleAddLanguage(
            selectedLanguage,
            props.spokenLanguages
          );
          props.setSpokenLanguages(newSpokenLanguages);
          saveLanguages(
            selectedLanguage.language_listID,
            newSpokenLanguages,
            props.setSelectedLanguage,
            props.setLanguagesConfirmation,
            'add'
          )}}
    >
        <option value="" disabled>Choose a language</option>
        {Array.isArray(props.listDetails[0]) &&
          props.listDetails[0].length > 0 &&
          props.listDetails[0]
            .filter((language) => !props.spokenLanguages.find((spoken) => spoken.language_listID === language.language_listID))
            .map((language) => (
              <option key={language?.language_listID} value={language?.language_listID}>
                {language?.Language_name}
              </option>
            ))}
      </select>

      <ul>
        {Array.isArray(props.spokenLanguages) &&
          props.spokenLanguages.map((language) => (
            <li key={language.language_listID}>
              {language.Language_name}
              <Button onClick={() => handleDeleteLanguage(language, props.spokenLanguages, props.setSpokenLanguages, props.setSelectedLanguage, props.setLanguagesConfirmation)}>x</Button>
            </li>
          ))}
      </ul>
      {/* <Button 
        variant="success" 
        onClick={() => saveLanguages(props.spokenLanguages, props.setLanguagesConfirmation)}
        >
        Save</Button> */}
        <span className={`fade ${props.languagesConfirmation.messageType ? 'show' : ''}`}>
          {props.languagesConfirmation.messageType === 'saved' && 'Languages saved!'}
          {props.languagesConfirmation.messageType === 'same' && 'Same Language data!'}
          {props.languagesConfirmation.messageType === 'problem' && 'Problem Saving Languages!'}
          {props.languagesConfirmation.messageType === 'none' && 'No languages selected'}
        </span>
    </div>
  );
};
