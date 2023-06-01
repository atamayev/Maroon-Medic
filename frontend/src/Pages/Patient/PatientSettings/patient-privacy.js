import React from 'react'
import Header from '../../header'
import PatientHeader from '../patient-header.js';

export default function PatientPrivacy() {
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      PatientPrivacy
    </>
  )
}
