//Type is either Doctor or Patient
export function clearCookies(type, res) {
    const cookieNames = ['AccessToken', 'UUID', 'New_User'];
  
    cookieNames.forEach((cookieName) => {
      res.clearCookie(`${type}${cookieName}`, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/'
      });
    });
}

// make another function - clear cookies and redirect. don't want to re-direct in all cases
