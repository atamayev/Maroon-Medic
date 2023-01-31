import React, {useEffect} from 'react'
import VetDataService from "../Services/vet-service.js";
import axios from 'axios';

export default function Test() {

    useEffect(() => {
        getData();
    }, []);

    async function getData (){
        const cookies = document.cookie.split("; ");

        if(cookies){
            try{
              const response = await VetDataService.getProprietaryHomePageData(cookies)
              console.log('response', response)
            }catch(error){
              console.log('Error in getData', error)
            }
          }else{
            console.log('no cookie')
          }

    }

//   async function currentUser1 (){
//     const cookies = document.cookie;
//     console.log(cookies);
//     if(cookies){
//       try{
//         const response = await VetDataService.proprietaryHomePageData(cookies)
//         console.log('response', response)
//       }catch(error){
//         console.log('Error in currentUser1')
//       }
//     }else{
//       console.log('no cookie')
//     }
    
//     // const cookies = document.cookie.split("; ");
//     // const secondCookie = cookies[1]

//     // console.log(secondCookie)
//     // try{
//     //   const response = await VetDataService.proprietaryHomePageData(UUID)
//     //   console.log(response)
//     // }catch(error){
//     //   console.log(error)
//     // }
//   }

  return (
    <div>Test</div>
  )
}
