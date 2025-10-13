import { Link } from "react-router-dom";

export default function PageOne() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">Strona Pierwsza</h1>
      <p className="mb-6">To jest przykładowy tekst na stronie pierwszej.</p>
      <Link to="/page-two" className="text-blue-600 underline">Przejdź na drugą stronę</Link>
    </div>
  );
}
