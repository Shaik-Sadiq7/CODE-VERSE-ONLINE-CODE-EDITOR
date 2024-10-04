import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css"; // Import scoped styles

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      alert(response.data.message); // Show success message
      // Redirect to the main page after successful login
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        setIsAuthenticated(true); // Set authentication state to true
        navigate("/"); // Redirect to the main page, assuming "/" is the route for App.js
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={styles.loginBody}>
      <div className={styles.wrapper}>
        <div className={`${styles["form-wrapper"]} ${styles["sign-in"]}`}>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className={styles["input-group"]}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Email:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles["input-group"]}>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.btn}>
              Login
            </button>
            <p className={styles["sign-link"]}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
