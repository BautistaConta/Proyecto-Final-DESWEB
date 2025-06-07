const API_BASE = "http://localhost:3001/api"; // Ajustalo a tu backend

export async function register(data: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getTasks(token: string) {
  const res = await fetch(`${API_BASE}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createTask(token: string, task: { title: string }) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return res.json();
}

// También podés agregar funciones para editar, eliminar, etc.
