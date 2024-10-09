import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../../hooks/useSession";

export default function UserActiveSessions() {
  const [sessionsIds, setSessionsIds] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState("");
  const { getSessionById, getSessionsIds, deleteSessionById } = useSession();

  useEffect(() => {
    const getSessions = async () => {
      try {
        setSessionsIds(await getSessionsIds());
        const session = await getSessionById("current-session");
        setCurrentSessionId(session.id);
      } catch (error) {
        console.log(error);
      }
    };

    getSessions();
  }, [getSessionsIds, getSessionById]);

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

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-10 offset-lg-1 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <h1>All Active Sessions:</h1>
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Session Id</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessionsIds.map((sessionId) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
