/* eslint-disable no-useless-escape */
export default new class CheckCookie {
	forNewUser(name: string): boolean {
		return document.cookie.split(";").some((item) => item.trim().startsWith(name))
	}

	getCookie(name: string): string | null {
		const matches = document.cookie.match(new RegExp(
			`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1")}=([^;]*)`
		))
		return matches ? decodeURIComponent(matches[1]) : null
	}
}
