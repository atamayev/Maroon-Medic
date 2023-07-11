import moment from "moment"
import PrivateDoctorDataService from "../../services/private-doctor-data-service"
import { invalidUserAction } from "../user-verification-snippets"

export async function deleteSaveVetEducation (vetEducationObject, vetEducation, setVetEducation, setVetEducationConfirmation, operationType ) {
  try {
    const response = await PrivateDoctorDataService.saveEducationData(vetEducationObject, "vet", operationType)
    if (response.status === 200) {
      const newVetEducation = vetEducation.filter(object => object.vet_education_mappingID !== vetEducationObject)
      setVetEducation(newVetEducation)
      return newVetEducation
    } else {
      setVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setVetEducationConfirmation({messageType: "problem"})
    return
  }
}

export async function addSaveVetEducation (vetEducationObject, vetEducation, setVetEducation, listDetails, setVetEducationConfirmation, operationType) {
  const mappedVetEducationObject = {
    School_ID: listDetails.vetSchools.find(school => school.School_name === vetEducationObject.School_name)?.vet_school_listID || null,
    Education_type_ID: listDetails.vetEducationTypes.find(educationType => educationType.Education_type === vetEducationObject.Education_type)?.vet_education_typeID || null,
    Start_date: moment(vetEducationObject.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
    End_date: moment(vetEducationObject.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
  }
  try {
    const response = await PrivateDoctorDataService.saveEducationData(mappedVetEducationObject, "vet", operationType)
    if (response.status === 200) {
      vetEducationObject.vet_education_mappingID = JSON.stringify(response.data)
      const newVetEducation = [...vetEducation, vetEducationObject]
      setVetEducation(newVetEducation)
      return newVetEducation
    } else {
      setVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setVetEducationConfirmation({messageType: "problem"})
    return
  }
}

export async function deleteSavePreVetEducation (preVetEducationObject, preVetEducation, setPreVetEducation, setPreVetEducationConfirmation, operationType ) {
  try {
    const response = await PrivateDoctorDataService.saveEducationData(preVetEducationObject, "pre_vet", operationType)
    if (response.status === 200) {
      const newPreVetEducation = preVetEducation.filter(object => object.pre_vet_education_mappingID !== preVetEducationObject)
      setPreVetEducation(newPreVetEducation)
      return newPreVetEducation
    } else {
      setPreVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPreVetEducationConfirmation({messageType: "problem"})
    return
  }
}

export async function addSavePreVetEducation (preVetEducationObject, preVetEducation, setPreVetEducation, listDetails, setPreVetEducationConfirmation, operationType) {
  const mappedPreVetEducationObject = {
    School_ID: listDetails.preVetSchools.find(school => school.School_name === preVetEducationObject.School_name)?.pre_vet_school_listID || null,
    Major_ID: listDetails.majors.find(major => major.Major_name === preVetEducationObject.Major_name)?.major_listID || null,
    Education_type_ID: listDetails.preVetEducationTypes.find(educationType => educationType.Education_type === preVetEducationObject.Education_type)?.pre_vet_education_typeID || null,
    Start_date: moment(preVetEducationObject.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
    End_date: moment(preVetEducationObject.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
  }
  try {
    const response = await PrivateDoctorDataService.saveEducationData(mappedPreVetEducationObject, "pre_vet", operationType)
    if (response.status === 200) {
      preVetEducationObject.pre_vet_education_mappingID = JSON.stringify(response.data)
      const newPreVetEducation = [...preVetEducation, preVetEducationObject]
      setPreVetEducation(newPreVetEducation)
      return newPreVetEducation
    } else {
      setPreVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPreVetEducationConfirmation({messageType: "problem"})
    return
  }
}
