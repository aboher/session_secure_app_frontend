import { useState } from "react";

export function UsernameField({ setUsername, usernameRef }) {
  return (
    <div className="mb-3">
      <label htmlFor="username" className="form-label">
        Username:
      </label>
      <input
        type="text"
        id="username"
        className="form-control"
        ref={usernameRef}
        autoComplete="off"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
  );
}

export function PasswordField({ setPassword }) {
  const [showPwd, setShowPwd] = useState(false);

  const toggleShowPwd = () => {
    setShowPwd((prevShowPwd) => !prevShowPwd);
  };

  return (
    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        Password:
      </label>
      <div className="input-group">
        <input
          type={showPwd ? "text" : "password"}
          id="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          className="input-group-text rounded-end-2"
          onClick={toggleShowPwd}
        >
          {showPwd ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye"></i>
          )}
        </span>
      </div>
    </div>
  );
}
