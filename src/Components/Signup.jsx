import React, { useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import styles from "./Signup.module.css"; 

const Signup = () => {
  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = event.target.elements;

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username: username.value,
        email: email.value,
        password: password.value,
      });
      window.alert('User registered successfully');
      console.log('User registered successfully:', response.data);
      // Clear form fields after successful registration
      event.target.reset();
    } catch (error) {
      window.alert('Error signing up');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className={styles.SignupBody}>
      <div className={styles.wrapper}>
        <div className={`${styles["form-wrapper"]} ${styles["sign-up"]}`}>
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className={styles["input-group"]}>
              {/* <label>Username:</label> */}
              <input type="text" name="username" placeholder="Username" />
            </div>
            <div className={styles["input-group"]}>
              {/* <label>Email:</label> */}
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className={styles["input-group"]}>
              {/* <label>Password:</label> */}
              <input type="password" name="password" placeholder="Password" />
            </div>
            <button type="submit" className={styles.btn}>Sign Up</button>
            <p className={styles["sign-link"]}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
