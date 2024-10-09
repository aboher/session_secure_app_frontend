import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "../../hooks/useSession";

export default function UserSessionInfo() {
  const { id } = useParams();
  const [sessionInfo, setSessionInfo] = useState({});
  const { getSessionById } = useSession();

  useEffect(() => {
    const getSession = async () => {
      try {
        setSessionInfo(await getSessionById(id));
      } catch (error) {
        console.log(error);
      }
    };

    getSession();
  }, [id, getSessionById]);

  useEffect(() => {
    document.title = `Session ${id}`;
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6 offset-lg-3 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <h1>Session Information:</h1>
          <b>Id:</b> {sessionInfo.id || "N/A"} <br />
          <b>CreationDate:</b>{" "}
          {sessionInfo.creationDate
            ? sessionInfo.creationDate.toLocaleString()
            : "N/A"}{" "}
          <br />
          <b>LastAccessedDate:</b>{" "}
          {sessionInfo.lastAccessedDate
            ? sessionInfo.lastAccessedDate.toLocaleString()
            : "N/A"}{" "}
          <br />
          <b>ExpirationDate:</b>{" "}
          {sessionInfo.expirationDate
            ? sessionInfo.expirationDate.toLocaleString()
            : "N/A"}{" "}
          <br />
          <b>SessionDetails:</b>
          {sessionInfo.sessionDetails ? (
            <ul>
              <li>
                <b>Remote Address:</b>{" "}
                {sessionInfo.sessionDetails.remoteAddress}
              </li>
              <li>
                <b>User Agent:</b> {sessionInfo.sessionDetails.userAgent}
              </li>
            </ul>
          ) : (
            "N/A"
          )}
        </div>
      </div>
    </div>
  );
}
