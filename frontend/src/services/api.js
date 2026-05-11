const BASE_URL = "http://127.0.0.1:8000";

// 🔐 Get token helper (KEEP SAME)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// 🔥 COMMON RESPONSE HANDLER (KEEP SAME)
const handleResponse = async (res) => {
  let data = {};

  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (res.status === 401) {
    alert("Session expired. Please login again.");
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  if (!res.ok) {
    throw new Error(data.detail || "Request failed");
  }

  return data;
};

// 🧠 TEXT ANALYSIS (UNCHANGED)
export const predictBias = async (text) => {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ text }),
  });

  return handleResponse(res);
};

// 🔗 URL ANALYSIS (UNCHANGED)
export const analyzeUrl = async (url) => {
  const res = await fetch(`${BASE_URL}/analyze-url`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ url }),
  });

  return handleResponse(res);
};

// 🆕 GET HISTORY (UNCHANGED)
export const getHistory = async () => {
  const res = await fetch(`${BASE_URL}/history`, {
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
};

// 🆕 DELETE ONE (✅ FIXED ONLY HERE)
export const deleteHistoryItem = async (id) => {
  const res = await fetch(`${BASE_URL}/history/${id}`, {  // ✅ FIXED
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
};

// 🆕 CLEAR ALL (UNCHANGED)
export const clearHistory = async () => {
  const res = await fetch(`${BASE_URL}/history`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
};