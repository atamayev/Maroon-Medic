import { createContext } from "react"
import { makeAutoObservable } from "mobx"
import AuthClass from "src/classes/shared/auth-class"
import SharedDataClass from "src/classes/shared/shared-data-class"
import PrivateDoctorDataClass from "src/classes/private-doctor/private-doctor-data-class"
import PatientDataClass from "src/classes/patient/patient-data-class"
import PublicDoctorDataClass from "src/classes/public-doctor/public-doctor-data-class"
import cookieCheck from "src/utils/cookie-check"

export class MaroonContext {
	constructor() {
		makeAutoObservable(this)
		const accessToken = cookieCheck.getCookie("AccessToken")
		const userType = localStorage.getItem("UserType") as DoctorOrPatientOrNull
		this.auth = new AuthClass(accessToken, userType)
		this.publicDoctorData = new PublicDoctorDataClass()
		this.initializeModules()
	}

	public auth: AuthClass
	public sharedData: SharedDataClass | null = null
	public privateDoctorData: PrivateDoctorDataClass | null = null
	public patientData: PatientDataClass | null = null
	public publicDoctorData: PublicDoctorDataClass

	private initializeModules(): void {
		if (this.auth.isAuthenticated) {
			this.sharedData = new SharedDataClass()

			if (this.auth.userType === "Doctor") {
				this.privateDoctorData = new PrivateDoctorDataClass()
			} else if (this.auth.userType === "Patient") {
				this.patientData = new PatientDataClass()
			}
		}
	}

	private clearStorage(): void {
		localStorage.clear()
		sessionStorage.clear()
	}

	private clearModules(): void {
		this.sharedData = null
		this.privateDoctorData = null
		this.patientData = null
	}

	public logout(): void {
		this.clearStorage()
		this.auth.clearAuthData()
		this.sharedData?.clearSharedData()

		this.privateDoctorData?.clearDoctorData()
		this.patientData?.clearPatientData()
		this.clearModules()
	}
}

const AppContext = createContext(new MaroonContext())
export default AppContext
