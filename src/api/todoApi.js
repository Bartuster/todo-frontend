// Używamy portu 8000
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Sprawdzenie czy backend działa
export async function checkBackend() {
  try {
    const res = await fetch(`${API_URL}/`);
    return res.ok;
  } catch (err) {
    return false;
  }
}

// Pobranie listy todo (wymaga tokena)
export async function getTodos(token) {
  if (!token) throw new Error("Token is required");
  const res = await fetch(`${API_URL}/todos/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return await res.json();
}

// Dodawanie todo
export async function addTodo(title, description = "", token) {
  if (!token) throw new Error("Token is required");
  const res = await fetch(`${API_URL}/todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return await res.json();
}

// Aktualizacja todo
export async function updateTodo(id, updatedFields, token) {
  if (!token) throw new Error("Token is required");
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedFields),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return await res.json();
}

// Usuwanie todo
export async function deleteTodo(id, token) {
  if (!token) throw new Error("Token is required");
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return true;
}
