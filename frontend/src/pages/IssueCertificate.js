import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaUserGraduate,
  FaGraduationCap,
  FaCalendarAlt,
  FaFileUpload,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaQrcode,
  FaCopy
} from "react-icons/fa";

function IssueCertificate() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    email: "",
    degree: "",
    department: "",
    graduationYear: "",
    credentialType: "",
    issueDate: ""
  });

  const [certificateFile, setCertificateFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [issuedCredential, setIssuedCredential] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        setMessage({
          type: "error",
          text: "Please upload a PDF file only."
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: "error",
          text: "File size must not exceed 5 MB."
        });
        return;
      }

      setCertificateFile(file);
      setMessage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);
    setIssuedCredential(null);

    try {
      const credentialId = `BCV-${new Date().getFullYear()}-${Date.now()
        .toString()
        .slice(-6)}`;

      const certificateHash = `${credentialId}-${formData.studentId}-${Date.now()}`;

      const credentialData = {
        credentialId,
        studentName: formData.studentName,
        rollNumber: formData.studentId,
        degree: formData.degree,
        department: formData.department,
        institution: "University",
        issueDate: formData.issueDate,
        certificateHash
      };

      const response = await fetch(
  `${process.env.REACT_APP_API_URL}/api/credentials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentialData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to issue credential");
      }

      setIssuedCredential({
        credentialId: data.credential?.credentialId || credentialId,
        studentName: data.credential?.studentName || formData.studentName
      });

      setMessage({
        type: "success",
        text: "Credential issued successfully! Your credential is ready for verification."
      });

      setFormData({
        studentName: "",
        studentId: "",
        email: "",
        degree: "",
        department: "",
        graduationYear: "",
        credentialType: "",
        issueDate: ""
      });

      setCertificateFile(null);
    } catch (error) {
      console.error("Credential issuing error:", error);

      setMessage({
        type: "error",
        text:
          error.message ||
          "Something went wrong while issuing the credential."
      });
    } finally {
      setLoading(false);
    }
  };

  const copyCredentialId = async () => {
    if (!issuedCredential) return;

    try {
      await navigator.clipboard.writeText(
        issuedCredential.credentialId
      );

      setMessage({
        type: "success",
        text: "Credential ID copied to clipboard!"
      });
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  // =====================================================
  // QR CODE VERIFICATION URL
  // Replace 192.168.1.5 with your Mac's actual Wi-Fi IP
  // =====================================================
  const verificationUrl = issuedCredential
    ? `http://10.232.198.231:3000/verify?credentialId=${encodeURIComponent(
        issuedCredential.credentialId
      )}`
    : "";

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* NAVBAR */}
      <nav className="bg-white border-bottom" style={{ height: "70px" }}>
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
              <div style={{ fontWeight: "800", color: "#0f172a" }}>
                BCV
              </div>

              <small style={{ color: "#64748b" }}>
                University Administration
              </small>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="text-decoration-none"
            style={{ color: "#64748b", fontSize: "14px" }}
          >
            ← Dashboard
          </Link>
        </div>
      </nav>

      <main className="container py-4">
        {/* PAGE HEADER */}
        <div className="mb-4">
          <Link
            to="/dashboard"
            className="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none"
            style={{ color: "#64748b", fontSize: "14px" }}
          >
            <FaArrowLeft size={12} />
            Back to Dashboard
          </Link>

          <h2
            style={{
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "6px"
            }}
          >
            Issue Academic Credential
          </h2>

          <p style={{ color: "#64748b", marginBottom: 0 }}>
            Create and issue a tamper-evident academic credential.
          </p>
        </div>

        {/* SUCCESS / ERROR MESSAGE */}
        {message && (
          <div
            className={`alert ${
              message.type === "success"
                ? "alert-success"
                : "alert-danger"
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        {/* QR CODE */}
        {issuedCredential && (
          <div
            className="bg-white p-4 p-md-5 mb-4 text-center"
            style={{
              border: "1px solid #bbf7d0",
              borderRadius: "16px",
              boxShadow: "0 8px 25px rgba(22, 163, 74, 0.08)"
            }}
          >
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: "52px",
                height: "52px",
                background: "#dcfce7",
                color: "#16a34a",
                borderRadius: "50%"
              }}
            >
              <FaQrcode size={25} />
            </div>

            <h4 style={{ fontWeight: "800", color: "#166534" }}>
              Credential Issued Successfully
            </h4>

            <p style={{ color: "#64748b", marginBottom: "20px" }}>
              Scan this QR code to open the credential verification page.
            </p>

            {/* QR CODE IMAGE */}
            <div
              className="d-inline-block p-3 mb-4"
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  verificationUrl
                )}`}
                alt="Credential Verification QR Code"
                width="200"
                height="200"
              />
            </div>

            {/* CREDENTIAL ID */}
            <div
              className="mx-auto p-3 mb-3"
              style={{
                maxWidth: "500px",
                background: "#f8fafc",
                borderRadius: "10px"
              }}
            >
              <small
                className="d-block mb-1"
                style={{ color: "#64748b" }}
              >
                Credential ID
              </small>

              <div
                className="d-flex align-items-center justify-content-center gap-2 flex-wrap"
                style={{
                  fontWeight: "800",
                  color: "#0f172a"
                }}
              >
                {issuedCredential.credentialId}

                <button
                  type="button"
                  onClick={copyCredentialId}
                  className="btn btn-sm"
                  title="Copy Credential ID"
                  style={{
                    border: "1px solid #cbd5e1",
                    color: "#475569"
                  }}
                >
                  <FaCopy />
                </button>
              </div>
            </div>

            <small style={{ color: "#94a3b8" }}>
              Scan the QR code to open the credential verification page.
            </small>
          </div>
        )}

        {/* PROCESS INDICATOR */}
        <div
          className="bg-white p-4 mb-4"
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "12px"
          }}
        >
          <div className="row text-center">
            <div className="col-4">
              <div
                className="mx-auto mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "38px",
                  height: "38px",
                  background: "#2563eb",
                  color: "white",
                  borderRadius: "50%",
                  fontWeight: "700"
                }}
              >
                1
              </div>
              <small style={{ color: "#2563eb", fontWeight: "600" }}>
                Credential Details
              </small>
            </div>

            <div className="col-4">
              <div
                className="mx-auto mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "38px",
                  height: "38px",
                  background: "#e2e8f0",
                  color: "#64748b",
                  borderRadius: "50%",
                  fontWeight: "700"
                }}
              >
                2
              </div>
              <small style={{ color: "#94a3b8" }}>Document</small>
            </div>

            <div className="col-4">
              <div
                className="mx-auto mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "38px",
                  height: "38px",
                  background: "#e2e8f0",
                  color: "#64748b",
                  borderRadius: "50%",
                  fontWeight: "700"
                }}
              >
                3
              </div>
              <small style={{ color: "#94a3b8" }}>
                Blockchain Record
              </small>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* LEFT COLUMN */}
            <div className="col-lg-8">

              {/* STUDENT INFORMATION */}
              <div
                className="bg-white p-4 mb-4"
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px"
                }}
              >
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "#dbeafe",
                      color: "#2563eb",
                      borderRadius: "10px"
                    }}
                  >
                    <FaUserGraduate />
                  </div>

                  <div>
                    <h5 style={{ fontWeight: "700", marginBottom: "3px" }}>
                      Student Information
                    </h5>
                    <small style={{ color: "#64748b" }}>
                      Enter the student's academic identity details.
                    </small>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Student Name
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Student ID
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. STU001"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      University Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="student@university.edu"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ACADEMIC INFORMATION */}
              <div
                className="bg-white p-4 mb-4"
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px"
                }}
              >
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "#dcfce7",
                      color: "#16a34a",
                      borderRadius: "10px"
                    }}
                  >
                    <FaGraduationCap />
                  </div>

                  <div>
                    <h5 style={{ fontWeight: "700", marginBottom: "3px" }}>
                      Academic Information
                    </h5>
                    <small style={{ color: "#64748b" }}>
                      Specify the academic qualification being issued.
                    </small>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Degree</label>
                    <select
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select degree</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="B.Com">B.Com</option>
                      <option value="M.Tech">M.Tech</option>
                      <option value="M.Sc">M.Sc</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select department</option>
                      <option value="Computer Science">
                        Computer Science
                      </option>
                      <option value="Information Technology">
                        Information Technology
                      </option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Graduation Year
                    </label>
                    <select
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select year</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Credential Type
                    </label>
                    <select
                      name="credentialType"
                      value={formData.credentialType}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select credential type</option>
                      <option value="Degree Certificate">
                        Degree Certificate
                      </option>
                      <option value="Provisional Certificate">
                        Provisional Certificate
                      </option>
                      <option value="Course Certificate">
                        Course Certificate
                      </option>
                      <option value="Academic Transcript">
                        Academic Transcript
                      </option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Issue Date
                    </label>

                    <div className="position-relative">
                      <FaCalendarAlt
                        style={{
                          position: "absolute",
                          left: "14px",
                          top: "13px",
                          color: "#94a3b8"
                        }}
                      />

                      <input
                        type="date"
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={handleChange}
                        className="form-control"
                        style={{ paddingLeft: "40px" }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* DOCUMENT UPLOAD */}
              <div
                className="bg-white p-4"
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px"
                }}
              >
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "#fef3c7",
                      color: "#d97706",
                      borderRadius: "10px"
                    }}
                  >
                    <FaFileUpload />
                  </div>

                  <div>
                    <h5 style={{ fontWeight: "700", marginBottom: "3px" }}>
                      Certificate Document
                    </h5>
                    <small style={{ color: "#64748b" }}>
                      Upload the official certificate document.
                    </small>
                  </div>
                </div>

                <label
                  htmlFor="certificate"
                  className="w-100 text-center p-4"
                  style={{
                    border: "2px dashed #cbd5e1",
                    borderRadius: "10px",
                    cursor: "pointer",
                    background: "#f8fafc"
                  }}
                >
                  <FaFileUpload
                    size={28}
                    style={{
                      color: "#64748b",
                      marginBottom: "10px"
                    }}
                  />

                  <div style={{ fontWeight: "600", color: "#334155" }}>
                    Click to upload certificate
                  </div>

                  <small style={{ color: "#94a3b8" }}>
                    PDF files only · Maximum size 5 MB
                  </small>

                  <input
                    id="certificate"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>

                {certificateFile && (
                  <div
                    className="mt-3 p-3 d-flex align-items-center gap-3"
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      borderRadius: "8px"
                    }}
                  >
                    <FaCheckCircle style={{ color: "#16a34a" }} />

                    <div>
                      <div style={{ fontWeight: "600", color: "#166534" }}>
                        {certificateFile.name}
                      </div>

                      <small style={{ color: "#64748b" }}>
                        Document selected successfully
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-lg-4">
              {/* SECURITY INFORMATION */}
              <div
                className="bg-white p-4 mb-4"
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px"
                }}
              >
                <h5 style={{ fontWeight: "700", marginBottom: "15px" }}>
                  Credential Security
                </h5>

                <div className="mb-3">
                  <div
                    className="d-flex align-items-center gap-2 mb-1"
                    style={{ fontWeight: "600" }}
                  >
                    <FaCheckCircle style={{ color: "#16a34a" }} />
                    SHA-256 Hash
                  </div>

                  <small style={{ color: "#64748b" }}>
                    A cryptographic fingerprint protects credential integrity.
                  </small>
                </div>

                <div className="mb-3">
                  <div
                    className="d-flex align-items-center gap-2 mb-1"
                    style={{ fontWeight: "600" }}
                  >
                    <FaCheckCircle style={{ color: "#16a34a" }} />
                    QR Verification
                  </div>

                  <small style={{ color: "#64748b" }}>
                    A QR code provides quick access to the verification record.
                  </small>
                </div>

                <div>
                  <div
                    className="d-flex align-items-center gap-2 mb-1"
                    style={{ fontWeight: "600" }}
                  >
                    <FaCheckCircle style={{ color: "#16a34a" }} />
                    Blockchain Record
                  </div>

                  <small style={{ color: "#64748b" }}>
                    Credential metadata is ready for blockchain recording.
                  </small>
                </div>
              </div>

              {/* BEFORE ISSUING */}
              <div
                className="bg-white p-4 mb-4"
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px"
                }}
              >
                <h5 style={{ fontWeight: "700", marginBottom: "15px" }}>
                  Before Issuing
                </h5>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    lineHeight: "1.7"
                  }}
                >
                  Please verify that all student and academic information is
                  accurate before issuing the credential.
                </p>
              </div>

              {/* ISSUE BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="btn w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                style={{
                  background: loading ? "#93c5fd" : "#2563eb",
                  color: "white",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                {loading ? "Issuing Credential..." : "Issue Credential"}
                <FaArrowRight size={13} />
              </button>

              <small
                className="d-block text-center mt-3"
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.5"
                }}
              >
                Credential information will be securely recorded in the
                verification system.
              </small>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default IssueCertificate;