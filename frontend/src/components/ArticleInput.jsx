import React, { useState } from 'react';

function ArticleInput({ onAnalyze, isLoading }) {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState('text'); // NEW: toggle mode
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (mode === 'text' && text.trim()) {
      onAnalyze(text.trim());
    }
    if (mode === 'url' && url.trim()) {
      onAnalyze(url.trim(), true); // assume backend handles URL
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) handleSubmit();
  };

  const hasInput =
    mode === 'text' ? text.trim().length > 0 : url.trim().length > 0;

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '18px',
        padding: '28px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* 🔘 Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        <button
          onClick={() => setMode('text')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            background: mode === 'text' ? '#2563eb' : '#e2e8f0',
            color: mode === 'text' ? '#fff' : '#334155',
          }}
        >
          Article Text
        </button>

        <button
          onClick={() => setMode('url')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            background: mode === 'url' ? '#2563eb' : '#e2e8f0',
            color: mode === 'url' ? '#fff' : '#334155',
          }}
        >
          URL
        </button>
      </div>

      {/* 📌 TEXT MODE */}
      {mode === 'text' && (
        <>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#0f172a',
              marginBottom: '6px',
            }}
          >
            Article Text
          </label>

          <p
            style={{
              fontSize: '13px',
              color: '#94a3b8',
              marginBottom: '14px',
            }}
          >
            Paste a news article below to analyze its political bias, sentiment, and key entities.
          </p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Paste your news article here..."
            rows={7}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: isFocused
                ? '1.5px solid #2563eb'
                : '1px solid #e2e8f0',
              background: '#f8fafc',
              fontSize: '14px',
              lineHeight: '1.6',
              outline: 'none',
              resize: 'vertical',
              transition: 'all 0.2s ease',
            }}
          />
        </>
      )}

      {/* 🌐 URL MODE */}
      {mode === 'url' && (
        <>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#0f172a',
              marginBottom: '6px',
            }}
          >
            Article URL
          </label>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/article"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </>
      )}

      {/* 🔽 Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '18px',
        }}
      >
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
          Ctrl + Enter to submit
        </span>

        <button
          onClick={handleSubmit}
          disabled={!hasInput || isLoading}
          style={{
            padding: '10px 22px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 600,
            border: 'none',
            cursor: hasInput && !isLoading ? 'pointer' : 'not-allowed',
            background:
              hasInput && !isLoading ? '#2563eb' : '#cbd5f5',
            color: '#fff',
            transition: 'all 0.2s ease',
          }}
        >
          {mode === 'url' ? 'Analyze URL' : 'Analyze Article'}
        </button>
      </div>
    </div>
  );
}

export default ArticleInput;