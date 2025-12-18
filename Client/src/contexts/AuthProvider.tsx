import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");

  const loginAction = async (data) => {
    try {
      if (data.username.length != 0) {
        setUser(data.username);
        setToken(data.token);
        localStorage.setItem("site", data.token);
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  async function logOut() {
    try {
      const res = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      console.log("Response:", res);
    } catch (err) {
      console.warn("Logout request failed:", err);
    }
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    console.log("Token after Logout:", localStorage.getItem("site"));
  }

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
