import { useCallback } from "react";
import axios from "../api/axiosInstance";
import {
  SESSION_INFO_BY_ID_PATH,
  ALL_ACTIVE_SESSIONS_IDS_PATH,
  DELETE_SESSION_BY_ID_PATH,
  USERS_WITH_ACTIVE_SESSION_PATH,
  ALL_ATTRIBUTES_PATH,
  HANDLE_ATTRIBUTE_BY_NAME_PATH,
} from "../constants/urlConstants";
import { HttpStatusCode } from "axios";

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

  const getSessionsIds = useCallback(async (email) => {
    try {
      const url = email
        ? ALL_ACTIVE_SESSIONS_IDS_PATH + "/" + email
        : ALL_ACTIVE_SESSIONS_IDS_PATH;
      const response = await axios.get(url);
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

  const getUsersWithActiveSessions = useCallback(async () => {
    try {
      const response = await axios.get(USERS_WITH_ACTIVE_SESSION_PATH);
      return response?.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, []);

  const getAllAttributes = useCallback(async () => {
    try {
      const response = await axios.get(ALL_ATTRIBUTES_PATH);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createUpdateAttribute = async (attributeName, attribute) => {
    try {
      await axios.put(HANDLE_ATTRIBUTE_BY_NAME_PATH + attributeName, attribute);
      return null;
    } catch (error) {
      if (!error?.response) {
        return "No Server Response";
      } else if (error.response?.status === HttpStatusCode.BadRequest) {
        return error.response?.data?.errorMessage;
      } else {
        return "Unknown error";
      }
    }
  };

  const deleteAttribute = async (attributeName) => {
    try {
      await axios.delete(HANDLE_ATTRIBUTE_BY_NAME_PATH + attributeName);
      return null;
    } catch (error) {
      if (!error?.response) {
        return "No Server Response";
      } else if (error.response?.status === HttpStatusCode.BadRequest) {
        return error.response?.data?.errorMessage;
      } else {
        return "Unknown error";
      }
    }
  };

  return {
    getSessionById,
    getSessionsIds,
    deleteSessionById,
    getUsersWithActiveSessions,
    getAllAttributes,
    createUpdateAttribute,
    deleteAttribute,
  };
};
