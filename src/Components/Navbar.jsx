// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Navbar({ isAuthenticated, handleLogout, darkMode, isDark }) {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light bg-${
          isDark ? "dark" : "light"
        }`}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <h3 className={`text-${isDark ? "light" : "dark"} fs-2 fw-bold mx-4`}>
              Code Verse
            </h3>
          </Link>
          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <button className="btn btn-outline-danger me-2" onClick={handleLogout}>
                  Logout
                </button>
                <Link to="/img2code" className="btn btn-outline-success ms-2">
                  Img2Code
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-outline-secondary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item text-end"></li>
            </ul>
            <div className="nameItem">
              <div className="mx-4">
                {isDark ? (
                  <LightModeIcon onClick={darkMode} />
                ) : (
                  <DarkModeIcon onClick={darkMode} />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
