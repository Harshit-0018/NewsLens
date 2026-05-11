import React, { useState } from "react";
import { predictBias } from "../services/api";

function Analyze() {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {
        try {
            const data = await predictBias(text);
            setResult(data);
        } catch (err) {
            alert("Analysis failed");
            console.error(err);
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>Analyze News</h1>

            <textarea
                rows="6"
                placeholder="Paste news text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ width: "100%", marginBottom: "16px" }}
            />

            <button onClick={handleAnalyze}>
                Analyze
            </button>

            {result && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Result:</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Analyze;