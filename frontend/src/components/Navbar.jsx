import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const navLinkStyle = (path) => ({
    fontSize: "14px",
    fontWeight: 600,
    color: location.pathname === path ? "#2563eb" : "#64748b",
    textDecoration: "none",
  });

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%", // 🔥 full width
        padding: "0 40px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
          width: "100%",
        }}
      >
        {/* LEFT - LOGO */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            📰
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "18px" }}>
              NewsLens
            </div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>
              Bias • Sentiment • Entities • Insights
            </div>
          </div>
        </Link>

        {/* CENTER NAV */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)", // 🔥 true center
            display: "flex",
            gap: "30px",
          }}
        >
          <Link to="/" style={navLinkStyle("/")}>Analyze</Link>
          <Link to="/news" style={navLinkStyle("/news")}>News</Link>
          <Link to="/history" style={navLinkStyle("/history")}>History</Link>
          <Link to="/about" style={navLinkStyle("/about")}>About</Link>
        </div>

        {/* RIGHT AUTH */}
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          {!token ? (
            <>
              <Link
                to="/login"
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid #2563eb",
                  color: "#2563eb",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>

              <Link
                to="/signup"
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}

          {/* ONLINE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "999px",
              background: "#f0fdf4",
              color: "#16a34a",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#16a34a",
              }}
            />
            Online
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;