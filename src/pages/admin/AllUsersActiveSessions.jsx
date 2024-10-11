import { useEffect, useState } from "react";
import { useSession } from "../../hooks/useSession";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AllUsersActiveSessions() {
  const [users, setUsers] = useState();
  const { getUsersWithActiveSessions } = useSession();
  const { session } = useAuth();

  useEffect(() => {
    document.title = "All Users Active Sessions";
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setUsers(await getUsersWithActiveSessions());
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [getUsersWithActiveSessions]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-10 offset-lg-1 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <h1>All Users With Active Sessions:</h1>
          {users && (
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">User email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user}>
                    <td>{user}</td>
                    <td>
                      <Link
                        to={`/user/active-sessions/${user}`}
                        className="btn btn-primary mx-3"
                      >
                        view sessions
                      </Link>
                    </td>
                    {user === session.email && (
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
