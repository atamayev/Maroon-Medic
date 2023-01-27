import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (username, password) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", {email: username, password: password}, {
      withCredentials: true,
    });
    // console.log('current user', currentUser)
    //console.log(res.cookie)
    console.log('res.data', res.data)

    setCurrentUser(res.data)
  };

  const register = async (username, password) => {
    const res = await axios.post("http://localhost:8800/api/auth/register", {email: username, password: password}, {
      withCredentials: true,
    });
    // console.log('current user', currentUser)
    //console.log(res.cookie)
    console.log('res.data', res.data)

    setCurrentUser(res.data)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, register}}>
      {children}
    </AuthContext.Provider>
  );
};
