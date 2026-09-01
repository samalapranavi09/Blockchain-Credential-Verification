import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaQrcode,
  FaLock,
  FaLink,
  FaUniversity,
  FaGraduationCap,
  FaCalendarAlt,
  FaFingerprint
} from "react-icons/fa";

function Verify() {

  const [credentialId, setCredentialId] = useState("");
  const [result, setResult] = useState(null);

  // Demo credential records
  const credentials = {
    "BCV-2026-001": {
      studentName: "Rahul Sharma",
      studentId: "STU001",
      degree: "B.Tech",
      department: "Computer Science",
      university: "ABC Institute of Technology",
      issueDate: "12 Aug 2026",
      credentialType: "Degree Certificate",
      status: "Verified",
      blockchain: "Confirmed",
      hash: "8a4f2d91c73e6b8a...91c2",
      transactionHash: "0x7a91...e83d"
    },

    "BCV-2026-002": {
      studentName: "Priya Reddy",
      studentId: "STU002",
      degree: "B.Tech",
      department: "Electronics",
      university: "ABC Institute of Technology",
      issueDate: "10 Aug 2026",
      credentialType: "Degree Certificate",
      status: "Verified",
      blockchain: "Confirmed",
      hash: "3b82a1f9d64c7e21...45fa",
      transactionHash: "0x4c82...a71b"
    },

    "BCV-2026-003": {
      studentName: "Arjun Kumar",
      studentId: "STU003",
      degree: "B.Tech",
      department: "Mechanical",
      university: "ABC Institute of Technology",
      issueDate: "08 Aug 2026",
      credentialType: "Degree Certificate",
      status: "Pending",
      blockchain: "Pending",
      hash: "6d92f8a1c45b7e32...19ad",
      transactionHash: "0x5b73...c921"
    },

    "BCV-2026-004": {
      studentName: "Sneha Patel",
      studentId: "STU004",
      degree: "B.Tech",
      department: "Computer Science",
      university: "ABC Institute of Technology",
      issueDate: "05 Aug 2026",
      credentialType: "Degree Certificate",
      status: "Verified",
      blockchain: "Confirmed",
      hash: "9c31a7e2d84f5b61...72bc",
      transactionHash: "0x8d42...f615"
    },

    "BCV-2026-005": {
      studentName: "Vikram Rao",
      studentId: "STU005",
      degree: "B.Tech",
      department: "Information Technology",
      university: "ABC Institute of Technology",
      issueDate: "02 Aug 2026",
      credentialType: "Degree Certificate",
      status: "Issued",
      blockchain: "Confirmed",
      hash: "4e72b9c1a63d8f54...38ef",
      transactionHash: "0x2f81...b437"
    }
  };

  const handleVerify = (e) => {

    e.preventDefault();

    const id = credentialId.trim().toUpperCase();

    if (credentials[id]) {

      setResult({
        found: true,
        data: credentials[id]
      });

    } else {

      setResult({
        found: false
      });

    }
  };

  const handleReset = () => {
    setCredentialId("");
    setResult(null);
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
          className="container d-flex align-items-center justify-content-between h-100"
        >

          <Link
            to="/"
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
                Blockchain Credential Verification
              </small>

            </div>

          </Link>


          <div className="d-flex gap-4 align-items-center">

            <Link
              to="/"
              style={{
                color: "#475569",
                fontSize: "14px",
                textDecoration: "none"
              }}
            >
              Home
            </Link>

            <Link
              to="/login"
              style={{
                color: "#475569",
                fontSize: "14px",
                textDecoration: "none"
              }}
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
            Verify the authenticity of an academic certificate using
            its unique credential ID. Verification provides a trusted
            and tamper-evident result.
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
              style={{
                fontWeight: "700",
                color: "#0f172a"
              }}
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
                    placeholder="Enter credential ID e.g. BCV-2026-001"
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
                  className="btn w-100"
                  style={{
                    height: "50px",
                    background: "#2563eb",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: "600"
                  }}
                >
                  Verify
                </button>

              </div>

            </div>

          </form>


          {/* DEMO IDS */}

          <div
            className="mt-3"
            style={{
              fontSize: "13px",
              color: "#94a3b8"
            }}
          >
            Demo credentials:

            {Object.keys(credentials).map((id, index) => (

              <React.Fragment key={id}>

                <button
                  type="button"
                  onClick={() => setCredentialId(id)}
                  style={{
                    border: "none",
                    background: "none",
                    color: "#2563eb",
                    marginLeft: index === 0 ? "5px" : "8px",
                    padding: 0,
                    cursor: "pointer"
                  }}
                >
                  {id}
                </button>

                {index < Object.keys(credentials).length - 1 && (
                  <span style={{ color: "#cbd5e1" }}>
                    {" | "}
                  </span>
                )}

              </React.Fragment>

            ))}

          </div>

        </div>


        {/* SUCCESS RESULT */}

        {result && result.found && (

          <div
            className="mx-auto mt-4"
            style={{
              maxWidth: "850px"
            }}
          >

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

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "#dcfce7",
                    color: "#16a34a",
                    borderRadius: "50%"
                  }}
                >
                  <FaCheckCircle size={27} />
                </div>

                <div>

                  <h4
                    style={{
                      color: "#166534",
                      fontWeight: "800",
                      marginBottom: "4px"
                    }}
                  >
                    Credential Verified
                  </h4>

                  <div
                    style={{
                      color: "#15803d",
                      fontSize: "14px"
                    }}
                  >
                    This credential exists in the verification system.
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
                      style={{
                        color: "#2563eb",
                        marginTop: "4px"
                      }}
                    />

                    <div>

                      <small style={{ color: "#94a3b8" }}>
                        Student Name
                      </small>

                      <div
                        style={{
                          fontWeight: "700",
                          color: "#0f172a"
                        }}
                      >
                        {result.data.studentName}
                      </div>

                    </div>

                  </div>

                </div>


                <div className="col-md-6">

                  <div className="d-flex gap-3">

                    <FaFingerprint
                      style={{
                        color: "#2563eb",
                        marginTop: "4px"
                      }}
                    />

                    <div>

                      <small style={{ color: "#94a3b8" }}>
                        Student ID
                      </small>

                      <div
                        style={{
                          fontWeight: "700",
                          color: "#0f172a"
                        }}
                      >
                        {result.data.studentId}
                      </div>

                    </div>

                  </div>

                </div>


                <div className="col-md-6">

                  <div className="d-flex gap-3">

                    <FaGraduationCap
                      style={{
                        color: "#2563eb",
                        marginTop: "4px"
                      }}
                    />

                    <div>

                      <small style={{ color: "#94a3b8" }}>
                        Degree
                      </small>

                      <div
                        style={{
                          fontWeight: "700",
                          color: "#0f172a"
                        }}
                      >
                        {result.data.degree}
                      </div>

                    </div>

                  </div>

                </div>


                <div className="col-md-6">

                  <div className="d-flex gap-3">

                    <FaUniversity
                      style={{
                        color: "#2563eb",
                        marginTop: "4px"
                      }}
                    />

                    <div>

                      <small style={{ color: "#94a3b8" }}>
                        Department
                      </small>

                      <div
                        style={{
                          fontWeight: "700",
                          color: "#0f172a"
                        }}
                      >
                        {result.data.department}
                      </div>

                    </div>

                  </div>

                </div>


                <div className="col-md-6">

                  <div className="d-flex gap-3">

                    <FaUniversity
                      style={{
                        color: "#2563eb",
                        marginTop: "4px"
                      }}
                    />

                    <div>

                      <small style={{ color: "#94a3b8" }}>
                        Issuing Institution
                      </small>

                      <div
                        style={{
                          fontWeight: "700",
                          color: "#0f172a"
                        }}
                      >
                        {result.data.university}
                      </div>

                    </div>

                  </div>

                </div>


                <div className="col-md-6">

                  <div className="d-flex gap-3">

                    <FaCalendarAlt
                      style={{
                        color: "#2563eb",
                        marginTop: "4px"
                      }}
                    />

                    <div>

                      <small style={{ color: "#94a3b8" }}>
                        Issue Date
                      </small>

                      <div
                        style={{
                          fontWeight: "700",
                          color: "#0f172a"
                        }}
                      >
                        {result.data.issueDate}
                      </div>

                    </div>

                  </div>

                </div>

              </div>


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
                style={{
                  background: "#f8fafc",
                  borderRadius: "8px"
                }}
              >

                <div className="d-flex justify-content-between flex-wrap gap-2">

                  <span style={{ color: "#64748b" }}>
                    Credential ID
                  </span>

                  <strong>
                    {credentialId.toUpperCase()}
                  </strong>

                </div>

              </div>


              <div
                className="p-3 mb-3"
                style={{
                  background: "#f8fafc",
                  borderRadius: "8px"
                }}
              >

                <div className="d-flex justify-content-between flex-wrap gap-2">

                  <span style={{ color: "#64748b" }}>
                    SHA-256 Hash
                  </span>

                  <strong
                    style={{
                      fontSize: "13px"
                    }}
                  >
                    {result.data.hash}
                  </strong>

                </div>

              </div>


              <div
                className="p-3"
                style={{
                  background: "#f8fafc",
                  borderRadius: "8px"
                }}
              >

                <div className="d-flex justify-content-between flex-wrap gap-2">

                  <span style={{ color: "#64748b" }}>
                    Blockchain Transaction
                  </span>

                  <strong
                    style={{
                      color: "#2563eb",
                      fontSize: "13px"
                    }}
                  >
                    {result.data.transactionHash}
                  </strong>

                </div>

              </div>

            </div>


            {/* SECURITY STATUS */}

            <div
              className="bg-white p-4 p-md-5"
              style={{
                border: "1px solid #e2e8f0",
                borderTop: "none"
              }}
            >

              <div className="row g-3">

                <div className="col-md-4">

                  <div
                    className="p-3 text-center"
                    style={{
                      background: "#f0fdf4",
                      borderRadius: "10px"
                    }}
                  >

                    <FaCheckCircle
                      style={{
                        color: "#16a34a",
                        marginBottom: "8px"
                      }}
                    />

                    <div
                      style={{
                        fontWeight: "700"
                      }}
                    >
                      Credential Valid
                    </div>

                  </div>

                </div>


                <div className="col-md-4">

                  <div
                    className="p-3 text-center"
                    style={{
                      background: "#f0fdf4",
                      borderRadius: "10px"
                    }}
                  >

                    <FaLock
                      style={{
                        color: "#16a34a",
                        marginBottom: "8px"
                      }}
                    />

                    <div
                      style={{
                        fontWeight: "700"
                      }}
                    >
                      Hash Matched
                    </div>

                  </div>

                </div>


                <div className="col-md-4">

                  <div
                    className="p-3 text-center"
                    style={{
                      background: "#f0fdf4",
                      borderRadius: "10px"
                    }}
                  >

                    <FaLink
                      style={{
                        color: "#16a34a",
                        marginBottom: "8px"
                      }}
                    />

                    <div
                      style={{
                        fontWeight: "700"
                      }}
                    >
                      Blockchain Confirmed
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* RESET */}

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

            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: "60px",
                height: "60px",
                background: "#fee2e2",
                color: "#dc2626",
                borderRadius: "50%"
              }}
            >
              <FaTimesCircle size={30} />
            </div>


            <h4
              style={{
                fontWeight: "800",
                color: "#991b1b"
              }}
            >
              Credential Not Found
            </h4>


            <p
              style={{
                color: "#64748b",
                maxWidth: "550px",
                margin: "10px auto 20px"
              }}
            >
              No credential matching this ID was found in the
              verification system. Please check the credential ID
              and try again.
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


        {/* QR SECTION */}

        {!result && (

          <div
            className="mx-auto mt-5"
            style={{
              maxWidth: "850px"
            }}
          >

            <div
              className="bg-white p-4 p-md-5 text-center"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "16px"
              }}
            >

              <FaQrcode
                size={35}
                style={{
                  color: "#2563eb",
                  marginBottom: "15px"
                }}
              />

              <h5
                style={{
                  fontWeight: "800",
                  color: "#0f172a"
                }}
              >
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
                Every issued credential can later be associated
                with a unique QR code that directs users to its
                verification record.
              </p>

              <div
                className="mt-4 p-3"
                style={{
                  background: "#f8fafc",
                  borderRadius: "8px",
                  color: "#94a3b8",
                  fontSize: "14px"
                }}
              >
                QR scanner integration will be connected in the
                next development phase.
              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default Verify;