import { createContext, useCallback, useEffect, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

const SESSION_INFO_URL = "/auth-info";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState({
    username: "",
    roles: [],
    expirationDate: new Date(),
  });

  const getSessionInfo = useCallback(async () => {
    try {
      const result = await axios.get(SESSION_INFO_URL, {
        withCredentials: true,
      });
      return {
        username: result?.data?.username,
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
    };

    checkAuthentication();
  }, [getSessionInfo, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        session,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
