
const API_URL = "http://localhost:3000/api/sessions";

export const createSession = async (sessionData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(sessionData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create session");
  }
  return data;
};

export const getMySessions = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch sessions");
  }
  return data;
};

export const updateSessionStatus = async (sessionId, action) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${sessionId}/${action}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update session");
  }
  return data;
};
