import { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export default function TodoBasic() {
  const { todos, setTodos, addTodo, removeTodo, updateTodo, loading, error, apiAvailable } = useContext(TodoContext);
  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Dane TODO są pobierane przez `TodoProvider` (TodoContext)

  const openAddModal = () => {
    setEditingTodo(null);
    setTitle("");
    setDescription("");
    setShowModal(true);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    if (editingTodo) {
      await updateTodo(editingTodo.id, { title, description });
    } else {
      await addTodo(title, description);
    }
    setTitle("");
    setDescription("");
    setEditingTodo(null);
    setShowModal(false);
  };

  const handleToggleCompleted = async (todo) => {
    await updateTodo(todo.id, { completed: !todo.completed });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4 text-black">Zadania</h1>


      <button
        onClick={openAddModal}
        className="mb-4 p-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Dodaj zadanie
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-bold mb-2">{editingTodo ? "Edytuj zadanie" : "Nowe zadanie"}</h2>
            <input
              type="text"
              placeholder="Nazwa zadania"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border mb-2"
            />
            <textarea
              placeholder="Opis zadania"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border mb-2"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="p-2 bg-gray-300 rounded">
                Anuluj
              </button>
              <button onClick={handleSave} className="p-2 bg-black text-white rounded">
                Zapisz
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        {loading && <div className="p-4 bg-yellow-100 text-yellow-800 rounded mb-2">Ładowanie zadań...</div>}
        {/* jeśli błąd sieciowy został ukryty, pokaż delikatny banner offline */}
        {!apiAvailable && !error && (
          <div className="p-3 bg-blue-50 text-blue-800 rounded mb-2">Pracujesz w trybie offline — możesz dodawać zadania lokalnie.</div>
        )}
        {error && <div className="p-4 bg-red-100 text-red-800 rounded mb-2">Błąd: {error}</div>}
        {(!todos || todos.length === 0) && !loading ? (
          <div className="p-4 text-gray-600">Brak zadań — dodaj pierwsze zadanie.</div>
        ) : (
          <ul>
          {(todos || []).map((todo) => (
          <li key={todo.id} className="flex justify-between items-start mb-2 p-2 bg-white rounded shadow">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed || false}
                  onChange={() => handleToggleCompleted(todo)}
                />
                <span className={`font-bold ${todo.completed ? "line-through" : ""}`}>
                  {todo.title}
                </span>
              </div>
              <span>{todo.description}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(todo)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edytuj
              </button>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
        </ul>
        )}
      </div>
    </div>
  );
}
