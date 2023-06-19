//Type is either Doctor or Patient
export function clearCookies(res, type = ['Doctor', 'Patient']) {
  const cookieNames = ['AccessToken', 'UUID', 'New_User'];

  // ensure type is always an array
  if (typeof type === 'string') type = [type];

  type.forEach(t => {
    cookieNames.forEach((cookieName) => {
      res.clearCookie(`${t}${cookieName}`, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/'
      });
    });
  });
}
