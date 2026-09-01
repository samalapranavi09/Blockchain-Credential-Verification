import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaShieldAlt,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaQrcode,
  FaUniversity,
  FaGraduationCap,
  FaCalendarAlt,
  FaFingerprint
} from "react-icons/fa";

function Verify() {
  const [searchParams] = useSearchParams();

  const [credentialId, setCredentialId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function that verifies the credential using the backend API
  const verifyCredential = async (idToVerify) => {
    const id = idToVerify.trim().toUpperCase();

    if (!id) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `http://10.232.198.231:5001/api/credentials/${encodeURIComponent(id)}`
      );

      const data = await response.json();

      if (response.ok && data.verified) {
        setResult({
          found: true,
          data: data.credential
        });
      } else {
        setResult({
          found: false,
          message: data.message || "Credential not found"
        });
      }
    } catch (error) {
      console.error("Verification error:", error);

      setResult({
        found: false,
        message:
          "Unable to connect to the verification server. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  // Runs when the Verify button is clicked
  const handleVerify = (e) => {
    e.preventDefault();
    verifyCredential(credentialId);
  };

  // Automatically verify when credentialId is available in the QR URL
  useEffect(() => {
    const idFromQR = searchParams.get("credentialId");

    if (idFromQR) {
      setCredentialId(idFromQR);
      verifyCredential(idFromQR);
    }
  }, [searchParams]);

  // Reset the verification page
  const handleReset = () => {
    setCredentialId("");
    setResult(null);
    setLoading(false);
  };

  // Format the issue date nicely
  const formatDate = (date) => {
    if (!date) return "Not available";

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return date;
    }

    return formattedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc"
      }}
    >
      {/* NAVBAR */}
      <nav className="bg-white border-bottom" style={{ height: "70px" }}>
        <div className="container d-flex align-items-center justify-content-between h-100">
          <Link
            to="/"
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
              <div style={{ fontWeight: "800", color: "#0f172a" }}>
                BCV
              </div>

              <small style={{ color: "#64748b" }}>
                Blockchain Credential Verification
              </small>
            </div>
          </Link>

          <div className="d-flex gap-4 align-items-center">
            <Link
              to="/"
              className="text-decoration-none"
              style={{ color: "#475569", fontSize: "14px" }}
            >
              Home
            </Link>

            <Link
              to="/login"
              className="text-decoration-none"
              style={{ color: "#475569", fontSize: "14px" }}
            >
              University Login
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="container py-5">
        {/* HEADER */}
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-3"
            style={{
              width: "58px",
              height: "58px",
              background: "#dbeafe",
              color: "#2563eb",
              borderRadius: "15px"
            }}
          >
            <FaShieldAlt size={25} />
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "12px"
            }}
          >
            Verify Academic Credential
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "#64748b",
              fontSize: "17px",
              lineHeight: "1.7"
            }}
          >
            Verify the authenticity of an academic certificate using its unique
            credential ID.
          </p>
        </div>

        {/* SEARCH CARD */}
        <div
          className="bg-white mx-auto p-4 p-md-5"
          style={{
            maxWidth: "850px",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)"
          }}
        >
          <form onSubmit={handleVerify}>
            <label
              className="form-label"
              style={{ fontWeight: "700", color: "#0f172a" }}
            >
              Credential ID
            </label>

            <div className="row g-3">
              <div className="col-md-9">
                <div className="position-relative">
                  <FaSearch
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "15px",
                      color: "#94a3b8"
                    }}
                  />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter credential ID e.g. BCV-2026-123456"
                    value={credentialId}
                    onChange={(e) => setCredentialId(e.target.value)}
                    style={{
                      height: "50px",
                      paddingLeft: "44px",
                      borderRadius: "8px"
                    }}
                    required
                  />
                </div>
              </div>

              <div className="col-md-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100"
                  style={{
                    height: "50px",
                    background: loading ? "#93c5fd" : "#2563eb",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer"
                  }}
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-3" style={{ fontSize: "13px", color: "#94a3b8" }}>
            Enter the Credential ID generated when the certificate was issued.
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div
            className="mx-auto mt-4 text-center p-4"
            style={{
              maxWidth: "850px",
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "12px",
              color: "#1d4ed8"
            }}
          >
            Checking credential records...
          </div>
        )}

        {/* VALID RESULT */}
        {result && result.found && (
          <div className="mx-auto mt-4" style={{ maxWidth: "850px" }}>
            {/* SUCCESS HEADER */}
            <div
              className="p-4 p-md-5"
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "16px 16px 0 0"
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <FaCheckCircle size={32} style={{ color: "#16a34a" }} />

                <div>
                  <h4
                    style={{
                      color: "#166534",
                      fontWeight: "800",
                      marginBottom: "4px"
                    }}
                  >
                    Credential Verified Successfully
                  </h4>

                  <div style={{ color: "#15803d", fontSize: "14px" }}>
                    This credential exists and is valid in the verification
                    system.
                  </div>
                </div>
              </div>
            </div>

            {/* CREDENTIAL DETAILS */}
            <div
              className="bg-white p-4 p-md-5"
              style={{
                border: "1px solid #e2e8f0",
                borderTop: "none"
              }}
            >
              <h5
                style={{
                  fontWeight: "800",
                  color: "#0f172a",
                  marginBottom: "25px"
                }}
              >
                Credential Information
              </h5>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex gap-3">
                    <FaGraduationCap
                      style={{ color: "#2563eb", marginTop: "4px" }}
                    />
                    <div>
                      <small style={{ color: "#94a3b8" }}>Student Name</small>
                      <div style={{ fontWeight: "700", color: "#0f172a" }}>
                        {result.data.studentName}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex gap-3">
                    <FaFingerprint
                      style={{ color: "#2563eb", marginTop: "4px" }}
                    />
                    <div>
                      <small style={{ color: "#94a3b8" }}>Student ID</small>
                      <div style={{ fontWeight: "700", color: "#0f172a" }}>
                        {result.data.rollNumber}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex gap-3">
                    <FaGraduationCap
                      style={{ color: "#2563eb", marginTop: "4px" }}
                    />
                    <div>
                      <small style={{ color: "#94a3b8" }}>Degree</small>
                      <div style={{ fontWeight: "700", color: "#0f172a" }}>
                        {result.data.degree}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex gap-3">
                    <FaUniversity
                      style={{ color: "#2563eb", marginTop: "4px" }}
                    />
                    <div>
                      <small style={{ color: "#94a3b8" }}>Department</small>
                      <div style={{ fontWeight: "700", color: "#0f172a" }}>
                        {result.data.department}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex gap-3">
                    <FaUniversity
                      style={{ color: "#2563eb", marginTop: "4px" }}
                    />
                    <div>
                      <small style={{ color: "#94a3b8" }}>
                        Issuing Institution
                      </small>
                      <div style={{ fontWeight: "700", color: "#0f172a" }}>
                        {result.data.institution}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex gap-3">
                    <FaCalendarAlt
                      style={{ color: "#2563eb", marginTop: "4px" }}
                    />
                    <div>
                      <small style={{ color: "#94a3b8" }}>Issue Date</small>
                      <div style={{ fontWeight: "700", color: "#0f172a" }}>
                        {formatDate(result.data.issueDate)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VERIFICATION RECORD */}
              <hr className="my-4" />

              <h6
                style={{
                  fontWeight: "800",
                  color: "#0f172a",
                  marginBottom: "15px"
                }}
              >
                Verification Record
              </h6>

              <div
                className="p-3 mb-3"
                style={{ background: "#f8fafc", borderRadius: "8px" }}
              >
                <div className="d-flex justify-content-between flex-wrap gap-2">
                  <span style={{ color: "#64748b" }}>Credential ID</span>
                  <strong>{result.data.credentialId}</strong>
                </div>
              </div>

              <div
                className="p-3 mb-3"
                style={{ background: "#f8fafc", borderRadius: "8px" }}
              >
                <div className="d-flex justify-content-between flex-wrap gap-2">
                  <span style={{ color: "#64748b" }}>Certificate Hash</span>
                  <strong style={{ fontSize: "12px", wordBreak: "break-all" }}>
                    {result.data.certificateHash || "Not available"}
                  </strong>
                </div>
              </div>

              <div
                className="p-3"
                style={{ background: "#f8fafc", borderRadius: "8px" }}
              >
                <div className="d-flex justify-content-between flex-wrap gap-2">
                  <span style={{ color: "#64748b" }}>Blockchain Status</span>
                  <strong
                    style={{
                      color:
                        result.data.blockchainStatus === "Confirmed"
                          ? "#16a34a"
                          : "#d97706"
                    }}
                  >
                    {result.data.blockchainStatus || "Pending"}
                  </strong>
                </div>
              </div>
            </div>

            {/* RESET BUTTON */}
            <div
              className="bg-white p-4 text-center"
              style={{
                border: "1px solid #e2e8f0",
                borderTop: "none",
                borderRadius: "0 0 16px 16px"
              }}
            >
              <button
                type="button"
                onClick={handleReset}
                className="btn"
                style={{
                  border: "1px solid #cbd5e1",
                  color: "#475569",
                  borderRadius: "8px"
                }}
              >
                Verify Another Credential
              </button>
            </div>
          </div>
        )}

        {/* INVALID RESULT */}
        {result && !result.found && (
          <div
            className="mx-auto mt-4 p-4 p-md-5 text-center"
            style={{
              maxWidth: "850px",
              background: "#fff",
              border: "1px solid #fecaca",
              borderRadius: "16px"
            }}
          >
            <FaTimesCircle
              size={40}
              style={{ color: "#dc2626", marginBottom: "15px" }}
            />

            <h4 style={{ fontWeight: "800", color: "#991b1b" }}>
              Credential Not Found
            </h4>

            <p
              style={{
                color: "#64748b",
                maxWidth: "550px",
                margin: "10px auto 20px"
              }}
            >
              {result.message ||
                "No credential matching this ID was found in the verification system."}
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="btn"
              style={{
                background: "#2563eb",
                color: "white",
                borderRadius: "8px"
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* QR INFORMATION */}
        {!result && !loading && (
          <div className="mx-auto mt-5" style={{ maxWidth: "850px" }}>
            <div
              className="bg-white p-4 p-md-5 text-center"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "16px"
              }}
            >
              <FaQrcode
                size={35}
                style={{ color: "#2563eb", marginBottom: "15px" }}
              />

              <h5 style={{ fontWeight: "800", color: "#0f172a" }}>
                Verify Using QR Code
              </h5>

              <p
                style={{
                  color: "#64748b",
                  maxWidth: "550px",
                  margin: "8px auto 0",
                  lineHeight: "1.6"
                }}
              >
                Scan the QR code on an issued credential to automatically open
                and verify its credential record.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Verify;