import { useEffect, useState } from "react";
import { useSession } from "../../hooks/useSession";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";

export default function AllUsersActiveSessions() {
  const [usersEmails, setUsersEmails] = useState();
  const { getUsersWithActiveSessions } = useSession();
  const { session, loading } = useAuth();

  useEffect(() => {
    document.title = "All Users Active Sessions";
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setUsersEmails(await getUsersWithActiveSessions());
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [getUsersWithActiveSessions]);

  if (loading) {
    <Loading />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-10 offset-lg-1 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <h1>All Users With Active Sessions:</h1>
          {usersEmails && (
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">User email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersEmails.map((userEmail) => (
                  <tr key={userEmail}>
                    <td>{userEmail}</td>
                    <td>
                      <Link
                        to={`/user/active-sessions/${userEmail}`}
                        className="btn btn-primary mx-3"
                      >
                        view sessions
                      </Link>
                    </td>
                    {userEmail === session.email && (
                      <td>← this is the current user</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
