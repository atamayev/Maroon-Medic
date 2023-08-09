import { Response } from "express"

export default new class Cookie {
  clearAll(res: Response, type: string[] | DoctorOrPatient = ["Doctor", "Patient"]): void {
    const cookieNames = ["AccessToken", "UUID", "NewUser"]

    // ensure type is always an array
    if (typeof type === "string") type = [type]

    type.forEach(t => {
      cookieNames.forEach((cookieName) => {
        res.clearCookie(`${t}${cookieName}`, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/"
        })
      })
    })
  }
}()
