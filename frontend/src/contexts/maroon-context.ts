import { makeAutoObservable } from "mobx"
import { createContext } from "react"
import cookieCheck from "src/utils/cookie-check"

export class MaroonContext {
	constructor() {
		makeAutoObservable(this)
		this.UUID = cookieCheck.getCookie("UUID")
		this.accessToken = cookieCheck.getCookie("AccessToken")
		this.userType = cookieCheck.getCookie("UserType") as "Doctor" | "Patient" | null
		this.newUser = cookieCheck.getCookie("NewUser") === "true"
	}

	private _UUID: string | null = null
	private _accessToken: string | null = null
	private _userType: "Doctor" | "Patient" | null = null
	private _newUser: boolean = false

	get UUID(): string | null {
		return this._UUID
	}

	get accessToken(): string | null {
		return this._accessToken
	}

	set UUID(value: string | null) {
		this._UUID = value
	}

	set accessToken(value: string | null) {
		this._accessToken = value
	}

	get userType(): "Doctor" | "Patient" | null {
		return this._userType
	}

	set userType(value: "Doctor" | "Patient" | null) {
		this._userType = value
	}

	get newUser(): boolean {
		return this._newUser
	}

	set newUser(value: boolean) {
		this._newUser = value
	}
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppContext = createContext(new MaroonContext())
