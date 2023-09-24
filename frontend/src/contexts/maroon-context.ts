import { createContext } from "react"
import { makeAutoObservable } from "mobx"
import AuthClass from "src/classes/shared/auth-class"
import SharedDataClass from "src/classes/shared/shared-data-class"
import PrivateDoctorDataClass from "src/classes/private-doctor/private-doctor-data-class"
import PatientDataClass from "src/classes/patient/patient-data-class"
import PublicDoctorDataClass from "src/classes/public-doctor/public-doctor-data-class"

export class MaroonContext {
	constructor() {
		makeAutoObservable(this)
		this.auth = new AuthClass()
		this.initializeModules()
	}

	public auth: AuthClass
	public sharedData: SharedDataClass | null = null
	public privateDoctorData: PrivateDoctorDataClass | null = null
	public patientData: PatientDataClass | null = null
	public publicDoctorData: PublicDoctorDataClass | null = null

	private initializeModules(): void {
		if (this.auth.isAuthenticated) {
			this.sharedData = new SharedDataClass(this.auth)

			if (this.auth.userType === "Doctor") {
				this.privateDoctorData = new PrivateDoctorDataClass(this.auth)
			} else {
				this.patientData = new PatientDataClass(this.auth)
			}
		}
	}

	private clearStorage(): void {
		localStorage.clear()
		sessionStorage.clear()
	}

	public logout(): void {
		this.clearStorage()
		this.auth.clearAuthData()
		this.sharedData?.clearSharedData()

		this.privateDoctorData?.clearDoctorData()
		this.patientData?.clearPatientData()
	}
}

const AppContext = createContext(new MaroonContext())
export default AppContext
