import { useState, useEffect } from "react";
import PrivateDoctorDataService from "../services/private-doctor-data-service";
import PrivatePatientDataService from "../services/private-patient-data-service";
import { invalidUserAction } from "./user-verification-snippets";

async function fetchDashboardData(setDashboardData, userType) {
    try {
        let response
        if (userType === 'Patient') response = await PrivatePatientDataService.fillDashboard()
        else if (userType === 'Doctor') response = await PrivateDoctorDataService.fillDashboard()
        if (response) {
            setDashboardData(response.data);
            sessionStorage.setItem(`${userType}DashboardData`, JSON.stringify(response.data))
        }
    } catch(error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
    }
}

export function useDashboardData(userType) {
    const [dashboardData, setDashboardData] = useState(null);

    const fetchAndSetDashboardData = async () => {
        if (userType === 'Patient' || userType === 'Doctor') {

            try {
                // const storedDashboardData = sessionStorage.getItem(`${userType}DashboardData`)
                // if (storedDashboardData) {
                //     setDashboardData(JSON.parse(storedDashboardData));
                // } else {
                    fetchDashboardData(setDashboardData, userType);
                // }
            } catch (error) {
            }
        }
    };

    useEffect(() => {
        fetchAndSetDashboardData();
    }, [userType]);

    return {dashboardData, setDashboardData};
}
