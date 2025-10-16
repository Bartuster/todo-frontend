import { createContext, useState, useEffect, useContext } from "react";
import {
  getTodos as apiGetTodos,
  checkBackend,
  addTodo as apiAddTodo,
  updateTodo as apiUpdateTodo,
  deleteTodo as apiDeleteTodo,
} from "../api/todoApi";
import { AuthContext } from "./AuthContext";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiAvailable, setApiAvailable] = useState(true);

  const { token } = useContext(AuthContext);

  const isNetworkError = (err) => {
    if (!err) return false;
    const msg = (err.message || "").toLowerCase();
    return msg.includes("failed to fetch") || err.name === "TypeError";
  };

  const fetchTodos = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await apiGetTodos(token);
      setTodos(data);
      setApiAvailable(true);
      setError(null);
    } catch (err) {
      console.warn("Backend niedostępny:", err);
      setApiAvailable(false);
      setTodos([]);
      setError(isNetworkError(err) ? null : err.message || "Błąd pobierania");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const addTodo = async (title, description) => {
    if (!apiAvailable) {
      const temp = { id: Date.now(), title, description, completed: false };
      setTodos((prev) => [...prev, temp]);
      return temp;
    }
    try {
      const newTodo = await apiAddTodo(title, description, token);
      setTodos((prev) => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      console.warn("Dodawanie nie powiodło się, fallback lokalny:", err);
      setApiAvailable(false);
      const temp = { id: Date.now(), title, description, completed: false };
      setTodos((prev) => [...prev, temp]);
      return temp;
    }
  };

  const updateTodo = async (id, updatedFields) => {
    if (!apiAvailable) {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
      );
      return null;
    }
    try {
      const updatedTodo = await apiUpdateTodo(id, updatedFields, token);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      console.warn("Aktualizacja nie powiodła się, fallback lokalny:", err);
      setApiAvailable(false);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
      );
      return null;
    }
  };

  const removeTodo = async (id) => {
    if (!apiAvailable) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      return;
    }
    try {
      await apiDeleteTodo(id, token);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.warn("Usuwanie nie powiodło się, fallback lokalny:", err);
      setApiAvailable(false);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  const reconnect = async () => {
    if (!token) return false;
    setLoading(true);
    try {
      const ok = await checkBackend();
      if (!ok) throw new Error("Backend check failed");
      await fetchTodos();
      setApiAvailable(true);
      return true;
    } catch (err) {
      console.warn("Reconnect failed:", err);
      setApiAvailable(false);
      setError(isNetworkError(err) ? null : err.message || "Reconnect failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        removeTodo,
        loading,
        error,
        apiAvailable,
        reconnect,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
