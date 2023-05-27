import React from "react";
import { Card, Button} from "react-bootstrap";
import { handleAddLanguage } from "../../../Custom Hooks/Hooks for Doctor Account Details/add";
import { handleDeleteLanguage } from "../../../Custom Hooks/Hooks for Doctor Account Details/delete";
import { saveLanguages } from "../../../Custom Hooks/Hooks for Doctor Account Details/save";
import { handleLanguageChange } from "../../../Custom Hooks/Hooks for Doctor Account Details/select";

export default function RenderLanguageSection(props){
  return(
    <Card>
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
        onChange={event =>handleLanguageChange(event, props.listDetails, props.setSelectedLanguage)}
      >
        <option value="">Choose a language</option>
        {Array.isArray(props.listDetails[1]) &&
          props.listDetails[1].length > 0 &&
          props.listDetails[1]
            .filter((language) => !props.spokenLanguages.find((spoken) => spoken.language_listID === language.language_listID))
            .map((language) => (
              <option key={language?.language_listID} value={language?.language_listID}>
                {language?.Language_name}
              </option>
            ))}
      </select>
      <Button onClick={()=>handleAddLanguage(props.selectedLanguage, props.spokenLanguages, props.setSpokenLanguages, props.setSelectedLanguage)}>Add</Button>
      <ul>
        {Array.isArray(props.spokenLanguages) &&
          props.spokenLanguages.map((language) => (
            <li key={language.language_listID}>
              {language.Language_name}
              <Button onClick={() => handleDeleteLanguage(language, props.spokenLanguages, props.setSpokenLanguages)}>x</Button>
            </li>
          ))}
      </ul>
      <Button 
        variant="success" 
        onClick={() => saveLanguages(props.spokenLanguages, props.setLanguagesConfirmation)}
        >
        Save</Button>
      <span className={`fade ${props.languagesConfirmation.messageType === 'saved' ? 'show' : ''}`}>Languages saved!</span>
      <span className={`fade ${props.languagesConfirmation.messageType === 'same' ? 'show' : ''}`}>Same Language data!</span>
      <span className={`fade ${props.languagesConfirmation.messageType === 'problem' ? 'show' : ''}`}>Problem Saving Languages!</span>
    </div>
  );
};
