// useConfirmationTimeout.js
import { useEffect } from 'react';

export const useConfirmationTimeout = (
  showSavedPreVetMessage,
  setShowSavedPreVetMessage,
  showSavedVetMessage,
  setShowSavedVetMessage,
  showSavedDescriptionMessage,
  setShowSavedDescriptionMessage,
  showSavedSpecialtiesMessage,
  setShowSavedSpecialtiesMessage,
  showSavedInsurancesMessage,
  setShowSavedInsurancesMessage,
  showSavedLanguagesMessage,
  setShowSavedLanguagesMessage
) => {
    useEffect(() => {
        //This is done to prevent a potential memory leak
        let timeoutId1;
        let timeoutId2;
        let timeoutId3;
        let timeoutId4;
        let timeoutId5;
        let timeoutId6;
    
        if (showSavedPreVetMessage) {
          timeoutId1 = setTimeout(() => {
            setShowSavedPreVetMessage(false);
          }, 5000);
        }
      
        if (showSavedVetMessage) {
          timeoutId2 = setTimeout(() => {
            setShowSavedVetMessage(false);
          }, 5000);
        }
    
        if (showSavedDescriptionMessage) {
          timeoutId3 = setTimeout(() => {
            setShowSavedDescriptionMessage(false);
          }, 5000);
        }
    
        if (showSavedSpecialtiesMessage) {
          timeoutId4 = setTimeout(() => {
            setShowSavedSpecialtiesMessage(false);
          }, 5000);
        }
    
        if (showSavedInsurancesMessage) {
          timeoutId5 = setTimeout(() => {
            setShowSavedInsurancesMessage(false);
          }, 5000);
        }
    
        if (showSavedLanguagesMessage) {
          timeoutId6 = setTimeout(() => {
            setShowSavedLanguagesMessage(false);
          }, 5000);
        }
      
        return () => {
          if (timeoutId1) {
            clearTimeout(timeoutId1);
          }
          if (timeoutId2) {
            clearTimeout(timeoutId2);
          }
          if (timeoutId3) {
            clearTimeout(timeoutId3);
          }
          if (timeoutId4) {
            clearTimeout(timeoutId4);
          }
          if (timeoutId5) {
            clearTimeout(timeoutId5);
          }
          if (timeoutId6) {
            clearTimeout(timeoutId6);
          }
        };
      }, [
        showSavedPreVetMessage, 
        showSavedVetMessage, 
        showSavedDescriptionMessage, 
        showSavedSpecialtiesMessage, 
        showSavedInsurancesMessage, 
        showSavedLanguagesMessage
    ]);
};
