export const BACKEND_URL = "http://localhost:8080";
export const SESSION_INFO_BY_ID_PATH = "/session/info?id=";
export const ALL_ACTIVE_SESSIONS_IDS_PATH = "/session/active-sessions-ids";
export const DELETE_SESSION_BY_ID_PATH = "/session/delete-session?id=";
export const SIGNIN_PATH = "/login";
export const SIGNUP_PATH = "/users";
export const SESSION_INFO_PATH = "/auth-info";
export const SIGNOUT_PATH = "/logout";
export const REQUEST_PASSWORD_CHANGE_PATH = "/users/request-password-change";
export const PASSWORD_CHANGE_PATH = "/users/password-change?token=";
export const CONFIRM_ACCOUNT_PATH = "/users/confirm-account";
export const USERS_WITH_ACTIVE_SESSION_PATH =
  "/session/emails-of-all-active-sessions";
export const ALL_ATTRIBUTES_PATH = "/session/attributes";
export const HANDLE_ATTRIBUTE_BY_NAME_PATH = "/session/attribute?name=";
export const REQUEST_TO_DELETE_ACCOUNT_PATH = "/users/request-account-deletion";
export const DELETE_ACCOUNT_PATH = "/users/delete-account";
