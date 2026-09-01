import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaUsers,
  FaCertificate,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaEllipsisV
} from "react-icons/fa";

function Students() {

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");

  const students = [
    {
      id: "STU001",
      name: "Rahul Sharma",
      email: "rahul.sharma@university.edu",
      department: "Computer Science",
      year: "2026",
      credential: "Issued",
      status: "Active"
    },
    {
      id: "STU002",
      name: "Priya Reddy",
      email: "priya.reddy@university.edu",
      department: "Electronics",
      year: "2026",
      credential: "Verified",
      status: "Active"
    },
    {
      id: "STU003",
      name: "Arjun Kumar",
      email: "arjun.kumar@university.edu",
      department: "Mechanical",
      year: "2026",
      credential: "Pending",
      status: "Active"
    },
    {
      id: "STU004",
      name: "Sneha Patel",
      email: "sneha.patel@university.edu",
      department: "Computer Science",
      year: "2025",
      credential: "Issued",
      status: "Active"
    },
    {
      id: "STU005",
      name: "Vikram Rao",
      email: "vikram.rao@university.edu",
      department: "Information Technology",
      year: "2026",
      credential: "Not Issued",
      status: "Active"
    }
  ];

  const filteredStudents = students.filter((student) => {

    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.id.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All Departments" ||
      student.department === department;

    return matchesSearch && matchesDepartment;
  });

  const getCredentialStyle = (status) => {

    if (status === "Verified") {
      return {
        background: "#dcfce7",
        color: "#15803d"
      };
    }

    if (status === "Issued") {
      return {
        background: "#dbeafe",
        color: "#1d4ed8"
      };
    }

    if (status === "Pending") {
      return {
        background: "#fef3c7",
        color: "#b45309"
      };
    }

    return {
      background: "#f1f5f9",
      color: "#64748b"
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc"
      }}
    >

      {/* TOP NAVBAR */}

      <nav
        className="bg-white border-bottom"
        style={{ height: "70px" }}
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
                color: "white",
                fontWeight: "700"
              }}
            >
              BCV
            </div>

            <div>

              <div
                style={{
                  fontWeight: "800",
                  color: "#0f172a"
                }}
              >
                Blockchain Credential Verification
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

        {/* PAGE HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

          <div>

            <h2
              style={{
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "6px"
              }}
            >
              Students
            </h2>

            <p
              style={{
                color: "#64748b",
                marginBottom: 0
              }}
            >
              Manage student records and academic credentials.
            </p>

          </div>

          <button
            className="btn px-4 py-2 d-flex align-items-center gap-2"
            style={{
              background: "#2563eb",
              color: "white",
              borderRadius: "8px",
              fontWeight: "600"
            }}
          >
            <FaPlus size={13} />
            Add Student
          </button>

        </div>

        {/* STATISTICS */}

        <div className="row g-4 mb-4">

          <div className="col-md-6 col-xl-3">

            <div
              className="bg-white p-4"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >

              <div className="d-flex justify-content-between">

                <div>

                  <small style={{ color: "#64748b" }}>
                    Total Students
                  </small>

                  <h3
                    style={{
                      fontWeight: "800",
                      marginTop: "8px"
                    }}
                  >
                    248
                  </h3>

                </div>

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#dbeafe",
                    color: "#2563eb",
                    borderRadius: "10px"
                  }}
                >
                  <FaUsers />
                </div>

              </div>

            </div>

          </div>

          <div className="col-md-6 col-xl-3">

            <div
              className="bg-white p-4"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >

              <div className="d-flex justify-content-between">

                <div>

                  <small style={{ color: "#64748b" }}>
                    Credentials Issued
                  </small>

                  <h3
                    style={{
                      fontWeight: "800",
                      marginTop: "8px"
                    }}
                  >
                    184
                  </h3>

                </div>

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#dcfce7",
                    color: "#16a34a",
                    borderRadius: "10px"
                  }}
                >
                  <FaCertificate />
                </div>

              </div>

            </div>

          </div>

          <div className="col-md-6 col-xl-3">

            <div
              className="bg-white p-4"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >

              <div className="d-flex justify-content-between">

                <div>

                  <small style={{ color: "#64748b" }}>
                    Verified Credentials
                  </small>

                  <h3
                    style={{
                      fontWeight: "800",
                      marginTop: "8px"
                    }}
                  >
                    126
                  </h3>

                </div>

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#dcfce7",
                    color: "#16a34a",
                    borderRadius: "10px"
                  }}
                >
                  <FaCheckCircle />
                </div>

              </div>

            </div>

          </div>

          <div className="col-md-6 col-xl-3">

            <div
              className="bg-white p-4"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px"
              }}
            >

              <div className="d-flex justify-content-between">

                <div>

                  <small style={{ color: "#64748b" }}>
                    Pending Credentials
                  </small>

                  <h3
                    style={{
                      fontWeight: "800",
                      marginTop: "8px"
                    }}
                  >
                    8
                  </h3>

                </div>

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#fef3c7",
                    color: "#d97706",
                    borderRadius: "10px"
                  }}
                >
                  <FaClock />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* STUDENT TABLE */}

        <div
          className="bg-white"
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            overflow: "hidden"
          }}
        >

          {/* TABLE HEADER */}

          <div className="p-4 border-bottom">

            <div className="row g-3 align-items-center">

              <div className="col-lg-6">

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
                    placeholder="Search by name, student ID or email..."
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
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{
                    height: "46px",
                    borderRadius: "8px"
                  }}
                >

                  <option>All Departments</option>
                  <option>Computer Science</option>
                  <option>Electronics</option>
                  <option>Mechanical</option>
                  <option>Information Technology</option>

                </select>

              </div>

              <div className="col-lg-3 text-lg-end">

                <span
                  style={{
                    color: "#64748b",
                    fontSize: "14px"
                  }}
                >
                  Showing {filteredStudents.length} students
                </span>

              </div>

            </div>

          </div>

          {/* TABLE */}

          <div className="table-responsive">

            <table
              className="table mb-0 align-middle"
              style={{
                minWidth: "900px"
              }}
            >

              <thead
                style={{
                  background: "#f8fafc"
                }}
              >

                <tr>

                  <th className="px-4 py-3">
                    Student
                  </th>

                  <th>
                    Student ID
                  </th>

                  <th>
                    Department
                  </th>

                  <th>
                    Graduation
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

                {filteredStudents.map((student) => (

                  <tr key={student.id}>

                    <td className="px-4">

                      <div className="d-flex align-items-center gap-3">

                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "#dbeafe",
                            color: "#2563eb",
                            fontWeight: "700"
                          }}
                        >
                          {student.name.charAt(0)}
                        </div>

                        <div>

                          <div
                            style={{
                              fontWeight: "600",
                              color: "#0f172a"
                            }}
                          >
                            {student.name}
                          </div>

                          <small style={{ color: "#64748b" }}>
                            {student.email}
                          </small>

                        </div>

                      </div>

                    </td>

                    <td>
                      <span
                        style={{
                          fontWeight: "600",
                          color: "#334155"
                        }}
                      >
                        {student.id}
                      </span>
                    </td>

                    <td>
                      {student.department}
                    </td>

                    <td>
                      {student.year}
                    </td>

                    <td>

                      <span
                        className="px-2 py-1"
                        style={{
                          ...getCredentialStyle(student.credential),
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}
                      >
                        {student.credential}
                      </span>

                    </td>

                    <td>

                      <span
                        className="d-flex align-items-center gap-1"
                        style={{
                          color: "#15803d",
                          fontSize: "13px",
                          fontWeight: "600"
                        }}
                      >
                        <FaCheckCircle size={11} />
                        {student.status}
                      </span>

                    </td>

                    <td>

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-sm"
                          title="View Student"
                          style={{
                            background: "#f1f5f9",
                            color: "#475569"
                          }}
                        >
                          <FaEye size={13} />
                        </button>

                        <button
                          className="btn btn-sm"
                          title="More options"
                          style={{
                            background: "#f1f5f9",
                            color: "#475569"
                          }}
                        >
                          <FaEllipsisV size={13} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

                {filteredStudents.length === 0 && (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-5"
                    >

                      <FaUsers
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
                        No students found
                      </div>

                      <small style={{ color: "#94a3b8" }}>
                        Try changing your search or filter.
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

export default Students;