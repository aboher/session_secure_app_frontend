import { createContext, useCallback, useEffect, useRef, useState } from "react";
import axios from "../api/axiosInstance";
import {
  SESSION_INFO_PATH,
  SIGNOUT_PATH,
  SIGNIN_PATH,
} from "../constants/urlConstants";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState({});
  const loading = useRef(true);

  const getSessionInfo = useCallback(async () => {
    try {
      const result = await axios.get(SESSION_INFO_PATH);
      return {
        email: result?.data?.email,
        roles: result?.data?.roles,
        expirationDate: new Date(result?.data?.expirationDate),
      };
    } catch (error) {
      return null;
    }
  }, []);

  const checkAuthentication = useCallback(async () => {
    const currentSession = await getSessionInfo();
    setSession(currentSession);
    setIsAuthenticated(currentSession ? true : false);
    loading.current = false;
  }, [getSessionInfo]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const signIn = async ({ email, password }) => {
    loading.current = true;
    await axios.post(SIGNIN_PATH, { email, password });
    checkAuthentication();
  };

  const signOut = async () => {
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
        session,
        signOut,
        signIn,
        loading: loading.current,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
