import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import IssueCertificate from "./pages/IssueCertificate";
import History from "./pages/History";
import Verify from "./pages/Verify";
import VerificationHistory from "./pages/VerificationHistory";
import Settings from "./pages/Settings";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC PAGES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/verify" element={<Verify />} />


        {/* ================= PROTECTED ADMIN PAGES ================= */}

        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/students" element={<Students />} />

          <Route path="/issue-certificate" element={<IssueCertificate />} />

          <Route path="/history" element={<History />} />

          <Route
            path="/verification-history"
            element={<VerificationHistory />}
          />

          <Route path="/settings" element={<Settings />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;