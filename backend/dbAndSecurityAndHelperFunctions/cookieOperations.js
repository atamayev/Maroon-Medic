//Type is either Doctor or Patient
export function clearCookies(res, type = ['Doctor', 'Patient'], shouldRedirect, status_code = 401) {
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

  let redirectURL = '';
  if (shouldRedirect) {
    if (type.includes('Doctor')) redirectURL = '/vet-login';
    else if (type.includes('Patient')) redirectURL = '/patient-login';
    else redirectURL = '/';
    res.status(status_code).json({ shouldRedirect: true, redirectURL });
  } else {
    res.status(status_code).json();
  }
}
