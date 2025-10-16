import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";
import TodoBasic from "./pages/TodoBasic";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { TodoProvider } from "./context/TodoContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import { useContext } from "react";

function AuthNav() {
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const doLogout = () => {
    logout();
    navigate('/login');
  };
  if (token) {
    return (
      <button onClick={doLogout} className="font-bold text-black">Wyloguj</button>
    );
  }
  return (
    <Link to="/login" className="font-bold text-black">Zaloguj</Link>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <div className="min-h-screen bg-gray-200">
            <nav className="p-4 bg-gray-300 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Link to="/" className="text-black font-bold">Główna</Link>
                <Link to="/pagetwo" className="text-black font-bold">Ogłoszenia</Link>
                <Link to="/todo" className="text-black font-bold">Zadania</Link>
              </div>
              <div className="flex items-center gap-4">
                <AuthNav />
              </div>
            </nav>
            <Routes>
              <Route path="/" element={<PageOne />} />
              <Route path="/pagetwo" element={<PageTwo />} />
              <Route path="/todo" element={<RequireAuth><TodoBasic /></RequireAuth>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
}
