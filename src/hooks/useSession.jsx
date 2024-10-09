import { useCallback } from "react";
import axios from "../api/axiosInstance";
import {
  SESSION_INFO_BY_ID_PATH,
  ALL_ACTIVE_SESSIONS_IDS_PATH,
  DELETE_SESSION_BY_ID_PATH,
} from "../constants/urlConstants";

export const useSession = () => {
  const getSessionById = useCallback(async (id) => {
    let url = SESSION_INFO_BY_ID_PATH + id;
    try {
      const response = await axios.get(url);
      return {
        id: response?.data?.id,
        creationDate: new Date(response?.data?.creationDate),
        lastAccessedDate: new Date(response?.data?.lastAccessedDate),
        expirationDate: new Date(response?.data?.expirationDate),
        sessionDetails: response?.data?.sessionDetails,
      };
    } catch (error) {
      console.log("Error trying to retrieve current session id");
      return null;
    }
  }, []);

  const getSessionsIds = useCallback(async () => {
    try {
      let response = await axios.get(ALL_ACTIVE_SESSIONS_IDS_PATH);
      return response?.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, []);

  const deleteSessionById = async (id) => {
    try {
      const url = DELETE_SESSION_BY_ID_PATH + id;
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }
  };

  return { getSessionById, getSessionsIds, deleteSessionById };
};
