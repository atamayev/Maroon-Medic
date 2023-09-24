import _ from "lodash"
import { makeAutoObservable } from "mobx"
import SinglePublicDoctorDataClass from "./single-public-doctor-data-class"

export default class PublicDoctorDataClass {
	constructor() {
		makeAutoObservable(this)
	}

	private _publicDoctorDataMap: Map<number, SinglePublicDoctorDataClass> = new Map()

	public initializeSinglePublicDoctorData(doctorID: number, publicDoctorData: PublicDoctorAccountDetails): void {
		let singleDoctorData = this._publicDoctorDataMap.get(doctorID)
		if (_.isUndefined(singleDoctorData)) {
			singleDoctorData = new SinglePublicDoctorDataClass(publicDoctorData)
			this._publicDoctorDataMap.set(doctorID, publicDoctorData)
		}
	}

	public retrieveSinglePublicDoctorData(doctorId: number | null): SinglePublicDoctorDataClass | null {
		if (_.isNull(doctorId)) return null
		return this._publicDoctorDataMap.get(doctorId) ?? null
	}

	public doesDoctorExist(doctorId: number): boolean {
		return this._publicDoctorDataMap.has(doctorId)
	}
}
