import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaSearch,
  FaCertificate,
  FaCheckCircle,
  FaEye
} from "react-icons/fa";

function History() {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const credentials = [
    {
      id: "BCV-2026-001",
      student: "Rahul Sharma",
      studentId: "STU001",
      degree: "B.Tech",
      department: "Computer Science",
      issueDate: "12 Aug 2026",
      status: "Verified",
      blockchain: "Confirmed"
    },
    {
      id: "BCV-2026-002",
      student: "Priya Reddy",
      studentId: "STU002",
      degree: "B.Tech",
      department: "Electronics",
      issueDate: "10 Aug 2026",
      status: "Verified",
      blockchain: "Confirmed"
    },
    {
      id: "BCV-2026-003",
      student: "Arjun Kumar",
      studentId: "STU003",
      degree: "B.Tech",
      department: "Mechanical",
      issueDate: "08 Aug 2026",
      status: "Pending",
      blockchain: "Pending"
    },
    {
      id: "BCV-2026-004",
      student: "Sneha Patel",
      studentId: "STU004",
      degree: "B.Tech",
      department: "Computer Science",
      issueDate: "05 Aug 2026",
      status: "Verified",
      blockchain: "Confirmed"
    },
    {
      id: "BCV-2026-005",
      student: "Vikram Rao",
      studentId: "STU005",
      degree: "B.Tech",
      department: "Information Technology",
      issueDate: "02 Aug 2026",
      status: "Issued",
      blockchain: "Confirmed"
    }
  ];

  const filteredCredentials = credentials.filter((credential) => {

    const matchesSearch =
      credential.id.toLowerCase().includes(search.toLowerCase()) ||
      credential.student.toLowerCase().includes(search.toLowerCase()) ||
      credential.studentId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All Status" ||
      credential.status === status;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (value) => {

    if (value === "Verified" || value === "Confirmed") {
      return {
        background: "#dcfce7",
        color: "#15803d"
      };
    }

    if (value === "Pending") {
      return {
        background: "#fef3c7",
        color: "#b45309"
      };
    }

    return {
      background: "#dbeafe",
      color: "#1d4ed8"
    };
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
              fontSize: "14px"
            }}
          >
            ← Dashboard
          </Link>

        </div>

      </nav>


      {/* MAIN CONTENT */}

      <main className="container-fluid px-4 py-4">

        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

          <div>

            <h2
              style={{
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "6px"
              }}
            >
              Certificate History
            </h2>

            <p
              style={{
                color: "#64748b",
                marginBottom: 0
              }}
            >
              View and manage previously issued academic credentials.
            </p>

          </div>

          <Link
            to="/issue"
            className="btn px-4 py-2"
            style={{
              background: "#2563eb",
              color: "white",
              borderRadius: "8px",
              fontWeight: "600"
            }}
          >
            + Issue Credential
          </Link>

        </div>


        {/* SUMMARY CARDS */}

        <div className="row g-4 mb-4">

          <div className="col-md-4">

            <div
              className="bg-white p-4"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >

              <small style={{ color: "#64748b" }}>
                Total Credentials
              </small>

              <div
                className="d-flex justify-content-between align-items-center mt-2"
              >

                <h3
                  style={{
                    fontWeight: "800",
                    margin: 0
                  }}
                >
                  184
                </h3>

                <FaCertificate
                  size={22}
                  style={{
                    color: "#2563eb"
                  }}
                />

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div
              className="bg-white p-4"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >

              <small style={{ color: "#64748b" }}>
                Blockchain Confirmed
              </small>

              <div
                className="d-flex justify-content-between align-items-center mt-2"
              >

                <h3
                  style={{
                    fontWeight: "800",
                    margin: 0
                  }}
                >
                  176
                </h3>

                <FaCheckCircle
                  size={22}
                  style={{
                    color: "#16a34a"
                  }}
                />

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div
              className="bg-white p-4"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >

              <small style={{ color: "#64748b" }}>
                Pending
              </small>

              <div
                className="d-flex justify-content-between align-items-center mt-2"
              >

                <h3
                  style={{
                    fontWeight: "800",
                    margin: 0
                  }}
                >
                  8
                </h3>

                <span
                  style={{
                    background: "#fef3c7",
                    color: "#b45309",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700"
                  }}
                >
                  !
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* TABLE */}

        <div
          className="bg-white"
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            overflow: "hidden"
          }}
        >

          {/* FILTER AREA */}

          <div className="p-4 border-bottom">

            <div className="row g-3 align-items-center">

              <div className="col-lg-7">

                <div className="position-relative">

                  <FaSearch
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "14px",
                      color: "#94a3b8"
                    }}
                  />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by credential ID, student name or student ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      paddingLeft: "42px",
                      height: "46px",
                      borderRadius: "8px"
                    }}
                  />

                </div>

              </div>


              <div className="col-lg-3">

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{
                    height: "46px",
                    borderRadius: "8px"
                  }}
                >

                  <option>All Status</option>
                  <option>Verified</option>
                  <option>Issued</option>
                  <option>Pending</option>

                </select>

              </div>


              <div className="col-lg-2 text-lg-end">

                <small style={{ color: "#64748b" }}>
                  {filteredCredentials.length} records
                </small>

              </div>

            </div>

          </div>


          {/* TABLE */}

          <div className="table-responsive">

            <table
              className="table mb-0 align-middle"
              style={{
                minWidth: "1000px"
              }}
            >

              <thead
                style={{
                  background: "#f8fafc"
                }}
              >

                <tr>

                  <th className="px-4 py-3">
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

                {filteredCredentials.map((credential) => (

                  <tr key={credential.id}>

                    <td className="px-4">

                      <div
                        style={{
                          fontWeight: "700",
                          color: "#2563eb"
                        }}
                      >
                        {credential.id}
                      </div>

                      <small style={{ color: "#94a3b8" }}>
                        Academic Credential
                      </small>

                    </td>


                    <td>

                      <div
                        style={{
                          fontWeight: "600",
                          color: "#0f172a"
                        }}
                      >
                        {credential.student}
                      </div>

                      <small style={{ color: "#64748b" }}>
                        {credential.studentId}
                      </small>

                    </td>


                    <td>
                      {credential.degree}
                    </td>


                    <td>
                      {credential.department}
                    </td>


                    <td>
                      {credential.issueDate}
                    </td>


                    <td>

                      <span
                        className="px-2 py-1"
                        style={{
                          ...getStatusStyle(credential.status),
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}
                      >
                        {credential.status}
                      </span>

                    </td>


                    <td>

                      <span
                        className="px-2 py-1"
                        style={{
                          ...getStatusStyle(credential.blockchain),
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}
                      >
                        {credential.blockchain}
                      </span>

                    </td>


                    <td>

                      <Link
                        to="/verify"
                        className="btn btn-sm"
                        title="View Credential"
                        style={{
                          background: "#f1f5f9",
                          color: "#475569"
                        }}
                      >
                        <FaEye size={13} />
                      </Link>

                    </td>

                  </tr>

                ))}


                {filteredCredentials.length === 0 && (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >

                      <FaCertificate
                        size={30}
                        style={{
                          color: "#cbd5e1",
                          marginBottom: "10px"
                        }}
                      />

                      <div
                        style={{
                          fontWeight: "600",
                          color: "#475569"
                        }}
                      >
                        No credentials found
                      </div>

                      <small style={{ color: "#94a3b8" }}>
                        Try changing your search or status filter.
                      </small>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}

export default History;