import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaQrcode,
  FaSearch,
  FaShieldAlt,
  FaCube,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaLock,
  FaUniversity,
  FaFingerprint,
  FaCalendarAlt,
  FaUserGraduate,
  FaIdCard,
  FaRedo
} from "react-icons/fa";

function Verify() {
  const [searchParams] = useSearchParams();

  const [credentialId, setCredentialId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  // =========================================================
  // PRODUCTION BACKEND
  // =========================================================

  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://blockchain-credential-verification-murt.onrender.com";

  // =========================================================
  // VERIFY CREDENTIAL
  // =========================================================

  const verifyCredential = useCallback(
    async (id) => {
      const cleanId = id.trim().toUpperCase();

      if (!cleanId) {
        return;
      }

      setCredentialId(cleanId);
      setLoading(true);
      setResult(null);

      try {
        const response = await fetch(
          `${API_URL}/api/credentials/${encodeURIComponent(cleanId)}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          setResult({
            found: false,
            message:
              data.message || "Credential could not be verified."
          });

          return;
        }

        setResult({
          found: true,
          verified: data.verified,
          integrityVerified: data.integrityVerified,
          blockchainVerified: data.blockchainVerified,
          message: data.message,
          data: data.credential,
          blockchainData: data.blockchainData
        });
      } catch (error) {
        console.error("Verification Error:", error);

        setResult({
          found: false,
          message:
            "Unable to connect to the verification server. Please try again."
        });
      } finally {
        setLoading(false);
      }
    },
    [API_URL]
  );

  // =========================================================
  // AUTOMATIC QR VERIFICATION
  // =========================================================

  useEffect(() => {
    const qrCredentialId = searchParams.get("credentialId");

    if (qrCredentialId) {
      verifyCredential(qrCredentialId);
    }
  }, [searchParams, verifyCredential]);

  // =========================================================
  // MANUAL VERIFICATION
  // =========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentialId.trim()) {
      return;
    }

    verifyCredential(credentialId);
  };

  // =========================================================
  // GENERATE QR CODE
  // =========================================================

  const regenerateQR = () => {
    const cleanId = credentialId.trim().toUpperCase();

    if (!cleanId) {
      alert("Please enter a Credential ID first.");
      return;
    }

    // IMPORTANT:
    // This is the PUBLIC RENDER FRONTEND URL.
    // Do NOT use localhost or your local IP here.
    const verificationUrl =
      `https://blockchain-credential-verification-kj2k.onrender.com/verify?credentialId=${encodeURIComponent(
        cleanId
      )}`;

    const qrUrl =
      `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
        verificationUrl
      )}`;

    window.open(qrUrl, "_blank");
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setCredentialId("");
    setResult(null);
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    } catch {
      return date;
    }
  };

  // =========================================================
  // POLYGONSCAN URL
  // =========================================================

  const getExplorerUrl = (transactionHash) => {
    if (!transactionHash) {
      return null;
    }

    return `https://amoy.polygonscan.com/tx/${transactionHash}`;
  };

  const transactionHash =
    result?.data?.transactionHash ||
    result?.blockchainData?.transactionHash;

  // =========================================================
  // SMALL REUSABLE COMPONENT
  // =========================================================

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div
      style={{
        padding: "18px 20px",
        borderBottom: "1px solid #e2e8f0",
        minWidth: 0
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#64748b",
          fontSize: "12px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.3px",
          marginBottom: "8px"
        }}
      >
        {Icon && <Icon color="#2563eb" />}
        {label}
      </div>

      <div
        style={{
          color: "#0f172a",
          fontSize: "15px",
          fontWeight: "700",
          wordBreak: "break-word"
        }}
      >
        {value || "Not available"}
      </div>
    </div>
  );

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #eef4fb 100%)",
        color: "#0f172a"
      }}
    >
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav
        style={{
          background: "#0b1f3a",
          borderBottom: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px"
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "11px",
                background: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 6px 18px rgba(37,99,235,0.3)"
              }}
            >
              <FaShieldAlt size={20} />
            </div>

            <div>
              <div
                style={{
                  fontWeight: "800",
                  fontSize: "18px"
                }}
              >
                BCV
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "#94a3b8",
                  marginTop: "1px"
                }}
              >
                Blockchain Credential Verification
              </div>
            </div>
          </Link>

          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
            style={{
              textDecoration: "none",
              color: "#cbd5e1",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <FaArrowLeft size={12} />
            {isLoggedIn ? "Back to Dashboard" : "Back to Home"}
          </Link>
        </div>
      </nav>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "45px 24px 70px"
        }}
      >
        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          style={{
            textAlign: "center",
            marginBottom: "32px"
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 14px",
              borderRadius: "30px",
              background: "#dbeafe",
              color: "#1d4ed8",
              fontSize: "12px",
              fontWeight: "800",
              letterSpacing: "0.7px",
              marginBottom: "15px"
            }}
          >
            <FaShieldAlt size={12} />
            SECURE CREDENTIAL VERIFICATION
          </div>

          <h1
            style={{
              fontSize: "38px",
              fontWeight: "800",
              letterSpacing: "-1.2px",
              margin: "0",
              color: "#0f172a"
            }}
          >
            Verify an Academic Credential
          </h1>

          <p
            style={{
              maxWidth: "680px",
              margin: "12px auto 0",
              color: "#64748b",
              fontSize: "16px",
              lineHeight: "1.7"
            }}
          >
            Confirm the authenticity, integrity, and blockchain
            record of an academic credential issued by an institution.
          </p>
        </section>

        {/* =====================================================
            SEARCH CARD
        ====================================================== */}

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "18px",
            padding: "28px",
            boxShadow:
              "0 12px 35px rgba(15,23,42,0.07)",
            marginBottom: "30px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "20px"
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "#eff6ff",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <FaSearch />
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "800"
                }}
              >
                Credential Lookup
              </h3>

              <p
                style={{
                  margin: "3px 0 0",
                  color: "#64748b",
                  fontSize: "13px"
                }}
              >
                Enter the unique Credential ID issued by the institution.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "700",
                color: "#334155",
                marginBottom: "8px"
              }}
            >
              Credential ID
            </label>

            <div
              style={{
                display: "flex",
                gap: "10px"
              }}
            >
              <div
                style={{
                  flex: 1,
                  position: "relative"
                }}
              >
                <FaSearch
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8"
                  }}
                />

                <input
                  type="text"
                  value={credentialId}
                  onChange={(e) =>
                    setCredentialId(e.target.value)
                  }
                  placeholder="Example: BCV-2026-720307"
                  style={{
                    width: "100%",
                    height: "52px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "11px",
                    padding: "0 16px 0 45px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  height: "52px",
                  padding: "0 26px",
                  border: "none",
                  borderRadius: "11px",
                  background: loading
                    ? "#94a3b8"
                    : "#2563eb",
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: loading
                    ? "not-allowed"
                    : "pointer",
                  boxShadow: loading
                    ? "none"
                    : "0 6px 15px rgba(37,99,235,0.25)"
                }}
              >
                {loading
                  ? "Verifying..."
                  : "Verify Credential"}
              </button>
            </div>
          </form>

          <div
            style={{
              marginTop: "16px",
              padding: "11px 14px",
              background: "#f8fafc",
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              gap: "9px",
              color: "#64748b",
              fontSize: "12px"
            }}
          >
            <FaLock size={11} color="#2563eb" />
            Verification checks the credential against its stored
            integrity record and blockchain record.
          </div>

          {credentialId && (
            <div
              style={{
                marginTop: "18px",
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              <button
                type="button"
                onClick={regenerateQR}
                style={{
                  border: "1px solid #bfdbfe",
                  background: "#eff6ff",
                  color: "#2563eb",
                  padding: "9px 15px",
                  borderRadius: "9px",
                  fontWeight: "700",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px"
                }}
              >
                <FaQrcode />
                Generate QR Code
              </button>
            </div>
          )}
        </section>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && (
          <section
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "18px",
              padding: "50px",
              textAlign: "center",
              boxShadow:
                "0 10px 30px rgba(15,23,42,0.05)"
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "4px solid #dbeafe",
                borderTopColor: "#2563eb",
                margin: "0 auto",
                animation: "spin 1s linear infinite"
              }}
            />

            <h4
              style={{
                marginTop: "18px",
                fontWeight: "800",
                fontSize: "18px"
              }}
            >
              Verifying Credential
            </h4>

            <p
              style={{
                color: "#64748b",
                margin: "7px 0 0",
                fontSize: "14px"
              }}
            >
              Checking MongoDB integrity and blockchain records...
            </p>
          </section>
        )}

        {/* =====================================================
            SUCCESSFUL VERIFICATION
        ====================================================== */}

        {!loading &&
          result?.found &&
          result?.verified && (
            <section
              style={{
                background: "#ffffff",
                border: "1px solid #dbe5ef",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow:
                  "0 15px 45px rgba(15,23,42,0.09)"
              }}
            >
              {/* SUCCESS HEADER */}

              <div
                style={{
                  background:
                    "linear-gradient(135deg, #0f766e 0%, #16a34a 100%)",
                  padding: "28px 32px",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: "18px"
                }}
              >
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "50%",
                    background:
                      "rgba(255,255,255,0.16)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <FaCheckCircle size={31} />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "1px",
                      opacity: 0.85
                    }}
                  >
                    AUTHENTIC CREDENTIAL
                  </div>

                  <h2
                    style={{
                      margin: "4px 0 3px",
                      fontSize: "27px",
                      fontWeight: "800"
                    }}
                  >
                    Credential Verified Successfully
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      opacity: 0.9
                    }}
                  >
                    This credential passed the integrity and
                    blockchain verification checks.
                  </p>
                </div>
              </div>

              <div style={{ padding: "30px" }}>
                {/* STATUS CARDS */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(3, minmax(0, 1fr))",
                    gap: "16px",
                    marginBottom: "28px"
                  }}
                >
                  {/* Credential Status */}

                  <div
                    style={{
                      border: "1px solid #dbe5ef",
                      borderRadius: "14px",
                      padding: "20px",
                      background: "#f8fafc"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "13px"
                      }}
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          background: "#dcfce7",
                          color: "#16a34a",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <FaCheckCircle />
                      </div>

                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#64748b"
                        }}
                      >
                        CREDENTIAL STATUS
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                        color: "#15803d"
                      }}
                    >
                      {result.data?.status || "Valid"}
                    </div>
                  </div>

                  {/* Integrity */}

                  <div
                    style={{
                      border: "1px solid #dbe5ef",
                      borderRadius: "14px",
                      padding: "20px",
                      background: "#f8fafc"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "13px"
                      }}
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          background:
                            result.integrityVerified
                              ? "#dcfce7"
                              : "#fee2e2",
                          color:
                            result.integrityVerified
                              ? "#16a34a"
                              : "#dc2626",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {result.integrityVerified ? (
                          <FaFingerprint />
                        ) : (
                          <FaTimesCircle />
                        )}
                      </div>

                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#64748b"
                        }}
                      >
                        DATA INTEGRITY
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                        color:
                          result.integrityVerified
                            ? "#15803d"
                            : "#dc2626"
                      }}
                    >
                      {result.integrityVerified
                        ? "Verified"
                        : "Failed"}
                    </div>
                  </div>

                  {/* Blockchain */}

                  <div
                    style={{
                      border: "1px solid #dbe5ef",
                      borderRadius: "14px",
                      padding: "20px",
                      background: "#f8fafc"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "13px"
                      }}
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          background:
                            result.blockchainVerified
                              ? "#dcfce7"
                              : "#fee2e2",
                          color:
                            result.blockchainVerified
                              ? "#16a34a"
                              : "#dc2626",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {result.blockchainVerified ? (
                          <FaCube />
                        ) : (
                          <FaTimesCircle />
                        )}
                      </div>

                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#64748b"
                        }}
                      >
                        BLOCKCHAIN
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                        color:
                          result.blockchainVerified
                            ? "#15803d"
                            : "#dc2626"
                      }}
                    >
                      {result.blockchainVerified
                        ? "Confirmed"
                        : "Not Confirmed"}
                    </div>
                  </div>
                </div>

                {/* =================================================
                    CREDENTIAL DETAILS
                ================================================== */}

                <div
                  style={{
                    border: "1px solid #dbe5ef",
                    borderRadius: "15px",
                    overflow: "hidden",
                    marginBottom: "22px"
                  }}
                >
                  <div
                    style={{
                      padding: "18px 20px",
                      background: "#f8fafc",
                      borderBottom:
                        "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px"
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: "#dbeafe",
                        color: "#2563eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <FaUserGraduate />
                    </div>

                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "17px",
                          fontWeight: "800"
                        }}
                      >
                        Credential Details
                      </h3>

                      <p
                        style={{
                          margin: "3px 0 0",
                          color: "#64748b",
                          fontSize: "12px"
                        }}
                      >
                        Official academic information associated
                        with this credential.
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2, minmax(0, 1fr))"
                    }}
                  >
                    <DetailItem
                      icon={FaIdCard}
                      label="Credential ID"
                      value={
                        result.data?.credentialId ||
                        credentialId
                      }
                    />

                    <DetailItem
                      icon={FaUserGraduate}
                      label="Student Name"
                      value={result.data?.studentName}
                    />

                    <DetailItem
                      icon={FaIdCard}
                      label="Roll Number"
                      value={result.data?.rollNumber}
                    />

                    <DetailItem
                      icon={FaUniversity}
                      label="Degree"
                      value={result.data?.degree}
                    />

                    <DetailItem
                      icon={FaUniversity}
                      label="Department"
                      value={result.data?.department}
                    />

                    <DetailItem
                      icon={FaUniversity}
                      label="Institution"
                      value={result.data?.institution}
                    />

                    <DetailItem
                      icon={FaCalendarAlt}
                      label="Issue Date"
                      value={formatDate(
                        result.data?.issueDate
                      )}
                    />

                    <DetailItem
                      icon={FaShieldAlt}
                      label="Blockchain Status"
                      value={
                        result.data?.blockchainStatus ||
                        "Confirmed"
                      }
                    />
                  </div>
                </div>

                {/* =================================================
                    CERTIFICATE HASH
                ================================================== */}

                <div
                  style={{
                    border: "1px solid #dbe5ef",
                    borderRadius: "14px",
                    padding: "20px",
                    marginBottom: "20px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "12px",
                      fontWeight: "800",
                      color: "#475569",
                      marginBottom: "10px"
                    }}
                  >
                    <FaFingerprint color="#2563eb" />
                    SHA-256 CERTIFICATE HASH
                  </div>

                  <div
                    style={{
                      background: "#0f172a",
                      color: "#e2e8f0",
                      borderRadius: "9px",
                      padding: "14px",
                      fontFamily: "monospace",
                      fontSize: "12px",
                      lineHeight: "1.6",
                      wordBreak: "break-all"
                    }}
                  >
                    {result.data?.certificateHash ||
                      "Not available"}
                  </div>
                </div>

                {/* =================================================
                    BLOCKCHAIN TRANSACTION
                ================================================== */}

                <div
                  style={{
                    border: "1px solid #dbe5ef",
                    borderRadius: "14px",
                    padding: "20px"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "800",
                      color: "#475569",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px"
                    }}
                  >
                    <FaCube color="#2563eb" />
                    BLOCKCHAIN TRANSACTION
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "stretch"
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        background: "#0f172a",
                        color: "#e2e8f0",
                        borderRadius: "9px",
                        padding: "13px 15px",
                        fontFamily: "monospace",
                        fontSize: "12px",
                        wordBreak: "break-all",
                        lineHeight: "1.6"
                      }}
                    >
                      {transactionHash || "Not available"}
                    </div>

                    {transactionHash && (
                      <a
                        href={getExplorerUrl(transactionHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          minWidth: "180px",
                          textDecoration: "none",
                          border: "1px solid #bfdbfe",
                          background: "#eff6ff",
                          color: "#2563eb",
                          borderRadius: "9px",
                          padding: "0 15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "7px",
                          fontSize: "12px",
                          fontWeight: "800"
                        }}
                      >
                        View on PolygonScan
                        <FaExternalLinkAlt size={10} />
                      </a>
                    )}
                  </div>
                </div>

                {/* SECURITY MESSAGE */}

                <div
                  style={{
                    marginTop: "20px",
                    padding: "13px 15px",
                    borderRadius: "9px",
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    color: "#166534",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <FaShieldAlt />

                  This verification confirms that the credential
                  matches the trusted record stored by the system
                  and the blockchain.
                </div>

                {/* ACTIONS */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "25px",
                    gap: "12px",
                    flexWrap: "wrap"
                  }}
                >
                  <button
                    type="button"
                    onClick={regenerateQR}
                    style={{
                      border: "1px solid #bfdbfe",
                      background: "#eff6ff",
                      color: "#2563eb",
                      padding: "11px 17px",
                      borderRadius: "9px",
                      fontWeight: "700",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <FaQrcode />
                    Generate QR Code
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      border: "1px solid #cbd5e1",
                      background: "#ffffff",
                      color: "#475569",
                      padding: "11px 17px",
                      borderRadius: "9px",
                      fontWeight: "700",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <FaRedo />
                    Verify Another Credential
                  </button>
                </div>
              </div>
            </section>
          )}

        {/* =====================================================
            FAILED VERIFICATION
        ====================================================== */}

        {!loading &&
          result?.found &&
          !result?.verified && (
            <section
              style={{
                background: "#ffffff",
                border: "1px solid #fecaca",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow:
                  "0 12px 35px rgba(15,23,42,0.07)"
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #991b1b, #dc2626)",
                  color: "#ffffff",
                  padding: "28px",
                  textAlign: "center"
                }}
              >
                <FaTimesCircle size={48} />

                <h2
                  style={{
                    margin: "12px 0 5px",
                    fontSize: "27px",
                    fontWeight: "800"
                  }}
                >
                  Credential Not Verified
                </h2>

                <p
                  style={{
                    margin: 0,
                    opacity: 0.9,
                    fontSize: "14px"
                  }}
                >
                  The credential did not pass all verification checks.
                </p>
              </div>

              <div style={{ padding: "30px" }}>
                <div
                  style={{
                    padding: "15px 18px",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "10px",
                    color: "#991b1b",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "22px"
                  }}
                >
                  {result.message ||
                    "Credential verification failed."}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(2, minmax(0, 1fr))",
                    gap: "15px"
                  }}
                >
                  <div
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "18px"
                    }}
                  >
                    <div
                      style={{
                        color: "#64748b",
                        fontSize: "12px",
                        fontWeight: "700",
                        marginBottom: "8px"
                      }}
                    >
                      DATA INTEGRITY
                    </div>

                    <strong
                      style={{
                        color:
                          result.integrityVerified
                            ? "#15803d"
                            : "#dc2626"
                      }}
                    >
                      {result.integrityVerified
                        ? "Verified"
                        : "Failed"}
                    </strong>
                  </div>

                  <div
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "18px"
                    }}
                  >
                    <div
                      style={{
                        color: "#64748b",
                        fontSize: "12px",
                        fontWeight: "700",
                        marginBottom: "8px"
                      }}
                    >
                      BLOCKCHAIN
                    </div>

                    <strong
                      style={{
                        color:
                          result.blockchainVerified
                            ? "#15803d"
                            : "#dc2626"
                      }}
                    >
                      {result.blockchainVerified
                        ? "Verified"
                        : "Failed"}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    marginTop: "25px"
                  }}
                >
                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      border: "none",
                      background: "#2563eb",
                      color: "#ffffff",
                      padding: "12px 22px",
                      borderRadius: "9px",
                      fontWeight: "700",
                      cursor: "pointer"
                    }}
                  >
                    Verify Another Credential
                  </button>
                </div>
              </div>
            </section>
          )}

        {/* =====================================================
            NOT FOUND
        ====================================================== */}

        {!loading && result && !result.found && (
          <section
            style={{
              background: "#ffffff",
              border: "1px solid #fecaca",
              borderRadius: "20px",
              padding: "55px 30px",
              textAlign: "center",
              boxShadow:
                "0 12px 35px rgba(15,23,42,0.07)"
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "#fee2e2",
                color: "#dc2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px"
              }}
            >
              <FaTimesCircle size={34} />
            </div>

            <h2
              style={{
                fontSize: "25px",
                fontWeight: "800",
                marginBottom: "8px"
              }}
            >
              Credential Not Found
            </h2>

            <p
              style={{
                maxWidth: "550px",
                margin: "0 auto",
                color: "#64748b",
                fontSize: "14px",
                lineHeight: "1.7"
              }}
            >
              {result.message ||
                "No credential was found with the entered Credential ID."}
            </p>

            <button
              type="button"
              onClick={handleReset}
              style={{
                marginTop: "22px",
                border: "none",
                background: "#2563eb",
                color: "#ffffff",
                padding: "11px 20px",
                borderRadius: "9px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Try Again
            </button>
          </section>
        )}

        {/* =====================================================
            INITIAL QR INFORMATION
        ====================================================== */}

        {!loading && !result && (
          <section
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "18px",
              padding: "28px",
              boxShadow:
                "0 10px 30px rgba(15,23,42,0.05)"
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "20px",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "16px",
                  background: "#eff6ff",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FaQrcode size={34} />
              </div>

              <div>
                <h3
                  style={{
                    margin: "0 0 7px",
                    fontSize: "19px",
                    fontWeight: "800"
                  }}
                >
                  Verify Using a QR Code
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "14px",
                    lineHeight: "1.7"
                  }}
                >
                  Scan the QR code associated with an issued
                  academic credential. It will open the public
                  verification page with the Credential ID
                  automatically.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer
        style={{
          borderTop: "1px solid #e2e8f0",
          background: "#ffffff",
          padding: "22px",
          textAlign: "center",
          color: "#64748b",
          fontSize: "12px"
        }}
      >
        <div
          style={{
            fontWeight: "700",
            color: "#334155",
            marginBottom: "4px"
          }}
        >
          Blockchain-Based Academic Credential Verification System
        </div>

        Secure • Tamper-Resistant • Blockchain-Verified
      </footer>

      {/* =====================================================
          SPINNER ANIMATION
      ====================================================== */}

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 768px) {
            main {
              padding-left: 15px !important;
              padding-right: 15px !important;
            }

            h1 {
              font-size: 30px !important;
            }

            form > div {
              flex-direction: column !important;
            }

            form button {
              width: 100% !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Verify;