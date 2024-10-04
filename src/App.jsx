// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeEditor from "./Components/CodeEditor";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ImageToTextConverter from "./Components/ImageToTextConverter"; // Import the component
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const darkMode = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    // Check if the user is authenticated from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and set authentication state to false
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        darkMode={darkMode}
        isDark={isDark}
      />
      <div className="body-content">
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/img2code"
            element={<ImageToTextConverter />}
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <CodeEditor isDark={isDark} />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
