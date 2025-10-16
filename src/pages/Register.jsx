import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register, loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(username, password);
      setError(null);
      if (res && res.error) {
        setError(res.error || 'Błąd rejestracji');
        return;
      }
      navigate('/login');
    } catch (err) {
      setError(err.message || "Błąd rejestracji");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 border rounded w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">Rejestracja</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Nazwa użytkownika" className="p-2 border" />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Hasło" className="p-2 border" />
          <button type="submit" className="p-2 bg-black text-white rounded">Zarejestruj</button>
          {loading && <div>Ładowanie...</div>}
          {error && <div className="text-red-600">{error}</div>}
        </form>
      </div>
    </div>
  );
}
