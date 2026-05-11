import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post("http://127.0.0.1:8000/auth/login", {
                email,
                password,
            });

            console.log("Login response:", res.data);

            if (!res.data.access_token) {
                alert("Invalid response from server");
                return;
            }

            // ✅ Save token properly
            localStorage.setItem("token", res.data.access_token);

            // ✅ Redirect
            navigate("/analyze");

        } catch (err) {
            console.error("Login error:", err);

            if (err.response) {
                alert(err.response.data.detail || "Login failed");
            } else {
                alert("Server not reachable");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>

            {/* Background Glow */}
            <div style={topGlow}></div>
            <div style={bottomGlow}></div>

            {/* LEFT SECTION */}
            <div style={leftSection}>
                <div style={brandBadge}>🧠 AI Powered Platform</div>

                <h1 style={heading}>
                    Welcome to <br />
                    <span style={{ color: "#2563eb" }}>NewsLens</span>
                </h1>

                <p style={subText}>
                    Understand political bias, sentiment, and hidden perspectives
                    in news articles using advanced AI and NLP models.
                </p>

                <div style={featureBox}>
                    <Feature text="Political Bias Detection" />
                    <Feature text="Sentiment Analysis" />
                    <Feature text="Named Entity Recognition" />
                    <Feature text="Important Phrase Extraction" />
                </div>

                <div style={footerText}>
                    Built using React • FastAPI • Transformers • NLP
                </div>
            </div>

            {/* RIGHT LOGIN CARD */}
            <div style={cardWrapper}>
                <div style={cardStyle}>

                    <div style={logoCircle}>📰</div>

                    <h2 style={titleStyle}>
                        Welcome Back
                    </h2>

                    <p style={subtitleStyle}>
                        Login to continue your AI news analysis journey.
                    </p>

                    {/* EMAIL */}
                    <div style={inputWrapper}>
                        <span style={iconStyle}>✉️</span>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    {/* PASSWORD */}
                    <div style={inputWrapper}>
                        <span style={iconStyle}>🔒</span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        onClick={handleLogin}
                        style={buttonStyle}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login to NewsLens"}
                    </button>

                    {/* SIGNUP */}
                    <p style={bottomText}>
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            style={signupStyle}
                        >
                            Create Account
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}

/* FEATURE COMPONENT */
function Feature({ text }) {
    return (
        <div style={featureItem}>
            <span style={{ color: "#22c55e", fontWeight: "bold" }}>✓</span>
            <span>{text}</span>
        </div>
    );
}

/* PAGE */
const pageStyle = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "60px",
    background: "#f8fafc",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
};

/* GLOW EFFECTS */
const topGlow = {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(37,99,235,0.18)",
    top: "-150px",
    left: "-100px",
    filter: "blur(120px)",
};

const bottomGlow = {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(168,85,247,0.18)",
    bottom: "-180px",
    right: "-120px",
    filter: "blur(120px)",
};

/* LEFT */
const leftSection = {
    width: "50%",
    zIndex: 2,
    paddingRight: "60px",
};

const brandBadge = {
    display: "inline-block",
    padding: "10px 18px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.5)",
    backdropFilter: "blur(10px)",
    marginBottom: "24px",
    fontWeight: "600",
    color: "#1e293b",
};

const heading = {
    fontSize: "64px",
    lineHeight: "1.1",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "24px",
};

const subText = {
    fontSize: "18px",
    color: "#64748b",
    lineHeight: "1.8",
    maxWidth: "600px",
    marginBottom: "32px",
};

const featureBox = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
};

const featureItem = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "16px",
    color: "#1e293b",
    background: "rgba(255,255,255,0.5)",
    padding: "14px 18px",
    borderRadius: "14px",
    width: "fit-content",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.4)",
};

const footerText = {
    marginTop: "40px",
    color: "#94a3b8",
    fontSize: "14px",
};

/* RIGHT CARD */
const cardWrapper = {
    width: "42%",
    display: "flex",
    justifyContent: "center",
    zIndex: 2,
};

const cardStyle = {
    width: "100%",
    maxWidth: "460px",
    background: "rgba(255,255,255,0.65)",
    border: "1px solid rgba(255,255,255,0.4)",
    backdropFilter: "blur(18px)",
    borderRadius: "28px",
    padding: "42px",
    boxShadow: "0 20px 60px rgba(15,23,42,0.12)",
};

const logoCircle = {
    width: "72px",
    height: "72px",
    borderRadius: "20px",
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    margin: "0 auto 24px",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(37,99,235,0.25)",
};

const titleStyle = {
    textAlign: "center",
    fontSize: "34px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "10px",
};

const subtitleStyle = {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "34px",
    lineHeight: "1.6",
};

const inputWrapper = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid #dbeafe",
    borderRadius: "16px",
    padding: "0 16px",
    marginBottom: "18px",
    height: "58px",
};

const iconStyle = {
    fontSize: "18px",
};

const inputStyle = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "15px",
    color: "#0f172a",
};

/* BUTTON */
const buttonStyle = {
    width: "100%",
    padding: "16px",
    marginTop: "10px",
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(37,99,235,0.25)",
    transition: "all 0.2s ease",
};

/* BOTTOM */
const bottomText = {
    textAlign: "center",
    marginTop: "24px",
    color: "#64748b",
};

const signupStyle = {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "700",
};

export default Login;