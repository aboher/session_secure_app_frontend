import useAuth from "../../hooks/useAuth";

export default function AuthenticatedMessage() {
  const { session } = useAuth();

  if (!session) {
    return null;
  }

  return (
    <>
      <div className="text-center">
        <i
          className="bi bi-shield-fill-check"
          style={{ fontSize: "2rem", color: "#198754" }}
        ></i>
      </div>
      <p>
        <b>You are authenticated</b>
        <br />
        <br />
        <b>Email:</b> {session.email || "N/A"}
        <br />
        <b>Expiration Date:</b>{" "}
        {session.expirationDate
          ? session.expirationDate.toLocaleString()
          : "N/A"}
        <br />
        <b>Roles:</b>
        <ul>
          {session.roles && session.roles.length > 0 ? (
            session.roles.map((role, index) => <li key={index}>{role}</li>)
          ) : (
            <li>No roles assigned</li>
          )}
        </ul>
      </p>
    </>
  );
}
