import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";
import NewsDashboard from "./pages/NewsDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#f8fafc",
        }}
      >
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>

            {/* 🔐 Protected Routes */}

            {/* 👉 MAIN PAGE = ANALYZE */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analyze"
              element={
                <ProtectedRoute>
                  <Home />   {/* ✅ FIXED */}
                </ProtectedRoute>
              }
            />

            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />

            <Route
              path="/news"
              element={
                <ProtectedRoute>
                  <NewsDashboard />
                </ProtectedRoute>
              }
            />

            {/* 🌐 Public Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
        </main>

        <footer
          style={{
            padding: "32px 24px",
            textAlign: "center",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            © 2026 NewsLens. All rights reserved.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;