import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/auth/signup", {
                email,
                password,
            });

            alert("Signup successful!");
            navigate("/login");
        } catch (err) {
            alert("Signup failed");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
            }}
        >
            <div
                style={{
                    width: "380px",
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "32px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
                    Create Account 🚀
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />

                <button onClick={handleSignup} style={buttonStyle}>
                    Signup
                </button>

                <p style={{ textAlign: "center", marginTop: "16px" }}>
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        style={{ color: "#667eea", cursor: "pointer", fontWeight: "600" }}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
};

const buttonStyle = {
    width: "100%",
    padding: "12px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
};

export default Signup;