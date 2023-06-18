//Type is either Doctor or Patient
export function clearCookies(res, type = ['Doctor', 'Patient'], shouldRedirect, status_code = 401) {
  const cookieNames = ['AccessToken', 'UUID', 'New_User'];

  // ensure type is always an array
  if (typeof type === 'string') type = [type];

  let redirectURL = '';
  type.forEach(t => {
    cookieNames.forEach((cookieName) => {
      res.clearCookie(`${t}${cookieName}`, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/'
      });
    });
    if (shouldRedirect) {
      if (t === 'Doctor') redirectURL = '/vet-login';
      else if (t === 'Patient') redirectURL = '/patient-login';
      else redirectURL = '/';
    }
  });

  if (shouldRedirect) {
    res.status(401).json({ shouldRedirect: true, redirectURL });
  }
}
