import { Response } from "express"
//Type is either Doctor or Patient
type UserType = "Doctor" | "Patient";

export function clearCookies(res: Response, type: string[] | UserType = ["Doctor", "Patient"]): void {
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
