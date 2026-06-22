import React, { useState } from "react";
import { config } from "../config";

export function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const isValid = onLogin(password);
    setError(isValid ? "" : "Password is incorrect.");
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <img src={config.logoPath} alt="Merida Island logo" />
        <p className="section-eyebrow">Admin Access</p>
        <h1>Merida Island</h1>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" type="submit">
          Sign In
        </button>
        <a href="/">Return to store</a>
      </form>
    </main>
  );
}
