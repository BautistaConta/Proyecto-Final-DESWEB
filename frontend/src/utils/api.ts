// src/utils/api.ts
export const API_URL = "http://localhost:3001/api";

export async function fetchWithToken(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(`${API_URL}${endpoint}`, { ...options, headers });
}
