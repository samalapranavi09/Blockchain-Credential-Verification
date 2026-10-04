import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaQrcode,
  FaLink,
  FaLock,
  FaCheckCircle,
  FaSearch,
  FaUniversity,
  FaArrowRight,
} from "react-icons/fa";

function Home() {
  return (
    <div className="home-page">

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="home-hero">
        <div className="home-hero-container">

          {/* Left Content */}
          <div className="home-hero-content">

            <div className="home-badge">
              <FaShieldAlt />
              <span>BLOCKCHAIN-BASED CREDENTIAL VERIFICATION</span>
            </div>

            <h1>
              Trust Every
              <span> Academic Credential.</span>
            </h1>

            <p className="home-hero-description">
              A secure and tamper-resistant platform for issuing,
              managing, and instantly verifying academic credentials
              using blockchain technology.
            </p>

            <div className="home-hero-buttons">

              <Link
                to="/verify"
                className="home-primary-button"
              >
                <FaSearch />
                Verify Credential
                <FaArrowRight />
              </Link>

              <Link
                to="/login"
                className="home-secondary-button"
              >
                <FaUniversity />
                University Login
              </Link>

            </div>

            <div className="home-trust-line">
              <FaCheckCircle />
              <span>
                Secure verification powered by SHA-256 and Polygon blockchain
              </span>
            </div>

          </div>


          {/* Right Visual */}
          <div className="home-hero-visual">

            <div className="verification-card">

              <div className="verification-card-header">

                <div className="verification-icon">
                  <FaShieldAlt />
                </div>

                <div>
                  <div className="verification-label">
                    CREDENTIAL STATUS
                  </div>

                  <div className="verification-status">
                    <FaCheckCircle />
                    Verified
                  </div>
                </div>

              </div>


              <div className="verification-divider"></div>


              <div className="verification-details">

                <div className="verification-detail">
                  <span>Credential ID</span>
                  <strong>BCV-2026-004</strong>
                </div>

                <div className="verification-detail">
                  <span>Student</span>
                  <strong>Academic Credential</strong>
                </div>

                <div className="verification-detail">
                  <span>Blockchain</span>
                  <strong>Polygon Amoy</strong>
                </div>

              </div>


              <div className="verification-secure">
                <FaLock />
                <span>Blockchain record confirmed</span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FEATURES
      ========================= */}
      <section className="home-features">

        <div className="home-section-heading">

          <span className="home-section-label">
            WHY BLOCKCHAIN CREDENTIAL VERIFICATION?
          </span>

          <h2>
            Built for secure academic verification
          </h2>

          <p>
            Our system combines secure hashing, blockchain records,
            and easy verification to help protect academic credentials.
          </p>

        </div>


        <div className="home-feature-grid">

          {/* Feature 1 */}
          <div className="home-feature-card">

            <div className="home-feature-icon blue">
              <FaShieldAlt />
            </div>

            <h3>Blockchain Security</h3>

            <p>
              Credential hashes are recorded on the Polygon blockchain,
              creating an independent and tamper-resistant verification record.
            </p>

          </div>


          {/* Feature 2 */}
          <div className="home-feature-card">

            <div className="home-feature-icon green">
              <FaCheckCircle />
            </div>

            <h3>Instant Verification</h3>

            <p>
              Employers and other authorized users can verify a credential
              using its unique Credential ID.
            </p>

          </div>


          {/* Feature 3 */}
          <div className="home-feature-card">

            <div className="home-feature-icon purple">
              <FaQrcode />
            </div>

            <h3>QR-Based Access</h3>

            <p>
              QR codes provide a convenient way to access the credential
              verification page quickly.
            </p>

          </div>


          {/* Feature 4 */}
          <div className="home-feature-card">

            <div className="home-feature-icon orange">
              <FaLock />
            </div>

            <h3>Data Integrity</h3>

            <p>
              SHA-256 hashing helps detect whether credential information
              has been modified after issuance.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          HOW IT WORKS
      ========================= */}
      <section className="home-process">

        <div className="home-section-heading">

          <span className="home-section-label">
            SIMPLE VERIFICATION FLOW
          </span>

          <h2>
            Issue. Secure. Verify.
          </h2>

          <p>
            The system connects credential issuance, hashing,
            blockchain storage, and verification in one workflow.
          </p>

        </div>


        <div className="home-process-grid">

          <div className="home-process-step">

            <div className="process-number">
              01
            </div>

            <div className="process-icon">
              <FaUniversity />
            </div>

            <h3>Issue</h3>

            <p>
              The university administrator enters the student's
              academic credential information.
            </p>

          </div>


          <div className="process-line"></div>


          <div className="home-process-step">

            <div className="process-number">
              02
            </div>

            <div className="process-icon">
              <FaShieldAlt />
            </div>

            <h3>Secure</h3>

            <p>
              The backend generates a SHA-256 hash and records
              the credential hash on the blockchain.
            </p>

          </div>


          <div className="process-line"></div>


          <div className="home-process-step">

            <div className="process-number">
              03
            </div>

            <div className="process-icon">
              <FaSearch />
            </div>

            <h3>Verify</h3>

            <p>
              A verifier enters the Credential ID or uses the
              QR code to check the credential.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================= */}
      <section className="home-cta">

        <div className="home-cta-content">

          <div className="home-cta-icon">
            <FaLink />
          </div>

          <div>
            <h2>
              Ready to verify a credential?
            </h2>

            <p>
              Enter a Credential ID and check its authenticity and integrity.
            </p>
          </div>

          <Link
            to="/verify"
            className="home-cta-button"
          >
            Verify Now
            <FaArrowRight />
          </Link>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}
      <footer className="home-footer">

        <div className="home-footer-content">

          <div>
            <strong>BCV</strong>
            <span>
              Blockchain Credential Verification
            </span>
          </div>

          <div className="home-footer-right">
            Academic Credential Verification System
          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;