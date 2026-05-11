import React, { useState } from 'react';
import ArticleInput from '../components/ArticleInput';
import ResultCard from '../components/ResultCard';
import { predictBias } from '../services/api';

function Home() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articleUrl, setArticleUrl] = useState('');
  const [inputMode, setInputMode] = useState('text'); // kept
  const [liveText, setLiveText] = useState('');

  // 🔐 Auth headers (unchanged)
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // 🧠 TEXT ANALYSIS
  const handleAnalyze = async (text) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictBias(text);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔗 URL ANALYSIS (kept for ArticleInput usage)
  const handleAnalyzeUrl = async (url) => {
    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/analyze-url', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ url }),
      });

      if (response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to analyze URL');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 📊 Live stats
  const wordCount = liveText.trim()
    ? liveText.trim().split(/\s+/).length
    : 0;

  const readingTime = Math.ceil(wordCount / 200);

  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '48px 24px',
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#0f172a' }}>
          Uncover Article Bias
        </h1>
        <p style={{ fontSize: '16px', color: '#64748b' }}>
          Paste article text or a URL to analyze political bias, sentiment, and entities.
        </p>
      </div>

      {/* MAIN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* INPUT CARD */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '24px',
          }}
        >
          {/* ✅ ONLY ONE INPUT COMPONENT */}
          <ArticleInput
            onAnalyze={(textOrUrl) => {
              setLiveText(textOrUrl);

              // 🔥 AUTO DETECT URL OR TEXT
              if (textOrUrl.startsWith("http")) {
                handleAnalyzeUrl(textOrUrl);
              } else {
                handleAnalyze(textOrUrl);
              }
            }}
            isLoading={isLoading}
          />

          {/* LIVE PREVIEW */}
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>
              📊 Live Preview
            </h3>

            <p style={{ fontSize: '14px', color: '#475569' }}>
              Words: <strong>{wordCount}</strong>
            </p>

            <p style={{ fontSize: '14px', color: '#475569' }}>
              Reading Time: <strong>{readingTime} min</strong>
            </p>

            <div
              style={{
                marginTop: '10px',
                fontSize: '13px',
                color: '#64748b',
                maxHeight: '80px',
                overflow: 'hidden',
              }}
            >
              {liveText || "Start typing to preview..."}
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div style={{ marginTop: '10px', color: 'red' }}>
              {error}
            </div>
          )}
        </div>

        {/* RESULT */}
        {result && (
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '24px',
            }}
          >
            <ResultCard result={result} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;