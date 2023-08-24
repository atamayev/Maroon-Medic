export default new class CheckCookie {
	forContext(name: string): boolean {
		return document.cookie.split(";").some((item) => item.trim().startsWith(name + "="))
	}

	forNewUser(name: string): boolean {
		return document.cookie.split(";").some((item) => item.trim().startsWith(name))
	}
}
