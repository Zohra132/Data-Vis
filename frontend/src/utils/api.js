/**frontend/utils/api.js */
//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const API_URL = "https://data-vis-production.up.railway.app";

// Register a new user
export async function register(username, password) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

// Login user
export async function login(username, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (data.token) localStorage.setItem("token", data.token);
  return data;
}
// Get all datasets for the logged-in user
export async function getDatasets() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/datasets`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  }
  
  // Save a dataset
  export async function saveDataset(name, data) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/datasets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, data }),
    });
    return res.json();
  }
  

  export async function explain(steps, structure, currentState) {
    try {
      const res = await fetch(`${API_URL}/api/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ steps, structure, currentState }),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Explain API error:", error);
      return { explanation: "Failed to fetch explanation." };
    }
  }