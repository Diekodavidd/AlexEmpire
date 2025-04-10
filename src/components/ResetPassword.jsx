import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useParams();  // Get token from URL
  const navigate = useNavigate();

  useEffect(() => {
    // You can make a request to your backend to validate the token
    axios
      .post("/api/validate-token", { token })  // Replace with actual backend validation
      .then((response) => {
        if (response.data.status === false) {
          setError("Invalid or expired token.");
        }
      })
      .catch(() => {
        setError("Token validation failed.");
      });
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Send the new password to your backend
    axios
      .post("/api/reset-password", { token, newPassword })
      .then((response) => {
        setSuccess(true);
        setError("");
        // Redirect the user to login or another page
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch(() => setError("Failed to reset password."));
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success ? (
        <div>Password reset successfully. Redirecting...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
