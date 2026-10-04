import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaSearch,
  FaCertificate,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaPlus,
  FaArrowLeft,
  FaUniversity,
  FaLink,
  FaExclamationCircle,
  FaSyncAlt
} from "react-icons/fa";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://blockchain-credential-verification-murt.onrender.com";

function History() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const [credentials, setCredentials] = useState([]);

  const [stats, setStats] = useState({
    totalCredentials: 0,
    confirmedOnBlockchain: 0,
    pendingBlockchain: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     FETCH HISTORY
     ===================================================== */

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again.");
        setLoading(false);
        return;
      }

      /* =================================================
         FETCH CREDENTIALS
         ================================================= */

      const credentialsResponse = await fetch(
        `${API_URL}/api/credentials`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!credentialsResponse.ok) {
        if (credentialsResponse.status === 401) {
          throw new Error(
            "Your session has expired. Please login again."
          );
        }

        throw new Error(
          "Failed to load credentials."
        );
      }

      const credentialsData =
        await credentialsResponse.json();

      const rawCredentials =
        credentialsData.credentials ||
        credentialsData.data ||
        [];

      const credentialList =
        Array.isArray(rawCredentials)
          ? rawCredentials
          : [];

      setCredentials(credentialList);

      /* =================================================
         FETCH STATISTICS
         ================================================= */

      try {
        const statsResponse = await fetch(
          `${API_URL}/api/credentials/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (statsResponse.ok) {
          const statsData =
            await statsResponse.json();

          const backendStats =
            statsData.stats ||
            statsData.data ||
            statsData;

          setStats({
            totalCredentials:
              backendStats.totalCredentials ??
              credentialList.length,

            confirmedOnBlockchain:
              backendStats.confirmedOnBlockchain ??
              0,

            pendingBlockchain:
              backendStats.pendingBlockchain ??
              0
          });
        } else {
          setStats({
            totalCredentials: credentialList.length,
            confirmedOnBlockchain: 0,
            pendingBlockchain: 0
          });
        }
      } catch (statsError) {
        console.error(
          "Statistics Error:",
          statsError
        );

        setStats((previous) => ({
          ...previous,
          totalCredentials:
            credentialList.length
        }));
      }
    } catch (err) {
      console.error(
        "History Error:",
        err
      );

      setError(
        err.message ||
        "Unable to load certificate history."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     DATE FORMAT
     ===================================================== */

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  /* =====================================================
     STATUS CLASS
     ===================================================== */

  const getCredentialStatusClass = (value) => {
    if (
      value === "Valid" ||
      value === "Verified" ||
      value === "Confirmed"
    ) {
      return "history-status history-status-success";
    }

    if (
      value === "Pending" ||
      value === "Issued"
    ) {
      return "history-status history-status-pending";
    }

    if (value === "Revoked") {
      return "history-status history-status-danger";
    }

    return "history-status history-status-info";
  };

  /* =====================================================
     FILTER CREDENTIALS
     ===================================================== */

  const filteredCredentials =
    credentials.filter((credential) => {
      const credentialId =
        String(
          credential.credentialId || ""
        ).toLowerCase();

      const studentName =
        String(
          credential.studentName || ""
        ).toLowerCase();

      const rollNumber =
        String(
          credential.rollNumber || ""
        ).toLowerCase();

      const institution =
        String(
          credential.institution || ""
        ).toLowerCase();

      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        credentialId.includes(searchText) ||
        studentName.includes(searchText) ||
        rollNumber.includes(searchText) ||
        institution.includes(searchText);

      const credentialStatus =
        credential.status || "Valid";

      const matchesStatus =
        status === "All Status" ||
        credentialStatus === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <div className="history-page">

      {/* =================================================
          NAVBAR
          ================================================= */}

      <nav className="history-navbar">

        <div className="history-navbar-inner">

          <Link
            to="/dashboard"
            className="history-brand"
          >

            <div className="history-brand-icon">
              <FaShieldAlt />
            </div>

            <div>

              <div className="history-brand-title">
                BCV
              </div>

              <div className="history-brand-subtitle">
                University Administration
              </div>

            </div>

          </Link>

          <Link
            to="/dashboard"
            className="history-back-link"
          >
            <FaArrowLeft />
            <span>
              Back to Dashboard
            </span>
          </Link>

        </div>

      </nav>


      {/* =================================================
          MAIN
          ================================================= */}

      <main className="history-main">

        {/* =================================================
            PAGE HEADER
            ================================================= */}

        <section className="history-page-header">

          <div>

            <div className="history-eyebrow">

              <FaCertificate />

              Credential Management

            </div>

            <h1>
              Certificate History
            </h1>

            <p>
              View, search and verify previously issued
              academic credentials.
            </p>

          </div>

          {/* FIXED ROUTE */}

          <Link
            to="/issue"
            className="history-primary-button"
          >

            <FaPlus />

            Issue Credential

          </Link>

        </section>


        {/* =================================================
            ERROR
            ================================================= */}

        {error && (
          <div className="history-error">

            <FaExclamationCircle />

            <div>

              <strong>
                Unable to load history
              </strong>

              <p>
                {error}
              </p>

            </div>

            <button
              type="button"
              className="history-retry-button"
              onClick={fetchHistory}
            >

              <FaSyncAlt />

              Retry

            </button>

          </div>
        )}


        {/* =================================================
            STATISTICS
            ================================================= */}

        <section className="history-stats-grid">

          {/* TOTAL */}

          <div className="history-stat-card">

            <div className="history-stat-content">

              <span className="history-stat-label">
                Total Credentials
              </span>

              <strong className="history-stat-number">
                {loading
                  ? "—"
                  : stats.totalCredentials}
              </strong>

              <span className="history-stat-description">
                Academic credentials issued
              </span>

            </div>

            <div className="history-stat-icon blue">
              <FaCertificate />
            </div>

          </div>


          {/* CONFIRMED */}

          <div className="history-stat-card">

            <div className="history-stat-content">

              <span className="history-stat-label">
                Blockchain Confirmed
              </span>

              <strong className="history-stat-number">
                {loading
                  ? "—"
                  : stats.confirmedOnBlockchain}
              </strong>

              <span className="history-stat-description">
                Credentials recorded on-chain
              </span>

            </div>

            <div className="history-stat-icon green">
              <FaCheckCircle />
            </div>

          </div>


          {/* PENDING */}

          <div className="history-stat-card">

            <div className="history-stat-content">

              <span className="history-stat-label">
                Pending
              </span>

              <strong className="history-stat-number">
                {loading
                  ? "—"
                  : stats.pendingBlockchain}
              </strong>

              <span className="history-stat-description">
                Awaiting blockchain confirmation
              </span>

            </div>

            <div className="history-stat-icon amber">
              <FaClock />
            </div>

          </div>

        </section>


        {/* =================================================
            TABLE CARD
            ================================================= */}

        <section className="history-table-card">

          {/* TABLE HEADER */}

          <div className="history-table-header">

            <div>

              <h2>
                Issued Credentials
              </h2>

              <p>
                Search, filter and verify academic credentials.
              </p>

            </div>

            <div className="history-record-count">

              {loading
                ? "Loading..."
                : `${filteredCredentials.length} records`}

            </div>

          </div>


          {/* =================================================
              FILTERS
              ================================================= */}

          <div className="history-filters">

            <div className="history-search-wrapper">

              <FaSearch />

              <input
                type="text"
                placeholder="Search by credential ID, student name, roll number or institution..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="history-status-filter"
            >

              <option value="All Status">
                All Status
              </option>

              <option value="Valid">
                Valid
              </option>

              <option value="Revoked">
                Revoked
              </option>

            </select>

          </div>


          {/* =================================================
              TABLE
              ================================================= */}

          <div className="history-table-wrapper">

            <table className="history-table">

              <thead>

                <tr>

                  <th>
                    Credential
                  </th>

                  <th>
                    Student
                  </th>

                  <th>
                    Degree
                  </th>

                  <th>
                    Department
                  </th>

                  <th>
                    Institution
                  </th>

                  <th>
                    Issue Date
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Blockchain
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {/* =================================================
                    LOADING
                    ================================================= */}

                {loading && (
                  <tr>

                    <td
                      colSpan="9"
                      className="history-loading"
                    >

                      <div className="history-spinner"></div>

                      <strong>
                        Loading certificate history...
                      </strong>

                      <span>
                        Retrieving credentials securely.
                      </span>

                    </td>

                  </tr>
                )}


                {/* =================================================
                    DATA
                    ================================================= */}

                {!loading &&
                  filteredCredentials.map(
                    (credential) => {

                      const credentialId =
                        credential.credentialId ||
                        "N/A";

                      const studentName =
                        credential.studentName ||
                        "Unknown Student";

                      const rollNumber =
                        credential.rollNumber ||
                        "N/A";

                      const degree =
                        credential.degree ||
                        "N/A";

                      const department =
                        credential.department ||
                        "N/A";

                      const institution =
                        credential.institution ||
                        "N/A";

                      const issueDate =
                        formatDate(
                          credential.issueDate
                        );

                      const credentialStatus =
                        credential.status ||
                        "Valid";

                      const blockchainStatus =
                        credential.blockchainStatus ||
                        "Pending";

                      return (
                        <tr
                          key={credentialId}
                        >

                          {/* CREDENTIAL */}

                          <td>

                            <div className="history-credential-id">
                              {credentialId}
                            </div>

                            <div className="history-secondary-text">
                              Academic Credential
                            </div>

                          </td>


                          {/* STUDENT */}

                          <td>

                            <div className="history-student-name">
                              {studentName}
                            </div>

                            <div className="history-secondary-text">
                              {rollNumber}
                            </div>

                          </td>


                          {/* DEGREE */}

                          <td>

                            <span className="history-main-text">
                              {degree}
                            </span>

                          </td>


                          {/* DEPARTMENT */}

                          <td>

                            <span className="history-main-text">
                              {department}
                            </span>

                          </td>


                          {/* INSTITUTION */}

                          <td>

                            <div className="history-institution">

                              <FaUniversity />

                              <span>
                                {institution}
                              </span>

                            </div>

                          </td>


                          {/* DATE */}

                          <td>

                            <span className="history-main-text">
                              {issueDate}
                            </span>

                          </td>


                          {/* STATUS */}

                          <td>

                            <span
                              className={getCredentialStatusClass(
                                credentialStatus
                              )}
                            >

                              {credentialStatus}

                            </span>

                          </td>


                          {/* BLOCKCHAIN */}

                          <td>

                            <span
                              className={getCredentialStatusClass(
                                blockchainStatus
                              )}
                            >

                              <FaLink />

                              {blockchainStatus}

                            </span>

                          </td>


                          {/* ACTION */}

                          <td>

                            <Link
                              to={`/verify?credentialId=${encodeURIComponent(
                                credentialId
                              )}`}
                              className="history-view-button"
                              title="Verify Credential"
                            >

                              <FaEye />

                              <span>
                                Verify
                              </span>

                            </Link>

                          </td>

                        </tr>
                      );
                    }
                  )}


                {/* =================================================
                    EMPTY
                    ================================================= */}

                {!loading &&
                  filteredCredentials.length === 0 && (

                    <tr>

                      <td
                        colSpan="9"
                        className="history-empty"
                      >

                        <div className="history-empty-icon">
                          <FaCertificate />
                        </div>

                        <h3>
                          No credentials found
                        </h3>

                        <p>
                          Try changing your search
                          or status filter.
                        </p>

                        {credentials.length === 0 && (
                          <Link
                            to="/issue"
                            className="history-empty-button"
                          >

                            <FaPlus />

                            Issue First Credential

                          </Link>
                        )}

                      </td>

                    </tr>
                  )}

              </tbody>

            </table>

          </div>


          {/* =================================================
              TABLE FOOTER
              ================================================= */}

          {!loading &&
            filteredCredentials.length > 0 && (

              <div className="history-table-footer">

                <span>

                  Showing{" "}

                  <strong>
                    {filteredCredentials.length}
                  </strong>{" "}

                  credential
                  {filteredCredentials.length !== 1
                    ? "s"
                    : ""}

                </span>

                <span>
                  Securely managed by BCV
                </span>

              </div>

            )}

        </section>


        {/* =================================================
            SECURITY INFORMATION
            ================================================= */}

        <section className="history-security-card">

          <div className="history-security-icon">
            <FaShieldAlt />
          </div>

          <div>

            <h3>
              Blockchain-secured credential records
            </h3>

            <p>
              Credential information is stored securely
              and blockchain records provide an additional
              layer of integrity verification.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default History;