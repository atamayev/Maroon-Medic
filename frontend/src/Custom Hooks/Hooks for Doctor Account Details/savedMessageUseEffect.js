import { useEffect } from 'react';

export const useConfirmationTimeout = (...args) => {
  // Create an array to hold the timeout ids
  let timeoutIds = [];

  useEffect(() => {
    // Clear the timeout array
    timeoutIds = [];

    // Loop through each pair of arguments (show and set functions)
    for(let i = 0; i < args.length; i += 2) {
      const showFunc = args[i];
      const setFunc = args[i+1];
      
      // If the show function returns true, set a timeout
      if(showFunc) {
        const timeoutId = setTimeout(() => {
          setFunc(false);
        }, 5000);
        
        // Push the timeout id to the array
        timeoutIds.push(timeoutId);
      }
    }
    
    // Clear all timeouts when the component unmounts
    return () => {
      for (let id of timeoutIds) {
        clearTimeout(id);
      }
    };
  }, args); // Pass all arguments as dependencies to useEffect
};
