import PrivatePatientDataService from "../../services/private-patient-data-service";
import { invalidUserAction } from "../user-verification-snippets";

export async function FillLists(setListDetails) { 
  try {
    const response = await PrivatePatientDataService.fillLists();
    if (response) {
      setListDetails(response.data);
      sessionStorage.setItem("ListDetails", JSON.stringify(response.data));
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

export async function FillPatientAccountDetails(setSpokenLanguages) {
  try {
    const response = await PrivatePatientDataService.fillAccountDetails();
    if (response) {
      if (response.data.languages) setSpokenLanguages(response.data.languages);
      sessionStorage.setItem("PatientAccountDetails", JSON.stringify(response.data));
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}
