import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShieldAlt, FaLock, FaEnvelope } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary login for frontend development
    if (email && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc"
      }}
    >

      {/* Top Brand */}
      <div className="container py-4">

        <Link
          to="/"
          className="d-flex align-items-center gap-2"
          style={{
            width: "fit-content"
          }}
        >

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
            <FaShieldAlt size={22} />
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

      </div>

      {/* Login Section */}
      <div className="container">

        <div
          className="row justify-content-center align-items-center"
          style={{
            minHeight: "80vh"
          }}
        >

          <div className="col-md-6 col-lg-4">

            <div
              className="bg-white p-4 p-md-5 shadow-sm"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "16px"
              }}
            >

              {/* Heading */}

              <div className="text-center mb-4">

                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "58px",
                    height: "58px",
                    background: "#dbeafe",
                    color: "#2563eb",
                    borderRadius: "14px"
                  }}
                >
                  <FaLock size={23} />
                </div>

                <h2
                  style={{
                    fontWeight: "800",
                    color: "#0f172a",
                    marginBottom: "8px"
                  }}
                >
                  University Login
                </h2>

                <p
                  style={{
                    color: "#64748b",
                    marginBottom: 0,
                    fontSize: "14px"
                  }}
                >
                  Sign in to manage academic credentials
                </p>

              </div>

              {/* Form */}

              <form onSubmit={handleLogin}>

                {/* Email */}

                <div className="mb-3">

                  <label
                    className="form-label"
                    style={{
                      fontWeight: "600",
                      fontSize: "14px"
                    }}
                  >
                    University Email
                  </label>

                  <div className="position-relative">

                    <FaEnvelope
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "15px",
                        color: "#94a3b8"
                      }}
                    />

                    <input
                      type="email"
                      className="form-control"
                      placeholder="admin@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        paddingLeft: "42px",
                        height: "48px",
                        borderRadius: "8px"
                      }}
                      required
                    />

                  </div>

                </div>

                {/* Password */}

                <div className="mb-4">

                  <div className="d-flex justify-content-between">

                    <label
                      className="form-label"
                      style={{
                        fontWeight: "600",
                        fontSize: "14px"
                      }}
                    >
                      Password
                    </label>

                    <span
                      style={{
                        fontSize: "13px",
                        color: "#2563eb",
                        cursor: "pointer"
                      }}
                    >
                      Forgot password?
                    </span>

                  </div>

                  <div className="position-relative">

                    <FaLock
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "15px",
                        color: "#94a3b8"
                      }}
                    />

                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        paddingLeft: "42px",
                        height: "48px",
                        borderRadius: "8px"
                      }}
                      required
                    />

                  </div>

                </div>

                {/* Login Button */}

                <button
                  type="submit"
                  className="btn w-100 py-3"
                  style={{
                    background: "#2563eb",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: "600"
                  }}
                >
                  Sign In
                </button>

              </form>

              {/* Security message */}

              <div
                className="mt-4 p-3"
                style={{
                  background: "#f8fafc",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#64748b",
                  textAlign: "center"
                }}
              >
                🔐 Secure access for authorized university administrators
              </div>

            </div>

            <div className="text-center mt-3">

              <Link
                to="/"
                style={{
                  color: "#64748b",
                  fontSize: "14px"
                }}
              >
                ← Back to Home
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;