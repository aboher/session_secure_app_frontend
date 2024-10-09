import { createContext, useCallback, useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { SESSION_INFO_PATH, SIGNOUT_PATH } from "../constants/urlConstants";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState({
    email: "",
    roles: [],
    expirationDate: new Date(),
  });
  const [loading, setLoading] = useState(true);

  const getSessionInfo = useCallback(async () => {
    try {
      const result = await axios.get(SESSION_INFO_PATH);
      return {
        email: result?.data?.email,
        roles: result.data.roles,
        expirationDate: new Date(result.data.expirationDate),
      };
    } catch (error) {
      return null;
    }
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      const currentSession = await getSessionInfo();
      setSession(currentSession);
      setIsAuthenticated(currentSession ? true : false);
      setLoading(false);
    };

    checkAuthentication();
  }, [getSessionInfo, isAuthenticated]);

  const logout = async () => {
    try {
      await axios.post(SIGNOUT_PATH, null);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        session,
        setSession,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
