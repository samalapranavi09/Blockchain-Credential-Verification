import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaUniversity,
  FaLock,
  FaBell,
  FaDatabase,
  FaSave
} from "react-icons/fa";

function Settings() {

  const [settings, setSettings] = useState({
    universityName: "ABC Institute of Technology",
    adminName: "System Administrator",
    email: "admin@abcuniversity.edu",
    notifications: true,
    verificationAlerts: true,
    blockchainNotifications: true
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc"
      }}
    >

      {/* NAVBAR */}

      <nav
        className="bg-white border-bottom"
        style={{
          height: "70px"
        }}
      >
        <div
          className="container-fluid px-4 h-100 d-flex align-items-center justify-content-between"
        >

          <Link
            to="/dashboard"
            className="d-flex align-items-center gap-2"
            style={{
              textDecoration: "none"
            }}
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
                University Administration
              </small>

            </div>

          </Link>


          <Link
            to="/dashboard"
            style={{
              color: "#64748b",
              fontSize: "14px",
              textDecoration: "none"
            }}
          >
            ← Dashboard
          </Link>

        </div>
      </nav>


      {/* MAIN CONTENT */}

      <main className="container py-5">

        {/* PAGE HEADER */}

        <div className="mb-4">

          <div
            style={{
              color: "#2563eb",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "6px"
            }}
          >
            SYSTEM CONFIGURATION
          </div>

          <h2
            style={{
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "6px"
            }}
          >
            Settings
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: 0
            }}
          >
            Manage university information, administrator preferences,
            notifications and verification settings.
          </p>

        </div>


        {/* SUCCESS MESSAGE */}

        {saved && (
          <div
            className="alert alert-success"
            style={{
              borderRadius: "10px",
              border: "1px solid #bbf7d0"
            }}
          >
            Settings saved successfully.
          </div>
        )}


        <form onSubmit={handleSave}>

          {/* UNIVERSITY INFORMATION */}

          <div
            className="bg-white p-4 p-md-5 mb-4"
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "14px"
            }}
          >

            <div className="d-flex align-items-center gap-3 mb-4">

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#dbeafe",
                  color: "#2563eb",
                  borderRadius: "10px"
                }}
              >
                <FaUniversity />
              </div>

              <div>

                <h5
                  style={{
                    fontWeight: "800",
                    marginBottom: "3px"
                  }}
                >
                  University Information
                </h5>

                <small style={{ color: "#64748b" }}>
                  Basic information used for issued credentials.
                </small>

              </div>

            </div>


            <div className="row g-4">

              <div className="col-md-6">

                <label
                  className="form-label"
                  style={{
                    fontWeight: "600"
                  }}
                >
                  University Name
                </label>

                <input
                  type="text"
                  name="universityName"
                  value={settings.universityName}
                  onChange={handleChange}
                  className="form-control"
                />

              </div>


              <div className="col-md-6">

                <label
                  className="form-label"
                  style={{
                    fontWeight: "600"
                  }}
                >
                  Administrator Name
                </label>

                <input
                  type="text"
                  name="adminName"
                  value={settings.adminName}
                  onChange={handleChange}
                  className="form-control"
                />

              </div>


              <div className="col-md-6">

                <label
                  className="form-label"
                  style={{
                    fontWeight: "600"
                  }}
                >
                  Administrator Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="form-control"
                />

              </div>

            </div>

          </div>


          {/* SECURITY */}

          <div
            className="bg-white p-4 p-md-5 mb-4"
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "14px"
            }}
          >

            <div className="d-flex align-items-center gap-3 mb-4">

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#ede9fe",
                  color: "#7c3aed",
                  borderRadius: "10px"
                }}
              >
                <FaLock />
              </div>

              <div>

                <h5
                  style={{
                    fontWeight: "800",
                    marginBottom: "3px"
                  }}
                >
                  Security
                </h5>

                <small style={{ color: "#64748b" }}>
                  Security controls for the university administrator.
                </small>

              </div>

            </div>


            <div
              className="p-3"
              style={{
                background: "#f8fafc",
                borderRadius: "10px"
              }}
            >

              <div
                className="d-flex justify-content-between align-items-center"
              >

                <div>

                  <div
                    style={{
                      fontWeight: "700",
                      color: "#0f172a"
                    }}
                  >
                    Administrator Password
                  </div>

                  <small style={{ color: "#64748b" }}>
                    Change the password used to access the admin panel.
                  </small>

                </div>


                <button
                  type="button"
                  className="btn btn-outline-primary"
                  style={{
                    borderRadius: "8px"
                  }}
                >
                  Change Password
                </button>

              </div>

            </div>

          </div>


          {/* NOTIFICATIONS */}

          <div
            className="bg-white p-4 p-md-5 mb-4"
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "14px"
            }}
          >

            <div className="d-flex align-items-center gap-3 mb-4">

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#fef3c7",
                  color: "#d97706",
                  borderRadius: "10px"
                }}
              >
                <FaBell />
              </div>

              <div>

                <h5
                  style={{
                    fontWeight: "800",
                    marginBottom: "3px"
                  }}
                >
                  Notifications
                </h5>

                <small style={{ color: "#64748b" }}>
                  Choose which system notifications you want to receive.
                </small>

              </div>

            </div>


            {/* SYSTEM NOTIFICATIONS */}

            <div className="form-check form-switch mb-4">

              <input
                className="form-check-input"
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                id="notifications"
              />

              <label
                className="form-check-label"
                htmlFor="notifications"
              >

                <strong>
                  System Notifications
                </strong>

                <div>
                  <small style={{ color: "#64748b" }}>
                    Receive important system notifications.
                  </small>
                </div>

              </label>

            </div>


            {/* VERIFICATION ALERTS */}

            <div className="form-check form-switch mb-4">

              <input
                className="form-check-input"
                type="checkbox"
                name="verificationAlerts"
                checked={settings.verificationAlerts}
                onChange={handleChange}
                id="verificationAlerts"
              />

              <label
                className="form-check-label"
                htmlFor="verificationAlerts"
              >

                <strong>
                  Verification Alerts
                </strong>

                <div>
                  <small style={{ color: "#64748b" }}>
                    Receive alerts when credentials are verified.
                  </small>
                </div>

              </label>

            </div>


            {/* BLOCKCHAIN NOTIFICATIONS */}

            <div className="form-check form-switch">

              <input
                className="form-check-input"
                type="checkbox"
                name="blockchainNotifications"
                checked={settings.blockchainNotifications}
                onChange={handleChange}
                id="blockchainNotifications"
              />

              <label
                className="form-check-label"
                htmlFor="blockchainNotifications"
              >

                <strong>
                  Blockchain Notifications
                </strong>

                <div>
                  <small style={{ color: "#64748b" }}>
                    Receive updates about blockchain transactions.
                  </small>
                </div>

              </label>

            </div>

          </div>


          {/* BLOCKCHAIN CONFIGURATION */}

          <div
            className="bg-white p-4 p-md-5 mb-4"
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "14px"
            }}
          >

            <div className="d-flex align-items-center gap-3 mb-4">

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#dcfce7",
                  color: "#16a34a",
                  borderRadius: "10px"
                }}
              >
                <FaDatabase />
              </div>

              <div>

                <h5
                  style={{
                    fontWeight: "800",
                    marginBottom: "3px"
                  }}
                >
                  Blockchain Configuration
                </h5>

                <small style={{ color: "#64748b" }}>
                  Blockchain network information for credential records.
                </small>

              </div>

            </div>


            <div className="row g-4">

              <div className="col-md-6">

                <label
                  className="form-label"
                  style={{
                    fontWeight: "600"
                  }}
                >
                  Network
                </label>

                <input
                  type="text"
                  className="form-control"
                  value="Local Development Network"
                  disabled
                />

              </div>


              <div className="col-md-6">

                <label
                  className="form-label"
                  style={{
                    fontWeight: "600"
                  }}
                >
                  Verification Method
                </label>

                <input
                  type="text"
                  className="form-control"
                  value="SHA-256 Hash + Blockchain Record"
                  disabled
                />

              </div>

            </div>


            <div
              className="mt-4 p-3"
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "10px"
              }}
            >

              <div
                style={{
                  color: "#166534",
                  fontWeight: "700"
                }}
              >
                Blockchain Integration Status
              </div>

              <small
                style={{
                  color: "#15803d"
                }}
              >
                Configuration will be connected to the blockchain
                service during backend integration.
              </small>

            </div>

          </div>


          {/* SAVE BUTTON */}

          <div className="d-flex justify-content-end">

            <button
              type="submit"
              className="btn px-4 py-3"
              style={{
                background: "#2563eb",
                color: "white",
                borderRadius: "8px",
                fontWeight: "600"
              }}
            >

              <FaSave className="me-2" />

              Save Settings

            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default Settings;