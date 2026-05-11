import React, { useEffect, useMemo, useState } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from 'recharts';

import {
    getHistory,
    deleteHistoryItem,
    clearHistory
} from '../services/api';

// 🎨 UPDATED COLORS (better UX)
const COLORS = ['#ef4444', '#eab308', '#16a34a']; // Left, Center, Right

function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🕒 FORMAT DATE (NEW)
    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleString();
    };

    // 🎨 SENTIMENT COLOR (NEW)
    const getSentimentColor = (sentiment) => {
        if (!sentiment) return "#64748b";
        if (sentiment === "Positive") return "#16a34a";
        if (sentiment === "Negative") return "#ef4444";
        return "#eab308";
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHistory();
                setHistory(data);
            } catch (err) {
                console.error(err);
                alert(err.message || "Failed to load history");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const biasData = useMemo(() => {
        const counts = { Left: 0, Center: 0, Right: 0 };

        history.forEach((item) => {
            if (counts[item.bias] !== undefined) {
                counts[item.bias] += 1;
            }
        });

        return Object.entries(counts).map(([name, value]) => ({
            name,
            value,
        }));
    }, [history]);

    const sentimentData = useMemo(() => {
        const counts = { Positive: 0, Neutral: 0, Negative: 0 };

        history.forEach((item) => {
            if (counts[item.sentiment] !== undefined) {
                counts[item.sentiment] += 1;
            }
        });

        return Object.entries(counts).map(([name, value]) => ({
            name,
            value,
        }));
    }, [history]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Delete this history item?');
        if (!confirmed) return;

        try {
            await deleteHistoryItem(id);
            setHistory((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const handleClearAll = async () => {
        const confirmed = window.confirm('Clear all history?');
        if (!confirmed) return;

        try {
            await clearHistory();
            setHistory([]);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '60px', textAlign: 'center', fontSize: '18px' }}>
                ⏳ Loading history...
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 80px' }}>

            {/* TITLE */}
            <h1 style={{
                fontSize: '42px',
                fontWeight: 800,
                marginBottom: "20px",
                color: "#0f172a"
            }}>
                Analysis History
            </h1>

            {/* 📊 CHARTS */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                margin: '40px 0'
            }}>
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie data={biasData} dataKey="value" nameKey="name" outerRadius={90}>
                            {biasData.map((entry, index) => (
                                <Cell key={entry.name} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={sentimentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* CLEAR BUTTON */}
            <div style={{ marginBottom: "24px" }}>
                <button
                    onClick={handleClearAll}
                    style={{
                        padding: "10px 18px",
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: 600
                    }}
                >
                    Clear All History
                </button>
            </div>

            {/* 📄 HISTORY LIST */}
            {history.map((item) => (
                <div
                    key={item.id}
                    style={{
                        marginBottom: '20px',
                        padding: '20px',
                        borderRadius: "14px",
                        border: '1px solid #e2e8f0',
                        background: '#ffffff',
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        position: "relative"
                    }}
                >
                    {/* ❌ DELETE ICON */}
                    <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: "16px",
                            color: "#ef4444"
                        }}
                    >
                        ❌
                    </button>

                    <p><b>Input:</b> {item.input}</p>

                    <p>
                        <b>Bias:</b>{" "}
                        <span style={{ fontWeight: 600 }}>
                            {item.bias}
                        </span>
                    </p>

                    <p>
                        <b>Sentiment:</b>{" "}
                        <span style={{
                            color: getSentimentColor(item.sentiment),
                            fontWeight: 600
                        }}>
                            {item.sentiment}
                        </span>
                    </p>

                    {/* 🕒 TIME */}
                    <p style={{
                        fontSize: "13px",
                        color: "#64748b",
                        marginTop: "10px"
                    }}>
                        {formatDate(item.created_at)}
                    </p>
                </div>
            ))}

        </div>
    );
}

export default History;