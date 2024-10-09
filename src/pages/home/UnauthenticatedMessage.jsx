export default function UnauthenticatedMessage() {
  return (
    <>
      <div className="text-center">
        <i
          className="bi bi-shield-fill-x"
          style={{ fontSize: "2rem", color: "#dc3545" }}
        ></i>
      </div>
      <p><b>You are not authenticated</b></p>
    </>
  );
}
