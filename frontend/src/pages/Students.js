import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaSearch,
  FaPlus,
  FaUsers,
  FaCertificate,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaEllipsisV,
  FaShieldAlt,
  FaArrowLeft,
} from "react-icons/fa";

function Students() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view student records.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/credentials`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load student records."
        );
      }

      const credentials = Array.isArray(data)
        ? data
        : data.credentials || data.data || [];

      const mappedStudents = credentials.map((credential) => ({
        id: credential.rollNumber || "N/A",

        name:
          credential.studentName ||
          "Unknown Student",

        email:
          credential.email ||
          "Not available",

        department:
          credential.department ||
          "Not specified",

        institution:
          credential.institution ||
          "Not specified",

        year: credential.issueDate
          ? new Date(credential.issueDate)
              .getFullYear()
              .toString()
          : "N/A",

        credential:
          credential.blockchainStatus === "Confirmed"
            ? "Verified"
            : credential.blockchainStatus === "Pending"
            ? "Pending"
            : credential.status === "Valid"
            ? "Issued"
            : "Not Issued",

        status:
          credential.status ||
          "Active",

        credentialId:
          credential.credentialId,

        blockchainStatus:
          credential.blockchainStatus,
      }));

      setStudents(mappedStudents);
    } catch (err) {
      console.error("Students fetch error:", err);

      setError(
        err.message ||
          "Unable to load student records."
      );
    } finally {
      setLoading(false);
    }
  };


  /* =========================================
     FILTER STUDENTS
  ========================================= */

  const filteredStudents = students.filter(
    (student) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(searchText) ||

        student.id
          .toLowerCase()
          .includes(searchText) ||

        student.email
          .toLowerCase()
          .includes(searchText) ||

        student.institution
          .toLowerCase()
          .includes(searchText);

      const matchesDepartment =
        department === "All Departments" ||
        student.department === department;

      return (
        matchesSearch &&
        matchesDepartment
      );
    }
  );


  /* =========================================
     UNIQUE STUDENTS
  ========================================= */

  const uniqueStudents =
    Array.from(
      new Map(
        students.map((student) => [
          student.id,
          student,
        ])
      ).values()
    );

  const totalStudents =
    uniqueStudents.length;


  /* =========================================
     CREDENTIAL STATISTICS
  ========================================= */

  const credentialsIssued =
    students.filter(
      (student) =>
        student.credential === "Issued" ||
        student.credential === "Verified"
    ).length;

  const verifiedCredentials =
    students.filter(
      (student) =>
        student.credential === "Verified"
    ).length;

  const pendingCredentials =
    students.filter(
      (student) =>
        student.credential === "Pending"
    ).length;


  /* =========================================
     DEPARTMENTS
  ========================================= */

  const departments = [
    ...new Set(
      students
        .map(
          (student) =>
            student.department
        )
        .filter(Boolean)
    ),
  ];


  /* =========================================
     HELPERS
  ========================================= */

  const getCredentialClass = (status) => {
    if (status === "Verified") {
      return "student-credential-badge verified";
    }

    if (status === "Issued") {
      return "student-credential-badge issued";
    }

    if (status === "Pending") {
      return "student-credential-badge pending";
    }

    return "student-credential-badge";
  };


  const getInitials = (name) => {
    if (!name) return "ST";

    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };


  return (
    <div className="students-page">

      {/* =========================================
          TOP NAVIGATION
      ========================================= */}

      <nav className="students-navbar">

        <Link
          to="/dashboard"
          className="students-brand"
        >
          <div className="students-brand-icon">
            <FaShieldAlt />
          </div>

          <div>
            <div className="students-brand-title">
              BCV
            </div>

            <div className="students-brand-subtitle">
              Blockchain Credential Verification
            </div>
          </div>
        </Link>


        <Link
          to="/dashboard"
          className="students-back-link"
        >
          <FaArrowLeft />
          Dashboard
        </Link>

      </nav>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="students-main">

        {/* PAGE HEADER */}

        <section className="students-page-header">

          <div>

            <div className="students-eyebrow">
              UNIVERSITY ADMINISTRATION
            </div>

            <h1>
              Students
            </h1>

            <p>
              Manage student records and monitor
              their academic credentials.
            </p>

          </div>


          <Link
            to="/issue"
            className="students-primary-button"
          >
            <FaPlus />
            Issue Credential
          </Link>

        </section>


        {/* ERROR */}

        {error && (
          <div className="students-error">

            <FaCertificate />

            <div>
              <strong>
                Unable to load student records
              </strong>

              <span>
                {error}
              </span>
            </div>

            <button
              onClick={fetchStudents}
            >
              Retry
            </button>

          </div>
        )}


        {/* =========================================
            STATISTICS
        ========================================= */}

        <section className="students-stats-grid">

          <div className="students-stat-card">

            <div className="students-stat-top">

              <div className="students-stat-icon blue">
                <FaUsers />
              </div>

              <span>
                STUDENTS
              </span>

            </div>

            <div className="students-stat-number">
              {loading ? "—" : totalStudents}
            </div>

            <p>
              Unique student records
            </p>

          </div>


          <div className="students-stat-card">

            <div className="students-stat-top">

              <div className="students-stat-icon green">
                <FaCertificate />
              </div>

              <span>
                ISSUED
              </span>

            </div>

            <div className="students-stat-number">
              {loading ? "—" : credentialsIssued}
            </div>

            <p>
              Credentials issued
            </p>

          </div>


          <div className="students-stat-card">

            <div className="students-stat-top">

              <div className="students-stat-icon purple">
                <FaCheckCircle />
              </div>

              <span>
                VERIFIED
              </span>

            </div>

            <div className="students-stat-number">
              {loading ? "—" : verifiedCredentials}
            </div>

            <p>
              Blockchain-confirmed credentials
            </p>

          </div>


          <div className="students-stat-card">

            <div className="students-stat-top">

              <div className="students-stat-icon orange">
                <FaClock />
              </div>

              <span>
                PENDING
              </span>

            </div>

            <div className="students-stat-number">
              {loading ? "—" : pendingCredentials}
            </div>

            <p>
              Awaiting confirmation
            </p>

          </div>

        </section>


        {/* =========================================
            STUDENT DIRECTORY
        ========================================= */}

        <section className="students-directory">

          {/* DIRECTORY HEADER */}

          <div className="students-directory-header">

            <div>

              <div className="students-section-eyebrow">
                DIRECTORY
              </div>

              <h2>
                Student Records
              </h2>

            </div>

            <div className="students-result-count">
              {loading
                ? "Loading..."
                : `${filteredStudents.length} records`}
            </div>

          </div>


          {/* SEARCH / FILTER */}

          <div className="students-filters">

            <div className="students-search">

              <FaSearch />

              <input
                type="text"
                placeholder="Search by name, ID, email or institution..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="students-clear-search"
                >
                  ×
                </button>
              )}

            </div>


            <div className="students-filter-select">

              <select
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
              >

                <option>
                  All Departments
                </option>

                {departments.map(
                  (dept) => (
                    <option
                      key={dept}
                      value={dept}
                    >
                      {dept}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>


          {/* TABLE */}

          <div className="students-table-wrapper">

            <table className="students-table">

              <thead>

                <tr>

                  <th>
                    Student
                  </th>

                  <th>
                    Student ID
                  </th>

                  <th>
                    Department
                  </th>

                  <th>
                    Institution
                  </th>

                  <th>
                    Year
                  </th>

                  <th>
                    Credential
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {/* LOADING */}

                {loading && (
                  <tr>

                    <td
                      colSpan="8"
                      className="students-loading"
                    >

                      <div className="students-spinner"></div>

                      <span>
                        Loading student records...
                      </span>

                    </td>

                  </tr>
                )}


                {/* STUDENTS */}

                {!loading &&
                  filteredStudents.map(
                    (student) => (
                      <tr
                        key={
                          student.credentialId ||
                          student.id
                        }
                      >

                        {/* STUDENT */}

                        <td>

                          <div className="student-profile">

                            <div className="student-avatar">
                              {getInitials(
                                student.name
                              )}
                            </div>

                            <div className="student-profile-info">

                              <strong>
                                {student.name}
                              </strong>

                              <span>
                                {student.email}
                              </span>

                            </div>

                          </div>

                        </td>


                        {/* STUDENT ID */}

                        <td>
                          <span className="student-id">
                            {student.id}
                          </span>
                        </td>


                        {/* DEPARTMENT */}

                        <td>
                          <span className="student-department">
                            {student.department}
                          </span>
                        </td>


                        {/* INSTITUTION */}

                        <td>
                          <span className="student-institution">
                            {student.institution}
                          </span>
                        </td>


                        {/* YEAR */}

                        <td>
                          <span className="student-year">
                            {student.year}
                          </span>
                        </td>


                        {/* CREDENTIAL */}

                        <td>

                          <span
                            className={getCredentialClass(
                              student.credential
                            )}
                          >

                            {student.credential ===
                              "Verified" && (
                              <FaCheckCircle />
                            )}

                            {student.credential ===
                              "Pending" && (
                              <FaClock />
                            )}

                            {student.credential ===
                              "Issued" && (
                              <FaCertificate />
                            )}

                            {student.credential}

                          </span>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`student-status ${
                              student.status ===
                              "Revoked"
                                ? "revoked"
                                : "active"
                            }`}
                          >

                            <span className="student-status-dot"></span>

                            {student.status}

                          </span>

                        </td>


                        {/* ACTION */}

                        <td>

                          <div className="student-actions">

                            <Link
                              to={`/verify?credentialId=${encodeURIComponent(
                                student.credentialId || ""
                              )}`}
                              className="student-action-button"
                              title="Verify Credential"
                            >
                              <FaEye />
                            </Link>


                            <button
                              type="button"
                              className="student-action-button"
                              title="View Credential ID"
                              onClick={() =>
                                alert(
                                  `Credential ID: ${
                                    student.credentialId ||
                                    "N/A"
                                  }`
                                )
                              }
                            >
                              <FaEllipsisV />
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}


                {/* EMPTY */}

                {!loading &&
                  filteredStudents.length === 0 && (
                    <tr>

                      <td
                        colSpan="8"
                        className="students-empty"
                      >

                        <div className="students-empty-icon">
                          <FaUsers />
                        </div>

                        <strong>
                          No students found
                        </strong>

                        <span>
                          Try changing your search
                          or department filter.
                        </span>

                        {(search ||
                          department !==
                            "All Departments") && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearch("");
                              setDepartment(
                                "All Departments"
                              );
                            }}
                          >
                            Clear Filters
                          </button>
                        )}

                      </td>

                    </tr>
                  )}

              </tbody>

            </table>

          </div>

        </section>


        {/* FOOTER SECURITY NOTE */}

        <div className="students-security-note">

          <FaShieldAlt />

          <span>
            Student credential records are protected
            using authenticated access, SHA-256 integrity
            verification and blockchain-backed records.
          </span>

        </div>

      </main>

    </div>
  );
}

export default Students;