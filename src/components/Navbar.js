import React from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container py-2">

        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">

          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "42px",
              height: "42px",
              background: "#2563eb",
              borderRadius: "10px",
              color: "white"
            }}
          >
            <FaShieldAlt size={24} />
          </div>

          <div>
            <div
              style={{
                fontWeight: "800",
                fontSize: "18px",
                color: "#0f172a",
                lineHeight: "1.1"
              }}
            >
              BCV
            </div>

            <div
              style={{
                fontSize: "10px",
                color: "#64748b",
                letterSpacing: "0.5px"
              }}
            >
              BLOCKCHAIN CREDENTIALS
            </div>
          </div>

        </Link>

        {/* Mobile menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="mainNavbar">

          <ul className="navbar-nav mx-auto gap-lg-3">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#how-it-works">
                How It Works
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#features">
                Features
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/verify">
                Verify Credential
              </Link>
            </li>

          </ul>

          <Link
            to="/login"
            className="btn px-4 py-2"
            style={{
              background: "#2563eb",
              color: "white",
              borderRadius: "8px",
              fontWeight: "600"
            }}
          >
            University Login
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;