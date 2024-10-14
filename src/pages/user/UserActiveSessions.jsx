import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useSession } from "../../hooks/useSession";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";
import { Role } from "../../constants/enums";

export default function UserActiveSessions() {
  const { pathVariableEmail } = useParams();
  const email = useRef("");
  const { session, loading } = useAuth();
  const [sessionsIds, setSessionsIds] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState("");
  const { getSessionById, getSessionsIds, deleteSessionById } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const getSessions = async () => {
      try {
        setSessionsIds(
          await getSessionsIds(email.current !== session.email && email.current)
        );
        const currentSession = await getSessionById("current-session");
        setCurrentSessionId(currentSession.id);
      } catch (error) {
        console.log(error);
      }
    };
    const redirectHomeIfUserIsTryingToSeeSomeoneElsesSessionsAndHeDoesNotHaveAdminRole =
      () => {
        if (
          email.current !== session.email &&
          !session.roles.includes(Role.Admin.value)
        ) {
          navigate("/");
        }
      };

    if (!loading) {
      email.current =
        pathVariableEmail === "current-user"
          ? session.email
          : pathVariableEmail;
      redirectHomeIfUserIsTryingToSeeSomeoneElsesSessionsAndHeDoesNotHaveAdminRole();
      getSessions();
    }
  }, [
    getSessionsIds,
    getSessionById,
    loading,
    session.email,
    pathVariableEmail,
    session.roles,
    navigate,
  ]);

  useEffect(() => {
    document.title = "All Active Sessions";
  });

  const deleteSession = async (id) => {
    try {
      await deleteSessionById(id);
      setSessionsIds((prevSessions) =>
        prevSessions.filter((session) => session !== id)
      );
      if (id === currentSessionId) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-10 offset-lg-1 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <h1>All active sessions of user: {email.current}</h1>
          {sessionsIds && (
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">Session Id</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessionsIds.length !== 0 ? (
                  sessionsIds.map((sessionId) => (
                    <tr key={sessionId}>
                      <td>{sessionId}</td>
                      <td>
                        <Link
                          to={`/user/session-info/${sessionId}`}
                          className="btn btn-primary mx-3"
                        >
                          view details
                        </Link>
                        <button
                          onClick={() => deleteSession(sessionId)}
                          className="btn btn-danger"
                        >
                          delete session
                        </button>
                      </td>
                      {sessionId === currentSessionId && (
                        <td>← this is the current session</td>
                      )}
                    </tr>
                  ))
                ) : (
                  <Navigate to={"/"} />
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
