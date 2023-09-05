import { Response } from "express"

export default new class Cookie {
	clearAll(res: Response): void {
		const cookieNames = ["AccessToken", "UUID"]

		cookieNames.forEach((cookieName) => {
			res.clearCookie(`${cookieName}`, {
				httpOnly: true,
				secure: true,
				sameSite: "none",
				path: "/"
			})
		})
	}
}()
