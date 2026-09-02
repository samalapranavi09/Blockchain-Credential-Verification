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

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />

        {/* Admin Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/issue" element={<IssueCertificate />} />
        <Route path="/history" element={<History />} />

        <Route
          path="/verification-history"
          element={<VerificationHistory />}
        />

        <Route path="/settings" element={<Settings />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;