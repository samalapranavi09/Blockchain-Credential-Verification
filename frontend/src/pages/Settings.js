import React, { useEffect, useState } from "react";
import {
  FaUniversity,
  FaUser,
  FaEnvelope,
  FaBell,
  FaShieldAlt,
  FaLock,
  FaSave,
  FaCheckCircle,
  FaTimes,
  FaCube,
  FaKey,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://blockchain-credential-verification-murt.onrender.com";

function Settings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    universityName: "",
    adminName: "",
    email: "",
    notifications: true,
    verificationAlerts: true,
    blockchainNotifications: true,
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordLoading, setPasswordLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ================= LOAD SETTINGS ================= */

  useEffect(() => {
    const savedSettings = localStorage.getItem("bcvSettings");
    const savedUser = localStorage.getItem("user");

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Unable to load saved settings:", error);
      }
    }

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        setSettings((prev) => ({
          ...prev,
          adminName: parsedUser.name || prev.adminName,
          email: parsedUser.email || prev.email,
        }));
      } catch (error) {
        console.error("Unable to load user:", error);
      }
    }
  }, []);

  /* ================= SETTINGS CHANGE ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ================= SAVE SETTINGS ================= */

  const handleSaveSettings = () => {
    setMessage("");
    setError("");

    try {
      localStorage.setItem(
        "bcvSettings",
        JSON.stringify(settings)
      );

      setMessage("Settings saved successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setError("Unable to save settings.");
    }
  };

  /* ================= PASSWORD INPUT ================= */

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= CHANGE PASSWORD ================= */

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!passwordData.currentPassword) {
      setError("Please enter your current password.");
      return;
    }

    if (!passwordData.newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      setError("New passwords do not match.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError(
        "Your session has expired. Please login again."
      );
      return;
    }

    try {
      setPasswordLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/change-password`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            currentPassword:
              passwordData.currentPassword,

            newPassword:
              passwordData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to change password."
        );
      }

      setMessage(
        "Password changed successfully."
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordModal(false);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setError(
        error.message ||
          "Unable to change password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  /* ================= STYLES ================= */

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f8fafc",
      padding: "32px",
      color: "#1e293b",
      fontFamily:
        "Arial, Helvetica, sans-serif",
    },

    topBar: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      marginBottom: "28px",
    },

    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 15px",
      borderRadius: "9px",
      border: "1px solid #cbd5e1",
      background: "#ffffff",
      color: "#334155",
      fontWeight: "600",
      cursor: "pointer",
    },

    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "#eff6ff",
      color: "#2563eb",
      padding: "7px 12px",
      borderRadius: "8px",
      fontSize: "12px",
      fontWeight: "700",
      letterSpacing: "0.6px",
      marginBottom: "12px",
    },

    title: {
      fontSize: "34px",
      fontWeight: "800",
      margin: "0 0 8px",
      color: "#0f172a",
    },

    subtitle: {
      fontSize: "16px",
      color: "#64748b",
      margin: 0,
      lineHeight: "1.6",
    },

    section: {
      marginBottom: "30px",
    },

    sectionHeader: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      marginBottom: "15px",
    },

    sectionIcon: {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      background: "#eff6ff",
      color: "#2563eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "21px",
      flexShrink: 0,
    },

    sectionTitle: {
      margin: "0 0 4px",
      fontSize: "21px",
      fontWeight: "750",
      color: "#0f172a",
    },

    sectionDescription: {
      margin: 0,
      color: "#64748b",
      fontSize: "14px",
    },

    card: {
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "16px",
      padding: "26px",
      boxShadow:
        "0 4px 14px rgba(15, 23, 42, 0.04)",
    },

    grid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "24px",
    },

    field: {
      marginBottom: "5px",
    },

    label: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      fontWeight: "700",
      color: "#334155",
      marginBottom: "9px",
    },

    input: {
      width: "100%",
      height: "48px",
      padding: "0 14px",
      border: "1px solid #cbd5e1",
      borderRadius: "9px",
      outline: "none",
      fontSize: "15px",
      color: "#1e293b",
      background: "#ffffff",
      boxSizing: "border-box",
    },

    notificationRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
    },

    notificationInfo: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },

    notificationIcon: {
      width: "44px",
      height: "44px",
      borderRadius: "10px",
      background: "#eff6ff",
      color: "#2563eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },

    notificationTitle: {
      margin: "0 0 5px",
      fontSize: "16px",
      fontWeight: "700",
      color: "#0f172a",
    },

    notificationText: {
      margin: 0,
      fontSize: "14px",
      color: "#64748b",
    },

    divider: {
      height: "1px",
      background: "#e2e8f0",
      margin: "22px 0",
    },

    toggle: {
      position: "relative",
      width: "52px",
      height: "28px",
      flexShrink: 0,
    },

    toggleInput: {
      opacity: 0,
      width: 0,
      height: 0,
    },

    toggleSlider: (active) => ({
      position: "absolute",
      inset: 0,
      background:
        active ? "#2563eb" : "#cbd5e1",
      borderRadius: "30px",
      cursor: "pointer",
      transition: "0.25s",
    }),

    toggleCircle: (active) => ({
      position: "absolute",
      width: "22px",
      height: "22px",
      left: active ? "27px" : "3px",
      top: "3px",
      background: "#ffffff",
      borderRadius: "50%",
      transition: "0.25s",
      boxShadow:
        "0 2px 5px rgba(0,0,0,0.2)",
    }),

    securityContent: {
      display: "flex",
      alignItems: "center",
      gap: "18px",
      flexWrap: "wrap",
    },

    securityIcon: {
      width: "52px",
      height: "52px",
      borderRadius: "12px",
      background: "#eff6ff",
      color: "#2563eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "21px",
    },

    securityText: {
      flex: 1,
      minWidth: "250px",
    },

    securityTitle: {
      margin: "0 0 5px",
      fontSize: "17px",
      color: "#0f172a",
    },

    securityDescription: {
      margin: 0,
      color: "#64748b",
      fontSize: "14px",
      lineHeight: "1.6",
    },

    secondaryButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "11px 17px",
      border: "1px solid #cbd5e1",
      borderRadius: "9px",
      background: "#ffffff",
      color: "#334155",
      fontWeight: "700",
      cursor: "pointer",
    },

    blockchainStatus: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "15px",
      flexWrap: "wrap",
      paddingBottom: "22px",
      marginBottom: "22px",
      borderBottom:
        "1px solid #e2e8f0",
    },

    activeStatus: {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      color: "#15803d",
      fontWeight: "700",
      fontSize: "14px",
    },

    activeDot: {
      width: "9px",
      height: "9px",
      borderRadius: "50%",
      background: "#16a34a",
      boxShadow:
        "0 0 0 4px #dcfce7",
    },

    networkBadge: {
      padding: "7px 12px",
      background: "#f0fdf4",
      color: "#15803d",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "700",
    },

    blockchainGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "22px",
    },

    blockchainItem: {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
    },

    blockchainLabel: {
      fontSize: "13px",
      color: "#64748b",
      fontWeight: "600",
    },

    blockchainValue: {
      fontSize: "15px",
      color: "#1e293b",
      fontWeight: "700",
    },

    contract: {
      fontFamily: "monospace",
      background: "#f8fafc",
      padding: "11px 13px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      wordBreak: "break-all",
    },

    actions: {
      display: "flex",
      justifyContent: "flex-end",
      paddingBottom: "40px",
    },

    saveButton: {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      padding: "13px 22px",
      border: "none",
      borderRadius: "9px",
      background: "#2563eb",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
    },

    alert: (type) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "15px 18px",
      borderRadius: "10px",
      marginBottom: "24px",
      fontSize: "15px",
      fontWeight: "600",
      background:
        type === "success"
          ? "#f0fdf4"
          : "#fef2f2",
      color:
        type === "success"
          ? "#15803d"
          : "#dc2626",
      border:
        type === "success"
          ? "1px solid #bbf7d0"
          : "1px solid #fecaca",
    }),

    alertText: {
      flex: 1,
    },

    alertClose: {
      border: "none",
      background: "transparent",
      color: "inherit",
      cursor: "pointer",
    },

    overlay: {
      position: "fixed",
      inset: 0,
      background:
        "rgba(15, 23, 42, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      zIndex: 9999,
    },

    modal: {
      width: "100%",
      maxWidth: "520px",
      background: "#ffffff",
      borderRadius: "18px",
      padding: "28px",
      boxShadow:
        "0 25px 70px rgba(15, 23, 42, 0.25)",
      boxSizing: "border-box",
    },

    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
      marginBottom: "25px",
    },

    modalIcon: {
      width: "45px",
      height: "45px",
      borderRadius: "11px",
      background: "#eff6ff",
      color: "#2563eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "12px",
    },

    modalTitle: {
      margin: "0 0 5px",
      color: "#0f172a",
      fontSize: "22px",
    },

    modalDescription: {
      margin: 0,
      color: "#64748b",
      fontSize: "14px",
    },

    closeButton: {
      width: "35px",
      height: "35px",
      border: "none",
      background: "#f1f5f9",
      color: "#64748b",
      borderRadius: "8px",
      cursor: "pointer",
    },

    modalActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "8px",
    },

    cancelButton: {
      padding: "11px 18px",
      borderRadius: "8px",
      fontWeight: "700",
      cursor: "pointer",
      background: "#ffffff",
      border: "1px solid #cbd5e1",
      color: "#475569",
    },

    changeButton: {
      padding: "11px 18px",
      borderRadius: "8px",
      border: "none",
      background: "#2563eb",
      color: "#ffffff",
      fontWeight: "700",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  };

  return (
    <div style={styles.page}>

      {/* ================= TOP ================= */}

      <div style={styles.topBar}>
        <button
          style={styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          <FaArrowLeft />
          Dashboard
        </button>
      </div>

      {/* ================= HEADER ================= */}

      <div style={{ marginBottom: "30px" }}>

        <div style={styles.badge}>
          <FaShieldAlt />
          SYSTEM CONFIGURATION
        </div>

        <h1 style={styles.title}>
          Settings
        </h1>

        <p style={styles.subtitle}>
          Manage your university profile, notifications,
          security and blockchain configuration.
        </p>

      </div>

      {/* ================= ALERTS ================= */}

      {message && (
        <div style={styles.alert("success")}>

          <FaCheckCircle />

          <span style={styles.alertText}>
            {message}
          </span>

          <button
            style={styles.alertClose}
            onClick={() => setMessage("")}
          >
            <FaTimes />
          </button>

        </div>
      )}

      {error && (
        <div style={styles.alert("error")}>

          <FaTimes />

          <span style={styles.alertText}>
            {error}
          </span>

          <button
            style={styles.alertClose}
            onClick={() => setError("")}
          >
            <FaTimes />
          </button>

        </div>
      )}

      {/* ================= PROFILE ================= */}

      <section style={styles.section}>

        <div style={styles.sectionHeader}>

          <div style={styles.sectionIcon}>
            <FaUniversity />
          </div>

          <div>
            <h2 style={styles.sectionTitle}>
              University Profile
            </h2>

            <p style={styles.sectionDescription}>
              Basic information about the institution
              and administrator.
            </p>
          </div>

        </div>

        <div style={styles.card}>

          <div style={styles.grid}>

            <div style={styles.field}>

              <label style={styles.label}>
                <FaUniversity />
                University Name
              </label>

              <input
                style={styles.input}
                type="text"
                name="universityName"
                value={settings.universityName}
                onChange={handleChange}
                placeholder="Enter university name"
              />

            </div>

            <div style={styles.field}>

              <label style={styles.label}>
                <FaUser />
                Administrator Name
              </label>

              <input
                style={styles.input}
                type="text"
                name="adminName"
                value={settings.adminName}
                onChange={handleChange}
                placeholder="Enter administrator name"
              />

            </div>

            <div style={styles.field}>

              <label style={styles.label}>
                <FaEnvelope />
                Administrator Email
              </label>

              <input
                style={styles.input}
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="admin@university.edu"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ================= NOTIFICATIONS ================= */}

      <section style={styles.section}>

        <div style={styles.sectionHeader}>

          <div style={styles.sectionIcon}>
            <FaBell />
          </div>

          <div>
            <h2 style={styles.sectionTitle}>
              Notifications
            </h2>

            <p style={styles.sectionDescription}>
              Control the notifications displayed by
              the system.
            </p>
          </div>

        </div>

        <div style={styles.card}>

          {/* SYSTEM NOTIFICATIONS */}

          <div style={styles.notificationRow}>

            <div style={styles.notificationInfo}>

              <div style={styles.notificationIcon}>
                <FaBell />
              </div>

              <div>

                <h3 style={styles.notificationTitle}>
                  System Notifications
                </h3>

                <p style={styles.notificationText}>
                  Receive important system and
                  account notifications.
                </p>

              </div>

            </div>

            <label style={styles.toggle}>

              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                style={styles.toggleInput}
              />

              <span
                style={styles.toggleSlider(
                  settings.notifications
                )}
              >
                <span
                  style={styles.toggleCircle(
                    settings.notifications
                  )}
                />
              </span>

            </label>

          </div>

          <div style={styles.divider}></div>

          {/* VERIFICATION ALERTS */}

          <div style={styles.notificationRow}>

            <div style={styles.notificationInfo}>

              <div style={styles.notificationIcon}>
                <FaShieldAlt />
              </div>

              <div>

                <h3 style={styles.notificationTitle}>
                  Verification Alerts
                </h3>

                <p style={styles.notificationText}>
                  Receive alerts related to credential
                  verification.
                </p>

              </div>

            </div>

            <label style={styles.toggle}>

              <input
                type="checkbox"
                name="verificationAlerts"
                checked={settings.verificationAlerts}
                onChange={handleChange}
                style={styles.toggleInput}
              />

              <span
                style={styles.toggleSlider(
                  settings.verificationAlerts
                )}
              >
                <span
                  style={styles.toggleCircle(
                    settings.verificationAlerts
                  )}
                />
              </span>

            </label>

          </div>

          <div style={styles.divider}></div>

          {/* BLOCKCHAIN NOTIFICATIONS */}

          <div style={styles.notificationRow}>

            <div style={styles.notificationInfo}>

              <div style={styles.notificationIcon}>
                <FaCube />
              </div>

              <div>

                <h3 style={styles.notificationTitle}>
                  Blockchain Notifications
                </h3>

                <p style={styles.notificationText}>
                  Receive notifications about blockchain
                  transactions.
                </p>

              </div>

            </div>

            <label style={styles.toggle}>

              <input
                type="checkbox"
                name="blockchainNotifications"
                checked={
                  settings.blockchainNotifications
                }
                onChange={handleChange}
                style={styles.toggleInput}
              />

              <span
                style={styles.toggleSlider(
                  settings.blockchainNotifications
                )}
              >
                <span
                  style={styles.toggleCircle(
                    settings.blockchainNotifications
                  )}
                />
              </span>

            </label>

          </div>

        </div>

      </section>

      {/* ================= SECURITY ================= */}

      <section style={styles.section}>

        <div style={styles.sectionHeader}>

          <div style={styles.sectionIcon}>
            <FaLock />
          </div>

          <div>

            <h2 style={styles.sectionTitle}>
              Security
            </h2>

            <p style={styles.sectionDescription}>
              Manage your account security and
              authentication settings.
            </p>

          </div>

        </div>

        <div style={styles.card}>

          <div style={styles.securityContent}>

            <div style={styles.securityIcon}>
              <FaKey />
            </div>

            <div style={styles.securityText}>

              <h3 style={styles.securityTitle}>
                Account Password
              </h3>

              <p style={styles.securityDescription}>
                Change your administrator account
                password regularly to keep your
                account secure.
              </p>

            </div>

            <button
              style={styles.secondaryButton}
              onClick={() => {
                setError("");
                setMessage("");
                setShowPasswordModal(true);
              }}
            >
              <FaLock />
              Change Password
            </button>

          </div>

        </div>

      </section>

      {/* ================= BLOCKCHAIN ================= */}

      <section style={styles.section}>

        <div style={styles.sectionHeader}>

          <div
            style={{
              ...styles.sectionIcon,
              background: "#f0fdf4",
              color: "#16a34a",
            }}
          >
            <FaCube />
          </div>

          <div>

            <h2 style={styles.sectionTitle}>
              Blockchain Configuration
            </h2>

            <p style={styles.sectionDescription}>
              Current blockchain network and credential
              verification configuration.
            </p>

          </div>

        </div>

        <div style={styles.card}>

          <div style={styles.blockchainStatus}>

            <div style={styles.activeStatus}>

              <span style={styles.activeDot}></span>

              Blockchain Integration Active

            </div>

            <span style={styles.networkBadge}>
              Polygon Amoy Testnet
            </span>

          </div>

          <div style={styles.blockchainGrid}>

            <div style={styles.blockchainItem}>

              <span style={styles.blockchainLabel}>
                Network
              </span>

              <strong style={styles.blockchainValue}>
                Polygon Amoy Testnet
              </strong>

            </div>

            <div style={styles.blockchainItem}>

              <span style={styles.blockchainLabel}>
                Chain ID
              </span>

              <strong style={styles.blockchainValue}>
                80002
              </strong>

            </div>

            <div style={styles.blockchainItem}>

              <span style={styles.blockchainLabel}>
                Smart Contract Address
              </span>

              <strong
                style={{
                  ...styles.blockchainValue,
                  ...styles.contract,
                }}
              >
                0xD2974C62B715f3871F9C7dDED1d1fE8A43F11DD8
              </strong>

            </div>

            <div style={styles.blockchainItem}>

              <span style={styles.blockchainLabel}>
                Verification Method
              </span>

              <strong style={styles.blockchainValue}>
                SHA-256 Hash + Blockchain Record
              </strong>

            </div>

          </div>

        </div>

      </section>

      {/* ================= SAVE ================= */}

      <div style={styles.actions}>

        <button
          style={styles.saveButton}
          onClick={handleSaveSettings}
        >
          <FaSave />
          Save Settings
        </button>

      </div>

      {/* ================= PASSWORD MODAL ================= */}

      {showPasswordModal && (

        <div
          style={styles.overlay}
          onClick={() =>
            setShowPasswordModal(false)
          }
        >

          <div
            style={styles.modal}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div style={styles.modalHeader}>

              <div>

                <div style={styles.modalIcon}>
                  <FaLock />
                </div>

                <h2 style={styles.modalTitle}>
                  Change Password
                </h2>

                <p style={styles.modalDescription}>
                  Update your administrator account
                  password.
                </p>

              </div>

              <button
                style={styles.closeButton}
                onClick={() =>
                  setShowPasswordModal(false)
                }
              >
                <FaTimes />
              </button>

            </div>

            <form onSubmit={handleChangePassword}>

              <div style={styles.field}>

                <label style={styles.label}>
                  <FaLock />
                  Current Password
                </label>

                <input
                  style={styles.input}
                  type="password"
                  name="currentPassword"
                  value={
                    passwordData.currentPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Enter current password"
                />

              </div>

              <div style={styles.field}>

                <label style={styles.label}>
                  <FaKey />
                  New Password
                </label>

                <input
                  style={styles.input}
                  type="password"
                  name="newPassword"
                  value={
                    passwordData.newPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Enter new password"
                />

              </div>

              <div style={styles.field}>

                <label style={styles.label}>
                  <FaKey />
                  Confirm New Password
                </label>

                <input
                  style={styles.input}
                  type="password"
                  name="confirmPassword"
                  value={
                    passwordData.confirmPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Confirm new password"
                />

              </div>

              <div style={styles.modalActions}>

                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() =>
                    setShowPasswordModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={styles.changeButton}
                  disabled={passwordLoading}
                >
                  <FaLock />

                  {passwordLoading
                    ? "Changing..."
                    : "Change Password"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Settings;