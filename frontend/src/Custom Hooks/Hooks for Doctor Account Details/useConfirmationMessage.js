import { useEffect, useState } from 'react';

export const useConfirmationMessage = () => {
    const initialConfirmationState = {
      messageType: 'none', // 'saved', 'same', 'problem', 'none'
      timeoutId: null
    };
  
    const [confirmation, setConfirmation] = useState(initialConfirmationState);
  
    useEffect(() => {
      if (confirmation.messageType !== 'none') {
        const timeoutId = setTimeout(() => {
          setConfirmation(initialConfirmationState);
        }, 5000);
  
        return () => {
          clearTimeout(timeoutId);
        };
      }
    }, [confirmation.messageType]);
  
    return [confirmation, setConfirmation];
};
