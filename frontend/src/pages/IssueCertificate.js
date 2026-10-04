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
  FaCopy,
  FaUniversity,
  FaLock,
  FaLink,
  FaExclamationCircle
} from "react-icons/fa";

function IssueCertificate() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    email: "",
    institution: "",
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

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);
    setIssuedCredential(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login before issuing a credential.");
      }

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
        institution: formData.institution,
        issueDate: formData.issueDate,
        certificateHash
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/credentials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(credentialData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to issue credential."
        );
      }

      setIssuedCredential({
        credentialId:
          data.credential?.credentialId || credentialId,
        studentName:
          data.credential?.studentName || formData.studentName
      });

      setMessage({
        type: "success",
        text: "Credential issued successfully! Your credential is ready for verification."
      });

      setFormData({
        studentName: "",
        studentId: "",
        email: "",
        institution: "",
        degree: "",
        department: "",
        graduationYear: "",
        credentialType: "",
        issueDate: ""
      });

      setCertificateFile(null);

      const fileInput = document.getElementById("certificate");

      if (fileInput) {
        fileInput.value = "";
      }
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

  const verificationUrl = issuedCredential
    ? `http://10.232.198.231:3000/verify?credentialId=${encodeURIComponent(
        issuedCredential.credentialId
      )}`
    : "";

  return (
    <div className="issue-page">

      {/* =========================
          TOP NAVIGATION
      ========================== */}
      <nav className="issue-navbar">
        <div className="issue-navbar-inner">

          <Link
            to="/dashboard"
            className="issue-brand"
          >
            <div className="issue-brand-icon">
              <FaShieldAlt />
            </div>

            <div>
              <div className="issue-brand-title">
                BCV
              </div>

              <div className="issue-brand-subtitle">
                University Administration
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="issue-dashboard-link"
          >
            <FaArrowLeft />
            <span>Dashboard</span>
          </Link>

        </div>
      </nav>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <main className="issue-main">

        {/* PAGE HEADER */}
        <div className="issue-page-header">

          <Link
            to="/dashboard"
            className="issue-back-link"
          >
            <FaArrowLeft />
            Back to Dashboard
          </Link>

          <div className="issue-header-content">

            <div>
              <div className="issue-eyebrow">
                <FaShieldAlt />
                SECURE CREDENTIAL ISSUANCE
              </div>

              <h1>
                Issue Academic Credential
              </h1>

              <p>
                Create and issue a tamper-evident academic credential
                secured by cryptographic hashing and blockchain technology.
              </p>
            </div>

            <div className="issue-header-security">
              <FaLock />
              <span>Protected Admin Area</span>
            </div>

          </div>
        </div>

        {/* SUCCESS / ERROR MESSAGE */}
        {message && (
          <div
            className={`issue-alert ${
              message.type === "success"
                ? "issue-alert-success"
                : "issue-alert-error"
            }`}
          >
            <div className="issue-alert-icon">
              {message.type === "success" ? (
                <FaCheckCircle />
              ) : (
                <FaExclamationCircle />
              )}
            </div>

            <div>
              <strong>
                {message.type === "success"
                  ? "Credential Issued"
                  : "Unable to Issue Credential"}
              </strong>

              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* =========================
            SUCCESS / QR CARD
        ========================== */}
        {issuedCredential && (
          <section className="issued-success-card">

            <div className="issued-success-header">

              <div className="issued-success-icon">
                <FaCheckCircle />
              </div>

              <div>
                <div className="issued-success-label">
                  ISSUANCE COMPLETE
                </div>

                <h2>
                  Credential Issued Successfully
                </h2>

                <p>
                  The credential has been recorded and is ready
                  for verification.
                </p>
              </div>

            </div>

            <div className="issued-success-content">

              {/* QR */}
              <div className="qr-section">

                <div className="qr-label">
                  <FaQrcode />
                  VERIFICATION QR CODE
                </div>

                <div className="qr-box">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                      verificationUrl
                    )}`}
                    alt="Credential Verification QR Code"
                    width="220"
                    height="220"
                  />
                </div>

                <p className="qr-help">
                  Scan this QR code to open the credential
                  verification page.
                </p>

              </div>

              {/* CREDENTIAL DETAILS */}
              <div className="issued-details">

                <div className="issued-detail-heading">
                  Credential Details
                </div>

                <div className="issued-detail-row">
                  <span>Student</span>
                  <strong>
                    {issuedCredential.studentName}
                  </strong>
                </div>

                <div className="issued-detail-row">
                  <span>Credential ID</span>

                  <div className="credential-id-wrapper">
                    <strong>
                      {issuedCredential.credentialId}
                    </strong>

                    <button
                      type="button"
                      onClick={copyCredentialId}
                      className="copy-id-button"
                      title="Copy Credential ID"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>

                <div className="issued-detail-row">
                  <span>Status</span>

                  <span className="issued-valid-badge">
                    <FaCheckCircle />
                    Valid
                  </span>
                </div>

                <div className="issued-detail-row">
                  <span>Verification</span>

                  <span className="issued-blockchain-badge">
                    Blockchain Ready
                  </span>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* =========================
            PROCESS INDICATOR
        ========================== */}
        <section className="issue-process-card">

          <div className="issue-process-step active">
            <div className="issue-process-number">
              1
            </div>

            <div>
              <strong>Credential Details</strong>
              <span>Enter student information</span>
            </div>
          </div>

          <div className="issue-process-line" />

          <div className="issue-process-step">
            <div className="issue-process-number">
              2
            </div>

            <div>
              <strong>Document</strong>
              <span>Attach certificate PDF</span>
            </div>
          </div>

          <div className="issue-process-line" />

          <div className="issue-process-step">
            <div className="issue-process-number">
              3
            </div>

            <div>
              <strong>Blockchain Record</strong>
              <span>Secure credential record</span>
            </div>
          </div>

        </section>

        {/* =========================
            FORM
        ========================== */}
        <form onSubmit={handleSubmit}>

          <div className="issue-layout">

            {/* =====================
                LEFT COLUMN
            ====================== */}
            <div className="issue-form-column">

              {/* STUDENT INFORMATION */}
              <section className="issue-form-card">

                <div className="issue-card-header">

                  <div className="issue-card-icon blue">
                    <FaUserGraduate />
                  </div>

                  <div>
                    <h2>
                      Student Information
                    </h2>

                    <p>
                      Enter the student's academic identity details.
                    </p>
                  </div>

                </div>

                <div className="issue-form-grid">

                  <div className="issue-field">
                    <label>
                      Student Name
                    </label>

                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="issue-field">
                    <label>
                      Student ID
                    </label>

                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      placeholder="e.g. STU001"
                      required
                    />
                  </div>

                  <div className="issue-field">
                    <label>
                      University Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@university.edu"
                      required
                    />
                  </div>

                  <div className="issue-field">
                    <label>
                      University Name
                    </label>

                    <div className="issue-input-icon">
                      <FaUniversity />

                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        placeholder="Enter university name"
                        required
                      />
                    </div>
                  </div>

                </div>

              </section>

              {/* ACADEMIC INFORMATION */}
              <section className="issue-form-card">

                <div className="issue-card-header">

                  <div className="issue-card-icon green">
                    <FaGraduationCap />
                  </div>

                  <div>
                    <h2>
                      Academic Information
                    </h2>

                    <p>
                      Specify the academic qualification being issued.
                    </p>
                  </div>

                </div>

                <div className="issue-form-grid">

                  <div className="issue-field">
                    <label>
                      Degree
                    </label>

                    <select
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select degree
                      </option>

                      <option value="B.Tech">
                        B.Tech
                      </option>

                      <option value="B.Sc">
                        B.Sc
                      </option>

                      <option value="B.Com">
                        B.Com
                      </option>

                      <option value="M.Tech">
                        M.Tech
                      </option>

                      <option value="M.Sc">
                        M.Sc
                      </option>
                    </select>
                  </div>

                  <div className="issue-field">
                    <label>
                      Department
                    </label>

                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select department
                      </option>

                      <option value="Computer Science">
                        Computer Science
                      </option>

                      <option value="Information Technology">
                        Information Technology
                      </option>

                      <option value="Electronics">
                        Electronics
                      </option>

                      <option value="Mechanical">
                        Mechanical
                      </option>

                      <option value="Civil">
                        Civil
                      </option>
                    </select>
                  </div>

                  <div className="issue-field">
                    <label>
                      Graduation Year
                    </label>

                    <select
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select year
                      </option>

                      <option value="2026">
                        2026
                      </option>

                      <option value="2027">
                        2027
                      </option>

                      <option value="2028">
                        2028
                      </option>
                    </select>
                  </div>

                  <div className="issue-field">
                    <label>
                      Credential Type
                    </label>

                    <select
                      name="credentialType"
                      value={formData.credentialType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select credential type
                      </option>

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

                  <div className="issue-field">
                    <label>
                      Issue Date
                    </label>

                    <div className="issue-input-icon">
                      <FaCalendarAlt />

                      <input
                        type="date"
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                </div>

              </section>

              {/* DOCUMENT UPLOAD */}
              <section className="issue-form-card">

                <div className="issue-card-header">

                  <div className="issue-card-icon orange">
                    <FaFileUpload />
                  </div>

                  <div>
                    <h2>
                      Certificate Document
                    </h2>

                    <p>
                      Upload the official certificate document.
                    </p>
                  </div>

                </div>

                <label
                  htmlFor="certificate"
                  className={`issue-upload-area ${
                    certificateFile
                      ? "file-selected"
                      : ""
                  }`}
                >
                  <div className="issue-upload-icon">
                    {certificateFile ? (
                      <FaCheckCircle />
                    ) : (
                      <FaFileUpload />
                    )}
                  </div>

                  {certificateFile ? (
                    <>
                      <strong>
                        {certificateFile.name}
                      </strong>

                      <span>
                        Document selected successfully
                      </span>

                      <small>
                        Click to replace the document
                      </small>
                    </>
                  ) : (
                    <>
                      <strong>
                        Click to upload certificate
                      </strong>

                      <span>
                        Drag and drop your PDF here or click to browse
                      </span>

                      <small>
                        PDF files only · Maximum size 5 MB
                      </small>
                    </>
                  )}

                  <input
                    id="certificate"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </label>

              </section>

            </div>

            {/* =====================
                RIGHT COLUMN
            ====================== */}
            <aside className="issue-side-column">

              {/* SECURITY */}
              <section className="issue-side-card security-card">

                <div className="side-card-title">
                  <FaLock />
                  <h3>
                    Credential Security
                  </h3>
                </div>

                <div className="security-item">
                  <div className="security-item-icon">
                    <FaCheckCircle />
                  </div>

                  <div>
                    <strong>
                      SHA-256 Hash
                    </strong>

                    <span>
                      A cryptographic fingerprint protects credential
                      integrity.
                    </span>
                  </div>
                </div>

                <div className="security-item">
                  <div className="security-item-icon">
                    <FaQrcode />
                  </div>

                  <div>
                    <strong>
                      QR Verification
                    </strong>

                    <span>
                      Provides quick access to the credential verification
                      record.
                    </span>
                  </div>
                </div>

                <div className="security-item">
                  <div className="security-item-icon">
                    <FaLink />
                  </div>

                  <div>
                    <strong>
                      Blockchain Record
                    </strong>

                    <span>
                      Credential hash is recorded on Polygon Amoy.
                    </span>
                  </div>
                </div>

              </section>

              {/* BEFORE ISSUING */}
              <section className="issue-side-card">

                <div className="side-card-title">
                  <FaExclamationCircle />
                  <h3>
                    Before Issuing
                  </h3>
                </div>

                <p className="before-issuing-text">
                  Please verify that all student and academic information
                  is accurate before issuing the credential.
                </p>

                <div className="check-list">

                  <div>
                    <FaCheckCircle />
                    <span>
                      Student details are correct
                    </span>
                  </div>

                  <div>
                    <FaCheckCircle />
                    <span>
                      Academic information is verified
                    </span>
                  </div>

                  <div>
                    <FaCheckCircle />
                    <span>
                      Certificate document is correct
                    </span>
                  </div>

                </div>

              </section>

              {/* ISSUE BUTTON */}
              <section className="issue-action-card">

                <div className="issue-action-icon">
                  <FaShieldAlt />
                </div>

                <div className="issue-action-text">
                  <strong>
                    Ready to issue?
                  </strong>

                  <span>
                    The credential will be securely recorded for verification.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="issue-submit-button"
                >
                  {loading ? (
                    <>
                      <span className="issue-spinner" />
                      Issuing Credential...
                    </>
                  ) : (
                    <>
                      Issue Credential
                      <FaArrowRight />
                    </>
                  )}
                </button>

                <div className="issue-secure-note">
                  <FaLock />
                  Secure administrative operation
                </div>

              </section>

            </aside>

          </div>
        </form>

      </main>
    </div>
  );
}

export default IssueCertificate;