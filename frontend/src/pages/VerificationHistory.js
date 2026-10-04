import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaCertificate,
  FaUniversity,
  FaSyncAlt,
  FaInfoCircle
} from "react-icons/fa";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://blockchain-credential-verification-murt.onrender.com";

function VerificationHistory() {
  const [credentials, setCredentials] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     FETCH CREDENTIALS
     ===================================================== */

  const fetchCredentials = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError(
          "You are not logged in. Please login again."
        );
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/api/credentials`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Your session has expired. Please login again."
          );
        }

        throw new Error(
          data.message ||
          "Failed to load verification history."
        );
      }

      const credentialData =
        Array.isArray(data)
          ? data
          : Array.isArray(data.credentials)
          ? data.credentials
          : Array.isArray(data.data)
          ? data.data
          : [];

      setCredentials(credentialData);

    } catch (err) {
      console.error(
        "Verification History Error:",
        err
      );

      setError(
        err.message ||
        "Unable to load verification history."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  /* =====================================================
     DATE FORMAT
     ===================================================== */

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    const formatted = new Date(date);

    if (Number.isNaN(formatted.getTime())) {
      return "Not available";
    }

    return formatted.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  /* =====================================================
     FILTER
     ===================================================== */

  const filteredCredentials = useMemo(() => {
    return credentials.filter((credential) => {

      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        String(
          credential.credentialId || ""
        )
          .toLowerCase()
          .includes(searchText) ||

        String(
          credential.studentName || ""
        )
          .toLowerCase()
          .includes(searchText) ||

        String(
          credential.rollNumber || ""
        )
          .toLowerCase()
          .includes(searchText) ||

        String(
          credential.degree || ""
        )
          .toLowerCase()
          .includes(searchText) ||

        String(
          credential.department || ""
        )
          .toLowerCase()
          .includes(searchText) ||

        String(
          credential.institution || ""
        )
          .toLowerCase()
          .includes(searchText);

      let matchesStatus = true;

      if (statusFilter === "Verified") {
        matchesStatus =
          credential.status === "Valid" &&
          credential.blockchainStatus === "Confirmed";
      }

      if (statusFilter === "Pending") {
        matchesStatus =
          credential.blockchainStatus === "Pending";
      }

      if (statusFilter === "Revoked") {
        matchesStatus =
          credential.status === "Revoked";
      }

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    credentials,
    search,
    statusFilter
  ]);

  /* =====================================================
     STATISTICS
     ===================================================== */

  const verifiedCount =
    credentials.filter(
      (credential) =>
        credential.status === "Valid" &&
        credential.blockchainStatus === "Confirmed"
    ).length;

  const pendingCount =
    credentials.filter(
      (credential) =>
        credential.blockchainStatus === "Pending"
    ).length;

  const revokedCount =
    credentials.filter(
      (credential) =>
        credential.status === "Revoked"
    ).length;

  /* =====================================================
     STATUS HELPERS
     ===================================================== */

  const getCredentialStatus = (credential) => {

    if (
      credential.status === "Revoked"
    ) {
      return {
        label: "Revoked",
        className:
          "verification-status verification-status-danger",
        icon: <FaTimesCircle />
      };
    }

    if (
      credential.status === "Valid" &&
      credential.blockchainStatus === "Confirmed"
    ) {
      return {
        label: "Verified",
        className:
          "verification-status verification-status-success",
        icon: <FaCheckCircle />
      };
    }

    return {
      label: "Pending",
      className:
        "verification-status verification-status-pending",
      icon: <FaClock />
    };
  };

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <div className="verification-history-page">

      {/* =================================================
          NAVBAR
          ================================================= */}

      <nav className="verification-history-navbar">

        <div className="verification-history-navbar-inner">

          <Link
            to="/dashboard"
            className="verification-history-brand"
          >

            <div className="verification-history-brand-icon">
              <FaShieldAlt />
            </div>

            <div>

              <div className="verification-history-brand-title">
                BCV
              </div>

              <div className="verification-history-brand-subtitle">
                Blockchain Credential Verification
              </div>

            </div>

          </Link>

          <Link
            to="/dashboard"
            className="verification-history-back"
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

      <main className="verification-history-main">

        {/* =================================================
            HEADER
            ================================================= */}

        <section className="verification-history-header">

          <div>

            <div className="verification-history-eyebrow">

              <FaShieldAlt />

              Verification Monitoring

            </div>

            <h1>
              Verification History
            </h1>

            <p>
              Monitor the verification status of academic
              credentials issued through the BCV platform.
            </p>

          </div>

          <Link
            to="/verify"
            className="verification-history-verify-button"
          >

            <FaSearch />

            Verify Credential

          </Link>

        </section>


        {/* =================================================
            STATISTICS
            ================================================= */}

        <section className="verification-history-stats">

          {/* VERIFIED */}

          <div className="verification-history-stat-card">

            <div>

              <span className="verification-history-stat-label">
                Verified
              </span>

              <strong className="verification-history-stat-number verified">
                {loading
                  ? "—"
                  : verifiedCount}
              </strong>

              <span className="verification-history-stat-description">
                Valid blockchain-confirmed credentials
              </span>

            </div>

            <div className="verification-history-stat-icon green">
              <FaCheckCircle />
            </div>

          </div>


          {/* PENDING */}

          <div className="verification-history-stat-card">

            <div>

              <span className="verification-history-stat-label">
                Pending
              </span>

              <strong className="verification-history-stat-number pending">
                {loading
                  ? "—"
                  : pendingCount}
              </strong>

              <span className="verification-history-stat-description">
                Awaiting blockchain confirmation
              </span>

            </div>

            <div className="verification-history-stat-icon amber">
              <FaClock />
            </div>

          </div>


          {/* REVOKED */}

          <div className="verification-history-stat-card">

            <div>

              <span className="verification-history-stat-label">
                Revoked
              </span>

              <strong className="verification-history-stat-number revoked">
                {loading
                  ? "—"
                  : revokedCount}
              </strong>

              <span className="verification-history-stat-description">
                Credentials marked as revoked
              </span>

            </div>

            <div className="verification-history-stat-icon red">
              <FaTimesCircle />
            </div>

          </div>

        </section>


        {/* =================================================
            SEARCH / FILTER
            ================================================= */}

        <section className="verification-history-filter-card">

          <div className="verification-history-filter-header">

            <div>

              <h2>
                Credential Verification Records
              </h2>

              <p>
                Search credentials and review their current
                verification status.
              </p>

            </div>

            <span className="verification-history-record-count">
              {loading
                ? "Loading..."
                : `${filteredCredentials.length} records`}
            </span>

          </div>


          <div className="verification-history-filters">

            <div className="verification-history-search">

              <FaSearch />

              <input
                type="text"
                placeholder="Search credential ID, student name, roll number, degree or institution..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="verification-history-select"
            >

              <option value="All">
                All Status
              </option>

              <option value="Verified">
                Verified
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Revoked">
                Revoked
              </option>

            </select>

          </div>

        </section>


        {/* =================================================
            ERROR
            ================================================= */}

        {!loading && error && (

          <section className="verification-history-message error">

            <div className="verification-history-message-icon">
              <FaTimesCircle />
            </div>

            <div>

              <h3>
                Unable to Load History
              </h3>

              <p>
                {error}
              </p>

            </div>

            <button
              type="button"
              className="verification-history-retry"
              onClick={fetchCredentials}
            >

              <FaSyncAlt />

              Retry

            </button>

          </section>

        )}


        {/* =================================================
            LOADING
            ================================================= */}

        {loading && (

          <section className="verification-history-loading">

            <div className="verification-history-spinner"></div>

            <h3>
              Loading verification history...
            </h3>

            <p>
              Retrieving credential records securely.
            </p>

          </section>

        )}


        {/* =================================================
            EMPTY
            ================================================= */}

        {!loading &&
          !error &&
          filteredCredentials.length === 0 && (

            <section className="verification-history-empty">

              <div className="verification-history-empty-icon">
                <FaSearch />
              </div>

              <h3>
                No Verification Records Found
              </h3>

              <p>
                Try changing your search term or status filter.
              </p>

              <Link
                to="/verify"
                className="verification-history-empty-button"
              >

                <FaSearch />

                Verify a Credential

              </Link>

            </section>

          )}


        {/* =================================================
            TABLE
            ================================================= */}

        {!loading &&
          !error &&
          filteredCredentials.length > 0 && (

            <section className="verification-history-table-card">

              <div className="verification-history-table-wrapper">

                <table className="verification-history-table">

                  <thead>

                    <tr>

                      <th>
                        Credential
                      </th>

                      <th>
                        Student
                      </th>

                      <th>
                        Institution
                      </th>

                      <th>
                        Issue Date
                      </th>

                      <th>
                        Verification
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

                    {filteredCredentials.map(
                      (credential) => {

                        const credentialStatus =
                          getCredentialStatus(
                            credential
                          );

                        return (

                          <tr
                            key={
                              credential._id ||
                              credential.credentialId
                            }
                          >

                            {/* CREDENTIAL */}

                            <td>

                              <div className="verification-history-credential">

                                <div className="verification-history-credential-icon">
                                  <FaCertificate />
                                </div>

                                <div>

                                  <strong>
                                    {credential.credentialId}
                                  </strong>

                                  <span>
                                    Academic Credential
                                  </span>

                                </div>

                              </div>

                            </td>


                            {/* STUDENT */}

                            <td>

                              <div className="verification-history-student">

                                <strong>
                                  {credential.studentName ||
                                    "Unknown Student"}
                                </strong>

                                <span>
                                  {credential.rollNumber ||
                                    "N/A"}
                                </span>

                              </div>

                            </td>


                            {/* INSTITUTION */}

                            <td>

                              <div className="verification-history-institution">

                                <FaUniversity />

                                <span>
                                  {credential.institution ||
                                    "Not available"}
                                </span>

                              </div>

                            </td>


                            {/* DATE */}

                            <td>

                              <span className="verification-history-date">
                                {formatDate(
                                  credential.issueDate
                                )}
                              </span>

                            </td>


                            {/* VERIFICATION STATUS */}

                            <td>

                              <span
                                className={
                                  credentialStatus.className
                                }
                              >

                                {credentialStatus.icon}

                                {credentialStatus.label}

                              </span>

                            </td>


                            {/* BLOCKCHAIN */}

                            <td>

                              {credential.blockchainStatus ===
                              "Confirmed" ? (

                                <span className="verification-history-blockchain confirmed">

                                  <FaCheckCircle />

                                  Confirmed

                                </span>

                              ) : (

                                <span className="verification-history-blockchain pending">

                                  <FaClock />

                                  {credential.blockchainStatus ||
                                    "Pending"}

                                </span>

                              )}

                            </td>


                            {/* ACTION */}

                            <td>

                              <Link
                                to={`/verify?credentialId=${encodeURIComponent(
                                  credential.credentialId
                                )}`}
                                className="verification-history-action"
                              >

                                <span>
                                  Verify
                                </span>

                                <FaExternalLinkAlt />

                              </Link>

                            </td>

                          </tr>

                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>


              {/* TABLE FOOTER */}

              <div className="verification-history-footer">

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
                  Live verification available for each credential
                </span>

              </div>

            </section>

          )}


        {/* =================================================
            INFORMATION
            ================================================= */}

        {!loading &&
          !error &&
          credentials.length > 0 && (

            <section className="verification-history-info">

              <div className="verification-history-info-icon">
                <FaInfoCircle />
              </div>

              <div>

                <h3>
                  How verification works
                </h3>

                <p>
                  Select <strong>Verify</strong> for any
                  credential to perform a live integrity check.
                  The system retrieves the credential, recalculates
                  its SHA-256 hash, and compares the stored and
                  blockchain records.
                </p>

              </div>

            </section>

          )}

      </main>

    </div>
  );
}

export default VerificationHistory;