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
  FaExclamationCircle,
  FaCog,
  FaUsers,
  FaSearch,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    totalCredentials: 0,
    validCredentials: 0,
    revokedCredentials: 0,
    confirmedOnBlockchain: 0,
    pendingBlockchain: 0,
  });

  const [recentCredentials, setRecentCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    "https://blockchain-credential-verification-murt.onrender.com";

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/credentials/stats`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load dashboard data"
        );
      }

      setStats(
        data.stats || {
          totalCredentials: 0,
          validCredentials: 0,
          revokedCredentials: 0,
          confirmedOnBlockchain: 0,
          pendingBlockchain: 0,
        }
      );

      setRecentCredentials(data.recentCredentials || []);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(
        err.message || "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const storedUser = localStorage.getItem("user");

  let user = {};

  try {
    user = storedUser ? JSON.parse(storedUser) : {};
  } catch {
    user = {};
  }

  const adminName = user?.name || "University Admin";

  const getInitials = (name) => {
    if (!name) return "UA";

    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const blockchainPercentage =
    stats.totalCredentials > 0
      ? Math.round(
          (stats.confirmedOnBlockchain /
            stats.totalCredentials) *
            100
        )
      : 0;

  return (
    <div className="dashboard-page">

      {/* =========================================
          TOP NAVIGATION
      ========================================= */}
      <header className="dashboard-navbar">
        <div className="dashboard-navbar-left">
          <Link to="/dashboard" className="dashboard-brand">
            <div className="dashboard-brand-icon">
              <FaShieldAlt />
            </div>

            <div>
              <div className="dashboard-brand-title">
                BCV
              </div>

              <div className="dashboard-brand-subtitle">
                Blockchain Credential Verification
              </div>
            </div>
          </Link>
        </div>

        <div className="dashboard-navbar-right">

          <div className="dashboard-admin">
            <div className="dashboard-admin-avatar">
              {getInitials(adminName)}
            </div>

            <div className="dashboard-admin-info">
              <span className="dashboard-admin-name">
                {adminName}
              </span>

              <span className="dashboard-admin-role">
                University Administrator
              </span>
            </div>
          </div>

          <button
            className="dashboard-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>
      </header>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <main className="dashboard-main">

        {/* PAGE HEADER */}
        <section className="dashboard-header">

          <div>
            <div className="dashboard-eyebrow">
              ADMINISTRATION PORTAL
            </div>

            <h1>Dashboard</h1>

            <p>
              Manage academic credentials, monitor blockchain
              records, and verify certificate integrity.
            </p>
          </div>

          <Link
            to="/issue-certificate"
            className="dashboard-primary-button"
          >
            <FaPlus />
            Issue Credential
          </Link>

        </section>


        {/* ERROR */}
        {error && (
          <div className="dashboard-error">
            <FaExclamationCircle />

            <div>
              <strong>Unable to load dashboard</strong>

              <span>{error}</span>
            </div>

            <button onClick={fetchDashboardData}>
              Retry
            </button>
          </div>
        )}


        {/* =========================================
            STATISTICS
        ========================================= */}
        <section className="dashboard-stats-grid">

          {/* TOTAL */}
          <div className="dashboard-stat-card">

            <div className="dashboard-stat-top">
              <div className="dashboard-stat-icon blue">
                <FaCertificate />
              </div>

              <span className="dashboard-stat-label">
                TOTAL CREDENTIALS
              </span>
            </div>

            <div className="dashboard-stat-number">
              {loading ? "—" : stats.totalCredentials}
            </div>

            <div className="dashboard-stat-description">
              Academic credentials issued
            </div>

          </div>


          {/* VALID */}
          <div className="dashboard-stat-card">

            <div className="dashboard-stat-top">
              <div className="dashboard-stat-icon green">
                <FaCheckCircle />
              </div>

              <span className="dashboard-stat-label">
                VALID CREDENTIALS
              </span>
            </div>

            <div className="dashboard-stat-number">
              {loading ? "—" : stats.validCredentials}
            </div>

            <div className="dashboard-stat-description">
              Currently active credentials
            </div>

          </div>


          {/* BLOCKCHAIN */}
          <div className="dashboard-stat-card">

            <div className="dashboard-stat-top">
              <div className="dashboard-stat-icon purple">
                <FaLink />
              </div>

              <span className="dashboard-stat-label">
                BLOCKCHAIN CONFIRMED
              </span>
            </div>

            <div className="dashboard-stat-number">
              {loading ? "—" : stats.confirmedOnBlockchain}
            </div>

            <div className="dashboard-stat-description">
              Records confirmed on Polygon
            </div>

          </div>


          {/* PENDING */}
          <div className="dashboard-stat-card">

            <div className="dashboard-stat-top">
              <div className="dashboard-stat-icon orange">
                <FaClock />
              </div>

              <span className="dashboard-stat-label">
                PENDING BLOCKCHAIN
              </span>
            </div>

            <div className="dashboard-stat-number">
              {loading ? "—" : stats.pendingBlockchain}
            </div>

            <div className="dashboard-stat-description">
              Awaiting blockchain confirmation
            </div>

          </div>

        </section>


        {/* =========================================
            BLOCKCHAIN STATUS
        ========================================= */}
        <section className="dashboard-blockchain-card">

          <div className="dashboard-blockchain-left">

            <div className="dashboard-blockchain-icon">
              <FaShieldAlt />
            </div>

            <div>
              <div className="dashboard-blockchain-title">
                Blockchain Security Status
              </div>

              <div className="dashboard-blockchain-text">
                Credential records are protected using
                SHA-256 hashing and Polygon blockchain
                verification.
              </div>
            </div>

          </div>


          <div className="dashboard-blockchain-right">

            <div className="dashboard-progress-wrapper">

              <div className="dashboard-progress-header">
                <span>Blockchain confirmation</span>

                <strong>
                  {blockchainPercentage}%
                </strong>
              </div>

              <div className="dashboard-progress">
                <div
                  className="dashboard-progress-bar"
                  style={{
                    width: `${blockchainPercentage}%`,
                  }}
                />
              </div>

            </div>

            <div className="dashboard-network-status">
              <span className="status-dot"></span>
              Polygon Amoy Network
            </div>

          </div>

        </section>


        {/* =========================================
            RECENT ACTIVITY + QUICK ACTIONS
        ========================================= */}
        <section className="dashboard-content-grid">

          {/* RECENT CREDENTIALS */}
          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>
                <span className="dashboard-panel-eyebrow">
                  ACTIVITY
                </span>

                <h2>Recent Credentials</h2>
              </div>

              <Link
                to="/history"
                className="dashboard-view-link"
              >
                View all
                <FaArrowRight />
              </Link>

            </div>


            <div className="dashboard-table">

              <div className="dashboard-table-header">
                <span>Credential</span>
                <span>Student</span>
                <span>Issue Date</span>
                <span>Status</span>
              </div>


              {loading ? (
                <div className="dashboard-empty">
                  Loading credentials...
                </div>
              ) : recentCredentials.length === 0 ? (
                <div className="dashboard-empty">
                  <FaCertificate />

                  <strong>
                    No credentials issued yet
                  </strong>

                  <span>
                    Start by issuing your first academic
                    credential.
                  </span>

                  <Link
                    to="/issue-certificate"
                    className="dashboard-small-button"
                  >
                    <FaPlus />
                    Issue Credential
                  </Link>
                </div>
              ) : (
                recentCredentials.map((credential) => (
                  <div
                    className="dashboard-table-row"
                    key={credential._id || credential.credentialId}
                  >

                    <div className="credential-id">
                      <div className="credential-icon">
                        <FaCertificate />
                      </div>

                      <div>
                        <strong>
                          {credential.credentialId}
                        </strong>

                        <span>
                          {credential.degree || "Academic Credential"}
                        </span>
                      </div>
                    </div>


                    <div className="credential-student">
                      {credential.studentName || "—"}
                    </div>


                    <div className="credential-date">
                      {formatDate(credential.issueDate)}
                    </div>


                    <div>
                      <span
                        className={`credential-status ${
                          credential.status === "Revoked"
                            ? "revoked"
                            : credential.blockchainStatus ===
                              "Confirmed"
                            ? "confirmed"
                            : "valid"
                        }`}
                      >
                        {credential.status === "Revoked"
                          ? "Revoked"
                          : credential.blockchainStatus ===
                            "Confirmed"
                          ? "Blockchain Confirmed"
                          : "Valid"}
                      </span>
                    </div>

                  </div>
                ))
              )}

            </div>

          </div>


          {/* QUICK ACTIONS */}
          <div className="dashboard-panel quick-actions-panel">

            <div className="dashboard-panel-header">

              <div>
                <span className="dashboard-panel-eyebrow">
                  SHORTCUTS
                </span>

                <h2>Quick Actions</h2>
              </div>

            </div>


            <div className="quick-actions">

              <Link
                to="/issue-certificate"
                className="quick-action"
              >
                <div className="quick-action-icon blue">
                  <FaPlus />
                </div>

                <div className="quick-action-text">
                  <strong>Issue Credential</strong>

                  <span>
                    Create a new academic credential
                  </span>
                </div>

                <FaArrowRight className="quick-action-arrow" />
              </Link>


              <Link
                to="/students"
                className="quick-action"
              >
                <div className="quick-action-icon green">
                  <FaUsers />
                </div>

                <div className="quick-action-text">
                  <strong>Manage Students</strong>

                  <span>
                    View and manage student records
                  </span>
                </div>

                <FaArrowRight className="quick-action-arrow" />
              </Link>


              <Link
                to="/verify"
                className="quick-action"
              >
                <div className="quick-action-icon purple">
                  <FaSearch />
                </div>

                <div className="quick-action-text">
                  <strong>Verify Credential</strong>

                  <span>
                    Check credential authenticity
                  </span>
                </div>

                <FaArrowRight className="quick-action-arrow" />
              </Link>


              <Link
                to="/history"
                className="quick-action"
              >
                <div className="quick-action-icon orange">
                  <FaHistory />
                </div>

                <div className="quick-action-text">
                  <strong>Certificate History</strong>

                  <span>
                    Review issued credentials
                  </span>
                </div>

                <FaArrowRight className="quick-action-arrow" />
              </Link>


              <Link
                to="/settings"
                className="quick-action"
              >
                <div className="quick-action-icon gray">
                  <FaCog />
                </div>

                <div className="quick-action-text">
                  <strong>Settings</strong>

                  <span>
                    Manage system configuration
                  </span>
                </div>

                <FaArrowRight className="quick-action-arrow" />
              </Link>

            </div>

          </div>

        </section>


        {/* =========================================
            SECURITY INFORMATION
        ========================================= */}
        <section className="dashboard-security-strip">

          <div className="security-strip-icon">
            <FaShieldAlt />
          </div>

          <div className="security-strip-content">
            <strong>
              Secure credential infrastructure
            </strong>

            <span>
              Your credential records are protected by
              SHA-256 integrity verification and
              blockchain-backed records on Polygon Amoy.
            </span>
          </div>

          <div className="security-strip-badge">
            <FaCheckCircle />
            System Protected
          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;