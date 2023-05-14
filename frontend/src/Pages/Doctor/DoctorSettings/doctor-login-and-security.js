import React from 'react'
import Header from '../../header'
import DoctorHeader from '../doctor-header.js';

export default function DoctorLoginAndSecurity() {
  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
        DoctorLoginAndSecurity
        <br/>
        Add login history and update history here
    </>
  )
}
