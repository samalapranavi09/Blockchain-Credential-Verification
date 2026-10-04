import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCheckCircle,
  FaUniversity,
  FaFingerprint,
  FaLink,
} from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "https://blockchain-credential-verification-murt.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Store authentication token
      localStorage.setItem("token", data.token);

      // Store logged-in user information
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* =========================
          TOP BRAND
      ========================== */}
      <div className="login-topbar">
        <div className="container">
          <Link to="/" className="login-brand">
            <div className="login-brand-icon">
              <FaShieldAlt />
            </div>

            <div>
              <div className="login-brand-title">BCV</div>
              <div className="login-brand-subtitle">
                BLOCKCHAIN CREDENTIAL VERIFICATION
              </div>
            </div>
          </Link>
        </div>
      </div>


      {/* =========================
          MAIN LOGIN SECTION
      ========================== */}
      <div className="container">
        <div className="row justify-content-center align-items-center login-main-row">

          <div className="col-xl-10 col-lg-11">

            <div className="login-container">

              {/* =========================
                  LEFT BRANDING PANEL
              ========================== */}
              <div className="login-brand-panel">

                <div className="login-brand-panel-content">

                  <div className="login-panel-badge">
                    <FaUniversity />
                    <span>UNIVERSITY ADMIN PORTAL</span>
                  </div>

                  <h1>
                    Secure Academic
                    <span> Credential Management.</span>
                  </h1>

                  <p className="login-panel-description">
                    Manage, issue and verify academic credentials through a
                    secure blockchain-powered verification platform.
                  </p>


                  {/* Security Features */}
                  <div className="login-security-list">

                    <div className="login-security-item">
                      <div className="login-security-icon">
                        <FaShieldAlt />
                      </div>

                      <div>
                        <strong>Blockchain Security</strong>
                        <span>
                          Credential records secured through Polygon blockchain
                        </span>
                      </div>
                    </div>


                    <div className="login-security-item">
                      <div className="login-security-icon">
                        <FaFingerprint />
                      </div>

                      <div>
                        <strong>SHA-256 Integrity</strong>
                        <span>
                          Detect unauthorized credential modifications
                        </span>
                      </div>
                    </div>


                    <div className="login-security-item">
                      <div className="login-security-icon">
                        <FaLink />
                      </div>

                      <div>
                        <strong>Instant Verification</strong>
                        <span>
                          Verify academic credentials using a unique ID or QR
                        </span>
                      </div>
                    </div>

                  </div>


                  {/* Trust Footer */}
                  <div className="login-panel-footer">
                    <div className="login-panel-footer-dot"></div>
                    <span>
                      Secure • Tamper-resistant • Verifiable
                    </span>
                  </div>

                </div>
              </div>


              {/* =========================
                  RIGHT LOGIN PANEL
              ========================== */}
              <div className="login-form-panel">

                <div className="login-form-wrapper">

                  {/* Login Heading */}
                  <div className="login-heading">

                    <div className="login-heading-icon">
                      <FaLock />
                    </div>

                    <div className="login-heading-text">

                      <span className="login-small-title">
                        AUTHORIZED ACCESS
                      </span>

                      <h2>Welcome back</h2>

                      <p>
                        Sign in to access your university dashboard.
                      </p>

                    </div>

                  </div>


                  {/* Login Form */}
                  <form onSubmit={handleLogin}>

                    {/* Email */}
                    <div className="login-form-group">

                      <label htmlFor="email">
                        University Email
                      </label>

                      <div className="login-input-wrapper">

                        <FaEnvelope className="login-input-icon" />

                        <input
                          id="email"
                          type="email"
                          className="login-input"
                          placeholder="admin@university.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />

                      </div>

                    </div>


                    {/* Password */}
                    <div className="login-form-group">

                      <div className="login-label-row">

                        <label htmlFor="password">
                          Password
                        </label>

                        <span className="login-forgot">
                          Forgot password?
                        </span>

                      </div>


                      <div className="login-input-wrapper">

                        <FaLock className="login-input-icon" />

                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="login-input login-password-input"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />


                        <button
                          type="button"
                          className="login-password-toggle"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>

                      </div>

                    </div>


                    {/* Remember / Secure Access */}
                    <div className="login-options">

                      <label className="login-checkbox">

                        <input type="checkbox" />

                        <span>
                          Keep me signed in
                        </span>

                      </label>

                      <span className="login-secure-label">
                        <FaShieldAlt />
                        Secure connection
                      </span>

                    </div>


                    {/* Login Button */}
                    <button
                      type="submit"
                      className="login-submit-button"
                      disabled={loading}
                    >

                      {loading ? (
                        <>
                          <span className="login-spinner"></span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <FaLock />
                          Sign In Securely
                        </>
                      )}

                    </button>

                  </form>


                  {/* Security Notice */}
                  <div className="login-security-notice">

                    <div className="login-notice-icon">
                      <FaCheckCircle />
                    </div>

                    <div>
                      <strong>Protected administrator access</strong>

                      <p>
                        Your session is authenticated using secure
                        token-based authorization.
                      </p>
                    </div>

                  </div>


                  {/* Back to Home */}
                  <Link
                    to="/"
                    className="login-back-home"
                  >
                    <FaArrowLeft />
                    Back to Credential Verification
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>


      {/* =========================
          FOOTER
      ========================== */}
      <div className="login-footer">

        <span>
          © 2026 Blockchain Credential Verification
        </span>

        <span className="login-footer-divider">
          |
        </span>

        <span>
          Secure Academic Credential Management
        </span>

      </div>

    </div>
  );
}

export default Login;