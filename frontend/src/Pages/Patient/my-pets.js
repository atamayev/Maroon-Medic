import React from 'react'
import PatientHeader from './patient-header'
import Header from '../header'

export default function MyPets() {
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      Create a seperate card for each pet
    </>
    )
};
