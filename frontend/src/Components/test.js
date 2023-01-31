import React, {useEffect} from 'react'
import VetDataService from "../Services/vet-service.js";
import axios from 'axios';

export default function Test() {

    useEffect(() => {
        getData();
    }, []);

    //Checks if a cookie with the name UUID exists. If it does, returns it. 
    function checkUUID(){
      const cookieName = "UUID=";
      const decodedCookie = document.cookie; // when https, will need to decode
      const cookies = decodedCookie.split(";");
      for(let i = 0; i <cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.startsWith(cookieName)) {
          console.log('true')
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return null;
    }

    async function getData (){
        const cookies = document.cookie;
        if(checkUUID()){
          const UUID = checkUUID()
            try{
              const response = await VetDataService.getProprietaryHomePageData(UUID)
              console.log('response', response.data[0].Doctor_ID)
            }catch(error){
              console.log('Error in getData', error)
            }
          }else{
            console.log('no cookie')
          }
    }

  return (
    <div>Test</div>
  )
}
