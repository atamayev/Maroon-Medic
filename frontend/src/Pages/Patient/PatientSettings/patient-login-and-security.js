import React from 'react'
import Header from '../../header'
import PatientHeader from '../patient-header';

export default function PatientLoginAndSecurity() {
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      PatientLoginAndSecurity
        <br/>
        Add login history and update history here
    </>
  )
}
