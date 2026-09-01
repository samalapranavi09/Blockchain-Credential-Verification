import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <section className="py-5">
        <div className="container py-5">

          <div className="row align-items-center">

            <div className="col-lg-7">

              <span
                className="badge px-3 py-2 mb-3"
                style={{
                  background: "#dbeafe",
                  color: "#1d4ed8",
                  fontWeight: "600"
                }}
              >
                BLOCKCHAIN-BASED CREDENTIAL VERIFICATION
              </span>

              <h1
                style={{
                  fontSize: "clamp(40px, 5vw, 64px)",
                  fontWeight: "800",
                  lineHeight: "1.08",
                  color: "#0f172a"
                }}
              >
                Trust Every
                <br />
                Academic Credential.
              </h1>

              <p
                className="mt-4"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.8",
                  color: "#64748b",
                  maxWidth: "650px"
                }}
              >
                A secure academic credential verification platform
                that combines cryptographic hashing, decentralized
                storage, and blockchain technology to make certificates
                tamper-evident and instantly verifiable.
              </p>

              <div className="d-flex gap-3 mt-4 flex-wrap">

                <a
                  href="/verify"
                  className="btn px-4 py-3"
                  style={{
                    background: "#2563eb",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: "600"
                  }}
                >
                  Verify a Credential →
                </a>

                <a
                  href="/login"
                  className="btn px-4 py-3"
                  style={{
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    borderRadius: "8px",
                    fontWeight: "600",
                    background: "white"
                  }}
                >
                  University Login
                </a>

              </div>

            </div>

            <div className="col-lg-5 mt-5 mt-lg-0">

              <div
                className="p-4 shadow-sm"
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "18px"
                }}
              >

                <div className="d-flex align-items-center gap-3 mb-4">

                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "#dcfce7",
                      borderRadius: "12px",
                      color: "#16a34a",
                      fontSize: "24px"
                    }}
                  >
                    ✓
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: "700",
                        color: "#0f172a"
                      }}
                    >
                      Credential Verified
                    </div>

                    <small style={{ color: "#64748b" }}>
                      Blockchain verification successful
                    </small>
                  </div>

                </div>

                <hr />

                <div className="mb-3">
                  <small style={{ color: "#64748b" }}>
                    Credential ID
                  </small>

                  <div
                    style={{
                      fontWeight: "700",
                      marginTop: "4px"
                    }}
                  >
                    BCV-2026-001
                  </div>
                </div>

                <div className="row">

                  <div className="col-6 mb-3">
                    <small style={{ color: "#64748b" }}>
                      Degree
                    </small>

                    <div style={{ fontWeight: "600" }}>
                      B.Tech
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <small style={{ color: "#64748b" }}>
                      Department
                    </small>

                    <div style={{ fontWeight: "600" }}>
                      Computer Science
                    </div>
                  </div>

                </div>

                <div
                  className="p-3"
                  style={{
                    background: "#f8fafc",
                    borderRadius: "10px"
                  }}
                >

                  <div className="d-flex justify-content-between mb-2">

                    <span style={{ color: "#64748b" }}>
                      SHA-256
                    </span>

                    <span
                      style={{
                        color: "#16a34a",
                        fontWeight: "600"
                      }}
                    >
                      ✓ Matched
                    </span>

                  </div>

                  <div className="d-flex justify-content-between">

                    <span style={{ color: "#64748b" }}>
                      Blockchain
                    </span>

                    <span
                      style={{
                        color: "#16a34a",
                        fontWeight: "600"
                      }}
                    >
                      ✓ Verified
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default Home;