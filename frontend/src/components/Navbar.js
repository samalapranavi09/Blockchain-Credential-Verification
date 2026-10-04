import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaShieldAlt,
  FaHome,
  FaSearch,
  FaSignInAlt,
} from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bcv-navbar">
      <div className="bcv-navbar-container">

        {/* Brand */}
        <Link to="/" className="bcv-brand">
          <div className="bcv-brand-icon">
            <FaShieldAlt />
          </div>

          <div className="bcv-brand-text">
            <div className="bcv-brand-title">BCV</div>
            <div className="bcv-brand-subtitle">
              Blockchain Credential Verification
            </div>
          </div>
        </Link>


        {/* Navigation */}
        <div className="bcv-nav-links">

          <Link
            to="/"
            className={`bcv-nav-link ${
              isActive("/") ? "active" : ""
            }`}
          >
            <FaHome />
            <span>Home</span>
          </Link>


          <Link
            to="/verify"
            className={`bcv-nav-link ${
              isActive("/verify") ? "active" : ""
            }`}
          >
            <FaSearch />
            <span>Verify Credential</span>
          </Link>


          <Link
            to="/login"
            className="bcv-login-button"
          >
            <FaSignInAlt />
            <span>University Login</span>
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;