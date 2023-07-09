import PrivatePatientDataService from "../../services/private-patient-data-service";
import { invalidUserAction } from "../user-verification-snippets";

export async function fetchPetData(setSavedPetData) {
  try {
    const response = await PrivatePatientDataService.fetchPetData()
    if (response) {
      setSavedPetData(response.data);
      sessionStorage.setItem("PatientPetData", JSON.stringify(response.data))
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

export async function FillPetTypes(setPetTypes) {
  try {
    const response = await PrivatePatientDataService.fillPetTypes();
    if (response) {
      setPetTypes(response.data);
      sessionStorage.setItem("PetTypes", JSON.stringify(response.data));
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

export async function FillInsurances(setInsurances) {
  try {
    const response = await PrivatePatientDataService.fillInsurances();
    if (response) {
      setInsurances(response.data);
      sessionStorage.setItem("Insurances", JSON.stringify(response.data));
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}
