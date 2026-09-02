import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCertificate,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaArrowRight,
  FaShieldAlt,
  FaLink,
  FaExclamationCircle
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    totalCredentials: 0,
    validCredentials: 0,
    revokedCredentials: 0,
    confirmedOnBlockchain: 0,
    pendingBlockchain: 0
  });

  const [recentCredentials, setRecentCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch real dashboard data from MongoDB through backend API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://127.0.0.1:5001/api/credentials/stats"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch dashboard data"
        );
      }

      setStats(data.stats);
      setRecentCredentials(data.recentCredentials || []);
    } catch (error) {
      console.error("Dashboard error:", error);
      setError(
        "Unable to load dashboard data. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Format MongoDB date
  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

      {/* Top Navbar */}
      <nav
        className="bg-white border-bottom"
        style={{ height: "70px" }}
      >
        <div className="container-fluid px-4 h-100 d-flex align-items-center justify-content-between">

          <Link
            to="/dashboard"
            className="d-flex align-items-center gap-2 text-decoration-none"
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                background: "#2563eb",
                borderRadius: "9px",
                color: "white"
              }}
            >
              <FaShieldAlt />
            </div>

            <div>
              <div
                style={{
                  fontWeight: "800",
                  color: "#0f172a"
                }}
              >
                BCV
              </div>

              <small style={{ color: "#64748b" }}>
                Administration
              </small>
            </div>
          </Link>

          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-sm-block">
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                University Admin
              </div>

              <small style={{ color: "#64748b" }}>
                Administrator
              </small>
            </div>

            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                background: "#dbeafe",
                color: "#2563eb",
                borderRadius: "50%",
                fontWeight: "700"
              }}
            >
              A
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="container-fluid px-4 py-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2
              style={{
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "6px"
              }}
            >
              Dashboard
            </h2>

            <p
              style={{
                color: "#64748b",
                marginBottom: 0
              }}
            >
              Monitor and manage academic credentials.
            </p>
          </div>

          <Link
            to="/issue"
            className="btn px-4 py-2 d-flex align-items-center gap-2"
            style={{
              background: "#2563eb",
              color: "white",
              borderRadius: "8px",
              fontWeight: "600"
            }}
          >
            <FaPlus size={13} />
            Issue Credential
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="alert d-flex align-items-center gap-2"
            style={{
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
              borderRadius: "10px"
            }}
          >
            <FaExclamationCircle />
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="row g-4 mb-4">

          {/* Total Credentials */}
          <div className="col-md-6 col-xl-3">
            <div
              className="bg-white p-4 h-100"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <small style={{ color: "#64748b" }}>
                    Total Credentials
                  </small>

                  <h3
                    style={{
                      fontWeight: "800",
                      marginTop: "8px"
                    }}
                  >
                    {loading ? "..." : stats.totalCredentials}
                  </h3>
                </div>

                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#dbeafe",
                    color: "#2563eb",
                    borderRadius: "10px"
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <FaCertificate />
                </div>
              </div>
            </div>
          </div>

          {/* Valid Credentials */}
          <div className="col-md-6 col-xl-3">
            <div
              className="bg-white p-4 h-100"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <small style={{ color: "#64748b" }}>
                    Valid Credentials
                  </small>

                  <h3
                    style={{
                      fontWeight: "800",
                      marginTop: "8px"
                    }}
                  >
                    {loading ? "..." : stats.validCredentials}
                  </h3>
                </div>

                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#dcfce7",
                    color: "#16a34a",
                    borderRadius: "10px"
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <FaCheckCircle />
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Confirmed */}
          <div className="col-md-6 col-xl-3">
            <div
              className="bg-white p-4 h-100"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <small style={{ color: "#64748b" }}>
                    Blockchain Confirmed
                  </small>

                  <h3
                    style={{
                      fontWeight: "800",
                      marginTop: "8px"
                    }}
                  >
                    {loading ? "..." : stats.confirmedOnBlockchain}
                  </h3>
                </div>

                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#f3e8ff",
                    color: "#9333ea",
                    borderRadius: "10px"
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <FaLink />
                </div>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="col-md-6 col-xl-3">
            <div
              className="bg-white p-4 h-100"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <small style={{ color: "#64748b" }}>
                    Blockchain Pending
                  </small>

                  <h3
                    style={{
                      fontWeight: "800",
                      marginTop: "8px"
                    }}
                  >
                    {loading ? "..." : stats.pendingBlockchain}
                  </h3>
                </div>

                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#fef3c7",
                    color: "#d97706",
                    borderRadius: "10px"
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <FaClock />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Activity */}
        <div className="row g-4">

          <div className="col-lg-8">
            <div
              className="bg-white p-4"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <h5
                    style={{
                      fontWeight: "700",
                      marginBottom: "5px"
                    }}
                  >
                    Recent Credential Activity
                  </h5>

                  <small style={{ color: "#64748b" }}>
                    Latest credentials issued in the system
                  </small>
                </div>

                <Link
                  to="/history"
                  style={{
                    color: "#2563eb",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  View all
                </Link>
              </div>

              {/* Loading */}
              {loading && (
                <div
                  className="text-center py-4"
                  style={{ color: "#64748b" }}
                >
                  Loading recent credentials...
                </div>
              )}

              {/* No Credentials */}
              {!loading && recentCredentials.length === 0 && (
                <div
                  className="text-center py-4"
                  style={{ color: "#64748b" }}
                >
                  No credentials have been issued yet.
                </div>
              )}

              {/* Real Recent Credentials */}
              {!loading &&
                recentCredentials.map((credential, index) => (
                  <div
                    key={credential._id || credential.credentialId}
                    className={`d-flex align-items-center justify-content-between py-3 ${
                      index !== recentCredentials.length - 1
                        ? "border-bottom"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          background: "#dcfce7",
                          color: "#16a34a",
                          borderRadius: "9px"
                        }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <FaCertificate size={15} />
                      </div>

                      <div>
                        <div style={{ fontWeight: "600" }}>
                          Credential Issued
                        </div>

                        <small style={{ color: "#64748b" }}>
                          {credential.studentName} · {credential.degree}{" "}
                          {credential.department}
                        </small>

                        <div
                          style={{
                            fontSize: "12px",
                            color: "#94a3b8",
                            marginTop: "2px"
                          }}
                        >
                          {credential.credentialId}
                        </div>
                      </div>
                    </div>

                    <small
                      className="text-end"
                      style={{ color: "#64748b" }}
                    >
                      {formatDate(credential.createdAt)}
                    </small>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-lg-4">
            <div
              className="bg-white p-4"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >
              <h5
                style={{
                  fontWeight: "700",
                  marginBottom: "5px"
                }}
              >
                Quick Actions
              </h5>

              <small style={{ color: "#64748b" }}>
                Common administrative tasks
              </small>

              <div className="mt-4">

                <Link
                  to="/issue"
                  className="d-flex align-items-center justify-content-between p-3 mb-2 text-decoration-none"
                  style={{
                    background: "#eff6ff",
                    borderRadius: "9px",
                    color: "#1d4ed8"
                  }}
                >
                  <span
                    className="d-flex align-items-center gap-2"
                    style={{ fontWeight: "600" }}
                  >
                    <FaPlus />
                    Issue Credential
                  </span>

                  <FaArrowRight size={13} />
                </Link>

                <Link
                  to="/students"
                  className="d-flex align-items-center justify-content-between p-3 mb-2 text-decoration-none"
                  style={{
                    background: "#f8fafc",
                    borderRadius: "9px",
                    color: "#334155"
                  }}
                >
                  <span
                    className="d-flex align-items-center gap-2"
                    style={{ fontWeight: "600" }}
                  >
                    Manage Students
                  </span>

                  <FaArrowRight size={13} />
                </Link>

                <Link
                  to="/verify"
                  className="d-flex align-items-center justify-content-between p-3 text-decoration-none"
                  style={{
                    background: "#f8fafc",
                    borderRadius: "9px",
                    color: "#334155"
                  }}
                >
                  <span
                    className="d-flex align-items-center gap-2"
                    style={{ fontWeight: "600" }}
                  >
                    <FaCheckCircle />
                    Verify Credential
                  </span>

                  <FaArrowRight size={13} />
                </Link>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;