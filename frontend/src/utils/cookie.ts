export default new class CookieUtils {
  checkCookieForContext(name: string): boolean {
    return document.cookie.split(";").some((item) => item.trim().startsWith(name + "="))
  }

  checkCookieForNewUser(name: string): boolean {
    return document.cookie.split(";").some((item) => item.trim().startsWith(name))
  }
}
